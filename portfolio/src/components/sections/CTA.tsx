import { useEffect, useRef, useCallback } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import Button from '../ui/Button'

const HEADING = ['Ready', 'to', 'Build', 'Something', 'That', 'Lasts?']

// Pre-defined particle offsets to avoid layout jitter
const PARTICLES = [
  { left: '12%',  top: '18%',  dx: '-40px', dy: '-60px', delay: '0s',    dur: '3.2s' },
  { left: '28%',  top: '72%',  dx:  '30px', dy: '-80px', delay: '0.4s',  dur: '4s'   },
  { left: '60%',  top: '15%',  dx: '-20px', dy:  '70px', delay: '0.8s',  dur: '3.5s' },
  { left: '78%',  top: '60%',  dx:  '50px', dy: '-50px', delay: '0.2s',  dur: '4.5s' },
  { left: '44%',  top: '85%',  dx: '-60px', dy: '-30px', delay: '1s',    dur: '3.8s' },
  { left: '90%',  top: '30%',  dx: '-30px', dy:  '60px', delay: '0.6s',  dur: '4.2s' },
  { left: '5%',   top: '50%',  dx:  '70px', dy: '-40px', delay: '1.2s',  dur: '3s'   },
  { left: '55%',  top: '45%',  dx:  '40px', dy:  '50px', delay: '0.3s',  dur: '5s'   },
]

export default function CTA() {
  const sectionRef  = useRef<HTMLElement>(null)
  const orbRef      = useRef<HTMLDivElement>(null)
  const glowRef     = useRef<HTMLDivElement>(null)
  const accentRefs  = useRef<(HTMLDivElement | null)[]>([])
  const mouse       = useRef({ x: 0, y: 0 })
  const smoothMouse = useRef({ x: 0, y: 0 })
  const rafId       = useRef<number>(0)
  const isInSection = useRef(false)
  const accentDepths = [0.04, 0.03, 0.05]

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    mouse.current = {
      x: ((e.clientX - rect.left) / rect.width  - 0.5) * 2,
      y: ((e.clientY - rect.top)  / rect.height - 0.5) * 2,
    }
    if (glowRef.current) {
      glowRef.current.style.left = `${e.clientX - rect.left}px`
      glowRef.current.style.top  = `${e.clientY - rect.top}px`
    }
  }, [])

  const handleMouseEnter = useCallback(() => {
    isInSection.current = true
    if (glowRef.current) gsap.to(glowRef.current, { opacity: 1, duration: 0.4, ease: 'power2.out' })
  }, [])

  const handleMouseLeave = useCallback(() => {
    isInSection.current = false
    if (orbRef.current) gsap.to(orbRef.current, { x: 0, y: 0, duration: 1, ease: 'power3.out', overwrite: 'auto' })
    accentRefs.current.forEach(el => {
      if (el) gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' })
    })
    if (glowRef.current) gsap.to(glowRef.current, { opacity: 0, duration: 0.4, ease: 'power2.out' })
    mouse.current = { x: 0, y: 0 }
  }, [])

  const animate = useCallback(() => {
    smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * 0.08
    smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * 0.08
    const sx = smoothMouse.current.x
    const sy = smoothMouse.current.y
    if (isInSection.current) {
      if (orbRef.current) gsap.set(orbRef.current, { x: sx * 50, y: sy * 35 })
      accentRefs.current.forEach((el, i) => {
        if (!el) return
        const depth = accentDepths[i] || 0.03
        const dir = i % 2 === 0 ? 1 : -1
        gsap.set(el, {
          x: sx * depth * 150 * dir,
          y: sy * depth * 100,
          rotation: parseFloat(el.dataset.baseRotate || '0') + sx * 4 * dir,
        })
      })
    }
    rafId.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Letter-by-letter heading reveal (from skill pattern)
      gsap.fromTo('.cta-word',
        { y: '110%', opacity: 0 },
        {
          y: '0%', opacity: 1,
          stagger: 0.06, duration: 0.8, ease: 'cubic-bezier(.23,1,.32,1)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      )

      gsap.fromTo('.cta-sub, .cta-buttons',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      )

      // Animated gradient orb
      if (orbRef.current) {
        gsap.to(orbRef.current, {
          scale: 1.15, duration: 6, yoyo: true, repeat: -1, ease: 'sine.inOut',
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

  return (
    <section ref={sectionRef} className="relative py-16 lg:py-32 section-padding overflow-hidden" id="contact">
      {/* Cursor glow */}
      <div
        ref={glowRef}
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none opacity-0 -translate-x-1/2 -translate-y-1/2"
        style={{
          background: 'radial-gradient(circle, rgba(0,229,255,0.08) 0%, rgba(123,97,255,0.04) 40%, transparent 70%)',
          willChange: 'left, top, opacity',
        }}
      />

      {/* Background mesh */}
      <div className="absolute inset-0 grid-dot-bg" />

      {/* Pulsing orb */}
      <div
        ref={orbRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20 blur-[160px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #00E5FF 0%, #7B61FF 40%, transparent 70%)',
          willChange: 'transform',
        }}
      />

      {/* Floating geometric accents */}
      <div ref={el => { accentRefs.current[0] = el }} data-base-rotate="45" className="absolute top-20 left-[10%] w-16 h-16 border border-cw-accent/10 rotate-45 animate-float-slow" style={{ willChange: 'transform' }} />
      <div ref={el => { accentRefs.current[1] = el }} data-base-rotate="12" className="absolute bottom-20 right-[15%] w-12 h-12 border border-cw-accent-2/10 rotate-12 animate-float-med" style={{ willChange: 'transform', animationDelay: '1.5s' }} />
      <div ref={el => { accentRefs.current[2] = el }} data-base-rotate="-12" className="absolute top-1/3 right-[8%] w-8 h-8 border border-cw-accent-3/10 -rotate-12 animate-float-slow" style={{ willChange: 'transform', animationDelay: '3s' }} />

      {/* Drifting particles */}
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-cw-accent/30 pointer-events-none"
          style={{
            left: p.left,
            top: p.top,
            '--dx': p.dx,
            '--dy': p.dy,
            animation: `particle-drift ${p.dur} ease-out ${p.delay} infinite`,
          } as React.CSSProperties}
        />
      ))}

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Word-by-word heading reveal */}
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
          {HEADING.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
              <span className="cta-word inline-block" style={{ transform: 'translateY(110%)' }}>
                {word}
              </span>
            </span>
          ))}
        </h2>

        <p className="cta-sub text-lg text-cw-muted max-w-xl mx-auto mb-10">
          Tell us about your business. We'll design the system around it.
        </p>

        <div className="cta-buttons flex flex-wrap justify-center gap-4">
          <Button href="#contact">Start a Project</Button>
          <Button variant="outline" href="#contact">Schedule a Discovery Call</Button>
        </div>
      </div>
    </section>
  )
}
