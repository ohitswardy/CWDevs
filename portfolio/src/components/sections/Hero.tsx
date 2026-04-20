import { useEffect, useRef, useCallback } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import Button from '../ui/Button'
import { Star } from 'lucide-react'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const tiltRef = useRef<HTMLDivElement>(null)
  const orbRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const smoothMouse = useRef({ x: 0, y: 0 })
  const rafId = useRef<number>(0)
  const isInSection = useRef(false)

  // Parallax depth multipliers per card (deeper = more movement)
  const cardDepths = [0.03, 0.05, 0.02, 0.04, 0.035]

  const floatingCardsData = [
    { label: 'POS System', x: '10%', y: '15%', rotate: -6, delay: 0 },
    { label: 'ERP Module', x: '55%', y: '5%', rotate: 4, delay: 0.2 },
    { label: 'Marketing Site', x: '20%', y: '60%', rotate: -3, delay: 0.4 },
    { label: 'Booking Platform', x: '60%', y: '50%', rotate: 8, delay: 0.6 },
    { label: 'HR Automation', x: '40%', y: '30%', rotate: -2, delay: 0.3 },
  ]

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    // Normalized -1 to 1 from center of section
    mouse.current = {
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    }
    // Update glow position instantly (raw pixel coords relative to section)
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
    // Reset card mouse-driven x + rotation (y is managed by ScrollTrigger)
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.float-card')
      cards.forEach((card, i) => {
        const baseRotation = floatingCardsData[i]?.rotate || 0
        gsap.to(card, { x: 0, rotation: baseRotation, duration: 0.8, ease: 'elastic.out(1, 0.5)', overwrite: 'auto' })
      })
    }
    // Reset orb mouse offset (pulse animation continues via scale)
    if (orbRef.current) {
      gsap.to(orbRef.current, { x: 0, y: 0, duration: 1, ease: 'power3.out', overwrite: 'auto' })
    }
    // Reset container tilt
    if (tiltRef.current) {
      gsap.to(tiltRef.current, { rotateX: 0, rotateY: 0, duration: 0.8, ease: 'power3.out' })
    }
    // Hide glow
    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity: 0, duration: 0.4, ease: 'power2.out' })
    }
    // Reset SVG line opacities
    if (svgRef.current) {
      const lines = svgRef.current.querySelectorAll('line')
      lines.forEach((line) => {
        gsap.to(line, { attr: { opacity: 0.3 }, strokeWidth: 0.5, duration: 0.6 })
      })
    }
    mouse.current = { x: 0, y: 0 }
  }, [])

  // Smooth animation loop — runs every frame
  const animate = useCallback(() => {
    // Lerp for smoothness
    smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * 0.08
    smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * 0.08

    const sx = smoothMouse.current.x
    const sy = smoothMouse.current.y

    if (isInSection.current) {
      // Parallax floating cards — only x + rotation (y is driven by ScrollTrigger)
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll<HTMLElement>('.float-card')
        cards.forEach((card, i) => {
          const depth = cardDepths[i] || 0.03
          const moveX = sx * depth * 120
          const baseRotation = parseFloat(card.dataset.rotate || '0')
          gsap.set(card, { x: moveX, rotation: baseRotation + sx * 2 })
        })
      }

      // 3D tilt on tilt wrapper (separate from cards' scroll parallax)
      if (tiltRef.current) {
        gsap.set(tiltRef.current, { rotateY: sx * 5, rotateX: -sy * 3 })
      }

      // Orb follows cursor — x/y only (scale is driven by pulse tween)
      if (orbRef.current) {
        gsap.set(orbRef.current, { x: sx * 40, y: sy * 30 })
      }

      // SVG lines: shift endpoints slightly and pulse opacity based on cursor proximity
      if (svgRef.current) {
        const lines = svgRef.current.querySelectorAll('line')
        lines.forEach((line, i) => {
          const shift = (i % 2 === 0 ? 1 : -1) * sx * 8
          const shiftY = sy * 5
          line.setAttribute('x1', String(parseFloat(line.dataset.ox1 || '0') + shift))
          line.setAttribute('y1', String(parseFloat(line.dataset.oy1 || '0') + shiftY))
          line.setAttribute('x2', String(parseFloat(line.dataset.ox2 || '0') - shift * 0.5))
          line.setAttribute('y2', String(parseFloat(line.dataset.oy2 || '0') - shiftY * 0.5))
          // Pulse opacity based on proximity to center
          const proximity = 1 - Math.sqrt(sx * sx + sy * sy) * 0.5
          line.setAttribute('opacity', String(0.15 + proximity * 0.4))
          line.setAttribute('stroke-width', String(0.5 + proximity * 0.8))
        })
      }
    }

    rafId.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Animate heading words
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll('.word')
        gsap.fromTo(words,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.8, ease: 'power3.out', delay: 0.3 }
        )
      }

      // Animate subtext and buttons
      gsap.fromTo('.hero-fade',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'power3.out', delay: 0.8 }
      )

      // Float cards scroll parallax (additive with mouse parallax)
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.float-card')
        cards.forEach((card, i) => {
          gsap.to(card, {
            y: -30 * (i + 1),
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
            },
          })
        })
      }

      // Orb pulse
      if (orbRef.current) {
        gsap.to(orbRef.current, {
          scale: 1.1,
          duration: 4,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
        })
      }

      // Staggered card entrance with scale
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.float-card')
        gsap.fromTo(cards,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, stagger: 0.12, duration: 0.6, ease: 'back.out(1.7)', delay: 1.2 }
        )
      }
    }, sectionRef)

    // Store original SVG line positions for cursor offset calculations
    if (svgRef.current) {
      const lines = svgRef.current.querySelectorAll('line')
      lines.forEach((line) => {
        line.dataset.ox1 = line.getAttribute('x1') || '0'
        line.dataset.oy1 = line.getAttribute('y1') || '0'
        line.dataset.ox2 = line.getAttribute('x2') || '0'
        line.dataset.oy2 = line.getAttribute('y2') || '0'
      })
    }

    // Mouse event listeners
    section.addEventListener('mousemove', handleMouseMove)
    section.addEventListener('mouseenter', handleMouseEnter)
    section.addEventListener('mouseleave', handleMouseLeave)

    // Start animation loop
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
    <section ref={sectionRef} className="relative min-h-dvh flex items-center overflow-hidden grid-dot-bg" id="hero">
      {/* Cursor glow spotlight */}
      <div
        ref={glowRef}
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none opacity-0 -translate-x-1/2 -translate-y-1/2"
        style={{
          background: 'radial-gradient(circle, rgba(0, 229, 255, 0.08) 0%, rgba(123, 97, 255, 0.04) 40%, transparent 70%)',
          willChange: 'left, top, opacity',
        }}
      />

      {/* Background gradient orb */}
      <div
        ref={orbRef}
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-30 blur-[120px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #00E5FF 0%, #7B61FF 50%, transparent 80%)',
          willChange: 'transform',
          transition: 'transform 0.1s linear',
        }}
      />

      <div className="relative z-10 max-w-site mx-auto w-full section-padding py-32 lg:py-0">
        <div className="grid lg:grid-cols-5 gap-12 items-center min-h-dvh py-24">
          {/* Left — Text */}
          <div className="lg:col-span-3">
            <span className="hero-fade inline-flex items-center gap-2 px-4 py-1.5 border border-cw-border rounded-full font-mono text-xs tracking-widest uppercase text-cw-accent mb-8">
              IT Systems That Scale
            </span>

            <h1 ref={headingRef} className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tight text-white mb-8">
              <span className="block overflow-hidden"><span className="word inline-block">We</span>{' '}<span className="word inline-block">Build</span>{' '}<span className="word inline-block">the</span>{' '}<span className="word inline-block">Systems</span></span>
              <span className="block overflow-hidden mt-2"><span className="word inline-block">That</span>{' '}<span className="word inline-block">Build</span>{' '}<span className="word inline-block">Your</span>{' '}<span className="word inline-block text-cw-accent">Business.</span></span>
            </h1>

            <p className="hero-fade text-lg sm:text-xl text-cw-muted max-w-xl leading-relaxed mb-10">
              From marketing pages to enterprise-grade platforms — CW Devs engineers end-to-end digital systems tailored for SMEs ready to grow without limits.
            </p>

            <div className="hero-fade flex flex-wrap gap-4 mb-12">
              <Button href="#services">Explore Our Services</Button>
              <Button variant="outline" href="#work">
                See Our Work <span className="ml-1">→</span>
              </Button>
            </div>

            <div className="hero-fade flex items-center gap-4">
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-cw-black bg-cw-surface flex items-center justify-center text-xs font-mono text-cw-muted"
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-cw-muted ml-1">4.9/5</span>
                </div>
                <p className="text-xs text-cw-muted">Trusted by 50+ growing SMEs across industries</p>
              </div>
            </div>
          </div>

          {/* Right — Visual */}
          <div className="lg:col-span-2 relative hidden lg:block h-[500px]">
            {/* Tilt wrapper — cursor-driven 3D tilt (separate from scroll parallax) */}
            <div ref={tiltRef} className="absolute inset-0" style={{ perspective: '1000px', transformStyle: 'preserve-3d', willChange: 'transform' }}>
              {/* Scroll parallax container */}
              <div ref={cardsRef} className="absolute inset-0">
            {/* Connection lines SVG */}
            <svg ref={svgRef} className="absolute inset-0 w-full h-full" viewBox="0 0 400 500" fill="none">
              <line x1="100" y1="100" x2="250" y2="60" stroke="#00E5FF" strokeWidth="0.5" opacity="0.3" />
              <line x1="100" y1="100" x2="120" y2="320" stroke="#00E5FF" strokeWidth="0.5" opacity="0.3" />
              <line x1="250" y1="60" x2="280" y2="280" stroke="#7B61FF" strokeWidth="0.5" opacity="0.3" />
              <line x1="120" y1="320" x2="280" y2="280" stroke="#7B61FF" strokeWidth="0.5" opacity="0.3" />
              <line x1="200" y1="180" x2="250" y2="60" stroke="#00E5FF" strokeWidth="0.5" opacity="0.2" />
              <line x1="200" y1="180" x2="120" y2="320" stroke="#00E5FF" strokeWidth="0.5" opacity="0.2" />
            </svg>

            {floatingCardsData.map((card, i) => (
              <div
                key={card.label}
                className="float-card absolute px-5 py-3 bg-cw-surface/80 border border-cw-border rounded-lg backdrop-blur-sm cursor-none transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(0,229,255,0.15)] hover:border-cw-accent/40"
                data-rotate={card.rotate}
                style={{
                  left: card.x,
                  top: card.y,
                  transform: `rotate(${card.rotate}deg) translateZ(${20 * (i + 1)}px)`,
                  animationDelay: `${card.delay}s`,
                  willChange: 'transform',
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cw-accent" />
                  <span className="font-mono text-xs text-cw-text whitespace-nowrap">{card.label}</span>
                </div>
              </div>
            ))}

            {/* CSS perspective floating shapes */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48" style={{ perspective: '600px' }}>
              <div className="absolute inset-0 border border-cw-accent/20 rounded-lg animate-spin" style={{ animationDuration: '20s', transform: 'rotateX(60deg) rotateZ(45deg)' }} />
              <div className="absolute inset-4 border border-cw-accent-2/20 rounded-lg animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse', transform: 'rotateX(60deg) rotateZ(-45deg)' }} />
            </div>
              </div>{/* end cardsRef */}
            </div>{/* end tiltRef */}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-cw-black to-transparent" />
    </section>
  )
}
