import { Resend } from "resend";
import { NextRequest } from "next/server";
import { isSpamHoneypot } from "@/lib/spam";
import { isValidEmail, isValidPhone } from "@/lib/validations";

const validFlavorPreferences = new Set([
  "vanilla",
  "lemon",
  "almond",
  "confetti",
  "gf",
  "maple",
  "chocolate-chip",
]);

const validPackagingOptions = new Set(["sealed", "ribbon"]);
const validTipPercentages = new Set(["15", "18", "20", "custom"]);

const TWO_DOZEN_PRICE_PER_DOZEN = 75;
const STANDARD_PRICE_PER_DOZEN = 70;
const GLUTEN_FREE_PRICE_PER_DOZEN = 6;
const DYE_FREE_PRICE_PER_DOZEN = 10;
const RIBBON_PACKAGING_PRICE_PER_DOZEN = 6;

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(amount);

const getQuantityValue = (quantity: string) =>
  quantity === "11+" ? 11 : Number(quantity);

const getBasePricePerDozen = (quantity: number) =>
  quantity === 2 ? TWO_DOZEN_PRICE_PER_DOZEN : STANDARD_PRICE_PER_DOZEN;

const parseCustomTipAmount = (value: unknown) => {
  if (typeof value !== "string" && typeof value !== "number") {
    return null;
  }

  const amount = Number(value);
  return Number.isFinite(amount) && amount >= 0 ? amount : null;
};

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const senderEmail = process.env.SENDER_EMAIL;
  const receiverEmail = process.env.RECEIVER_EMAIL;
  const googleWebApp = process.env.GOOGLE_WEB_APP;
  try {
    if (!senderEmail || !receiverEmail) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Email configuration is missing.",
        }),
        { status: 500 },
      );
    }

    const body = await req.json();
    const {
      name,
      email,
      phone,
      eventDate,
      quantity,
      flavorPreference,
      packaging,
      referralSource,
      message,
      tipPercentage,
      customTipAmount,
      dyefree,
      company,
    } = body;

    console.log("🎨 Received Custom Order Inquiry:", body);

    // 🛡️ Honeypot spam check
    if (isSpamHoneypot(company)) {
      console.warn("🚨 Spam detected (honeypot triggered)");
      return new Response(JSON.stringify({ success: false, spam: true }), {
        status: 400,
      });
    }

    // Basic required field validation
    if (
      !name ||
      !email ||
      !phone ||
      !eventDate ||
      !quantity ||
      !flavorPreference ||
      flavorPreference.length === 0 ||
      !packaging ||
      !message
    ) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields." }),
        { status: 400 },
      );
    }

    // Validate email and phone
    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid email address" }),
        { status: 400 },
      );
    }

    if (!isValidPhone(phone)) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid phone number" }),
        { status: 400 },
      );
    }

    if (
      !Array.isArray(flavorPreference) ||
      flavorPreference.some(
        (flavor: string) => !validFlavorPreferences.has(flavor),
      )
    ) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Please select at least one valid flavor preference.",
        }),
        { status: 400 },
      );
    }

    if (!validPackagingOptions.has(packaging)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Please select a valid packaging option.",
        }),
        { status: 400 },
      );
    }

    if (!validTipPercentages.has(tipPercentage)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Please select a valid tip option.",
        }),
        { status: 400 },
      );
    }

    const parsedCustomTipAmount =
      tipPercentage === "custom" ? parseCustomTipAmount(customTipAmount) : null;

    if (tipPercentage === "custom" && parsedCustomTipAmount === null) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Please enter a non-negative custom tip amount.",
        }),
        { status: 400 },
      );
    }

    const flavorList = flavorPreference
      .map((flavor: string) => `• ${flavor}`)
      .join("<br>");
    const quantityValue = getQuantityValue(quantity);
    const basePricePerDozen = getBasePricePerDozen(quantityValue);
    const addOnsPerDozen =
      (flavorPreference.includes("gf") ? GLUTEN_FREE_PRICE_PER_DOZEN : 0) +
      (dyefree ? DYE_FREE_PRICE_PER_DOZEN : 0) +
      (packaging === "ribbon" ? RIBBON_PACKAGING_PRICE_PER_DOZEN : 0);
    const estimatedSubtotal =
      quantityValue * (basePricePerDozen + addOnsPerDozen);
    const estimatedTipAmount =
      tipPercentage === "custom"
        ? (parsedCustomTipAmount ?? 0)
        : estimatedSubtotal * (Number(tipPercentage) / 100);
    const estimatedTotal = estimatedSubtotal + estimatedTipAmount;
    const tipLabel =
      tipPercentage === "custom"
        ? `Custom tip (${formatCurrency(estimatedTipAmount)})`
        : `${tipPercentage}% (${formatCurrency(estimatedTipAmount)})`;

    const { data, error } = await resend.emails.send({
      from: senderEmail,
      to: receiverEmail,
      subject: `🚨 NEW CUSTOM 🍪 Order Inquiry: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9; color: #333;">
          <h2 style="color: #d97706;">🎨 New Custom Cookie Inquiry</h2>

          <table style="width: 100%; max-width: 600px; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; font-weight: bold;">Name:</td>
              <td style="padding: 8px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Email:</td>
              <td style="padding: 8px;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Phone:</td>
              <td style="padding: 8px;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Event Date:</td>
              <td style="padding: 8px;">${eventDate}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Quantity (Dozen):</td>
              <td style="padding: 8px;">${quantity}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Packaging:</td>
              <td style="padding: 8px;">${packaging}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Dye-Free Icing:</td>
              <td style="padding: 8px;">${dyefree ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Referral Source:</td>
              <td style="padding: 8px;">${referralSource || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Estimated Subtotal:</td>
              <td style="padding: 8px;">${formatCurrency(estimatedSubtotal)}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Tip:</td>
              <td style="padding: 8px;">${tipLabel}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Estimated Total:</td>
              <td style="padding: 8px;">${formatCurrency(estimatedTotal)}</td>
            </tr>
          </table>

          <h3 style="margin-top: 20px;">🧁 Flavor Preferences:</h3>
          <div style="padding: 15px; background: #fff; border-left: 4px solid #d97706;">
            ${flavorList}
          </div>

          <h3 style="margin-top: 20px;">📋 Message / Design Details:</h3>
          <div style="padding: 15px; background: #fff; border-left: 4px solid #d97706;">
            ${message.replace(/\n/g, "<br>")}
          </div>
        </div>
      `,
    });

    if (error) {
      throw error;
    }
    // 🆕 Send the data to Google Sheet after the email
    await fetch(`${googleWebApp}?sheet=custom`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        eventDate,
        quantity,
        flavorPreference,
        packaging,
        dyefree,
        referralSource,
        message,
        tipPercentage,
        customTipAmount: parsedCustomTipAmount,
        estimatedSubtotal,
        estimatedTipAmount,
        estimatedTotal,
      }),
    });

    return Response.json({ success: true, data });
  } catch (error) {
    console.error("❌ Error processing custom order inquiry:", error);
    return new Response(JSON.stringify({ success: false, error }), {
      status: 500,
    });
  }
}
