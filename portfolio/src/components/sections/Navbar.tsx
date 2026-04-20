import { useEffect, useRef, useState } from 'react'
import { gsap } from '../../lib/gsap'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.fromTo(navRef.current, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' })

    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen && mobileMenuRef.current) {
      gsap.fromTo(mobileMenuRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
      gsap.fromTo(
        mobileMenuRef.current.querySelectorAll('a'),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: 'power3.out', delay: 0.1 }
      )
    }
  }, [mobileOpen])

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
          scrolled ? 'bg-cw-black/80 backdrop-blur-xl border-b border-cw-border/50' : 'bg-transparent'
        }`}
      >
        <div className="max-w-site mx-auto flex items-center justify-between px-6 md:px-12 lg:px-20 h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-0.5" data-cursor-hover>
            <span className="font-mono text-2xl font-bold text-cw-accent">CW</span>
            <span className="font-display text-2xl font-bold text-white">Devs</span>
          </a>

          {/* Desktop CTA */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center px-6 py-2.5 border border-cw-accent text-cw-accent text-xs font-display font-semibold tracking-widest uppercase rounded-sm hover:bg-cw-accent hover:text-cw-black transition-all duration-300"
            data-cursor-hover
          >
            Start a Project
          </a>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-cw-text"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-[99] bg-cw-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
        >
          <a
            href="#contact"
            className="mt-4 px-8 py-3 border border-cw-accent text-cw-accent font-display font-semibold tracking-widest uppercase text-sm rounded-sm"
            onClick={() => setMobileOpen(false)}
          >
            Start a Project
          </a>
        </div>
      )}
    </>
  )
}
