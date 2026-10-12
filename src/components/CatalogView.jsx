import { SpaceIllustration } from './SpaceIllustration'

export function CatalogView({ dilemas, progresoGuardado, onSelectDilema }) {
  return (
    <div className="catalog-view">
      <div className="page-title-block">
        <span className="section-kicker">Catálogo de casos</span>
        <h1>Explorar dilemas espaciales</h1>
        <p>
          Selecciona un caso para ingresar al laboratorio interactivo de seis etapas. Cada tarjeta
          plantea una tensión real entre el avance científico-tecnológico y distintos valores
          éticos.
        </p>
      </div>

      <div className="catalog-grid">
        {dilemas.map((dilema) => {
          const registro = progresoGuardado[dilema.id]
          const estaCompletado = registro?.completado
          const enCurso = registro && !registro.completado

          return (
            <article key={dilema.id} className="dilemma-catalog-card">
              <div className="dilemma-card-visual">
                <SpaceIllustration type={dilema.tipoIlustracion} />
                <span className="dilemma-number-badge">Caso {dilema.numero}</span>
                {estaCompletado && (
                  <span className="dilemma-status-badge status-done">✓ Recorrido completado</span>
                )}
                {enCurso && (
                  <span className="dilemma-status-badge status-progress">
                    En curso (Etapa {registro.etapaActual}/6)
                  </span>
                )}
              </div>

              <div className="dilemma-card-body">
                <span className="dilemma-theme-tag">Tema: {dilema.tema}</span>
                <h2>
                  {dilema.numero}. {dilema.titulo}
                </h2>
                <p>{dilema.subtitulo}</p>

                <div className="dilemma-card-meta">
                  <span>{dilema.actores.length} actores involucrados</span>
                  <span>·</span>
                  <span>3 perspectivas éticas</span>
                </div>

                <div className="dilemma-card-actions">
                  <button
                    className="btn-primary btn-full"
                    onClick={() => onSelectDilema(dilema.id)}
                  >
                    {estaCompletado
                      ? 'Revisar o repetir dilema'
                      : enCurso
                      ? `Continuar en Etapa ${registro.etapaActual}`
                      : 'Iniciar experiencia interactiva →'}
                  </button>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
