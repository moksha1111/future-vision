export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__brand">
            <span className="footer__logo">FUTURE</span>
            <p className="footer__tag">Building what comes next.</p>
          </div>
          <div className="footer__cols">
            <div>
              <h4>Studio</h4>
              <a href="#vision">Vision</a>
              <a href="#approach">Approach</a>
              <a href="#initiatives">Lab</a>
            </div>
            <div>
              <h4>Work</h4>
              <a href="#initiatives">Helios</a>
              <a href="#initiatives">Loom</a>
              <a href="#initiatives">Aurora</a>
            </div>
            <div>
              <h4>Connect</h4>
              <a href="#careers">Careers</a>
              <a href="#">Press</a>
              <a href="#">Newsletter</a>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© FUTURE Studio · MMXXVI</span>
          <span>53.4°N / 31.3°E · Always</span>
        </div>
      </div>
    </footer>
  )
}
