import { useInView } from '../hooks/useInView'

const PRINCIPLES = [
  {
    n: '01',
    title: 'Build slowly. Ship deliberately.',
    body: 'No press cycles, no roadmap theatre. We ship slowly because the systems we build will outlive the cycles that demand otherwise.',
  },
  {
    n: '02',
    title: 'Open by default.',
    body: 'Foundational primitives belong to humanity. Closed only when safety demands it; everything else is published the day it works.',
  },
  {
    n: '03',
    title: 'Horizons over headlines.',
    body: 'A century from now, no one will remember our quarter. They will remember whether the systems we leave behind are worth inheriting.',
  },
]

function Principle({ data, delay }) {
  const [ref, inView] = useInView({ threshold: 0.3 })
  return (
    <div
      ref={ref}
      className={`principle ${inView ? 'is-in' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="principle__num">{data.n}</div>
      <h3 className="principle__title">{data.title}</h3>
      <p className="principle__body">{data.body}</p>
    </div>
  )
}

export default function Principles() {
  const [headRef, headIn] = useInView({ threshold: 0.2 })
  return (
    <section className="principles">
      <div className="container">
        <div ref={headRef} className={`section-head ${headIn ? 'is-in' : ''}`}>
          <p className="eyebrow">— 04 / Principles</p>
          <h2 className="section-title">
            How we operate, <span className="muted">unchanged.</span>
          </h2>
        </div>
        <div className="principle-list">
          {PRINCIPLES.map((p, i) => (
            <Principle key={p.n} data={p} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  )
}
