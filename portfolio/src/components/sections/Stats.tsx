import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { Monitor, Users, Clock, Repeat } from 'lucide-react'

const stats = [
  { icon: Monitor, value: 50, suffix: '+',      label: 'Systems Delivered',      pct: 0.85 },
  { icon: Users,   value: 30, suffix: '+',      label: 'SMEs Scaled',            pct: 0.65 },
  { icon: Clock,   value: 6,  suffix: ' Weeks', label: 'Average Project Delivery', pct: 0.9  },
  { icon: Repeat,  value: 94, suffix: '%',      label: 'Client Retention Rate',  pct: 0.94 },
]

const RING_R = 36
const CIRCUMFERENCE = 2 * Math.PI * RING_R

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null)
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([])
  const ringRefs   = useRef<(SVGCircleElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Dramatic entrance: scale up from small + y
      gsap.fromTo('.stat-item',
        { y: 60, opacity: 0, scale: 0.75 },
        {
          y: 0, opacity: 1, scale: 1,
          stagger: 0.12, duration: 0.75, ease: 'back.out(1.8)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      )

      // Counter + radial ring animation
      stats.forEach((stat, i) => {
        const numEl  = numberRefs.current[i]
        const ringEl = ringRefs.current[i]
        if (!numEl || !ringEl) return

        const targetOffset = CIRCUMFERENCE * (1 - stat.pct)

        gsap.set(ringEl, { strokeDashoffset: CIRCUMFERENCE })

        const obj = { val: 0 }
        gsap.to(obj, {
          val: stat.value,
          duration: 2.2,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
          onUpdate: () => {
            numEl.textContent = Math.round(obj.val).toString() + stat.suffix
          },
        })

        gsap.to(ringEl, {
          strokeDashoffset: targetOffset,
          duration: 2.2,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        })
      })

      // Icon glow pulse while count runs
      gsap.fromTo('.stat-icon',
        { filter: 'drop-shadow(0 0 0px rgba(0,229,255,0))' },
        {
          filter: 'drop-shadow(0 0 8px rgba(0,229,255,0.8))',
          duration: 1, yoyo: true, repeat: 3, ease: 'sine.inOut',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        }
      )
    }, sectionRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 section-padding overflow-hidden">
      <div className="max-w-site mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="stat-item group text-center p-8 rounded-xl border border-cw-border bg-cw-dark hover:border-cw-accent/30 hover:shadow-[0_0_32px_rgba(0,229,255,0.06)] transition-all duration-500 relative overflow-hidden"
              >
                {/* Shimmer on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 animate-shimmer" />
                </div>

                {/* Radial progress ring */}
                <div className="relative w-16 h-16 mx-auto mb-4">
                  <svg
                    className="absolute inset-0 w-full h-full -rotate-90"
                    viewBox="0 0 80 80"
                    fill="none"
                  >
                    <circle
                      cx="40" cy="40" r={RING_R}
                      stroke="rgba(30,37,51,0.8)"
                      strokeWidth="3"
                    />
                    <circle
                      ref={el => { ringRefs.current[i] = el }}
                      cx="40" cy="40" r={RING_R}
                      stroke="url(#stat-grad)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray={CIRCUMFERENCE}
                      strokeDashoffset={CIRCUMFERENCE}
                    />
                    <defs>
                      <linearGradient id="stat-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%"   stopColor="#00E5FF" />
                        <stop offset="100%" stopColor="#7B61FF" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <Icon size={24} className="stat-icon text-cw-accent" />
                  </div>
                </div>

                <span
                  ref={el => { numberRefs.current[i] = el }}
                  className="block font-display font-extrabold text-5xl lg:text-6xl text-white mb-2 font-mono"
                >
                  0
                </span>
                <span className="text-sm text-cw-muted font-body">{stat.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
