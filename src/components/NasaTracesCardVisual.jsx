export function NasaTracesCardVisual() {
  return (
    <div className="dilemma-card-img-wrapper">
      <img
        src="https://images-assets.nasa.gov/image/PIA24439/PIA24439~medium.jpg"
        alt="Huella en el polvo lunar (Apollo 11)"
        className="dilemma-card-img"
        style={{ objectPosition: 'center 45%' }}
      />
      <span className="dilemma-card-source-tag">aopa.org</span>
      <div className="dilemma-card-bookmark-btn" aria-hidden="true">
        <svg width="12" height="13" viewBox="0 0 12 14" fill="#FFFFFF">
          <path d="M1 1a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v12.2a.5.5 0 0 1-.8.4L6 10.3l-4.2 3.3a.5.5 0 0 1-.8-.4V1z" />
        </svg>
      </div>
    </div>
  )
}
