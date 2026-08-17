"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    role: "Core Member",
    org: "Code/Forge, NIAMT Ranchi",
    period: "Jan 2026 – Present",
    type: "Community",
    accent: "#c8f0a0",
    description:
      "Core member of the Community of Robotics and Automation at NIAMT Ranchi. Driving robotics projects, workshops, and collaboration with peers.",
    tags: ["Robotics", "Automation", "Community Lead", "NIAMT"],
  },
  {
    role: "Research Intern",
    org: "MANIT Bhopal (NIT Bhopal)",
    period: "Jun 2026 – Jul 2026",
    type: "Research",
    accent: "#a0f0c8",
    description:
      "Selected for the prestigious Summer Internship Programme at MANIT Bhopal, where I spearheaded the development of a 12 Degrees of Freedom bipedal humanoid robot.",
    tags: ["Robotics", "Bipedal Systems", "NIT Bhopal"],
  },
  {
    role: "Machine Learning Intern",
    org: "EISystems Technologies",
    period: "Feb 2026 – Apr 2026",
    type: "Industry",
    accent: "#7b6ef6",
    description:
      "Developed and benchmarked CNN, DNN, and RNN architectures for digit recognition using the MNIST dataset, focusing on optimizing models for production pipelines.",
    tags: ["TensorFlow", "CNN / RNN", "Computer Vision"],
  },
  {
    role: "Power BI Intern",
    org: "Microsoft Elevate AICTE Internship",
    period: "Feb 2026 – Mar 2026",
    type: "Industry",
    accent: "#f0d8a0",
    description:
      "Developed an interactive Quick Commerce Delivery & Customer Insights Dashboard tracking orders, revenue, and delivery metrics for platforms like Swiggy Instamart and Blinkit.",
    tags: ["Power BI", "Data Visualization", "Dashboard Design", "AICTE"],
  },
  {
    role: "Artificial Intelligence Intern",
    org: "Codec Technologies India",
    period: "Jan 2026",
    type: "Industry",
    accent: "#f0a0c8",
    description:
      "Developed weather predictive models using regression techniques and built a Python-based real-time speech-to-text pipeline using CMU Sphinx and Google Speech API.",
    tags: ["AI", "Python", "Speech-to-Text", "Predictive Modeling"],
  },
  {
    role: "Python Programming Intern",
    org: "YBI Foundation",
    period: "Dec 2025 – Jan 2026",
    type: "Industry",
    accent: "#a0d4f0",
    description:
      "Built a TensorFlow Artificial Neural Network (ANN) for energy consumption forecasting, implementing temporal deep learning techniques.",
    tags: ["Python", "TensorFlow", "ANN", "Energy Forecasting"],
  },
];

function ExperienceCard({
  exp,
  index,
}: {
  exp: (typeof experiences)[0];
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex gap-6 md:gap-10 items-start"
    >
      {/* Timeline node */}
      <div className="flex flex-col items-center flex-shrink-0 pt-1">
        <motion.div
          whileInView={{ scale: [0, 1.3, 1] }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="w-3 h-3 rounded-full z-10 relative"
          style={{ background: exp.accent, boxShadow: `0 0 12px ${exp.accent}60` }}
        />
        {index < experiences.length - 1 && (
          <div className="w-px flex-1 mt-2" style={{ background: "rgba(255,255,255,0.07)", minHeight: "60px" }} />
        )}
      </div>

      {/* Card */}
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25 }}
        className="flex-1 rounded-2xl p-6 mb-6 group"
        style={{
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(255,255,255,0.07)",
          transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = `${exp.accent}33`;
          (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 40px ${exp.accent}10`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
          (e.currentTarget as HTMLElement).style.boxShadow = "none";
        }}
      >
        {/* Top row */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <span
              className="text-xs uppercase font-semibold tracking-widest px-2 py-1 rounded-md mb-2 inline-block"
              style={{ background: `${exp.accent}18`, color: exp.accent }}
            >
              {exp.type}
            </span>
            <h3 className="font-bold text-white text-lg leading-tight">{exp.role}</h3>
            <p className="text-sm font-medium mt-0.5" style={{ color: exp.accent }}>{exp.org}</p>
          </div>
          <span
            className="text-xs font-mono px-3 py-1.5 rounded-full flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}
          >
            {exp.period}
          </span>
        </div>

        <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.45)" }}>
          {exp.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {exp.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-full"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="relative px-6 md:px-12 lg:px-20 py-28 md:py-36"
      style={{ background: "#0d0d10" }}>
      {/* Ambient */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(160,240,200,0.03) 0%, transparent 70%)", transform: "translate(20%, -20%)" }} />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20"
        >
          <p className="text-xs uppercase tracking-[0.4em] mb-4 font-medium" style={{ color: "var(--accent)" }}>
            Experience
          </p>
          <h2 className="font-bold tracking-tight leading-none mb-4"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)", color: "#ffffff" }}>
            Where I&apos;ve{" "}
            <span style={{
              background: "linear-gradient(135deg, #a0f0c8 0%, #7b6ef6 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>Worked</span>
          </h2>
          <div className="mt-8 h-px w-full"
            style={{ background: "linear-gradient(90deg, rgba(160,240,200,0.3), rgba(123,110,246,0.3), transparent)" }} />
        </motion.div>

        {/* Timeline */}
        <div>
          {experiences.map((exp, i) => (
            <ExperienceCard key={`${exp.org}-${i}`} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
