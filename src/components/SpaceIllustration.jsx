import { useId } from 'react'

export function SpaceIllustration({ type = 'hero' }) {
  const id = useId().replaceAll(':', '')
  const hero = type === 'hero'
  const moon = type === 'luna'
  const mars = !hero && !['orbita', 'basura', 'luna'].includes(type)
  const debris = type === 'basura'
  const label = hero
    ? 'Ilustración de la Tierra, órbitas y satélites'
    : moon
    ? 'La Luna y sus recursos'
    : mars
    ? 'Una trayectoria entre la Tierra y Marte'
    : debris
    ? 'Fragmentos de basura espacial alrededor de la Tierra'
    : 'Constelaciones satelitales alrededor de la Tierra'

  // Colores 100% sólidos (sin radialGradient) sobre fondo negro espacio (#05060A)
  const planetColor = moon ? '#94A3B8' : mars ? '#C05621' : '#1B4965'

  return (
    <svg
      viewBox={hero ? '0 0 500 430' : '0 55 500 280'}
      className={hero ? 'illustration-svg' : 'card-svg'}
      role="img"
      aria-label={label}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id={id + '-clip'}>
          <circle cx="250" cy="215" r={hero ? 101 : 78} />
        </clipPath>
      </defs>
      <rect width="500" height="430" fill="#05060A" />
      {Array.from({ length: 38 }, (_, i) => (
        <circle
          key={i}
          cx={20 + ((i * 127) % 460)}
          cy={28 + ((i * 83) % 365)}
          r={i % 6 === 0 ? 1.6 : 0.9}
          fill={i % 3 === 0 ? '#FFFFFF' : '#64748B'}
        />
      ))}
      <g stroke="#334155" fill="none" strokeWidth="1">
        <circle cx="250" cy="215" r="153" />
        <circle cx="250" cy="215" r="183" strokeDasharray="3 7" />
        <path d="M250 15V45M250 385V415M40 215H70M430 215H460" />
      </g>
      <ellipse
        cx="250"
        cy="215"
        rx="208"
        ry="77"
        transform="rotate(-28 250 215)"
        stroke="#F59E0B"
        strokeWidth="1.2"
        fill="none"
      />
      <ellipse
        cx="250"
        cy="215"
        rx="169"
        ry="116"
        transform="rotate(38 250 215)"
        stroke="#64748B"
        strokeWidth="1"
        fill="none"
      />
      <circle cx="250" cy="215" r={hero ? 101 : 78} fill={planetColor} stroke="#E2E8F0" strokeWidth="1.5" />
      {moon ? (
        <g fill="#475569">
          <circle cx="219" cy="187" r="20" />
          <circle cx="274" cy="243" r="25" />
          <circle cx="271" cy="168" r="12" />
          <circle cx="217" cy="258" r="10" />
        </g>
      ) : (
        !mars && (
          <g clipPath={'url(#' + id + '-clip)'}>
            <g fill="#2F855A">
              <path d="M157 161l35-37 39 2 18 19-14 22-27 8-7 18 16 19-16 25-18-14-5-24-28-12z" />
              <path d="M212 220l24 5 18 21-12 18-7 33-18 22-6-31-14-22 7-21z" />
              <path d="M265 125l23 8 18 22 28 7 29 37-20 21-29-19-22 5-11 34-22 12-15-24 4-31-13-16 17-17z" />
            </g>
            <g fill="none" stroke="#2C6E91" strokeWidth="1">
              <ellipse cx="250" cy="215" rx="48" ry="102" />
              <ellipse cx="250" cy="215" rx="81" ry="102" />
              <path d="M145 215H355M156 175Q250 196 345 175M156 255Q250 234 345 255" />
            </g>
          </g>
        )
      )}
      <path d="M67 278C118 302 216 290 300 250S438 170 438 141" stroke="#F59E0B" strokeWidth="1.5" fill="none" />
      {debris ? (
        Array.from({ length: 16 }, (_, i) => (
          <rect
            key={i}
            x={250 + Math.cos(i * 1.8) * 170}
            y={215 + Math.sin(i * 1.8) * 87}
            width="5"
            height="5"
            fill={i % 2 ? '#F59E0B' : '#CBD5E1'}
          />
        ))
      ) : (
        <g transform="translate(384 153) rotate(-28)">
          <path d="M-23-8h16v16h-16zM7-8h16v16H7z" fill="#CBD5E1" stroke="#0F172A" strokeWidth="1" />
          <rect x="-6" y="-10" width="12" height="20" rx="2" fill="#F59E0B" />
        </g>
      )}
      {mars && <circle cx="96" cy="265" r="25" fill="#1B4965" stroke="#E2E8F0" strokeWidth="1.5" />}
      <circle cx="108" cy="284" r="4" fill="#F59E0B" />
    </svg>
  )
}
