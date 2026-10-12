import { useState } from 'react'
import { PERSPECTIVAS_BIBLIOTECA } from '../data/dilemasData'

const ETAPAS = [
  { numero: 1, titulo: 'Conocer el problema' },
  { numero: 2, titulo: 'Tomar una decisión' },
  { numero: 3, titulo: 'Justificar la postura' },
  { numero: 4, titulo: 'Perspectivas filosóficas' },
  { numero: 5, titulo: 'Reconsiderar la decisión' },
  { numero: 6, titulo: 'Reflexión final' },
]

export function DilemmaExperience({ dilema, initialProgress, onSaveProgress, onBackToCatalog }) {
  const [etapaActual, setEtapaActual] = useState(initialProgress?.etapaActual || 1)
  const [actorActivoId, setActorActivoId] = useState(dilema.actores[0]?.id || '')
  const [acordeonAbierto, setAcordeonAbierto] = useState(0)

  // Etapa 2: Decisión inicial
  const [decisionInicialId, setDecisionInicialId] = useState(
    initialProgress?.decisionInicialId || ''
  )
  const [condicionesIniciales, setCondicionesIniciales] = useState(
    initialProgress?.condicionesIniciales || []
  )
  const [propuestaLibreInicial, setPropuestaLibreInicial] = useState(
    initialProgress?.propuestaLibreInicial || ''
  )

  // Etapa 3: Justificación inicial
  const [justificacionInicial, setJustificacionInicial] = useState(
    initialProgress?.justificacionInicial || ''
  )

  // Etapa 4: Perspectivas filosóficas
  const [perspectivaActiva, setPerspectivaActiva] = useState('utilitarismo')
  const [vistaComparativa, setVistaComparativa] = useState(false)
  const [fichaModal, setFichaModal] = useState(null)

  // Etapa 5: Reconsideración
  const [accionReconsiderar, setAccionReconsiderar] = useState(
    initialProgress?.accionReconsiderar || 'mantener'
  )
  const [decisionFinalId, setDecisionFinalId] = useState(
    initialProgress?.decisionFinalId || ''
  )
  const [condicionesFinales, setCondicionesFinales] = useState(
    initialProgress?.condicionesFinales || []
  )
  const [justificacionFinal, setJustificacionFinal] = useState(
    initialProgress?.justificacionFinal || ''
  )

  // Etapa 6: Cierre reflexivo
  const [perspectivaConvincente, setPerspectivaConvincente] = useState(
    initialProgress?.perspectivaConvincente || 'Utilitarismo'
  )
  const [argumentosNuevos, setArgumentosNuevos] = useState(
    initialProgress?.argumentosNuevos || ''
  )
  const [infoFaltante, setInfoFaltante] = useState(
    initialProgress?.infoFaltante || ''
  )
  const [copiadoMensaje, setCopiadoMensaje] = useState(false)
  const [guardadoMensaje, setGuardadoMensaje] = useState(false)

  const actorActivo =
    dilema.actores.find((a) => a.id === actorActivoId) || dilema.actores[0]

  const obtenerTituloDecision = (idDecision) => {
    const encontrada = dilema.alternativas.find((alt) => alt.id === idDecision)
    return encontrada ? encontrada.titulo : 'Sin seleccionar'
  }

  const toggleCondicionInicial = (idCond) => {
    setCondicionesIniciales((prev) =>
      prev.includes(idCond) ? prev.filter((item) => item !== idCond) : [...prev, idCond]
    )
  }

  const toggleCondicionFinal = (idCond) => {
    setCondicionesFinales((prev) =>
      prev.includes(idCond) ? prev.filter((item) => item !== idCond) : [...prev, idCond]
    )
  }

  const construirObjetoProgreso = (etapaDestino = etapaActual, completado = false) => {
    const decFinalEfectiva =
      accionReconsiderar === 'cambiar' && decisionFinalId
        ? decisionFinalId
        : accionReconsiderar === 'mas-info'
        ? 'mas-info'
        : decisionInicialId

    return {
      dilemaId: dilema.id,
      dilemaNumero: dilema.numero,
      dilemaTitulo: dilema.titulo,
      tema: dilema.tema,
      fechaActualizacion: new Date().toLocaleDateString('es-CL', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      etapaActual: etapaDestino,
      completado: completado || initialProgress?.completado || false,
      decisionInicialId,
      decisionInicialTexto: obtenerTituloDecision(decisionInicialId),
      condicionesIniciales,
      propuestaLibreInicial,
      justificacionInicial,
      accionReconsiderar,
      decisionFinalId: decFinalEfectiva,
      decisionFinalTexto:
        accionReconsiderar === 'mas-info'
          ? 'Solicita más información científica y deliberación antes de votar'
          : obtenerTituloDecision(decFinalEfectiva),
      condicionesFinales:
        accionReconsiderar === 'cambiar' ? condicionesFinales : condicionesIniciales,
      justificacionFinal,
      perspectivaConvincente,
      argumentosNuevos,
      infoFaltante,
    }
  }

  const irAEtapa = (nuevaEtapa) => {
    const esFinal = nuevaEtapa === 6
    const datos = construirObjetoProgreso(nuevaEtapa, esFinal)
    onSaveProgress(datos)
    setEtapaActual(nuevaEtapa)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const guardarReflexionManual = () => {
    const datos = construirObjetoProgreso(6, true)
    onSaveProgress(datos)
    setGuardadoMensaje(true)
    setTimeout(() => setGuardadoMensaje(false), 3000)
  }

  const generarTextoResumen = () => {
    const datos = construirObjetoProgreso(6, true)
    const condIniTexto =
      datos.condicionesIniciales.length > 0
        ? datos.condicionesIniciales
            .map(
              (cid) =>
                dilema.condicionesDisponibles.find((c) => c.id === cid)?.texto || cid
            )
            .join('; ')
        : 'Ninguna condición adicional seleccionada'

    return [
      `ÓRBITA ÉTICA — RESUMEN DE RECORRIDO ÉTICO`,
      `==================================================`,
      `Caso ${dilema.numero}: ${dilema.titulo}`,
      `Tema: ${dilema.tema}`,
      `Fecha: ${datos.fechaActualizacion}`,
      ``,
      `1. POSTURA INICIAL`,
      `- Decisión inicial: ${datos.decisionInicialTexto}`,
      datos.decisionInicialId === 'condicionar' ? `- Condiciones elegidas: ${condIniTexto}` : null,
      datos.decisionInicialId === 'propia' && datos.propuestaLibreInicial
        ? `- Propuesta propia: ${datos.propuestaLibreInicial}`
        : null,
      `- Justificación inicial: ${datos.justificacionInicial || '(Sin redactar)'}`,
      ``,
      `2. POSTURA TRAS EL ANÁLISIS FILOSÓFICO`,
      `- Acción al reconsiderar: ${
        datos.accionReconsiderar === 'mantener'
          ? 'Mantuvo su decisión inicial'
          : datos.accionReconsiderar === 'cambiar'
          ? 'Modificó su decisión inicial'
          : 'Indicó que necesita más información'
      }`,
      `- Decisión final: ${datos.decisionFinalTexto}`,
      `- Justificación final: ${datos.justificacionFinal || '(Sin redactar)'}`,
      ``,
      `3. REFLEXIÓN METACOGNITIVA`,
      `- Perspectiva ética más convincente: ${datos.perspectivaConvincente}`,
      `- Argumentos o actores nuevos considerados: ${datos.argumentosNuevos || '(No especificado)'}`,
      `- Información adicional necesaria: ${datos.infoFaltante || '(No especificado)'}`,
    ]
      .filter(Boolean)
      .join('\n')
  }

  const copiarResumen = async () => {
    const texto = generarTextoResumen()
    await navigator.clipboard.writeText(texto)
    setCopiadoMensaje(true)
    setTimeout(() => setCopiadoMensaje(false), 3000)
  }

  const descargarResumen = () => {
    const texto = generarTextoResumen()
    const blob = new Blob([texto], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `orbita-etica-caso-${dilema.numero}.txt`
    link.click()
    URL.revokeObjectURL(url)
  }

  const claveDecisionParaAnalisis = decisionInicialId || 'condicionar'

  return (
    <div className="dilemma-workspace">
      {/* Encabezado del caso activo */}
      <div className="workspace-top-bar">
        <button className="btn-secondary btn-sm" onClick={onBackToCatalog}>
          ← Volver al catálogo de dilemas
        </button>
        <span className="topic-tag">
          Caso {dilema.numero} · {dilema.tema}
        </span>
      </div>

      <div className="workspace-header-box">
        <h1>{dilema.titulo}</h1>
        <p className="workspace-subtitle">{dilema.subtitulo}</p>

        {/* Barra de progreso de las 6 etapas */}
        <nav className="stepper-nav" aria-label="Etapas del recorrido ético">
          {ETAPAS.map((etapa) => {
            const esActiva = etapa.numero === etapaActual
            const esCompletada = etapa.numero < etapaActual
            return (
              <button
                key={etapa.numero}
                onClick={() => irAEtapa(etapa.numero)}
                className={`stepper-btn ${esActiva ? 'active' : ''} ${
                  esCompletada ? 'completed' : ''
                }`}
              >
                <span className="stepper-num">{etapa.numero}</span>
                <span className="stepper-label">{etapa.titulo}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* ETAPA 1: CONOCER EL PROBLEMA */}
      {etapaActual === 1 && (
        <section className="stage-card">
          <div className="stage-header">
            <span className="stage-badge">Etapa 1 de 6</span>
            <h2>Conocer el problema: contexto científico y actores involucrados</h2>
          </div>

          <div className="scenario-overview-box">
            <h3>Presentación del escenario</h3>
            <p>{dilema.resumenEscenario}</p>
          </div>

          {/* Distinción entre Evidencia Científica y Supuestos del Escenario */}
          <div className="two-col-grid">
            <div className="info-panel panel-facts">
              <div className="panel-title-row">
                <span className="panel-pill pill-science">Evidencia científica</span>
                <h4>Datos técnicos y astronómicos</h4>
              </div>
              <ul className="clean-list">
                {dilema.hechosCientificos.map((hecho, idx) => (
                  <li key={idx}>{hecho}</li>
                ))}
              </ul>
            </div>

            <div className="info-panel panel-assumptions">
              <div className="panel-title-row">
                <span className="panel-pill pill-context">Condiciones del caso</span>
                <h4>Supuestos del escenario a evaluar</h4>
              </div>
              <ul className="clean-list">
                {dilema.supuestosEscenario.map((supuesto, idx) => (
                  <li key={idx}>{supuesto}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sección interactiva de actores involucrados */}
          <div className="subsection-block">
            <h3>Actores involucrados y sus intereses</h3>
            <p className="helper-text">
              Selecciona cada actor para examinar qué busca en este escenario y qué riesgos le
              preocupan antes de tomar una postura:
            </p>

            <div className="actor-tabs" role="tablist">
              {dilema.actores.map((actor) => (
                <button
                  key={actor.id}
                  role="tab"
                  aria-selected={actorActivo.id === actor.id}
                  className={`actor-tab-btn ${actorActivo.id === actor.id ? 'active' : ''}`}
                  onClick={() => setActorActivoId(actor.id)}
                >
                  {actor.nombre}
                </button>
              ))}
            </div>

            {actorActivo && (
              <div className="actor-detail-box">
                <div className="actor-detail-header">
                  <h4>{actorActivo.nombre}</h4>
                  <span className="actor-role-badge">{actorActivo.rol}</span>
                </div>
                <div className="two-col-grid" style={{ marginTop: '0.75rem' }}>
                  <div>
                    <strong className="field-label">Intereses y argumentos principales:</strong>
                    <p>{actorActivo.intereses}</p>
                  </div>
                  <div>
                    <strong className="field-label">Preocupación o vulnerabilidad:</strong>
                    <p>{actorActivo.preocupacion}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Información científica desplegable */}
          <div className="subsection-block">
            <h3>Conceptos científicos clave (desplegables)</h3>
            <div className="accordion-list">
              {dilema.capsulasCientificas.map((capsula, idx) => {
                const abierto = acordeonAbierto === idx
                return (
                  <div key={idx} className="accordion-item">
                    <button
                      className="accordion-trigger"
                      onClick={() => setAcordeonAbierto(abierto ? -1 : idx)}
                      aria-expanded={abierto}
                    >
                      <span>{capsula.titulo}</span>
                      <span className="accordion-symbol">{abierto ? '−' : '+'}</span>
                    </button>
                    {abierto && (
                      <div className="accordion-body">
                        <p>{capsula.contenido}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="stage-footer">
            <span className="neutral-note">
              Nota metodológica: No existe una única respuesta predeterminada. Analiza todos los
              actores antes de votar.
            </span>
            <button className="btn-primary" onClick={() => irAEtapa(2)}>
              Continuar a Etapa 2: Tomar una decisión →
            </button>
          </div>
        </section>
      )}

      {/* ETAPA 2: TOMAR UNA DECISIÓN */}
      {etapaActual === 2 && (
        <section className="stage-card">
          <div className="stage-header">
            <span className="stage-badge">Etapa 2 de 6</span>
            <h2>Tomar una decisión inicial</h2>
          </div>

          <div className="committee-prompt-box">
            <p className="committee-question">«{dilema.preguntaComite}»</p>
          </div>

          <div className="decision-options-grid">
            {dilema.alternativas.map((alt) => {
              const seleccionada = decisionInicialId === alt.id
              return (
                <div
                  key={alt.id}
                  className={`decision-option-card ${seleccionada ? 'selected' : ''}`}
                  onClick={() => setDecisionInicialId(alt.id)}
                >
                  <div className="decision-option-top">
                    <input
                      type="radio"
                      name="decisionInicial"
                      checked={seleccionada}
                      onChange={() => setDecisionInicialId(alt.id)}
                    />
                    <h3>{alt.titulo}</h3>
                  </div>
                  <p>{alt.descripcion}</p>
                </div>
              )
            })}
          </div>

          {/* Si elige Autorizar con condiciones, mostrar medidas seleccionables */}
          {decisionInicialId === 'condicionar' && (
            <div className="conditions-subpanel">
              <h4>Selecciona las condiciones obligatorias que exigirías para autorizar:</h4>
              <p className="helper-text">
                Puedes marcar una o varias medidas de mitigación, supervisión y equidad:
              </p>
              <div className="checkbox-list">
                {dilema.condicionesDisponibles.map((cond) => (
                  <label key={cond.id} className="checkbox-row">
                    <input
                      type="checkbox"
                      checked={condicionesIniciales.includes(cond.id)}
                      onChange={() => toggleCondicionInicial(cond.id)}
                    />
                    <span>{cond.texto}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Si elige Proponer una solución propia */}
          {decisionInicialId === 'propia' && (
            <div className="conditions-subpanel">
              <h4>Describe tu propia propuesta o solución al problema:</h4>
              <textarea
                rows={4}
                className="solid-textarea"
                placeholder="Escribe aquí en qué consiste tu solución o modelo alternativo..."
                value={propuestaLibreInicial}
                onChange={(e) => setPropuestaLibreInicial(e.target.value)}
              />
            </div>
          )}

          <div className="stage-footer">
            <button className="btn-secondary" onClick={() => irAEtapa(1)}>
              ← Volver al contexto
            </button>
            <button
              className="btn-primary"
              disabled={!decisionInicialId}
              onClick={() => irAEtapa(3)}
            >
              Continuar a Etapa 3: Justificar decisión →
            </button>
          </div>
        </section>
      )}

      {/* ETAPA 3: JUSTIFICAR LA DECISIÓN */}
      {etapaActual === 3 && (
        <section className="stage-card">
          <div className="stage-header">
            <span className="stage-badge">Etapa 3 de 6</span>
            <h2>Justificar la postura inicial</h2>
          </div>

          <div className="summary-banner-solid">
            <strong>Tu decisión seleccionada:</strong>{' '}
            <span>{obtenerTituloDecision(decisionInicialId)}</span>
            {decisionInicialId === 'condicionar' && condicionesIniciales.length > 0 && (
              <p className="small-muted">
                Con {condicionesIniciales.length} condición(es) obligatoria(s) seleccionada(s).
              </p>
            )}
          </div>

          <div className="form-section">
            <label htmlFor="justificacion-inicial" className="question-label">
              «¿Por qué consideras que esta es la mejor decisión? ¿Qué consecuencias, deberes o
              principios consideraste más importantes?»
            </label>
            <p className="helper-text">
              La plataforma guardará tu respuesta para que puedas compararla al final del recorrido,
              después de explorar las perspectivas filosóficas.
            </p>
            <textarea
              id="justificacion-inicial"
              rows={6}
              className="solid-textarea"
              placeholder="Escribe aquí tus argumentos iniciales (por ejemplo: qué actores priorizaste, qué daños buscas evitar o qué beneficios consideras prioritarios)..."
              value={justificacionInicial}
              onChange={(e) => setJustificacionInicial(e.target.value)}
            />
          </div>

          <div className="stage-footer">
            <button className="btn-secondary" onClick={() => irAEtapa(2)}>
              ← Modificar alternativa en Etapa 2
            </button>
            <button className="btn-primary" onClick={() => irAEtapa(4)}>
              Continuar a Etapa 4: Explorar perspectivas filosóficas →
            </button>
          </div>
        </section>
      )}

      {/* ETAPA 4: EXPLORAR LAS PERSPECTIVAS FILOSÓFICAS */}
      {etapaActual === 4 && (
        <section className="stage-card">
          <div className="stage-header">
            <span className="stage-badge">Etapa 4 de 6 · Núcleo de Órbita Ética</span>
            <h2>Explorar las perspectivas filosóficas aplicadas a tu decisión</h2>
          </div>

          <div className="summary-banner-solid">
            <div>
              <strong>Analizando tu postura inicial:</strong>{' '}
              <span>{obtenerTituloDecision(decisionInicialId)}</span>
            </div>
            <button
              className="btn-secondary btn-sm"
              onClick={() => setVistaComparativa(!vistaComparativa)}
            >
              {vistaComparativa
                ? 'Ver por pestañas individuales'
                : 'Ver comparativa simultánea (3 marcos)'}
            </button>
          </div>

          {!vistaComparativa ? (
            <>
              <div className="philosophy-tabs" role="tablist">
                <button
                  className={`philo-tab-btn ${
                    perspectivaActiva === 'utilitarismo' ? 'active' : ''
                  }`}
                  onClick={() => setPerspectivaActiva('utilitarismo')}
                >
                  1. Utilitarismo (Consecuencias)
                </button>
                <button
                  className={`philo-tab-btn ${
                    perspectivaActiva === 'deontologia' ? 'active' : ''
                  }`}
                  onClick={() => setPerspectivaActiva('deontologia')}
                >
                  2. Deontología (Deberes y normas)
                </button>
                <button
                  className={`philo-tab-btn ${
                    perspectivaActiva === 'justicia-distributiva' ? 'active' : ''
                  }`}
                  onClick={() => setPerspectivaActiva('justicia-distributiva')}
                >
                  3. Justicia distributiva (Equidad)
                </button>
              </div>

              {(() => {
                const datosMarco = dilema.analisisFilosofico[perspectivaActiva]
                const fichaBiblio = PERSPECTIVAS_BIBLIOTECA.find(
                  (p) => p.id === perspectivaActiva
                )
                return (
                  <div className="philo-analysis-box">
                    <div className="philo-box-top">
                      <div>
                        <span className="stage-badge">{fichaBiblio?.categoria}</span>
                        <h3>{fichaBiblio?.nombre}</h3>
                      </div>
                      {fichaBiblio && (
                        <button
                          className="btn-secondary btn-sm"
                          onClick={() => setFichaModal(fichaBiblio)}
                        >
                          Consultar ficha filosófica completa
                        </button>
                      )}
                    </div>

                    <div className="four-elements-grid">
                      <div className="element-card">
                        <span className="element-num">1. Explicación breve</span>
                        <p>{datosMarco.explicacionBreve}</p>
                      </div>

                      <div className="element-card">
                        <span className="element-num">2. Pregunta principal del enfoque</span>
                        <p className="emphasized-quote">«{datosMarco.preguntaPrincipal}»</p>
                      </div>

                      <div className="element-card element-highlight">
                        <span className="element-num">
                          3. Análisis aplicado a tu decisión ({obtenerTituloDecision(decisionInicialId)})
                        </span>
                        <p>{datosMarco.porDecision[claveDecisionParaAnalisis]}</p>
                      </div>

                      <div className="element-card element-challenge">
                        <span className="element-num">4. Pregunta que desafía tu postura</span>
                        <p className="emphasized-quote">«{datosMarco.preguntaDesafio}»</p>
                      </div>
                    </div>
                  </div>
                )
              })()}
            </>
          ) : (
            /* Vista comparativa simultánea de las 3 perspectivas */
            <div className="three-col-comparison">
              {['utilitarismo', 'deontologia', 'justicia-distributiva'].map((marcoId) => {
                const datosMarco = dilema.analisisFilosofico[marcoId]
                const fichaBiblio = PERSPECTIVAS_BIBLIOTECA.find((p) => p.id === marcoId)
                return (
                  <div key={marcoId} className="comparison-column-card">
                    <h3>{fichaBiblio?.nombre}</h3>
                    <p className="small-muted" style={{ marginBottom: '0.75rem' }}>
                      {datosMarco.explicacionBreve}
                    </p>
                    <div className="comp-section">
                      <strong>Pregunta central:</strong>
                      <p>«{datosMarco.preguntaPrincipal}»</p>
                    </div>
                    <div className="comp-section">
                      <strong>Sobre tu decisión:</strong>
                      <p>{datosMarco.porDecision[claveDecisionParaAnalisis]}</p>
                    </div>
                    <div className="comp-section comp-challenge">
                      <strong>Desafío ético:</strong>
                      <p>«{datosMarco.preguntaDesafio}»</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Modal para consultar la ficha de la Biblioteca Filosófica sin perder el avance */}
          {fichaModal && (
            <div className="solid-modal-backdrop" onClick={() => setFichaModal(null)}>
              <div className="solid-modal-card" onClick={(e) => e.stopPropagation()}>
                <div className="philo-box-top">
                  <div>
                    <span className="stage-badge">{fichaModal.categoria}</span>
                    <h3>Ficha filosófica: {fichaModal.nombre}</h3>
                  </div>
                  <button className="btn-secondary btn-sm" onClick={() => setFichaModal(null)}>
                    Cerrar ficha ✕
                  </button>
                </div>
                <p style={{ marginTop: '0.75rem' }}>{fichaModal.definicion}</p>
                <div className="modal-section">
                  <strong>Autores referentes:</strong>
                  <p>{fichaModal.autores.join(' · ')}</p>
                </div>
                <div className="modal-section">
                  <strong>Principios centrales:</strong>
                  <ul className="clean-list">
                    {fichaModal.principiosCentrales.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
                <div className="modal-section">
                  <strong>Aplicación al ámbito espacial:</strong>
                  <p>{fichaModal.ejemploEspacial}</p>
                </div>
              </div>
            </div>
          )}

          <div className="stage-footer">
            <button className="btn-secondary" onClick={() => irAEtapa(3)}>
              ← Volver a mi justificación inicial
            </button>
            <button className="btn-primary" onClick={() => irAEtapa(5)}>
              Continuar a Etapa 5: Reconsiderar la decisión →
            </button>
          </div>
        </section>
      )}

      {/* ETAPA 5: RECONSIDERAR LA DECISIÓN */}
      {etapaActual === 5 && (
        <section className="stage-card">
          <div className="stage-header">
            <span className="stage-badge">Etapa 5 de 6</span>
            <h2>Reconsiderar la decisión</h2>
          </div>

          <div className="initial-record-box">
            <h4>Tu registro inicial (Etapas 2 y 3)</h4>
            <p>
              <strong>Decisión inicial:</strong> {obtenerTituloDecision(decisionInicialId)}
            </p>
            <p style={{ marginTop: '0.4rem' }}>
              <strong>Justificación inicial:</strong>{' '}
              {justificacionInicial || '(No ingresaste texto en la etapa 3)'}
            </p>
          </div>

          <div className="form-section">
            <p className="question-label">
              «Ahora que conoces cómo distintas perspectivas éticas analizan el problema,
              ¿mantendrías tu decisión?»
            </p>
            <p className="helper-text">
              Cambiar de opinión no es necesariamente el único resultado positivo: mantener tu
              decisión inicial incorporando mejores argumentos o matices también es valioso.
            </p>

            <div className="reconsider-options">
              <label
                className={`reconsider-card ${
                  accionReconsiderar === 'mantener' ? 'selected' : ''
                }`}
              >
                <input
                  type="radio"
                  name="reconsiderar"
                  checked={accionReconsiderar === 'mantener'}
                  onChange={() => setAccionReconsiderar('mantener')}
                />
                <div>
                  <strong>Mantener mi postura inicial</strong>
                  <p>Conservas tu decisión, enriqueciendo o precisando tu argumentación.</p>
                </div>
              </label>

              <label
                className={`reconsider-card ${
                  accionReconsiderar === 'cambiar' ? 'selected' : ''
                }`}
              >
                <input
                  type="radio"
                  name="reconsiderar"
                  checked={accionReconsiderar === 'cambiar'}
                  onChange={() => setAccionReconsiderar('cambiar')}
                />
                <div>
                  <strong>Modificar mi postura</strong>
                  <p>Cambias hacia otra alternativa o ajustas las condiciones tras el análisis.</p>
                </div>
              </label>

              <label
                className={`reconsider-card ${
                  accionReconsiderar === 'mas-info' ? 'selected' : ''
                }`}
              >
                <input
                  type="radio"
                  name="reconsiderar"
                  checked={accionReconsiderar === 'mas-info'}
                  onChange={() => setAccionReconsiderar('mas-info')}
                />
                <div>
                  <strong>Necesito más información antes de decidir</strong>
                  <p>
                    Consideras que faltan datos empíricos o garantías antes de emitir un voto
                    definitivo.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {accionReconsiderar === 'cambiar' && (
            <div className="conditions-subpanel">
              <h4>Selecciona tu nueva decisión:</h4>
              <div className="decision-options-grid" style={{ marginTop: '0.75rem' }}>
                {dilema.alternativas.map((alt) => (
                  <div
                    key={alt.id}
                    className={`decision-option-card ${
                      decisionFinalId === alt.id ? 'selected' : ''
                    }`}
                    onClick={() => setDecisionFinalId(alt.id)}
                  >
                    <div className="decision-option-top">
                      <input
                        type="radio"
                        name="decisionFinal"
                        checked={decisionFinalId === alt.id}
                        onChange={() => setDecisionFinalId(alt.id)}
                      />
                      <h3>{alt.titulo}</h3>
                    </div>
                  </div>
                ))}
              </div>

              {decisionFinalId === 'condicionar' && (
                <div style={{ marginTop: '1rem' }}>
                  <strong>Condiciones seleccionadas en esta revisión:</strong>
                  <div className="checkbox-list" style={{ marginTop: '0.5rem' }}>
                    {dilema.condicionesDisponibles.map((cond) => (
                      <label key={cond.id} className="checkbox-row">
                        <input
                          type="checkbox"
                          checked={condicionesFinales.includes(cond.id)}
                          onChange={() => toggleCondicionFinal(cond.id)}
                        />
                        <span>{cond.texto}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="form-section" style={{ marginTop: '1.5rem' }}>
            <label htmlFor="justificacion-final" className="question-label">
              Escribe tu segunda justificación (argumentación final):
            </label>
            <textarea
              id="justificacion-final"
              rows={5}
              className="solid-textarea"
              placeholder="Explica por qué decidiste mantener o cambiar tu postura y qué elementos éticos (consecuencias, deberes o justicia distributiva) incorporaste a tu razonamiento..."
              value={justificacionFinal}
              onChange={(e) => setJustificacionFinal(e.target.value)}
            />
          </div>

          <div className="stage-footer">
            <button className="btn-secondary" onClick={() => irAEtapa(4)}>
              ← Volver a perspectivas filosóficas
            </button>
            <button className="btn-primary" onClick={() => irAEtapa(6)}>
              Continuar a Etapa 6: Reflexión final →
            </button>
          </div>
        </section>
      )}

      {/* ETAPA 6: REFLEXIÓN FINAL */}
      {etapaActual === 6 && (
        <section className="stage-card">
          <div className="stage-header">
            <span className="stage-badge">Etapa 6 de 6 · Síntesis del recorrido</span>
            <h2>Reflexión final: comparación de argumentaciones</h2>
          </div>

          {/* Comparación Lado a Lado: Inicial vs Final */}
          <div className="two-col-grid comparison-side-by-side">
            <div className="comparison-box box-initial">
              <span className="comparison-tag">Antes del análisis filosófico (Etapas 2 y 3)</span>
              <h3>Postura y argumentación inicial</h3>
              <p className="comp-decision-line">
                <strong>Decisión:</strong> {obtenerTituloDecision(decisionInicialId)}
              </p>
              {decisionInicialId === 'condicionar' && condicionesIniciales.length > 0 && (
                <div className="comp-conditions">
                  <strong>Condiciones elegidas:</strong>
                  <ul className="clean-list">
                    {condicionesIniciales.map((cid) => (
                      <li key={cid}>
                        {dilema.condicionesDisponibles.find((c) => c.id === cid)?.texto || cid}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="comp-text-block">
                <strong>Argumentación inicial:</strong>
                <p>{justificacionInicial || '(Sin justificación registrada)'}</p>
              </div>
            </div>

            <div className="comparison-box box-final">
              <span className="comparison-tag tag-accent">
                Después del análisis filosófico (Etapa 5)
              </span>
              <h3>Postura y argumentación final</h3>
              <p className="comp-decision-line">
                <strong>Resultado:</strong>{' '}
                {accionReconsiderar === 'mantener'
                  ? `Mantuvo: ${obtenerTituloDecision(decisionInicialId)}`
                  : accionReconsiderar === 'cambiar'
                  ? `Cambió a: ${obtenerTituloDecision(decisionFinalId || decisionInicialId)}`
                  : 'Solicitó más información científica antes de decidir'}
              </p>
              <div className="comp-text-block">
                <strong>Argumentación final:</strong>
                <p>{justificacionFinal || '(Sin segunda justificación registrada)'}</p>
              </div>
            </div>
          </div>

          {/* Preguntas de cierre metacognitivo */}
          <div className="subsection-block">
            <h3>Balance de tu deliberación ética</h3>
            <div className="reflection-questions-grid">
              <div className="form-group">
                <label htmlFor="marco-convincente">
                  1. ¿Qué perspectiva filosófica te resultó más convincente o útil para este caso?
                </label>
                <select
                  id="marco-convincente"
                  className="solid-select"
                  value={perspectivaConvincente}
                  onChange={(e) => setPerspectivaConvincente(e.target.value)}
                >
                  <option value="Utilitarismo">Utilitarismo (balance de consecuencias)</option>
                  <option value="Deontología">Deontología (deberes y obligaciones morales)</option>
                  <option value="Justicia distributiva">
                    Justicia distributiva (reparto equitativo de cargas y beneficios)
                  </option>
                  <option value="Ética ambiental e intergeneracional">
                    Ética ambiental y justicia intergeneracional
                  </option>
                  <option value="Combinación de varias perspectivas">
                    Combinación de varias perspectivas
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="argumentos-nuevos">
                  2. ¿Qué argumentos o actores no habías considerado suficientemente al inicio?
                </label>
                <input
                  id="argumentos-nuevos"
                  type="text"
                  className="solid-input"
                  placeholder="Ej.: El impacto sobre observatorios astronómicos o sobre países emergentes..."
                  value={argumentosNuevos}
                  onChange={(e) => setArgumentosNuevos(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="info-faltante">
                  3. ¿Qué información científica o técnica adicional haría falta para decidir mejor?
                </label>
                <input
                  id="info-faltante"
                  type="text"
                  className="solid-input"
                  placeholder="Ej.: Datos independientes sobre efectividad de viseras antirreflejo o costos..."
                  value={infoFaltante}
                  onChange={(e) => setInfoFaltante(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Acciones de guardado y exportación */}
          <div className="export-actions-bar">
            <div className="export-buttons">
              <button className="btn-primary" onClick={guardarReflexionManual}>
                Guardar en «Mi recorrido»
              </button>
              <button className="btn-secondary" onClick={copiarResumen}>
                Copiar resumen al portapapeles
              </button>
              <button className="btn-secondary" onClick={descargarResumen}>
                Descargar resumen (.txt)
              </button>
            </div>

            {guardadoMensaje && (
              <span className="status-pill-success">
                ✓ Guardado correctamente en «Mi recorrido»
              </span>
            )}
            {copiadoMensaje && (
              <span className="status-pill-success">
                ✓ Resumen copiado al portapapeles
              </span>
            )}
          </div>

          <div className="stage-footer">
            <button className="btn-secondary" onClick={() => irAEtapa(5)}>
              ← Volver a Etapa 5
            </button>
            <button className="btn-secondary" onClick={onBackToCatalog}>
              Explorar otro dilema del catálogo →
            </button>
          </div>
        </section>
      )}
    </div>
  )
}
