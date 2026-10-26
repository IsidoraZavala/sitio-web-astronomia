export function NasaAsteroidMonitorVisual() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '155px',
        overflow: 'hidden',
        borderRadius: '8px',
        background: '#060814',
      }}
    >
      {/* FOTO OFICIAL DE LA NAVE/SATÉLITE PSYCHE */}
      <img
        src="https://images-assets.nasa.gov/image/PIA21499/PIA21499~medium.jpg"
        alt="Asteroide 16 Psyche y nave de prospección"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 45%',
          filter: 'brightness(0.9) contrast(1.05)',
        }}
      />

      {/* GRADIENTE OSCURO PARA CONTRASTE */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(6, 8, 20, 0.05) 0%, rgba(6, 8, 20, 0.45) 55%, rgba(6, 8, 20, 0.96) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* TEXTO EN BLANCO Y GRIS ÚNICAMENTE */}
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '12px',
          right: '12px',
          zIndex: 2,
        }}
      >
        <p
          style={{
            margin: '0 0 3px',
            fontSize: '12px',
            fontWeight: 600,
            color: '#FFFFFF',
            lineHeight: '1.3',
            textShadow: '0 2px 4px rgba(0,0,0,0.85)',
          }}
        >
          Asteroide 16 Psyche y nave de prospección
        </p>

        <p
          style={{
            margin: 0,
            fontSize: '10.5px',
            color: '#94A3B8',
            lineHeight: '1.35',
            fontStyle: 'italic',
          }}
        >
          ¿Puede una empresa o Estado reclamar soberanía sobre un asteroide metálico?
        </p>
      </div>
    </div>
  )
}
