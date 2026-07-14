# Design System: Sonny Engineering Portfolio

## 1. Visual Theme & Atmosphere

This portfolio should feel like a **technical field dossier**, not a generic “AI engineer” landing page and not a lifestyle gallery. It has the precision of a well-maintained engineering notebook: clear hierarchy, factual evidence, calibrated space, and visual systems that explain rather than decorate.

- **Density:** 6/10 — evidence-rich, but never crowded.
- **Variance:** 5/10 — controlled asymmetry: a strong content column paired with a visual or technical artifact, never a centered hero or a repeated card grid.
- **Motion:** 5/10 — precise mechanical transitions that make state changes legible; no elastic or theatrical motion.
- **Physical scene:** A hiring manager reads this on a bright laptop screen between meetings. Every project needs to be understandable at a glance, and every technical claim must look deliberately placed rather than “marketed.”

The page alternates between a neutral dossier canvas and one dark Agent systems chapter. The dark chapter is a change of reading mode, not a cyberpunk interlude.

## 2. Color Palette & Roles

Use a neutral, high-contrast system with exactly one accent. Purple, pink, and neon gradients are removed from the active palette.

- **Dossier Canvas** — `#F7F7F5`: primary page background; a nearly neutral paper white, never cream or beige.
- **Paper Surface** — `#FFFFFF`: raised content plane and image backing; use only when hierarchy requires a distinct surface.
- **Charcoal Ink** — `#181A1C`: primary text, borders, diagram strokes, and dark-section background.
- **Graphite Secondary** — `#62686E`: metadata and long-form supporting copy; must retain 4.5:1 contrast on Dossier Canvas.
- **Structural Line** — `#C5C9CC`: dividers, inactive diagram edges, and quiet boundaries.
- **Signal Lime** — `#9EBD45`: the sole accent for active states, verified-result markers, focused nodes, and tactile button fills. It is an olive-lime signal, not a glowing neon.
- **Dark Surface** — `#202326`: the only raised surface within the Agent chapter; text is `#F5F6F4`.

Never use pure black, gradients, purple/blue glows, decorative chromatic shadows, or a second attention color. A hard 2px Charcoal Ink shadow may establish a tactile object; it should not be paired with a soft border shadow.

## 3. Typography Rules

Typography separates narrative from evidence. Chinese body text must never rely on an accidental browser fallback from a Latin monospace font.

- **Display:** `Geist` for concise English labels, numbers, and selected titles; 700–800 weight. Use `letter-spacing: -0.025em` for Latin display text and `-0.015em` for mixed Chinese/Latin headings. Never tighter than `-0.04em`.
- **Chinese display and body:** `Noto Sans SC` (or the licensed project equivalent) for every Chinese heading, project title, summary, and paragraph. Use 600–750 for headings; 400–500 for body.
- **Mono:** `Geist Mono` only for protocol names, metrics, short labels, dates, and architecture tokens. It must not be the default for paragraphs.
- **Body:** 16px on compact screens and 17–18px on desktop; `line-height: 1.75–1.85`; limit reading columns to 34–40 Chinese characters / 65ch maximum.
- **Heading scale:** `clamp(2rem, 4vw, 4.75rem)` only for a page-level heading; project titles `clamp(1.5rem, 2.5vw, 2.6rem)`; section titles `clamp(1.25rem, 1.8vw, 1.75rem)`.
- **Wrapping:** apply balanced wrapping to headings and pretty wrapping to longer technical summaries. Long company names and project titles may wrap to two lines; they must never truncate or overflow.

Do not use Inter, Syne, Space Mono, generic serif fonts, all-caps Chinese body copy, or dense terminal typography for normal reading.

## 4. Content Hierarchy

Every engineering claim follows this hierarchy:

1. **System / project title** — what was built.
2. **Operating context** — the workflow, scale, or technical constraint.
3. **Engineering decision** — the actual architecture, protocol, or delivery method.
4. **Verified outcome** — a metric or concrete operational result from the resume.

Technical stacks are evidence labels, not paragraphs. Present them as short mono tokens beneath the relevant decision. Avoid a separate “skills cloud” or self-scored percentage dominating the evidence.

The first card sequence is four technical chapters (`Engineer Profile`, `Systems & Performance`, `Agent Engineering`, `Delivery System`) followed by one quiet `Offline Mode` card. The fifth card contains no contact detail and is visually secondary.

## 5. Component Stylings

### Dossier panels

- Square or 4px-cornered surfaces with a 2px Charcoal Ink border.
- Use one hard 3–4px offset shadow only for the currently active panel. Static panels should use structural lines and whitespace instead of elevation.
- A project panel contains a title band, one concise summary, and four evidence cells. Evidence cells are separated by 1px structural rules, not nested rounded cards.
- Evidence labels use Geist Mono at 11–12px; the claim itself uses Noto Sans SC at 14–16px.

### Navigation and labels

- Uppercase English labels are allowed only for short, functional identifiers such as `PROJECT DOSSIER` or `VERIFIED OUTCOME`.
- Do not repeat eyebrow labels above every section. Each major chapter gets one identity label at most.
- No emoji, decorative icons, or fake terminal prompts.

### Skills visualization

- Retain the radar only as a navigation device, not as a claim of proficiency by arbitrary scores.
- The active node uses Signal Lime. Inactive nodes use Charcoal Ink and Structural Line.
- The adjacent detail panel prioritizes `Engineering Scope`, `Design Decision`, and `Verified Outcome` over a list of libraries.

### Agent chapter

- Dark Surface, off-white text, and Signal Lime only for focus and progress.
- Treat the interactive rows as a stateful system map. The active row receives a full-surface tint, not a glow or a colored side stripe.
- Keep protocol terms (`SSE`, `RAGAS`, `MCP`) mono; explain their role in Chinese sans-serif copy.

### Personal artwork

- Five portrait 4:5 assets share one graphite-on-neutral-paper treatment.
- Four images depict an engineering system or work artifact, not a person simply typing at a screen.
- The fifth is one low-contrast composite of skiing and cats. It is the only lifestyle image and appears only once.
- Never ask generated imagery to render legible code, dashboards, logos, or numbers. Overlay verified UI data in HTML instead.

## 6. Layout Principles

- Contain desktop content in a `max-width` of 1200–1280px with `clamp(1.25rem, 4vw, 4rem)` horizontal padding.
- The first content chapter uses a 5/7 asymmetric split: image and chapter marker on one side, readable evidence panel on the other. On each card change, the image occupies its own space; text must not overlay it.
- Use CSS Grid for the Dossier evidence cells and Agent content columns. Use Flexbox only for one-dimensional alignment.
- Long-scroll chapters use `min-height: 100dvh` rather than `h-screen`; sticky behavior must have a readable, non-sticky fallback.
- Use horizontal rules, offset alignment, and space to group information. Do not introduce equal-width three-column feature grids or card-within-card patterns.
- Decorative grid lines are forbidden except where they represent an actual system map, architecture board, or measurable diagram. The global paper-noise layer must remain subtle enough that it never lowers text contrast.

### Responsive behavior

- Below 768px all multi-column compositions collapse to one column; the artwork moves before its corresponding text or becomes a contained 4:5 block.
- No fixed 400px-wide image frames, percentage-width desktop pairs, or horizontal overflow.
- Interactive hit targets remain at least 44px high.
- Desktop scroll-driven state changes have an explicit tap/click control or readable sequential layout on touch screens.

## 7. Motion & Interaction

- Default motion: `transform` and `opacity` only; 180–360ms with an exponential ease-out or a spring close to `stiffness: 100, damping: 20`.
- Transitions explain state: a dossier card may translate 12–20px into position; active Agent rows may crossfade and shift by 8px. No bounce, spin, dramatic zoom, or full-page blur.
- The sole persistent motion is a low-amplitude active-node pulse or a 2–3px architecture-line drift within the Agent chapter. It must stop with `prefers-reduced-motion`.
- All animation has a reduced-motion mode that makes content instantly visible and leaves interactions functional.
- Never gate content visibility behind an entrance animation.

## 8. Anti-Patterns (Banned)

- No contact card, phone number, or email address in the portfolio.
- No emojis, generic “AI” imagery, robots, neon hacker rooms, glowing brains, terminal-roleplay copy, or fake code.
- No Inter, Syne, Space Mono as paragraph fonts, generic serif fonts, all-caps Chinese body text, or cramped negative tracking.
- No pure black, purple/pink accents, outer glows, gradients, glassmorphism, or broad soft shadows.
- No centered hero, decorative scroll prompts, bounce arrows, generic three-card feature grids, or cards nested within cards.
- No self-assessed skill scores taking priority over project evidence.
- No unverified claims, invented metrics, or vague phrases such as “赋能核心业务” and “稳定、可扩展的产品体验.”
- No individual lifestyle cards beyond the one combined `Offline Mode` image.
