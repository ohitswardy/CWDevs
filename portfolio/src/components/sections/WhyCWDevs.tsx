import { useEffect, useRef, useCallback } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import SectionLabel from '../ui/SectionLabel'
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

// Orbital config: each ring is an electron shell
const orbitals = [
  { radius: 60, speed: 12, direction: 1, tilt: 75, color: 'rgba(0, 229, 255, 0.15)', electrons: 0 },
  { radius: 100, speed: 18, direction: -1, tilt: 70, color: 'rgba(123, 97, 255, 0.12)', electrons: 1 },
  { radius: 150, speed: 25, direction: 1, tilt: 65, color: 'rgba(0, 229, 255, 0.10)', electrons: 2 },
  { radius: 200, speed: 14, direction: -1, tilt: 72, color: 'rgba(123, 97, 255, 0.08)', electrons: 1 },
  { radius: 260, speed: 30, direction: 1, tilt: 68, color: 'rgba(0, 229, 255, 0.06)', electrons: 2 },
]

// Electron colors
const electronColors = ['#00E5FF', '#7B61FF', '#FF4D6A', '#00E5FF', '#7B61FF', '#FF4D6A']

export default function WhyCWDevs() {
  const sectionRef = useRef<HTMLElement>(null)
  const atomRef = useRef<HTMLDivElement>(null)
  const nucleusRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const smoothMouse = useRef({ x: 0, y: 0 })
  const rafId = useRef<number>(0)
  const isInSection = useRef(false)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    mouse.current = {
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    }
    if (glowRef.current) {
      glowRef.current.style.left = `${e.clientX - rect.left}px`
      glowRef.current.style.top = `${e.clientY - rect.top}px`
    }
  }, [])

  const handleMouseEnter = useCallback(() => {
    isInSection.current = true
    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity: 1, duration: 0.4, ease: 'power2.out' })
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    isInSection.current = false
    if (atomRef.current) {
      gsap.to(atomRef.current, { rotateY: 0, rotateX: 0, duration: 0.8, ease: 'power3.out' })
    }
    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity: 0, duration: 0.4, ease: 'power2.out' })
    }
    mouse.current = { x: 0, y: 0 }
  }, [])

  const animate = useCallback(() => {
    smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * 0.06
    smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * 0.06

    const sx = smoothMouse.current.x
    const sy = smoothMouse.current.y

    if (isInSection.current && atomRef.current) {
      // 3D tilt the whole atom model based on cursor
      gsap.set(atomRef.current, { rotateY: sx * 12, rotateX: -sy * 8 })
    }

    rafId.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Why items slide in from left with stagger
      gsap.fromTo('.why-item',
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, stagger: 0.12, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      )

      // Animate orbital rings entrance — scale + fade from center
      document.querySelectorAll('.orbit-ring').forEach((ring, i) => {
        gsap.fromTo(ring,
          { scale: 0, opacity: 0 },
          {
            scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.4)',
            delay: 0.1 * i,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
          }
        )
      })

      // Electrons pop in after rings
      document.querySelectorAll('.electron').forEach((el, i) => {
        gsap.fromTo(el,
          { scale: 0, opacity: 0 },
          {
            scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)',
            delay: 0.6 + i * 0.1,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
          }
        )
      })

      // Spin each orbital ring continuously
      document.querySelectorAll('.orbit-ellipse').forEach((ring) => {
        const el = ring as HTMLElement
        const speed = parseFloat(el.dataset.speed || '20')
        const dir = parseInt(el.dataset.dir || '1', 10)
        gsap.to(ring, {
          rotation: 360 * dir,
          duration: speed,
          repeat: -1,
          ease: 'none',
        })
      })

      // Nucleus entrance — scale pulse
      if (nucleusRef.current) {
        gsap.fromTo(nucleusRef.current,
          { scale: 0, opacity: 0 },
          {
            scale: 1, opacity: 1, duration: 0.8, ease: 'elastic.out(1, 0.5)',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
          }
        )
        // Continuous nucleus glow pulse
        gsap.to(nucleusRef.current.querySelector('.nucleus-glow'), {
          scale: 1.3, opacity: 0.4, duration: 2, yoyo: true, repeat: -1, ease: 'sine.inOut',
        })
      }
    }, sectionRef)

    section.addEventListener('mousemove', handleMouseMove)
    section.addEventListener('mouseenter', handleMouseEnter)
    section.addEventListener('mouseleave', handleMouseLeave)
    rafId.current = requestAnimationFrame(animate)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach(t => t.kill())
      section.removeEventListener('mousemove', handleMouseMove)
      section.removeEventListener('mouseenter', handleMouseEnter)
      section.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  // Build electron positions for each orbital
  let electronIndex = 0

  return (
    <section ref={sectionRef} className="relative py-32 section-padding overflow-hidden">
      {/* Cursor glow */}
      <div
        ref={glowRef}
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none opacity-0 -translate-x-1/2 -translate-y-1/2 z-0"
        style={{
          background: 'radial-gradient(circle, rgba(0, 229, 255, 0.06) 0%, rgba(123, 97, 255, 0.03) 40%, transparent 70%)',
          willChange: 'left, top, opacity',
        }}
      />

      <div className="max-w-site mx-auto">
        <div className="text-center mb-16">
          <SectionLabel>Why CW Devs</SectionLabel>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white mt-6">
            Why SMEs Choose CW Devs.
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

          {/* Right — Atom Model */}
          <div className="relative flex items-center justify-center h-[450px]">
            <div
              ref={atomRef}
              className="relative w-full h-full flex items-center justify-center"
              style={{ perspective: '800px', transformStyle: 'preserve-3d', willChange: 'transform' }}
            >
              {/* Orbital rings + electrons */}
              {orbitals.map((orbit, i) => {
                const electrons: number[] = []
                for (let e = 0; e < orbit.electrons; e++) {
                  electrons.push(electronIndex++)
                }
                return (
                  <div
                    key={i}
                    className="orbit-ring absolute inset-0 flex items-center justify-center"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* The ring — tilted ellipse, GSAP rotates this */}
                    <div
                      className="orbit-ellipse absolute rounded-full border"
                      data-speed={orbit.speed}
                      data-dir={orbit.direction}
                      style={{
                        width: `${orbit.radius * 2}px`,
                        height: `${orbit.radius * 2}px`,
                        borderColor: orbit.color,
                        transform: `rotateX(${orbit.tilt}deg) rotateY(${i * 15}deg)`,
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      {/* Electrons positioned on the ring edge */}
                      {electrons.map((eIdx, eI) => {
                        const angle = (360 / orbit.electrons) * eI
                        const color = electronColors[eIdx % electronColors.length]
                        const size = eIdx % 3 === 0 ? 8 : eIdx % 3 === 1 ? 6 : 5
                        // Position using absolute + transform to sit on ring circumference
                        const rad = (angle * Math.PI) / 180
                        const ex = Math.cos(rad) * orbit.radius
                        const ey = Math.sin(rad) * orbit.radius
                        return (
                          <div
                            key={eIdx}
                            className="electron absolute"
                            style={{
                              width: `${size}px`,
                              height: `${size}px`,
                              borderRadius: '50%',
                              background: color,
                              boxShadow: `0 0 ${size * 2}px ${color}, 0 0 ${size * 4}px ${color}40`,
                              left: '50%',
                              top: '50%',
                              transform: `translate(${ex - size / 2}px, ${ey - size / 2}px)`,
                            }}
                          />
                        )
                      })}
                    </div>
                  </div>
                )
              })}

              {/* Nucleus — CW Devs logo */}
              <div ref={nucleusRef} className="relative z-10 flex flex-col items-center">
                {/* Glow behind nucleus */}
                <div
                  className="nucleus-glow absolute w-32 h-32 rounded-full -z-10"
                  style={{
                    background: 'radial-gradient(circle, rgba(0, 229, 255, 0.25) 0%, rgba(123, 97, 255, 0.15) 50%, transparent 80%)',
                    filter: 'blur(20px)',
                  }}
                />
                <div className="flex items-center gap-1">
                  <span className="font-mono text-5xl font-bold text-cw-accent">CW</span>
                  <span className="font-display text-5xl font-bold text-white">Devs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
