import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? scrollTop / docHeight : 0
      if (barRef.current) {
        gsap.set(barRef.current, { scaleX: progress })
      }
    }

    window.addEventListener('scroll', updateProgress, { passive: true })
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[9998] bg-cw-dark/50">
      <div
        ref={barRef}
        className="h-full bg-cw-accent origin-left"
        style={{ transform: 'scaleX(0)', willChange: 'transform' }}
      />
    </div>
  )
}
