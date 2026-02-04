# Contact Form Wiring (Next.js App Router)

This guide describes a standard wiring pattern for a contact form in a Next.js
App Router app. It is generalized but mirrors a real-world setup: a client-side
form posts JSON to an App Router API route that validates input, applies basic
spam checks, and forwards the submission to an email provider.

## Overview

- Client form lives under `src/app/contact/` and is marked `"use client"`.
- Form submits `POST /api/contact` with JSON body.
- API route in `src/app/api/contact/route.ts` parses JSON, validates fields,
  rejects spam (honeypot), and sends an email.
- Response uses a small JSON contract: `{ success: true }` or
  `{ success: false, error: "..." }`.

## Suggested File Layout

- `src/app/contact/page.tsx`: route page that renders the form.
- `src/app/contact/ContactForm.tsx`: client component with form UI + submit.
- `src/app/api/contact/route.ts`: API handler for POST.
- `src/lib/validations.ts`: shared validation helpers.
- `src/lib/spam.ts`: honeypot spam detection helper.

## Frontend Wiring

1. Build a client component with local state for form fields.
2. Add a honeypot field (hidden input) that real users do not fill in.
3. On submit, `fetch("/api/contact")` with JSON payload.
4. Use the response to show success or error UI (toast, inline message, etc).
5. Clear the form on success.

Example submit logic (abbreviated):

```tsx
const response = await fetch("/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name,
    email,
    phone,
    businessName,
    message,
    company, // honeypot field
  }),
});

const result = await response.json();
if (!response.ok || !result?.success) {
  // handle error
}
```

Notes:

- Always send `Content-Type: application/json`.
- Keep UI feedback and loading states in the client component.
- If the form is reused (ex: checkout flow), ensure the API contract remains
  consistent and add extra context to the message if needed.

## API Route Wiring

Create `src/app/api/contact/route.ts` with a `POST` handler:

1. Parse `req.json()` to access submitted data.
2. Enforce required fields (name, email, phone, message).
3. Validate email and phone format using helper functions.
4. Reject submissions that trigger the honeypot field.
5. Send the message using your email provider (e.g., Resend, SendGrid, SES).
6. Return a JSON success response or a typed error message.

Example flow (pseudocode):

```ts
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, message, company } = body;

  if (isSpamHoneypot(company)) {
    return Response.json({ success: false, spam: true }, { status: 400 });
  }

  if (!name || !email || !phone || !message) {
    return Response.json(
      { success: false, error: "Missing required fields." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email) || !isValidPhone(phone)) {
    return Response.json(
      { success: false, error: "Invalid contact details." },
      { status: 400 },
    );
  }

  await emailProvider.send({
    /* ... */
  });
  return Response.json({ success: true });
}
```

## Resend SDK (Project Pattern)

This project uses the Resend SDK directly inside the App Router `route.ts` file.
Keep the client unaware of the provider and send mail server-side only.

Pattern used in this repo (example):

```ts
import { Resend } from "resend";
import { NextRequest } from "next/server";
import { isSpamHoneypot } from "@/lib/spam";
import { isValidEmail, isValidPhone } from "@/lib/validations";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const body = await req.json();
  const { name, email, phone, message, company } = body;

  if (isSpamHoneypot(company)) {
    return new Response(JSON.stringify({ success: false, spam: true }), {
      status: 400,
    });
  }

  if (!name || !email || !phone || !message) {
    return new Response(
      JSON.stringify({ success: false, error: "Missing required fields." }),
      { status: 400 },
    );
  }

  if (!isValidEmail(email) || !isValidPhone(phone)) {
    return new Response(
      JSON.stringify({ success: false, error: "Invalid contact details." }),
      { status: 400 },
    );
  }

  const { data, error } = await resend.emails.send({
    from: "leads@your-domain.com",
    to: "contact@your-domain.com",
    subject: `New contact form submission — ${name}`,
    html: `
      <div>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\\n/g, "<br>")}</p>
      </div>
    `,
  });

  if (error) {
    throw error;
  }

  return Response.json({ success: true, data });
}
```

Notes:

- Instantiate `Resend` inside the route handler with `process.env.RESEND_API_KEY`.
- Use `resend.emails.send` and check the `{ data, error }` result.
- Keep `from` and `to` server-only (prefer environment variables).
- This pattern pairs with the honeypot check before validation and sending.

## Security and Anti-Spam

- Honeypot field: add a hidden input (ex: `company`) and reject if it has a
  non-empty value.
- Server-side validation: never rely on client validation alone.
- Optional (recommended) add-ons:
  - Rate limiting (middleware or route-level).
  - CAPTCHA or bot checks.
  - IP/user-agent logging for abuse monitoring.

If you have middleware in the project, it can be used for rate limiting or
header checks, but it is not required for basic wiring.

## Email Provider Configuration

Store API keys and recipient details in environment variables. This guide is
shared across projects, so treat the following as an example/template and
replace with project-specific values.

Example `.env.local` entries:

```bash
RESEND_API_KEY=re_eMbcLz85_Jn1x2eYPLhGuM3UofAYkZZy7
RECEIVER_EMAIL=g.grant92@gmail.com
```

Notes:

- Keep the API key server-only.
- Configure "from" and "to" addresses on the server.
- Keep email templating server-side to avoid exposing provider details.

## Email Formatting

Use a consistent subject line and a predictable text payload so submissions are
easy to scan. Keep formatting minimal and plain-text so it renders reliably in
any inbox.

Suggested subject format:

```
New contact form submission — {name}
```

Suggested plain-text body format:

```
Name: {name}
Email: {email}
Phone: {phone}
Business: {businessName}

Message:
{message}

--
Source: {pageUrl}
Submitted: {submittedAt}
```

Formatting notes:

- Use clear labels per line; avoid HTML unless you truly need it.
- Include the source URL and timestamp for context and debugging.
- If optional fields are blank, omit the line instead of leaving empty labels.

## Response Contract

Use a minimal JSON contract so the client can show clear feedback:

- Success: `{ success: true }`
- Failure: `{ success: false, error: "Human-readable message" }`

## Testing Checklist

- Submit valid data and confirm email delivery.
- Submit with honeypot filled and verify rejection.
- Submit with missing or invalid fields and verify error messaging.
- Confirm client resets state on success.

## Common Pitfalls

- Forgetting `"use client"` in the form component.
- Sending `FormData` without handling it in the API route (JSON expected).
- Missing `Content-Type: application/json` header.
- No server-side validation (leads to spam and invalid data).
- Exposing provider credentials client-side.
