"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "00c42e9b-d41f-49a8-af4b-5d00cad1b40b");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setStatus("success");
      } else {
        console.error("Form submission error:", data);
        setStatus("error");
      }
    } catch (error) {
      console.error("Form submission failed:", error);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="relative px-6 md:px-12 lg:px-20 py-28 md:py-36"
      style={{ background: "#0d0d10" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(160,240,200,0.03) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.4em] mb-4 font-medium" style={{ color: "var(--accent)" }}>
            Get in touch
          </p>
          <h2
            className="font-bold tracking-tight leading-none mb-6"
            style={{ fontSize: "clamp(3rem, 7vw, 5rem)", color: "#ffffff" }}
          >
            Let&apos;s build something.
          </h2>
          <p className="text-sm leading-relaxed max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.4)" }}>
            Whether you have a question, a project idea, or just want to say hi, I&apos;ll try my best to get back to you!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl p-8 md:p-12 relative overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center py-10"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                style={{ background: "rgba(160,240,200,0.1)", border: "1px solid rgba(160,240,200,0.2)" }}
              >
                <svg className="w-8 h-8 text-[#a0f0c8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                Thanks for reaching out. I&apos;ll get back to you as soon as possible.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-8 text-xs font-semibold uppercase tracking-widest hover:text-white transition-colors"
                style={{ color: "var(--accent)" }}
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs uppercase tracking-widest font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    disabled={status === "submitting"}
                    className="w-full bg-transparent border-b border-white/10 px-0 py-3 text-sm text-white focus:outline-none focus:border-[#a0f0c8] transition-colors disabled:opacity-50 rounded-none"
                    placeholder="John Doe"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs uppercase tracking-widest font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    disabled={status === "submitting"}
                    className="w-full bg-transparent border-b border-white/10 px-0 py-3 text-sm text-white focus:outline-none focus:border-[#a0f0c8] transition-colors disabled:opacity-50 rounded-none"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs uppercase tracking-widest font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  disabled={status === "submitting"}
                  className="w-full bg-transparent border-b border-white/10 px-0 py-3 text-sm text-white focus:outline-none focus:border-[#a0f0c8] transition-colors resize-none disabled:opacity-50 rounded-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="self-start mt-4 px-8 py-4 rounded-full text-sm font-semibold tracking-wide transition-all disabled:opacity-70 flex items-center gap-3 group overflow-hidden relative"
                style={{
                  background: "linear-gradient(135deg, #a0f0c8 0%, #7b6ef6 100%)",
                  color: "#0c0c0e",
                  boxShadow: "0 10px 30px -10px rgba(123,110,246,0.5)",
                }}
              >
                <span className="relative z-10">{status === "submitting" ? "Sending..." : "Send Message"}</span>
                {status !== "submitting" && (
                  <svg
                    className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                )}
                {/* Hover flare */}
                <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </button>
            </form>
          )}

          {/* Form decorative background pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none opacity-[0.02]"
            style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "16px 16px" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
