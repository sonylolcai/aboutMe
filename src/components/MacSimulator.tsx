'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import {
  Apple,
  ChevronLeft,
  ChevronRight,
  FileTerminal,
  LockKeyhole,
  RotateCw,
  X,
  ExternalLink,
} from 'lucide-react';

const projects = [
  {
    name: 'PA_Agent.app',
    href: 'https://for-one-dream.cloud/pa-agent/',
    description: 'A 股 AI 量化分析平台：K 线渲染、两阶段 SSE 推理、多 Agent 决策链与滚动回测。',
  },
  {
    name: 'Auto_Questionnairer.app',
    href: 'https://for-one-dream.cloud/interview/',
    description: 'AI 智能访谈问卷：SSE 流式对话、动态追问、话题路由与生产环境部署。',
  },
] as const;

type Project = (typeof projects)[number];

export default function MacSimulator() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.6, once: true });
  const reduceMotion = useReducedMotion();
  const [macState, setMacState] = useState<'off' | 'booting' | 'desktop'>('off');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [frameState, setFrameState] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const [frameKey, setFrameKey] = useState(0);
  const [minimumLoadingTimeMet, setMinimumLoadingTimeMet] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    const bootTimer = window.setTimeout(() => setMacState('booting'), 0);
    const desktopTimer = window.setTimeout(() => setMacState('desktop'), reduceMotion ? 0 : 1300);

    return () => {
      window.clearTimeout(bootTimer);
      window.clearTimeout(desktopTimer);
    };
  }, [isInView, reduceMotion]);

  const openProject = (project: Project) => {
    if (activeProject?.name === project.name) return;

    setActiveProject(project);
    setFrameState('loading');
    setMinimumLoadingTimeMet(false);
    setFrameKey((current) => current + 1);

    setTimeout(() => {
      setMinimumLoadingTimeMet(true);
    }, 3000);
  };

  const closeBrowser = () => {
    setActiveProject(null);
    setFrameState('idle');
  };

  const reloadProject = () => {
    setFrameState('loading');
    setFrameKey((current) => current + 1);
  };

  return (
    <section className="relative w-full bg-transparent py-[clamp(3.5rem,8vw,7rem)]">
      <div className="page-shell">
        <header className="border-obsidian mb-10 grid gap-5 border-b-2 pb-7 md:grid-cols-[minmax(0,1fr)_minmax(18rem,.8fr)] md:items-end">
          <div>
            <p className="text-electric font-mono text-xs font-bold tracking-[0.1em]">
              PERSONAL PROJECTS
            </p>
            <h2 className="mt-2 text-2xl leading-[1.1] font-bold tracking-[-0.03em] md:mt-5 md:text-4xl md:text-[clamp(2rem,3vw,3.5rem)]">
              在一台虚拟 Mac 里，直接体验真实项目。
            </h2>
          </div>
        </header>

        <div
          ref={containerRef}
          className="relative mx-auto aspect-[4/5] w-full max-w-[68rem] sm:aspect-[10/7]"
        >
          <div className="brutal-border brutal-shadow absolute inset-0 flex flex-col bg-[#E7E8E2] p-3 pb-10 sm:p-5 sm:pb-12">
            <div className="bg-obsidian brutal-border relative flex-1 overflow-hidden">
              <div
                className={`bg-obsidian absolute inset-0 z-20 transition-opacity duration-500 ${macState === 'off' ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
              />

              <div
                className={`absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#202326] transition-opacity duration-300 ${macState === 'booting' ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
              >
                <Apple size={52} className="text-paper mb-7" />
                <div className="bg-paper/20 h-1.5 w-40 overflow-hidden">
                  <motion.div
                    className="bg-acid h-full"
                    initial={{ width: '0%' }}
                    animate={macState === 'booting' ? { width: '100%' } : { width: '0%' }}
                    transition={{ duration: reduceMotion ? 0 : 1.1, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>

              <div
                className={`bg-acid absolute inset-0 flex flex-col transition-opacity duration-500 ${macState === 'desktop' ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
              >
                <div className="border-obsidian/35 text-obsidian flex h-8 shrink-0 items-center border-b px-3 text-[0.6875rem] font-semibold sm:px-4 sm:text-xs">
                  <Apple size={14} className="mr-3" />
                  <span className="mr-3">Finder</span>
                  <span className="hidden sm:inline">File</span>
                  <span className="ml-auto font-mono">Projects</span>
                </div>

                <div className="relative z-0 flex flex-1 flex-col items-start gap-5 p-4 sm:p-6">
                  {projects.map((project) => (
                    <button
                      key={project.name}
                      type="button"
                      aria-label={`在虚拟 Safari 中打开 ${project.name}`}
                      onClick={() => openProject(project)}
                      className="group flex w-20 flex-col items-center outline-none"
                    >
                      <span className="border-obsidian bg-paper text-obsidian grid h-14 w-14 place-items-center border-2 shadow-[2px_2px_0px_0px_rgba(24,26,28,0.5)] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:shadow-[4px_4px_0px_0px_rgba(24,26,28,1)] group-focus:-translate-y-0.5">
                        <FileTerminal size={27} />
                      </span>
                      <span className="text-obsidian group-hover:bg-electric mt-2 w-full truncate rounded px-1 py-0.5 text-center font-mono text-[10px] font-bold transition-colors group-hover:text-white sm:text-xs">
                        {project.name.replace('.app', '')}
                      </span>
                    </button>
                  ))}
                </div>

                <AnimatePresence initial={false}>
                  {activeProject && (
                    <motion.div
                      key={activeProject.name}
                      className="bg-paper brutal-border brutal-shadow absolute inset-2 top-10 z-30 flex flex-col overflow-hidden sm:inset-4 sm:top-12"
                      initial={reduceMotion ? false : { opacity: 0, scale: 0.94, y: 24 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={reduceMotion ? undefined : { opacity: 0, scale: 0.97, y: 12 }}
                      transition={{ duration: reduceMotion ? 0 : 0.24, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="border-obsidian/25 text-obsidian flex h-9 shrink-0 items-center border-b bg-[#e7e7ec] px-3">
                        <button
                          type="button"
                          aria-label="关闭 Safari"
                          onClick={closeBrowser}
                          className="text-obsidian/0 hover:text-obsidian grid h-5 w-5 place-items-center rounded-full bg-[#FF5F56] transition-colors"
                        >
                          <X size={10} />
                        </button>
                        <span
                          className="ml-2 h-3 w-3 rounded-full bg-[#FFBD2E]"
                          aria-hidden="true"
                        />
                        <span
                          className="ml-2 h-3 w-3 rounded-full bg-[#27C93F]"
                          aria-hidden="true"
                        />
                        <span className="mx-auto truncate px-8 font-mono text-[0.625rem] font-bold sm:text-xs">
                          Safari · {activeProject.name}
                        </span>
                      </div>

                      <div className="border-obsidian/20 text-obsidian flex h-11 shrink-0 items-center gap-2 border-b bg-[#f4f4f6] px-2 sm:px-3">
                        <button
                          type="button"
                          aria-label="后退"
                          disabled
                          className="text-obsidian/30 grid h-7 w-7 place-items-center"
                        >
                          <ChevronLeft size={15} />
                        </button>
                        <button
                          type="button"
                          aria-label="前进"
                          disabled
                          className="text-obsidian/30 grid h-7 w-7 place-items-center"
                        >
                          <ChevronRight size={15} />
                        </button>
                        <button
                          type="button"
                          aria-label="刷新项目"
                          onClick={reloadProject}
                          className="hover:bg-obsidian/10 grid h-7 w-7 place-items-center transition-colors"
                        >
                          <RotateCw size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => window.open(activeProject.href, '_blank')}
                          aria-label="在新标签页中打开链接"
                          className="group/url text-obsidian/75 relative flex h-7 min-w-0 flex-1 cursor-pointer items-center justify-center gap-2 bg-[#e4e4e9] px-3 font-mono text-[0.625rem] transition-colors hover:bg-[#dcdce1]"
                        >
                          <LockKeyhole size={12} className="shrink-0" />
                          <span className="truncate">
                            {activeProject.href.replace('https://', '')}
                          </span>
                          <div className="absolute right-2 grid h-5 w-5 place-items-center rounded opacity-0 transition-all group-hover/url:opacity-100">
                            <ExternalLink size={12} />
                          </div>
                        </button>
                      </div>

                      <div className="relative min-h-0 flex-1 bg-white">
                        <iframe
                          key={`${activeProject.name}-${frameKey}`}
                          src={activeProject.href}
                          title={`${activeProject.name} 项目预览`}
                          className="h-full w-full border-0 bg-white"
                          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-downloads"
                          allow="clipboard-read; clipboard-write"
                          onLoad={() => setFrameState('ready')}
                          onError={() => setFrameState('error')}
                        />

                        {/* Unified Loading Overlay */}
                        <AnimatePresence>
                          {(!minimumLoadingTimeMet || frameState === 'loading') &&
                            frameState !== 'error' && (
                              <motion.div
                                key={`loading-${activeProject.name}`}
                                className="bg-obsidian/95 absolute inset-0 z-10 flex flex-col items-center justify-center px-6"
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <span className="border-obsidian bg-paper text-obsidian mb-6 grid h-16 w-16 place-items-center border-2 shadow-[4px_4px_0px_0px_rgba(158,189,69,1)]">
                                  <FileTerminal size={32} />
                                </span>
                                <h3 className="mb-8 font-mono text-lg font-bold tracking-widest text-white sm:text-xl">
                                  {activeProject.name}
                                </h3>

                                <div className="relative mb-8 h-1.5 w-full max-w-xs overflow-hidden border border-white/10 bg-white/20">
                                  <motion.div
                                    className="bg-electric absolute top-0 bottom-0 left-0"
                                    initial={{ width: '0%' }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: 3, ease: 'linear' }}
                                  />
                                </div>

                                <p className="max-w-sm text-center text-sm leading-relaxed text-white/80">
                                  {activeProject.description}
                                </p>
                              </motion.div>
                            )}
                        </AnimatePresence>

                        {frameState === 'error' && (
                          <div className="bg-paper text-obsidian absolute inset-0 grid place-items-center p-8 text-center text-sm leading-7">
                            项目暂时无法在内嵌浏览器中载入，请稍后点击刷新重试。
                          </div>
                        )}
                      </div>

                      <div className="border-obsidian/20 text-obsidian/60 flex h-7 shrink-0 items-center justify-between border-t bg-[#fafafb] px-3 font-mono text-[0.5625rem] tracking-[0.08em]">
                        <span>EMBEDDED EXTERNAL PAGE</span>
                        <span>{frameState === 'ready' ? 'READY' : frameState.toUpperCase()}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div
              className="brutal-border brutal-shadow absolute -bottom-12 left-1/2 h-12 w-48 -translate-x-1/2 bg-[#D1D1CB]"
              style={{ clipPath: 'polygon(20% 0, 80% 0, 100% 100%, 0% 100%)' }}
            />
            <div className="brutal-border brutal-shadow absolute -bottom-[4.25rem] left-1/2 h-5 w-64 -translate-x-1/2 bg-[#E7E8E2]" />
          </div>
        </div>
      </div>
    </section>
  );
}
