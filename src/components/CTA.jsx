import { useInView } from '../hooks/useInView'

export default function CTA() {
  const [ref, inView] = useInView({ threshold: 0.25 })
  return (
    <section ref={ref} className={`cta ${inView ? 'is-in' : ''}`} id="careers">
      <div className="container">
        <div className="cta__inner">
          <p className="eyebrow">— Join us</p>
          <h2 className="cta__title">
            Help us build
            <br />
            <span className="cta__title-accent">what comes next.</span>
          </h2>
          <p className="cta__sub">
            If any of this resonates with how you build, we would like to know
            who you are.
          </p>
          <form
            className="cta__form"
            onSubmit={(e) => {
              e.preventDefault()
              // wired to nothing in this demo
            }}
          >
            <input
              type="email"
              required
              placeholder="your.address@anywhere"
              aria-label="Email address"
            />
            <button type="submit">
              Get in touch
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
