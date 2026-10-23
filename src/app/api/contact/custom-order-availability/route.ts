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
    const resend = new Resend(RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: SENDER_EMAIL,
      to: RECEIVER_EMAIL,
      replyTo: parsed.data.email,
      subject: "Custom cookie availability notification request",
      text: `A visitor asked to be contacted when custom order spots are available.\n\nEmail: ${parsed.data.email}\n\nThey submitted the Notify me form on the custom orders page and agreed to receive an availability update from Megan. This is not an order, a reservation, or a marketing subscription.`,
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
