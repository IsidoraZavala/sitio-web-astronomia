import { useEffect, useState, useRef } from 'react'
import {
  IconBook,
  IconChatBranch,
  IconCheckCircle,
  IconCompass,
  IconGlobe,
  IconShieldQuestion,
  IconSpark,
} from './Icons'
import { TypewriterTitle } from './TypewriterTitle'
import casoData from '../data/directrizAmbiental/casos.json'
import preguntasData from '../data/directrizAmbiental/preguntas.json'
import reflexionData from '../data/directrizAmbiental/reflexion.json'
import autoresData from '../data/directrizAmbiental/autores.json'
import testData from '../data/directrizAmbiental/test.json'
import fuentesData from '../data/directrizAmbiental/fuentes.json'
import { calcularAfinidadFilosofica } from '../utils/calcularAfinidad'

const AMBIENTAL_STORAGE_KEY = 'orbita_etica_directriz_ambiental_v1'

const resolverRutaImagen = (ruta) => {
  if (!ruta) return ''
  if (ruta.startsWith('http://') || ruta.startsWith('https://')) return ruta
  const limpia = ruta.replace(/^\.?\//, '')
  const base = import.meta.env.BASE_URL || './'
  return `${base}${limpia}`
}

export function EnvironmentalDilemmaExperience({ onVolverAlCatalogo, onGuardarGlobal }) {
  // fases: 'caso' | 'preguntas' | 'reflexion' | 'test' | 'resultados'
  const [faseActual, setFaseActual] = useState('caso')
  const [fotoCarruselIdx, setFotoCarruselIdx] = useState(0)
  const [indicePregunta, setIndicePregunta] = useState(0)
  const [indiceReflexion, setIndiceReflexion] = useState(0)
  const [indiceAfirmacion, setIndiceAfirmacion] = useState(0)

  // Respuestas del estudiante
  const [respuestasPreguntas, setRespuestasPreguntas] = useState({})
  const [respuestasReflexion, setRespuestasReflexion] = useState({
    ref_1_postura: '',
    ref_2_critica: '',
    ref_3_norma: '',
  })
  const [respuestasTest, setRespuestasTest] = useState({})
  const [autorSeleccionadoId, setAutorSeleccionadoId] = useState('lin')
  const [mostrarFuentesModal, setMostrarFuentesModal] = useState(false)
  const [interludioCuestionamiento, setInterludioCuestionamiento] = useState(null)
  const [estaSaliendoInterludio, setEstaSaliendoInterludio] = useState(false)
  const salidaTimeoutRef = useRef(null)

  // Cargar estado de localStorage si existe
  useEffect(() => {
    try {
      const raw = localStorage.getItem(AMBIENTAL_STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed.respuestasPreguntas) setRespuestasPreguntas(parsed.respuestasPreguntas)
        if (parsed.respuestasReflexion) setRespuestasReflexion(parsed.respuestasReflexion)
        if (parsed.respuestasTest) setRespuestasTest(parsed.respuestasTest)
        if (parsed.faseActual) setFaseActual(parsed.faseActual)
        if (typeof parsed.indicePregunta === 'number') setIndicePregunta(parsed.indicePregunta)
        if (typeof parsed.indiceReflexion === 'number') setIndiceReflexion(parsed.indiceReflexion)
        if (typeof parsed.indiceAfirmacion === 'number') setIndiceAfirmacion(parsed.indiceAfirmacion)
      }
    } catch {
      // Continuar con valores iniciales
    }
  }, [])

  // Carrusel automático en la fase de contexto (cambia cada 8 segundos para dar tiempo a leer)
  useEffect(() => {
    if (faseActual !== 'caso') return
    const interval = setInterval(() => {
      setFotoCarruselIdx((prev) => (prev + 1) % (casoData.carruselFotos?.length || 1))
    }, 8000)
    return () => clearInterval(interval)
  }, [faseActual])

  const onGuardarGlobalRef = useRef(onGuardarGlobal)
  useEffect(() => {
    onGuardarGlobalRef.current = onGuardarGlobal
  }, [onGuardarGlobal])

  // Guardar en localStorage ante cambios
  useEffect(() => {
    const estado = {
      respuestasPreguntas,
      respuestasReflexion,
      respuestasTest,
      faseActual,
      indicePregunta,
      indiceReflexion,
      indiceAfirmacion,
      ultimaActualizacion: new Date().toISOString(),
    }
    try {
      localStorage.setItem(AMBIENTAL_STORAGE_KEY, JSON.stringify(estado))
      onGuardarGlobalRef.current?.({
        dilemaId: casoData.id,
        titulo: casoData.titulo,
        completado: faseActual === 'resultados',
        momentoActual:
          faseActual === 'caso'
            ? 1
            : faseActual === 'preguntas'
            ? 2
            : faseActual === 'reflexion'
            ? 3
            : faseActual === 'test'
            ? 4
            : 5,
        faseActual,
      })
    } catch {
      // Continuar en memoria
    }
  }, [
    respuestasPreguntas,
    respuestasReflexion,
    respuestasTest,
    faseActual,
    indicePregunta,
    indiceReflexion,
    indiceAfirmacion,
  ])

  const reiniciarRecorrido = () => {
    if (window.confirm('¿Deseas reiniciar esta experiencia ambiental y borrar tus respuestas guardadas?')) {
      setRespuestasPreguntas({})
      setRespuestasReflexion({ ref_1_postura: '', ref_2_critica: '', ref_3_norma: '' })
      setRespuestasTest({})
      setFaseActual('caso')
      setFotoCarruselIdx(0)
      setIndicePregunta(0)
      setIndiceReflexion(0)
      setIndiceAfirmacion(0)
      setInterludioCuestionamiento(null)
      setEstaSaliendoInterludio(false)
      if (salidaTimeoutRef.current) clearTimeout(salidaTimeoutRef.current)
      if (timerInterludioRef.current) clearTimeout(timerInterludioRef.current)
      localStorage.removeItem(AMBIENTAL_STORAGE_KEY)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Cálculos de afinidad con Lin, Newman y Cockell
  const afinidadesCalculadas = calcularAfinidadFilosofica(respuestasTest, testData, autoresData)
  const autorDetalle = autoresData.find((a) => a.id === autorSeleccionadoId) || autoresData[0]
  const afinidadDetalle = afinidadesCalculadas.find((a) => a.autorId === autorSeleccionadoId)

  // Datos actuales
  const fotoActual = casoData.carruselFotos?.[fotoCarruselIdx] || casoData.carruselFotos?.[0]
  const preguntaActual = preguntasData[indicePregunta]
  const fotoDePregunta = preguntaActual?.fotoVinculadaId
    ? casoData.carruselFotos?.find((f) => f.id === preguntaActual.fotoVinculadaId)
    : null

  const respuestaSeleccionadaPregunta = respuestasPreguntas[preguntaActual?.id]
  const alternativaSeleccionada = preguntaActual?.alternativas?.find(
    (alt) => alt.id === respuestaSeleccionadaPregunta
  )

  const afirmacionActual = testData.afirmaciones?.[indiceAfirmacion]
  const valorSeleccionadoAfirmacion = respuestasTest[afirmacionActual?.id]

  // Referencia al temporizador del interludio para cancelaciones seguras
  const timerInterludioRef = useRef(null)

  // Tiempo de lectura adaptativo (base 8 segundos, escalando hasta 12s para textos más extensos)
  const calcularTiempoLecturaMs = (texto) => {
    if (!texto) return 8000
    // Asumiendo una velocidad cómoda de lectura de ~22 caracteres por segundo
    const segs = Math.max(8, Math.min(12, Math.round(texto.length / 22)))
    return segs * 1000
  }

  // Handlers
  const handleSeleccionarAlternativa = (altId) => {
    setRespuestasPreguntas((prev) => ({
      ...prev,
      [preguntaActual.id]: altId,
    }))
  }

  const handleSiguientePregunta = () => {
    if (!alternativaSeleccionada) return
    const duracionMs = calcularTiempoLecturaMs(alternativaSeleccionada.cuestionamiento)
    setEstaSaliendoInterludio(false)
    // Activa la pantalla inmersiva de cuestionamiento con tiempo adaptativo
    setInterludioCuestionamiento({
      cuestionamiento: alternativaSeleccionada.cuestionamiento,
      letra: alternativaSeleccionada.letra,
      esUltimaPregunta: indicePregunta === preguntasData.length - 1,
      duracionMs,
      duracionSegundos: duracionMs / 1000,
    })
  }

  // Transición suave de salida del recuadro de cuestionamiento hacia la siguiente pregunta
  const iniciarSalidaInterludio = () => {
    if (!interludioCuestionamiento || estaSaliendoInterludio) return
    if (timerInterludioRef.current) {
      clearTimeout(timerInterludioRef.current)
      timerInterludioRef.current = null
    }

    // Activar animación CSS de salida suave
    setEstaSaliendoInterludio(true)

    // Esperar 320ms a que concluya el desvanecimiento para montar la nueva pregunta suavemente
    salidaTimeoutRef.current = setTimeout(() => {
      const esUltima = !!interludioCuestionamiento.esUltimaPregunta
      setInterludioCuestionamiento(null)
      setEstaSaliendoInterludio(false)
      if (esUltima) {
        setFaseActual('reflexion')
        setIndiceReflexion(0)
      } else {
        setIndicePregunta((prev) => Math.min(preguntasData.length - 1, prev + 1))
      }
    }, 320)
  }

  // Temporizador adaptativo (base 8 segundos) para el interludio de cuestionamiento
  useEffect(() => {
    if (!interludioCuestionamiento) return
    const ms = interludioCuestionamiento.duracionMs || 8000
    timerInterludioRef.current = setTimeout(() => {
      iniciarSalidaInterludio()
    }, ms)
    return () => {
      if (timerInterludioRef.current) {
        clearTimeout(timerInterludioRef.current)
        timerInterludioRef.current = null
      }
      if (salidaTimeoutRef.current) {
        clearTimeout(salidaTimeoutRef.current)
        salidaTimeoutRef.current = null
      }
    }
  }, [interludioCuestionamiento])

  const handleAnteriorPregunta = () => {
    if (salidaTimeoutRef.current) clearTimeout(salidaTimeoutRef.current)
    if (timerInterludioRef.current) clearTimeout(timerInterludioRef.current)
    setInterludioCuestionamiento(null)
    setEstaSaliendoInterludio(false)
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
      setIndiceReflexion(reflexionData.length - 1)
    }
  }

  return (
    <div className="pilot-experience-container environmental-experience">
      {/* BARRA SUPERIOR DE CONTEXTO */}
      <div
        className="workspace-top-bar"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <button className="text-button icon-btn" onClick={onVolverAlCatalogo}>
          ← Volver al catálogo de dilemas
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            className="btn-secondary btn-sm"
            onClick={reiniciarRecorrido}
            title="Reiniciar todas las respuestas de este caso"
          >
            Reiniciar caso ↻
          </button>
        </div>
      </div>

      {/* CABECERA DEL DILEMA: PREGUNTA CENTRAL COMO TÍTULO PRINCIPAL */}
      <div className="workspace-header-box">
        <TypewriterTitle as="h1" text={casoData.titulo} speed={18} />
      </div>

      {/* STEPPER DE NAVEGACIÓN EN 5 ETAPAS */}
      <nav className="pilot-stepper-nav" aria-label="Etapas de la directriz ambiental">
        <button
          className={`pilot-step-btn ${faseActual === 'caso' ? 'active' : ''}`}
          onClick={() => setFaseActual('caso')}
        >
          <span className="pilot-step-num">1</span>
          <span className="pilot-step-label">Contexto y fotos (5)</span>
        </button>

        <button
          className={`pilot-step-btn ${
            faseActual === 'preguntas'
              ? 'active'
              : Object.keys(respuestasPreguntas).length > 0
              ? 'completed'
              : ''
          }`}
          onClick={() => setFaseActual('preguntas')}
        >
          <span className="pilot-step-num">2</span>
          <span className="pilot-step-label">
            Decisiones ({Object.keys(respuestasPreguntas).length}/{preguntasData.length})
          </span>
        </button>

        <button
          className={`pilot-step-btn ${
            faseActual === 'reflexion'
              ? 'active'
              : Object.values(respuestasReflexion).some((t) => t.trim().length > 0)
              ? 'completed'
              : ''
          }`}
          onClick={() => setFaseActual('reflexion')}
        >
          <span className="pilot-step-num">3</span>
          <span className="pilot-step-label">Reflexión personal (3)</span>
        </button>

        <button
          className={`pilot-step-btn ${
            faseActual === 'test'
              ? 'active'
              : Object.keys(respuestasTest).length > 0
              ? 'completed'
              : ''
          }`}
          onClick={() => setFaseActual('test')}
        >
          <span className="pilot-step-num">4</span>
          <span className="pilot-step-label">
            Test de afinidad ({Object.keys(respuestasTest).length}/{testData.afirmaciones.length})
          </span>
        </button>

        <button
          className={`pilot-step-btn ${faseActual === 'resultados' ? 'active' : ''}`}
          onClick={() => setFaseActual('resultados')}
          disabled={Object.keys(respuestasTest).length < testData.afirmaciones.length}
          title={
            Object.keys(respuestasTest).length < testData.afirmaciones.length
              ? 'Completa las 8 afirmaciones del test para ver tus resultados de afinidad'
              : ''
          }
        >
          <span className="pilot-step-num">5</span>
          <span className="pilot-step-label">Afinidades filosóficas</span>
        </button>
      </nav>

      {/* ========================================================================= */}
      {/* ETAPA 1: PRESENTACIÓN Y CONTEXTUALIZACIÓN CON CARRUSEL AUTOMÁTICO         */}
      {/* ========================================================================= */}
      {faseActual === 'caso' && (
        <div className="pilot-stage-card stage-card">
          <div className="env-stage1-grid">
            {/* COLUMNA IZQUIERDA: PÁRRAFOS DE CONTEXTO CON DESLIZADOR INTERNO */}
            <div className="env-stage1-text-col">
              <h2 className="env-context-title">
                {casoData.tituloSeccion || 'Exploración espacial y objetos abandonados'}
              </h2>

              <div className="env-context-scrollbox">
                {(casoData.parrafos || [casoData.resumen]).map((parrafo, i) => (
                  <p key={i}>{parrafo}</p>
                ))}
              </div>
            </div>

            {/* COLUMNA DERECHA: CARRUSEL AUTOMÁTICO DE FOTOGRAFÍAS */}
            <div className="env-stage1-carousel-col">
              <div className="env-auto-carousel-card">
                <div className="env-auto-img-frame">
                  <img
                    src={resolverRutaImagen(fotoActual.archivoImagen)}
                    alt={fotoActual.titulo}
                    className="env-auto-img"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                      if (e.currentTarget.nextElementSibling) {
                        e.currentTarget.nextElementSibling.style.display = 'flex'
                      }
                    }}
                  />
                  <div className="env-img-fallback" style={{ display: 'none' }}>
                    <IconGlobe size={32} />
                    <span>{fotoActual.titulo}</span>
                  </div>
                </div>

                <div className="env-auto-caption">
                  <h3 className="env-caption-title">{fotoActual.titulo}</h3>
                  <p className="env-caption-desc">{fotoActual.descripcion}</p>
                  <div className="env-caption-credit">
                    <strong>Crédito / Fuente:</strong> {fotoActual.credito}
                  </div>
                </div>

                {/* Indicadores de navegación sutiles */}
                <div className="env-carousel-dots" aria-label="Indicadores del carrusel de fotos">
                  {casoData.carruselFotos.map((f, idx) => (
                    <button
                      key={f.id}
                      className={`env-dot-btn ${fotoCarruselIdx === idx ? 'active' : ''}`}
                      onClick={() => setFotoCarruselIdx(idx)}
                      aria-label={`Foto ${idx + 1}: ${f.titulo}`}
                      title={f.titulo}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* BARRA INFERIOR DE ACCIÓN: SIGUIENTE A LA DERECHA */}
          <div className="env-stage1-footer">
            <button
              className="text-button icon-btn"
              onClick={() => setMostrarFuentesModal(!mostrarFuentesModal)}
            >
              <IconBook size={16} />
              {mostrarFuentesModal
                ? 'Ocultar fuentes científicas'
                : `Fuentes científicas y técnicas (${fuentesData.length})`}
            </button>

            <button
              className="btn-primary btn-lg env-btn-next-right"
              onClick={() => {
                setFaseActual('preguntas')
                setIndicePregunta(0)
              }}
            >
              Comenzar el recorrido de decisiones
            </button>
          </div>

          {/* PANEL DE FUENTES CIENTÍFICAS DESPLEGABLE */}
          {mostrarFuentesModal && (
            <div className="pilot-sources-panel" style={{ marginTop: '24px' }}>
              <h3 className="icon-heading" style={{ fontSize: '17px', marginBottom: '14px' }}>
                <IconGlobe size={18} /> Biblioteca científica y técnica de la directriz ambiental
              </h3>
              <div className="pilot-sources-grid">
                {fuentesData.map((f) => (
                  <article key={f.id} className="pilot-source-card">
                    <span className="source-inst-tag">{f.institucion}</span>
                    <h4>{f.titulo}</h4>
                    <p>{f.descripcion}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{f.eje}</span>
                      <a
                        href={f.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pilot-external-link"
                      >
                        Ver fuente ↗
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* ETAPA 2: RECORRIDO DE DECISIONES CON 5 ALTERNATIVAS (A, B, C, D, E)        */}
      {/* ========================================================================= */}
      {faseActual === 'preguntas' && interludioCuestionamiento && (
        <div
          className={`pilot-stage-card stage-card env-interlude-card ${
            estaSaliendoInterludio ? 'env-interlude-exiting' : ''
          }`}
        >
          <div className="env-interlude-content">
            <span className="env-interlude-title-plain">
              CUESTIONAMIENTO A TU ELECCIÓN · OPCIÓN {interludioCuestionamiento.letra}
            </span>

            <blockquote className="env-interlude-quote">
              «{interludioCuestionamiento.cuestionamiento}»
            </blockquote>

            <div className="env-interlude-progress-track">
              <div
                className="env-interlude-progress-bar"
                style={{
                  animationDuration: `${interludioCuestionamiento.duracionSegundos || 8}s`,
                }}
              />
            </div>

            <button
              className="btn-secondary btn-sm env-interlude-skip-btn"
              onClick={iniciarSalidaInterludio}
              disabled={estaSaliendoInterludio}
            >
              Continuar ahora →
            </button>
          </div>
        </div>
      )}

      {faseActual === 'preguntas' && !interludioCuestionamiento && preguntaActual && (
        <div
          key={`pregunta-card-${preguntaActual.id}`}
          className="pilot-stage-card stage-card env-stage2-card-enter"
        >
          <div className="pilot-question-header" style={{ marginBottom: '14px' }}>
            <div className="pilot-question-meta" style={{ justifyContent: 'flex-end' }}>
              <span className="pilot-progress-counter">
                Pregunta {indicePregunta + 1} de {preguntasData.length}
              </span>
            </div>
            <div className="reading-progress" style={{ marginTop: '6px' }}>
              <span
                style={{
                  width: `${((indicePregunta + 1) / preguntasData.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* ESTRUCTURA CON FOTO: TEXTO DESCRIPTIVO A LA IZQUIERDA, IMAGEN A LA DERECHA */}
          {fotoDePregunta && (
            <div className="env-stage1-grid env-stage2-case-grid">
              {/* Columna Izquierda: Descripción detallada sobre la imagen y la situación */}
              <div className="env-stage1-text-col">
                <h3 className="env-context-title" style={{ fontSize: '18.5px', marginBottom: '8px' }}>
                  {preguntaActual.tituloCaso || fotoDePregunta.titulo}
                </h3>
                <div className="env-stage2-desc-box">
                  {(preguntaActual.descripcionDetallada || [fotoDePregunta.descripcion]).map((parrafo, idx) => (
                    <p key={idx} className="env-stage2-desc-p">
                      {parrafo}
                    </p>
                  ))}
                </div>
              </div>

              {/* Columna Derecha: Imagen del caso */}
              <div className="env-stage1-carousel-col">
                <div className="env-auto-carousel-card">
                  <div className="env-auto-img-frame" style={{ minHeight: '260px', maxHeight: '330px' }}>
                    <img
                      src={resolverRutaImagen(fotoDePregunta.archivoImagen)}
                      alt={fotoDePregunta.titulo}
                      className="env-auto-img"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  </div>
                  <div className="env-auto-caption">
                    <p className="env-auto-caption-title">{fotoDePregunta.titulo}</p>
                    <span className="small-muted">Crédito: {fotoDePregunta.credito}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CASO TRANSVERSAL (PREGUNTAS 6 A 8 SIN FOTO ESPECÍFICA) */}
          {!fotoDePregunta && preguntaActual.descripcionDetallada && (
            <div className="env-stage2-transversal-box" style={{ marginBottom: '22px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span className="env-stage2-transversal-tag">Debate ético transversal</span>
              </div>
              <h3 className="env-context-title" style={{ fontSize: '18.5px', marginBottom: '10px' }}>
                {preguntaActual.tituloCaso}
              </h3>
              <div className="env-stage2-desc-box">
                {preguntaActual.descripcionDetallada.map((parrafo, idx) => (
                  <p key={idx} className="env-stage2-desc-p">
                    {parrafo}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* SECCIÓN INFERIOR: PREGUNTA Y ALTERNATIVAS */}
          <div className="env-stage2-qa-section">
            <h2
              className="pilot-question-title"
              style={{
                marginTop: '0',
                fontSize: '18px',
                lineHeight: '1.45',
                width: '100%',
                maxWidth: '100%',
              }}
            >
              {preguntaActual.pregunta}
            </h2>
            <p
              className="pilot-question-instruction"
              style={{ marginBottom: '16px', width: '100%', maxWidth: '100%' }}
            >
              Evalúa la situación y selecciona la postura que mejor represente tu criterio:
            </p>

            {/* LAS 5 ALTERNATIVAS (A, B, C, D, E) */}
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
          </div>

          {/* BOTONES ANTERIOR / SIGUIENTE */}
          <div className="stage-footer" style={{ marginTop: '30px' }}>
            <button className="btn-secondary icon-btn" onClick={handleAnteriorPregunta}>
              ← {indicePregunta === 0 ? 'Volver al contexto' : 'Pregunta anterior'}
            </button>

            <button
              className="btn-primary btn-lg icon-btn"
              onClick={handleSiguientePregunta}
              disabled={!respuestaSeleccionadaPregunta}
            >
              {indicePregunta === preguntasData.length - 1
                ? 'Pasar a la reflexión personal (3 preguntas) →'
                : 'Siguiente pregunta →'}
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ETAPA 3: REFLEXIÓN PERSONAL FINAL (TRES PREGUNTAS ABIERTAS)               */}
      {/* ========================================================================= */}
      {faseActual === 'reflexion' && (
        <div className="pilot-stage-card stage-card">
          <div className="stage-header">
            <h2>Reflexión personal final: Tres preguntas abiertas</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px' }}>
              Formula tu postura con tus propias palabras antes de consultar las perspectivas de los autores.
            </p>
          </div>

          {/* PESTAÑAS O TARJETAS PARA CADA UNA DE LAS 3 PREGUNTAS */}
          <div className="env-reflection-tabs">
            {reflexionData.map((ref, idx) => (
              <button
                key={ref.id}
                className={`env-ref-tab-btn ${indiceReflexion === idx ? 'active' : ''}`}
                onClick={() => setIndiceReflexion(idx)}
              >
                <span>Pregunta {ref.numero}</span>
                <strong>{ref.titulo}</strong>
              </button>
            ))}
          </div>

          {/* PREGUNTA ABIERTA ACTUAL */}
          {reflexionData[indiceReflexion] && (
            <div className="env-reflection-card">
              <span className="env-eje-tag">
                DIMENSIÓN {reflexionData[indiceReflexion].numero} DE 3 · {reflexionData[indiceReflexion].titulo.toUpperCase()}
              </span>
              <h3 style={{ fontSize: '19px', fontWeight: '600', margin: '10px 0 16px', lineHeight: '1.45' }}>
                {reflexionData[indiceReflexion].enunciado}
              </h3>

              {reflexionData[indiceReflexion].citaDocumento && (
                <div
                  style={{
                    background: 'var(--bg-subtle)',
                    borderLeft: '3px solid var(--accent-amber)',
                    borderRadius: '6px',
                    padding: '10px 14px',
                    marginBottom: '16px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: 'var(--accent-amber)',
                      fontWeight: '700',
                      display: 'block',
                      marginBottom: '4px',
                    }}
                  >
                    Texto fuente original · {reflexionData[indiceReflexion].autor}
                  </span>
                  <p style={{ margin: 0, fontStyle: 'italic', fontSize: '13px', color: 'var(--text-secondary)' }}>
                    {reflexionData[indiceReflexion].citaDocumento}
                  </p>
                </div>
              )}

              <textarea
                className="pilot-textarea"
                rows={6}
                placeholder="Escribe tu razonamiento detallado aquí..."
                value={respuestasReflexion[reflexionData[indiceReflexion].id] || ''}
                onChange={(e) => {
                  const val = e.target.value
                  setRespuestasReflexion((prev) => ({
                    ...prev,
                    [reflexionData[indiceReflexion].id]: val,
                  }))
                }}
              />

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '8px',
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                }}
              >
                <span>Tus respuestas se guardan automáticamente en tu navegador.</span>
                <span>
                  {(respuestasReflexion[reflexionData[indiceReflexion].id] || '').trim().length} caracteres
                </span>
              </div>
            </div>
          )}

          {/* BARRA INFERIOR DE NAVEGACIÓN DE REFLEXIÓN (ETAPA 3 A ETAPA 4 OBLIGATORIA) */}
          <div className="stage-footer" style={{ marginTop: '32px' }}>
            {indiceReflexion === 0 ? (
              <button
                className="btn-secondary icon-btn"
                onClick={() => {
                  setFaseActual('preguntas')
                  setIndicePregunta(preguntasData.length - 1)
                }}
              >
                ← Volver a decisiones (Pregunta 8)
              </button>
            ) : (
              <button
                className="btn-secondary icon-btn"
                onClick={() => setIndiceReflexion((prev) => Math.max(0, prev - 1))}
              >
                ← Pregunta de reflexión anterior
              </button>
            )}

            {indiceReflexion < reflexionData.length - 1 ? (
              <button
                className="btn-primary icon-btn"
                onClick={() => setIndiceReflexion((prev) => Math.min(reflexionData.length - 1, prev + 1))}
              >
                Siguiente pregunta de reflexión →
              </button>
            ) : (
              <button
                className="btn-primary btn-lg icon-btn"
                onClick={() => {
                  setFaseActual('test')
                  setIndiceAfirmacion(0)
                }}
              >
                Continuar a la Etapa 4: Test de afinidad ética (8 afirmaciones) →
              </button>
            )}
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
            <h2>Test de afinidad con la ética ambiental espacial</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>
              Señala tu grado de acuerdo con la siguiente afirmación fundamentada en la literatura de ética espacial:
            </p>
          </div>

          <div className="pilot-statement-box">
            <span className="pilot-statement-quote">“</span>
            <p className="pilot-statement-text">{afirmacionActual.texto}</p>
          </div>

          {/* ESCALA LIKERT 1 A 5 */}
          <div className="pilot-likert-scale">
            {[
              { val: 1, label: 'Totalmente en desacuerdo' },
              { val: 2, label: 'En desacuerdo' },
              { val: 3, label: 'Neutro / Indeciso' },
              { val: 4, label: 'De acuerdo' },
              { val: 5, label: 'Totalmente de acuerdo' },
            ].map((item) => {
              const seleccionado = valorSeleccionadoAfirmacion === item.val
              return (
                <button
                  key={item.val}
                  className={`pilot-likert-btn ${seleccionado ? 'selected' : ''}`}
                  onClick={() => handleSeleccionarLikert(item.val)}
                >
                  <span className="likert-value">{item.val}</span>
                  <span className="likert-label">{item.label}</span>
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
                ? 'Ver afinidades y citas de autores →'
                : 'Siguiente afirmación →'}
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ETAPA 5: RESULTADOS: GRÁFICO DE AFINIDAD Y AUTORES CON CITAS REALES       */}
      {/* ========================================================================= */}
      {faseActual === 'resultados' && (
        <div className="pilot-stage-card stage-card">
          <div className="stage-header">
            <h2>Afinidad con perspectivas de ética ambiental espacial</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', maxWidth: '75ch' }}>
              Grado de afinidad estimado a partir de tus respuestas en el test frente a las posiciones documentadas
              de Patrick Lin, Christopher Newman y Charles Cockell.
            </p>
          </div>

          {/* GRÁFICO DE BARRAS DE AFINIDAD */}
          <div className="pilot-affinity-chart-card">
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>
              Porcentaje de afinidad con las posturas evaluadas:
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
                            item.autorId === 'lin'
                              ? '#B85D19'
                              : item.autorId === 'newman'
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
              * Los porcentajes representan afinidad con las afirmaciones evaluadas en este test, no una medición definitiva
              de la identidad moral del estudiante ni la totalidad de la obra del autor.
            </p>
          </div>

          {/* DETALLE DEL AUTOR CON CITAS TEXTUALES Y PÁGINAS EXTRAÍDAS */}
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
                    Afinidad: {afinidadDetalle.porcentaje}%
                  </span>
                </div>

                <div className="pilot-author-summary-section">
                  <h4 style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--primary-solid)', letterSpacing: '0.05em' }}>
                    Tesis central y aplicación a los residuos espaciales
                  </h4>
                  <p style={{ fontSize: '14px', lineHeight: '1.8', marginTop: '6px' }}>
                    {autorDetalle.resumenArgumento}
                  </p>
                  <p style={{ fontSize: '14px', lineHeight: '1.8', marginTop: '10px', background: 'var(--bg-subtle)', padding: '12px 16px', borderRadius: '6px' }}>
                    <strong>Aplicación a las huellas y desechos:</strong> {autorDetalle.aplicacionCaso}
                  </p>
                </div>

                {/* CITAS TEXTUALES AUTÉNTICAS (DOCUMENTO MARÍA PAZ) */}
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
                      Citas textuales verificadas con número de página:
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
                              marginTop: '8px',
                              fontSize: '12px',
                              color: 'var(--text-muted)',
                            }}
                          >
                            — <strong>{c.referencia}</strong> · <em>{c.contexto}</em>
                          </footer>
                        </blockquote>
                      ))}
                    </div>
                  </div>
                )}

                {/* FUENTES DE ACCESO ABIERTO */}
                <div style={{ marginTop: '22px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
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
                    Lecturas académicas de acceso libre y gratuito:
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
                          <strong style={{ fontSize: '13.5px', display: 'block' }}>{f.titulo}</strong>
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
                          Leer estudio original ↗
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* BOTONES FINALES */}
          <div className="stage-footer" style={{ marginTop: '30px' }}>
            <button className="btn-secondary icon-btn" onClick={() => setFaseActual('test')}>
              ← Revisar test de afirmaciones
            </button>

            <button className="btn-secondary icon-btn" onClick={reiniciarRecorrido}>
              Reiniciar recorrido ambiental ↻
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
