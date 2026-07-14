'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';

const companies = {
  dalai: {
    name: '上海大崃信息技术有限公司',
    period: '2025/11 – 至今',
    role: '高级前端工程师 — 发卡平台开发与 AI 集成',
    project: 'DCS SaaS 平台｜多租户业务与 Agent 能力工程化',
    summary: '主导多租户 SaaS 的前端架构与 AI 集成，将审批编排、RBAC、还款与对账等复杂流程组织为可扩展模块；同时把 Agent 问答与自然语言操作接入实际业务链路。',
    highlights: [
      ['模块化', '6+ 业务模块纳入 pnpm Monorepo，沉淀 Design Token 与共享组件库。'],
      ['渲染策略', 'Server Components + Streaming SSR + TanStack Query；核心页面 TTI 降低 40%。'],
      ['交互闭环', 'SaaS Bot 以 SSE 流式渲染、URL 与会话上下文，承接查询和审批等自然语言操作。'],
      ['RAG 质量', 'LangChain / LangGraph / MCP 编排；Chroma 语义 + BM25 混合检索，并以 RAGAS 评估。'],
    ],
  },
  sahara: {
    name: 'Sahara AI',
    period: '2024/11 – 2025/08',
    role: '高级前端工程师 — 数字资产交易平台开发与 AI 集成',
    project: 'Sahara AI 数字资产交易平台｜实时数据与高并发交互',
    summary: '面向高频交易场景搭建资产、组合与消息核心体验，重点解决实时行情渲染、请求可靠性和大数据量列表性能，并完成 AI 资产估值交互。',
    highlights: [
      ['实时渲染', 'WebSocket Tick 数据驱动 ECharts；节流后高频行情稳定 60fps。'],
      ['请求可靠性', '封装 Fetch Queue，限制并发、请求去重、指数退避重试；API 成功率 98%。'],
      ['AI 估值', '以 Function Calling 获取结构化预测，完成 Prompt A/B 评估，并用置信区间图表呈现结果。'],
      ['性能交付', 'SSR/ISR、CDN 与代码分割使首屏 ≤1.5s、Lighthouse ≥90；虚拟滚动将内存降低 50%。'],
    ],
  },
  wangrun: {
    name: '厦门望润资产管理（上海）',
    period: '2021/04 – 2024/07',
    role: '前端团队负责人（6 人）',
    project: '望润小微云资产管理平台｜设计系统与规模化交付',
    summary: '作为前端团队负责人，组织网页端、移动端和小程序的企业级交付；将动态表单、权限表格、审批状态机等高复用业务能力沉淀为团队工程资产。',
    highlights: [
      ['交付规模', '带领 6 人团队完成 5 个项目，累计 20 万+行代码。'],
      ['复用体系', '建立 Design Token 与通用组件库；跨项目开发效率提升 60%。'],
      ['质量体系', '落地 TypeScript、ESLint、Jest 与 GitLab CI/CD；Bug 率降低 70%。'],
      ['构建优化', '代码分割、Tree Shaking 与懒加载，使核心页面渲染从 5s 降至 1s 内。'],
    ],
  },
  pwc: {
    name: '普华永道信息技术（上海）',
    period: '2017/10 – 2021/04',
    role: '软件工程师 — 技术转型与全栈交付',
    project: '西门子医疗供应商审批系统｜遗留系统现代化与全栈交付',
    summary: '在表单密集、审批流程复杂的企业系统中完成前端现代化和后端流程能力建设，形成后续架构与工程化实践的基础。',
    highlights: [
      ['技术迁移', '推动 jQuery → React；表单密集页面渲染速度提升 4 倍，重复代码减少 80%。'],
      ['流程引擎', '以 Node.js + PostgreSQL 实现审批流程；审计报告生成效率提升 3 倍。'],
      ['质量门禁', '建立 ESLint、Prettier、Code Review 与单元 / 集成测试；线上故障下降 90%。'],
      ['方法沉淀', '在权限、表单、流程与审计约束并存的场景中形成稳定的全栈交付方法。'],
    ],
  },
} as const;

type CompanyKey = keyof typeof companies;

const archive = Object.entries(companies) as [CompanyKey, (typeof companies)[CompanyKey]][];

export default function DossierConsole() {
  const [activeKey, setActiveKey] = useState<CompanyKey>('dalai');
  const reduceMotion = useReducedMotion();
  const activeCompany = companies[activeKey];

  return (
    <section className="border-y-2 border-obsidian bg-transparent py-[clamp(3.5rem,8vw,7rem)]">
      <div className="page-shell">
        <header className="grid gap-6 border-b-2 border-obsidian pb-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div>
            <p className="font-mono text-xs font-bold tracking-[0.1em] text-electric">CAREER DOSSIER</p>
            <h2 className="mt-2 md:mt-5 max-w-3xl text-2xl md:text-4xl font-bold leading-[1.1] tracking-[-0.03em] md:text-[clamp(2rem,3vw,3.5rem)]">把复杂业务做成可维护的系统。</h2>
          </div>
          <p className="max-w-md text-base leading-8 text-muted">从企业流程现代化，到实时数据、Agent 与工程体系建设；每一段经历都以可核验的工程结果呈现。</p>
        </header>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(12rem,.42fr)_minmax(0,1fr)] lg:gap-14">
          <nav aria-label="履历时间线" className="flex gap-2 overflow-x-auto border-b border-obsidian/25 pb-3 lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r lg:pb-0 lg:pr-5">
            {archive.map(([key, company]) => {
              const isActive = key === activeKey;

              return (
                <button
                  key={key}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveKey(key)}
                  className={`min-h-11 shrink-0 border px-3 py-3 text-left transition-colors duration-200 lg:w-full ${isActive ? 'border-obsidian bg-acid text-obsidian' : 'border-transparent text-muted hover:border-obsidian/35 hover:text-obsidian'}`}
                >
                  <span className="block font-mono text-xs font-bold tracking-[0.06em]">{company.period}</span>
                  <span className="mt-1 block text-sm font-semibold leading-5">{company.name}</span>
                </button>
              );
            })}
          </nav>

          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              key={activeKey}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: reduceMotion ? 0 : 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="grid gap-5 border-b border-obsidian/25 pb-7 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
                <div>
                  <p className="font-mono text-xs font-bold tracking-[0.1em] text-electric">{activeCompany.period}</p>
                  <h3 className="mt-3 text-2xl font-bold leading-[1.16] tracking-[-0.02em] md:text-[clamp(2rem,3.2vw,3rem)]">{activeCompany.name}</h3>
                </div>
                <p className="w-fit border border-obsidian bg-paper px-3 py-2 text-sm font-semibold leading-6">{activeCompany.role}</p>
              </div>

              <div className="pt-8">
                <p className="font-mono text-xs font-bold tracking-[0.1em] text-electric">SELECTED SYSTEM</p>
                <h4 className="mt-3 text-xl font-bold leading-[1.2] tracking-[-0.015em] md:text-3xl">{activeCompany.project}</h4>
                <p className="text-measure mt-5 text-base leading-8 text-muted md:text-[1.0625rem]">{activeCompany.summary}</p>
              </div>

              <ul className="mt-10 grid border-y border-obsidian/30 sm:grid-cols-2">
                {activeCompany.highlights.map(([label, detail], index) => (
                  <li key={label} className={`p-5 ${index % 2 === 0 ? 'sm:border-r sm:border-obsidian/25' : ''} ${index < 2 ? 'border-b border-obsidian/25' : ''}`}>
                    <p className="font-mono text-xs font-bold tracking-[0.08em] text-electric">{label}</p>
                    <p className="mt-3 text-base leading-7 text-obsidian">{detail}</p>
                  </li>
                ))}
              </ul>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
