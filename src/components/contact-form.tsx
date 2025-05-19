"use client";

import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const formRef = useRef(null);
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");

  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus("loading");
    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current
      )
      .then(() => {
        console.log("success")
        setStatus("success");
      })
      .catch((err) => {
        console.error("EmailJS error", err);
        setStatus("error");
      });
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto space-y-6"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
          placeholder="Write your message…"
          rows={4}
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full flex justify-center items-center rounded-full bg-red-400 text-white px-4 py-2 font-semibold hover:bg-blue-700 disabled:opacity-50 transition"
      >
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>

      {status === "success" && (
        <p className="text-green-600 text-center text-sm">
          Thanks! I’ll be in touch soon.
        </p>
      )}
      {status === "error" && (
        <p className="text-red-600 text-center text-sm">
          Oops! Something went wrong.
        </p>
      )}
    </form>
  );
}
