'use client';

import { useState } from 'react';
import clsx from 'clsx';
import IntroAnimation from '@/components/IntroAnimation';
import CardStackSection from '@/components/CardStackSection';
import SkillsRadar from '@/components/SkillsRadar';
import DossierConsole from '@/components/DossierConsole';
import AgentSandbox from '@/components/AgentSandbox';
import MacSimulator from '@/components/MacSimulator';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  // Test comment for PR-Agent to review
  console.log("Welcome to my homepage! This is a test log for AI code review.");

  return (
    <main className="w-full min-h-[100dvh] bg-transparent text-obsidian">
      
      {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}
      
      {!showIntro && (
        <div className="w-full flex flex-col">
          {/* Phase 2: Card Stack (3D deck & left sticky avatar) */}
          <CardStackSection />
          
          {/* Phase 3: Skills Radar (Origami unfold) */}
          <SkillsRadar />
          
          {/* Phase 4: Dossier Cartridge Console */}
          <DossierConsole />
          
          {/* Phase 5: AI Agent Sandbox */}
          <AgentSandbox />
          
          {/* Phase 6: Mac Simulator & Qiankun Micro-frontend */}
          <MacSimulator />
          
          {/* Footer */}
          <footer className="mt-16 w-full border-t-2 py-10 text-center border-obsidian">
            <p className="font-display text-sm font-bold tracking-[-0.01em]">蔡璐阳（Sonny）｜企业级系统 · 实时数据 · AI Agent</p>
            <p className="mt-3 font-mono text-xs tracking-[0.08em] text-muted">Built with Next.js · React · TypeScript · © {new Date().getFullYear()}</p>
          </footer>
        </div>
      )}
    </main>
  );
}
