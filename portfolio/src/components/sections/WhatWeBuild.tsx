import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import SectionLabel from '../ui/SectionLabel'
import { Globe, ShoppingCart, Building2, HeartPulse, CalendarClock, Cloud } from 'lucide-react'

const systems = [
  {
    icon: Globe,
    title: 'Marketing Sites',
    description: 'High-converting landing pages and brand sites that generate leads 24/7.',
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce Platforms',
    description: 'Full-featured online stores with payment, inventory, and order management.',
  },
  {
    icon: Building2,
    title: 'Business ERP',
    description: 'Unified systems for accounting, procurement, HR, and operations management.',
  },
  {
    icon: HeartPulse,
    title: 'Healthcare Systems',
    description: 'HIPAA-aware platforms for scheduling, records, and departmental workflows.',
  },
  {
    icon: CalendarClock,
    title: 'Booking & Scheduling',
    description: 'Multi-tenant reservation systems for clinics, salons, and service businesses.',
  },
  {
    icon: Cloud,
    title: 'Custom SaaS',
    description: 'Multi-user cloud apps built from scratch to solve your specific business problem.',
  },
]

function TiltCard({ system }: { system: typeof systems[0] }) {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useTransform(useSpring(my, { stiffness: 300, damping: 25 }), [-0.5, 0.5], [10, -10])
  const rotateY = useTransform(useSpring(mx, { stiffness: 300, damping: 25 }), [-0.5, 0.5], [-10, 10])
  const glowX = useTransform(mx, [-0.5, 0.5], ['0%', '100%'])
  const glowY = useTransform(my, [-0.5, 0.5], ['0%', '100%'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const Icon = system.icon
  return (
    <motion.div
      className="build-card group relative p-8 rounded-xl border border-cw-border bg-cw-dark overflow-hidden cursor-none"
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      whileHover={{ scale: 1.03, borderColor: 'rgba(0,229,255,0.35)' }}
      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mx.set(0); my.set(0) }}
    >
      {/* Dynamic spotlight follow */}
      <motion.div
        className="absolute w-40 h-40 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          left: glowX,
          top: glowY,
          background: 'radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Shimmer sweep */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 animate-shimmer" />
      </div>

      {/* Bottom accent bar */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-cw-accent to-cw-accent-2 group-hover:w-full transition-all duration-500 ease-[cubic-bezier(.33,1,.68,1)]" />

      <div
        className="w-12 h-12 rounded-lg bg-cw-surface flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-cw-accent/10 group-hover:shadow-[0_0_24px_rgba(0,229,255,0.25)]"
        style={{ transformStyle: 'preserve-3d', transform: 'translateZ(20px)' }}
      >
        <Icon size={24} className="text-cw-accent transition-transform duration-300 group-hover:scale-110" />
      </div>

      <h3
        className="font-display font-bold text-xl text-white mb-3"
        style={{ transformStyle: 'preserve-3d', transform: 'translateZ(10px)' }}
      >
        {system.title}
      </h3>
      <p className="text-cw-muted text-sm leading-relaxed">{system.description}</p>
    </motion.div>
  )
}

export default function WhatWeBuild() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading words stagger in
      gsap.fromTo('.build-heading-word',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.08, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      )

      // Cards: dramatic 3D entrance
      gsap.fromTo('.build-card',
        { y: 100, opacity: 0, scale: 0.82, rotationX: -18 },
        {
          y: 0, opacity: 1, scale: 1, rotationX: 0,
          stagger: { amount: 0.55, from: 'start' },
          duration: 0.9, ease: 'back.out(1.6)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      )

      // Ambient floating accent shapes
      gsap.to('.build-accent', {
        y: -20, duration: 5, yoyo: true, repeat: -1, ease: 'sine.inOut',
        stagger: { each: 0.8, from: 'random' },
      })
    }, sectionRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 section-padding overflow-hidden" id="about">
      {/* Ambient floating shapes */}
      <div className="build-accent absolute top-20 right-[5%] w-32 h-32 rounded-full border border-cw-accent/5 pointer-events-none" />
      <div className="build-accent absolute bottom-32 left-[3%] w-20 h-20 rounded-full border border-cw-accent-2/8 pointer-events-none" style={{ animationDelay: '1.2s' }} />
      <div className="build-accent absolute top-1/2 right-[12%] w-10 h-10 rotate-45 border border-cw-accent-3/10 pointer-events-none" style={{ animationDelay: '2.4s' }} />

      <div className="max-w-site mx-auto">
        <div className="text-center mb-16">
          <SectionLabel>What We Build</SectionLabel>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white mt-6 mb-6 overflow-hidden">
            <span className="build-heading-word inline-block">One</span>{' '}
            <span className="build-heading-word inline-block">Partner.</span>{' '}
            <span className="build-heading-word inline-block">Every</span>{' '}
            <span className="build-heading-word inline-block">System</span>
            <br className="hidden sm:block" />
            <span className="build-heading-word inline-block">You'll</span>{' '}
            <span className="build-heading-word inline-block">Ever</span>{' '}
            <span className="build-heading-word inline-block text-cw-accent">Need.</span>
          </h2>
          <p className="text-lg text-cw-muted max-w-2xl mx-auto">
            Whether you're launching your first product or scaling your 10th system, CW Devs architects digital solutions that grow with you.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: '1200px' }}>
          {systems.map((system) => (
            <TiltCard key={system.title} system={system} />
          ))}
        </div>
      </div>
    </section>
  )
}
