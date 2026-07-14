# 个人展示网站设计系统简报与开发说明书 (Design System Brief & Specification)

---

## 🛠️ 技术栈与开发工具 (Tech Stack & Libraries)
*   **核心框架：** Next.js 14+ (App Router, React 18+)
*   **样式方案：** Tailwind CSS (配合 CSS 自定义属性与新粗野主义实用类)
*   **动画库：** Anime.js (用于高回弹物理阻尼动画、滚动 Seek 联动及 SVG 路径绘制)
*   **微前端技术：** **qiankun** (用于在 macOS 桌面模拟器窗口中注册、加载和卸载独立的子应用项目)
*   **设备适配：** 专为桌面端（PC）优化，忽略移动端布局。

---

## 🎨 设计系统简报 (Design System Brief - by Taste Skill)

### 1. 视觉风格与美美学定位 (Vibe & Aesthetic)
*   **核心关键词：** Neo-Brutalism (新粗野主义), Interactive Sketchpad (交互式手绘板), Cyber-Tech Overlay (仅在 AI 模块使用的科技叠加层).
*   **设计理念：** 
    *   **整体网站：** 以**淡色纸张质感**为主，全站模拟一个“实时交互的图纸设计稿”。背景充斥着淡色坐标网格、手绘对齐虚线和实时的像素标注（如 `W: 450 / H: 300` 等边角字符），呈现清爽、个性的设计师手写本质感。
    *   **AI 智能体模块：** 随着滚动，瞬间切换进入深暗色调的“黑客科技空间”，模拟高对比度的终端控制台，与前后的淡色手绘蓝图形成强烈的视觉冲击。

### 2. 色彩方案 (Color Palette)
*   **主站背景 (Base Background - 淡色)：** `#F5F5F0` (温暖的环保纸张灰白色，叠加 2% 强度的 SVG `feTurbulence` 噪点滤镜，呈现粗糙的实体纸张/卡牌质感)。
*   **AI 模块背景 (AI Section Background - 暗色)：** `#0D0E10` (极深黑曜石，代表深邃科技感)。
*   **主激活色 (Primary Accent)：** `#D3FF52` (荧光酸性绿 - 用于边框高亮、重要数据多边形和关键按钮)。
*   **辅助激活色 (Secondary Accent)：** `#A855F7` (电光紫 - 用于次要高亮、网格装饰和粒子光晕)。
*   **点缀色 (Special Accent)：** `#FF2E93` (霓虹深粉 - 用于警告、删除线、或雷达图极值标记)。
*   **主站文本色：**
    *   主要文本: `#0D0E10` (深灰黑，极致对比度)
    *   次要文本: `#71717A` (哑光灰，用于辅助坐标和标注)
*   **AI 模块文本色：**
    *   主要文本: `#FFFFFF` (纯白)
    *   次要文本: `#71717A` (哑光灰)
*   **特别视觉处理 (Special Treatment)：**
    *   **Halftone 阴影 (网点阴影)：** 所有阴影使用 SVG Pattern 渲染的“漫画波点/网点网格”投影（`box-shadow` 由硬黑和网格图案结合实现，配合淡色纸张背景非常吸睛）。
    *   **蓝图网格 (Blueprint Grid)：** 全屏背景衬有 `24px * 24px` 的暗灰十字网格辅助线。

### 3. 字体系统 (Typography)
*   **大标题 (Heading Font)：** **Syne** (Google Font, Extra Bold 800, Tracking: `-0.05em` 紧凑字距，营造视觉冲击力)。
*   **正文与数据 (Body Font)：** **Space Mono** (Google Font, Regular/Bold，等宽字体，模拟终端和设计图纸的参数标注感)。

### 4. 形状与结构 (Shape & Structure)
*   **边界规则：** 绝对直角（`border-radius: 0px`），卡片与标签全部使用粗黑边框（`3px solid #0D0E10`，在淡色背景下以黑色粗线条勾勒）。
*   **布局密度：** 游戏化控制台布局（Console Layout）。卡片边缘带有虚线对齐标尺，显示实时的像素尺寸标注。

### 5. 动效原则 (Motion Principle)
*   **动画个性：** **高回弹物理阻尼感 (Snappy & Elastic)**。使用 Anime.js 模拟弹簧（Spring）物理性质（`mass: 1, stiffness: 120, damping: 8`）。
*   **重力撞击 (Slam Effect)：** 卡片切入时伴随轻微的“屏幕震动（Screen Shake）”和影子的“弹簧震荡延迟”。

---

## 📝 页面开发规格与真实文案 (Implementation Specification)

### 第一阶段：开场引导动画 (Intro Animation)
1.  **初始状态：** 全屏 `#F5F5F0`（纸张淡色）背景。屏幕正中央以淡灰色 `#71717A`、圆润粗体字准备显示文本：`hi, i am Sonny`。字体区域宽度占屏幕的 50%。
2.  **手写笔画效果 (Handwriting Effect)：**
    *   文字 `hi, i am Sonny` 不使用普通的打字机光标，而是采用 **SVG 路径描边绘制动画 (stroke-dasharray / stroke-dashoffset)**。
    *   动画通过 Anime.js 驱动，模拟**钢笔在纸上绘制字母笔画**的动效，字母的笔画从头到尾平滑绘制出来，呈现真实手写的感觉。
3.  **停留：** 书写完毕后静止停留 1 秒。
4.  **缩放淡出：** 字体以大写字母 **`S`** 为中心急剧放大，同时透明度降低。`S` 放大至超出屏幕边界，背景随之消失。
5.  **主页呈现：** 动画彻底移除，平滑展示主网页第一屏（保持淡色纸张风格）。

---

### 第二阶段：主网页第一屏 - 3D卡片堆叠栈 (3D Card Stack)
*   **布局结构：** 左侧 (45%) 为 `sticky` 容器，在淡色背景上展示个人漫画；右侧 (55%) 为 5 张等高宽的精简信息卡片堆叠区。
*   **卡片堆叠动画：** 滚动鼠标时，卡片以倾斜角（`-3deg` 到 `3deg`）滑入堆叠，露出下方卡片的黑色边框，形成一个厚重的卡片堆（Deck）。
*   **左侧插画联动：** 随着右侧卡片依次叠入，左侧漫画在 5 个状态间切换,淡入淡出：
    *   **卡片 1 叠入 ➡️ 状态 A（正面微笑）** './assets/real-z.png'
    *   **卡片 2 叠入 ➡️ 状态 B（招手打招呼）** './assets/real-c.png'
    *   **卡片 3 叠入 ➡️ 状态 C（扭头向右看，引向卡片）** './assets/real-pc.png'
    *   **卡片 4 叠入 ➡️ 状态 D（戴眼镜敲代码/工作）** './assets/real-cat.png'
    *   **卡片 5 叠入 ➡️ 状态 E（捧咖啡杯放松微笑）** './assets/real-bm.png'
*   **卡片文本内容 (严格控制高度，防止溢出)：**
    *   **卡片 1 - 基本信息 (Basic Info)：**
        *   *标题：* `01 // BASIC_INFO`
        *   *正文：* **蔡璐阳 (Sonny)**。全栈开发工程师（偏前端），9 年交付经验。常驻上海浦东。持有证券从业与基金从业资格。
    *   **卡片 2 - 核心优势 (Core Strengths)：**
        *   *标题：* `02 // CORE_ADVANTAGE`
        *   *正文：* 以前端架构为根基（React / TS / Next.js），辅以 Node.js / Python 后端交付力。擅长高频实时渲染（WebSocket/Canvas）与性能工程（Lighthouse ≥90）。
    *   **卡片 3 - AI建设 (AI Ecosystem)：**
        *   *标题：* `03 // AI_ECOSYSTEM`
        *   *正文：* 深度聚焦 AI Agent 工作流（LangChain/LangGraph）与量化分析平台建设。PMP 认证。喜欢摄影和研究最新的 MCP（Model Context Protocol）开源生态。
    *   **卡片 4 - 个人兴趣 (Hobbies)：**
        *   *标题：* `04 // HOBBIES`
        *   *正文：* 喜欢撸猫，打羽毛球和滑雪。
    *   **卡片 5 - 联系方式 (Contact Me)：**
        *   *标题：* `05 // CONTACT_LINE`
        *   *正文：* 📧 `sony.lol.cai@gmail.com` | 📞 `188-0612-1281`。期待与您合作，用技术与 AI 赋能核心业务。
*   **过渡：** 全部叠完后，整个右侧卡片栈和左侧插画将作为一个整体向上平滑滚出视口，进入第二屏。

---

### 第三阶段：主网页第二屏 - 动态新粗野雷达图 (Interactive Skills Radar)
*   **视觉底色：** 保持 `#F5F5F0` 淡色纸张背景，雷达图线条采用黑色（`3px solid #000`）。
*   **雷达图顶点 (5个维度)：** **前端**、**后端**、**AI建设**、**团队管理**、**业务理解**。
*   **动效：** 滚动到中间时触发“水波网格扩散”与“徽章弹射”。
*   **顶点点击交互：** 点击顶点，雷达图整体旋转坍缩成左侧 30% 位置的 3D 陀螺仪，向右投影激光引导线；右侧 70% 的详细技能信息卡以“折纸拆信（Origami）”路径切片展开。
*   **右侧折纸详情页真实文案：**
    *   **前端维度：**
        *   *核心技能：* React 18+ / Next.js (App Router) / TypeScript / Vue
        *   *状态/数据：* TanStack Query / Zustand / Redux / SWR 缓存
        *   *实战积累：* 构建多租户 SaaS 前端、可视化看板、流式 SSE 渲染、TTI 提升 40%、虚拟滚动减少渲染耗时 60% 与内存 50%。
    *   **后端维度：**
        *   *核心技能：* Node.js / Next.js API Routes / FastAPI / PostgreSQL / REST
        *   *实战积累：* 基于 Node + PG 交付审计审批流程引擎；搭建 Python/FastAPI 后端服务；并发 Fetch Queue 机制实现 API 98% 成功率。
    *   **AI建设维度：**
        *   *核心技能：* LangChain / LangGraph / RAG (Chroma) / SSE流式 / MCP / Function Calling
        *   *实战积累：* 基于 LangGraph 设计 Agent 编排；独立交付端到端 RAG 混合检索管线，并使用 RAGAS 指标量化评估检索质量。
    *   **团队管理维度：**
        *   *核心技能：* PMP 认证 / Agile Scrum 敏捷管理 / 规范工程化
        *   *实战积累：* 组建并带领 6 人前端团队完成 5 个项目交付；推行 ESLint + Jest + TS 体系，使 Bug 率下降 70%，延期率下降 15%。
    *   **业务理解维度：**
        *   *核心技能：* 证券从业资格 / 基金从业资格 / 财务对账 / SaaS 权限
        *   *实战积累：* 深度理解金融数据可视化场景；设计审批流程状态机、RBAC 多租户权限、企业还款对账核心模块。

---

### 第四阶段：主网页第三屏 - 公司与项目“卡带插拔”工作台 (Dossier Cartridge Console)
*   **视觉底色：** 保持 `#F5F5F0` 淡色纸张背景，卡带外框采用黑色线条勾勒。
*   **布局与交互：** 左侧为公司卡片与横向项目传送带，右侧为带有十字瞄准器的垂直滑轨（刻度：大崃、Sahara AI、望润资产、普华永道）。
*   **切换动效：** 切换公司时，旧卡片以 `-5deg` 向左方弹射滑出视口，新卡片从上方“咔哒”滑入并伴随机械震动。项目卡片级联展开。
*   **项目原理图交互：** 项目卡片显示 SVG 线框原理图而非截图。Hover 时弹出标尺指针，指向原理图上的热点（Hotspots），气泡展示核心指标参数。
*   **真实履历与项目文案 (Dossier Content)：**
    1.  **上海大崃信息技术有限公司** (2025/11 – 至今)
        *   *岗位：* 高级前端工程师 — 发卡平台开发与 AI 集成
        *   *核心项目：* **DCS SaaS 平台 · AI Agent 智能化升级**
        *   *热点核心指标：*
            *   `[pnpm Monorepo]` 统一管理 6+ 模块，沉淀组件库
            *   `[Lighthouse]` TanStack Query + Server Components 优化，核心页面 TTI 降低 40%
            *   `[SaaS Bot]` SSE 流式消息渲染，自然语言 (NL2Action) 触发业务操作
            *   `[Agent编排]` 基于 LangChain/LangGraph + MCP 工具调用，Chroma RAG 混合检索
    2.  **Sahara AI** (2024/11 – 2025/08)
        *   *岗位：* 高级前端工程师 — 数字资产交易平台开发与 AI 集成
        *   *核心项目：* **Sahara AI 数字资产交易平台**
        *   *热点核心指标：*
            *   `[高频实时]` WebSocket + ECharts 图表，节流稳定 60fps
            *   `[并发控制]` 封装 Fetch Queue Hook (去重、指数退避重试)，API 成功率 98%
            *   `[AI资产估值]` Function Calling 对接 LLM，A/B 评估优化，置信区间图表
            *   `[性能瓶颈]` Lighthouse ≥ 90，首屏 ≤ 1.5s，虚拟滚动使内存降低 50%
    3.  **厦门望润资产管理（上海）** (2021/04 – 2024/07)
        *   *岗位：* 前端团队负责人（6人）
        *   *核心项目：* **望润小微云资产管理平台**
        *   *热点核心指标：*
            *   `[团队规模]` 带领 6 人团队交付 5 个项目，共 20 万+行代码
            *   `[效率提升]` 构建设计系统与通用组件库，开发效率提升 60%
            *   `[工程优化]` TS + CI/CD 落地使 Bug 率降 70%，构建优化使核心页面渲染 5s 降至 1s 内
    4.  **普华永道信息技术（上海）** (2017/10 – 2021/04)
        *   *岗位：* 软件工程师 — 技术转型与全栈交付
        *   *核心项目：* **西门子医疗 — 供应商审批系统**
        *   *热点核心指标：*
            *   `[技术转型]` 推动 jQuery → React，表单密集页渲染速度提升 4 倍
            *   `[流程引擎]` 基于 Node.js + PostgreSQL 实现审批流，审计报告生成效率提升 3 倍

---

### 第五阶段：主网页第四屏 - 智能体状态图沙盒 (AI Agent State Graph Console)
*   **视觉底色切换 (暗色科技底)：** 当本屏进入视口时，背景平滑过渡到 **`#0D0E10` (极深黑曜石)** 暗色调，开启科幻数字绿发光粒子图。5 个发光节点以有向图连接，进入时代码初始化闪烁编译。
*   **点击交互：** 点击节点，射出激光，弹出复古科幻终端窗口，打字输出 Sonny 在 AI 领域的开发日志心得：
    *   **节点 1：`[Node: LangGraph State Machine]`**
        *   *日志输出：* `> [INIT] Designed complex multi-agent loops for approval routing. Implemented state preservation and Human-in-the-loop gates. Reduced token cost by 35%.`
    *   **节点 2：`[Node: RAG Retrieval Node]`**
        *   *日志输出：* `> [RUN] Implemented Chroma DB hybrid search (semantic + BM25). Built Python evaluation scripts utilizing RAGAS indicators to quantify and optimize retrieval precision.`
    *   **节点 3：`[Node: Tool-Calling & MCP]`**
        *   *日志输出：* `> [EXEC] Integrated Model Context Protocol (MCP) server for client-side tool execution, mapping natural language requests directly into SQL database operations and SaaS API actions.`
    *   **节点 4：`[Node: SSE Streaming Engine]`**
        *   *日志输出：* `> [PUSH] Developed real-time server-sent events (SSE) parser for chatbot UI. Handled markdown parsing, code highlights, and token buffer flush in high concurrency.`

---

### 第六阶段：主网页第五屏 - 赛博 macOS 模拟器作品集 (Cyber-OS Portfolio Sandbox)
*   **视觉底色回归 (淡色纸张底)：** 背景平滑回退到 **`#F5F5F0` (淡色纸张)**，Mac 屏幕处于淡色桌面之上，突显设备边缘线。
*   **HTML/CSS 绘制的 Mac 屏幕与开机动效 (HTML Mac with Boot Flow)：**
    *   **Mac 设备外壳 (Studio Display Frame)：** 在网页中央，使用纯 HTML/CSS 绘制一个精致的 Mac 扁平显示器外壳，具有极粗黑的 Neo-Brutalism 框线（`3px solid #0D0E10`）和硬阴影，质感扎实。
    *   **初始状态 (关机状态 - Power Off)：** 页面刚加载或滚动未完全进入该屏时，Mac 屏幕内部是一片**完全黑暗漆黑 (Solid Black)** 的屏幕，代表关机状态。
    *   **开机动画触发 (Power On Scroll Trigger)：** 当整个 Mac 屏幕组件**完全进入视口 (100% visible in viewport)** 后，触发“开机”流程动画：
        1.  屏幕背景由纯黑渐变闪烁一下，变为柔和的发光暗灰，接着显示一个经典的**白色 Apple Logo 与系统加载进度条 (Progress Bar)**。
        2.  进度条在 1.5 秒内平滑加载至 100%。
        3.  加载完成后，屏幕闪现淡出 Logo，平滑亮起，展示出虚拟 macOS 桌面环境、顶部菜单栏、Dock 栏以及桌面上的 2 个像素风 App 图标。
*   **双击启动与微前端渲染 (qiankun 集成规格)：**
    *   桌面上摆放着 **2 个手绘像素风的文件图标**。
    *   双击/点击图标时，屏幕触发启动动效：文件图标产生缩放回弹，屏幕中央弹出一个**黑色命令行终端窗口**（打印启动日志如：`> REGISTERING MICRO-APP... STARTING qiankun MICRO-FRONTEND ENGINE... OK`）。
    *   在虚拟 macOS 窗口区域提供子应用挂载容器 `<div id="micro-app-viewport" />`。
    *   **通过 qiankun 技术注册并渲染以下 2 个个人作品**：
        1.  **`PA_Agent.app` (PA Agent — AI 量化分析平台)**
            *   *微前端子应用配置：* `name: "pa-agent", entry: "https://for-one-dream.cloud/pa-agent"`
            *   *项目文案简介 (展示在窗口侧边栏/信息区)：* 基于 Next.js 15 + FastAPI + DeepSeek LLM。实现 A 股 K 线 Canvas 渲染、两阶段流式推理、多 Agent 决策链可视化和滚动回测引擎。
        2.  **`Auto_Questionnairer.app` (Auto Questionnairer — AI 智能访谈问卷)**
            *   *微前端子应用配置：* `name: "auto-questionnairer", entry: "https://for-one-dream.cloud/interview"`
            *   *项目文案简介 (展示在窗口侧边栏/信息区)：* 基于 React + FastAPI + DeepSeek。支持 SSE 流式对话交互、AI 动态追问与话题路由，具备完整的生产环境 Nginx 反向代理与 HTTPS 配置。
    *   **三色控制灯：** 点击窗口“绿灯”，窗口在虚拟 Mac 内全屏放大，挂载的 qiankun 子应用自动触发 resize 重新计算视口，获得极致流畅的体验。


---

## 11. 插画生成提示词 (Midjourney)
> **Prompt:** A character sheet of a young male coder named Sonny, cute flat cartoon style, thick black outlines, neo-brutalism illustration style, minimalist vector graphics, solid light-gray background. 5 different poses: 1. Front view facing camera smiling. 2. Front view waving hand. 3. Side profile looking right. 4. Side view typing on a laptop with glasses. 5. Holding a coffee cup relaxing. --ar 16:9 --v 6.0
