import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import SectionLabel from '../ui/SectionLabel'
import { Search, LayoutDashboard, Settings, FlaskConical, Rocket } from 'lucide-react'

const steps = [
  {
    icon: Search,
    title: 'Discovery & Scoping',
    description: 'We sit down with your team, understand your business pain points, map your workflows, and define exactly what needs to be built. No assumptions.',
    duration: '1–2 weeks',
  },
  {
    icon: LayoutDashboard,
    title: 'Architecture & Design',
    description: 'We create the technical blueprint, design the user experience, define the database schema, and plan the infrastructure before writing any code.',
    duration: '1–2 weeks',
  },
  {
    icon: Settings,
    title: 'Development Sprints',
    description: 'We build in focused 2-week sprints with demos at the end of each. You see real progress, give feedback, and steer the direction in real time.',
    duration: '4–8 weeks',
  },
  {
    icon: FlaskConical,
    title: 'QA & Refinement',
    description: 'Every feature is tested across devices and edge cases. We fix bugs, optimize performance, and polish the experience until it meets our quality bar.',
    duration: '1–2 weeks',
  },
  {
    icon: Rocket,
    title: 'Launch & Ongoing Support',
    description: 'We deploy to production, monitor the rollout, and stay on for 30 days of post-launch support. Then optional maintenance retainer keeps things running.',
    duration: 'Ongoing',
  },
]

export default function HowWeWork() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Draw the vertical line
      if (lineRef.current) {
        gsap.fromTo(lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              end: 'bottom 80%',
              scrub: 1,
            },
          }
        )
      }

      // Scrubbing dot that travels along the line
      if (dotRef.current) {
        gsap.fromTo(dotRef.current,
          { top: '0%', opacity: 0 },
          {
            top: '100%',
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              end: 'bottom 80%',
              scrub: 0.6,
            },
          }
        )
      }

      // Steps: alternating slide from sides
      document.querySelectorAll('.process-step').forEach((step, i) => {
        const fromX = i % 2 === 0 ? -70 : 70
        gsap.fromTo(step,
          { x: fromX, y: 25, opacity: 0 },
          {
            x: 0, y: 0, opacity: 1,
            duration: 0.85, ease: 'power3.out',
            scrollTrigger: { trigger: step, start: 'top 88%' },
          }
        )
      })

      // Step icons: elastic scale-in + glow burst
      document.querySelectorAll('.step-icon').forEach((icon) => {
        ScrollTrigger.create({
          trigger: icon,
          start: 'top 88%',
          once: true,
          onEnter: () => {
            gsap.fromTo(icon,
              { scale: 0.4, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.7, ease: 'elastic.out(1, 0.55)' }
            )
            // Ripple pulse
            const ripple = (icon as HTMLElement).querySelector('.step-ripple')
            if (ripple) {
              gsap.fromTo(ripple,
                { scale: 1, opacity: 0.7 },
                { scale: 2.4, opacity: 0, duration: 0.9, ease: 'power2.out' }
              )
            }
          },
        })
      })

      // Duration badges pop in
      document.querySelectorAll('.duration-badge').forEach((badge) => {
        gsap.fromTo(badge,
          { scale: 0, opacity: 0 },
          {
            scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)',
            scrollTrigger: { trigger: badge, start: 'top 90%' },
          }
        )
      })
    }, sectionRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 section-padding bg-cw-dark" id="process">
      <div className="max-w-site mx-auto">
        <div className="text-center mb-20">
          <SectionLabel>Our Process</SectionLabel>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white mt-6 mb-6">
            Our Process.<br className="hidden sm:block" /> Your Peace of Mind.
          </h2>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical timeline line */}
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-px bg-cw-border">
            <div
              ref={lineRef}
              className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-cw-accent to-cw-accent-2 origin-top"
              style={{ transform: 'scaleY(0)' }}
            />
            {/* Scrubbing glow dot */}
            <div
              ref={dotRef}
              className="absolute -left-[5px] w-3 h-3 rounded-full bg-cw-accent pointer-events-none"
              style={{
                boxShadow: '0 0 0 4px rgba(0,229,255,0.15), 0 0 14px rgba(0,229,255,0.8)',
                top: '0%',
                opacity: 0,
              }}
            />
          </div>

          <div className="space-y-16">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <div key={step.title} className="process-step relative flex gap-8 md:gap-12">
                  {/* Step indicator */}
                  <div className="relative z-10 flex-shrink-0 step-icon">
                    {/* Ripple ring */}
                    <div
                      className="step-ripple absolute inset-0 rounded-full border border-cw-accent/40 pointer-events-none"
                      style={{ transform: 'scale(1)', opacity: 0 }}
                    />
                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-cw-surface border border-cw-border hover:border-cw-accent/40 hover:shadow-[0_0_20px_rgba(0,229,255,0.15)] transition-all duration-300 flex flex-col items-center justify-center">
                      <Icon size={20} className="text-cw-accent mb-1" />
                      <span className="font-mono text-[10px] text-cw-muted">0{i + 1}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="pt-2 md:pt-4">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-white">{step.title}</h3>
                      <span className="duration-badge px-3 py-1 bg-cw-surface border border-cw-border rounded-full font-mono text-xs text-cw-muted">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-cw-muted leading-relaxed max-w-lg">{step.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
