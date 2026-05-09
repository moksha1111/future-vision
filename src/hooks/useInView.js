import { useEffect, useRef, useState } from 'react'

// Lightweight IntersectionObserver hook. Fires once by default, so the
// reveal animation doesn't replay every time the section re-enters.
export function useInView({ threshold = 0.18, once = true } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
            if (once) obs.unobserve(entry.target)
          } else if (!once) {
            setInView(false)
          }
        })
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold, once])

  return [ref, inView]
}
