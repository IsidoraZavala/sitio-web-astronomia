export function NasaAnimalResearchCardVisual() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '155px',
        overflow: 'hidden',
        borderRadius: '8px',
        background: '#07060E',
      }}
    >
      {/* FOTO HISTÓRICA OFICIAL DE LA NASA */}
      <img
        src="https://images-assets.nasa.gov/image/S61-00813/S61-00813~medium.jpg"
        alt="Cápsula de vuelo biomédico Mercury-Redstone 2 (NASA)"
        onError={(e) => {
          e.currentTarget.src =
            'https://images-assets.nasa.gov/image/ARC-1961-A-27986/ARC-1961-A-27986~medium.jpg'
        }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 35%',
          filter: 'brightness(0.92) contrast(1.05)',
        }}
      />

      {/* GRADIENTE OSCURO PARA CONTRASTE */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(7, 6, 14, 0.05) 0%, rgba(7, 6, 14, 0.45) 55%, rgba(7, 6, 14, 0.96) 100%)',
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
          Cápsula biomédica y chimpancé Ham (NASA, 1961)
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
          Ensayos fisiológicos pre-tripulados · Dilemas bioéticos de la astronáutica
        </p>
      </div>
    </div>
  )
}
