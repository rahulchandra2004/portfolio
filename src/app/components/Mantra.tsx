"use client";

import { motion } from "framer-motion";

export default function Mantra() {
  return (
    <section
      className="relative flex flex-col items-center justify-center px-6 md:px-12 py-32 md:py-48 overflow-hidden"
      style={{ background: "#0c0c0e" }}
    >
      {/* Ambient background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-96 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(123,110,246,0.05) 0%, transparent 60%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center flex flex-col items-center"
      >
        {/* Decorative quote mark */}
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 0.3, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-8xl font-black leading-none mb-6 block"
          style={{ color: "var(--accent)", fontFamily: "Georgia, serif" }}
        >
          "
        </motion.span>

        <p
          className="font-bold leading-tight tracking-tight max-w-4xl"
          style={{
            fontSize: "clamp(1.8rem, 4.5vw, 4rem)",
            color: "#ffffff",
            lineHeight: 1.2,
          }}
        >
          Not your normal{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #a0f0c8 0%, #7b6ef6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            AI guy
          </span>
          —
          <br />
          I don&apos;t just write code,{" "}
          <span style={{ color: "rgba(255,255,255,0.55)", fontWeight: 400 }}>
            I engineer
          </span>
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #7b6ef6 0%, #a0f0c8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            end-to-end intelligence
          </span>
          <br />
          <span style={{ color: "rgba(255,255,255,0.55)", fontWeight: 400 }}>
            bridging open-source software
          </span>
          <br />
          and{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #f0a0c8 0%, #f0d8a0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            physical robotics.
          </span>
        </p>
      </motion.div>
    </section>
  );
}
