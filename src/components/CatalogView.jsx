import { IconChatBranch } from './Icons'
import { Space3DViewer } from './Space3DViewer'
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
                <Space3DViewer initialMode={dilema.modo3D || 'marte'} compact={true} />
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
                {dilema.esPilotoNuevo && (
                  <span className="pilot-badge-tag" style={{ marginBottom: '10px' }}>
                    Caso Piloto · Nueva Ruta
                  </span>
                )}
                <h2>
                  {dilema.numero}. {dilema.titulo}
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
                      ? `Continuar en Paso ${momentoActual}`
                      : 'Iniciar diálogo →'}
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
