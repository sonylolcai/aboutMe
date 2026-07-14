import type { Metadata } from "next";
import { Geist, Geist_Mono, Long_Cang, Noto_Sans_SC } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import DynamicBackground from "@/components/DynamicBackground";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sans-sc",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

const longCang = Long_Cang({
  variable: "--font-long-cang",
  weight: "400",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "蔡璐阳（Sonny）｜高级全栈工程师 · 企业级系统与 AI Agent",
  description: "9 年以上全栈交付经验，专注企业级 SaaS、实时数据与 AI Agent 系统；React、Next.js、Node.js、Python 与 RAG 工程实践。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} ${notoSansSC.variable} ${longCang.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans text-obsidian bg-paper selection:bg-acid/40 overflow-x-hidden cursor-none">
        <CustomCursor />
        <DynamicBackground />
        {children}
      </body>
    </html>
  );
}
