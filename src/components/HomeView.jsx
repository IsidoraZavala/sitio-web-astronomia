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
              <button
                className="btn-primary btn-lg icon-btn"
                onClick={() => onSelectSpecificDilemma?.('huellas-exploracion-espacial')}
              >
                <IconChatBranch size={17} /> Comenzar deliberación →
              </button>
            </div>
          </div>

          <div className="hero-visual-col">
            <Space3DViewer initialMode="marte" autoCycle={true} />
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
          {/* DILEMA 1: DIRECTRIZ AMBIENTAL (PRIMERO) */}
          <article className="dilemma-catalog-card" style={{ borderColor: 'var(--accent-green)' }}>
            <div className="dilemma-card-visual" style={{ background: '#05060A', padding: '12px' }}>
              <Space3DViewer initialMode="luna" compact={true} />
            </div>
            <div className="dilemma-card-body">
              <span
                className="pilot-badge-tag"
                style={{
                  marginBottom: '10px',
                  borderColor: 'var(--accent-green)',
                  color: 'var(--accent-green)',
                }}
              >
                Directriz Ambiental · Nuevo
              </span>
              <h2>¿Bajo qué criterios y límites resulta éticamente aceptable alterar o dejar huellas en otros cuerpos celestes, y qué responsabilidades asume la humanidad ante el impacto de su presencia en el espacio?</h2>
              <p>Materiales y residuos en la Luna y Marte: necesidad técnica, valor del entorno y responsabilidad futura.</p>
              <button
                className="btn-primary icon-btn"
                style={{ background: 'var(--accent-green)', color: '#FFFFFF', borderColor: 'var(--accent-green)' }}
                onClick={() =>
                  onSelectSpecificDilemma?.('huellas-exploracion-espacial')
                }
              >
                <IconChatBranch size={16} /> Iniciar recorrido ético →
              </button>
            </div>
          </article>

          {/* DILEMA 2: MEGACONSTELACIONES */}
          <article className="dilemma-catalog-card" style={{ borderColor: 'var(--accent-amber)' }}>
            <div className="dilemma-card-visual" style={{ background: '#05060A', padding: '12px' }}>
              <Space3DViewer initialMode="orbita" compact={true} />
            </div>
            <div className="dilemma-card-body">
              <span className="pilot-badge-tag" style={{ marginBottom: '10px' }}>
                Caso Piloto · Nueva Ruta
              </span>
              <h2>¿Deberíamos limitar las megaconstelaciones satelitales para proteger la investigación astronómica?</h2>
              <p>El crecimiento de constelaciones de satélites frente a la protección de las observaciones científicas y el cielo nocturno.</p>
              <button
                className="btn-primary icon-btn"
                style={{ background: '#F59E0B', color: '#05060A', borderColor: '#F59E0B' }}
                onClick={() =>
                  onSelectSpecificDilemma?.('megaconstelaciones-astronomia')
                }
              >
                <IconChatBranch size={16} /> Iniciar caso piloto →
              </button>
            </div>
          </article>

          {/* DILEMA 3: MISIÓN MARTE */}
          <article className="dilemma-catalog-card">
            <div className="dilemma-card-visual" style={{ background: '#05060A', padding: '12px' }}>
              <Space3DViewer initialMode="marte" compact={true} />
            </div>
            <div className="dilemma-card-body">
              <h2>¿Explorar Marte mientras existen urgencias en la Tierra?</h2>
              <p>Financiamiento público de una misión a Marte frente a salud y educación.</p>
              <button
                className="btn-primary icon-btn"
                onClick={() =>
                  onSelectSpecificDilemma?.('mision-marte')
                }
              >
                <IconChatBranch size={16} /> Iniciar diálogo →
              </button>
            </div>
          </article>

          {/* DILEMA 4: OCUPACIÓN ÓRBITA */}
          <article className="dilemma-catalog-card">
            <div className="dilemma-card-visual" style={{ background: '#05060A', padding: '12px' }}>
              <Space3DViewer initialMode="orbita" compact={true} />
            </div>
            <div className="dilemma-card-body">
              <h2>¿Quién tiene derecho a ocupar la órbita terrestre?</h2>
              <p>Megaconstelaciones satelitales frente a la observación astronómica.</p>
              <button
                className="btn-primary icon-btn"
                onClick={() =>
                  onSelectSpecificDilemma?.('ocupacion-orbita')
                }
              >
                <IconChatBranch size={16} /> Iniciar diálogo →
              </button>
            </div>
          </article>

          {/* DILEMA 5: BASURA ESPACIAL */}
          <article className="dilemma-catalog-card">
            <div className="dilemma-card-visual" style={{ background: '#05060A', padding: '12px' }}>
              <Space3DViewer initialMode="basura" compact={true} />
            </div>
            <div className="dilemma-card-body">
              <h2>¿Quién debe hacerse cargo de la basura espacial?</h2>
              <p>Responsabilidad histórica frente a la seguridad orbital de todos los países.</p>
              <button
                className="btn-primary icon-btn"
                onClick={() =>
                  onSelectSpecificDilemma?.('basura-espacial')
                }
              >
                <IconChatBranch size={16} /> Iniciar diálogo →
              </button>
            </div>
          </article>

          {/* DILEMA 6: RECURSOS LUNA */}
          <article className="dilemma-catalog-card">
            <div className="dilemma-card-visual" style={{ background: '#05060A', padding: '12px' }}>
              <Space3DViewer initialMode="luna" compact={true} />
            </div>
            <div className="dilemma-card-body">
              <h2>¿Es ético explotar los recursos de la Luna?</h2>
              <p>Extracción de hielo lunar frente a la preservación científica y equidad.</p>
              <button
                className="btn-primary icon-btn"
                onClick={() =>
                  onSelectSpecificDilemma?.('recursos-luna')
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
