import { useState } from 'react'

export function LibraryView({ perspectivas, onExploreDilemmas }) {
  const [filtroCategoria, setFiltroCategoria] = useState('todas')

  const filtradas =
    filtroCategoria === 'todas'
      ? perspectivas
      : perspectivas.filter((p) => p.categoria === filtroCategoria)

  return (
    <div className="library-view">
      <div className="page-title-block">
        <span className="section-kicker">Biblioteca filosófica</span>
        <h1>Perspectivas éticas</h1>
        <p>
          Consulta las fichas teóricas con las definiciones, autores referentes, principios
          centrales, preguntas habituales y ejemplos aplicados a la actividad espacial.
        </p>

        <div className="filter-bar">
          <button
            className={`filter-btn ${filtroCategoria === 'todas' ? 'active' : ''}`}
            onClick={() => setFiltroCategoria('todas')}
          >
            Todas las fichas ({perspectivas.length})
          </button>
          <button
            className={`filter-btn ${
              filtroCategoria === 'Teoría ética general' ? 'active' : ''
            }`}
            onClick={() => setFiltroCategoria('Teoría ética general')}
          >
            Teorías éticas generales
          </button>
          <button
            className={`filter-btn ${
              filtroCategoria === 'Enfoque especializado' ? 'active' : ''
            }`}
            onClick={() => setFiltroCategoria('Enfoque especializado')}
          >
            Enfoques especializados
          </button>
        </div>
      </div>

      <div className="library-cards-stack">
        {filtradas.map((ficha) => (
          <article key={ficha.id} className="library-card">
            <div className="library-card-header">
              <div>
                <span className="stage-badge">{ficha.categoria}</span>
                <h2>{ficha.nombre}</h2>
              </div>
              <p className="library-short-summary">{ficha.resumenCorto}</p>
            </div>

            <div className="library-card-grid">
              <div className="library-block">
                <h3>Definición</h3>
                <p>{ficha.definicion}</p>

                <h3 style={{ marginTop: '1.25rem' }}>Autores relevantes</h3>
                <ul className="author-tags">
                  {ficha.autores.map((autor, idx) => (
                    <li key={idx} className="author-tag">
                      {autor}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="library-block">
                <h3>Principios centrales</h3>
                <ul className="clean-list">
                  {ficha.principiosCentrales.map((principio, idx) => (
                    <li key={idx}>{principio}</li>
                  ))}
                </ul>

                <h3 style={{ marginTop: '1.25rem' }}>Preguntas habituales</h3>
                <ul className="clean-list">
                  {ficha.preguntasHabituales.map((preg, idx) => (
                    <li key={idx}>«{preg}»</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="library-space-example">
              <strong>Ejemplo aplicado al uso del espacio:</strong>
              <p>{ficha.ejemploEspacial}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="home-bottom-strip" style={{ marginTop: '2rem' }}>
        <div>
          <strong>¿Listo para poner a prueba estos marcos éticos en un caso concreto?</strong>
          <p>Elige un dilema del catálogo y observa cómo cada perspectiva analiza tu decisión.</p>
        </div>
        <button className="btn-primary" onClick={onExploreDilemmas}>
          Ir al Catálogo de dilemas →
        </button>
      </div>
    </div>
  )
}
