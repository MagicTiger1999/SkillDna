import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SkillDNA - AI-Powered Career Intelligence Platform",
  description: "Know Your Skills. Know What's Next. SkillDNA uses AI and real-world industry intelligence to identify your skill gaps, build your personalized career roadmap, and help you become industry-ready.",
  keywords: ["career", "skills", "AI", "roadmap", "job search", "skill gap", "portfolio", "tech intelligence"],
  authors: [{ name: "SkillDNA Team" }],
  openGraph: {
    title: "SkillDNA - AI-Powered Career Intelligence Platform",
    description: "Know Your Skills. Know What's Next.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}