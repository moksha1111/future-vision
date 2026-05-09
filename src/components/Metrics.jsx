import { useEffect, useState } from 'react'
import { useInView } from '../hooks/useInView'

const METRICS = [
  { n: 240, suffix: 'M+', label: 'Lives improved through deployed systems' },
  { n: 47, suffix: '', label: 'Countries running our infrastructure' },
  { n: 15, suffix: ' yrs', label: 'Building the long road quietly' },
  { n: 2.1, prefix: '$', suffix: 'B', label: 'Invested in foundational research' },
]

// Ease-out cubic counter that runs once on first reveal.
function Counter({ active, n, prefix = '', suffix = '' }) {
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!active) return
    const start = performance.now()
    const dur = 1700
    let raf = 0
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur)
      const eased = 1 - Math.pow(1 - t, 3)
      setVal(n * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, n])

  const display = n < 10 ? val.toFixed(1) : Math.round(val).toString()
  return (
    <>
      {prefix}
      {display}
      {suffix}
    </>
  )
}

function Metric({ data, delay }) {
  const [ref, inView] = useInView({ threshold: 0.3 })
  return (
    <div
      ref={ref}
      className={`metric ${inView ? 'is-in' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="metric__value">
        <Counter active={inView} {...data} />
      </div>
      <div className="metric__label">{data.label}</div>
    </div>
  )
}

export default function Metrics() {
  const [headRef, headIn] = useInView({ threshold: 0.2 })
  return (
    <section className="metrics" id="metrics">
      <div className="container">
        <div ref={headRef} className={`section-head ${headIn ? 'is-in' : ''}`}>
          <p className="eyebrow">— 02 / Impact</p>
          <h2 className="section-title">
            The work, <span className="muted">in numbers.</span>
          </h2>
        </div>
        <div className="metric-grid">
          {METRICS.map((m, i) => (
            <Metric key={i} data={m} delay={i * 90} />
          ))}
        </div>
      </div>
    </section>
  )
}
