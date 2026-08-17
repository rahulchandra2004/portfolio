"use client";

import { motion } from "framer-motion";

export default function ResumeButton() {
  return (
    <motion.a
      href="/resume.pdf" // The user must place their resume.pdf in the public/ folder
      download="Rahul_Chandra_Resume.pdf"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-5 py-3 rounded-full overflow-hidden group shadow-2xl"
      style={{
        background: "rgba(12, 12, 14, 0.8)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(160, 240, 200, 0.3)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(160, 240, 200, 0.2)";
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(160, 240, 200, 0.6)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 25px 50px -12px rgba(0, 0, 0, 0.5)";
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(160, 240, 200, 0.3)";
      }}
    >
      {/* Background flare on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
           style={{ background: "linear-gradient(135deg, rgba(160, 240, 200, 0.15) 0%, rgba(123, 110, 246, 0.15) 100%)" }} />

      <span className="text-sm font-bold tracking-wide relative z-10" style={{ color: "#a0f0c8" }}>
        Resume
      </span>

      <svg 
        className="w-4 h-4 relative z-10 group-hover:translate-y-0.5 transition-transform duration-300" 
        style={{ color: "#a0f0c8" }}
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    </motion.a>
  );
}
