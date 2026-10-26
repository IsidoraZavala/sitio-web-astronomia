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

export function AnimalResearchDilemmaExperience({ onVolverAlCatalogo, onGuardarGlobal }) {
  // fases: 'caso' | 'preguntas' | 'reflexion' | 'test' | 'resultados'
  const [faseActual, setFaseActual] = useState('caso')
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
  const preguntaActual = preguntasData[indicePregunta]
  const respuestaSeleccionadaPregunta = respuestasPreguntas[preguntaActual?.id]
  const alternativaSeleccionada = preguntaActual?.alternativas?.find(
    (alt) => alt.id === respuestaSeleccionadaPregunta
  )

  const afirmacionActual = testData.afirmaciones?.[indiceAfirmacion]
  const valorSeleccionadoAfirmacion = respuestasTest[afirmacionActual?.id]

  // Tiempo de lectura adaptativo
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
          <span className="pilot-step-label">Autores filosóficos (4)</span>
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
            Matriz ética ({Object.keys(respuestasTest).length}/{testData.afirmaciones.length})
          </span>
        </button>

        <button
          className={`pilot-step-btn ${faseActual === 'resultados' ? 'active' : ''}`}
          onClick={() => setFaseActual('resultados')}
        >
          <span className="pilot-step-num">5</span>
          <span className="pilot-step-label">Afinidad y conclusiones</span>
        </button>
      </nav>

      {/* ============================================================== */}
      {/* ETAPA 1: CONTEXTUALIZACIÓN Y EXPLORACIÓN DE CASOS REALES      */}
      {/* ============================================================== */}
      {faseActual === 'caso' && (
        <section className="pilot-section-view">
          <div className="section-heading-block">
            <h2 style={{ fontSize: '1.25rem', color: '#F8FAFC', marginBottom: '8px' }}>
              Marco bioético y antecedentes de la experimentación animal en el espacio
            </h2>
            <div style={{ color: '#CBD5E1', fontSize: '0.95rem', lineHeight: '1.7' }}>
              {casoData.parrafos?.map((parrafo, idx) => (
                <p key={idx} style={{ marginBottom: '16px' }}>
                  {parrafo}
                </p>
              ))}
            </div>
          </div>

          {/* LISTA COMPLETA DE LOS 5 CASOS REALES DOCUMENTADOS */}
          <div style={{ marginTop: '2.5rem' }}>
            <h3
              style={{
                fontSize: '1.15rem',
                color: '#DDD6FE',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <IconBook size={18} /> Casos históricos documentados para deliberar
            </h3>

            <div style={{ display: 'grid', gap: '1.25rem' }}>
              {casoData.casosDocumentados?.map((caso) => (
                <article
                  key={caso.id}
                  style={{
                    background: 'rgba(15, 23, 42, 0.75)',
                    border: '1px solid rgba(221, 214, 254, 0.18)',
                    borderRadius: '12px',
                    padding: '20px 24px',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '8px',
                      marginBottom: '8px',
                    }}
                  >
                    <span
                      style={{
                        color: '#DDD6FE',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      Caso {caso.numero} · {caso.fecha}
                    </span>
                    <span
                      style={{
                        color: '#94A3B8',
                        fontSize: '0.8rem',
                        background: 'rgba(255, 255, 255, 0.06)',
                        padding: '3px 10px',
                        borderRadius: '20px',
                      }}
                    >
                      {caso.actores}
                    </span>
                  </div>

                  <h4 style={{ margin: '0 0 6px', color: '#F8FAFC', fontSize: '1.1rem' }}>
                    {caso.titulo}
                  </h4>
                  <p style={{ margin: '0 0 12px', color: '#CBD5E1', fontSize: '0.88rem', fontStyle: 'italic' }}>
                    {caso.subtitulo}
                  </p>

                  <p style={{ margin: '0 0 12px', color: '#E2E8F0', fontSize: '0.92rem', lineHeight: '1.6' }}>
                    {caso.hechosReales}
                  </p>

                  <div
                    style={{
                      background: 'rgba(40, 30, 50, 0.5)',
                      borderLeft: '3px solid #DDD6FE',
                      padding: '10px 14px',
                      borderRadius: '0 8px 8px 0',
                      marginTop: '10px',
                    }}
                  >
                    <strong style={{ color: '#DDD6FE', fontSize: '0.85rem' }}>
                      Tensión bioética clave:{' '}
                    </strong>
                    <span style={{ color: '#CBD5E1', fontSize: '0.85rem' }}>{caso.tensionEtica}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div
            style={{
              marginTop: '2.5rem',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <button
              className="btn-primary btn-lg"
              onClick={() => {
                setFaseActual('preguntas')
                setIndicePregunta(0)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              Iniciar deliberación ética →
            </button>
          </div>
        </section>
      )}

      {/* ============================================================== */}
      {/* ETAPA 2: PREGUNTAS ÉTICAS Y SITUACIONES (CASOS + TRANSVERSALES) */}
      {/* ============================================================== */}
      {faseActual === 'preguntas' && preguntaActual && (
        <section className="pilot-section-view">
          {/* INTERLUDIO PEDAGÓGICO DE CUESTIONAMIENTO */}
          {interludioCuestionamiento && (
            <div
              className={`cuestionamiento-interludio ${
                estaSaliendoInterludio ? 'anim-salida' : 'anim-entrada'
              }`}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                background: 'rgba(5, 7, 14, 0.88)',
                backdropFilter: 'blur(16px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
              }}
            >
              <div
                style={{
                  maxWidth: '680px',
                  background: 'rgba(15, 23, 42, 0.96)',
                  border: '1px solid rgba(221, 214, 254, 0.3)',
                  borderRadius: '16px',
                  padding: '32px 36px',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#DDD6FE',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '12px',
                  }}
                >
                  <IconSpark size={16} /> Reflexión dialéctica sobre tu elección (Opción{' '}
                  {interludioCuestionamiento.letra})
                </div>

                <p
                  style={{
                    color: '#F8FAFC',
                    fontSize: '1.15rem',
                    lineHeight: '1.65',
                    fontStyle: 'italic',
                    marginBottom: '24px',
                  }}
                >
                  "{interludioCuestionamiento.cuestionamiento}"
                </p>

                <button className="btn-primary" onClick={iniciarSalidaInterludio}>
                  {interludioCuestionamiento.esUltimaPregunta
                    ? 'Continuar a las perspectivas de los filósofos →'
                    : 'Continuar a la siguiente decisión →'}
                </button>
              </div>
            </div>
          )}

          {/* BARRA DE PROGRESO DE PREGUNTAS */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem',
              color: '#94A3B8',
              fontSize: '0.85rem',
            }}
          >
            <span>
              Decisión {indicePregunta + 1} de {preguntasData.length}
            </span>
            <div
              style={{
                width: '180px',
                height: '6px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '3px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${((indicePregunta + 1) / preguntasData.length) * 100}%`,
                  height: '100%',
                  background: '#DDD6FE',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
          </div>

          <div
            style={{
              background: 'rgba(15, 23, 42, 0.85)',
              border: '1px solid rgba(221, 214, 254, 0.18)',
              borderRadius: '16px',
              padding: '28px 32px',
              boxShadow: '0 12px 36px rgba(0, 0, 0, 0.4)',
            }}
          >
            <h3 style={{ margin: '0 0 12px', color: '#F8FAFC', fontSize: '1.25rem' }}>
              {preguntaActual.tituloCaso}
            </h3>

            {preguntaActual.descripcionDetallada?.map((p, idx) => (
              <p
                key={idx}
                style={{
                  color: '#CBD5E1',
                  fontSize: '0.92rem',
                  lineHeight: '1.65',
                  marginBottom: '12px',
                }}
              >
                {p}
              </p>
            ))}

            <div
              style={{
                margin: '20px 0 24px',
                padding: '16px 20px',
                background: 'rgba(40, 30, 50, 0.55)',
                borderLeft: '4px solid #DDD6FE',
                borderRadius: '0 10px 10px 0',
              }}
            >
              <h4 style={{ margin: '0 0 6px', color: '#DDD6FE', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Pregunta ética central
              </h4>
              <p style={{ margin: 0, color: '#F8FAFC', fontSize: '1.05rem', fontWeight: 600, lineHeight: '1.5' }}>
                {preguntaActual.pregunta}
              </p>
            </div>

            {/* OPCIONES DE RESPUESTA */}
            <div style={{ display: 'grid', gap: '12px' }}>
              {preguntaActual.alternativas?.map((alt) => {
                const seleccionada = respuestaSeleccionadaPregunta === alt.id
                return (
                  <button
                    key={alt.id}
                    onClick={() => handleSeleccionarAlternativa(alt.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '14px',
                      padding: '14px 18px',
                      background: seleccionada
                        ? 'rgba(221, 214, 254, 0.14)'
                        : 'rgba(15, 23, 42, 0.65)',
                      border: seleccionada
                        ? '1.5px solid #DDD6FE'
                        : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '10px',
                      color: '#F8FAFC',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        background: seleccionada ? '#DDD6FE' : 'rgba(255, 255, 255, 0.1)',
                        color: seleccionada ? '#0F172A' : '#94A3B8',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        flexShrink: 0,
                      }}
                    >
                      {alt.letra}
                    </span>
                    <span style={{ fontSize: '0.92rem', lineHeight: '1.55', color: '#E2E8F0' }}>
                      {alt.texto}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* BOTONES DE NAVEGACIÓN */}
            <div
              style={{
                marginTop: '28px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <button className="btn-secondary" onClick={handleAnteriorPregunta}>
                ← Anterior
              </button>

              <button
                className="btn-primary"
                disabled={!respuestaSeleccionadaPregunta}
                onClick={handleSiguientePregunta}
                style={{
                  opacity: respuestaSeleccionadaPregunta ? 1 : 0.5,
                  cursor: respuestaSeleccionadaPregunta ? 'pointer' : 'not-allowed',
                }}
              >
                {indicePregunta === preguntasData.length - 1
                  ? 'Finalizar decisiones y ver filósofos →'
                  : 'Registrar postura y continuar →'}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================== */}
      {/* ETAPA 3: CONFRONTACIÓN CON AUTORES FILOSÓFICOS                */}
      {/* ============================================================== */}
      {faseActual === 'reflexion' && (
        <section className="pilot-section-view">
          <div className="section-heading-block">
            <h2 style={{ fontSize: '1.25rem', color: '#F8FAFC', marginBottom: '8px' }}>
              Confrontación con las tradiciones filosóficas de la ética animal
            </h2>
            <p style={{ color: '#CBD5E1', fontSize: '0.92rem' }}>
              Evalúa los argumentos de los cuatro grandes pensadores que transformaron la bioética
              animal. Responde a la pregunta de reflexión de cada autor para confrontar tus propias
              intuiciones éticas.
            </p>
          </div>

          {/* TARJETA UNIFICADA CON FONDO CÁLIDO/PASTEL (UN AUTOR A LA VEZ) */}
          {reflexionData[indiceReflexion] && (
            <div
              style={{
                background: 'rgba(38, 28, 48, 0.65)',
                border: '1px solid rgba(221, 214, 254, 0.22)',
                borderLeft: '4px solid #DDD6FE',
                borderRadius: '14px',
                padding: '28px 32px',
                boxShadow: '0 12px 36px rgba(0, 0, 0, 0.45)',
                marginTop: '1.5rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '14px',
                  color: '#DDD6FE',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                <span>
                  Perspectiva {indiceReflexion + 1} de {reflexionData.length} ·{' '}
                  {reflexionData[indiceReflexion].autor}
                </span>
                <span style={{ color: '#94A3B8', fontWeight: 400, textTransform: 'none' }}>
                  Paso {indiceReflexion + 1}/{reflexionData.length}
                </span>
              </div>

              <h3 style={{ margin: '0 0 14px', color: '#F8FAFC', fontSize: '1.3rem' }}>
                {reflexionData[indiceReflexion].titulo}
              </h3>

              <p style={{ color: '#CBD5E1', fontSize: '0.95rem', lineHeight: '1.65', marginBottom: '16px' }}>
                {reflexionData[indiceReflexion].contextualizacionPrevia}
              </p>

              <blockquote
                style={{
                  margin: '18px 0',
                  padding: '14px 18px',
                  background: 'rgba(15, 23, 42, 0.65)',
                  borderLeft: '3px solid #DDD6FE',
                  borderRadius: '0 8px 8px 0',
                  color: '#F8FAFC',
                  fontSize: '0.96rem',
                  fontStyle: 'italic',
                  lineHeight: '1.6',
                }}
              >
                {reflexionData[indiceReflexion].citaDocumento}
              </blockquote>

              <div style={{ marginTop: '20px' }}>
                <label
                  style={{
                    display: 'block',
                    color: '#DDD6FE',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    marginBottom: '8px',
                    lineHeight: '1.45',
                  }}
                >
                  {reflexionData[indiceReflexion].enunciado}
                </label>

                <textarea
                  value={respuestasReflexion[reflexionData[indiceReflexion].id] || ''}
                  onChange={(e) =>
                    setRespuestasReflexion((prev) => ({
                      ...prev,
                      [reflexionData[indiceReflexion].id]: e.target.value,
                    }))
                  }
                  placeholder="Escribe tu reflexión argumentada aquí..."
                  rows={4}
                  style={{
                    width: '100%',
                    background: 'rgba(15, 23, 42, 0.75)',
                    border: '1px solid rgba(221, 214, 254, 0.25)',
                    borderRadius: '8px',
                    color: '#F8FAFC',
                    padding: '12px 14px',
                    fontSize: '0.92rem',
                    lineHeight: '1.5',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* BOTONES DE NAVEGACIÓN ENTRE AUTORES */}
              <div
                style={{
                  marginTop: '24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <button
                  className="btn-secondary"
                  onClick={() => {
                    if (indiceReflexion > 0) {
                      setIndiceReflexion((prev) => prev - 1)
                    } else {
                      setFaseActual('preguntas')
                      setIndicePregunta(preguntasData.length - 1)
                    }
                  }}
                >
                  ← Anterior
                </button>

                <button
                  className="btn-primary"
                  onClick={() => {
                    if (indiceReflexion < reflexionData.length - 1) {
                      setIndiceReflexion((prev) => prev + 1)
                    } else {
                      setFaseActual('test')
                      setIndiceAfirmacion(0)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }
                  }}
                >
                  {indiceReflexion === reflexionData.length - 1
                    ? 'Avanzar al test de afinidad ética →'
                    : 'Ver siguiente perspectiva de autor →'}
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {/* ============================================================== */}
      {/* ETAPA 4: MATRIZ Y TEST DE AFINIDAD ÉTICA                       */}
      {/* ============================================================== */}
      {faseActual === 'test' && afirmacionActual && (
        <section className="pilot-section-view">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem',
              color: '#94A3B8',
              fontSize: '0.85rem',
            }}
          >
            <span>
              Afirmación {indiceAfirmacion + 1} de {testData.afirmaciones.length}
            </span>
            <div
              style={{
                width: '180px',
                height: '6px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '3px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${((indiceAfirmacion + 1) / testData.afirmaciones.length) * 100}%`,
                  height: '100%',
                  background: '#DDD6FE',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
          </div>

          <div
            style={{
              background: 'rgba(15, 23, 42, 0.85)',
              border: '1px solid rgba(221, 214, 254, 0.2)',
              borderRadius: '16px',
              padding: '32px',
              boxShadow: '0 12px 36px rgba(0, 0, 0, 0.4)',
            }}
          >
            <span
              style={{
                color: '#DDD6FE',
                fontSize: '0.82rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              Eje de evaluación: {afirmacionActual.eje}
            </span>

            <h3
              style={{
                margin: '14px 0 28px',
                color: '#F8FAFC',
                fontSize: '1.2rem',
                lineHeight: '1.6',
              }}
            >
              "{afirmacionActual.texto}"
            </h3>

            {/* ESCALA LIKERT DE 1 A 5 */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: '10px',
                marginBottom: '28px',
              }}
            >
              {[
                { val: 1, label: 'Totalmente en desacuerdo' },
                { val: 2, label: 'En desacuerdo' },
                { val: 3, label: 'Neutro / Depende' },
                { val: 4, label: 'De acuerdo' },
                { val: 5, label: 'Totalmente de acuerdo' },
              ].map((opcion) => {
                const seleccionada = valorSeleccionadoAfirmacion === opcion.val
                return (
                  <button
                    key={opcion.val}
                    onClick={() => handleSeleccionarLikert(opcion.val)}
                    style={{
                      padding: '14px 8px',
                      background: seleccionada
                        ? 'rgba(221, 214, 254, 0.2)'
                        : 'rgba(255, 255, 255, 0.04)',
                      border: seleccionada
                        ? '2px solid #DDD6FE'
                        : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '10px',
                      color: '#F8FAFC',
                      cursor: 'pointer',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <span style={{ fontSize: '1.25rem', fontWeight: 700, color: seleccionada ? '#DDD6FE' : '#94A3B8' }}>
                      {opcion.val}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#CBD5E1', lineHeight: '1.2' }}>
                      {opcion.label}
                    </span>
                  </button>
                )
              })}
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <button className="btn-secondary" onClick={handleAnteriorAfirmacion}>
                ← Anterior
              </button>

              <button
                className="btn-primary"
                disabled={!valorSeleccionadoAfirmacion}
                onClick={handleSiguienteAfirmacion}
                style={{
                  opacity: valorSeleccionadoAfirmacion ? 1 : 0.5,
                  cursor: valorSeleccionadoAfirmacion ? 'pointer' : 'not-allowed',
                }}
              >
                {indiceAfirmacion === testData.afirmaciones.length - 1
                  ? 'Ver resultados y síntesis de afinidad →'
                  : 'Siguiente afirmación →'}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================== */}
      {/* ETAPA 5: RESULTADOS Y SÍNTESIS DE AFINIDAD FILOSÓFICA          */}
      {/* ============================================================== */}
      {faseActual === 'resultados' && (
        <section className="pilot-section-view">
          <div className="section-heading-block">
            <h2 style={{ fontSize: '1.25rem', color: '#F8FAFC', marginBottom: '8px' }}>
              Tu perfil ético en el debate sobre animales en el espacio
            </h2>
            <p style={{ color: '#CBD5E1', fontSize: '0.92rem' }}>
              A partir de tus respuestas en las decisiones y en la matriz ética, se calculó tu
              afinidad con los cuatro marcos de pensamiento bioético.
            </p>
          </div>

          {/* CUADRÍCULA DE LOS 4 AUTORES CON PORCENTAJES Y ESPACIO PARA FOTO */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '14px',
              marginTop: '1.5rem',
            }}
          >
            {autoresData.map((autor) => {
              const afinidad = afinidadesCalculadas.find((a) => a.autorId === autor.id)
              const porcentaje = afinidad ? afinidad.porcentaje : 0
              const seleccionado = autor.id === autorSeleccionadoId

              return (
                <div
                  key={autor.id}
                  onClick={() => setAutorSeleccionadoId(autor.id)}
                  style={{
                    background: seleccionado
                      ? 'rgba(40, 30, 50, 0.75)'
                      : 'rgba(15, 23, 42, 0.65)',
                    border: seleccionado
                      ? '2px solid #DDD6FE'
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    padding: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: seleccionado ? '0 8px 24px rgba(221, 214, 254, 0.15)' : 'none',
                  }}
                >
                  {/* ESPACIO RESERVADO PARA FOTO DEL AUTOR */}
                  <div
                    style={{
                      width: '68px',
                      height: '68px',
                      borderRadius: '50%',
                      background: 'rgba(221, 214, 254, 0.15)',
                      border: '1.5px solid rgba(221, 214, 254, 0.35)',
                      margin: '0 auto 10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#DDD6FE',
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      overflow: 'hidden',
                    }}
                  >
                    {autor.fotoUrl ? (
                      <img
                        src={autor.fotoUrl}
                        alt={autor.nombre}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    ) : (
                      autor.nombre
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)
                    )}
                  </div>

                  <h4 style={{ margin: '0 0 4px', color: '#F8FAFC', fontSize: '1rem', textAlign: 'center' }}>
                    {autor.nombre}
                  </h4>
                  <p
                    style={{
                      margin: '0 0 10px',
                      color: '#94A3B8',
                      fontSize: '0.78rem',
                      textAlign: 'center',
                      minHeight: '28px',
                    }}
                  >
                    {autor.enfoque.split(',')[0]}
                  </p>

                  <div style={{ textAlign: 'center' }}>
                    <span
                      style={{
                        fontSize: '1.4rem',
                        fontWeight: 700,
                        color: porcentaje >= 65 ? '#A7F3D0' : porcentaje >= 45 ? '#DDD6FE' : '#94A3B8',
                      }}
                    >
                      {porcentaje}%
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'block' }}>
                      afinidad con tus respuestas
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* DETALLE DEL AUTOR SELECCIONADO EN CAJA CÁLIDA/PASTEL */}
          {autorDetalle && (
            <div
              style={{
                marginTop: '1.75rem',
                background: 'rgba(38, 28, 48, 0.65)',
                border: '1px solid rgba(221, 214, 254, 0.22)',
                borderLeft: '4px solid #DDD6FE',
                borderRadius: '14px',
                padding: '24px 28px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  flexWrap: 'wrap',
                  gap: '8px',
                  marginBottom: '10px',
                }}
              >
                <h3 style={{ margin: 0, color: '#F8FAFC', fontSize: '1.25rem' }}>
                  {autorDetalle.nombre} · {afinidadDetalle?.porcentaje || 0}% de coincidencia
                </h3>
                <span style={{ color: '#DDD6FE', fontSize: '0.85rem', fontStyle: 'italic' }}>
                  {autorDetalle.obraReferencia}
                </span>
              </div>

              <p style={{ color: '#CBD5E1', fontSize: '0.94rem', lineHeight: '1.65', marginBottom: '16px' }}>
                {autorDetalle.resumenArgumento}
              </p>

              {afinidadDetalle?.descripcionAfinidad && (
                <div
                  style={{
                    padding: '12px 16px',
                    background: 'rgba(15, 23, 42, 0.6)',
                    borderRadius: '8px',
                    borderLeft: '3px solid #A7F3D0',
                    marginBottom: '16px',
                  }}
                >
                  <strong style={{ color: '#A7F3D0', fontSize: '0.85rem' }}>
                    Diagnóstico de afinidad:{' '}
                  </strong>
                  <span style={{ color: '#E2E8F0', fontSize: '0.88rem', lineHeight: '1.5' }}>
                    {afinidadDetalle.descripcionAfinidad}
                  </span>
                </div>
              )}

              {/* APLICACIÓN AL DEBATE ESPACIAL */}
              <div style={{ marginTop: '16px' }}>
                <h4
                  style={{
                    margin: '0 0 6px',
                    color: '#DDD6FE',
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  Aplicación al debate sobre el espacio y la investigación animal:
                </h4>
                <p style={{ margin: 0, color: '#E2E8F0', fontSize: '0.92rem', lineHeight: '1.6' }}>
                  {autorDetalle.aplicacionCaso}
                </p>
              </div>
            </div>
          )}

          {/* BOTÓN INFERIOR DE FINALIZACIÓN ALINEADO A LA DERECHA */}
          <div
            style={{
              marginTop: '2.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <button
              className="btn-secondary"
              onClick={() => {
                setFaseActual('test')
                setIndiceAfirmacion(testData.afirmaciones.length - 1)
              }}
            >
              ← Revisar matriz ética
            </button>

            <button
              className="btn-primary"
              onClick={() => {
                alert('¡Has completado el recorrido de la Tercera Directriz sobre bioética animal en el espacio!')
                onVolverAlCatalogo?.()
              }}
            >
              Finalizar recorrido ético ✓
            </button>
          </div>
        </section>
      )}
    </div>
  )
}
