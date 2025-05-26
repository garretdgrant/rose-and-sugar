import { Resend } from "resend";
import { NextRequest } from "next/server";
import { isValidEmail, isValidPhone } from "@/lib/validations";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const receiverEmail = process.env.RECEIVER_EMAIL;
  const googleWebApp = process.env.GOOGLE_WEB_APP;

  try {
    const body = await req.json();
    const { fullName, email, phone, seats, classId, isWaitlist } = body;

    console.log("🎟️ Received Class Booking:", body);

    // Basic required field validation
    if (!fullName || !email || !phone || !seats || !classId) {
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

    // 📨 Send confirmation email
    const { data, error } = await resend.emails.send({
      from: "leads@edcwebdesign.com",
      to: receiverEmail!,
      subject: `🎟️ New Class Booking: ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #fdfdfd; color: #333;">
          <h2 style="color: #d97706;">🍪 New Cookie Class Booking</h2>
          <table style="width: 100%; max-width: 600px; border-collapse: collapse;">
            <tr><td style="padding: 8px; font-weight: bold;">Name:</td><td style="padding: 8px;">${fullName}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;">${email}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Phone:</td><td style="padding: 8px;">${phone}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Seats Reserved:</td><td style="padding: 8px;">${seats}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Class ID:</td><td style="padding: 8px;">${classId}</td></tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Waitlist:</td>
              <td style="padding: 8px;">${isWaitlist ? "Yes" : "No"}</td>
            </tr>
          </table>
        </div>
      `,
    });

    if (error) throw error;

    // 📤 Send data to Google Sheet
    await fetch(`${googleWebApp}?sheet=classes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName,
        email,
        phone,
        seats,
        classId,
        isWaitlist,
      }),
    });

    return Response.json({ success: true, data });
  } catch (error) {
    console.error("❌ Error processing class booking:", error);
    return new Response(JSON.stringify({ success: false, error }), {
      status: 500,
    });
  }
}
