import { Resend } from "resend";
import { NextRequest } from "next/server";
import { isSpamHoneypot } from "@/lib/spam";
import { isValidEmail, isValidPhone } from "@/lib/validations";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const receiverEmail = process.env.RECEIVER_EMAIL;
  const googleWebApp = process.env.GOOGLE_WEB_APP;
  try {
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

    const flavorList = flavorPreference
      .map((flavor: string) => `• ${flavor}`)
      .join("<br>");

    const { data, error } = await resend.emails.send({
      from: "leads@edcwebdesign.com",
      to: `${receiverEmail}`,
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
