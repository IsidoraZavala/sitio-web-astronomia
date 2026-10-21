import { useEffect, useState } from 'react'
import {
  IconBook,
  IconChatBranch,
  IconCheckCircle,
  IconCompass,
  IconGlobe,
  IconShieldQuestion,
  IconSpark,
} from './Icons'
import { Space3DViewer } from './Space3DViewer'
import { TypewriterTitle } from './TypewriterTitle'
import casoData from '../data/casoPiloto/casos.json'
import preguntasData from '../data/casoPiloto/preguntas.json'
import autoresData from '../data/casoPiloto/autores.json'
import testData from '../data/casoPiloto/test.json'
import fuentesData from '../data/casoPiloto/fuentes.json'
import { calcularAfinidadFilosofica } from '../utils/calcularAfinidad'

const PILOTO_STORAGE_KEY = 'orbita_etica_piloto_caso05_v1'

export function PilotDilemmaExperience({ onVolverAlCatalogo, onGuardarGlobal }) {
  // Estados principales de navegación de la ruta
  // fases: 'caso' | 'preguntas' | 'reflexion' | 'test' | 'resultados'
  const [faseActual, setFaseActual] = useState('caso')
  const [indicePregunta, setIndicePregunta] = useState(0)
  const [indiceAfirmacion, setIndiceAfirmacion] = useState(0)

  // Respuestas del usuario
  const [respuestasPreguntas, setRespuestasPreguntas] = useState({})
  const [reflexionTexto, setReflexionTexto] = useState('')
  const [respuestasTest, setRespuestasTest] = useState({})
  const [autorSeleccionadoId, setAutorSeleccionadoId] = useState('jonas')
  const [mostrarFuentesModal, setMostrarFuentesModal] = useState(false)

  // Cargar progreso previo de localStorage si existe
  useEffect(() => {
    try {
      const raw = localStorage.getItem(PILOTO_STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed.respuestasPreguntas) setRespuestasPreguntas(parsed.respuestasPreguntas)
        if (parsed.reflexionTexto) setReflexionTexto(parsed.reflexionTexto)
        if (parsed.respuestasTest) setRespuestasTest(parsed.respuestasTest)
        if (parsed.faseActual) setFaseActual(parsed.faseActual)
        if (typeof parsed.indicePregunta === 'number') setIndicePregunta(parsed.indicePregunta)
        if (typeof parsed.indiceAfirmacion === 'number') setIndiceAfirmacion(parsed.indiceAfirmacion)
      }
    } catch {
      // Continuar con estado inicial
    }
  }, [])

  // Guardar automáticamente en localStorage ante cambios
  useEffect(() => {
    const estadoAGuardar = {
      respuestasPreguntas,
      reflexionTexto,
      respuestasTest,
      faseActual,
      indicePregunta,
      indiceAfirmacion,
      ultimaActualizacion: new Date().toISOString(),
    }
    try {
      localStorage.setItem(PILOTO_STORAGE_KEY, JSON.stringify(estadoAGuardar))
      onGuardarGlobal?.({
        dilemaId: casoData.id,
        titulo: casoData.titulo,
        completado: faseActual === 'resultados' || (faseActual === 'reflexion' && reflexionTexto.trim().length > 10),
        momentoActual: faseActual === 'caso' ? 1 : faseActual === 'preguntas' ? 2 : faseActual === 'reflexion' ? 3 : faseActual === 'test' ? 4 : 5,
        faseActual,
      })
    } catch {
      // Continuar en memoria
    }
  }, [respuestasPreguntas, reflexionTexto, respuestasTest, faseActual, indicePregunta, indiceAfirmacion, onGuardarGlobal])

  const reiniciarRecorrido = () => {
    if (window.confirm('¿Deseas reiniciar este caso piloto y borrar tus respuestas guardadas?')) {
      setRespuestasPreguntas({})
      setReflexionTexto('')
      setRespuestasTest({})
      setFaseActual('caso')
      setIndicePregunta(0)
      setIndiceAfirmacion(0)
      localStorage.removeItem(PILOTO_STORAGE_KEY)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Cálculos de afinidad
  const afinidadesCalculadas = calcularAfinidadFilosofica(respuestasTest, testData, autoresData)
  const autorDetalle = autoresData.find((a) => a.id === autorSeleccionadoId) || autoresData[0]
  const afinidadDetalle = afinidadesCalculadas.find((a) => a.autorId === autorSeleccionadoId)

  // Pregunta actual
  const preguntaActual = preguntasData[indicePregunta]
  const respuestaSeleccionadaPregunta = respuestasPreguntas[preguntaActual?.id]
  const alternativaSeleccionada = preguntaActual?.alternativas.find(
    (alt) => alt.id === respuestaSeleccionadaPregunta
  )

  // Afirmación actual del test
  const afirmacionActual = testData.afirmaciones[indiceAfirmacion]
  const valorSeleccionadoAfirmacion = respuestasTest[afirmacionActual?.id]

  // Handlers
  const handleSeleccionarAlternativa = (altId) => {
    setRespuestasPreguntas((prev) => ({
      ...prev,
      [preguntaActual.id]: altId,
    }))
  }

  const handleSiguientePregunta = () => {
    if (indicePregunta < preguntasData.length - 1) {
      setIndicePregunta((prev) => prev + 1)
    } else {
      setFaseActual('reflexion')
    }
  }

  const handleAnteriorPregunta = () => {
    if (indicePregunta > 0) {
      setIndicePregunta((prev) => prev - 1)
    } else {
      setFaseActual('caso')
    }
  }

  const handleSeleccionarLikert = (valor) => {
    setRespuestasTest((prev) => ({
      ...prev,
      [afirmacionActual.id]: valor,
    }))
  }

  const handleSiguienteAfirmacion = () => {
    if (indiceAfirmacion < testData.afirmaciones.length - 1) {
      setIndiceAfirmacion((prev) => prev + 1)
    } else {
      setFaseActual('resultados')
    }
  }

  const handleAnteriorAfirmacion = () => {
    if (indiceAfirmacion > 0) {
      setIndiceAfirmacion((prev) => prev - 1)
    } else {
      setFaseActual('reflexion')
    }
  }

  return (
    <div className="pilot-experience-container">
      {/* BARRA SUPERIOR DE CONTEXTO */}
      <div className="workspace-top-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <button className="text-button icon-btn" onClick={onVolverAlCatalogo}>
          ← Volver al catálogo de dilemas
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="pilot-badge-tag">CASO PILOTO · NUEVA RUTA</span>
          <button className="btn-secondary btn-sm" onClick={reiniciarRecorrido} title="Reiniciar todas las respuestas de este caso">
            Reiniciar caso ↻
          </button>
        </div>
      </div>

      {/* CABECERA DEL DILEMA */}
      <div className="workspace-header-box">
        <span className="section-kicker">CASO 05 · ASTRONOMÍA Y TECNOLOGÍA</span>
        <TypewriterTitle as="h1" text={casoData.titulo} speed={24} />
        <p className="workspace-subtitle">{casoData.subtitulo}</p>
      </div>

      {/* STEPPER DE NAVEGACIÓN EN 5 ETAPAS */}
      <nav className="pilot-stepper-nav" aria-label="Etapas del caso piloto">
        <button
          className={`pilot-step-btn ${faseActual === 'caso' ? 'active' : ''}`}
          onClick={() => setFaseActual('caso')}
        >
          <span className="pilot-step-num">1</span>
          <span className="pilot-step-label">Caso real</span>
        </button>

        <button
          className={`pilot-step-btn ${faseActual === 'preguntas' ? 'active' : Object.keys(respuestasPreguntas).length > 0 ? 'completed' : ''}`}
          onClick={() => setFaseActual('preguntas')}
        >
          <span className="pilot-step-num">2</span>
          <span className="pilot-step-label">
            Cuestionamiento ({Object.keys(respuestasPreguntas).length}/5)
          </span>
        </button>

        <button
          className={`pilot-step-btn ${faseActual === 'reflexion' ? 'active' : reflexionTexto.trim() ? 'completed' : ''}`}
          onClick={() => setFaseActual('reflexion')}
        >
          <span className="pilot-step-num">3</span>
          <span className="pilot-step-label">Reflexión final</span>
        </button>

        <button
          className={`pilot-step-btn ${faseActual === 'test' ? 'active' : Object.keys(respuestasTest).length > 0 ? 'completed' : ''}`}
          onClick={() => setFaseActual('test')}
        >
          <span className="pilot-step-num">4</span>
          <span className="pilot-step-label">Test filosófico (opcional)</span>
        </button>

        <button
          className={`pilot-step-btn ${faseActual === 'resultados' ? 'active' : ''}`}
          onClick={() => setFaseActual('resultados')}
          disabled={Object.keys(respuestasTest).length < 8}
          title={Object.keys(respuestasTest).length < 8 ? 'Completa las 8 afirmaciones para ver resultados' : ''}
        >
          <span className="pilot-step-num">5</span>
          <span className="pilot-step-label">Afinidad y autores</span>
        </button>
      </nav>

      {/* ========================================================================= */}
      {/* ETAPA 1: PRESENTACIÓN DEL CASO REAL                                       */}
      {/* ========================================================================= */}
      {faseActual === 'caso' && (
        <div className="pilot-stage-card stage-card">
          <div className="pilot-grid-intro">
            <div>
              <div className="stage-header">
                <h2>El conflicto en los hechos</h2>
              </div>
              <p className="pilot-lead-text">{casoData.resumen}</p>

              {/* SECCIONES DESPLEGABLES */}
              <div className="pilot-accordion-group">
                <details className="pilot-disclosure" open>
                  <summary>
                    <strong>¿Qué está ocurriendo en la órbita baja?</strong>
                  </summary>
                  <p>{casoData.queEstaOcurriendo}</p>
                </details>

                <details className="pilot-disclosure" open>
                  <summary>
                    <strong>¿Por qué es un dilema ético profundo?</strong>
                  </summary>
                  <p>{casoData.porQueEsDilemaEtico}</p>
                </details>
              </div>

              {/* FUENTES Y BOTONES */}
              <div className="pilot-action-bar">
                <button
                  className="btn-primary btn-lg icon-btn"
                  onClick={() => {
                    setFaseActual('preguntas')
                  }}
                >
                  <IconChatBranch size={18} /> Comenzar la reflexión →
                </button>

                <button
                  className="btn-secondary btn-lg icon-btn"
                  onClick={() => setMostrarFuentesModal(!mostrarFuentesModal)}
                >
                  <IconBook size={18} />
                  {mostrarFuentesModal ? 'Ocultar fuentes' : 'Consultar fuentes originales (4)'}
                </button>
              </div>
            </div>

            {/* VISOR 3D Y CONTEXTO VISUAL */}
            <div className="pilot-visual-box">
              <div style={{ background: '#05060A', borderRadius: '10px', overflow: 'hidden', padding: '10px' }}>
                <Space3DViewer initialMode="orbita" compact={false} />
              </div>
              <p className="visual-caption" style={{ marginTop: '10px' }}>
                Simulación: Tráfico en órbita terrestre baja (LEO) cruzando los campos de visión astronómicos.
              </p>
            </div>
          </div>

          {/* PANEL DE FUENTES ORIGINALES DESPLEGABLE */}
          {mostrarFuentesModal && (
            <div className="pilot-sources-panel">
              <h3 className="icon-heading" style={{ fontSize: '18px', marginBottom: '14px' }}>
                <IconGlobe size={18} /> Fuentes documentales y científicas originales
              </h3>
              <div className="pilot-sources-grid">
                {fuentesData.map((f) => (
                  <article key={f.id} className="pilot-source-card">
                    <span className="source-inst-tag">{f.institucion}</span>
                    <h4>{f.titulo}</h4>
                    <p>{f.descripcion}</p>
                    <a
                      href={f.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pilot-external-link icon-label"
                    >
                      Consultar informe oficial ↗
                    </a>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* ETAPA 2: RUTA DE CUESTIONAMIENTO FILOSÓFICO (5 PREGUNTAS)                 */}
      {/* ========================================================================= */}
      {faseActual === 'preguntas' && preguntaActual && (
        <div className="pilot-stage-card stage-card">
          {/* BARRA DE PROGRESO */}
          <div className="pilot-question-header">
            <div className="pilot-question-meta">
              <span className="pilot-dimension-badge">{preguntaActual.dimension}</span>
              <span className="pilot-progress-counter">
                Pregunta {indicePregunta + 1} de {preguntasData.length}
              </span>
            </div>
            <div className="reading-progress" style={{ marginTop: '8px' }}>
              <span
                style={{
                  width: `${((indicePregunta + 1) / preguntasData.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* EXPERIMENTO MENTAL NOTA SI APLICA */}
          {preguntaActual.esExperimentoMental && (
            <div className="pilot-hypo-box">
              <strong className="icon-heading">
                <IconSpark size={16} /> Experimento mental (Escenario hipotético):
              </strong>
              <p style={{ marginTop: '6px', fontSize: '13.5px' }}>
                Esta situación es explícitamente hipotética y busca poner a prueba la consistencia
                de tus principios cuando las variables se vuelven críticas.
              </p>
            </div>
          )}

          {/* ENUNCIADO DE LA PREGUNTA */}
          <h2 className="pilot-question-title">{preguntaActual.pregunta}</h2>
          <p className="pilot-question-instruction">
            Selecciona la alternativa que mejor represente tu criterio:
          </p>

          {/* ALTERNATIVAS A, B, C */}
          <div className="pilot-options-list">
            {preguntaActual.alternativas.map((alt) => {
              const estaSeleccionada = respuestaSeleccionadaPregunta === alt.id
              return (
                <button
                  key={alt.id}
                  className={`pilot-option-btn ${estaSeleccionada ? 'selected' : ''}`}
                  onClick={() => handleSeleccionarAlternativa(alt.id)}
                >
                  <span className="pilot-option-letter">{alt.letra}</span>
                  <span className="pilot-option-text">{alt.texto}</span>
                </button>
              )
            })}
          </div>

          {/* CUESTIONAMIENTO DE SEGUIMIENTO ESPECÍFICO */}
          {alternativaSeleccionada && (
            <div className="pilot-followup-box">
              <div className="pilot-followup-header">
                <IconShieldQuestion size={20} />
                <strong>Cuestionamiento a tu elección:</strong>
              </div>
              <p className="pilot-followup-text">
                «{alternativaSeleccionada.cuestionamiento}»
              </p>
              <p className="pilot-followup-tip">
                Tómate un instante para evaluar esta objeción. Si lo deseas, puedes cambiar tu
                alternativa antes de continuar.
              </p>
            </div>
          )}

          {/* BOTONES ANTERIOR / CONTINUAR */}
          <div className="stage-footer" style={{ marginTop: '34px' }}>
            <button className="btn-secondary icon-btn" onClick={handleAnteriorPregunta}>
              ← {indicePregunta === 0 ? 'Volver al caso' : 'Pregunta anterior'}
            </button>

            <button
              className="btn-primary btn-lg icon-btn"
              onClick={handleSiguientePregunta}
              disabled={!respuestaSeleccionadaPregunta}
            >
              {indicePregunta === preguntasData.length - 1
                ? 'Pasar a la reflexión final →'
                : 'Siguiente pregunta →'}
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ETAPA 3: REFLEXIÓN FINAL ABIERTA                                          */}
      {/* ========================================================================= */}
      {faseActual === 'reflexion' && (
        <div className="pilot-stage-card stage-card">
          <div className="stage-header">
            <h2>Reflexión final e integración</h2>
          </div>

          {/* RESUMEN DE LAS RESPUESTAS ELEGIDAS */}
          <div className="pilot-summary-pill-box">
            <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '10px' }}>
              Tus respuestas durante el recorrido:
            </h3>
            <div className="pilot-answers-summary-grid">
              {preguntasData.map((p, idx) => {
                const altId = respuestasPreguntas[p.id]
                const alt = p.alternativas.find((a) => a.id === altId)
                return (
                  <div key={p.id} className="pilot-summary-item">
                    <span className="pilot-summary-num">P{idx + 1}</span>
                    <div>
                      <strong>{p.dimension}:</strong>{' '}
                      <span>{alt ? `${alt.letra}. ${alt.texto}` : 'Sin responder'}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <p className="pilot-lead-text" style={{ marginTop: '22px' }}>
            A lo largo de este recorrido has considerado los beneficios sociales de los satélites,
            sus impactos científicos, las responsabilidades de los actores involucrados y los límites
            del progreso tecnológico.
          </p>

          <p style={{ fontWeight: '600', fontSize: '16px', color: 'var(--text-primary)', marginBottom: '14px' }}>
            Después de explorar estos conflictos, ¿qué condiciones consideras necesarias para que el
            despliegue de megaconstelaciones satelitales sea éticamente justificable?
          </p>

          <textarea
            className="pilot-textarea"
            rows={6}
            placeholder="Escribe tu reflexión argumentada aquí (menciona qué principios o condiciones consideras indispensables)..."
            value={reflexionTexto}
            onChange={(e) => setReflexionTexto(e.target.value)}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
            <span>Se guarda automáticamente en tu navegador.</span>
            <span>{reflexionTexto.trim().length} caracteres</span>
          </div>

          {/* INVITACIÓN OPCIONAL AL TEST */}
          <div className="pilot-test-invitation">
            <h3 className="icon-heading" style={{ fontSize: '18px', color: '#FFFFFF', marginBottom: '8px' }}>
              <IconCompass size={20} /> ¿Quieres descubrir con qué autores filosóficos se relacionan más tus ideas?
            </h3>
            <p style={{ color: '#CBD5E1', fontSize: '14px', maxWidth: '65ch', marginBottom: '18px' }}>
              El siguiente test opcional compara tus criterios con tres posiciones documentadas:
              <strong> Hans Jonas</strong> (responsabilidad y precaución), <strong>John Rawls</strong> (justicia y equidad)
              y <strong>Peter Singer</strong> (consecuencias y bienestar).
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button
                className="btn-primary btn-lg icon-btn"
                style={{ background: '#F59E0B', color: '#05060A', borderColor: '#F59E0B' }}
                onClick={() => {
                  setFaseActual('test')
                  setIndiceAfirmacion(0)
                }}
              >
                <IconSpark size={18} /> Realizar el test filosófico (opcional) →
              </button>

              <button
                className="btn-secondary btn-lg"
                style={{ background: '#131822', color: '#FFFFFF', borderColor: '#334155' }}
                onClick={() => {
                  alert('¡Has completado el recorrido de reflexión del caso piloto con éxito!')
                  onVolverAlCatalogo()
                }}
              >
                Finalizar recorrido sin realizar el test ✓
              </button>
            </div>
          </div>

          <div style={{ marginTop: '24px' }}>
            <button
              className="text-button icon-btn"
              onClick={() => {
                setFaseActual('preguntas')
                setIndicePregunta(preguntasData.length - 1)
              }}
            >
              ← Modificar respuestas a las preguntas
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ETAPA 4: TEST DE AFINIDAD FILOSÓFICA (8 AFIRMACIONES LIKERT 1-5)         */}
      {/* ========================================================================= */}
      {faseActual === 'test' && afirmacionActual && (
        <div className="pilot-stage-card stage-card">
          <div className="pilot-question-header">
            <div className="pilot-question-meta">
              <span className="pilot-dimension-badge">{afirmacionActual.eje}</span>
              <span className="pilot-progress-counter">
                Afirmación {indiceAfirmacion + 1} de {testData.afirmaciones.length}
              </span>
            </div>
            <div className="reading-progress" style={{ marginTop: '8px' }}>
              <span
                style={{
                  width: `${((indiceAfirmacion + 1) / testData.afirmaciones.length) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className="stage-header" style={{ marginTop: '14px' }}>
            <h2>Test de afinidad filosófica</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
              Indica tu grado de acuerdo con la siguiente afirmación para comparar tu postura con las tradiciones éticas de referencia.
            </p>
          </div>

          <div className="pilot-statement-box">
            <span className="pilot-statement-quote">“</span>
            <p className="pilot-statement-text">{afirmacionActual.texto}</p>
          </div>

          {/* ESCALA LIKERT 1 A 5 */}
          <div className="pilot-likert-scale">
            {testData.escala.map((item) => {
              const seleccionado = valorSeleccionadoAfirmacion === item.valor
              return (
                <button
                  key={item.valor}
                  className={`pilot-likert-btn ${seleccionado ? 'selected' : ''}`}
                  onClick={() => handleSeleccionarLikert(item.valor)}
                >
                  <span className="likert-value">{item.valor}</span>
                  <span className="likert-label">{item.etiqueta}</span>
                </button>
              )
            })}
          </div>

          {/* BOTONES ANTERIOR / SIGUIENTE */}
          <div className="stage-footer" style={{ marginTop: '36px' }}>
            <button className="btn-secondary icon-btn" onClick={handleAnteriorAfirmacion}>
              ← {indiceAfirmacion === 0 ? 'Volver a reflexión' : 'Afirmación anterior'}
            </button>

            <button
              className="btn-primary btn-lg icon-btn"
              onClick={handleSiguienteAfirmacion}
              disabled={!valorSeleccionadoAfirmacion}
            >
              {indiceAfirmacion === testData.afirmaciones.length - 1
                ? 'Ver resultados y afinidad →'
                : 'Siguiente afirmación →'}
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ETAPA 5: RESULTADOS: GRÁFICO DE AFINIDAD Y AUTORES                        */}
      {/* ========================================================================= */}
      {faseActual === 'resultados' && (
        <div className="pilot-stage-card stage-card">
          <div className="stage-header">
            <h2>Afinidad con corrientes filosóficas</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', maxWidth: '75ch' }}>
              A partir de tus respuestas en el test de ocho afirmaciones, este gráfico refleja tu grado de
              coincidencia con las tres posiciones éticas evaluadas.
            </p>
          </div>

          {/* GRÁFICO DE BARRAS DE AFINIDAD */}
          <div className="pilot-affinity-chart-card">
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>
              Porcentaje de coincidencia con las posturas evaluadas:
            </h3>

            <div className="pilot-bars-container">
              {afinidadesCalculadas.map((item) => (
                <div
                  key={item.autorId}
                  className={`pilot-bar-row ${autorSeleccionadoId === item.autorId ? 'active-author' : ''}`}
                  onClick={() => setAutorSeleccionadoId(item.autorId)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="pilot-bar-label-col">
                    <strong>{item.nombre}</strong>
                    <span className="pilot-bar-sub">{item.enfoque}</span>
                  </div>

                  <div className="pilot-bar-track-col">
                    <div className="pilot-bar-track">
                      <div
                        className="pilot-bar-fill"
                        style={{
                          width: `${item.porcentaje}%`,
                          backgroundColor:
                            item.autorId === 'jonas'
                              ? '#B85D19'
                              : item.autorId === 'rawls'
                              ? '#1D4E89'
                              : '#1E6B52',
                        }}
                      />
                    </div>
                  </div>

                  <div className="pilot-bar-value-col">
                    <span className="pilot-percent-tag">{item.porcentaje}%</span>
                  </div>
                </div>
              ))}
            </div>

            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '16px', fontStyle: 'italic' }}>
              * Los porcentajes representan afinidad con las afirmaciones evaluadas en este caso, no con la totalidad del
              pensamiento del autor. No tienen por qué sumar 100 % al tratarse de dimensiones independientes.
            </p>
          </div>

          {/* DETALLE Y EXPLICACIÓN DEL AUTOR SELECCIONADO */}
          {afinidadDetalle && autorDetalle && (
            <div className="pilot-author-details-box">
              <div className="pilot-author-tabs">
                {afinidadesCalculadas.map((item) => (
                  <button
                    key={item.autorId}
                    className={`pilot-author-tab-btn ${autorSeleccionadoId === item.autorId ? 'active' : ''}`}
                    onClick={() => setAutorSeleccionadoId(item.autorId)}
                  >
                    {item.nombre} ({item.porcentaje}%)
                  </button>
                ))}
              </div>

              <div className="pilot-author-card-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <h3 style={{ fontSize: '22px', fontWeight: '700' }}>{autorDetalle.nombre}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '13px', fontWeight: '500' }}>
                      Obra de referencia: <em>{autorDetalle.obraReferencia}</em>
                    </p>
                  </div>
                  <span className="pilot-affinity-score-badge">
                    Coincidencia: {afinidadDetalle.porcentaje}%
                  </span>
                </div>

                <div className="pilot-author-summary-section">
                  <h4 style={{ fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--primary-solid)', letterSpacing: '0.05em' }}>
                    Tesis central y aplicación al caso
                  </h4>
                  <p style={{ fontSize: '14px', lineHeight: '1.8', marginTop: '6px' }}>
                    {autorDetalle.resumenArgumento}
                  </p>
                  <p style={{ fontSize: '14px', lineHeight: '1.8', marginTop: '10px', background: 'var(--bg-subtle)', padding: '12px 16px', borderRadius: '6px' }}>
                    <strong>Aplicación a las megaconstelaciones:</strong> {autorDetalle.aplicacionCaso}
                  </p>
                </div>

                {/* COINCIDENCIAS Y DIFERENCIAS */}
                <div className="pilot-two-col-grid" style={{ marginTop: '20px' }}>
                  <div className="pilot-points-card">
                    <h5 className="icon-heading" style={{ color: 'var(--accent-green)', fontSize: '13.5px' }}>
                      <IconCheckCircle size={16} /> Ideas tuyas que coinciden con su postura:
                    </h5>
                    {afinidadDetalle.coincidencias.length > 0 ? (
                      <ul className="pilot-points-list">
                        {afinidadDetalle.coincidencias.map((c) => (
                          <li key={c.id}>
                            <strong>{c.eje}:</strong> «{c.texto}»
                            <span className="pilot-point-note"> (Tu respuesta: {c.tuRespuesta}/5)</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                        No se detectaron coincidencias fuertes en las afirmaciones discriminantes.
                      </p>
                    )}
                  </div>

                  <div className="pilot-points-card">
                    <h5 className="icon-heading" style={{ color: 'var(--accent-amber)', fontSize: '13.5px' }}>
                      <IconShieldQuestion size={16} /> Respuestas donde existen diferencias o tensiones:
                    </h5>
                    {afinidadDetalle.diferencias.length > 0 ? (
                      <ul className="pilot-points-list">
                        {afinidadDetalle.diferencias.map((d) => (
                          <li key={d.id}>
                            <strong>{d.eje}:</strong> «{d.texto}»
                            <span className="pilot-point-note"> (Tu respuesta: {d.tuRespuesta}/5 vs postura esperada: {d.posturaAutor}/5)</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                        Tus respuestas están altamente alineadas con las premisas evaluadas de este autor.
                      </p>
                    )}
                  </div>
                </div>

                {/* CITAS TEXTUALES CLAVE DEL AUTOR */}
                {autorDetalle.citasClave && autorDetalle.citasClave.length > 0 && (
                  <div className="pilot-quotes-section">
                    <h4
                      style={{
                        fontSize: '13px',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        color: 'var(--primary-solid)',
                        letterSpacing: '0.05em',
                        marginBottom: '10px',
                      }}
                    >
                      Citas textuales clave de la obra
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {autorDetalle.citasClave.map((c, i) => (
                        <blockquote key={i} className="pilot-quote-item">
                          <p
                            style={{
                              fontStyle: 'italic',
                              fontSize: '14px',
                              lineHeight: '1.7',
                              color: 'var(--text-primary)',
                            }}
                          >
                            «{c.cita}»
                          </p>
                          <footer
                            style={{
                              marginTop: '6px',
                              fontSize: '11.5px',
                              color: 'var(--text-muted)',
                            }}
                          >
                            — <strong>{c.referencia}</strong>: {c.contexto}
                          </footer>
                        </blockquote>
                      ))}
                    </div>
                  </div>
                )}

                {/* FUENTES DE ACCESO ABIERTO (SIN MUROS DE PAGO) */}
                <div
                  style={{
                    marginTop: '22px',
                    paddingTop: '16px',
                    borderTop: '1px solid var(--border-color)',
                  }}
                >
                  <h4
                    style={{
                      fontSize: '13px',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      color: 'var(--primary-solid)',
                      letterSpacing: '0.05em',
                      marginBottom: '10px',
                    }}
                  >
                    Lecturas académicas de acceso libre y gratuito (sin muros de pago):
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {autorDetalle.fuentesAccesoAbierto?.map((f, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          background: 'var(--bg-subtle)',
                          padding: '12px 16px',
                          borderRadius: '6px',
                          flexWrap: 'wrap',
                          gap: '10px',
                        }}
                      >
                        <div>
                          <strong style={{ fontSize: '13.5px', display: 'block' }}>
                            {f.titulo}
                          </strong>
                          <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                            {f.tipo} · {f.idioma}
                          </span>
                        </div>
                        <a
                          href={f.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pilot-external-link icon-label"
                          style={{ margin: 0, fontWeight: '700' }}
                        >
                          Leer en acceso abierto ↗
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* NOTA METODOLÓGICA TRANSPARENTE */}
          <div className="pilot-methodology-note">
            <strong>Transparencia metodológica:</strong>
            <p>{testData.notaValidacion}</p>
            <p style={{ marginTop: '6px' }}>
              El cálculo de afinidad se realiza mediante una función matemática transparente basada en la distancia normalizada
              y ponderada entre tu respuesta (1 a 5) y el perfil documentado de cada corriente ética, sin intervención de inteligencia artificial generativa.
            </p>
          </div>

          {/* BOTONES FINALES */}
          <div className="stage-footer" style={{ marginTop: '30px' }}>
            <button className="btn-secondary icon-btn" onClick={() => setFaseActual('test')}>
              ← Revisar test de afirmaciones
            </button>

            <button className="btn-secondary icon-btn" onClick={reiniciarRecorrido}>
              Reiniciar caso piloto ↻
            </button>

            <button className="btn-primary btn-lg icon-btn" onClick={onVolverAlCatalogo}>
              <IconCompass size={18} /> Explorar otros dilemas espaciales →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
