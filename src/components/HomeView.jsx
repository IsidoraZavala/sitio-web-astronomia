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
import { NasaAnimalResearchCardVisual } from './NasaAnimalResearchCardVisual'
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
                <IconChatBranch size={17} /> Comenzar deliberación
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
          {/* DILEMA 1: ÉTICA AMBIENTAL */}
          <article className="dilemma-catalog-card">
            <div className="dilemma-card-visual">
              <NasaTracesCardVisual />
            </div>
            <div className="dilemma-card-body">
              <span className="dilemma-category-pill cat-ambiental">
                Ética ambiental
              </span>
              <h2>¿Bajo qué criterios y límites resulta éticamente aceptable alterar o dejar huellas en otros cuerpos celestes, y qué responsabilidades asume la humanidad ante el impacto de su presencia en el espacio?</h2>
              <p>Materiales y residuos en la Luna y Marte: necesidad técnica, valor del entorno y responsabilidad futura.</p>
              
              <div className="dilemma-card-actions">
                <button
                  className="dilemma-card-action-btn"
                  onClick={() =>
                    onSelectSpecificDilemma?.('huellas-exploracion-espacial')
                  }
                >
                  Iniciar deliberación
                </button>
              </div>
            </div>
          </article>

          {/* DILEMA 2: BIENES Y PROPIEDAD */}
          <article className="dilemma-catalog-card">
            <div className="dilemma-card-visual">
              <NasaAsteroidMonitorVisual />
            </div>
            <div className="dilemma-card-body">
              <span className="dilemma-category-pill cat-propiedad">
                Bienes y propiedad
              </span>
              <h2>¿Qué principios éticos deberían regular el uso de bienes materiales extraterrestres y a qué objetivos deben subordinarse tales bienes?</h2>
              <p>Minería lunar, memoriales privados y soberanía extraterrestre: libertarismo, justicia distributiva y bien común.</p>
              
              <div className="dilemma-card-actions">
                <button
                  className="dilemma-card-action-btn"
                  onClick={() =>
                    onSelectSpecificDilemma?.('uso-bienes-materiales-propiedad')
                  }
                >
                  Iniciar deliberación
                </button>
              </div>
            </div>
          </article>

          {/* DILEMA 3: BIOÉTICA ANIMAL */}
          <article className="dilemma-catalog-card">
            <div className="dilemma-card-visual">
              <NasaAnimalResearchCardVisual />
            </div>
            <div className="dilemma-card-body">
              <span className="dilemma-category-pill cat-animal">
                Bioética animal
              </span>
              <h2>¿Cómo debe conciliarse el valor moral de los animales con las necesidades científicas y de seguridad de la exploración espacial humana?</h2>
              <p>Vuelos pioneros, adiestramiento aversivo, eutanasia post-misión y el principio de reemplazo: Bentham, Singer, Regan y Nussbaum.</p>
              
              <div className="dilemma-card-actions">
                <button
                  className="dilemma-card-action-btn"
                  onClick={() =>
                    onSelectSpecificDilemma?.('uso-animales-investigacion-espacial')
                  }
                >
                  Iniciar deliberación
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* SECCIÓN DE GRANDES DIVULGADORES CIENTÍFICOS */}
      <section className="home-quotes-section">
        <div className="section-heading-block">
          <span className="section-kicker">Pensamiento crítico y ética de la exploración</span>
          <TypewriterTitle
            as="h2"
            text="Voces de la ciencia y la filosofía"
            speed={28}
          />
          <p>
            Reflexiones de grandes divulgadores e investigadores sobre la razón, el coraje de cuestionar y la responsabilidad humana ante el cosmos.
          </p>
        </div>

        <div className="home-quotes-grid">
          {/* CITA 1: GALILEO GALILEI */}
          <article className="home-quote-card">
            <div className="quote-card-header">
              <span className="quote-card-badge">Razón e Independencia</span>
              <span className="quote-mark-icon" aria-hidden="true">“</span>
            </div>
            <div className="quote-card-body">
              <blockquote className="quote-text-primary">
                «[...] in matters of knowledge the authority of a thousand people’s opinion is not equal to the spark of reason of a single individual».
              </blockquote>
              <p className="quote-text-translation">
                «En cuestiones de conocimiento, la autoridad de la opinión de mil personas no equivale al destello de razón de un solo individuo».
              </p>
            </div>
            <footer className="quote-card-footer">
              <div className="quote-author-name">Galileo Galilei</div>
              <div className="quote-author-work">
                <em>On Sunspots</em>, carta: <em>“Third letter of Signor Galileo Galilei to Signor Marc Welser about the solar spots...”</em>, p. 266.
              </div>
              <div className="quote-apa-ref">
                <strong>Ref. APA 7:</strong> Galilei, G., & Scheiner, C. (2010). <em>On Sunspots</em> (E. Reeves & A. Van Helden, Trads.). University of Chicago Press.
              </div>
            </footer>
          </article>

          {/* CITA 2: CARL SAGAN */}
          <article className="home-quote-card">
            <div className="quote-card-header">
              <span className="quote-card-badge">Responsabilidad Planetaria</span>
              <span className="quote-mark-icon" aria-hidden="true">“</span>
            </div>
            <div className="quote-card-body">
              <blockquote className="quote-text-primary">
                «If we long for our planet to be important, there is something we can do about it. We make our world significant by the courage of our questions and by the depth of our answers».
              </blockquote>
              <p className="quote-text-translation">
                «Si anhelamos que nuestro planeta sea importante, hay algo que podemos hacer al respecto: hacemos que nuestro mundo sea significativo por el valor de nuestras preguntas y por la profundidad de nuestras respuestas».
              </p>
            </div>
            <footer className="quote-card-footer">
              <div className="quote-author-name">Carl Sagan</div>
              <div className="quote-author-work">
                <em>Cosmos</em>, capítulo: <em>“The Backbone of Night”</em>, p. 160.
              </div>
              <div className="quote-apa-ref">
                <strong>Ref. APA 7:</strong> Sagan, C. (1980). <em>Cosmos</em>. Random House.
              </div>
            </footer>
          </article>

          {/* CITA 3: NEIL DEGRASSE TYSON */}
          <article className="home-quote-card">
            <div className="quote-card-header">
              <span className="quote-card-badge">Conocimiento y Ética</span>
              <span className="quote-mark-icon" aria-hidden="true">“</span>
            </div>
            <div className="quote-card-body">
              <blockquote className="quote-text-primary">
                «[...] there is no shame in not knowing. The problem arises when irrational thought and attendant behavior fill vacuum left by ignorance».
              </blockquote>
              <p className="quote-text-translation">
                «[...] no hay vergüenza en no saber. El problema surge cuando el pensamiento irracional y la conducta que lo acompaña llenan el vacío que deja la ignorancia».
              </p>
            </div>
            <footer className="quote-card-footer">
              <div className="quote-author-name">Neil deGrasse Tyson</div>
              <div className="quote-author-work">
                <em>The Sky Is Not The Limit: Adventures of an Urban Astrophysicist</em>, capítulo: <em>“Night Vision”</em>, p. 18.
              </div>
              <div className="quote-apa-ref">
                <strong>Ref. APA 7:</strong> Tyson, N. deG. (2004). <em>The Sky Is Not My Limit: Adventures of an Urban Astrophysicist</em>. Prometheus Books.
              </div>
            </footer>
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
            Ver perspectivas
          </button>
        </div>
      </section>
    </div>
  )
}
