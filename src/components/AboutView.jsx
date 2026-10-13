import {
  IconChatBranch,
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
        <p>Ruta interactiva de deliberación filosófica sobre dilemas de la actividad espacial.</p>
      </div>

      <div className="two-col-grid">
        <section className="about-card">
          <h2 className="icon-heading">
            <IconChatBranch size={22} /> Diálogo filosófico vivo
          </h2>
          <p>
            No es un cuestionario con respuestas correctas, sino una conversación guiada donde las
            preguntas evolucionan según tus elecciones para examinar principios, experimentos
            mentales y objeciones.
          </p>
        </section>

        <section className="about-card">
          <h2 className="icon-heading">
            <IconScale size={22} /> Construcción progresiva
          </h2>
          <p>
            A lo largo de 5 pasos registras tu posición inicial, el valor que defiendes, una
            objeción exigente, tu respuesta y tu postura actual sin que cambiar de opinión sea
            obligatorio.
          </p>
        </section>
      </div>

      <section className="about-card" style={{ marginTop: '20px' }}>
        <h2 className="icon-heading">
          <IconCompass size={22} /> Ejes del diseño filosófico
        </h2>
        <div className="two-col-grid" style={{ marginTop: '10px', marginBottom: 0 }}>
          <ul className="clean-list">
            <li>
              <strong>Perspectivas en acción:</strong> Interpretan el caso, formulan preguntas y
              plantean objeciones.
            </li>
            <li>
              <strong>Experimentos mentales:</strong> Modifican condiciones hipotéticas para probar
              la coherencia del argumento.
            </li>
          </ul>
          <ul className="clean-list">
            <li>
              <strong>Hechos vs. supuestos:</strong> Distingue evidencia científica real de
              escenarios hipotéticos.
            </li>
            <li>
              <strong>Cierre deliberativo:</strong> Síntesis descargable y preguntas abiertas para
              discutir en clases.
            </li>
          </ul>
        </div>
      </section>

      <div className="home-bottom-strip" style={{ marginTop: '2rem' }}>
        <div>
          <strong className="icon-heading">
            <IconLayers size={18} /> Pon a prueba tus argumentos
          </strong>
          <p>Comienza con el Caso 01 sobre el financiamiento de una misión a Marte.</p>
        </div>
        <button className="btn-primary" onClick={onExploreDilemmas}>
          Explorar dilemas →
        </button>
      </div>
    </div>
  )
}
