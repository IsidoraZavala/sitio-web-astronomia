export function NasaTracesCardVisual() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '155px',
        overflow: 'hidden',
        borderRadius: '8px',
        background: '#05070E',
      }}
    >
      {/* FOTO OFICIAL DE LA LUNA (APOLLO 11) */}
      <img
        src="https://images-assets.nasa.gov/image/PIA24439/PIA24439~medium.jpg"
        alt="Huella de Buzz Aldrin en el polvo lunar (Apollo 11)"
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
            'linear-gradient(180deg, rgba(5, 7, 14, 0.05) 0%, rgba(5, 7, 14, 0.45) 55%, rgba(5, 7, 14, 0.96) 100%)',
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
          Huella de Buzz Aldrin en el polvo lunar (Apollo 11)
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
          Preservación de huellas históricas frente al turismo y alunizajes comerciales.
        </p>
      </div>
    </div>
  )
}
