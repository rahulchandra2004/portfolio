"use client";

import { motion } from "framer-motion";

const socials = [
  { label: "GitHub", href: "https://github.com/rahulchandra2004" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rahul-chandra-padamuttam-6b5888330" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative px-6 md:px-12 lg:px-20 py-16 overflow-hidden"
      style={{ background: "#0c0c0e", borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Top section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-14">
          <div>
            <p className="font-bold text-2xl text-white tracking-tight">
              Rahul Chandra<span style={{ color: "var(--accent)" }}>.</span>
            </p>
            <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>
              B.Tech Computer Engineering · NIAMT Ranchi · Ongole, AP, India
            </p>
            <a
              href="mailto:rahulpc1981@gmail.com"
              className="text-xs mt-2 inline-block"
              style={{ color: "var(--accent)" }}
            >
              rahulpc1981@gmail.com
            </a>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-6 flex-wrap">
            {socials.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium"
                style={{ color: "rgba(255,255,255,0.35)" }}
                whileHover={{ color: "rgba(255,255,255,0.9)" }}
                transition={{ duration: 0.2 }}
              >
                {s.label}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mb-10"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }} />

        {/* Quick nav */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-10 justify-center">
          {["About", "Experience", "Hackathons", "Work", "Education"].map((link) => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-xs uppercase tracking-[0.2em]"
              style={{ color: "rgba(255,255,255,0.2)" }}
              whileHover={{ color: "rgba(255,255,255,0.6)" }}
              transition={{ duration: 0.2 }}
            >
              {link}
            </motion.a>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
            © {year} Rahul Chandra Padamuttam. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.15)" }}>
            Built with Next.js · Framer Motion · Canvas API · Tailwind CSS
          </p>
        </div>
      </div>

      {/* Background watermark */}
      <div className="absolute bottom-0 right-0 select-none pointer-events-none overflow-hidden leading-none"
        style={{ fontSize: "clamp(5rem, 12vw, 11rem)", color: "rgba(255,255,255,0.015)", fontWeight: 900, letterSpacing: "-0.05em" }}>
        Rahul
      </div>
    </footer>
  );
}
