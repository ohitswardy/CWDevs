import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import AtomCanvas from '../ui/AtomCanvas'
import { Layers, MessageCircle, TrendingUp, HeartHandshake } from 'lucide-react'

const points = [
  {
    icon: Layers,
    title: 'We think in systems, not pages',
    description: 'Every project starts with the big picture — how data flows, how teams interact, how the business scales.',
  },
  {
    icon: MessageCircle,
    title: 'We speak business, not just tech',
    description: "We translate your goals into technical decisions. You never have to guess what we're building or why.",
  },
  {
    icon: TrendingUp,
    title: 'We build for scale from day one',
    description: 'No duct tape. No shortcuts. Architecture that handles 10x your current load without a rewrite.',
  },
  {
    icon: HeartHandshake,
    title: 'We stay after launch',
    description: '30-day post-launch support included. Optional retainer for ongoing maintenance and feature development.',
  },
]

export default function WhyCWDevs() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo('.why-item',
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, stagger: 0.12, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%' },
        }
      )
    }, section)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 section-padding overflow-hidden">
      <div className="max-w-site mx-auto">
        <div className="text-center mb-16">
<h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white">
            Why SMEs Choose <span className="text-cw-accent">CW</span>Devs
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Points */}
          <div className="space-y-8">
            {points.map(point => {
              const Icon = point.icon
              return (
                <div key={point.title} className="why-item flex gap-5 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-cw-surface border border-cw-border flex items-center justify-center transition-all duration-300 group-hover:border-cw-accent/40 group-hover:shadow-[0_0_15px_rgba(0,229,255,0.1)]">
                    <Icon size={22} className="text-cw-accent" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white mb-1">{point.title}</h3>
                    <p className="text-cw-muted text-sm leading-relaxed">{point.description}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right — Three.js Atom */}
          <div className="relative flex items-center justify-center h-[500px] w-full">
            <AtomCanvas />
          </div>
        </div>
      </div>
    </section>
  )
}
