import { IconCheckCircle, IconScale } from './Icons'
import { TypewriterTitle } from './TypewriterTitle'

export function JourneyView({
  progresoGuardado,
  onOpenDilema,
  onClearProgress,
  onExploreDilemmas,
}) {
  const entradas = Object.values(progresoGuardado)

  return (
    <div className="journey-view">
      <div className="page-title-block">
        <TypewriterTitle as="h1" text="Mi recorrido" speed={30} />
        <p>Revisa la evolución de tu postura en cada dilema explorado.</p>
      </div>

      {entradas.length === 0 ? (
        <div className="empty-journey-box">
          <h2>Aún no has registrado deliberaciones</h2>
          <p>Inicia un dilema del catálogo para construir tu postura paso a paso.</p>
          <button
            className="btn-primary"
            style={{ marginTop: '1rem' }}
            onClick={onExploreDilemmas}
          >
            Explorar dilemas →
          </button>
        </div>
      ) : (
        <>
          <div className="journey-list">
            {entradas.map((item) => (
              <article key={item.dilemaId} className="journey-card">
                <div className="journey-card-top">
                  <h2 className="icon-heading">
                    <IconScale size={22} /> {item.dilemaNumero}. {item.dilemaTitulo}
                  </h2>
                  <span
                    className={`dilemma-status-badge ${
                      item.completado ? 'status-done' : 'status-progress'
                    }`}
                  >
                    {item.completado
                      ? '✓ Completado'
                      : `Paso ${item.momentoActual || item.etapaActual || 1}/5`}
                  </span>
                </div>

                <div className="two-col-grid" style={{ marginTop: '1rem' }}>
                  <div className="comparison-box box-initial">
                    <p>
                      <strong>1) Posición inicial:</strong>{' '}
                      {item.posicionInicial || item.decisionInicialTexto || '(No registrada)'}
                    </p>
                    <p style={{ marginTop: '6px' }}>
                      <strong>2) Valor importante:</strong>{' '}
                      {item.principioImportante || item.justificacionInicial || '(No registrado)'}
                    </p>
                  </div>

                  <div className="comparison-box box-final">
                    <p>
                      <strong>4) Defensa ante objeción:</strong>{' '}
                      {item.respuestaAObjecion || '(Pendiente)'}
                    </p>
                    <p style={{ marginTop: '6px' }}>
                      <strong>5) Posición actual:</strong>{' '}
                      {item.posicionActualTexto || item.posicionActualEstado || '(En curso)'}
                    </p>
                  </div>
                </div>

                <div className="journey-card-actions">
                  <button
                    className="btn-primary btn-sm icon-btn"
                    onClick={() => onOpenDilema(item.dilemaId)}
                  >
                    <IconCheckCircle size={15} /> Abrir deliberación →
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="journey-bottom-actions">
            <button className="btn-secondary btn-sm" onClick={onClearProgress}>
              Borrar historial
            </button>
          </div>
        </>
      )}
    </div>
  )
}
