import { SpaceIllustration } from './SpaceIllustration'

export function HomeView({ onExploreDilemmas, onOpenLibrary, onStartFeaturedDilemma }) {
  return (
    <div className="home-view">
      {/* Pantalla principal de inicio */}
      <section className="hero-solid-card">
        <div className="hero-text-col">
          <span className="section-kicker">Laboratorio interactivo de ética espacial</span>
          <h1 className="hero-main-title">Órbita Ética</h1>
          <p className="hero-central-message">
            «El futuro del espacio también plantea decisiones éticas. Explora conflictos reales de
            la actividad espacial, toma decisiones y descubre cómo distintas perspectivas
            filosóficas pueden ayudarte a analizarlas».
          </p>
          <p className="hero-subtext">
            Una plataforma educativa donde cada caso representa un problema científico y tecnológico
            real que involucra conflictos de valores, responsabilidades e intereses.
          </p>

          <div className="hero-cta-row">
            <button className="btn-primary btn-lg" onClick={onExploreDilemmas}>
              Explorar dilemas
            </button>
            <button className="btn-secondary btn-lg" onClick={onStartFeaturedDilemma}>
              Iniciar Caso 01 (Constelaciones satelitales)
            </button>
          </div>
        </div>

        <div className="hero-visual-col">
          <SpaceIllustration type="hero" />
          <p className="visual-caption">
            Representación esquemática: órbitas terrestres bajas, observación astronómica y tráfico
            satelital.
          </p>
        </div>
      </section>

      {/* Cómo funciona el recorrido interactivo */}
      <section className="home-process-section">
        <div className="section-heading-block">
          <h2>¿Qué puedes hacer en Órbita Ética?</h2>
          <p>
            No te limitarás a leer información teórica. En cada dilema recorrerás seis etapas para
            involucrarte en el problema, tomar una postura, justificarla y contrastarla con
            diferentes formas de razonamiento ético:
          </p>
        </div>

        <div className="steps-overview-grid">
          <div className="step-overview-card">
            <span className="step-number-box">1</span>
            <h3>Contexto</h3>
            <p>Conoce la evidencia científica, los supuestos del caso y los actores involucrados.</p>
          </div>
          <div className="step-overview-card">
            <span className="step-number-box">2</span>
            <h3>Decisión</h3>
            <p>Elige una alternativa como parte de un comité evaluador y define condiciones.</p>
          </div>
          <div className="step-overview-card">
            <span className="step-number-box">3</span>
            <h3>Justificación</h3>
            <p>Explica los motivos, consecuencias o principios que respaldan tu postura inicial.</p>
          </div>
          <div className="step-overview-card">
            <span className="step-number-box">4</span>
            <h3>Análisis filosófico</h3>
            <p>Contrasta tu decisión desde el utilitarismo, la deontología y la justicia distributiva.</p>
          </div>
          <div className="step-overview-card">
            <span className="step-number-box">5</span>
            <h3>Reconsideración</h3>
            <p>Evalúa si mantienes tu postura con nuevos argumentos o si prefieres modificarla.</p>
          </div>
          <div className="step-overview-card">
            <span className="step-number-box">6</span>
            <h3>Reflexión final</h3>
            <p>Compara lado a lado tu razonamiento inicial y final y guarda tu recorrido.</p>
          </div>
        </div>

        <div className="home-bottom-strip">
          <div>
            <strong>¿Quieres conocer primero las teorías éticas?</strong>
            <p>
              Consulta las fichas de nuestra biblioteca filosófica con definiciones, autores y
              ejemplos aplicados a la exploración espacial.
            </p>
          </div>
          <button className="btn-secondary" onClick={onOpenLibrary}>
            Ir a Perspectivas éticas →
          </button>
        </div>
      </section>
    </div>
  )
}
