import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import SectionLabel from '../ui/SectionLabel'

const services = [
  {
    num: '01',
    title: 'System Design & Architecture',
    description: 'We map your entire business flow and design a scalable technical blueprint before writing a single line of code. Every decision is documented, every edge case considered.',
    deliverables: ['Business process mapping', 'Technical architecture docs', 'Database schema design', 'API contract specifications', 'Infrastructure planning'],
  },
  {
    num: '02',
    title: 'Full-Stack Development',
    description: 'React frontends, Laravel/Node backends, MySQL/PostgreSQL databases. We own the full stack. Every component is tested, every endpoint is secured, every query is optimized.',
    deliverables: ['Responsive frontend (React + TypeScript)', 'Backend API (Laravel / Node.js)', 'Database design & optimization', 'Authentication & authorization', 'CI/CD pipeline setup'],
  },
  {
    num: '03',
    title: 'Automation & Integration',
    description: 'Connect your systems. CRMs, ERPs, payment gateways, third-party APIs — we wire it all together with n8n and custom-built pipelines so your data flows without friction.',
    deliverables: ['n8n workflow automation', 'Payment gateway integration', 'Third-party API connections', 'Data sync & migration', 'Monitoring & alerting setup'],
  },
]

function MockUI({ index }: { index: number }) {
  return (
    <div className="relative w-full max-w-md aspect-[4/3] bg-cw-dark border border-cw-border rounded-xl overflow-hidden group">
      {/* Scan line on hover */}
      <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cw-accent/60 to-transparent"
          style={{ animation: 'scan-line 2.5s ease-in-out infinite' }}
        />
      </div>

      {/* Shimmer overlay on hover */}
      <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 animate-shimmer" />
      </div>

      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-cw-border bg-cw-surface/50">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-cw-accent-3/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        </div>
        <div className="flex-1 mx-8 h-5 bg-cw-surface rounded-sm" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {index === 0 && (
          <>
            <div className="flex gap-3">
              <div className="w-24 h-24 bg-cw-surface rounded border border-cw-border" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-cw-border rounded w-3/4" />
                <div className="h-3 bg-cw-border rounded w-1/2" />
                <div className="h-3 bg-cw-border rounded w-2/3" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {[...Array(6)].map((_, i) => <div key={i} className="h-12 bg-cw-surface rounded border border-cw-border" />)}
            </div>
          </>
        )}
        {index === 1 && (
          <>
            <div className="flex gap-2 mb-3">
              <div className="h-8 w-20 bg-cw-accent/20 rounded border border-cw-accent/30" />
              <div className="h-8 w-16 bg-cw-surface rounded border border-cw-border" />
              <div className="h-8 w-16 bg-cw-surface rounded border border-cw-border" />
            </div>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-2 bg-cw-surface rounded border border-cw-border">
                <div className="w-8 h-8 rounded bg-cw-border" />
                <div className="flex-1 h-3 bg-cw-border rounded" />
                <div className="w-12 h-3 bg-cw-accent/30 rounded" />
              </div>
            ))}
          </>
        )}
        {index === 2 && (
          <>
            <div className="flex items-center justify-between mb-2">
              <div className="flex gap-2">
                <div className="w-10 h-10 rounded-full bg-cw-accent/20 border border-cw-accent/30" />
                <div className="w-10 h-10 rounded-full bg-cw-accent-2/20 border border-cw-accent-2/30" />
              </div>
              <div className="h-1 flex-1 mx-4 bg-cw-border rounded relative">
                <div className="absolute inset-y-0 left-0 w-2/3 bg-cw-accent/40 rounded" />
              </div>
              <div className="w-10 h-10 rounded-full bg-cw-surface border border-cw-border" />
            </div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-2 items-center">
                <div className="w-3 h-3 rounded-full bg-cw-accent/40" />
                <div className="h-8 flex-1 bg-cw-surface rounded border border-cw-border" />
                <div className="w-4 h-4 rounded bg-green-500/30" />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Service rows: slide from alternating sides
      document.querySelectorAll('.service-row').forEach((row, i) => {
        gsap.fromTo(row,
          { x: i % 2 === 0 ? -100 : 100, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 85%' },
          }
        )
      })

      // Service numbers: scale pop
      document.querySelectorAll('.service-num').forEach((num) => {
        gsap.fromTo(num,
          { scale: 0.3, opacity: 0 },
          {
            scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)',
            scrollTrigger: { trigger: num, start: 'top 90%' },
          }
        )
      })

      // Deliverable items: per-item stagger
      document.querySelectorAll('.service-row').forEach((row) => {
        const items = row.querySelectorAll('.deliverable-item')
        gsap.fromTo(items,
          { x: -30, opacity: 0 },
          {
            x: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 75%' },
          }
        )
      })

      // MockUI: subtle float
      document.querySelectorAll('.mock-ui-wrap').forEach((el, i) => {
        gsap.to(el, {
          y: -10, duration: 4 + i * 0.5, yoyo: true, repeat: -1, ease: 'sine.inOut',
          delay: i * 0.8,
        })
      })
    }, sectionRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 section-padding overflow-hidden" id="services">
      <div className="max-w-site mx-auto">
        <div className="text-center mb-20">
          <SectionLabel>Services</SectionLabel>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white mt-6 mb-6">
            Full-Stack. End-to-End.<br className="hidden sm:block" /> Built to Last.
          </h2>
        </div>

        <div className="space-y-24">
          {services.map((service, i) => (
            <div
              key={service.num}
              className={`service-row grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              style={{ direction: i % 2 !== 0 ? 'rtl' : 'ltr' }}
            >
              <div style={{ direction: 'ltr' }}>
                <span className="service-num font-mono text-7xl lg:text-9xl font-bold text-cw-border/50 select-none leading-none inline-block">
                  {service.num}
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mt-4 mb-4">
                  {service.title}
                </h3>
                <p className="text-cw-muted leading-relaxed mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.deliverables.map(item => (
                    <li key={item} className="deliverable-item flex items-center gap-3 text-sm text-cw-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-cw-accent flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-center mock-ui-wrap" style={{ direction: 'ltr', willChange: 'transform' }}>
                <MockUI index={i} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
