import { Resend } from "resend";
import { NextRequest } from "next/server";
import { isSpamHoneypot } from "@/lib/spam";
import { isValidEmail, isValidPhone } from "@/lib/validations";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await req.json();
    const { name, email, phone, message, company, referralSource } = body;
    console.log("Received form submission:", body);

    // 🛡️ Honeypot spam check
    if (isSpamHoneypot(company)) {
      console.warn("🚨 Spam detected (honeypot triggered)");
      return new Response(JSON.stringify({ success: false, spam: true }), {
        status: 400,
      });
    }

    // Basic required field validation
    if (!name || !email || !message || !phone) {
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

    const { data, error } = await resend.emails.send({
      from: "leads@edcwebdesign.com",
      to: "roseandsugarcookies@gmail.com",
      subject: `🚨 NEW GENERAL 🍪 Inquiry: Message from ${name} via Website Contact Form`,
      html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9; color: #333;">
        <h2 style="color: #2e7d32;">📬 New Contact Form Submission</h2>
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
            <td style="padding: 8px; font-weight: bold;">Referral Source:</td>
            <td style="padding: 8px;">${referralSource || "Not provided"}</td>
          </tr>
        </table>
        <div style="margin-top: 20px;">
          <h3 style="margin-bottom: 10px;">Message:</h3>
          <div style="padding: 15px; background-color: #fff; border-left: 4px solid #2e7d32;">
            ${message.replace(/\n/g, "<br>")}
          </div>
        </div>
      </div>
    `,
    });

    if (error) {
      throw error;
    }

    return Response.json({ success: true, data });
  } catch (error) {
    console.error("Error parsing request body:", error);
    return new Response(JSON.stringify({ success: false, error }), {
      status: 500,
    });
  }
}
