import { IconChatBranch } from './Icons'
import { NasaTracesCardVisual } from './NasaTracesCardVisual'
import { NasaAsteroidMonitorVisual } from './NasaAsteroidMonitorVisual'
import { NasaAnimalResearchCardVisual } from './NasaAnimalResearchCardVisual'
import { TypewriterTitle } from './TypewriterTitle'

export function CatalogView({ dilemas, progresoGuardado, onSelectDilema }) {
  return (
    <div className="catalog-view">
      <div className="page-title-block">
        <TypewriterTitle as="h1" text="Explorar dilemas espaciales" speed={28} />
        <p>Elige un caso para iniciar el diálogo filosófico interactivo.</p>
      </div>

      <div className="catalog-grid">
        {dilemas.map((dilema) => {
          const registro = progresoGuardado[dilema.id]
          const estaCompletado = registro?.completado
          const enCurso = registro && !registro.completado
          const momentoActual = registro?.momentoActual || registro?.etapaActual || 1

          return (
            <article key={dilema.id} className="dilemma-catalog-card">
              <div
                className="dilemma-card-visual"
                style={{ background: '#05060A', padding: '12px' }}
              >
                {dilema.esDirectrizAmbiental ? (
                  <NasaTracesCardVisual />
                ) : dilema.esDirectrizUsoEspacio ? (
                  <NasaAsteroidMonitorVisual />
                ) : dilema.esDirectrizAnimales ? (
                  <NasaAnimalResearchCardVisual />
                ) : null}
                {estaCompletado && (
                  <span className="dilemma-status-badge status-done">✓ Completado</span>
                )}
                {enCurso && (
                  <span className="dilemma-status-badge status-progress">
                    Paso {momentoActual}/5
                  </span>
                )}
              </div>

              <div className="dilemma-card-body">
                {dilema.esDirectrizAmbiental && (
                  <span
                    className="pilot-badge-tag"
                    style={{
                      marginBottom: '10px',
                      borderColor: 'rgba(110, 231, 183, 0.45)',
                      color: '#A7F3D0',
                      background: 'rgba(110, 231, 183, 0.12)',
                    }}
                  >
                    Ética Ambiental
                  </span>
                )}
                {dilema.esDirectrizUsoEspacio && (
                  <span
                    className="pilot-badge-tag"
                    style={{
                      marginBottom: '10px',
                      borderColor: 'rgba(254, 215, 170, 0.45)',
                      color: '#FED7AA',
                      background: 'rgba(254, 215, 170, 0.12)',
                    }}
                  >
                    Bienes y Propiedad
                  </span>
                )}
                {dilema.esDirectrizAnimales && (
                  <span
                    className="pilot-badge-tag"
                    style={{
                      marginBottom: '10px',
                      borderColor: 'rgba(221, 214, 254, 0.45)',
                      color: '#DDD6FE',
                      background: 'rgba(221, 214, 254, 0.12)',
                    }}
                  >
                    Bioética Animal
                  </span>
                )}
                <h2>
                  {dilema.titulo}
                </h2>
                <p>{dilema.subtitulo}</p>

                <div className="dilemma-card-actions">
                  <button
                    className="btn-primary btn-full icon-btn"
                    onClick={() => onSelectDilema(dilema.id)}
                  >
                    <IconChatBranch size={16} />
                    {estaCompletado
                      ? 'Revisar deliberación'
                      : enCurso
                      ? `Continuar (Paso ${momentoActual})`
                      : 'Iniciar deliberación'}
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
