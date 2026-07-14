'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';

const skillsData = [
  {
    id: 'frontend',
    label: '前端架构',
    score: 0.95,
    angle: -Math.PI / 2,
    content: {
      scope: 'React 18+ · Next.js App Router · TypeScript · Vue · TanStack Query · Zustand',
      decision: '为多租户 SaaS 设计混合渲染、缓存与跨模块状态策略。',
      outcome: '核心页面 TTI 降低 40%；万级资产列表使用虚拟滚动后，渲染耗时降低 60%、内存降低 50%。',
    },
  },
  {
    id: 'backend',
    label: '服务协同',
    score: 0.82,
    angle: -Math.PI / 2 + (2 * Math.PI) / 5,
    content: {
      scope: 'Node.js · Next.js API Routes · FastAPI · PostgreSQL · REST · Docker · nginx',
      decision: '以 Node.js + PostgreSQL 交付审批流程引擎，并将前端体验与服务端可靠性一并设计。',
      outcome: '高交易量场景中，Fetch Queue 以并发控制、请求去重与指数退避重试，将 API 成功率提升至 98%。',
    },
  },
  {
    id: 'ai',
    label: 'Agent 工程',
    score: 0.85,
    angle: -Math.PI / 2 + (4 * Math.PI) / 5,
    content: {
      scope: 'LangChain · LangGraph · MCP · Function Calling · Chroma · SSE · RAGAS',
      decision: '将文档导入、向量嵌入、语义 + BM25 混合检索与工具调用组织为可评估的 Agent 链路。',
      outcome: '独立完成端到端 RAG 管线，并以 RAGAS 量化检索质量后接入实际业务操作流。',
    },
  },
  {
    id: 'delivery',
    label: '工程交付',
    score: 0.88,
    angle: -Math.PI / 2 + (6 * Math.PI) / 5,
    content: {
      scope: 'Design Token · 组件库 · Jest / Vitest · ESLint · GitLab CI/CD · Agile / Scrum',
      decision: '把设计系统、质量门禁和发布流程作为团队共享的交付基座，而非单个项目的临时方案。',
      outcome: '带领 6 人团队交付 5 个项目、累计 20 万+行代码；开发效率提升 60%，Bug 率降低 70%。',
    },
  },
  {
    id: 'business',
    label: '业务建模',
    score: 0.75,
    angle: -Math.PI / 2 + (8 * Math.PI) / 5,
    content: {
      scope: '多租户 RBAC · 审批状态机 · 还款对账 · 金融数据可视化 · i18n',
      decision: '将租户生命周期、权限、审批、还款和对账等业务流程拆成可复用的产品与状态模型。',
      outcome: '在金融数据场景中兼顾实时性、准确性与可读性，并以证券、基金从业资格补足业务理解。',
    },
  },
] as const;

import ScrambleText from './ScrambleText';

export default function SkillsRadar() {
  const [activeSkill, setActiveSkill] = useState<(typeof skillsData)[number]['id']>('frontend');
  const reduceMotion = useReducedMotion();
  const center = { x: 200, y: 200 };
  const radius = 128;
  const activeData = skillsData.find((skill) => skill.id === activeSkill) ?? skillsData[0];
  const getPoint = (angle: number, scale = 1) => ({
    x: center.x + Math.cos(angle) * radius * scale,
    y: center.y + Math.sin(angle) * radius * scale,
  });
  const evidencePath = skillsData.map((skill, index) => {
    const point = getPoint(skill.angle, skill.score);
    return `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;
  }).join(' ') + ' Z';

  return (
    <section className="bg-transparent py-[clamp(3.5rem,8vw,7rem)]">
      <div className="page-shell grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr] lg:items-center lg:gap-12 xl:gap-16">
        <div className="md:col-span-2 lg:col-span-1">
          <p className="font-mono text-xs font-bold tracking-[0.1em] text-electric">ENGINEERING MAP</p>
          <h2 className="mt-2 md:mt-5 text-2xl md:text-4xl font-bold leading-[1.1] tracking-[-0.03em] md:text-[clamp(2rem,3vw,3.5rem)]">
            <ScrambleText text="能力不是自评，" /><br />
            <ScrambleText text="而是可复核的工程证据。" delay={300} />
          </h2>


          <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="工程能力">
            {skillsData.map((skill) => {
              const isActive = skill.id === activeSkill;
              return (
                <button
                  key={skill.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveSkill(skill.id)}
                  className={`min-h-11 border px-3 py-2 text-sm font-semibold transition-colors ${isActive ? 'border-obsidian bg-acid text-obsidian' : 'border-obsidian/30 bg-paper text-muted hover:border-obsidian hover:text-obsidian'}`}
                >
                  {skill.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mx-auto w-full max-w-[20rem] sm:max-w-sm lg:max-w-[28rem]">
          <svg viewBox="0 0 400 400" className="h-auto w-full" aria-label="工程能力地图">
              {[1, 0.72, 0.44].map((scale) => (
                <polygon
                  key={scale}
                  points={skillsData.map((skill) => {
                    const point = getPoint(skill.angle, scale);
                    return `${point.x},${point.y}`;
                  }).join(' ')}
                  fill="none"
                  stroke="#181A1C"
                  strokeWidth="1"
                  strokeOpacity="0.2"
                />
              ))}
              {skillsData.map((skill) => {
                const point = getPoint(skill.angle, 1);
                return <line key={skill.id} x1={center.x} y1={center.y} x2={point.x} y2={point.y} stroke="#181A1C" strokeWidth="1" strokeOpacity="0.2" />;
              })}
              <path d={evidencePath} fill="#9EBD4533" stroke="#181A1C" strokeWidth="2" />
              {skillsData.map((skill) => {
                const point = getPoint(skill.angle, skill.score);
                const labelPoint = getPoint(skill.angle, 1.12);
                const isActive = activeSkill === skill.id;
                return (
                  <g key={skill.id} className="cursor-pointer" onClick={() => setActiveSkill(skill.id)}>
                    <circle cx={point.x} cy={point.y} r="7" fill={isActive ? '#9EBD45' : '#181A1C'} stroke="#F7F7F5" strokeWidth="2" />
                    <text x={labelPoint.x} y={labelPoint.y + (skill.angle > 0 ? 8 : -2)} textAnchor="middle" className="select-none font-sans text-[13px] font-semibold" fill="#181A1C">{skill.label}</text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="relative min-h-[520px] md:min-h-[420px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.article
                key={activeData.id}
                role="tabpanel"
                className="border-t-2 border-obsidian pt-6 absolute inset-x-0 top-0"
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className="text-2xl font-bold tracking-[-0.02em] md:text-3xl">{activeData.label}</h3>
                <div className="mt-7 space-y-6">
                  <div>
                    <p className="font-mono text-xs font-bold tracking-[0.1em] text-electric">ENGINEERING SCOPE</p>
                    <p className="mt-3 text-base font-semibold leading-7 text-obsidian">{activeData.content.scope}</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs font-bold tracking-[0.1em] text-electric">DESIGN DECISION</p>
                    <p className="mt-3 text-base leading-8 text-muted">{activeData.content.decision}</p>
                  </div>
                  <div className="border border-acid bg-obsidian px-5 py-5 text-paper">
                    <p className="font-mono text-xs font-bold tracking-[0.1em] text-acid">VERIFIED OUTCOME</p>
                    <p className="mt-3 text-base leading-8">{activeData.content.outcome}</p>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
      </div>
    </section>
  );
}
