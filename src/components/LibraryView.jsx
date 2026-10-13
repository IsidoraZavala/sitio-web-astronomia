import { useState } from 'react'
import { TypewriterTitle } from './TypewriterTitle'

export function LibraryView({ perspectivas, onExploreDilemmas }) {
  const [filtroCategoria, setFiltroCategoria] = useState('todas')

  const filtradas =
    filtroCategoria === 'todas'
      ? perspectivas
      : perspectivas.filter((p) => p.categoria === filtroCategoria)

  return (
    <div className="library-view">
      <div className="page-title-block">
        <TypewriterTitle as="h1" text="Perspectivas éticas" speed={30} />
        <p>
          Consulta las definiciones, autores referentes, principios centrales, preguntas habituales
          y ejemplos aplicados a la actividad espacial.
        </p>

        <div className="filter-bar">
          <button
            className={`filter-btn ${filtroCategoria === 'todas' ? 'active' : ''}`}
            aria-pressed={filtroCategoria === 'todas'}
            onClick={() => setFiltroCategoria('todas')}
          >
            Todas ({perspectivas.length})
          </button>
          <button
            className={`filter-btn ${
              filtroCategoria === 'Teoría ética general' ? 'active' : ''
            }`}
            aria-pressed={filtroCategoria === 'Teoría ética general'}
            onClick={() => setFiltroCategoria('Teoría ética general')}
          >
            Teorías éticas generales
          </button>
          <button
            className={`filter-btn ${
              filtroCategoria === 'Enfoque especializado' ? 'active' : ''
            }`}
            aria-pressed={filtroCategoria === 'Enfoque especializado'}
            onClick={() => setFiltroCategoria('Enfoque especializado')}
          >
            Enfoques especializados
          </button>
        </div>
      </div>

      <div className="library-cards-stack">
        {filtradas.map((ficha, index) => (
          <details key={ficha.id} className="library-card">
            <summary className="library-summary">
              <span className="library-index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h2>{ficha.nombre}</h2>
                <p className="library-short-summary">{ficha.resumenCorto}</p>
              </div>
              <span className="library-toggle" aria-hidden="true" />
            </summary>
            <div className="library-content">
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
            </div>
          </details>
        ))}
      </div>

      <div className="home-bottom-strip" style={{ marginTop: '2rem' }}>
        <div>
          <strong>¿Listo para poner a prueba estos marcos éticos?</strong>
          <p>Elige un dilema del catálogo y observa cómo cada perspectiva analiza tu decisión.</p>
        </div>
        <button className="btn-primary" onClick={onExploreDilemmas}>
          Ir al Catálogo de dilemas →
        </button>
      </div>
    </div>
  )
}
