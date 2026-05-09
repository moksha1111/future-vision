import { useInView } from '../hooks/useInView'

const PROJECTS = [
  {
    name: 'Project Helios',
    label: 'Atmospheric capture',
    desc: 'Solar-driven CO₂ extraction at gigaton scale. Currently piloting across three deserts with a fourth siting study underway.',
    tag: 'Active · 2024',
    art: 'linear-gradient(135deg, #ff6b35 0%, #f7c948 50%, #c89dff 100%)',
  },
  {
    name: 'Loom Protocol',
    label: 'Decentralized AI',
    desc: 'A federated training fabric so foundation models can be built without single-point control over the systems that increasingly run our lives.',
    tag: 'Beta · 2025',
    art: 'linear-gradient(135deg, #5b6cff 0%, #c64cff 50%, #ff6ba0 100%)',
  },
  {
    name: 'Aurora Mesh',
    label: 'Neural interface',
    desc: 'High-bandwidth brain–machine link without invasive electrodes. Years from human use; closer than the headlines suggest.',
    tag: 'R&D · 2026',
    art: 'linear-gradient(135deg, #00d4ff 0%, #5b6cff 50%, #c64cff 100%)',
  },
]

function Initiative({ project, delay }) {
  const [ref, inView] = useInView({ threshold: 0.2 })
  return (
    <article
      ref={ref}
      className={`initiative ${inView ? 'is-in' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="initiative__thumb">
        <div
          className="initiative__art"
          style={{ background: project.art }}
        />
        <div className="initiative__noise" />
      </div>
      <div className="initiative__body">
        <span className="initiative__tag">{project.tag}</span>
        <span className="initiative__label">{project.label}</span>
        <h3 className="initiative__name">{project.name}</h3>
        <p className="initiative__desc">{project.desc}</p>
        <span className="initiative__cta">
          Read more
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </article>
  )
}

export default function Initiatives() {
  const [headRef, headIn] = useInView({ threshold: 0.2 })
  return (
    <section className="initiatives" id="initiatives">
      <div className="container">
        <div ref={headRef} className={`section-head ${headIn ? 'is-in' : ''}`}>
          <p className="eyebrow">— 03 / Initiatives</p>
          <h2 className="section-title">
            Three projects, <span className="muted">in flight right now.</span>
          </h2>
        </div>
        <div className="initiative-grid">
          {PROJECTS.map((p, i) => (
            <Initiative key={p.name} project={p} delay={i * 110} />
          ))}
        </div>
      </div>
    </section>
  )
}
