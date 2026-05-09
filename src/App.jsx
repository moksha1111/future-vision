import { useCallback, useEffect, useRef, useState } from 'react'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Vision from './components/Vision'
import Capabilities from './components/Capabilities'
import Metrics from './components/Metrics'
import Initiatives from './components/Initiatives'
import Principles from './components/Principles'
import Marquee from './components/Marquee'
import CTA from './components/CTA'
import Footer from './components/Footer'

const NAV_FADE_START = 0.82
const NAV_FADE_END = 0.9
const REAPPEAR_DELAY_MS = 2500

export default function App() {
  const [navOpacity, setNavOpacity] = useState(1)
  const [revealed, setRevealed] = useState(false)

  const revealedRef = useRef(false)
  const reappearTimerRef = useRef(null)

  // Toggle native vertical scrolling on the document once the post-zoom
  // reveal has fired. Before then, the page is fully locked.
  useEffect(() => {
    document.documentElement.classList.toggle('scrollable', revealed)
    return () => document.documentElement.classList.remove('scrollable')
  }, [revealed])

  // Cleanup any pending timer on unmount.
  useEffect(() => {
    return () => {
      if (reappearTimerRef.current) clearTimeout(reappearTimerRef.current)
    }
  }, [])

  const onProgress = useCallback((p) => {
    if (revealedRef.current) return

    let next
    if (p <= NAV_FADE_START) next = 1
    else if (p >= NAV_FADE_END) next = 0
    else next = 1 - (p - NAV_FADE_START) / (NAV_FADE_END - NAV_FADE_START)
    next = Math.round(next * 100) / 100

    setNavOpacity((prev) => (prev === next ? prev : next))

    if (next === 0 && !reappearTimerRef.current) {
      reappearTimerRef.current = setTimeout(() => {
        revealedRef.current = true
        setNavOpacity(1)
        setRevealed(true)
        reappearTimerRef.current = null
      }, REAPPEAR_DELAY_MS)
    }
    if (next > 0 && reappearTimerRef.current) {
      clearTimeout(reappearTimerRef.current)
      reappearTimerRef.current = null
    }
  }, [])

  return (
    <main className="app">
      <Navbar opacity={navOpacity} />
      <Hero onProgress={onProgress} disabled={revealed} />
      <Vision />
      <Capabilities />
      <Metrics />
      <Marquee />
      <Initiatives />
      <Principles />
      <CTA />
      <Footer />
    </main>
  )
}
