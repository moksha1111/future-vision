import { useInView } from '../hooks/useInView'

const PILLARS = [
  {
    n: '01',
    title: 'AI Foundations',
    body: 'Models that reason, learn, and create — built on first principles of intelligence rather than imitation of it.',
  },
  {
    n: '02',
    title: 'Quantum Frontiers',
    body: 'Computing at the edge of physical possibility, where qubits write the next chapter of what software can know.',
  },
  {
    n: '03',
    title: 'Biological Systems',
    body: 'Engineering life at the protein level — therapeutics designed atom by atom, not discovered by accident.',
  },
  {
    n: '04',
    title: 'Climate Engineering',
    body: 'Atmospheric capture, fusion energy, and grid-scale storage — the physical infrastructure of a livable future.',
  },
]

function Pillar({ n, title, body, delay }) {
  const [ref, inView] = useInView({ threshold: 0.2 })
  return (
    <div
      ref={ref}
      className={`pillar ${inView ? 'is-in' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className="pillar__num">{n}</span>
      <h3 className="pillar__title">{title}</h3>
      <p className="pillar__body">{body}</p>
    </div>
  )
}

export default function Capabilities() {
  const [headRef, headIn] = useInView({ threshold: 0.2 })
  return (
    <section className="capabilities" id="approach">
      <div className="container">
        <div ref={headRef} className={`section-head ${headIn ? 'is-in' : ''}`}>
          <p className="eyebrow">— 01 / Capabilities</p>
          <h2 className="section-title">
            Four frontiers,{' '}
            <span className="muted">one trajectory.</span>
          </h2>
        </div>
        <div className="pillar-grid">
          {PILLARS.map((p, i) => (
            <Pillar key={p.n} {...p} delay={i * 90} />
          ))}
        </div>
      </div>
    </section>
  )
}
