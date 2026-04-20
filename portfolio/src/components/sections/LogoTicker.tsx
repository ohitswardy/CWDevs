import { useRef, useEffect } from 'react'
import { gsap } from '../../lib/gsap'

const clientsRow1 = [
  'HealthCare Co', 'BuildMart', 'LegalEdge', 'FreshBites',
  'AutoFix Pro', 'EduTrack', 'GreenScape', 'PayFlow',
  'LogiHaul', 'DataVault',
]

const clientsRow2 = [
  'RetailPulse', 'CloudNine', 'WorkForce+', 'MediaBlitz',
  'SafeGuard', 'NexGen Labs', 'PrimeCare', 'TradeSmart',
  'SkillBridge', 'OptiRoute',
]

function TickerRow({ items, direction }: { items: string[]; direction: 'left' | 'right' }) {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!trackRef.current) return
    const track = trackRef.current
    const totalWidth = track.scrollWidth / 2

    gsap.to(track, {
      x: direction === 'left' ? -totalWidth : totalWidth,
      duration: 40,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => {
          const val = parseFloat(x)
          return direction === 'left'
            ? val % totalWidth
            : -(Math.abs(val) % totalWidth)
        }),
      },
    })
  }, [direction])

  const duplicated = [...items, ...items]

  return (
    <div className="overflow-hidden">
      <div
        ref={trackRef}
        className="flex gap-6 whitespace-nowrap"
        style={{ transform: direction === 'right' ? `translateX(-${50}%)` : undefined }}
      >
        {duplicated.map((item, i) => (
          <div
            key={`${item}-${i}`}
            className="flex-shrink-0 px-6 py-2.5 border border-cw-border rounded-full bg-cw-surface/50 font-mono text-sm text-cw-muted hover:text-cw-accent hover:border-cw-accent/30 transition-colors"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function LogoTicker() {
  return (
    <section className="relative py-16 border-y border-cw-border/50 overflow-hidden">
      <div className="max-w-site mx-auto section-padding mb-8">
        <p className="text-center text-sm font-mono tracking-widest uppercase text-cw-muted">
          Trusted by growing businesses
        </p>
      </div>
      <div className="space-y-4">
        <TickerRow items={clientsRow1} direction="left" />
        <TickerRow items={clientsRow2} direction="right" />
      </div>
    </section>
  )
}
