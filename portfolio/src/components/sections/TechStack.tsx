import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import SectionLabel from '../ui/SectionLabel'

const categories = [
  {
    label: 'Frontend',
    items: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Framer Motion'],
  },
  {
    label: 'Backend',
    items: ['Laravel', 'Node.js', 'PHP'],
  },
  {
    label: 'Database',
    items: ['MySQL', 'PostgreSQL'],
  },
  {
    label: 'Automation',
    items: ['n8n', 'Zapier'],
  },
  {
    label: 'Infrastructure',
    items: ['AWS', 'Vercel', 'Docker'],
  },
]

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Category labels: clip-path reveal from left
      document.querySelectorAll('.tech-category-label').forEach((label, i) => {
        gsap.fromTo(label,
          { clipPath: 'inset(0 100% 0 0)', x: -20, opacity: 0 },
          {
            clipPath: 'inset(0 0% 0 0)', x: 0, opacity: 1,
            duration: 0.7, ease: 'power3.out',
            delay: i * 0.09,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          }
        )
      })

      // Individual pills: spring pop with per-pill stagger
      const pills = Array.from(document.querySelectorAll<HTMLElement>('.tech-pill'))
      pills.forEach((pill, i) => {
        gsap.fromTo(pill,
          { y: 40, opacity: 0, scale: 0.65 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 0.55, ease: 'back.out(2)',
            delay: i * 0.038,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          }
        )

        // Spring hover: magnetic lift
        pill.addEventListener('mouseenter', () => {
          gsap.to(pill, {
            scale: 1.12, y: -4,
            color: '#00E5FF',
            borderColor: 'rgba(0,229,255,0.5)',
            boxShadow: '0 0 16px rgba(0,229,255,0.2)',
            duration: 0.22, ease: 'power2.out',
          })
        })
        pill.addEventListener('mouseleave', () => {
          gsap.to(pill, {
            scale: 1, y: 0,
            color: '',
            borderColor: '',
            boxShadow: 'none',
            duration: 0.4, ease: 'elastic.out(1, 0.5)',
          })
        })
      })

      // Ambient floating dots in background
      gsap.to('.tech-bg-dot', {
        y: -16, duration: 4, yoyo: true, repeat: -1, ease: 'sine.inOut',
        stagger: { each: 0.6, from: 'random' },
      })
    }, sectionRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 section-padding bg-cw-dark overflow-hidden">
      {/* Ambient background dots */}
      <div className="tech-bg-dot absolute top-12 right-[8%]  w-2 h-2 rounded-full bg-cw-accent/10 pointer-events-none" />
      <div className="tech-bg-dot absolute top-1/3 left-[5%] w-3 h-3 rounded-full bg-cw-accent-2/8 pointer-events-none" />
      <div className="tech-bg-dot absolute bottom-24 right-[20%] w-1.5 h-1.5 rounded-full bg-cw-accent-3/10 pointer-events-none" />
      <div className="tech-bg-dot absolute bottom-1/3 left-[15%] w-2.5 h-2.5 rounded-full bg-cw-accent/8 pointer-events-none" />

      <div className="max-w-site mx-auto">
        <div className="text-center mb-16">
          <SectionLabel>Tech Stack</SectionLabel>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white mt-6 mb-6">
            Built With What Works.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {categories.map((cat) => (
            <div key={cat.label} className="tech-category">
              <h3
                className="tech-category-label font-mono text-xs tracking-widest uppercase text-cw-muted mb-4"
                style={{ clipPath: 'inset(0 100% 0 0)' }}
              >
                {cat.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="tech-pill px-4 py-2 bg-cw-surface border border-cw-border rounded-lg font-body text-sm text-cw-text transition-colors"
                    data-cursor-hover
                    style={{ willChange: 'transform, box-shadow, color, border-color' }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
