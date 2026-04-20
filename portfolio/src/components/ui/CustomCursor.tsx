import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const mouse = useRef({ x: 0, y: 0 })
  const isHovering = useRef(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 2}px, ${e.clientY - 2}px)`
      }
    }

    const handleMouseEnter = () => {
      isHovering.current = true
      if (circleRef.current) {
        gsap.to(circleRef.current, { scale: 2, borderColor: '#00E5FF', duration: 0.3 })
      }
    }

    const handleMouseLeave = () => {
      isHovering.current = false
      if (circleRef.current) {
        gsap.to(circleRef.current, { scale: 1, borderColor: '#6B7A99', duration: 0.3 })
      }
    }

    const tick = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15
      if (circleRef.current) {
        circleRef.current.style.transform = `translate(${pos.current.x - 16}px, ${pos.current.y - 16}px)`
      }
      requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', handleMouseMove)
    const interactives = document.querySelectorAll('a, button, [data-cursor-hover]')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    const rafId = requestAnimationFrame(tick)

    // Re-observe for dynamically added elements
    const observer = new MutationObserver(() => {
      const newInteractives = document.querySelectorAll('a, button, [data-cursor-hover]')
      newInteractives.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter)
        el.addEventListener('mouseleave', handleMouseLeave)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafId)
      observer.disconnect()
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1 h-1 bg-cw-accent rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={circleRef}
        className="fixed top-0 left-0 w-8 h-8 border border-cw-muted rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ willChange: 'transform' }}
      />
    </>
  )
}
