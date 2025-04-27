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
      pickupDate,
      referralSource,
      specialInstructions,
      company,
      designs,
    } = body;

    console.log("📦 Received Pre-Design Order Submission:", body);

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
      !pickupDate ||
      !designs ||
      designs.length === 0
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

    const designsHtml = designs
      .map(
        (design: { id: string; quantity: number; price: string }) => `
      <tr>
        <td style="padding: 8px;">${design.id}</td>
        <td style="padding: 8px;">${design.quantity}</td>
        <td style="padding: 8px;">${design.price}</td>
      </tr>
    `,
      )
      .join("");

    const { data, error } = await resend.emails.send({
      from: "leads@edcwebdesign.com",
      to: `${receiverEmail}`,
      subject: `🚨 NEW Pre-Designed 🍪 Order: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9; color: #333;">
          <h2 style="color: #d97706;">🍪 New Pre-Design Order</h2>
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
              <td style="padding: 8px; font-weight: bold;">Pickup Date:</td>
              <td style="padding: 8px;">${pickupDate}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Referral Source:</td>
              <td style="padding: 8px;">${referralSource || "Not provided"}</td>
            </tr>
          </table>

          <h3 style="margin-top: 20px;">🧁 Ordered Designs:</h3>
          <table style="width: 100%; max-width: 600px; border-collapse: collapse; background: #fff; border: 1px solid #ddd;">
            <thead>
              <tr style="background-color: #f1f1f1;">
                <th style="padding: 8px; text-align: left;">Design ID</th>
                <th style="padding: 8px; text-align: left;">Quantity</th>
                <th style="padding: 8px; text-align: left;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${designsHtml}
            </tbody>
          </table>

          ${
            specialInstructions
              ? `
              <div style="margin-top: 20px;">
                <h3>Special Instructions:</h3>
                <p style="background: #fff; padding: 15px; border-left: 4px solid #d97706;">
                  ${specialInstructions.replace(/\n/g, "<br>")}
                </p>
              </div>
              `
              : ""
          }
        </div>
      `,
    });

    if (error) {
      throw error;
    }

    // 🌟 Also send the data to Google Sheets
    await fetch(`${googleWebApp}?sheet=pre-designed`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        pickupDate,
        referralSource: referralSource || "Not provided",
        specialInstructions: specialInstructions || "None",
        designs,
      }),
    });

    return Response.json({ success: true, data });
  } catch (error) {
    console.error("❌ Error processing pre-design order:", error);
    return new Response(JSON.stringify({ success: false, error }), {
      status: 500,
    });
  }
}
