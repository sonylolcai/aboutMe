'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useMotionValue } from 'framer-motion';
import Image from 'next/image';

const cards = [
  {
    id: 1,
    title: '01 // ENGINEER_PROFILE',
    content: '蔡璐阳（Sonny）｜9 年以上全栈交付经验。以前端架构为基座，协同 Node.js 与 Python 完成企业级 SaaS 从复杂业务流程到生产部署的完整交付。',
    img: '/me/assets/real-z.webp',
  },
  {
    id: 2,
    title: '02 // SYSTEMS_AND_PERFORMANCE',
    content: '处理多租户权限、审批与对账等复杂业务，也处理高频实时数据与性能瓶颈：以混合渲染、缓存策略和虚拟滚动，将核心页面 TTI 降低 40%，万级列表渲染耗时降低 60%。',
    img: '/me/assets/real-c.webp',
  },
  {
    id: 3,
    title: '03 // AGENT_ENGINEERING',
    content: '完成 LangGraph 编排、SSE 多轮交互、MCP 工具调用与 Chroma 混合检索 RAG 管线，并以 RAGAS 指标持续评估检索质量，让模型能力进入可控的业务流程。',
    img: '/me/assets/real-pc.webp',
  },
  {
    id: 4,
    title: '04 // DELIVERY_SYSTEM',
    content: '带领 6 人前端团队交付网页端、移动端与小程序共 5 个企业级项目。通过设计系统、TypeScript、测试与 CI/CD，把经验沉淀为可复用的工程体系。',
    img: '/me/assets/real-pc.webp',
  },
  {
    id: 5,
    title: '05 // OFFLINE_MODE',
    content: '工程之外：滑雪、羽毛球与两只猫。',
    img: '/me/assets/real-cat.webp',
  }
];

type ProfileCard = (typeof cards)[number];

const paperLayouts = [
  { width: '100%', minHeight: 'clamp(18rem, 29vw, 23.5rem)', marginLeft: '0%', rotate: -0.18 },
  { width: '99.5%', minHeight: 'clamp(19rem, 31vw, 25rem)', marginLeft: '0.5%', rotate: 0.22 },
  { width: '99.75%', minHeight: 'clamp(18.5rem, 30vw, 24rem)', marginLeft: '0.25%', rotate: -0.12 },
  { width: '99%', minHeight: 'clamp(19.5rem, 32vw, 25.5rem)', marginLeft: '0.75%', rotate: 0.28 },
  { width: '99.5%', minHeight: 'clamp(18rem, 28vw, 23rem)', marginLeft: '0.5%', rotate: -0.16 },
] as const;

function getPaperLayout(card: ProfileCard) {
  return paperLayouts[card.id - 1];
}

function getStackPose(card: ProfileCard, stackIndex: number) {
  const paper = getPaperLayout(card);

  return {
    x: stackIndex * 3,
    y: stackIndex * -5,
    rotate: paper.rotate + stackIndex * 0.16,
    zIndex: 20 + stackIndex,
  };
}

function CardPanel({ card, stackIndex }: { card: ProfileCard; stackIndex: number }) {
  const reduceMotion = useReducedMotion();
  const paper = getPaperLayout(card);
  const stackPose = getStackPose(card, stackIndex);
  
  // 3D Tilt Effect
  const rotateX = useSpring(useMotionValue(0), { damping: 30, stiffness: 300 });
  const rotateY = useSpring(useMotionValue(0), { damping: 30, stiffness: 300 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    rotateY.set(((x / rect.width) - 0.5) * 15);
    rotateX.set(((y / rect.height) - 0.5) * -15);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const content = (
    <motion.div 
      className="relative flex flex-col gap-4 sm:gap-5 w-full h-full"
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
    >
      <h1 className="text-[1.45rem] font-bold leading-tight text-obsidian sm:text-[1.8rem] tracking-tight">
        {card.title}
      </h1>
      <div className="h-px w-full bg-obsidian/45" style={{ transform: "translateZ(20px)" }}></div>
      <p className="text-measure text-[1.05rem] leading-[1.8] text-obsidian whitespace-pre-wrap sm:text-[1.15rem] sm:leading-[1.82]" style={{ transform: "translateZ(30px)" }}>{card.content}</p>
    </motion.div>
  );

  const className = "note-paper relative col-start-1 row-start-1 z-10 flex items-center p-6 sm:p-8 md:p-10 brutal-shadow-hover";

  return (
    <motion.div
      className={className}
      initial={{
        x: stackPose.x,
        y: reduceMotion ? stackPose.y : '100%',
        opacity: 0,
        rotate: reduceMotion ? stackPose.rotate : stackPose.rotate + 0.6,
        zIndex: stackPose.zIndex,
      }}
      animate={{ x: stackPose.x, y: stackPose.y, opacity: 1, rotate: stackPose.rotate, zIndex: stackPose.zIndex }}
      exit={{ x: stackPose.x, y: reduceMotion ? stackPose.y : '100%', opacity: 0, rotate: stackPose.rotate, zIndex: stackPose.zIndex }}
      transition={{ duration: reduceMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        width: paper.width,
        minHeight: paper.minHeight,
        marginLeft: paper.marginLeft,
        transformOrigin: 'center 14%',
        willChange: reduceMotion ? 'auto' : 'transform',
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {content}
    </motion.div>
  );
}

export default function CardStackSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [renderedCardCount, setRenderedCardCount] = useState(1);
  const renderedCardCountRef = useRef(1);
  const targetCardCountRef = useRef(1);
  const isExitingRef = useRef(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const startTopCardExit = () => {
    isExitingRef.current = true;
    renderedCardCountRef.current -= 1;
    setRenderedCardCount(renderedCardCountRef.current);
  };

  const handleExitComplete = () => {
    isExitingRef.current = false;

    if (targetCardCountRef.current < renderedCardCountRef.current) {
      startTopCardExit();
      return;
    }

    if (targetCardCountRef.current > renderedCardCountRef.current) {
      renderedCardCountRef.current = targetCardCountRef.current;
      setRenderedCardCount(renderedCardCountRef.current);
    }
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // The shorter stage makes each wheel movement advance the dossier promptly.
    const index = Math.min(Math.floor(latest * 5), 4);
    const nextCardCount = index + 1;

    setActiveIndex(index);
    targetCardCountRef.current = nextCardCount;

    if (isExitingRef.current) {
      return;
    }

    if (nextCardCount > renderedCardCountRef.current) {
      renderedCardCountRef.current = nextCardCount;
      setRenderedCardCount(nextCardCount);
      return;
    }

    if (nextCardCount < renderedCardCountRef.current) {
      startTopCardExit();
    }
  });

  const visibleCards = cards.slice(0, renderedCardCount);

  return (
    <section ref={containerRef} className="relative w-full min-h-[500dvh] bg-transparent">
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <div className="page-shell grid h-full grid-rows-[minmax(13rem,.8fr)_auto] gap-5 py-5 md:grid-cols-[5fr_7fr] md:grid-rows-1 md:gap-10 md:py-8">
          <div className="relative flex min-h-0 items-center justify-center">
            <div className="relative aspect-[4/5] w-[min(15rem,72vw)] md:w-[min(26rem,100%)]">
            {cards.map((card, idx) => (
              <div
                key={`img-${card.id}`}
                className="absolute inset-0"
                style={{
                  opacity: activeIndex === idx ? 1 : 0,
                  zIndex: activeIndex === idx ? 10 : 0,
                }}
              >
                {/* Fallback to a placeholder svg if img errors or is missing, though we expect it to exist */}
                <Image 
                  src={card.img} 
                  alt={idx === 4 ? '滑雪与猫的生活合成图占位素材' : `${card.title} 技术主题插画`} 
                  fill 
                  style={{ objectFit: 'contain' }}
                  sizes="(min-width: 768px) 33vw, 72vw"
                  preload={idx === 0}
                />
              </div>
            ))}
            </div>
          </div>

          <div className="grid w-full self-start perspective-1000 md:self-center">
            <div className="relative grid min-h-[23rem] w-full">
              <AnimatePresence initial={false} mode="sync" onExitComplete={handleExitComplete}>
                {visibleCards.map((card, index) => (
                  <CardPanel key={`card-${card.id}`} card={card} stackIndex={index} />
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
