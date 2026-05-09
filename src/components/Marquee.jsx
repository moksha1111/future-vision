const ITEMS = [
  'Building tomorrow',
  'No press cycles',
  'Long-term horizons',
  'Open by default',
  'Quietly relentless',
]

export default function Marquee() {
  const loop = [...ITEMS, ...ITEMS]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {loop.map((item, i) => (
          <span key={i} className="marquee__item">
            {item}
            <span className="marquee__sep">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
