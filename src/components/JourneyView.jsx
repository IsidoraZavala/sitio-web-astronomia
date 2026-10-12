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
        <span className="section-kicker">Historial personal en este navegador</span>
        <h1>Mi recorrido: reflexiones realizadas</h1>
        <p>
          Aquí puedes consultar los dilemas que has explorado y comparar tus posturas iniciales y
          finales. Los datos se guardan localmente en tu navegador sin necesidad de cuentas ni
          contraseñas.
        </p>
      </div>

      {entradas.length === 0 ? (
        <div className="empty-journey-box">
          <h2>Aún no has registrado reflexiones</h2>
          <p>
            Ingresa al catálogo de dilemas, toma una postura y avanza por las etapas del
            laboratorio para que tus argumentaciones aparezcan aquí.
          </p>
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
                  <div>
                    <span className="stage-badge">
                      Caso {item.dilemaNumero} · {item.tema}
                    </span>
                    <h2>{item.dilemaTitulo}</h2>
                  </div>
                  <div className="journey-meta-right">
                    <span
                      className={`dilemma-status-badge ${
                        item.completado ? 'status-done' : 'status-progress'
                      }`}
                    >
                      {item.completado
                        ? '✓ Completado'
                        : `En curso (Etapa ${item.etapaActual}/6)`}
                    </span>
                    <span className="small-muted">Actualizado: {item.fechaActualizacion}</span>
                  </div>
                </div>

                <div className="two-col-grid" style={{ marginTop: '1rem' }}>
                  <div className="comparison-box box-initial">
                    <span className="comparison-tag">Postura inicial</span>
                    <p>
                      <strong>Decisión:</strong> {item.decisionInicialTexto}
                    </p>
                    <p style={{ marginTop: '0.4rem' }}>
                      <strong>Justificación:</strong>{' '}
                      {item.justificacionInicial || '(Sin texto registrado)'}
                    </p>
                  </div>

                  <div className="comparison-box box-final">
                    <span className="comparison-tag tag-accent">Postura tras el análisis</span>
                    <p>
                      <strong>Decisión final:</strong> {item.decisionFinalTexto}
                    </p>
                    <p style={{ marginTop: '0.4rem' }}>
                      <strong>Justificación final:</strong>{' '}
                      {item.justificacionFinal || '(Pendiente de completar en Etapa 5)'}
                    </p>
                  </div>
                </div>

                {item.perspectivaConvincente && (
                  <div className="journey-extra-notes">
                    <span>
                      <strong>Perspectiva más convincente:</strong> {item.perspectivaConvincente}
                    </span>
                    {item.argumentosNuevos && (
                      <span>
                        <strong>Nuevos factores considerados:</strong> {item.argumentosNuevos}
                      </span>
                    )}
                  </div>
                )}

                <div className="journey-card-actions">
                  <button
                    className="btn-primary btn-sm"
                    onClick={() => onOpenDilema(item.dilemaId)}
                  >
                    Abrir este caso en el laboratorio →
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="journey-bottom-actions">
            <button className="btn-secondary btn-sm" onClick={onClearProgress}>
              Borrar historial guardado en este navegador
            </button>
          </div>
        </>
      )}
    </div>
  )
}
