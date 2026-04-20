import { useRef, MouseEvent } from 'react'
import { gsap } from '../../lib/gsap'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'outline'
  className?: string
  onClick?: () => void
  href?: string
}

export default function Button({ children, variant = 'primary', className = '', onClick, href }: ButtonProps) {
  const btnRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null)

  const handleMouseMove = (e: MouseEvent) => {
    if (!btnRef.current) return
    const rect = btnRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(btnRef.current, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    if (!btnRef.current) return
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    })
  }

  const base = 'relative inline-flex items-center gap-2 px-8 py-4 font-display font-semibold text-sm tracking-wider uppercase rounded-sm transition-colors duration-300'
  const variants = {
    primary: 'bg-cw-accent text-cw-black hover:bg-cw-accent/90',
    outline: 'border border-cw-accent text-cw-accent hover:bg-cw-accent/10',
  }

  const props = {
    ref: btnRef as React.Ref<HTMLButtonElement & HTMLAnchorElement>,
    className: `${base} ${variants[variant]} ${className}`,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    'data-cursor-hover': true,
  }

  if (href) {
    return <a {...props} href={href}>{children}</a>
  }
  return <button {...props} onClick={onClick}>{children}</button>
}
