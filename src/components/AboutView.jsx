import {
  IconBook,
  IconCompass,
  IconLayers,
  IconScale,
} from './Icons'
import { TypewriterTitle } from './TypewriterTitle'

export function AboutView({ onExploreDilemmas }) {
  return (
    <div className="about-view">
      <div className="page-title-block">
        <TypewriterTitle as="h1" text="Sobre Órbita Ética" speed={28} />
        <p>Plataforma educativa e interactiva de deliberación ética sobre la exploración espacial.</p>
      </div>

      <div className="about-grid-layout">
        {/* BLOQUE 1 — ¿QUÉ ES ÓRBITA ÉTICA? (BLOQUE PRINCIPAL Y PROTAGONISTA) */}
        <section className="about-card about-card-main">
          <h2 className="icon-heading">
            <IconCompass size={24} /> ¿Qué es Órbita Ética?
          </h2>
          <p>
            Órbita Ética es una plataforma web educativa e interactiva dirigida principalmente a
            estudiantes universitarios, concebida para fomentar el pensamiento crítico sobre los dilemas
            morales asociados a la exploración y utilización del espacio exterior. A través del análisis
            de problemáticas reales de la actividad espacial, la plataforma no busca imponer respuestas
            correctas ni consagrar una postura ética superior, sino ofrecer un entorno riguroso para
            cuestionar convicciones, argumentar con fundamentos sólidos y comprender la pluralidad de
            perspectivas que convergen en el ámbito cósmico.
          </p>
        </section>

        {/* SUBGRID CON LOS 3 BLOQUES COMPLEMENTARIOS */}
        <div className="about-subgrid">
          {/* BLOQUE 2 — DECISIONES QUE DESAFÍAN */}
          <section className="about-card about-card-decisions">
            <h2 className="icon-heading">
              <IconScale size={22} /> Decisiones que desafían
            </h2>
            <p>
              Los estudiantes enfrentan situaciones concretas respaldadas por fuentes y datos de archivo,
              resolviendo preguntas interactivas de toma de decisiones. Algunas interrogantes se adaptan a
              sus elecciones anteriores, invitándolos a evaluar alternativas, ponderar costos y asumir las
              consecuencias éticas de cada determinación.
            </p>
          </section>

          {/* BLOQUE 3 — REFLEXIÓN FILOSÓFICA */}
          <section className="about-card about-card-reflection">
            <h2 className="icon-heading">
              <IconBook size={22} /> Reflexión filosófica
            </h2>
            <p>
              Cada escenario incorpora preguntas abiertas inspiradas en perspectivas filosóficas clásicas
              y contemporáneas. Esta aproximación permite identificar tensiones valorativas profundas,
              cuestionar supuestos tácitos y enriquecer los argumentos frente a desafíos que carecen de
              soluciones técnicas prefabricadas.
            </p>
          </section>

          {/* BLOQUE 4 — UNA EXPERIENCIA DE APRENDIZAJE */}
          <section className="about-card about-card-journey">
            <h2 className="icon-heading">
              <IconLayers size={22} /> Una experiencia de aprendizaje
            </h2>
            <p>
              El itinerario articula un recorrido formativo en cuatro momentos: aproximarse a la evidencia
              del caso real, tomar decisiones difíciles, reflexionar a partir de interrogantes filosóficas
              y realizar un test final que revela la afinidad del estudiante con distintos autores y referentes éticos.
            </p>
          </section>
        </div>
      </div>

      {/* BANNER INFERIOR DE ACCIÓN */}
      <div className="home-bottom-strip" style={{ marginTop: '2.5rem' }}>
        <div>
          <strong className="icon-heading">
            <IconLayers size={18} /> Pon a prueba tus argumentos
          </strong>
          <p>Explora los dilemas éticos disponibles en el catálogo y experimenta el proceso deliberativo.</p>
        </div>
        <button className="btn-primary" onClick={onExploreDilemmas}>
          Explorar catálogo de dilemas →
        </button>
      </div>
    </div>
  )
}
