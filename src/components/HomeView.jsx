import { useState, useEffect } from 'react'
import {
  IconBook,
  IconChatBranch,
  IconCheckCircle,
  IconCompass,
  IconGlobe,
  IconShieldQuestion,
} from './Icons'
import { NasaTracesCardVisual } from './NasaTracesCardVisual'
import { NasaAsteroidMonitorVisual } from './NasaAsteroidMonitorVisual'
import { TypewriterTitle } from './TypewriterTitle'
import { APOD_CURADAS } from '../data/nasaApodData'

export function HomeView({
  onExploreDilemmas,
  onOpenLibrary,
  onStartFeaturedDilemma,
  onSelectSpecificDilemma,
}) {
  const [apod, setApod] = useState(APOD_CURADAS[0])

  useEffect(() => {
    let cancelado = false
    const fetchApod = async () => {
      try {
        const res = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
        if (!res.ok) throw new Error('Status ' + res.status)
        const data = await res.json()
        if (
          !cancelado &&
          data.media_type === 'image' &&
          data.url &&
          !data.url.includes('nasa-logo')
        ) {
          setApod(data)
        }
      } catch {
        // En caso de tasa límite o sin conexión, se mantiene la imagen curada oficial de NASA
      }
    }
    fetchApod()
    return () => {
      cancelado = true
    }
  }, [])

  return (
    <div className="home-view">
      {/* PRIMERA SECCIÓN: Fondo dinámico con la Foto Astronómica del Día de la NASA (APOD) */}
      <section
        className="hero-solid-card hero-edge-to-edge-black"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(5, 7, 14, 0.88) 0%, rgba(5, 7, 14, 0.68) 50%, rgba(5, 7, 14, 0.94) 100%), url(${apod.url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
        }}
      >
        <div className="hero-edge-inner" style={{ gridTemplateColumns: '1fr', maxWidth: '960px' }}>
          <div className="hero-text-col" style={{ maxWidth: '820px' }}>
            <TypewriterTitle
              as="h1"
              className="hero-main-title"
              text="El futuro del espacio también plantea decisiones éticas."
              highlightText="decisiones éticas."
              speed={32}
            />
            <p className="hero-lead">
              Explora dilemas espaciales mediante un diálogo filosófico interactivo donde las
              preguntas evolucionan según tus respuestas.
            </p>

            <div className="hero-cta-row">
              <button
                className="btn-primary btn-lg icon-btn"
                onClick={() => onSelectSpecificDilemma?.('huellas-exploracion-espacial')}
              >
                <IconChatBranch size={17} /> Comenzar deliberación →
              </button>
            </div>

            {/* INFORMACIÓN DE LA FOTO ASTRONÓMICA DE LA NASA (APOD) */}
            <div
              style={{
                marginTop: '44px',
                maxWidth: '720px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  gap: '12px',
                  flexWrap: 'wrap',
                  marginBottom: '6px',
                }}
              >
                <div style={{ color: '#F8FAFC', fontWeight: 700, fontSize: '13px', lineHeight: 1.3 }}>
                  {apod.title}
                  {apod.date && (
                    <span style={{ color: '#94A3B8', fontWeight: 400, fontSize: '11px', marginLeft: '8px' }}>
                      · {apod.date}
                    </span>
                  )}
                </div>
                {(apod.hdurl || apod.url) && (
                  <a
                    href={apod.hdurl || apod.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      color: '#DDD6FE',
                      textDecoration: 'none',
                      fontSize: '11px',
                      fontWeight: 600,
                      transition: 'opacity 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                  >
                    Ver en HD ↗
                  </a>
                )}
              </div>
              <div style={{ color: '#94A3B8', fontSize: '12px', lineHeight: 1.55 }}>
                {apod.explanation}
              </div>
              {apod.copyright && (
                <div style={{ marginTop: '6px', fontSize: '11px', color: '#64748B' }}>
                  Crédito: {apod.copyright}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* RUTA VISUAL EN 5 PASOS CON ICONOS FLOTANTES */}
      <section style={{ marginTop: '3.5rem', marginBottom: '3.5rem' }}>
        <div className="section-heading-block" style={{ textAlign: 'center' }}>
          <TypewriterTitle
            as="h2"
            text="Ruta de deliberación en 5 pasos"
            speed={28}
          />
        </div>

        <div className="steps-floating-grid">
          <div className="step-floating-item">
            <div className="step-floating-icon-wrap">
              <div className="step-floating-icon">
                <IconGlobe size={28} />
              </div>
              <span className="step-floating-badge">1</span>
            </div>
            <span className="step-floating-title">1. El dilema</span>
          </div>

          <div className="step-floating-item">
            <div className="step-floating-icon-wrap">
              <div className="step-floating-icon">
                <IconChatBranch size={28} />
              </div>
              <span className="step-floating-badge">2</span>
            </div>
            <span className="step-floating-title">2. Diálogo</span>
          </div>

          <div className="step-floating-item">
            <div className="step-floating-icon-wrap">
              <div className="step-floating-icon">
                <IconCompass size={28} />
              </div>
              <span className="step-floating-badge">3</span>
            </div>
            <span className="step-floating-title">3. Perspectivas</span>
          </div>

          <div className="step-floating-item">
            <div className="step-floating-icon-wrap">
              <div className="step-floating-icon">
                <IconShieldQuestion size={28} />
              </div>
              <span className="step-floating-badge">4</span>
            </div>
            <span className="step-floating-title">4. Objeciones</span>
          </div>

          <div className="step-floating-item">
            <div className="step-floating-icon-wrap">
              <div className="step-floating-icon">
                <IconCheckCircle size={28} />
              </div>
              <span className="step-floating-badge">5</span>
            </div>
            <span className="step-floating-title">5. Cierre</span>
          </div>
        </div>
      </section>

      {/* LOS DILEMAS ESPACIALES */}
      <section style={{ marginBottom: '3rem' }}>
        <div className="section-heading-block">
          <TypewriterTitle
            as="h2"
            text="Dilemas espaciales"
            speed={28}
          />
        </div>

        <div className="catalog-grid">
          {/* DILEMA 1: ÉTICA AMBIENTAL (VERDE MENTA PASTEL) */}
          <article
            className="dilemma-catalog-card"
            style={{
              borderColor: 'rgba(110, 231, 183, 0.45)',
              boxShadow: '0 4px 20px rgba(110, 231, 183, 0.05)',
            }}
          >
            <div className="dilemma-card-visual" style={{ background: '#05060A', padding: '10px' }}>
              <NasaTracesCardVisual />
            </div>
            <div className="dilemma-card-body">
              <span
                style={{
                  alignSelf: 'flex-start',
                  marginBottom: '10px',
                  padding: '3px 10px',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  borderRadius: '20px',
                  background: 'rgba(110, 231, 183, 0.12)',
                  border: '1px solid rgba(110, 231, 183, 0.35)',
                  color: '#A7F3D0',
                }}
              >
                Ética Ambiental
              </span>
              <h2>¿Bajo qué criterios y límites resulta éticamente aceptable alterar o dejar huellas en otros cuerpos celestes, y qué responsabilidades asume la humanidad ante el impacto de su presencia en el espacio?</h2>
              <p>Materiales y residuos en la Luna y Marte: necesidad técnica, valor del entorno y responsabilidad futura.</p>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto' }}>
                <button
                  style={{
                    background: 'rgba(110, 231, 183, 0.16)',
                    color: '#A7F3D0',
                    border: '1px solid rgba(110, 231, 183, 0.5)',
                    borderRadius: '8px',
                    padding: '7px 16px',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    width: 'fit-content',
                    transition: 'all 0.2s ease',
                  }}
                  onClick={() =>
                    onSelectSpecificDilemma?.('huellas-exploracion-espacial')
                  }
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#A7F3D0'
                    e.currentTarget.style.color = '#064E3B'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(110, 231, 183, 0.16)'
                    e.currentTarget.style.color = '#A7F3D0'
                  }}
                >
                  Iniciar recorrido ético
                </button>
              </div>
            </div>
          </article>

          {/* DILEMA 2: BIENES Y PROPIEDAD (DURAZNO / ÁMBAR PASTEL) */}
          <article
            className="dilemma-catalog-card"
            style={{
              borderColor: 'rgba(254, 215, 170, 0.45)',
              boxShadow: '0 4px 20px rgba(254, 215, 170, 0.05)',
            }}
          >
            <div className="dilemma-card-visual" style={{ background: '#05060A', padding: '10px' }}>
              <NasaAsteroidMonitorVisual />
            </div>
            <div className="dilemma-card-body">
              <span
                style={{
                  alignSelf: 'flex-start',
                  marginBottom: '10px',
                  padding: '3px 10px',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  borderRadius: '20px',
                  background: 'rgba(254, 215, 170, 0.12)',
                  border: '1px solid rgba(254, 215, 170, 0.35)',
                  color: '#FED7AA',
                }}
              >
                Bienes y Propiedad
              </span>
              <h2>¿Qué principios éticos deberían regular el uso de bienes materiales extraterrestres y a qué objetivos deben subordinarse tales bienes?</h2>
              <p>Minería lunar, memoriales privados y soberanía extraterrestre: libertarismo, justicia distributiva y bien común.</p>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto' }}>
                <button
                  style={{
                    background: 'rgba(254, 215, 170, 0.16)',
                    color: '#FED7AA',
                    border: '1px solid rgba(254, 215, 170, 0.5)',
                    borderRadius: '8px',
                    padding: '7px 16px',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    width: 'fit-content',
                    transition: 'all 0.2s ease',
                  }}
                  onClick={() =>
                    onSelectSpecificDilemma?.('uso-bienes-materiales-propiedad')
                  }
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#FED7AA'
                    e.currentTarget.style.color = '#431407'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(254, 215, 170, 0.16)'
                    e.currentTarget.style.color = '#FED7AA'
                  }}
                >
                  Iniciar recorrido ético
                </button>
              </div>
            </div>
          </article>

          {/* DILEMA 3: CIELO Y SATÉLITES (LAVANDA PASTEL) */}
          <article
            className="dilemma-catalog-card"
            style={{
              borderColor: 'rgba(221, 214, 254, 0.45)',
              boxShadow: '0 4px 20px rgba(221, 214, 254, 0.05)',
            }}
          >
            <div className="dilemma-card-visual" style={{ background: '#05060A', padding: '10px' }}>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '155px',
                  overflow: 'hidden',
                  borderRadius: '8px',
                  background: '#060814',
                }}
              >
                <img
                  src="https://images-assets.nasa.gov/image/GSFC_20171208_archive_e000401/GSFC_20171208_archive_e000401~medium.jpg"
                  alt="Telescopios espaciales y cielo nocturno"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    filter: 'brightness(0.9) contrast(1.05)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(180deg, rgba(6, 8, 20, 0.05) 0%, rgba(6, 8, 20, 0.45) 55%, rgba(6, 8, 20, 0.96) 100%)',
                    pointerEvents: 'none',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '12px',
                    right: '12px',
                    zIndex: 2,
                  }}
                >
                  <p
                    style={{
                      margin: '0 0 3px',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      lineHeight: '1.3',
                      textShadow: '0 2px 4px rgba(0,0,0,0.85)',
                    }}
                  >
                    Observación astronómica y cielo nocturno
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: '10.5px',
                      color: '#94A3B8',
                      lineHeight: '1.35',
                      fontStyle: 'italic',
                    }}
                  >
                    Impacto de megaconstelaciones satelitales en la ciencia y el cielo oscuro.
                  </p>
                </div>
              </div>
            </div>
            <div className="dilemma-card-body">
              <span
                style={{
                  alignSelf: 'flex-start',
                  marginBottom: '10px',
                  padding: '3px 10px',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  borderRadius: '20px',
                  background: 'rgba(221, 214, 254, 0.12)',
                  border: '1px solid rgba(221, 214, 254, 0.35)',
                  color: '#DDD6FE',
                }}
              >
                Cielo y Satélites
              </span>
              <h2>¿Deberíamos limitar las megaconstelaciones satelitales para proteger la investigación astronómica?</h2>
              <p>El crecimiento masivo de satélites en órbita baja frente a la protección de las observaciones científicas y el cielo nocturno.</p>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto' }}>
                <button
                  style={{
                    background: 'rgba(221, 214, 254, 0.16)',
                    color: '#DDD6FE',
                    border: '1px solid rgba(221, 214, 254, 0.5)',
                    borderRadius: '8px',
                    padding: '7px 16px',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    width: 'fit-content',
                    transition: 'all 0.2s ease',
                  }}
                  onClick={() =>
                    onSelectSpecificDilemma?.('megaconstelaciones-astronomia')
                  }
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#DDD6FE'
                    e.currentTarget.style.color = '#2E1065'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(221, 214, 254, 0.16)'
                    e.currentTarget.style.color = '#DDD6FE'
                  }}
                >
                  Iniciar recorrido ético
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="home-process-section">
        <div className="home-bottom-strip">
          <div>
            <strong className="icon-heading" style={{ fontSize: '18px' }}>
              <IconBook size={20} /> Biblioteca de Perspectivas Éticas
            </strong>
            <p>Consulta las fichas breves de cada corriente filosófica.</p>
          </div>
          <button className="btn-secondary icon-btn" onClick={onOpenLibrary}>
            Ver perspectivas →
          </button>
        </div>
      </section>
    </div>
  )
}
