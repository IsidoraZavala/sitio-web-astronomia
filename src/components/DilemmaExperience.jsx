import { useState } from 'react'
import {
  IconBook,
  IconChatBranch,
  IconCheckCircle,
  IconCompass,
  IconFlask,
  IconGlobe,
  IconLightbulb,
  IconScale,
  IconShieldQuestion,
  IconSpark,
  IconUsers,
} from './Icons'
import { Space3DViewer } from './Space3DViewer'
import { TheoryDialog } from './TheoryDialog'
import { TypewriterTitle } from './TypewriterTitle'

const MOMENTOS = [
  { num: 1, titulo: 'El dilema', Icon: IconGlobe },
  { num: 2, titulo: 'Diálogo', Icon: IconChatBranch },
  { num: 3, titulo: 'Perspectivas', Icon: IconCompass },
  { num: 4, titulo: 'Objeciones', Icon: IconShieldQuestion },
  { num: 5, titulo: 'Cierre', Icon: IconCheckCircle },
]

export function DilemmaExperience({
  dilema,
  progresoInicial,
  perspectivasBiblioteca,
  onSaveProgress,
  onBackToCatalog,
  onGoToJourney,
}) {
  const [momentoActual, setMomentoActual] = useState(progresoInicial?.momentoActual || 1)
  const [tabContexto, setTabContexto] = useState('datos') // 'datos' | 'actores' | 'capsulas'
  const [actorActivo, setActorActivo] = useState(dilema.actores[0]?.id || '')

  // Sub-pestaña en Momento 2 para no saturar la pantalla: 'dialogo' | 'experimentos'
  const [subTabMomento2, setSubTabMomento2] = useState('dialogo')

  // Historial del árbol de diálogo
  const [historialDialogo, setHistorialDialogo] = useState(
    progresoInicial?.historialDialogo || []
  )
  const [nodoActualId, setNodoActualId] = useState(
    progresoInicial?.nodoActualId || dilema.nodoInicialId || 'nodo_inicial'
  )
  const [respuestaAbiertaRama, setRespuestaAbiertaRama] = useState(
    progresoInicial?.respuestaAbiertaRama || ''
  )

  // Experimentos mentales evaluados
  const [experimentosEvaluados, setExperimentosEvaluados] = useState(
    progresoInicial?.experimentosEvaluados || {}
  )
  const [experimentoActivoIdx, setExperimentoActivoIdx] = useState(0)

  // Construcción progresiva de una postura (5 pasos)
  const [posicionInicial, setPosicionInicial] = useState(
    progresoInicial?.posicionInicial || ''
  )
  const [principioImportante, setPrincipioImportante] = useState(
    progresoInicial?.principioImportante || ''
  )
  const [objecionSeleccionada, setObjecionSeleccionada] = useState(
    progresoInicial?.objecionSeleccionada || ''
  )
  const [respuestaAObjecion, setRespuestaAObjecion] = useState(
    progresoInicial?.respuestaAObjecion || ''
  )
  const [posicionActualEstado, setPosicionActualEstado] = useState(
    progresoInicial?.posicionActualEstado || 'Mantiene su postura inicial'
  )
  const [posicionActualTexto, setPosicionActualTexto] = useState(
    progresoInicial?.posicionActualTexto || ''
  )

  // Momento 3: Perspectivas
  const [vistaComparativa, setVistaComparativa] = useState(false)
  const [perspectivaTab, setPerspectivaTab] = useState('utilitarismo')
  const [respuestasAPerspectivas, setRespuestasAPerspectivas] = useState(
    progresoInicial?.respuestasAPerspectivas || {}
  )

  // Momento 4: Ruta de objeción
  const primeraEleccionId = historialDialogo[0]?.respuestaId || 'ruta_a_si'
  const [rutaObjecionActiva, setRutaObjecionActiva] = useState(
    progresoInicial?.rutaObjecionActiva || primeraEleccionId
  )

  // Momento 5: Preguntas de cierre
  const [cierreArgumentoSolido, setCierreArgumentoSolido] = useState(
    progresoInicial?.cierreArgumentoSolido || ''
  )
  const [cierreObjecionDificil, setCierreObjecionDificil] = useState(
    progresoInicial?.cierreObjecionDificil || ''
  )
  const [cierrePreguntaAbierta, setCierrePreguntaAbierta] = useState(
    progresoInicial?.cierrePreguntaAbierta || ''
  )

  // Modales de consulta rápida
  const [fichaModal, setFichaModal] = useState(null)
  const [mostrarModalCiencia, setMostrarModalCiencia] = useState(false)
  const [mensajeCopiado, setMensajeCopiado] = useState('')
  const [guardadoExitoso, setGuardadoExitoso] = useState(false)

  const construirRegistro = (momentoDestino = momentoActual, completadoFlag = false) => {
    const decisionInicialResumen =
      posicionInicial ||
      historialDialogo[0]?.respuestaTexto ||
      'Sin posición inicial registrada'
    const decisionFinalResumen =
      posicionActualTexto ||
      respuestaAObjecion ||
      respuestaAbiertaRama ||
      posicionActualEstado

    return {
      dilemaId: dilema.id,
      dilemaNumero: dilema.numero,
      dilemaTitulo: dilema.titulo,
      momentoActual: momentoDestino,
      etapaActual: momentoDestino,
      completado: completadoFlag || momentoDestino === 5,
      historialDialogo,
      nodoActualId,
      respuestaAbiertaRama,
      experimentosEvaluados,
      posicionInicial: decisionInicialResumen,
      principioImportante,
      objecionSeleccionada:
        objecionSeleccionada ||
        dilema.objecionesPorRuta?.[rutaObjecionActiva]?.objecionPrincipal ||
        '',
      respuestaAObjecion,
      posicionActualEstado,
      posicionActualTexto,
      respuestasAPerspectivas,
      rutaObjecionActiva,
      cierreArgumentoSolido,
      cierreObjecionDificil,
      cierrePreguntaAbierta,
      decisionInicialTexto: decisionInicialResumen,
      justificacionInicial: principioImportante || respuestaAbiertaRama,
      decisionFinalTexto: `${posicionActualEstado}${
        posicionActualTexto ? ': ' + posicionActualTexto : ''
      }`,
      justificacionFinal: respuestaAObjecion || cierreArgumentoSolido,
      fechaActualizacion: new Date().toLocaleDateString('es-CL'),
    }
  }

  const irAMomento = (nuevoMomento, marcarCompletado = false) => {
    setMomentoActual(nuevoMomento)
    onSaveProgress(construirRegistro(nuevoMomento, marcarCompletado))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const seleccionarAlternativaNodo = (nodo, alternativa) => {
    const nuevoPaso = {
      nodoId: nodo.id,
      etiquetaPaso: nodo.etiquetaPaso,
      pregunta: nodo.pregunta,
      respuestaId: alternativa.id,
      etiquetaCorta: alternativa.etiquetaCorta,
      respuestaTexto: alternativa.texto,
      principioSugerido: alternativa.principioSugerido || '',
    }

    const idxExistente = historialDialogo.findIndex((item) => item.nodoId === nodo.id)
    const baseHistorial =
      idxExistente >= 0 ? historialDialogo.slice(0, idxExistente) : historialDialogo
    const nuevoHistorial = [...baseHistorial, nuevoPaso]
    setHistorialDialogo(nuevoHistorial)

    if (nodo.id === dilema.nodoInicialId) {
      setPosicionInicial(`${alternativa.etiquetaCorta}: ${alternativa.texto}`)
      setRutaObjecionActiva(alternativa.id)
      const objecionRama = dilema.objecionesPorRuta?.[alternativa.id]?.objecionPrincipal
      if (objecionRama && !objecionSeleccionada) {
        setObjecionSeleccionada(objecionRama)
      }
    }

    if (alternativa.principioSugerido) {
      setPrincipioImportante(alternativa.principioSugerido)
    }

    const sigId = alternativa.siguienteNodoId || 'fin_dialogo'
    setNodoActualId(sigId)

    onSaveProgress({
      ...construirRegistro(momentoActual, false),
      historialDialogo: nuevoHistorial,
      nodoActualId: sigId,
      posicionInicial:
        nodo.id === dilema.nodoInicialId
          ? `${alternativa.etiquetaCorta}: ${alternativa.texto}`
          : posicionInicial,
      principioImportante: alternativa.principioSugerido || principioImportante,
    })
  }

  const regresarANodo = (indexEnHistorial) => {
    const pasoObjetivo = historialDialogo[indexEnHistorial]
    if (!pasoObjetivo) return
    setMomentoActual(2)
    setSubTabMomento2('dialogo')
    setNodoActualId(pasoObjetivo.nodoId)
  }

  const reiniciarArbolDialogo = () => {
    setHistorialDialogo([])
    setNodoActualId(dilema.nodoInicialId || 'nodo_inicial')
  }

  const actualizarExperimento = (expId, campo, valor) => {
    setExperimentosEvaluados((prev) => {
      const actual = prev[expId] || { postura: 'mantiene', reflexion: '' }
      return {
        ...prev,
        [expId]: { ...actual, [campo]: valor },
      }
    })
  }

  const generarTextoResumen = () => {
    const lineasDialogo = historialDialogo
      .map((h, i) => `  ${i + 1}. ${h.pregunta}\n     → ${h.etiquetaCorta}: ${h.respuestaTexto}`)
      .join('\n')

    return [
      `ÓRBITA ÉTICA — SÍNTESIS DE DELIBERACIÓN`,
      `==================================================`,
      `Dilema ${dilema.numero}: ${dilema.titulo}`,
      ``,
      `1. DIÁLOGO RECORRIDO`,
      lineasDialogo || '  (Sin respuestas registradas)',
      respuestaAbiertaRama ? `  Argumento: ${respuestaAbiertaRama}` : '',
      ``,
      `2. CONSTRUCCIÓN DE MI POSTURA`,
      `  1) Posición inicial: ${posicionInicial || '(No registrada)'}`,
      `  2) Valor importante: ${principioImportante || '(No registrado)'}`,
      `  3) Objeción considerada: ${objecionSeleccionada || '(No registrada)'}`,
      `  4) Respuesta a la objeción: ${respuestaAObjecion || '(No registrada)'}`,
      `  5) Posición actual (${posicionActualEstado}): ${posicionActualTexto || '(No registrada)'}`,
      ``,
      `3. PREGUNTAS DE CIERRE`,
      `  • Argumento más sólido: ${cierreArgumentoSolido || '(Sin responder)'}`,
      `  • Objeción más difícil: ${cierreObjecionDificil || '(Sin responder)'}`,
      `  • Pregunta abierta: ${cierrePreguntaAbierta || '(Sin responder)'}`,
    ]
      .filter(Boolean)
      .join('\n')
  }

  const copiarResumen = async () => {
    try {
      await navigator.clipboard.writeText(generarTextoResumen())
      setMensajeCopiado('Copiado al portapapeles')
      setTimeout(() => setMensajeCopiado(''), 3000)
    } catch {
      setMensajeCopiado('No se pudo copiar')
    }
  }

  const descargarResumenTxt = () => {
    const contenido = generarTextoResumen()
    const blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `deliberacion-${dilema.id}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const guardarRecorridoFinal = () => {
    onSaveProgress(construirRegistro(5, true))
    setGuardadoExitoso(true)
    setTimeout(() => setGuardadoExitoso(false), 3000)
  }

  const actorSeleccionado =
    dilema.actores.find((a) => a.id === actorActivo) || dilema.actores[0]
  const nodoActual =
    nodoActualId !== 'fin_dialogo' ? dilema.nodosDialogo?.[nodoActualId] : null
  const datosObjecionActiva =
    dilema.objecionesPorRuta?.[rutaObjecionActiva] ||
    Object.values(dilema.objecionesPorRuta || {})[0]

  return (
    <div className="dilemma-workspace" style={{ maxWidth: '1240px' }}>
      {/* Barra superior compacta con iconos */}
      <div className="workspace-top-bar">
        <button className="btn-secondary btn-sm icon-btn" onClick={onBackToCatalog}>
          ← Catálogo de dilemas
        </button>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            className="btn-secondary btn-sm icon-btn"
            onClick={() => setMostrarModalCiencia(true)}
          >
            <IconFlask size={15} /> Datos científicos
          </button>
          <button
            className="btn-secondary btn-sm icon-btn"
            onClick={() => setFichaModal(perspectivasBiblioteca[0])}
          >
            <IconBook size={15} /> Fichas filosóficas
          </button>
        </div>
      </div>

      {/* Cabecera limpia y barra de 5 momentos con iconos */}
      <header className="workspace-header-box" style={{ paddingBottom: '22px' }}>
        <TypewriterTitle
          as="h1"
          text={`${dilema.numero}. ${dilema.titulo}`}
          speed={22}
        />

        <nav
          className="stepper-nav"
          aria-label="Momentos de la deliberación"
          style={{ gridTemplateColumns: 'repeat(5, 1fr)', marginTop: '18px' }}
        >
          {MOMENTOS.map((m) => {
            const StepIcon = m.Icon
            return (
              <button
                key={m.num}
                type="button"
                className={`stepper-btn ${
                  momentoActual === m.num
                    ? 'active'
                    : momentoActual > m.num
                    ? 'completed'
                    : ''
                }`}
                onClick={() => irAMomento(m.num)}
              >
                <span className="stepper-num">{m.num}</span>
                <span className="stepper-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <StepIcon size={15} />
                  {m.titulo}
                </span>
              </button>
            )
          })}
        </nav>

        <div className="reading-progress" aria-hidden="true">
          <span style={{ width: `${(momentoActual / 5) * 100}%` }} />
        </div>
      </header>

      {/* Layout en 2 columnas: Contenido principal + Resumen compacto de postura */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.75fr) minmax(270px, 0.85fr)',
          gap: '24px',
          alignItems: 'start',
        }}
        className="deliberation-layout-grid"
      >
        <div>
          {/* =============================================================== */}
          {/* MOMENTO 1: EL DILEMA (ORGANIZADO EN PESTAÑAS VISUALES)          */}
          {/* =============================================================== */}
          {momentoActual === 1 && (
            <section className="stage-card">
              <div className="stage-header">
                <h2 className="icon-heading">
                  <IconGlobe size={24} /> 1. El dilema espacial
                </h2>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.1fr 1fr',
                  gap: '22px',
                  alignItems: 'center',
                  marginBottom: '26px',
                }}
                className="two-col-grid"
              >
                <div style={{ display: 'grid', gap: '14px' }}>
                  <div className="info-panel">
                    <strong className="icon-label">
                      <IconGlobe size={16} /> Escenario
                    </strong>
                    <p style={{ marginTop: '6px', fontSize: '14.5px' }}>
                      {dilema.contexto.escenario}
                    </p>
                  </div>

                  <div
                    className="info-panel"
                    style={{
                      background: 'var(--accent-amber-bg)',
                      borderColor: 'var(--accent-amber)',
                    }}
                  >
                    <strong className="icon-label" style={{ color: 'var(--accent-amber)' }}>
                      <IconScale size={16} /> Tensión ética
                    </strong>
                    <p style={{ marginTop: '6px', fontSize: '14.5px' }}>
                      {dilema.contexto.conflictoEtico}
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    background: '#05060A',
                    padding: '12px',
                    borderRadius: '10px',
                  }}
                >
                  <Space3DViewer initialMode={dilema.modo3D || 'marte'} compact={true} />
                </div>
              </div>

              {/* Pestañas interactivas para explorar el contexto sin saturar la pantalla */}
              <div className="actor-tabs" style={{ marginBottom: '16px' }}>
                <button
                  type="button"
                  className={`actor-tab-btn icon-btn ${tabContexto === 'datos' ? 'active' : ''}`}
                  onClick={() => setTabContexto('datos')}
                >
                  <IconFlask size={15} /> Datos reales vs. Supuestos
                </button>
                <button
                  type="button"
                  className={`actor-tab-btn icon-btn ${tabContexto === 'actores' ? 'active' : ''}`}
                  onClick={() => setTabContexto('actores')}
                >
                  <IconUsers size={15} /> Actores ({dilema.actores.length})
                </button>
                {dilema.capsulas?.length > 0 && (
                  <button
                    type="button"
                    className={`actor-tab-btn icon-btn ${
                      tabContexto === 'capsulas' ? 'active' : ''
                    }`}
                    onClick={() => setTabContexto('capsulas')}
                  >
                    <IconLightbulb size={15} /> Sabías que...
                  </button>
                )}
              </div>

              {tabContexto === 'datos' && (
                <div className="two-col-grid">
                  <div className="info-panel">
                    <span className="panel-pill pill-science">Evidencia científica</span>
                    <ul className="clean-list" style={{ marginTop: '10px' }}>
                      {dilema.contexto.evidenciaCientifica.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="info-panel">
                    <span className="panel-pill pill-context">Supuestos del caso</span>
                    <ul className="clean-list" style={{ marginTop: '10px' }}>
                      {dilema.contexto.supuestosEscenario.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {tabContexto === 'actores' && (
                <div className="actor-detail-box">
                  <div className="actor-tabs" style={{ marginTop: 0, marginBottom: '14px' }}>
                    {dilema.actores.map((actor) => (
                      <button
                        key={actor.id}
                        type="button"
                        className={`filter-btn ${actorActivo === actor.id ? 'active' : ''}`}
                        onClick={() => setActorActivo(actor.id)}
                      >
                        {actor.nombre}
                      </button>
                    ))}
                  </div>

                  {actorSeleccionado && (
                    <div className="two-col-grid">
                      <div>
                        <span className="actor-role-badge">{actorSeleccionado.rol}</span>
                        <p style={{ marginTop: '8px', fontSize: '14px' }}>
                          {actorSeleccionado.intereses}
                        </p>
                      </div>
                      <div className="info-panel" style={{ background: 'var(--bg-surface)' }}>
                        <strong style={{ fontSize: '13px' }}>Postura:</strong>
                        <p style={{ marginTop: '4px', fontSize: '14px' }}>
                          {actorSeleccionado.argumentoCentral}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {tabContexto === 'capsulas' && (
                <div className="two-col-grid">
                  {dilema.capsulas.map((cap, idx) => (
                    <div key={idx} className="info-panel">
                      <h4 style={{ marginBottom: '6px', fontSize: '15px' }}>{cap.titulo}</h4>
                      <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                        {cap.contenido}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <div className="stage-footer">
                <span />
                <button className="btn-primary btn-lg" onClick={() => irAMomento(2)}>
                  Iniciar diálogo filosófico →
                </button>
              </div>
            </section>
          )}

          {/* =============================================================== */}
          {/* MOMENTO 2: DIÁLOGO Y EXPERIMENTOS (SEPARADOS EN 2 PESTAÑAS)     */}
          {/* =============================================================== */}
          {momentoActual === 2 && (
            <section className="stage-card">
              <div
                className="stage-header"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}
              >
                <h2 className="icon-heading" style={{ margin: 0 }}>
                  <IconChatBranch size={24} /> 2. Diálogo interactivo
                </h2>

                {/* Selector entre Árbol de diálogo y Experimentos mentales */}
                <div className="actor-tabs" style={{ margin: 0 }}>
                  <button
                    type="button"
                    className={`actor-tab-btn icon-btn ${
                      subTabMomento2 === 'dialogo' ? 'active' : ''
                    }`}
                    onClick={() => setSubTabMomento2('dialogo')}
                  >
                    <IconChatBranch size={15} /> Preguntas ramificadas
                  </button>
                  <button
                    type="button"
                    className={`actor-tab-btn icon-btn ${
                      subTabMomento2 === 'experimentos' ? 'active' : ''
                    }`}
                    onClick={() => setSubTabMomento2('experimentos')}
                  >
                    <IconSpark size={15} /> Experimentos mentales (
                    {dilema.experimentosMentales.length})
                  </button>
                </div>
              </div>

              {subTabMomento2 === 'dialogo' ? (
                <>
                  {/* Migas de pan compactas para regresar a cualquier paso anterior */}
                  {historialDialogo.length > 0 && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '8px',
                        marginBottom: '18px',
                        padding: '10px 14px',
                        background: 'var(--bg-page)',
                        borderRadius: '8px',
                        border: '1px solid var(--border-color)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>
                          Tu ruta:
                        </span>
                        {historialDialogo.map((item, idx) => (
                          <button
                            key={item.nodoId}
                            type="button"
                            className="filter-btn"
                            style={{ padding: '4px 10px', minHeight: '30px', fontSize: '12px' }}
                            onClick={() => regresarANodo(idx)}
                            title={item.pregunta}
                          >
                            {idx + 1}. {item.etiquetaCorta} ↺
                          </button>
                        ))}
                      </div>
                      <button
                        type="button"
                        className="text-button"
                        style={{ padding: 0, fontSize: '12px' }}
                        onClick={reiniciarArbolDialogo}
                      >
                        Reiniciar
                      </button>
                    </div>
                  )}

                  {/* Tarjeta de la pregunta activa */}
                  {nodoActual && (
                    <div className="committee-prompt-box" style={{ marginBottom: 0 }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '10px',
                        }}
                      >
                        <span className="panel-pill pill-science">{nodoActual.etiquetaPaso}</span>
                        {nodoActual.perspectivaRelacionada && (
                          <span className="panel-pill pill-context">
                            {nodoActual.perspectivaRelacionada}
                          </span>
                        )}
                      </div>

                      <h3 className="committee-question" style={{ marginBottom: '18px' }}>
                        «{nodoActual.pregunta}»
                      </h3>

                      {nodoActual.tipo === 'alternativa' && (
                        <div style={{ display: 'grid', gap: '10px' }}>
                          {nodoActual.alternativas.map((alt) => {
                            const yaElegida = historialDialogo.some(
                              (h) => h.nodoId === nodoActual.id && h.respuestaId === alt.id
                            )
                            return (
                              <button
                                key={alt.id}
                                type="button"
                                className={`decision-option-card ${yaElegida ? 'selected' : ''}`}
                                style={{ textAlign: 'left', width: '100%', padding: '16px 20px' }}
                                onClick={() => seleccionarAlternativaNodo(nodoActual, alt)}
                              >
                                <div className="decision-option-top" style={{ marginBottom: '4px' }}>
                                  <h3>{alt.etiquetaCorta}</h3>
                                </div>
                                <p style={{ margin: 0 }}>{alt.texto}</p>
                              </button>
                            )
                          })}
                        </div>
                      )}

                      {nodoActual.tipo === 'respuesta_abierta' && (
                        <div>
                          <textarea
                            rows={3}
                            className="solid-textarea"
                            placeholder={nodoActual.placeholder}
                            value={respuestaAbiertaRama}
                            onChange={(e) => setRespuestaAbiertaRama(e.target.value)}
                          />
                          <div style={{ marginTop: '14px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            <button
                              type="button"
                              className="btn-primary"
                              onClick={() => {
                                if (respuestaAbiertaRama && !principioImportante) {
                                  setPrincipioImportante(respuestaAbiertaRama)
                                }
                                setNodoActualId('fin_dialogo')
                                setSubTabMomento2('experimentos')
                                onSaveProgress({
                                  ...construirRegistro(2, false),
                                  nodoActualId: 'fin_dialogo',
                                })
                              }}
                            >
                              Guardar y probar experimentos mentales →
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {nodoActualId === 'fin_dialogo' && (
                    <div
                      className="summary-banner-solid"
                      style={{
                        background: 'var(--accent-green-bg)',
                        border: '1px solid var(--accent-green)',
                        marginBottom: 0,
                      }}
                    >
                      <div>
                        <h4 style={{ color: 'var(--accent-green)', marginBottom: '4px' }}>
                          ✓ Rama de preguntas completada
                        </h4>
                        <p style={{ margin: 0, fontSize: '14px' }}>
                          {respuestaAbiertaRama || 'Ahora puedes poner a prueba tu postura con los experimentos mentales.'}
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          type="button"
                          className="btn-primary btn-sm"
                          onClick={() => setSubTabMomento2('experimentos')}
                        >
                          Ir a Experimentos mentales →
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* PESTAÑA DE EXPERIMENTOS MENTALES */
                <div>
                  <div className="actor-tabs" style={{ marginTop: 0, marginBottom: '14px' }}>
                    {dilema.experimentosMentales.map((exp, idx) => {
                      const evaluado = Boolean(experimentosEvaluados[exp.id]?.postura)
                      return (
                        <button
                          key={exp.id}
                          type="button"
                          className={`filter-btn ${experimentoActivoIdx === idx ? 'active' : ''}`}
                          onClick={() => setExperimentoActivoIdx(idx)}
                        >
                          {evaluado ? '✓ ' : ''}Caso hipotético {idx + 1}
                        </button>
                      )
                    })}
                  </div>

                  {(() => {
                    const expActual =
                      dilema.experimentosMentales[experimentoActivoIdx] ||
                      dilema.experimentosMentales[0]
                    const estadoExp = experimentosEvaluados[expActual.id] || {
                      postura: '',
                      reflexion: '',
                    }

                    return (
                      <div className="actor-detail-box">
                        <div className="actor-detail-header">
                          <h4>{expActual.titulo}</h4>
                          <span className="panel-pill pill-context">Escenario hipotético</span>
                        </div>

                        <p style={{ marginTop: '12px', marginBottom: '14px', fontSize: '15px' }}>
                          {expActual.escenarioHipotetico}
                        </p>

                        <div style={{ marginBottom: '14px' }}>
                          <strong style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
                            {expActual.pregunta}
                          </strong>
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {[
                              { id: 'mantiene', label: 'Mantengo mi postura' },
                              { id: 'matiza', label: 'La matizo' },
                              { id: 'cambia', label: 'Cambio de postura' },
                            ].map((op) => (
                              <button
                                key={op.id}
                                type="button"
                                className={
                                  estadoExp.postura === op.id
                                    ? 'btn-primary btn-sm'
                                    : 'btn-secondary btn-sm'
                                }
                                onClick={() =>
                                  actualizarExperimento(expActual.id, 'postura', op.id)
                                }
                              >
                                {op.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <input
                          type="text"
                          className="solid-input"
                          placeholder="¿Qué elemento mantuvo o cambió tu evaluación? (Opcional)"
                          value={estadoExp.reflexion}
                          onChange={(e) =>
                            actualizarExperimento(expActual.id, 'reflexion', e.target.value)
                          }
                        />
                      </div>
                    )
                  })()}
                </div>
              )}

              <div className="stage-footer">
                <button className="btn-secondary" onClick={() => irAMomento(1)}>
                  ← El dilema
                </button>
                <button className="btn-primary btn-lg" onClick={() => irAMomento(3)}>
                  Ver perspectivas filosóficas →
                </button>
              </div>
            </section>
          )}

          {/* =============================================================== */}
          {/* MOMENTO 3: PERSPECTIVAS FILOSÓFICAS (CONCISO Y VISUAL)          */}
          {/* =============================================================== */}
          {momentoActual === 3 && (
            <section className="stage-card">
              <div
                className="stage-header"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}
              >
                <h2 className="icon-heading" style={{ margin: 0 }}>
                  <IconCompass size={24} /> 3. Perspectivas filosóficas
                </h2>

                <button
                  type="button"
                  className="btn-secondary btn-sm"
                  onClick={() => setVistaComparativa(!vistaComparativa)}
                >
                  {vistaComparativa ? 'Ver una por una' : 'Comparar las 3 a la vez'}
                </button>
              </div>

              {!vistaComparativa ? (
                <>
                  <div className="philosophy-tabs" style={{ marginTop: 0 }}>
                    {[
                      { id: 'utilitarismo', label: 'Utilitarismo' },
                      { id: 'deontologia', label: 'Deontología' },
                      { id: 'justiciaDistributiva', label: 'Justicia distributiva' },
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        className={`philo-tab-btn ${perspectivaTab === t.id ? 'active' : ''}`}
                        onClick={() => setPerspectivaTab(t.id)}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>

                  {(() => {
                    const p = dilema.perspectivas[perspectivaTab]
                    const fichaId =
                      perspectivaTab === 'justiciaDistributiva'
                        ? 'justicia-distributiva'
                        : perspectivaTab
                    const ficha = perspectivasBiblioteca.find((f) => f.id === fichaId)

                    return (
                      <div className="philo-analysis-box">
                        <div className="philo-box-top">
                          <div>
                            <h3>{p.nombre}</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>
                              {p.subtitulo} · <em>{p.autores}</em>
                            </p>
                          </div>
                          {ficha && (
                            <button
                              type="button"
                              className="btn-secondary btn-sm icon-btn"
                              onClick={() => setFichaModal(ficha)}
                            >
                              <IconBook size={14} /> Ficha completa
                            </button>
                          )}
                        </div>

                        <div className="four-elements-grid">
                          <div className="element-card element-highlight">
                            <span className="element-num">1 · Cómo interpreta el caso</span>
                            <p>{p.interpretacion}</p>
                          </div>

                          <div className="element-card">
                            <span className="element-num">2 · Pregunta que te plantea</span>
                            <p className="emphasized-quote">«{p.preguntasPropias[0]}»</p>
                            <input
                              type="text"
                              className="solid-input"
                              style={{ marginTop: '10px', padding: '10px 12px' }}
                              placeholder="Tu respuesta breve (opcional)..."
                              value={respuestasAPerspectivas[perspectivaTab] || ''}
                              onChange={(e) =>
                                setRespuestasAPerspectivas((prev) => ({
                                  ...prev,
                                  [perspectivaTab]: e.target.value,
                                }))
                              }
                            />
                          </div>

                          <div
                            className="element-card element-challenge"
                            style={{ gridColumn: '1 / -1' }}
                          >
                            <span className="element-num">3 · Objeción desde {p.nombre}</span>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                gap: '12px',
                              }}
                            >
                              <p className="emphasized-quote" style={{ margin: 0, flex: 1 }}>
                                «{p.objecion}»
                              </p>
                              <button
                                type="button"
                                className="btn-secondary btn-sm"
                                onClick={() => setObjecionSeleccionada(p.objecion)}
                              >
                                Usar esta objeción
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })()}
                </>
              ) : (
                <div className="three-col-comparison">
                  {[
                    { key: 'utilitarismo', fichaId: 'utilitarismo' },
                    { key: 'deontologia', fichaId: 'deontologia' },
                    { key: 'justiciaDistributiva', fichaId: 'justicia-distributiva' },
                  ].map(({ key, fichaId }) => {
                    const p = dilema.perspectivas[key]
                    const ficha = perspectivasBiblioteca.find((f) => f.id === fichaId)
                    return (
                      <div key={key} className="comparison-column-card">
                        <h3>{p.nombre}</h3>
                        <p className="small-muted">{p.autores}</p>

                        <div className="comp-section">
                          <strong>Interpretación:</strong>
                          <p>{p.interpretacion}</p>
                        </div>

                        <div className="comp-section">
                          <strong>Pregunta:</strong>
                          <p>«{p.preguntasPropias[0]}»</p>
                        </div>

                        <div className="comp-section comp-challenge">
                          <strong>Objeción:</strong>
                          <p>«{p.objecion}»</p>
                        </div>

                        {ficha && (
                          <button
                            type="button"
                            className="btn-secondary btn-sm btn-full"
                            style={{ marginTop: '12px' }}
                            onClick={() => setFichaModal(ficha)}
                          >
                            Ver ficha
                          </button>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}

              <div className="stage-footer">
                <button className="btn-secondary" onClick={() => irAMomento(2)}>
                  ← Diálogo
                </button>
                <button className="btn-primary btn-lg" onClick={() => irAMomento(4)}>
                  Responder objeciones →
                </button>
              </div>
            </section>
          )}

          {/* =============================================================== */}
          {/* MOMENTO 4: OBJECIONES Y CONSTRUCCIÓN DE POSTURA                 */}
          {/* =============================================================== */}
          {momentoActual === 4 && (
            <section className="stage-card">
              <div
                className="stage-header"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '10px',
                }}
              >
                <h2 className="icon-heading" style={{ margin: 0 }}>
                  <IconShieldQuestion size={24} /> 4. Objeciones y defensa
                </h2>

                <div className="actor-tabs" style={{ margin: 0 }}>
                  {[
                    { id: 'ruta_a_si', label: 'Ruta Sí' },
                    { id: 'ruta_b_no', label: 'Ruta No' },
                    { id: 'ruta_c_depende', label: 'Ruta Depende' },
                  ].map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      className={`filter-btn ${rutaObjecionActiva === r.id ? 'active' : ''}`}
                      onClick={() => {
                        setRutaObjecionActiva(r.id)
                        const nuevaObj = dilema.objecionesPorRuta?.[r.id]?.objecionPrincipal
                        if (nuevaObj) setObjecionSeleccionada(nuevaObj)
                      }}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {datosObjecionActiva && (
                <div
                  className="element-card element-challenge"
                  style={{ marginBottom: '20px' }}
                >
                  <span className="element-num">
                    {datosObjecionActiva.titulo} · {datosObjecionActiva.perspectivaObjecion}
                  </span>
                  <p className="emphasized-quote" style={{ margin: 0 }}>
                    {objecionSeleccionada || datosObjecionActiva.objecionPrincipal}
                  </p>
                </div>
              )}

              <div className="reflection-questions-grid">
                <div className="form-group">
                  <label>¿Cómo defiendes o matizas tu argumento frente a esta objeción?</label>
                  <textarea
                    rows={3}
                    className="solid-textarea"
                    placeholder="Escribe tu respuesta a la objeción..."
                    value={respuestaAObjecion}
                    onChange={(e) => setRespuestaAObjecion(e.target.value)}
                  />
                </div>

                <div className="initial-record-box" style={{ marginBottom: 0 }}>
                  <label
                    style={{
                      display: 'block',
                      fontWeight: 600,
                      fontSize: '14px',
                      marginBottom: '10px',
                    }}
                  >
                    Tu posición actual tras evaluar la objeción:
                  </label>
                  <div
                    style={{
                      display: 'flex',
                      gap: '8px',
                      flexWrap: 'wrap',
                      marginBottom: '12px',
                    }}
                  >
                    {[
                      'Mantiene su postura inicial',
                      'Matiza su postura con condiciones',
                      'Modifica su postura inicial',
                    ].map((est) => (
                      <button
                        key={est}
                        type="button"
                        className={
                          posicionActualEstado === est
                            ? 'btn-primary btn-sm'
                            : 'btn-secondary btn-sm'
                        }
                        onClick={() => setPosicionActualEstado(est)}
                      >
                        {est}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    className="solid-input"
                    placeholder="Resume en una frase tu postura final..."
                    value={posicionActualTexto}
                    onChange={(e) => setPosicionActualTexto(e.target.value)}
                  />
                </div>
              </div>

              <div className="stage-footer">
                <button className="btn-secondary" onClick={() => irAMomento(3)}>
                  ← Perspectivas
                </button>
                <button className="btn-primary btn-lg" onClick={() => irAMomento(5, true)}>
                  Ir al cierre de la deliberación →
                </button>
              </div>
            </section>
          )}

          {/* =============================================================== */}
          {/* MOMENTO 5: CIERRE DE LA DELIBERACIÓN                            */}
          {/* =============================================================== */}
          {momentoActual === 5 && (
            <section className="stage-card">
              <div className="stage-header">
                <h2 className="icon-heading">
                  <IconCheckCircle size={24} /> 5. Síntesis y preguntas abiertas
                </h2>
              </div>

              <div className="two-col-grid">
                <div className="comparison-box box-initial">
                  <span className="comparison-tag">Inicio del recorrido</span>
                  <p>
                    <strong>1) Posición inicial:</strong>{' '}
                    {posicionInicial || historialDialogo[0]?.respuestaTexto || '(Sin registrar)'}
                  </p>
                  <p style={{ marginTop: '8px' }}>
                    <strong>2) Valor clave:</strong> {principioImportante || '(Sin registrar)'}
                  </p>
                </div>

                <div className="comparison-box box-final">
                  <span className="comparison-tag tag-accent">Evolución y defensa</span>
                  <p>
                    <strong>4) Respuesta a la objeción:</strong>{' '}
                    {respuestaAObjecion || '(Sin registrar)'}
                  </p>
                  <p style={{ marginTop: '8px' }}>
                    <strong>5) Posición actual ({posicionActualEstado}):</strong>{' '}
                    {posicionActualTexto || '(Consolidada)'}
                  </p>
                </div>
              </div>

              <div className="subsection-block">
                <h3>Preguntas de cierre</h3>
                <div className="reflection-questions-grid">
                  <div className="form-group">
                    <label>1. ¿Qué argumento consideras más sólido para defender tu postura?</label>
                    <input
                      type="text"
                      className="solid-input"
                      placeholder="El argumento más convincente..."
                      value={cierreArgumentoSolido}
                      onChange={(e) => setCierreArgumentoSolido(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>2. ¿Qué objeción te resultó más difícil de responder?</label>
                    <input
                      type="text"
                      className="solid-input"
                      placeholder="El punto más exigente..."
                      value={cierreObjecionDificil}
                      onChange={(e) => setCierreObjecionDificil(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>3. ¿Qué pregunta permanece abierta después de la experiencia?</label>
                    <input
                      type="text"
                      className="solid-input"
                      placeholder="Una pregunta abierta para discutir en clases..."
                      value={cierrePreguntaAbierta}
                      onChange={(e) => setCierrePreguntaAbierta(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="export-actions-bar">
                <div className="export-buttons">
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={guardarRecorridoFinal}
                  >
                    Guardar en «Mi recorrido»
                  </button>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={copiarResumen}
                  >
                    Copiar síntesis
                  </button>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={descargarResumenTxt}
                  >
                    Descargar (.txt)
                  </button>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={onGoToJourney}
                  >
                    Ver «Mi recorrido» →
                  </button>
                </div>

                {(guardadoExitoso || mensajeCopiado) && (
                  <span className="status-pill-success">
                    {guardadoExitoso ? '✓ Guardado' : mensajeCopiado}
                  </span>
                )}
              </div>

              <div className="stage-footer">
                <button className="btn-secondary" onClick={() => irAMomento(4)}>
                  ← Objeciones
                </button>
                <button className="btn-primary" onClick={onBackToCatalog}>
                  Explorar otro dilema →
                </button>
              </div>
            </section>
          )}
        </div>

        {/* PANEL LATERAL COMPACTO CON LOS 5 PASOS DE LA POSTURA */}
        <aside className="stage-card" style={{ padding: '22px', position: 'sticky', top: '20px' }}>
          <h3 className="icon-heading" style={{ fontSize: '16px', marginBottom: '14px' }}>
            <IconScale size={18} /> Mi postura (5 pasos)
          </h3>

          <div style={{ display: 'grid', gap: '10px' }}>
            {[
              {
                num: '1',
                label: 'Posición inicial',
                val: posicionInicial || historialDialogo[0]?.etiquetaCorta || 'Pendiente',
              },
              {
                num: '2',
                label: 'Valor principal',
                val: principioImportante || 'Pendiente',
              },
              {
                num: '3',
                label: 'Objeción clave',
                val:
                  objecionSeleccionada ||
                  datosObjecionActiva?.titulo ||
                  'Pendiente',
              },
              {
                num: '4',
                label: 'Mi defensa',
                val: respuestaAObjecion || 'Pendiente',
              },
              {
                num: '5',
                label: 'Posición actual',
                val: posicionActualTexto || posicionActualEstado,
              },
            ].map((step) => (
              <div
                key={step.num}
                style={{
                  padding: '10px 12px',
                  background: 'var(--bg-page)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'flex-start',
                }}
              >
                <span
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: 'var(--accent-blue-bg)',
                    color: 'var(--primary-solid)',
                    fontSize: '11px',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                >
                  {step.num}
                </span>
                <div style={{ minWidth: 0 }}>
                  <strong style={{ fontSize: '12px', display: 'block' }}>{step.label}</strong>
                  <p
                    style={{
                      fontSize: '12.5px',
                      color: 'var(--text-secondary)',
                      margin: 0,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {step.val}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* Modal de datos científicos */}
      {mostrarModalCiencia && (
        <TheoryDialog onClose={() => setMostrarModalCiencia(false)}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
              paddingBottom: '12px',
              borderBottom: '1px solid var(--border-color)',
            }}
          >
            <h2 id="theory-title" className="icon-heading" style={{ fontSize: '20px' }}>
              <IconFlask size={20} /> Datos científicos del caso
            </h2>
            <button
              type="button"
              className="btn-secondary btn-sm"
              onClick={() => setMostrarModalCiencia(false)}
            >
              Cerrar ✕
            </button>
          </div>
          <div className="two-col-grid">
            <div className="info-panel">
              <h4 style={{ marginBottom: '8px' }}>Evidencia científica</h4>
              <ul className="clean-list">
                {dilema.contexto.evidenciaCientifica.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </div>
            <div className="info-panel">
              <h4 style={{ marginBottom: '8px' }}>Supuestos del escenario</h4>
              <ul className="clean-list">
                {dilema.contexto.supuestosEscenario.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </TheoryDialog>
      )}

      {/* Modal de biblioteca filosófica */}
      {fichaModal && (
        <TheoryDialog onClose={() => setFichaModal(null)}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
              paddingBottom: '12px',
              borderBottom: '1px solid var(--border-color)',
            }}
          >
            <h2 id="theory-title" className="icon-heading" style={{ fontSize: '20px' }}>
              <IconBook size={20} /> {fichaModal.nombre}
            </h2>
            <button
              type="button"
              className="btn-secondary btn-sm"
              onClick={() => setFichaModal(null)}
            >
              Cerrar ✕
            </button>
          </div>

          <div>
            <div className="actor-tabs" style={{ marginBottom: '14px' }}>
              {perspectivasBiblioteca.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className={`filter-btn ${fichaModal.id === f.id ? 'active' : ''}`}
                  onClick={() => setFichaModal(f)}
                >
                  {f.nombre}
                </button>
              ))}
            </div>

            <p>{fichaModal.definicion}</p>
            <p style={{ marginTop: '8px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
              <strong>Autores:</strong> {fichaModal.autores.join(', ')}
            </p>

            <div className="two-col-grid" style={{ marginTop: '14px' }}>
              <div className="info-panel">
                <h4 style={{ marginBottom: '6px' }}>Principios</h4>
                <ul className="clean-list">
                  {fichaModal.principiosCentrales.map((pr, idx) => (
                    <li key={idx}>{pr}</li>
                  ))}
                </ul>
              </div>
              <div className="info-panel">
                <h4 style={{ marginBottom: '6px' }}>Preguntas clave</h4>
                <ul className="clean-list">
                  {fichaModal.preguntasHabituales.map((pg, idx) => (
                    <li key={idx}>«{pg}»</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </TheoryDialog>
      )}
    </div>
  )
}
