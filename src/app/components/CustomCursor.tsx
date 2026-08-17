"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);

  // useMotionValue avoids React re-renders on every mouse move, eliminating lag
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth spring physics for the trailing ring
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Fast, tight spring physics for the inner dot
  const dotSpringConfig = { damping: 30, stiffness: 800, mass: 0.1 };
  const dotXSpring = useSpring(cursorX, dotSpringConfig);
  const dotYSpring = useSpring(cursorY, dotSpringConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Outer trailing ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent pointer-events-none z-[100] hidden md:block mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(160, 240, 200, 0.2)" : "transparent",
        }}
        transition={{ duration: 0.2 }}
      />
      {/* Inner solid dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent pointer-events-none z-[100] hidden md:block mix-blend-difference"
        style={{
          x: dotXSpring,
          y: dotYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
