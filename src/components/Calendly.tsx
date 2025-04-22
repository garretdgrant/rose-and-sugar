"use client";
import { useEffect } from "react";

const CalendlyEmbed = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div
      className="calendly-inline-widget"
      data-url="https://calendly.com/garret-grant-swe/cookie-decorating-class-may-27?hide_gdpr_banner=1&background_color=FFDEE2&text_color=08080a"
      style={{ minWidth: "320px", height: "700px" }}
    ></div>
  );
};

export default CalendlyEmbed;
