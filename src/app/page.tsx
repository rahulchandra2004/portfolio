import Navbar from "./components/Navbar";
import ScrollyCanvas from "./components/ScrollyCanvas";
import Mantra from "./components/Mantra";
import About from "./components/About";
import Experience from "./components/Experience";
import Communities from "./components/Communities";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ResumeButton from "./components/ResumeButton";

export default function Home() {
  return (
    <main className="relative" style={{ backgroundColor: "#0c0c0e" }}>
      {/* Fixed floating nav */}
      <Navbar />

      {/* ── Hero Scrollytelling Section (400vh) ────────────────── */}
      <ScrollyCanvas />

      {/* ── Mantra Section ─────────────────────────────────────── */}
      <Mantra />

      {/* ── About & Technical Skills ───────────────────────────── */}
      <About />

      {/* ── Experience Timeline ────────────────────────────────── */}
      <Experience />

      {/* ── Communities & Open Source ──────────────────────────── */}
      <Communities />

      {/* ── Projects Grid ──────────────────────────────────────── */}
      <Projects />

      {/* ── Education & Certifications ─────────────────────────── */}
      <Education />

      {/* ── Contact Form ───────────────────────────────────────── */}
      <Contact />

      {/* ── Footer ────────────────────────────────────────────── */}
      <Footer />

      {/* ── Floating Resume Button ────────────────────────────── */}
      <ResumeButton />
    </main>
  );
}
