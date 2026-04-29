import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence, MotionConfig } from 'framer-motion'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import SectionLabel from '../ui/SectionLabel'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

const caseStudies = [
  {
    num: '01',
    tag: 'Healthcare | System',
    title: 'OR Booking System',
    headline: '85% fewer scheduling conflicts',
    description:
      'Anesthesiology department paperless scheduling for 17 surgical departments. Eliminated manual coordination and reduced scheduling conflicts by 85%.',
    tech: ['React', 'Laravel', 'MySQL', 'WebSockets'],
    metric: { value: 85, suffix: '%', label: 'Fewer Conflicts' },
    accentColor: '#00E5FF',
    gradientFrom: 'rgba(0,229,255,0.18)',
    gradientTo: 'rgba(123,97,255,0.08)',
  },
  {
    num: '02',
    tag: 'ERP | Multi-module',
    title: 'HardhatLedger',
    headline: '4 tools replaced by 1 system',
    description:
      'Unified POS + Inventory + Accounting platform for construction materials business. One system to replace four separate tools.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
    metric: { value: 4, suffix: '→1', label: 'Tools Unified' },
    accentColor: '#7B61FF',
    gradientFrom: 'rgba(123,97,255,0.20)',
    gradientTo: 'rgba(0,229,255,0.06)',
  },
  {
    num: '03',
    tag: 'Automation | HRMS',
    title: 'HR Automation Suite',
    headline: '60% less HR admin time',
    description:
      'n8n-based attendance, leave, payroll, and multi-level approvals for a mid-sized enterprise. Cut HR admin time by 60%.',
    tech: ['n8n', 'Laravel', 'MySQL', 'React'],
    metric: { value: 60, suffix: '%', label: 'Time Saved' },
    accentColor: '#FF4D6A',
    gradientFrom: 'rgba(255,77,106,0.18)',
    gradientTo: 'rgba(0,229,255,0.06)',
  },
  {
    num: '04',
    tag: 'Marketing | SaaS',
    title: 'SME Marketing Platform',
    headline: 'Full lead funnel, zero gaps',
    description:
      'Full lead-gen funnel with CRM integration for local business growth. From landing page to closed deal, every step is tracked.',
    tech: ['React', 'Laravel', 'MySQL', 'Stripe'],
    metric: { value: 100, suffix: '%', label: 'Funnel Tracked' },
    accentColor: '#00E5FF',
    gradientFrom: 'rgba(0,229,255,0.15)',
    gradientTo: 'rgba(255,77,106,0.08)',
  },
]

// ─── Directional card variants (from animate skill: multi-step-flow pattern) ───
const cardVariants = {
  enter: (dir: number) => ({
    x: `${85 * dir}%`,
    opacity: 0,
    scale: 0.86,
    rotateY: dir * 16,
    filter: 'blur(12px)',
  }),
  center: {
    x: '0%',
    opacity: 1,
    scale: 1,
    rotateY: 0,
    filter: 'blur(0px)',
  },
  exit: (dir: number) => ({
    x: `${-85 * dir}%`,
    opacity: 0,
    scale: 0.86,
    rotateY: dir * -16,
    filter: 'blur(12px)',
  }),
}

// ─── Stagger container / item variants for within-card elements ───
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
}
const itemVariants = {
  hidden: { y: 38, opacity: 0, filter: 'blur(6px)' },
  visible: {
    y: 0, opacity: 1, filter: 'blur(0px)',
    transition: { type: 'spring' as const, stiffness: 380, damping: 30 },
  },
}
const tagVariants = {
  hidden: { scale: 0.6, opacity: 0 },
  visible: {
    scale: 1, opacity: 1,
    transition: { type: 'spring' as const, stiffness: 500, damping: 22 },
  },
}

// ─── Animated metric counter ───
function MetricCounter({
  value, suffix, label, color,
}: { value: number; suffix: string; label: string; color: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obj = { v: 0 }
    const tween = gsap.to(obj, {
      v: value, duration: 1.6, ease: 'power2.out',
      onUpdate: () => { el.textContent = Math.round(obj.v).toString() },
    })
    return () => { tween.kill() }
  }, [value])

  return (
    <div className="text-center">
      <div className="flex items-end justify-center gap-1">
        <span ref={ref} className="font-mono font-extrabold text-5xl sm:text-6xl text-white leading-none">
          0
        </span>
        <span className="font-mono font-bold text-2xl sm:text-3xl text-white leading-none mb-1" style={{ color }}>
          {suffix}
        </span>
      </div>
      <p className="font-mono text-xs tracking-widest uppercase mt-2" style={{ color, opacity: 0.7 }}>
        {label}
      </p>
    </div>
  )
}

// ─── Visual area: animated abstract UI per card ───
function CardVisual({ index, accentColor, gradientFrom, gradientTo }: {
  index: number; accentColor: string; gradientFrom: string; gradientTo: string
}) {
  const bars = [0.45, 0.72, 0.58, 0.91, 0.64, 0.83, 0.39, 0.77]
  const nodes = [
    { x: '20%', y: '25%' }, { x: '50%', y: '15%' }, { x: '78%', y: '30%' },
    { x: '30%', y: '60%' }, { x: '65%', y: '55%' }, { x: '48%', y: '75%' },
  ]

  return (
    <div
      className="relative w-full h-full rounded-2xl overflow-hidden flex items-center justify-center"
      style={{ background: `radial-gradient(ellipse at 40% 40%, ${gradientFrom}, ${gradientTo}, rgba(14,17,24,0.9))` }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 30% 70%, ${accentColor}10 0%, transparent 60%)`,
        }}
      />

      {/* Animated grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 300" fill="none">
        {[0,1,2,3,4].map(i => (
          <line key={`h${i}`} x1="0" y1={60*i} x2="400" y2={60*i} stroke={accentColor} strokeWidth="0.5" />
        ))}
        {[0,1,2,3,4,5].map(i => (
          <line key={`v${i}`} x1={80*i} y1="0" x2={80*i} y2="300" stroke={accentColor} strokeWidth="0.5" />
        ))}
      </svg>

      {/* Card-specific visuals */}
      {(index === 0 || index === 3) && (
        // Bar chart
        <div className="relative z-10 flex items-end gap-2 px-6 pb-4 pt-8">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              className="w-7 rounded-t-sm"
              style={{ background: `linear-gradient(to top, ${accentColor}80, ${accentColor}20)`, border: `1px solid ${accentColor}30` }}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: `${h * 100}px`, opacity: 1 }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.33, 1, 0.68, 1] }}
            />
          ))}
        </div>
      )}

      {(index === 1) && (
        // Node graph
        <div className="relative z-10 w-full h-full">
          {nodes.map((node, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 rounded-full"
              style={{ left: node.x, top: node.y, background: accentColor, boxShadow: `0 0 16px ${accentColor}80` }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 18, delay: i * 0.08 }}
            />
          ))}
          {/* Connecting lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            {[[0,1],[1,2],[0,3],[1,4],[3,5],[4,5]].map(([a, b], i) => (
              <motion.line
                key={i}
                x1={parseFloat(nodes[a].x)} y1={parseFloat(nodes[a].y)}
                x2={parseFloat(nodes[b].x)} y2={parseFloat(nodes[b].y)}
                stroke={accentColor} strokeWidth="0.5" opacity="0.3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.07 }}
              />
            ))}
          </svg>
        </div>
      )}

      {(index === 2) && (
        // Funnel / flow steps
        <div className="relative z-10 flex flex-col items-center gap-3 w-full px-8">
          {[1, 0.78, 0.56, 0.35].map((width, i) => (
            <motion.div
              key={i}
              className="h-8 rounded-md flex items-center justify-center"
              style={{
                width: `${width * 100}%`,
                background: `linear-gradient(to right, ${accentColor}40, ${accentColor}10)`,
                border: `1px solid ${accentColor}30`,
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="h-1.5 rounded-full" style={{ width: '40%', background: `${accentColor}50` }} />
            </motion.div>
          ))}
        </div>
      )}

      {/* Floating scan line */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ borderRadius: 'inherit' }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(to right, transparent, ${accentColor}60, transparent)`,
            animation: 'scan-line 3s ease-in-out 0.5s infinite',
          }}
        />
      </div>

      {/* Corner badge */}
      <div
        className="absolute top-4 left-4 px-3 py-1 rounded-full font-mono text-xs"
        style={{ border: `1px solid ${accentColor}30`, color: accentColor, background: `${accentColor}08` }}
      >
        LIVE SYSTEM
      </div>
    </div>
  )
}

export default function CaseStudies() {
  const sectionRef   = useRef<HTMLElement>(null)
  const progressRef  = useRef<HTMLDivElement>(null)
  const activeRef    = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction,   setDirection]   = useState(1)
  const total = caseStudies.length
  const touchStartX  = useRef(0)
  const touchStartY  = useRef(0)

  const goTo = useCallback((next: number) => {
    const clamped = Math.max(0, Math.min(total - 1, next))
    if (clamped === activeRef.current) return
    setDirection(clamped > activeRef.current ? 1 : -1)
    activeRef.current = clamped
    setActiveIndex(clamped)
  }, [total])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const isMobile = window.innerWidth < 1024
    let trigger: ReturnType<typeof ScrollTrigger.create> | null = null

    if (!isMobile) {
      const HOLD_VH = 180
      const TOTAL_VH = total * HOLD_VH

      trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${TOTAL_VH}vh`,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const raw = self.progress * total
          const newIndex = Math.min(Math.floor(raw), total - 1)
          const cardFrac = raw - Math.floor(raw)

          if (progressRef.current) {
            progressRef.current.style.width = `${cardFrac * 100}%`
          }

          if (newIndex !== activeRef.current) {
            const dir = newIndex > activeRef.current ? 1 : -1
            activeRef.current = newIndex
            setDirection(dir)
            setActiveIndex(newIndex)
          }
        },
      })
    }

    // Keyboard navigation
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goTo(activeRef.current + 1)
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   goTo(activeRef.current - 1)
    }
    window.addEventListener('keydown', onKey)

    // Touch swipe navigation
    const onTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX
      touchStartY.current = e.touches[0].clientY
    }
    const onTouchEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - touchStartX.current
      const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current)
      if (Math.abs(dx) > 50 && Math.abs(dx) > dy) {
        if (dx < 0) goTo(activeRef.current + 1)
        else goTo(activeRef.current - 1)
      }
    }
    section.addEventListener('touchstart', onTouchStart, { passive: true })
    section.addEventListener('touchend', onTouchEnd, { passive: true })

    return () => {
      if (trigger) trigger.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
      window.removeEventListener('keydown', onKey)
      section.removeEventListener('touchstart', onTouchStart)
      section.removeEventListener('touchend', onTouchEnd)
    }
  }, [goTo, total])

  const study = caseStudies[activeIndex]

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-cw-black overflow-hidden"
      id="work"
      style={{ zIndex: 1 }}
    >
      {/* Ambient background gradient that shifts per card */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: 1 }}
        style={{
          background: `radial-gradient(ellipse at 60% 50%, ${study.gradientFrom}, transparent 65%)`,
        }}
        transition={{ duration: 0.8 }}
      />

      <div className="relative z-10 lg:h-screen flex flex-col section-padding max-w-site mx-auto py-12 lg:py-16">
        {/* Header row */}
        <div className="flex items-end justify-between mb-6 lg:mb-8 flex-shrink-0">
          <div>
            <SectionLabel>Case Studies</SectionLabel>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white mt-4">
              Systems We've Shipped.
            </h2>
          </div>

          {/* Animated card counter */}
          <div className="flex items-center gap-3 font-mono text-sm text-cw-muted">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={activeIndex}
                className="font-extrabold text-2xl sm:text-3xl text-white tabular-nums"
                initial={{ y: direction > 0 ? 24 : -24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: direction > 0 ? -24 : 24, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              >
                {String(activeIndex + 1).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>
            <span className="text-cw-border text-xl">/</span>
            <span className="text-lg">{String(total).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Main card area */}
        <div className="flex-1 relative overflow-hidden min-h-[500px] lg:min-h-0" style={{ perspective: '1400px' }}>
          <MotionConfig transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={activeIndex}
                className="absolute inset-0 grid lg:grid-cols-2 gap-6 lg:gap-8"
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Left — Visual */}
                <div className="hidden lg:block">
                  <CardVisual
                    index={activeIndex}
                    accentColor={study.accentColor}
                    gradientFrom={study.gradientFrom}
                    gradientTo={study.gradientTo}
                  />
                </div>

                {/* Right — Content */}
                <motion.div
                  className="flex flex-col justify-start lg:justify-center gap-5"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Tag */}
                  <motion.div variants={itemVariants}>
                    <span
                      className="inline-flex items-center px-4 py-1.5 rounded-full font-mono text-xs tracking-widest uppercase"
                      style={{
                        border: `1px solid ${study.accentColor}30`,
                        color: study.accentColor,
                        background: `${study.accentColor}08`,
                      }}
                    >
                      {study.tag}
                    </span>
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    variants={itemVariants}
                    className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl text-white leading-tight"
                  >
                    {study.title}
                  </motion.h3>

                  {/* Headline stat */}
                  <motion.div variants={itemVariants}>
                    <MetricCounter
                      value={study.metric.value}
                      suffix={study.metric.suffix}
                      label={study.metric.label}
                      color={study.accentColor}
                    />
                  </motion.div>

                  {/* Description */}
                  <motion.p variants={itemVariants} className="text-cw-muted leading-relaxed max-w-lg">
                    {study.description}
                  </motion.p>

                  {/* Tech tags */}
                  <motion.div variants={containerVariants} className="flex flex-wrap gap-2">
                    {study.tech.map(t => (
                      <motion.span
                        key={t}
                        variants={tagVariants}
                        className="px-3 py-1 bg-cw-surface border border-cw-border rounded-full text-xs font-mono text-cw-muted"
                      >
                        {t}
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* CTA */}
                  <motion.a
                    href="#"
                    variants={itemVariants}
                    className="inline-flex items-center gap-2 text-sm font-display font-semibold group w-fit"
                    style={{ color: study.accentColor }}
                    whileHover={{ x: 4 }}
                    data-cursor-hover
                  >
                    View Case Study
                    <motion.span whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 600 }}>
                      <ArrowRight size={14} />
                    </motion.span>
                  </motion.a>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </MotionConfig>
        </div>

        {/* Footer: progress + navigation */}
        <div className="flex items-center gap-4 mt-6 flex-shrink-0">
          {/* Swipe hint — mobile only */}
          <p className="lg:hidden font-mono text-xs text-cw-muted/50 flex-shrink-0">swipe</p>
          {/* Progress bar (scroll-driven, updated via ref) */}
          <div className="flex-1 h-px bg-cw-border rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full rounded-full transition-none"
              style={{
                width: '0%',
                background: `linear-gradient(to right, ${study.accentColor}, ${study.accentColor}60)`,
              }}
            />
          </div>

          {/* Dot indicators */}
          <div className="flex items-center gap-1">
            {caseStudies.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="flex items-center justify-center w-8 h-8 cursor-none"
                aria-label={`Go to case study ${i + 1}`}
              >
                <span
                  className="rounded-full transition-all duration-300 block"
                  style={{
                    width: i === activeIndex ? '24px' : '6px',
                    height: '6px',
                    background: i === activeIndex ? study.accentColor : 'rgba(107,122,153,0.4)',
                  }}
                />
              </button>
            ))}
          </div>

          {/* Arrow navigation */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => goTo(activeIndex - 1)}
              disabled={activeIndex === 0}
              className="w-11 h-11 rounded-full border border-cw-border flex items-center justify-center text-cw-muted hover:border-cw-accent/40 hover:text-cw-accent transition-all duration-200 disabled:opacity-30 cursor-none"
              aria-label="Previous"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => goTo(activeIndex + 1)}
              disabled={activeIndex === total - 1}
              className="w-11 h-11 rounded-full border border-cw-border flex items-center justify-center text-cw-muted hover:border-cw-accent/40 hover:text-cw-accent transition-all duration-200 disabled:opacity-30 cursor-none"
              aria-label="Next"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
