'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion';
import clsx from 'clsx';
import ScrambleText from './ScrambleText';

const practices = [
  {
    id: 'understand',
    number: '01',
    title: '任务与边界建模',
    summary: '先定义用户意图、业务状态与人工确认点，再设计 Agent 路由。',
    label: '怎么做',
    detail: '将审批条件、租户权限和会话上下文映射为状态；高风险动作保留 Human-in-the-loop 确认。',
    result: '避免 Agent 越权执行，使自然语言入口仍遵守既有流程、权限与审计要求。',
  },
  {
    id: 'knowledge',
    number: '02',
    title: '知识检索与质量评估',
    summary: '回答必须来自可检索、可验证的企业知识，而不是模型猜测。',
    label: '怎么做',
    detail: '文档进入 Chroma 向量库，以语义 + BM25 混合检索召回；Python 脚本结合 RAGAS 量化检索质量。',
    result: '让答案更贴近租户专属政策与业务规则，并能持续定位与优化检索问题。',
  },
  {
    id: 'action',
    number: '03',
    title: '编排、工具与操作闭环',
    summary: 'Agent 不只回答问题，也可以在权限边界内协助查询和发起业务操作。',
    label: '怎么做',
    detail: '使用 LangChain / LangGraph 组织推理与工具调用，以 MCP / Function Calling 接入系统能力；自然语言请求转为可确认的操作。',
    result: '缩短跨页面操作路径，同时保留用户确认与系统权限控制。',
  },
  {
    id: 'improve',
    number: '04',
    title: '流式交互与持续迭代',
    summary: '流畅的 Agent 产品还需要可感知的响应过程和上线后的验证机制。',
    label: '怎么做',
    detail: '以 SSE 构建多轮消息流、上下文同步与前端状态管理；结合命中情况、异常反馈与评估结果迭代知识和提示策略。',
    result: '用户看到的是可继续操作的过程，而非一次性、不可解释的模型输出。',
  },
] as const;

type PracticeId = (typeof practices)[number]['id'];

export default function AgentSandbox() {
  const containerRef = useRef<HTMLElement>(null);
  const [activePractice, setActivePractice] = useState<PracticeId>('understand');

  const active = practices.find((practice) => practice.id === activePractice) ?? practices[0];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(Math.floor(latest * 4), 3);
    setActivePractice(practices[index].id);
  });

  return (
    <section ref={containerRef} className="relative w-full h-[400vh] bg-transparent text-obsidian">
      {/* 
        采用自然向下延伸的 Flex 布局，去除所有内部强制滚动条（overflow-y-auto），
        依靠 clamp 响应式间距确保绝大多数屏幕能一屏完整容纳。
      */}
      <div className="sticky top-0 min-h-[100dvh] w-full flex flex-col pt-[clamp(4rem,8vh,6rem)] pb-6 md:pb-10">
        <div className="page-shell relative z-10 flex flex-col w-full h-full">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center w-full max-w-4xl mx-auto flex-shrink-0">
            <p className="font-mono text-xs font-bold tracking-[0.1em] text-electric mb-3">AGENT ENGINEERING</p>
            <h2 className="text-2xl md:text-4xl font-bold leading-[1.1] tracking-[-0.03em] md:text-[clamp(2rem,3vw,3.5rem)] mb-4">
              <ScrambleText text="把 Agent 做成可控、可评估的系统。" />
            </h2>
            <p className="text-xs md:text-base leading-6 md:leading-8 text-muted max-w-2xl hidden sm:block">
              AI 能力的难点不只是接入模型，而是把上下文、知识、工具权限、流式交互和质量评估组织成一条可运行的工程链路。
            </p>
          </div>

          {/* Middle: IDE Only */}
          <div className="mt-8 md:mt-12 flex justify-center w-full max-w-5xl mx-auto relative">
            {/* Right: Light IDE Panel */}
            <div className="relative z-10 w-full brutal-border bg-white p-1 flex flex-col h-fit">
              {/* IDE Header */}
              <div className="flex-shrink-0 flex items-center justify-between border-b-2 border-obsidian bg-[#fafafa] px-3 md:px-4 py-2 md:py-3">
                <div className="flex space-x-1.5 md:space-x-2">
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full border border-obsidian bg-[#FF5F56]"></div>
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full border border-obsidian bg-[#FFBD2E]"></div>
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full border border-obsidian bg-[#27C93F]"></div>
                </div>
                <div className="font-mono text-[8px] md:text-[10px] font-bold text-muted truncate max-w-[120px] md:max-w-none">~/agent-workspace/pipeline.ts</div>
                <div className="font-mono text-[8px] md:text-[10px] font-bold text-electric shrink-0">[LANGGRAPH]</div>
              </div>

              {/* IDE Body */}
              <div className="p-5 md:p-8 lg:p-10 min-h-[260px] md:min-h-[300px] flex flex-col justify-center">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    <div className="mb-6 md:mb-10 border-b-2 border-obsidian/10 pb-5 md:pb-8">
                      <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                        <span className="font-mono text-xs md:text-sm font-bold bg-electric text-white px-2.5 py-1 brutal-border shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                          STEP {active.number}
                        </span>
                        <h3 className="text-xl md:text-3xl font-bold tracking-[-0.02em] lg:text-4xl">
                          <ScrambleText text={active.title} />
                        </h3>
                      </div>
                      <p className="text-sm md:text-base text-muted leading-relaxed font-mono pl-1">
                        # {active.summary}
                      </p>
                    </div>

                    <div className="space-y-5 md:space-y-8">
                      <div className="relative pl-3 md:pl-4 border-l-2 border-obsidian/20">
                        <p className="font-mono text-[10px] md:text-xs font-bold tracking-[0.1em] text-muted mb-1.5 md:mb-2">// EXECUTION_STRATEGY</p>
                        <p className="text-xs md:text-base leading-5 md:leading-8 font-mono">{active.detail}</p>
                      </div>
                      
                      <div className="relative pl-3 md:pl-4 border-l-2 border-electric">
                        <p className="font-mono text-[10px] md:text-xs font-bold tracking-[0.1em] text-electric mb-1.5 md:mb-2">// VERIFIED_OUTCOME</p>
                        <p className="text-xs md:text-base leading-5 md:leading-8 font-bold">
                          {active.result}
                          <motion.span 
                            animate={{ opacity: [1, 0, 1] }} 
                            transition={{ repeat: Infinity, duration: 1 }}
                            className="inline-block w-1.5 md:w-2 h-3 md:h-4 bg-electric ml-1 align-middle"
                          />
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            
          </div>

          {/* Footer */}
          <div className="mt-4 md:mt-8 grid gap-4 border-t-2 border-obsidian/20 pt-4 flex-shrink-0 md:grid-cols-3 hidden xl:grid">
            <p className="text-sm md:text-base leading-7 text-muted"><span className="font-bold text-obsidian">业务助手</span><br />将自然语言意图映射为带上下文的查询与操作建议。</p>
            <p className="text-sm md:text-base leading-7 text-muted"><span className="font-bold text-obsidian">知识问答</span><br />通过混合检索与评估链路，提供可验证的业务知识回答。</p>
            <p className="text-sm md:text-base leading-7 text-muted"><span className="font-bold text-obsidian">流程协同</span><br />将工具调用嵌入权限、确认与审计边界，形成可控闭环。</p>
          </div>
        </div>
      </div>
    </section>
  );
}
