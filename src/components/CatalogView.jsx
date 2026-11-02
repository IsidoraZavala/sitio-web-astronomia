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

          return (
            <article key={dilema.id} className="dilemma-catalog-card">
              <div className="dilemma-card-visual">
                {dilema.esDirectrizAmbiental ? (
                  <NasaTracesCardVisual />
                ) : dilema.esDirectrizUsoEspacio ? (
                  <NasaAsteroidMonitorVisual />
                ) : dilema.esDirectrizAnimales ? (
                  <NasaAnimalResearchCardVisual />
                ) : null}
              </div>

              <div className="dilemma-card-body">
                {dilema.esDirectrizAmbiental && (
                  <span className="dilemma-category-pill cat-ambiental">
                    Ética ambiental
                  </span>
                )}
                {dilema.esDirectrizUsoEspacio && (
                  <span className="dilemma-category-pill cat-propiedad">
                    Bienes y propiedad
                  </span>
                )}
                {dilema.esDirectrizAnimales && (
                  <span className="dilemma-category-pill cat-animal">
                    Bioética animal
                  </span>
                )}
                <h2>
                  {dilema.titulo}
                </h2>
                <p>{dilema.subtitulo}</p>

                <div className="dilemma-card-actions">
                  <button
                    className="dilemma-card-action-btn"
                    onClick={() => onSelectDilema(dilema.id)}
                  >
                    {estaCompletado
                      ? 'Revisar deliberación'
                      : enCurso
                      ? 'Continuar'
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
