export function AboutView({ onExploreDilemmas }) {
  return (
    <div className="about-view">
      <div className="page-title-block">
        <span className="section-kicker">Objetivo y metodología</span>
        <h1>Sobre el proyecto Órbita Ética</h1>
        <p>
          Órbita Ética es una plataforma educativa e interactiva diseñada como un laboratorio de
          decisiones éticas en torno a la actividad espacial contemporánea.
        </p>
      </div>

      <div className="two-col-grid">
        <section className="about-card">
          <h2>Propósito educativo</h2>
          <p>
            El acelerado desarrollo de la actividad espacial —desde el despliegue de miles de
            satélites en órbita baja hasta la acumulación de basura espacial y la futura extracción
            de recursos en la Luna— plantea dilemas que no pueden resolverse únicamente con datos
            técnicos.
          </p>
          <p style={{ marginTop: '0.75rem' }}>
            El propósito de <strong>Órbita Ética</strong> es que el usuario no se limite a leer
            información pasivamente, sino que se involucre en cada problema, tome una postura,
            articule sus propios argumentos y los contraste con distintas tradiciones de
            razonamiento ético.
          </p>
        </section>

        <section className="about-card">
          <h2>Principios pedagógicos y de diseño</h2>
          <ul className="clean-list">
            <li>
              <strong>Sin respuestas moralmente correctas predefinidas:</strong> La plataforma
              valora la calidad del razonamiento y la deliberación, no premia ni castiga una postura
              determinada.
            </li>
            <li>
              <strong>Diferenciación entre hechos y argumentos:</strong> Cada caso separa con
              claridad la evidencia científica comprobada, los supuestos del escenario y las
              interpretaciones filosóficas.
            </li>
            <li>
              <strong>Libertad de argumentar:</strong> Se ofrecen alternativas estructuradas para
              facilitar la interacción, junto con espacios abiertos para redactar justificaciones y
              propuestas propias.
            </li>
            <li>
              <strong>Autonomía sin evaluación por IA:</strong> El contraste lo realiza el propio
              estudiante al comparar su argumentación inicial y final tras recorrer los marcos
              éticos.
            </li>
          </ul>
        </section>
      </div>

      <section className="about-card" style={{ marginTop: '1.5rem' }}>
        <h2>Arquitectura del recorrido en dos niveles</h2>
        <p>
          La plataforma se organiza en un <strong>sitio principal</strong> (Catálogo de dilemas,
          Biblioteca de perspectivas éticas y Mi recorrido) y una{' '}
          <strong>experiencia interactiva en 6 etapas</strong> común para cada caso:
        </p>
        <div className="methodology-flow">
          <span>1. Conocer el problema</span>
          <span>→</span>
          <span>2. Tomar una decisión</span>
          <span>→</span>
          <span>3. Justificar la postura</span>
          <span>→</span>
          <span>4. Explorar perspectivas filosóficas</span>
          <span>→</span>
          <span>5. Reconsiderar la decisión</span>
          <span>→</span>
          <span>6. Reflexión final</span>
        </div>
      </section>

      <div className="home-bottom-strip" style={{ marginTop: '2rem' }}>
        <div>
          <strong>Comienza tu recorrido</strong>
          <p>Explora los cuatro casos del catálogo y pon a prueba tus argumentos.</p>
        </div>
        <button className="btn-primary" onClick={onExploreDilemmas}>
          Explorar dilemas →
        </button>
      </div>
    </div>
  )
}
