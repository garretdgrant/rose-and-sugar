"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CustomOrderAvailability() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const sending = useRef(false);
  const statusRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (status === "success") statusRef.current?.focus();
  }, [status]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current || status === "success") return;
    sending.current = true;
    setStatus("sending");

    try {
      const response = await fetch("/api/contact/custom-order-availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company, consent: true }),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    } finally {
      sending.current = false;
    }
  }

  return (
    <section
      id="custom-order-availability"
      aria-labelledby="availability-heading"
      className="mb-10 rounded-3xl border border-bakery-pink-light bg-bakery-cream/80 p-6 md:p-8"
    >
      <h2
        id="availability-heading"
        className="font-bebas text-3xl text-gray-800"
      >
        November 2026 custom orders are full
      </h2>
      <p className="mt-2 font-poppins text-sm leading-relaxed text-gray-700">
        Thank you for keeping us busy! We aren&apos;t taking any additional
        November custom orders. You can still use the form below to ask about
        other dates.
      </p>
      <h3 className="mt-6 font-poppins font-semibold text-gray-800">
        Get notified when custom orders are available
      </h3>
      <p
        id="availability-consent"
        className="mt-2 font-poppins text-sm text-gray-700"
      >
        Leave your email to ask Megan to contact you about custom order
        availability. This does not reserve a spot or sign you up for marketing
        emails.
      </p>
      {status !== "success" && (
        <form
          onSubmit={onSubmit}
          className="mt-4 space-y-3"
          aria-busy={status === "sending"}
        >
          <label
            htmlFor="availability-email"
            className="block font-poppins text-sm font-medium text-gray-800"
          >
            Email address
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              id="availability-email"
              type="email"
              name="email"
              autoComplete="email"
              required
              maxLength={254}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-describedby="availability-consent availability-status"
              disabled={status === "sending"}
              className="rounded-xl border-bakery-pink-light bg-white sm:flex-1"
            />
            <Button
              type="submit"
              disabled={status === "sending"}
              className="rounded-full bg-bakery-pink-dark px-6 text-white hover:bg-bakery-brown"
            >
              {status === "sending" ? "Sending…" : "Notify me"}
            </Button>
          </div>
          <div hidden aria-hidden="true">
            <label htmlFor="availability-company">Company</label>
            <input
              id="availability-company"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
            />
          </div>
        </form>
      )}
      <p
        id="availability-status"
        ref={statusRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="mt-3 font-poppins text-sm text-gray-800"
      >
        {status === "success" &&
          "Thanks! Your request has been sent to Megan. She can email you when custom order spots are available."}
        {status === "error" &&
          "We couldn’t send your request. Please try again in a moment."}
      </p>
    </section>
  );
}
