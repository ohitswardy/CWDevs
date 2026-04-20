import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import SectionLabel from '../ui/SectionLabel'
import { Star } from 'lucide-react'

const testimonials = [
  {
    quote: "CW Devs didn't just build us a website — they built us a system that replaced four separate tools we were paying for. Our scheduling conflicts dropped to near zero, and our staff actually enjoys using it.",
    name: 'Dr. Angela Reyes',
    company: 'Metro Surgical Center',
    role: 'Department Head, Anesthesiology',
  },
  {
    quote: "We went from tracking inventory on spreadsheets to a fully integrated POS and accounting system in 6 weeks. They understood our construction business better than vendors who'd been in the space for years.",
    name: 'Marco Torres',
    company: 'BuildRight Materials',
    role: 'Operations Manager',
  },
  {
    quote: "The automation suite they built for our HR processes saved us 20+ hours per week. Leave approvals, payroll calculations, attendance tracking — it all just works now. Best investment we've made.",
    name: 'Sarah Lim',
    company: 'PrimeForce Staffing',
    role: 'CEO',
  },
]

function TestimonialCard({ t, index }: { t: typeof testimonials[0]; index: number }) {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const springCfg = { stiffness: 280, damping: 28 }
  const rotateX = useTransform(useSpring(my, springCfg), [-0.5, 0.5], [7, -7])
  const rotateY = useTransform(useSpring(mx, springCfg), [-0.5, 0.5], [-7, 7])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <motion.div
      className="testimonial-card group relative p-8 rounded-xl bg-cw-surface border border-cw-border border-l-2 border-l-cw-accent overflow-hidden cursor-none"
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      whileHover={{ scale: 1.025, borderColor: 'rgba(0,229,255,0.4)' }}
      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mx.set(0); my.set(0) }}
    >
      {/* Shimmer */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 animate-shimmer" />
      </div>

      {/* Large decorative quote mark */}
      <div
        className="absolute -top-2 -left-1 font-display text-8xl font-extrabold text-cw-accent/6 leading-none pointer-events-none select-none"
        style={{ transform: 'translateZ(0)' }}
      >
        "
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-5 relative z-10">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12 + i * 0.06, type: 'spring', stiffness: 500, damping: 20 }}
          >
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
          </motion.div>
        ))}
      </div>

      <blockquote className="text-cw-text leading-relaxed mb-6 italic relative z-10" style={{ transform: 'translateZ(10px)' }}>
        "{t.quote}"
      </blockquote>

      <div className="relative z-10" style={{ transform: 'translateZ(8px)' }}>
        <p className="font-display font-bold text-white">{t.name}</p>
        <p className="text-sm text-cw-muted">{t.role}</p>
        <p className="text-sm text-cw-accent">{t.company}</p>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.testimonial-card',
        { y: 80, opacity: 0, rotationY: -12, scale: 0.9 },
        {
          y: 0, opacity: 1, rotationY: 0, scale: 1,
          stagger: 0.18, duration: 0.95, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      )
    }, sectionRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 section-padding bg-cw-dark overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 grid-dot-bg opacity-30 pointer-events-none" />

      <div className="max-w-site mx-auto relative z-10">
        <div className="text-center mb-16">
          <SectionLabel>Testimonials</SectionLabel>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white mt-6">
            What Our Clients Say.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6" style={{ perspective: '1400px' }}>
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
