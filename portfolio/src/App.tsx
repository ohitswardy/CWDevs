import CustomCursor from './components/ui/CustomCursor'
import ScrollProgress from './components/ui/ScrollProgress'
import Navbar from './components/sections/Navbar'
import Hero from './components/sections/Hero'
import LogoTicker from './components/sections/LogoTicker'
import WhatWeBuild from './components/sections/WhatWeBuild'
import Services from './components/sections/Services'
import HowWeWork from './components/sections/HowWeWork'
import CaseStudies from './components/sections/CaseStudies'
import TechStack from './components/sections/TechStack'
import Stats from './components/sections/Stats'
import Testimonials from './components/sections/Testimonials'
import WhyCWDevs from './components/sections/WhyCWDevs'
import CTA from './components/sections/CTA'
import Footer from './components/sections/Footer'

export default function App() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <LogoTicker />
        <WhatWeBuild />
        <Services />
        <HowWeWork />
        <CaseStudies />
        <TechStack />
        <Stats />
        <Testimonials />
        <WhyCWDevs />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
