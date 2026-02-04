import { Resend } from "resend";
import { NextRequest } from "next/server";
import { isSpamHoneypot } from "@/lib/spam";
import { isValidEmail, isValidPhone } from "@/lib/validations";

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
      yourName,
      yourEmail,
      yourPhone,
      nomineeName,
      nomineeRole,
      deliveryLocation,
      actOfKindness,
      company,
    } = body;

    console.log("💗 Received Kind Cookie Nomination:", body);

    // 🛡️ Honeypot spam check
    if (isSpamHoneypot(company)) {
      console.warn("🚨 Spam detected (honeypot triggered)");
      return new Response(JSON.stringify({ success: false, spam: true }), {
        status: 400,
      });
    }

    // Basic required field validation
    if (
      !yourName ||
      !yourEmail ||
      !yourPhone ||
      !nomineeName ||
      !nomineeRole ||
      !deliveryLocation ||
      !actOfKindness
    ) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields." }),
        { status: 400 },
      );
    }

    // Validate email and phone
    if (!isValidEmail(yourEmail)) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid email address" }),
        { status: 400 },
      );
    }

    if (!isValidPhone(yourPhone)) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid phone number" }),
        { status: 400 },
      );
    }

    const { data, error } = await resend.emails.send({
      from: senderEmail,
      to: receiverEmail,
      subject: `💗 NEW Kind Cookie Nomination: ${nomineeName}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #fff5f7; color: #333;">
          <h2 style="color: #d286a0;">💗 New Kind Cookie Program Nomination</h2>
          <p style="font-size: 16px; color: #666; margin-bottom: 20px;">
            Someone special has been nominated for a free Kind Cookie gift box!
          </p>

          <div style="background: white; border-radius: 12px; padding: 20px; margin-bottom: 20px; border: 2px solid #ffdee2;">
            <h3 style="color: #d286a0; margin-top: 0;">👤 Nominator Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; font-weight: bold; width: 150px;">Name:</td>
                <td style="padding: 8px;">${yourName}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">Email:</td>
                <td style="padding: 8px;">${yourEmail}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">Phone:</td>
                <td style="padding: 8px;">${yourPhone}</td>
              </tr>
            </table>
          </div>

          <div style="background: white; border-radius: 12px; padding: 20px; margin-bottom: 20px; border: 2px solid #e8adc1;">
            <h3 style="color: #d286a0; margin-top: 0;">🎯 Nominee Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; font-weight: bold; width: 150px;">Nominee Name:</td>
                <td style="padding: 8px;">${nomineeName}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">Their Role:</td>
                <td style="padding: 8px;">${nomineeRole}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">Delivery Location:</td>
                <td style="padding: 8px;">${deliveryLocation}</td>
              </tr>
            </table>
          </div>

          <div style="background: white; border-radius: 12px; padding: 20px; border: 2px solid #fde1d3;">
            <h3 style="color: #d286a0; margin-top: 0;">💝 Their Act of Kindness</h3>
            <div style="padding: 15px; background: #fff5f7; border-left: 4px solid #d286a0; border-radius: 4px; line-height: 1.6;">
              ${actOfKindness.replace(/\n/g, "<br>")}
            </div>
          </div>

          <div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #ffdee2 0%, #fde1d3 100%); border-radius: 12px; text-align: center;">
            <p style="font-size: 14px; color: #666; margin: 0;">
              🍪 This nomination is entered into this week's Kind Cookie drawing! 🍪
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      throw error;
    }

    // Send the data to Google Sheet after the email
    if (googleWebApp) {
      await fetch(`${googleWebApp}?sheet=kind-cookie`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          yourName,
          yourEmail,
          yourPhone,
          nomineeName,
          nomineeRole,
          deliveryLocation,
          actOfKindness,
          submittedAt: new Date().toISOString(),
        }),
      });
    }

    return Response.json({ success: true, data });
  } catch (error) {
    console.error("❌ Error processing Kind Cookie nomination:", error);
    return new Response(JSON.stringify({ success: false, error }), {
      status: 500,
    });
  }
}
