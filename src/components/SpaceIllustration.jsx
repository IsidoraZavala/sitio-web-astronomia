export function SpaceIllustration({ type = 'hero' }) {
  if (type === 'hero') {
    return (
      <svg
        viewBox="0 0 420 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="illustration-svg"
        role="img"
        aria-label="Ilustración esquemática de la Tierra, órbitas y satélites"
      >
        {/* Fondo sólido del recuadro */}
        <rect width="420" height="300" rx="8" fill="#162B45" />

        {/* Estrellas planas sólidas */}
        <circle cx="48" cy="44" r="2.5" fill="#D9E2EC" />
        <circle cx="96" cy="82" r="2" fill="#9FB3C8" />
        <circle cx="356" cy="52" r="3" fill="#D9E2EC" />
        <circle cx="378" cy="128" r="2" fill="#9FB3C8" />
        <circle cx="64" cy="240" r="2.5" fill="#D9E2EC" />
        <circle cx="332" cy="248" r="2" fill="#9FB3C8" />
        <circle cx="150" cy="36" r="2" fill="#D9E2EC" />

        {/* Anillos orbitales sólidos */}
        <ellipse
          cx="210"
          cy="150"
          rx="165"
          ry="72"
          transform="rotate(-18 210 150)"
          stroke="#486581"
          strokeWidth="2"
          strokeDasharray="6 6"
        />
        <ellipse
          cx="210"
          cy="150"
          rx="132"
          ry="108"
          transform="rotate(24 210 150)"
          stroke="#627D98"
          strokeWidth="2"
        />

        {/* Planeta Tierra en colores planos sólidos */}
        <circle cx="210" cy="150" r="58" fill="#2B6CB0" stroke="#F0F4F8" strokeWidth="3" />
        {/* Continentes estilizados sólidos */}
        <path
          d="M182 115C194 112 206 118 210 128C214 138 202 150 192 156C182 162 170 154 168 140C166 126 172 118 182 115Z"
          fill="#2F855A"
        />
        <path
          d="M224 148C236 144 250 154 252 168C254 180 242 192 228 190C216 188 212 174 216 162C219 153 220 150 224 148Z"
          fill="#2F855A"
        />

        {/* Satélite 1 (arriba izquierda) */}
        <g transform="translate(68, 128) rotate(-18)">
          <rect x="0" y="6" width="14" height="8" fill="#CBD5E1" stroke="#102A43" strokeWidth="1.5" />
          <rect x="16" y="3" width="12" height="14" rx="2" fill="#D97706" stroke="#102A43" strokeWidth="1.5" />
          <rect x="30" y="6" width="14" height="8" fill="#CBD5E1" stroke="#102A43" strokeWidth="1.5" />
        </g>

        {/* Satélite 2 (derecha) */}
        <g transform="translate(316, 102) rotate(22)">
          <rect x="0" y="6" width="14" height="8" fill="#CBD5E1" stroke="#102A43" strokeWidth="1.5" />
          <rect x="16" y="3" width="12" height="14" rx="2" fill="#E2E8F0" stroke="#102A43" strokeWidth="1.5" />
          <rect x="30" y="6" width="14" height="8" fill="#CBD5E1" stroke="#102A43" strokeWidth="1.5" />
        </g>

        {/* Nodos de posición orbital */}
        <circle cx="118" cy="212" r="6" fill="#D97706" stroke="#F0F4F8" strokeWidth="2" />
        <circle cx="292" cy="84" r="6" fill="#38A169" stroke="#F0F4F8" strokeWidth="2" />
      </svg>
    )
  }

  if (type === 'orbita') {
    return (
      <svg viewBox="0 0 320 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="card-svg">
        <rect width="320" height="140" fill="#162B45" />
        <circle cx="160" cy="145" r="78" fill="#2B6CB0" stroke="#D9E2EC" strokeWidth="2.5" />
        <path d="M55 95 Q160 20 265 95" stroke="#9FB3C8" strokeWidth="2" strokeDasharray="5 5" fill="none" />
        <path d="M35 72 Q160 -5 285 72" stroke="#D9E2EC" strokeWidth="2" fill="none" />
        {/* Satélites en fila */}
        <rect x="82" y="48" width="12" height="8" fill="#D97706" />
        <rect x="134" y="34" width="12" height="8" fill="#D97706" />
        <rect x="186" y="36" width="12" height="8" fill="#D97706" />
        <rect x="234" y="52" width="12" height="8" fill="#D97706" />
      </svg>
    )
  }

  if (type === 'basura') {
    return (
      <svg viewBox="0 0 320 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="card-svg">
        <rect width="320" height="140" fill="#1F2937" />
        <circle cx="160" cy="70" r="32" fill="#2B6CB0" stroke="#E2E8F0" strokeWidth="2" />
        <ellipse cx="160" cy="70" rx="95" ry="42" stroke="#9CA3AF" strokeWidth="1.5" strokeDasharray="3 4" />
        <ellipse cx="160" cy="70" rx="118" ry="52" stroke="#D97706" strokeWidth="1.5" strokeDasharray="2 5" />
        {/* Fragmentos sólidos */}
        <circle cx="72" cy="58" r="3.5" fill="#D97706" />
        <circle cx="94" cy="96" r="3" fill="#E5E7EB" />
        <rect x="236" y="44" width="7" height="7" transform="rotate(20 236 44)" fill="#D97706" />
        <circle cx="252" cy="84" r="4" fill="#9CA3AF" />
        <rect x="115" y="26" width="6" height="6" fill="#E5E7EB" />
        <circle cx="208" cy="108" r="3.5" fill="#D97706" />
      </svg>
    )
  }

  if (type === 'luna') {
    return (
      <svg viewBox="0 0 320 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="card-svg">
        <rect width="320" height="140" fill="#1E293B" />
        <circle cx="160" cy="70" r="44" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="2" />
        <circle cx="144" cy="56" r="9" fill="#94A3B8" />
        <circle cx="178" cy="82" r="12" fill="#94A3B8" />
        <circle cx="152" cy="92" r="6" fill="#94A3B8" />
        {/* Marcador polo sur */}
        <rect x="148" y="106" width="24" height="8" rx="2" fill="#2B6CB0" stroke="#F8FAFC" strokeWidth="1.5" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 320 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="card-svg">
      <rect width="320" height="140" fill="#162B45" />
      {/* Tierra a Marte */}
      <circle cx="76" cy="86" r="22" fill="#2B6CB0" stroke="#F0F4F8" strokeWidth="2" />
      <circle cx="246" cy="52" r="16" fill="#C05621" stroke="#F0F4F8" strokeWidth="2" />
      <path d="M98 80 Q170 30 230 52" stroke="#F0F4F8" strokeWidth="2" strokeDasharray="5 5" fill="none" />
      <circle cx="168" cy="54" r="4.5" fill="#D97706" />
    </svg>
  )
}
