import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import Terminal from "./components/Terminal";

export const metadata: Metadata = {
  title: "Rahul Chandra | AI & Robotics Engineer",
  description:
    "Portfolio of Rahul Chandra Padamuttam. Engineering advanced bipedal robots, machine learning pipelines, and autonomous observability systems.",
  keywords: ["AI Engineer", "Robotics", "Machine Learning", "Next.js", "Computer Vision", "OmniSRE", "Portfolio"],
  authors: [{ name: "Rahul Chandra Padamuttam" }],
  openGraph: {
    title: "Rahul Chandra | AI & Robotics",
    description: "Building systems that live at the intersection of Hardware, AI, and Software Engineering.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-light-text antialiased" style={{ backgroundColor: "#0c0c0e" }}>
        <CustomCursor />
        <Terminal />
        {children}
      </body>
    </html>
  );
}
