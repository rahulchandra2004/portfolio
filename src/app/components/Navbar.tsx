"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Hackathons", href: "#community" },
  { label: "Work", href: "#work" },
  { label: "Education", href: "#education" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-5"
      >
        <nav
          className="max-w-7xl mx-auto flex items-center justify-between"
        >
          {/* Logo / Name */}
          <motion.a
            href="/"
            className="font-bold text-white tracking-tight"
            style={{ fontSize: "1.05rem" }}
            whileHover={{ opacity: 0.7 }}
            transition={{ duration: 0.2 }}
          >
            Rahul Chandra<span style={{ color: "var(--accent)" }}>.</span>
          </motion.a>

          {/* Desktop nav links */}
          <div
            className="hidden md:flex items-center gap-1 rounded-full px-3 py-2"
            style={{
              background: scrolled ? "rgba(12,12,14,0.8)" : "transparent",
              backdropFilter: scrolled ? "blur(20px)" : "none",
              border: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
              transition: "all 0.4s ease",
            }}
          >
            {navLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium rounded-full"
                style={{ color: "rgba(255,255,255,0.6)" }}
                whileHover={{ color: "#ffffff" }}
                transition={{ duration: 0.2 }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* CTA button */}
          <div className="hidden md:block">
            <motion.a
              href="mailto:rahulpc1981@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2.5 rounded-full text-sm font-semibold"
              style={{
                background: "rgba(160,240,200,0.1)",
                border: "1px solid rgba(160,240,200,0.2)",
                color: "var(--accent)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(160,240,200,0.18)";
                el.style.boxShadow = "0 0 20px rgba(160,240,200,0.15)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(160,240,200,0.1)";
                el.style.boxShadow = "none";
              }}
            >
              Hire me ✦
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
              className="block w-6 h-px bg-white origin-center"
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1 }}
              className="block w-6 h-px bg-white"
              transition={{ duration: 0.2 }}
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
              className="block w-6 h-px bg-white origin-center"
              transition={{ duration: 0.3 }}
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <motion.div
        initial={false}
        animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : -20 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-40 flex flex-col items-center justify-center md:hidden pointer-events-none"
        style={{
          background: "rgba(12,12,14,0.97)",
          backdropFilter: "blur(20px)",
          pointerEvents: menuOpen ? "all" : "none",
        }}
      >
        <div className="flex flex-col items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: menuOpen ? 1 : 0,
                y: menuOpen ? 0 : 20,
              }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="font-bold text-4xl tracking-tight"
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </>
  );
}
