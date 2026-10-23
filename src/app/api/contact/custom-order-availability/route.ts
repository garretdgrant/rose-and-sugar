import { Resend } from "resend";
import { z } from "zod";
import { isSpamHoneypot } from "@/lib/spam";

const requestSchema = z.object({
  email: z.string().trim().max(254).email(),
  company: z.string().max(200).optional(),
  consent: z.literal(true),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json(
      { success: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success || isSpamHoneypot(parsed.data.company)) {
    return Response.json(
      {
        success: false,
        error: "Please provide a valid email and request availability updates.",
      },
      { status: 400 },
    );
  }

  const { RESEND_API_KEY, SENDER_EMAIL, RECEIVER_EMAIL } = process.env;
  if (!RESEND_API_KEY || !SENDER_EMAIL || !RECEIVER_EMAIL) {
    return Response.json(
      {
        success: false,
        error: "Availability requests are temporarily unavailable.",
      },
      { status: 503 },
    );
  }

  try {
    const emailHtml = parsed.data.email
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
    const replyUrl = `mailto:${encodeURIComponent(parsed.data.email)}`;
    const resend = new Resend(RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: SENDER_EMAIL,
      to: RECEIVER_EMAIL,
      replyTo: parsed.data.email,
      subject: "Custom cookie availability notification request",
      text: `A visitor asked to be contacted when custom order spots are available.\n\nEmail: ${parsed.data.email}\n\nThey submitted the Notify me form on the custom orders page and agreed to receive an availability update from Megan. This is not an order, a reservation, or a marketing subscription.`,
      html: `
        <!doctype html>
        <html lang="en">
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Custom cookie availability request</title>
          </head>
          <body style="margin: 0; padding: 24px 12px; background-color: #f5f0ea; color: #333333; font-family: Arial, sans-serif;">
            <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse; background-color: #ffffff;">
              <tr>
                <td style="padding: 28px; background-color: #ffdee2; border-top: 4px solid #d286a0;">
                  <p style="margin: 0 0 12px; color: #704353; font-size: 13px; font-weight: bold; letter-spacing: 2px;">ROSE &amp; SUGAR</p>
                  <h1 style="margin: 0; color: #333333; font-size: 25px; line-height: 1.3;">New availability request</h1>
                  <p style="margin: 12px 0 0; font-size: 16px; line-height: 1.6;">Someone would love to hear when custom cookie orders reopen.</p>
                </td>
              </tr>
              <tr>
                <td style="padding: 28px;">
                  <h2 style="margin: 0 0 12px; font-size: 18px;">Visitor details</h2>
                  <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 15px; line-height: 1.6;">
                    <tr>
                      <th scope="row" style="padding: 12px; width: 80px; vertical-align: top; background-color: #f9f9f9;">Email</th>
                      <td style="padding: 12px; background-color: #f9f9f9; word-break: break-word;"><a href="${replyUrl}" style="color: #85435c; text-decoration: underline;">${emailHtml}</a></td>
                    </tr>
                  </table>
                  <div style="margin-top: 24px; padding: 16px; background-color: #f5f0ea; border-left: 4px solid #d286a0;">
                    <h2 style="margin: 0 0 8px; font-size: 17px;">What they requested</h2>
                    <p style="margin: 0; font-size: 15px; line-height: 1.6;">They submitted the Notify me form on the custom orders page and agreed to receive an availability update from Megan.</p>
                    <p style="margin: 12px 0 0; font-size: 14px; line-height: 1.6;">This is not an order, a reservation, or a marketing subscription.</p>
                  </div>
                  <p style="margin: 24px 0 16px; font-size: 15px; line-height: 1.6;">When custom order spots are available, reply to this email to contact the visitor directly.</p>
                  <a href="${replyUrl}" style="display: inline-block; padding: 14px 22px; background-color: #85435c; border-radius: 6px; color: #ffffff; font-size: 15px; font-weight: bold; text-decoration: none;">Email the visitor</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 18px 28px; border-top: 1px solid #ffdee2; color: #666666; font-size: 12px; line-height: 1.6;">Sent from the Rose &amp; Sugar custom order availability form.</td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });
    if (error) {
      return Response.json(
        {
          success: false,
          error: "We couldn’t send your request. Please try again.",
        },
        { status: 502 },
      );
    }
    return Response.json({ success: true });
  } catch {
    return Response.json(
      {
        success: false,
        error: "We couldn’t send your request. Please try again.",
      },
      { status: 502 },
    );
  }
}
