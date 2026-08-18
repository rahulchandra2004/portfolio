"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useRef, useCallback } from "react";
import * as THREE from "three";
import SpriteText from "three-spritetext";

const ForceGraph3D = dynamic(() => import("react-force-graph-3d"), {
  ssr: false,
});

const SKILLS_DATA = {
  nodes: [
    { id: "Core", group: 0, size: 8, color: "#ffffff" },
    
    // ML & AI
    { id: "AI/ML", group: 1, size: 6, color: "#7b6ef6" },
    { id: "TensorFlow", group: 1, size: 4, color: "#7b6ef6" },
    { id: "Keras", group: 1, size: 4, color: "#7b6ef6" },
    { id: "PyTorch", group: 1, size: 4, color: "#7b6ef6" },
    { id: "Deep Learning", group: 1, size: 4, color: "#7b6ef6" },
    { id: "Computer Vision", group: 1, size: 4, color: "#7b6ef6" },
    { id: "Gen AI", group: 1, size: 4, color: "#7b6ef6" },

    // Data Science
    { id: "Data Science", group: 2, size: 6, color: "#f0a0c8" },
    { id: "Pandas", group: 2, size: 4, color: "#f0a0c8" },
    { id: "NumPy", group: 2, size: 4, color: "#f0a0c8" },
    { id: "Scikit-Learn", group: 2, size: 4, color: "#f0a0c8" },
    { id: "Data Viz", group: 2, size: 4, color: "#f0a0c8" },
    { id: "Excel Analytics", group: 2, size: 3, color: "#f0a0c8" },
    
    // Languages
    { id: "Languages", group: 3, size: 6, color: "#a0f0c8" },
    { id: "Python", group: 3, size: 5, color: "#a0f0c8" },
    { id: "C++", group: 3, size: 5, color: "#a0f0c8" },
    { id: "Java", group: 3, size: 4, color: "#a0f0c8" },
    { id: "C", group: 3, size: 4, color: "#a0f0c8" },

    // Hardware & Robotics
    { id: "Hardware", group: 4, size: 6, color: "#a0d4f0" },
    { id: "Robotics", group: 4, size: 5, color: "#a0d4f0" },
    { id: "Arduino", group: 4, size: 4, color: "#a0d4f0" },
    { id: "IoT", group: 4, size: 4, color: "#a0d4f0" },
    { id: "Sensors", group: 4, size: 3, color: "#a0d4f0" },
    { id: "Embedded", group: 4, size: 3, color: "#a0d4f0" },

    // Cloud & Platforms
    { id: "Cloud", group: 5, size: 6, color: "#f0d8a0" },
    { id: "AWS", group: 5, size: 4, color: "#f0d8a0" },
    { id: "Azure", group: 5, size: 4, color: "#f0d8a0" },
    { id: "Power BI", group: 5, size: 4, color: "#f0d8a0" },
    { id: "Watson Studio", group: 5, size: 3, color: "#f0d8a0" },
  ],
  links: [
    // Core connections
    { source: "Core", target: "AI/ML", value: 2 },
    { source: "Core", target: "Data Science", value: 2 },
    { source: "Core", target: "Languages", value: 2 },
    { source: "Core", target: "Hardware", value: 2 },
    { source: "Core", target: "Cloud", value: 2 },

    // AI/ML connections
    { source: "AI/ML", target: "TensorFlow", value: 1 },
    { source: "AI/ML", target: "Keras", value: 1 },
    { source: "AI/ML", target: "PyTorch", value: 1 },
    { source: "AI/ML", target: "Deep Learning", value: 1 },
    { source: "AI/ML", target: "Computer Vision", value: 1 },
    { source: "AI/ML", target: "Gen AI", value: 1 },
    { source: "TensorFlow", target: "Keras", value: 1 },
    
    // Data Science connections
    { source: "Data Science", target: "Pandas", value: 1 },
    { source: "Data Science", target: "NumPy", value: 1 },
    { source: "Data Science", target: "Scikit-Learn", value: 1 },
    { source: "Data Science", target: "Data Viz", value: 1 },
    { source: "Data Science", target: "Excel Analytics", value: 1 },
    { source: "Pandas", target: "NumPy", value: 1 },
    { source: "Scikit-Learn", target: "AI/ML", value: 1 },

    // Languages connections
    { source: "Languages", target: "Python", value: 1 },
    { source: "Languages", target: "C++", value: 1 },
    { source: "Languages", target: "Java", value: 1 },
    { source: "Languages", target: "C", value: 1 },
    { source: "Python", target: "AI/ML", value: 1 },
    { source: "Python", target: "Data Science", value: 1 },
    { source: "C++", target: "Robotics", value: 1 },
    { source: "C", target: "Embedded", value: 1 },

    // Hardware connections
    { source: "Hardware", target: "Robotics", value: 1 },
    { source: "Hardware", target: "Arduino", value: 1 },
    { source: "Hardware", target: "IoT", value: 1 },
    { source: "Hardware", target: "Sensors", value: 1 },
    { source: "Hardware", target: "Embedded", value: 1 },
    { source: "Robotics", target: "Computer Vision", value: 1 },

    // Cloud connections
    { source: "Cloud", target: "AWS", value: 1 },
    { source: "Cloud", target: "Azure", value: 1 },
    { source: "Cloud", target: "Power BI", value: 1 },
    { source: "Cloud", target: "Watson Studio", value: 1 },
  ]
};

export default function SkillsGraph() {
  const fgRef = useRef<any>();
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  // Hover state
  const [hoverNode, setHoverNode] = useState<any>(null);
  // Ensure it only renders on client
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Resize observer
  useEffect(() => {
    if (!mounted || !containerRef.current) return;
    
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight || 500,
        });
      }
    };
    
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [mounted]);

  // Make the graph slowly spin
  useEffect(() => {
    if (mounted && fgRef.current) {
      const controls = fgRef.current.controls();
      if (controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1.0;
        fgRef.current.cameraPosition({ z: 300 });
      }
    }
  }, [mounted]);

  // Force native scroll propagation
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const stopWheel = (e: WheelEvent) => {
      // Don't prevent default, just stop the event from reaching the canvas
      e.stopPropagation();
    };

    // Use capture: true so we intercept the event BEFORE it reaches the canvas
    wrapper.addEventListener('wheel', stopWheel, { capture: true, passive: true });
    
    return () => {
      wrapper.removeEventListener('wheel', stopWheel, { capture: true });
    };
  }, [mounted]);

  const handleNodeHover = useCallback((node: any) => {
    setHoverNode(node || null);
    
    if (fgRef.current) {
      const controls = fgRef.current.controls();
      if (controls) {
        controls.autoRotate = !node;
      }
    }
  }, []);

  const handleNodeClick = useCallback((node: any) => {
    if (!fgRef.current) return;
    const distance = 100;
    const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);
    
    fgRef.current.cameraPosition(
      { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio },
      node,
      1500
    );
  }, []);

  if (!mounted) return <div className="w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-2xl bg-black/20 animate-pulse border border-white/10" />;

  return (
    <div 
      ref={containerRef} 
      className="w-full h-[500px] md:h-[600px] lg:h-[700px] relative rounded-2xl overflow-hidden border border-white/10 pointer-events-none md:pointer-events-auto"
      style={{ background: "rgba(0,0,0,0.2)" }}
    >
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)] animate-pulse" />
          <span className="text-xs uppercase tracking-widest text-white/70 font-semibold">Interactive Matrix</span>
        </div>
        <p className="text-xs text-white/40 hidden md:block">Drag nodes to interact · Click to zoom</p>
      </div>
      <div 
        ref={wrapperRef}
        className="w-full h-full" 
      >
        <ForceGraph3D
        ref={fgRef}
        width={dimensions.width}
        height={dimensions.height}
        graphData={SKILLS_DATA}
        nodeLabel=""
        nodeColor={(node: any) => node.color}
        nodeRelSize={4}
        linkWidth={(link: any) => hoverNode && (hoverNode === link.source || hoverNode === link.target) ? 2 : 0.5}
        linkColor={(link: any) => hoverNode && (hoverNode === link.source || hoverNode === link.target) ? link.source.color || "#ffffff" : "rgba(255,255,255,0.15)"}
        linkDirectionalParticles={(link: any) => hoverNode && (hoverNode === link.source || hoverNode === link.target) ? 4 : 0}
        linkDirectionalParticleWidth={1.5}
        linkDirectionalParticleSpeed={0.01}
        nodeThreeObject={(node: any) => {
          const sprite = new SpriteText(node.id);
          sprite.color = node.color;
          sprite.textHeight = node.size * 1.5;
          
          if (hoverNode) {
            const isNeighbor = SKILLS_DATA.links.some((l: any) => 
              (l.source.id === node.id && l.target.id === hoverNode.id) || 
              (l.target.id === node.id && l.source.id === hoverNode.id)
            );
            
            if (node.id === hoverNode.id) {
              sprite.textHeight = node.size * 2.5;
              sprite.color = "#ffffff";
            } else if (!isNeighbor && node.id !== "Core") {
              sprite.color = "rgba(255,255,255,0.1)";
            }
          }
          
          return sprite;
        }}
        onNodeHover={handleNodeHover}
        onNodeClick={handleNodeClick}
        backgroundColor="rgba(0,0,0,0)"
        showNavInfo={false}
        />
      </div>
    </div>
  );
}
