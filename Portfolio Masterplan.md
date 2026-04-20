# 🔥 CW DEVS — ONE-SHOT CLAUDE CODE PROMPT

---

## ROLE & MISSION

You are a world-class senior frontend engineer and creative director specializing in 2026-era digital experiences. You build production-grade, visually extraordinary React + TypeScript single-page applications. Every pixel, every animation, every interaction is intentional. You do not produce generic output.

**Before writing any code**, read and internalize the design skill located at:
`./ui-ux-pro-max-skill/SKILL.md`

Apply every principle from that skill file throughout this project. This is non-negotiable. Treat it as your design bible.

---

## PROJECT OVERVIEW

**Brand:** CW Devs
**Tagline:** "We Build the Systems That Build Your Business."
**Type:** IT services company that builds ANY system — from marketing pages to full industrial-scale platforms, specifically engineered to grow SMEs (Small & Medium Enterprises).

**Core Value Proposition:**
CW Devs is not a typical web agency. They architect end-to-end systems: custom software, business automation, ERP-level platforms, e-commerce ecosystems, healthcare platforms, and more. Their clients are SME owners who want to compete at enterprise level.

---

## TECH STACK

```
- React 18 + TypeScript (strict mode)
- Vite (dev/build)
- Tailwind CSS v3
- GSAP + ScrollTrigger (scroll animations — PRIMARY animation engine)
- Framer Motion (component-level micro-interactions)
- Lucide React (icons)
- React Intersection Observer (trigger hooks for section reveals)
```

Install any missing packages using npm. Do not use Next.js. Pure Vite + React SPA.

---

## DESIGN DIRECTION — "Dark Industrial Precision"

**Aesthetic:** Dark-mode editorial meets industrial brutalism. Think: the design language of a high-end aerospace firm crossed with a modern dev studio. **Sharp. Dense. Authoritative. Fast.**

**Color System:**
```css
--cw-black:       #080A0F   /* near-void background */
--cw-dark:        #0E1118   /* section backgrounds */
--cw-surface:     #141820   /* card surfaces */
--cw-border:      #1E2533   /* subtle borders */
--cw-accent:      #00E5FF   /* electric cyan — primary accent */
--cw-accent-2:    #7B61FF   /* deep violet — secondary accent */
--cw-accent-3:    #FF4D6A   /* hot coral — danger/highlight */
--cw-text:        #E8EDF5   /* primary text */
--cw-muted:       #6B7A99   /* muted/secondary text */
--cw-white:       #FFFFFF
```

**Typography:**
- Display / Hero: `Space Grotesk` (700, 800) — massive, tight letter-spacing
- Body: `DM Sans` (300, 400, 500) — clean, modern readability  
- Mono / Code accents: `JetBrains Mono` — for technical labels, numbers, tags
- Load from Google Fonts in `index.html`

**Grid:** 12-column with max-width 1440px, padding 24px mobile / 80px desktop

**Motion Principles:**
- Scroll-driven reveals: elements enter with `y: 80px → 0`, `opacity: 0 → 1`, staggered with GSAP ScrollTrigger
- Numbers count up when entering viewport
- Horizontal ticker/marquee for logos/tech tags
- Parallax depth layers on hero background elements
- Magnetic hover effect on CTA buttons (mouse tracking)
- Cursor: custom cursor — small circle + dot that scales on hover over interactive elements
- Section transitions: clip-path reveals, not just fades

---

## SITE ARCHITECTURE — SINGLE PAGE

Build all sections in `App.tsx` with dedicated component files per section in `/src/components/sections/`.

### SECTION ORDER:

```
01. <Navbar />
02. <Hero />
03. <LogoTicker />
04. <WhatWeBuild />
05. <Services />
06. <HowWeWork />  
07. <CaseStudies />
08. <TechStack />
09. <Stats />
10. <Testimonials />
11. <WhyCWDevs />
12. <CTA />
13. <Footer />
```

---

## SECTION SPECS — BUILD ALL OF THESE

### 01. `<Navbar />`
- Fixed top, `backdrop-blur` with dark bg on scroll
- Logo: "CW" in cyan monospace + "Devs" in white sans — minimalist wordmark
- Nav links: Services | Work | Process | About | Contact
- CTA button: "Start a Project" — outlined cyan, hover fills
- Mobile: hamburger → full-screen menu overlay
- GSAP: slide down from top on mount

---

### 02. `<Hero />`
This is the most important section. Go all out.

**Layout:** Full viewport height (`100dvh`). Two-column grid on desktop (60/40). Left: text content. Right: 3D-ish geometric abstract (CSS + SVG — no external 3D library, use CSS perspective transforms and layered SVG shapes rotating slowly).

**Text content:**
```
EYEBROW TAG:  [ IT SYSTEMS THAT SCALE ]   (cyan monospace text, bordered pill)
H1:           We Build the Systems
              That Build Your Business.
SUBHEADING:   From marketing pages to enterprise-grade platforms —
              CW Devs engineers end-to-end digital systems tailored 
              for SMEs ready to grow without limits.
BUTTONS:      [  Explore Our Services  ]   [  See Our Work  →  ]
SOCIAL PROOF: "Trusted by 50+ growing SMEs across industries"
              [5 placeholder avatar circles] ★★★★★ 4.9/5
```

**Right side visual:** Layered floating cards showing system types — a small card with "POS System", another "ERP Module", "Marketing Site", "Booking Platform" — floating with subtle `translateZ` and parallax on scroll. Cyan glow lines connecting them like a system diagram.

**Background:** Subtle grid dot pattern overlay on `--cw-black`. Large blurred gradient orb (cyan + violet) positioned center-right.

**GSAP Animations:**
- Hero text: split by word, stagger `y: 100 → 0`, `opacity: 0 → 1` on load
- Floating cards: parallax scroll with different speeds
- Background orb: slow pulse scale animation

---

### 03. `<LogoTicker />`
- Infinite horizontal scroll marquee — no pause, seamless loop
- "Trusted by growing businesses" label
- 8–10 placeholder client industry logos (use text + icons: "HealthCare Co", "BuildMart", "LegalEdge", etc. styled as logo pills)
- Two rows scrolling in opposite directions
- Cyan divider lines top and bottom

---

### 04. `<WhatWeBuild />`
**Headline:** "One Partner. Every System You'll Ever Need."

**Subtext:** "Whether you're launching your first product or scaling your 10th system, CW Devs architects digital solutions that grow with you."

**Interactive Grid** — 6 cards in a 3x2 grid, each card:
- Icon (Lucide)
- System type title
- 1-line description
- On hover: card lifts, cyan border appears, background shifts to `--cw-surface`
- Cards: Marketing Sites | E-Commerce Platforms | Business ERP | Healthcare Systems | Booking & Scheduling | Custom SaaS

**GSAP:** Cards stagger reveal from bottom as section enters viewport

---

### 05. `<Services />`
**Headline:** "Full-Stack. End-to-End. Built to Last."

**Layout:** Alternating left/right rows — 3 services, each with:
- Large number label (`01`, `02`, `03`) in faint oversized mono font
- Service name
- Paragraph description (2-3 sentences)
- Bullet list of deliverables (4-5 items)
- Right/Left side: abstract visual — a CSS-drawn mockup or diagram (use divs + borders to suggest a UI screenshot)

**Services:**
1. **System Design & Architecture** — We map your entire business flow and design a scalable technical blueprint before writing a single line of code.
2. **Full-Stack Development** — React frontends, Laravel/Node backends, MySQL/PostgreSQL databases. We own the full stack.
3. **Automation & Integration** — Connect your systems. CRMs, ERPs, payment gateways, third-party APIs — we wire it all together with n8n and custom-built pipelines.

**GSAP ScrollTrigger:** Each row slides in from alternating sides

---

### 06. `<HowWeWork />`
**Headline:** "Our Process. Your Peace of Mind."

**Layout:** Vertical timeline with 5 steps. Large step number on left, content on right. A vertical glowing line connects all steps.

**Steps:**
1. 🔍 Discovery & Scoping
2. 🧱 Architecture & Design  
3. ⚙️ Development Sprints
4. 🧪 QA & Refinement
5. 🚀 Launch & Ongoing Support

Each step has: title, 2-sentence description, duration tag (e.g., "1–2 weeks")

**GSAP:** As user scrolls, the vertical line "draws" downward using `drawSVG` or `scaleY` on a pseudo-element. Each step fades in as the line reaches it.

---

### 07. `<CaseStudies />`
**Headline:** "Systems We've Shipped."

**Layout:** Horizontal scroll card row (on desktop: cards overflow with arrow navigation). 4 case study cards:

1. **OR Booking System** — Anesthesiology department paperless scheduling for 17 surgical departments. [Healthcare | System]
2. **HardhatLedger** — Unified POS + Inventory + Accounting platform for construction materials business. [ERP | Multi-module]
3. **HR Automation Suite** — n8n-based attendance, leave, payroll, multi-level approvals for mid-sized enterprise. [Automation | HRMS]
4. **SME Marketing Platform** — Full lead-gen funnel + CRM integration for local business growth. [Marketing | SaaS]

Each card:
- Large background tag (industry label)
- System name
- 1-sentence description
- Tech pills (React, Laravel, MySQL, n8n, etc.)
- "View Case →" link
- Subtle image/mockup area (use gradient placeholder with system UI elements)

---

### 08. `<TechStack />`
**Headline:** "Built With What Works."

**Layout:** Grouped icon grid in categories:
- Frontend: React, TypeScript, Tailwind, Vite, Framer Motion
- Backend: Laravel, Node.js, PHP
- Database: MySQL, PostgreSQL
- Automation: n8n, Zapier
- Infrastructure: AWS, Vercel, Docker

Display as: category label + pill grid of tech names with icons (use Lucide or text-based pills)

**GSAP:** Stagger reveal from left, each category has a 0.1s delay

---

### 09. `<Stats />`
**Full-width dark section with 4 large animated stats:**

| Stat | Value |
|------|-------|
| Systems Delivered | 50+ |
| SMEs Scaled | 30+ |
| Average Project Delivery | 6 Weeks |
| Client Retention Rate | 94% |

**Layout:** 4 columns, each with a huge number (counter animates up on scroll entry), label below, subtle icon above.

**GSAP:** `countTo` animation using `gsap.to()` on a JS number that updates the DOM.

---

### 10. `<Testimonials />`
**Headline:** "What Our Clients Say."

**Layout:** 3-column card grid on desktop. Each testimonial:
- Quote in italic
- Client name + company + role
- Star rating (5 stars)
- Subtle left border in cyan

**3 fabricated but realistic testimonials** from SME owner personas (healthcare admin, retail business owner, construction company ops manager).

---

### 11. `<WhyCWDevs />`
**Headline:** "Why SMEs Choose CW Devs."

**Layout:** Left: 4-point list with icons and bold statements. Right: Large visual — a CSS-drawn "CW" logo lockup with animated concentric rings suggesting coverage/reach.

**4 Points:**
- We think in systems, not pages
- We speak business, not just tech
- We build for scale from day one
- We stay after launch

---

### 12. `<CTA />`
**Full-width section, centered.**

**Headline:** "Ready to Build Something That Lasts?"
**Subtext:** "Tell us about your business. We'll design the system around it."

**Two options:**
- `[  Start a Project  ]` — primary filled cyan button (large, with magnetic hover)
- `[  Schedule a Discovery Call  ]` — outlined

**Background:** Gradient mesh in dark with subtle grid lines and floating geometric accents.

---

### 13. `<Footer />`
- Logo + tagline
- 4-column links: Services | Work | Company | Contact
- Social icons (GitHub, LinkedIn, Facebook)
- Copyright: "© 2026 CW Devs. All rights reserved."
- Bottom bar with "Built with precision. Engineered to scale."

---

## GLOBAL ANIMATION REQUIREMENTS

### Custom Cursor
Create `src/components/ui/CustomCursor.tsx`:
- Two-circle cursor: small dot (4px) + larger circle (32px) that follows with lerp delay
- On hover over links/buttons: outer circle scales to 2x, changes color to cyan
- Hide default cursor with `cursor: none` on `body`

### Scroll Progress Bar
Thin 2px cyan line at the very top of the page that fills based on scroll progress.

### GSAP ScrollTrigger Setup
In `src/lib/gsap.ts`:
```typescript
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
export { gsap, ScrollTrigger }
```

Use `useGSAP()` hook from `@gsap/react` in components. Clean up with `ScrollTrigger.refresh()` on resize.

### Section Reveal Pattern
Every section uses this base pattern:
```typescript
// Fade up stagger
gsap.fromTo('.reveal-item', 
  { y: 60, opacity: 0 },
  { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
  }
)
```

---

## FILE STRUCTURE

```
src/
├── components/
│   ├── sections/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── LogoTicker.tsx
│   │   ├── WhatWeBuild.tsx
│   │   ├── Services.tsx
│   │   ├── HowWeWork.tsx
│   │   ├── CaseStudies.tsx
│   │   ├── TechStack.tsx
│   │   ├── Stats.tsx
│   │   ├── Testimonials.tsx
│   │   ├── WhyCWDevs.tsx
│   │   ├── CTA.tsx
│   │   └── Footer.tsx
│   └── ui/
│       ├── CustomCursor.tsx
│       ├── ScrollProgress.tsx
│       ├── Button.tsx
│       └── SectionLabel.tsx
├── lib/
│   └── gsap.ts
├── styles/
│   └── globals.css   (CSS variables + base styles)
└── App.tsx
```

---

## EXECUTION CHECKLIST — DO ALL OF THESE

- [ ] Read `./ui-ux-pro-max-skill/SKILL.md` FIRST before any code
- [ ] Install all required packages (gsap, @gsap/react, framer-motion, lucide-react)
- [ ] Set up Google Fonts in `index.html` (Space Grotesk, DM Sans, JetBrains Mono)
- [ ] Create global CSS variables in `globals.css`
- [ ] Build ALL 13 sections completely — no placeholder components
- [ ] Custom cursor implemented and working
- [ ] Scroll progress bar at top
- [ ] All GSAP ScrollTrigger animations implemented per section
- [ ] Responsive: mobile-first, fully functional at 375px and 1440px
- [ ] TypeScript strict — no `any` types
- [ ] No lorem ipsum — all copy is real, written for CW Devs brand
- [ ] Run `npm run build` at the end and confirm zero errors

---

## CONTENT VOICE

CW Devs speaks with **confidence, precision, and warmth toward SMEs**. Not corporate. Not hustle-bro. Think: the smartest senior dev you know who also understands business.

- Avoid buzzwords like "synergy", "leverage", "paradigm"
- Use concrete language: "We build", "We ship", "In 6 weeks"
- Speak to pain: SME owners fear wasted money, slow delivery, dependency on unreliable vendors
- Speak to aspiration: compete at enterprise level, grow without rebuilding

---

**Start now. Read the skill file first. Build everything. Ship a 10/10.**
