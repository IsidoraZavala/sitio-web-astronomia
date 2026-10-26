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
import casoData from '../data/directrizAnimales/casos.json'
import preguntasData from '../data/directrizAnimales/preguntas.json'
import reflexionData from '../data/directrizAnimales/reflexion.json'
import autoresData from '../data/directrizAnimales/autores.json'
import testData from '../data/directrizAnimales/test.json'
import fuentesData from '../data/directrizAnimales/fuentes.json'
import { calcularAfinidadFilosofica } from '../utils/calcularAfinidad'

const ANIMALES_STORAGE_KEY = 'orbita_etica_directriz_animales_v1'

const resolverRutaImagen = (ruta) => {
  if (!ruta) return ''
  if (ruta.startsWith('http://') || ruta.startsWith('https://')) return ruta
  const limpia = ruta.replace(/^\.?\//, '')
  const base = import.meta.env.BASE_URL || './'
  return `${base}${limpia}`
}

export function AnimalResearchDilemmaExperience({ onVolverAlCatalogo, onGuardarGlobal }) {
  // fases: 'caso' | 'preguntas' | 'reflexion' | 'test' | 'resultados'
  const [faseActual, setFaseActual] = useState('caso')
  const [fotoCarruselIdx, setFotoCarruselIdx] = useState(0)
  const [indicePregunta, setIndicePregunta] = useState(0)
  const [indiceReflexion, setIndiceReflexion] = useState(0)
  const [indiceAfirmacion, setIndiceAfirmacion] = useState(0)

  // Respuestas del estudiante
  const [respuestasPreguntas, setRespuestasPreguntas] = useState({})
  const [respuestasReflexion, setRespuestasReflexion] = useState({
    ref_1_bentham_sintiencia: '',
    ref_2_singer_antiespecismo: '',
    ref_3_regan_sujetos_vida: '',
    ref_4_nussbaum_capacidades: '',
  })
  const [respuestasTest, setRespuestasTest] = useState({})
  const [autorSeleccionadoId, setAutorSeleccionadoId] = useState('bentham')
  const [mostrarFuentesModal, setMostrarFuentesModal] = useState(false)
  const [interludioCuestionamiento, setInterludioCuestionamiento] = useState(null)
  const [estaSaliendoInterludio, setEstaSaliendoInterludio] = useState(false)
  const salidaTimeoutRef = useRef(null)
  const timerInterludioRef = useRef(null)

  // Cargar estado de localStorage si existe
  useEffect(() => {
    try {
      const raw = localStorage.getItem(ANIMALES_STORAGE_KEY)
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

  // Carrusel automático en la fase de contexto (cambia cada 8 segundos)
  useEffect(() => {
    if (faseActual !== 'caso') return
    const interval = setInterval(() => {
      setFotoCarruselIdx((prev) => (prev + 1) % 5)
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
      localStorage.setItem(ANIMALES_STORAGE_KEY, JSON.stringify(estado))
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
    if (window.confirm('¿Deseas reiniciar esta experiencia y borrar tus respuestas guardadas?')) {
      setRespuestasPreguntas({})
      setRespuestasReflexion({
        ref_1_bentham_sintiencia: '',
        ref_2_singer_antiespecismo: '',
        ref_3_regan_sujetos_vida: '',
        ref_4_nussbaum_capacidades: '',
      })
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
      localStorage.removeItem(ANIMALES_STORAGE_KEY)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Cálculos de afinidad con Bentham, Singer, Regan y Nussbaum
  const afinidadesCalculadas = calcularAfinidadFilosofica(respuestasTest, testData, autoresData)
  const autorDetalle = autoresData.find((a) => a.id === autorSeleccionadoId) || autoresData[0]
  const afinidadDetalle = afinidadesCalculadas.find((a) => a.autorId === autorSeleccionadoId)

  // Datos actuales
  const carruselFase1 = casoData.carruselFotos?.slice(0, 5) || []
  const fotoActual = carruselFase1[fotoCarruselIdx] || carruselFase1[0]
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

  // Tiempo de lectura adaptativo (base 8 segundos, escalando hasta 12s para textos más extensos)
  const calcularTiempoLecturaMs = (texto) => {
    if (!texto) return 8000
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
    setInterludioCuestionamiento({
      cuestionamiento: alternativaSeleccionada.cuestionamiento,
      letra: alternativaSeleccionada.letra,
      esUltimaPregunta: indicePregunta === preguntasData.length - 1,
      duracionMs,
      duracionSegundos: duracionMs / 1000,
    })
  }

  const iniciarSalidaInterludio = () => {
    if (!interludioCuestionamiento || estaSaliendoInterludio) return
    if (timerInterludioRef.current) {
      clearTimeout(timerInterludioRef.current)
      timerInterludioRef.current = null
    }

    setEstaSaliendoInterludio(true)

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
      <nav className="pilot-stepper-nav" aria-label="Etapas de la directriz">
        <button
          className={`pilot-step-btn ${faseActual === 'caso' ? 'active' : ''}`}
          onClick={() => setFaseActual('caso')}
        >
          <span className="pilot-step-num">1</span>
          <span className="pilot-step-label">Contexto y casos (5)</span>
        </button>

        <button
          className={`pilot-step-btn ${
            faseActual === 'preguntas'
              ? 'active'
              : Object.keys(respuestasPreguntas).length > 0
              ? 'completed'
              : ''
          }`}
          onClick={() => {
            setFaseActual('preguntas')
            setInterludioCuestionamiento(null)
          }}
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
          <span className="pilot-step-label">Reflexión filosófica (4)</span>
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
            Test afinidad ({Object.keys(respuestasTest).length}/{testData.afirmaciones.length})
          </span>
        </button>

        <button
          className={`pilot-step-btn ${
            faseActual === 'resultados'
              ? 'active'
              : Object.keys(respuestasTest).length === testData.afirmaciones.length
              ? 'completed'
              : ''
          }`}
          onClick={() => setFaseActual('resultados')}
        >
          <span className="pilot-step-num">5</span>
          <span className="pilot-step-label">Resultados</span>
        </button>
      </nav>

      {/* ========================================================================= */}
      {/* ETAPA 1: CONTEXTO GENERAL Y FOTOS                                         */}
      {/* ========================================================================= */}
      {faseActual === 'caso' && (
        <div className="pilot-stage-card stage-card env-stage1-card">
          {/* GRID PRINCIPAL: LECTURA A LA IZQUIERDA, CARRUSEL A LA DERECHA */}
          <div className="env-stage1-grid">
            <div className="env-stage1-text-col">
              <h2 className="env-context-title">
                {casoData.tituloSeccion || 'Uso de animales en la investigación y experimentación espacial'}
              </h2>
              <div className="env-context-scrollbox">
                {casoData.parrafos?.map((parrafo, idx) => (
                  <p key={idx}>{parrafo}</p>
                ))}
              </div>
            </div>

            <div className="env-stage1-carousel-col">
              <div className="env-auto-carousel-card">
                <div className="env-auto-img-frame">
                  {fotoActual?.archivoImagen ? (
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
                  ) : null}
                  <div
                    className="env-auto-placeholder"
                    style={{
                      display: fotoActual?.archivoImagen ? 'none' : 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      background: 'radial-gradient(circle at center, #1E293B, #0F172A)',
                      padding: '24px',
                      textAlign: 'center',
                    }}
                  >
                    <IconGlobe size={44} style={{ color: '#D97706', marginBottom: '12px' }} />
                    <strong style={{ fontSize: '15px', color: '#F8FAFC', marginBottom: '6px' }}>
                      {fotoActual?.titulo}
                    </strong>
                    <span style={{ fontSize: '12.5px', color: '#94A3B8' }}>{fotoActual?.eje}</span>
                  </div>
                </div>

                <div className="env-auto-caption">
                  <div className="env-auto-caption-header">
                    <span className="env-auto-badge">Caso {fotoCarruselIdx + 1} de 5</span>
                    <span className="small-muted">{fotoActual?.eje}</span>
                  </div>
                  <p className="env-auto-caption-title">{fotoActual?.titulo}</p>
                  <p className="env-auto-caption-desc">{fotoActual?.descripcion}</p>
                  <span className="small-muted" style={{ display: 'block', marginTop: '6px' }}>
                    Crédito: {fotoActual?.credito}
                  </span>
                </div>

                <div className="env-carousel-dots">
                  {carruselFase1.map((_, idx) => (
                    <button
                      key={idx}
                      className={`env-dot-btn ${idx === fotoCarruselIdx ? 'active' : ''}`}
                      onClick={() => setFotoCarruselIdx(idx)}
                      title={`Ir a imagen ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* BOTÓN INFERIOR ALINEADO A LA DERECHA */}
          <div
            className="env-stage1-action-row"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
              marginTop: '36px',
              paddingTop: '22px',
              borderTop: '1px solid var(--border-color)',
            }}
          >
            <button
              className="text-button icon-btn"
              onClick={() => setMostrarFuentesModal(!mostrarFuentesModal)}
            >
              <IconBook size={16} />
              {mostrarFuentesModal
                ? 'Ocultar fuentes bibliográficas'
                : `Fuentes bibliográficas y bioéticas (${fuentesData.length})`}
            </button>

            <button
              className="btn-primary btn-lg env-btn-next-right"
              style={{ marginLeft: 'auto' }}
              onClick={() => {
                setFaseActual('preguntas')
                setIndicePregunta(0)
              }}
            >
              Comenzar el recorrido de decisiones ({preguntasData.length} preguntas) →
            </button>
          </div>

          {/* PANEL DE FUENTES BIBLIOGRÁFICAS */}
          {mostrarFuentesModal && (
            <div className="pilot-sources-panel" style={{ marginTop: '24px' }}>
              <h3 className="icon-heading" style={{ fontSize: '17px', marginBottom: '14px' }}>
                <IconGlobe size={18} /> Fuentes bioéticas, jurídicas y testimoniales de la directriz
              </h3>
              <div className="pilot-sources-grid">
                {fuentesData.map((f) => (
                  <article key={f.id} className="pilot-source-card">
                    <span className="source-inst-tag">{f.tipo}</span>
                    <h4>{f.titulo}</h4>
                    <p style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '6px' }}>
                      <strong>{f.autor}</strong> ({f.año}) · {f.publicacion}
                    </p>
                    <p style={{ fontSize: '12.5px' }}>{f.descripcion}</p>
                    {f.citasRelevantes && (
                      <blockquote
                        style={{
                          margin: '8px 0 0',
                          padding: '6px 10px',
                          borderLeft: '2px solid #D97706',
                          fontSize: '11.5px',
                          fontStyle: 'italic',
                          color: '#CBD5E1',
                        }}
                      >
                        {f.citasRelevantes}
                      </blockquote>
                    )}
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
          {/* HEADER */}
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

          {/* ESTRUCTURA CON TEXTO DESCRIPTIVO E IMAGEN / ILUSTRACIÓN */}
          <div className="env-stage1-grid env-stage2-case-grid">
            <div className="env-stage1-text-col">
              <h3 className="env-context-title" style={{ fontSize: '18.5px', marginBottom: '8px' }}>
                {preguntaActual.tituloCaso}
              </h3>
              <div className="env-stage2-desc-box">
                {preguntaActual.descripcionDetallada?.map((parrafo, idx) => (
                  <p key={idx} className="env-stage2-desc-p">
                    {parrafo}
                  </p>
                ))}
              </div>
            </div>

            <div className="env-stage1-carousel-col">
              <div className="env-auto-carousel-card">
                <div className="env-auto-img-frame" style={{ minHeight: '220px', maxHeight: '280px' }}>
                  {fotoDePregunta?.archivoImagen ? (
                    <img
                      src={resolverRutaImagen(fotoDePregunta.archivoImagen)}
                      alt={fotoDePregunta.titulo}
                      className="env-auto-img"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        if (e.currentTarget.nextElementSibling) {
                          e.currentTarget.nextElementSibling.style.display = 'flex'
                        }
                      }}
                    />
                  ) : null}
                  <div
                    className="env-auto-placeholder"
                    style={{
                      display: fotoDePregunta?.archivoImagen ? 'none' : 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      background: 'radial-gradient(circle at center, #1E293B, #0F172A)',
                      padding: '20px',
                      textAlign: 'center',
                    }}
                  >
                    <IconGlobe size={36} style={{ color: '#D97706', marginBottom: '10px' }} />
                    <strong style={{ fontSize: '14px', color: '#F8FAFC', marginBottom: '4px' }}>
                      {fotoDePregunta?.titulo || preguntaActual.tituloCaso}
                    </strong>
                    <span style={{ fontSize: '12px', color: '#94A3B8' }}>
                      {fotoDePregunta?.eje || 'Uso de animales en la investigación espacial'}
                    </span>
                  </div>
                </div>
                {fotoDePregunta && (
                  <div className="env-auto-caption">
                    <p className="env-auto-caption-title">{fotoDePregunta.titulo}</p>
                    <span className="small-muted">Crédito: {fotoDePregunta.credito}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SECCIÓN INFERIOR: PREGUNTA Y ALTERNATIVAS */}
          <div className="env-stage2-qa-section" style={{ marginTop: '24px' }}>
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
              {preguntaActual.alternativas?.map((alt) => {
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

          {/* NAVEGACIÓN INFERIOR DE PREGUNTAS */}
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
                ? 'Confirmar y pasar a la reflexión filosófica →'
                : 'Confirmar elección y ver cuestionamiento →'}
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ETAPA 3: REFLEXIÓN FILOSÓFICA (BENTHAM, SINGER, REGAN, NUSSBAUM)          */}
      {/* ========================================================================= */}
      {faseActual === 'reflexion' && (
        <div className="pilot-stage-card stage-card">
          <div className="stage-header">
            <h2>Reflexión Filosófica: Cuatro Autores Clave</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', maxWidth: '75ch' }}>
              Formula tu postura con tus propias palabras a partir de las doctrinas de Jeremy Bentham,
              Peter Singer, Tom Regan y Martha C. Nussbaum. Lee la contextualización previa antes de responder.
            </p>
          </div>

          {/* PREGUNTA ABIERTA ACTUAL */}
          {reflexionData[indiceReflexion] && (
            <div className="env-reflection-card">
              {/* RECUADRO ÚNICO CON FONDO CÁLIDO/ÁMBAR Y LÍNEA A LA IZQUIERDA */}
              <div
                style={{
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border-color)',
                  borderLeft: '4px solid var(--accent-amber)',
                  borderRadius: '8px',
                  padding: '16px 20px',
                  margin: '14px 0 20px',
                }}
              >
                {reflexionData[indiceReflexion].contextualizacionPrevia && (
                  <p
                    style={{
                      margin: '0 0 12px',
                      fontSize: '14px',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.65',
                      textAlign: 'justify',
                    }}
                  >
                    {reflexionData[indiceReflexion].contextualizacionPrevia}
                  </p>
                )}
                {reflexionData[indiceReflexion].citaDocumento && (
                  <p
                    style={{
                      margin: 0,
                      fontStyle: 'italic',
                      fontSize: '13.5px',
                      color: 'var(--text-primary)',
                      lineHeight: '1.6',
                    }}
                  >
                    {reflexionData[indiceReflexion].citaDocumento}
                  </p>
                )}
              </div>

              {/* ENUNCIADO DE LA PREGUNTA */}
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  margin: '0 0 16px',
                  lineHeight: '1.45',
                  color: 'var(--text-primary)',
                }}
              >
                {reflexionData[indiceReflexion].enunciado}
              </h3>

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

          {/* BARRA INFERIOR DE NAVEGACIÓN */}
          <div className="stage-footer" style={{ marginTop: '32px' }}>
            {indiceReflexion === 0 ? (
              <button
                className="btn-secondary icon-btn"
                onClick={() => {
                  setFaseActual('preguntas')
                  setIndicePregunta(preguntasData.length - 1)
                }}
              >
                ← Volver a decisiones (Pregunta {preguntasData.length})
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
                Siguiente reflexión ({indiceReflexion + 2}/{reflexionData.length}) →
              </button>
            ) : (
              <button
                className="btn-primary btn-lg icon-btn"
                onClick={() => {
                  setFaseActual('test')
                  setIndiceAfirmacion(0)
                }}
              >
                Continuar a la Etapa 4: Test de afinidad ética ({testData.afirmaciones.length} afirmaciones) →
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
          {/* HEADER */}
          <div className="pilot-question-header">
            <div className="pilot-question-meta" style={{ justifyContent: 'flex-end' }}>
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
            <h2>Test de afinidad sobre bioética y uso de animales en el espacio</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>
              Señala tu grado de acuerdo con la siguiente afirmación para comparar tu postura con las de
              Jeremy Bentham, Peter Singer, Tom Regan y Martha C. Nussbaum:
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

          {/* NAVEGACIÓN TEST */}
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
                ? 'Ver afinidades y análisis de autores →'
                : 'Siguiente afirmación →'}
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ETAPA 5: RESULTADOS: GRÁFICO DE AFINIDAD Y AUTORES CON FOTO Y CITAS       */}
      {/* ========================================================================= */}
      {faseActual === 'resultados' && (
        <div className="pilot-stage-card stage-card">
          <div className="stage-header">
            <h2>Afinidad con las Corrientes Filosóficas</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', maxWidth: '75ch' }}>
              Grado de concordancia entre tus respuestas y las posturas documentadas de Jeremy Bentham
              (Utilitarismo Clásico), Peter Singer (Antiespecismo), Tom Regan (Deontología de Derechos)
              y Martha C. Nussbaum (Enfoque de las Capacidades).
            </p>
          </div>

          {/* GRÁFICO DE BARRAS DE AFINIDAD */}
          <div className="pilot-affinity-chart-card">
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px', color: 'var(--text-primary)' }}>
              Porcentaje de afinidad estimado en el test:
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
                    <span className="pilot-bar-sub">{item.enfoque.split(',')[0]}</span>
                  </div>

                  <div className="pilot-bar-track-col">
                    <div className="pilot-bar-track">
                      <div
                        className="pilot-bar-fill"
                        style={{
                          width: `${item.porcentaje}%`,
                          backgroundColor:
                            item.autorId === 'bentham'
                              ? '#B45309'
                              : item.autorId === 'singer'
                              ? '#0284C7'
                              : item.autorId === 'regan'
                              ? '#059669'
                              : '#7C3AED',
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
              de la totalidad de la obra de cada autor.
            </p>
          </div>

          {/* FICHA DETALLADA DEL AUTOR CON BOTONERA ESTILIZADA Y FOTO DEL FILÓSOFO */}
          {autorDetalle && afinidadDetalle && (
            <div className="pilot-author-details-box" style={{ marginTop: '28px' }}>
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
                {/* CABECERA CON ESPACIO PARA FOTO DEL FILÓSOFO */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    flexWrap: 'wrap',
                    marginBottom: '18px',
                  }}
                >
                  <div
                    style={{
                      width: '84px',
                      height: '84px',
                      borderRadius: '50%',
                      background: 'var(--bg-subtle)',
                      border: '2px solid var(--accent-amber)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      flexShrink: 0,
                    }}
                  >
                    {autorDetalle.fotoUrl || autorDetalle.foto ? (
                      <img
                        src={resolverRutaImagen(autorDetalle.fotoUrl || autorDetalle.foto)}
                        alt={autorDetalle.nombre}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    ) : null}
                    <span style={{ fontSize: '24px', fontWeight: '700', color: 'var(--accent-amber)' }}>
                      {autorDetalle.nombre
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)}
                    </span>
                  </div>

                  <div style={{ flex: 1, minWidth: '220px' }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        flexWrap: 'wrap',
                        gap: '10px',
                      }}
                    >
                      <div>
                        <h3 style={{ fontSize: '22px', fontWeight: '700', margin: '0 0 4px', color: 'var(--text-primary)' }}>
                          {autorDetalle.nombre}
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px', margin: 0 }}>
                          Obra de referencia: <em>{autorDetalle.obraReferencia}</em>
                        </p>
                      </div>
                      <span className="pilot-affinity-score-badge">
                        Afinidad: {afinidadDetalle.porcentaje}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* DESCRIPCIÓN DE LA AFINIDAD */}
                <div
                  style={{
                    background: 'var(--bg-subtle)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    padding: '14px 18px',
                    margin: '18px 0',
                  }}
                >
                  <strong
                    style={{
                      fontSize: '12px',
                      color: 'var(--primary-solid)',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: '4px',
                    }}
                  >
                    Interpretación de tu afinidad:
                  </strong>
                  <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    {afinidadDetalle.descripcionAfinidad}
                  </p>
                </div>

                {/* APLICACIÓN AL DEBATE CON RECUADRO CÁLIDO */}
                <div
                  style={{
                    background: 'var(--bg-subtle)',
                    border: '1px solid var(--border-color)',
                    borderLeft: '4px solid var(--accent-amber)',
                    borderRadius: '8px',
                    padding: '14px 18px',
                    margin: '18px 0',
                  }}
                >
                  <strong
                    style={{
                      fontSize: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: 'var(--accent-amber)',
                      display: 'block',
                      marginBottom: '6px',
                    }}
                  >
                    Aplicación al debate sobre el espacio y la investigación animal:
                  </strong>
                  <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.65', textAlign: 'justify' }}>
                    {autorDetalle.aplicacionCaso}
                  </p>
                </div>

                {/* CITAS TEXTUALES CLAVE DEL DOCUMENTO */}
                <div style={{ marginTop: '16px' }}>
                  <h4 style={{ fontSize: '15px', marginBottom: '10px', color: 'var(--text-primary)' }}>
                    Citas textuales verificadas:
                  </h4>
                  <div style={{ display: 'grid', gap: '12px' }}>
                    {autorDetalle.citasClave?.map((c, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: 'var(--bg-subtle)',
                          borderLeft: '3px solid var(--accent-amber)',
                          padding: '10px 14px',
                          borderRadius: '6px',
                        }}
                      >
                        <p style={{ margin: '0 0 6px', fontStyle: 'italic', fontSize: '13px', color: 'var(--text-primary)' }}>
                          «{c.cita}»
                        </p>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{c.referencia}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* BOTONES FINALES: FINALIZAR EXPERIENCIA */}
          <div className="stage-footer" style={{ marginTop: '36px' }}>
            <button className="btn-secondary icon-btn" onClick={onVolverAlCatalogo}>
              ← Volver al catálogo de dilemas
            </button>

            <button
              className="btn-primary btn-lg icon-btn"
              onClick={onVolverAlCatalogo}
            >
              Finalizar recorrido ético ✓
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
