export default function Navbar({ opacity = 1 }) {
  return (
    <header
      className="navbar"
      style={{
        opacity,
        pointerEvents: opacity < 0.05 ? 'none' : 'auto',
      }}
    >
      <div className="navbar__inner">
        <a href="#top" className="navbar__logo">FUTURE</a>

        <nav className="navbar__links">
          <a href="#vision">Vision</a>
          <a href="#approach">Approach</a>
          <a href="#initiatives">Lab</a>
          <a href="#careers">Careers</a>
        </nav>

        <div className="navbar__avatar">
          <span>HM</span>
        </div>
      </div>
    </header>
  )
}
