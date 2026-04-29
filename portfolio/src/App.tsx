import { useState, useEffect, useCallback, useRef } from 'react'
import { ScrollTrigger } from './lib/gsap'
import CustomCursor from './components/ui/CustomCursor'
import ScrollProgress from './components/ui/ScrollProgress'
import Navbar from './components/sections/Navbar'
import Hero from './components/sections/Hero'
import LogoTicker from './components/sections/LogoTicker'
import WhatWeBuild from './components/sections/WhatWeBuild'
import Services from './components/sections/Services'
import HowWeWork from './components/sections/HowWeWork'
import CaseStudies from './components/sections/CaseStudies'
import Stats from './components/sections/Stats'
import WhyCWDevs from './components/sections/WhyCWDevs'
import CTA from './components/sections/CTA'
import Footer from './components/sections/Footer'

export default function App() {
  const [resetKey, setResetKey] = useState(0)
  const hasScrolledAway = useRef(false)

  const resetAnimations = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    hasScrolledAway.current = false
    setResetKey(k => k + 1)
  }, [])

  useEffect(() => {
    let st: ReturnType<typeof ScrollTrigger.create> | null = null
    // Delay to ensure remounted DOM is ready before creating the trigger
    const timer = setTimeout(() => {
      st = ScrollTrigger.create({
        trigger: '#hero',
        start: 'top top',
        onLeave: () => { hasScrolledAway.current = true },
        onEnterBack: () => {
          if (hasScrolledAway.current) {
            resetAnimations()
          }
        },
      })
    }, 200)
    return () => {
      clearTimeout(timer)
      st?.kill()
    }
  }, [resetKey, resetAnimations])

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Navbar onHomeClick={resetAnimations} />
      <main key={resetKey}>
        <Hero />
        <WhatWeBuild />
        <Services />
        <HowWeWork />
        <CaseStudies />
        <Stats />
        <WhyCWDevs />
        <CTA />
        <LogoTicker />
      </main>
      <Footer />
    </>
  )
}
