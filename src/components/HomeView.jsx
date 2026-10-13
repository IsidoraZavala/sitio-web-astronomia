import {
  IconBook,
  IconChatBranch,
  IconCheckCircle,
  IconCompass,
  IconGlobe,
  IconShieldQuestion,
} from './Icons'
import { Space3DViewer } from './Space3DViewer'
import { TypewriterTitle } from './TypewriterTitle'

export function HomeView({
  onExploreDilemmas,
  onOpenLibrary,
  onStartFeaturedDilemma,
  onSelectSpecificDilemma,
}) {
  return (
    <div className="home-view">
      {/* PRIMERA SECCIÓN: Ocupa de borde a borde (100vw) en color negro espacio (#05060A) */}
      <section className="hero-solid-card hero-edge-to-edge-black">
        <div className="hero-edge-inner">
          <div className="hero-text-col">
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
              <button className="btn-primary btn-lg icon-btn" onClick={onExploreDilemmas}>
                <IconGlobe size={17} /> Explorar dilemas →
              </button>
            </div>
          </div>

          <div className="hero-visual-col">
            <Space3DViewer initialMode="marte" autoCycle={true} />
          </div>
        </div>
      </section>

      {/* RUTA VISUAL EN 5 PASOS CON ICONOS */}
      <section style={{ marginTop: '3rem', marginBottom: '3rem' }}>
        <div className="section-heading-block">
          <TypewriterTitle
            as="h2"
            text="Ruta de deliberación en 5 pasos"
            speed={28}
          />
        </div>

        <div
          className="steps-overview-grid"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(195px, 1fr))' }}
        >
          <div className="step-overview-card">
            <span className="step-number-box">
              <IconGlobe size={16} />
            </span>
            <h3>1. El dilema</h3>
            <p>Datos reales, supuestos y actores en tensión.</p>
          </div>
          <div className="step-overview-card">
            <span className="step-number-box">
              <IconChatBranch size={16} />
            </span>
            <h3>2. Diálogo</h3>
            <p>Preguntas ramificadas y experimentos mentales.</p>
          </div>
          <div className="step-overview-card">
            <span className="step-number-box">
              <IconCompass size={16} />
            </span>
            <h3>3. Perspectivas</h3>
            <p>Utilitarismo, deontología y justicia distributiva.</p>
          </div>
          <div className="step-overview-card">
            <span className="step-number-box">
              <IconShieldQuestion size={16} />
            </span>
            <h3>4. Objeciones</h3>
            <p>Defiende o matiza tu postura ante críticas.</p>
          </div>
          <div className="step-overview-card">
            <span className="step-number-box">
              <IconCheckCircle size={16} />
            </span>
            <h3>5. Cierre</h3>
            <p>Síntesis de tu postura y preguntas abiertas.</p>
          </div>
        </div>
      </section>

      {/* LOS 4 DILEMAS ESPACIALES */}
      <section style={{ marginBottom: '3rem' }}>
        <div className="section-heading-block">
          <TypewriterTitle
            as="h2"
            text="Dilemas espaciales"
            speed={28}
          />
        </div>

        <div className="catalog-grid">
          <article className="dilemma-catalog-card">
            <div className="dilemma-card-visual" style={{ background: '#05060A', padding: '12px' }}>
              <Space3DViewer initialMode="marte" compact={true} />
            </div>
            <div className="dilemma-card-body">
              <h2>01. ¿Explorar Marte mientras existen urgencias en la Tierra?</h2>
              <p>Financiamiento público de una misión a Marte frente a salud y educación.</p>
              <button
                className="btn-primary icon-btn"
                onClick={() =>
                  onSelectSpecificDilemma?.('mision-marte') || onStartFeaturedDilemma()
                }
              >
                <IconChatBranch size={16} /> Iniciar diálogo →
              </button>
            </div>
          </article>

          <article className="dilemma-catalog-card">
            <div className="dilemma-card-visual" style={{ background: '#05060A', padding: '12px' }}>
              <Space3DViewer initialMode="orbita" compact={true} />
            </div>
            <div className="dilemma-card-body">
              <h2>02. ¿Quién tiene derecho a ocupar la órbita terrestre?</h2>
              <p>Megaconstelaciones satelitales frente a la observación astronómica.</p>
              <button
                className="btn-primary icon-btn"
                onClick={() =>
                  onSelectSpecificDilemma?.('ocupacion-orbita') || onExploreDilemmas()
                }
              >
                <IconChatBranch size={16} /> Iniciar diálogo →
              </button>
            </div>
          </article>

          <article className="dilemma-catalog-card">
            <div className="dilemma-card-visual" style={{ background: '#05060A', padding: '12px' }}>
              <Space3DViewer initialMode="basura" compact={true} />
            </div>
            <div className="dilemma-card-body">
              <h2>03. ¿Quién debe hacerse cargo de la basura espacial?</h2>
              <p>Responsabilidad histórica frente a la seguridad orbital de todos los países.</p>
              <button
                className="btn-primary icon-btn"
                onClick={() =>
                  onSelectSpecificDilemma?.('basura-espacial') || onExploreDilemmas()
                }
              >
                <IconChatBranch size={16} /> Iniciar diálogo →
              </button>
            </div>
          </article>

          <article className="dilemma-catalog-card">
            <div className="dilemma-card-visual" style={{ background: '#05060A', padding: '12px' }}>
              <Space3DViewer initialMode="luna" compact={true} />
            </div>
            <div className="dilemma-card-body">
              <h2>04. ¿Es ético explotar los recursos de la Luna?</h2>
              <p>Extracción de hielo lunar frente a la preservación científica y equidad.</p>
              <button
                className="btn-primary icon-btn"
                onClick={() =>
                  onSelectSpecificDilemma?.('recursos-luna') || onExploreDilemmas()
                }
              >
                <IconChatBranch size={16} /> Iniciar diálogo →
              </button>
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
