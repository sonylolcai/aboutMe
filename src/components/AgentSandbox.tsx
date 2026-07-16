'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion';
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
    detail:
      '文档进入 Chroma 向量库，以语义 + BM25 混合检索召回；Python 脚本结合 RAGAS 量化检索质量。',
    result: '让答案更贴近租户专属政策与业务规则，并能持续定位与优化检索问题。',
  },
  {
    id: 'action',
    number: '03',
    title: '编排、工具与操作闭环',
    summary: 'Agent 不只回答问题，也可以在权限边界内协助查询和发起业务操作。',
    label: '怎么做',
    detail:
      '使用 LangChain / LangGraph 组织推理与工具调用，以 MCP / Function Calling 接入系统能力；自然语言请求转为可确认的操作。',
    result: '缩短跨页面操作路径，同时保留用户确认与系统权限控制。',
  },
  {
    id: 'improve',
    number: '04',
    title: '流式交互与持续迭代',
    summary: '流畅的 Agent 产品还需要可感知的响应过程和上线后的验证机制。',
    label: '怎么做',
    detail:
      '以 SSE 构建多轮消息流、上下文同步与前端状态管理；结合命中情况、异常反馈与评估结果迭代知识和提示策略。',
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
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const index = Math.min(Math.floor(latest * 4), 3);
    setActivePractice(practices[index].id);
  });

  return (
    <section ref={containerRef} className="text-obsidian relative h-[400vh] w-full bg-transparent">
      {/* 
        采用自然向下延伸的 Flex 布局，去除所有内部强制滚动条（overflow-y-auto），
        依靠 clamp 响应式间距确保绝大多数屏幕能一屏完整容纳。
      */}
      <div className="sticky top-0 flex min-h-[100dvh] w-full flex-col pt-[clamp(4rem,8vh,6rem)] pb-6 md:pb-10">
        <div className="page-shell relative z-10 flex h-full w-full flex-col">
          {/* Header */}
          <div className="mx-auto flex w-full max-w-4xl flex-shrink-0 flex-col items-center text-center">
            <p className="text-electric mb-3 font-mono text-xs font-bold tracking-[0.1em]">
              AGENT ENGINEERING
            </p>
            <h2 className="mb-4 text-2xl leading-[1.1] font-bold tracking-[-0.03em] md:text-4xl md:text-[clamp(2rem,3vw,3.5rem)]">
              <ScrambleText text="把 Agent 做成可控、可评估的系统。" />
            </h2>
            <p className="text-muted hidden max-w-2xl text-xs leading-6 sm:block md:text-base md:leading-8">
              AI
              能力的难点不只是接入模型，而是把上下文、知识、工具权限、流式交互和质量评估组织成一条可运行的工程链路。
            </p>
          </div>

          {/* Middle: IDE Only */}
          <div className="relative mx-auto mt-8 flex w-full max-w-5xl justify-center md:mt-12">
            {/* Right: Light IDE Panel */}
            <div className="brutal-border relative z-10 flex h-fit w-full flex-col bg-white p-1">
              {/* IDE Header */}
              <div className="border-obsidian flex flex-shrink-0 items-center justify-between border-b-2 bg-[#fafafa] px-3 py-2 md:px-4 md:py-3">
                <div className="flex space-x-1.5 md:space-x-2">
                  <div className="border-obsidian h-2.5 w-2.5 rounded-full border bg-[#FF5F56] md:h-3 md:w-3"></div>
                  <div className="border-obsidian h-2.5 w-2.5 rounded-full border bg-[#FFBD2E] md:h-3 md:w-3"></div>
                  <div className="border-obsidian h-2.5 w-2.5 rounded-full border bg-[#27C93F] md:h-3 md:w-3"></div>
                </div>
                <div className="text-muted max-w-[120px] truncate font-mono text-[8px] font-bold md:max-w-none md:text-[10px]">
                  ~/agent-workspace/pipeline.ts
                </div>
                <div className="text-electric shrink-0 font-mono text-[8px] font-bold md:text-[10px]">
                  [LANGGRAPH]
                </div>
              </div>

              {/* IDE Body */}
              <div className="flex min-h-[260px] flex-col justify-center p-5 md:min-h-[300px] md:p-8 lg:p-10">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    <div className="border-obsidian/10 mb-6 border-b-2 pb-5 md:mb-10 md:pb-8">
                      <div className="mb-3 flex items-center gap-3 md:mb-4 md:gap-4">
                        <span className="bg-electric brutal-border px-2.5 py-1 font-mono text-xs font-bold text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:text-sm">
                          STEP {active.number}
                        </span>
                        <h3 className="text-xl font-bold tracking-[-0.02em] md:text-3xl lg:text-4xl">
                          <ScrambleText text={active.title} />
                        </h3>
                      </div>
                      <p className="text-muted pl-1 font-mono text-sm leading-relaxed md:text-base">
                        # {active.summary}
                      </p>
                    </div>

                    <div className="space-y-5 md:space-y-8">
                      <div className="border-obsidian/20 relative border-l-2 pl-3 md:pl-4">
                        <p className="text-muted mb-1.5 font-mono text-[10px] font-bold tracking-[0.1em] md:mb-2 md:text-xs">
                          {'// EXECUTION_STRATEGY'}
                        </p>
                        <p className="font-mono text-xs leading-5 md:text-base md:leading-8">
                          {active.detail}
                        </p>
                      </div>

                      <div className="border-electric relative border-l-2 pl-3 md:pl-4">
                        <p className="text-electric mb-1.5 font-mono text-[10px] font-bold tracking-[0.1em] md:mb-2 md:text-xs">
                          {'// VERIFIED_OUTCOME'}
                        </p>
                        <p className="text-xs leading-5 font-bold md:text-base md:leading-8">
                          {active.result}
                          <motion.span
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                            className="bg-electric ml-1 inline-block h-3 w-1.5 align-middle md:h-4 md:w-2"
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
          <div className="border-obsidian/20 mt-4 grid hidden flex-shrink-0 gap-4 border-t-2 pt-4 md:mt-8 md:grid-cols-3 xl:grid">
            <p className="text-muted text-sm leading-7 md:text-base">
              <span className="text-obsidian font-bold">业务助手</span>
              <br />
              将自然语言意图映射为带上下文的查询与操作建议。
            </p>
            <p className="text-muted text-sm leading-7 md:text-base">
              <span className="text-obsidian font-bold">知识问答</span>
              <br />
              通过混合检索与评估链路，提供可验证的业务知识回答。
            </p>
            <p className="text-muted text-sm leading-7 md:text-base">
              <span className="text-obsidian font-bold">流程协同</span>
              <br />
              将工具调用嵌入权限、确认与审计边界，形成可控闭环。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
