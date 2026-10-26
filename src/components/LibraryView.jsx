import { useState } from 'react'
import { TypewriterTitle } from './TypewriterTitle'
import { AUTORES_BIBLIOTECA } from '../data/autoresBibliotecaData'

const resolverRutaImagen = (ruta) => {
  if (!ruta) return ''
  if (ruta.startsWith('http://') || ruta.startsWith('https://')) return ruta
  const limpia = ruta.replace(/^\.?\//, '')
  const base = import.meta.env.BASE_URL || './'
  return `${base}${limpia}`
}

export function LibraryView({ perspectivas = [], onExploreDilemmas, onSelectSpecificDilemma }) {
  const [modoVista, setModoVista] = useState('autores') // 'autores' | 'teorias'
  const [filtroDirectriz, setFiltroDirectriz] = useState('todas')
  const [filtroCategoria, setFiltroCategoria] = useState('todas')

  const autoresFiltrados =
    filtroDirectriz === 'todas'
      ? AUTORES_BIBLIOTECA
      : AUTORES_BIBLIOTECA.filter((a) => a.directrizId === filtroDirectriz)

  const teoriasFiltradas =
    filtroCategoria === 'todas'
      ? perspectivas
      : perspectivas.filter((p) => p.categoria === filtroCategoria)

  const rutaMarcoDorado = resolverRutaImagen('images/filosofos/marco_2_ovalado.png')

  return (
    <div className="library-view">
      <div className="page-title-block">
        <TypewriterTitle as="h1" text="Perspectivas éticas y autores" speed={24} />
        <p>
          Conoce a los autores, pensadores y corrientes filosóficas que fundamentan los dilemas
          éticos de la exploración espacial humana, con sus obras de referencia, posturas y citas
          verificadas.
        </p>

        {/* SELECTOR DE MODO: AUTORES (POR DEFECTO) VS TEORÍAS GENERALES */}
        <div className="library-view-switcher">
          <button
            className={`view-switch-btn ${modoVista === 'autores' ? 'active' : ''}`}
            onClick={() => setModoVista('autores')}
          >
            🏛️ Galería de autores y referentes ({AUTORES_BIBLIOTECA.length})
          </button>
          <button
            className={`view-switch-btn ${modoVista === 'teorias' ? 'active' : ''}`}
            onClick={() => setModoVista('teorias')}
          >
            📚 Corrientes y teorías éticas ({perspectivas.length})
          </button>
        </div>

        {/* FILTROS SEGÚN EL MODO ACTIVO */}
        {modoVista === 'autores' ? (
          <div className="filter-bar">
            <button
              className={`filter-btn ${filtroDirectriz === 'todas' ? 'active' : ''}`}
              aria-pressed={filtroDirectriz === 'todas'}
              onClick={() => setFiltroDirectriz('todas')}
            >
              Todos los autores ({AUTORES_BIBLIOTECA.length})
            </button>
            <button
              className={`filter-btn ${filtroDirectriz === 'ambiental' ? 'active' : ''}`}
              aria-pressed={filtroDirectriz === 'ambiental'}
              onClick={() => setFiltroDirectriz('ambiental')}
            >
              Preservación ambiental espacial (3)
            </button>
            <button
              className={`filter-btn ${filtroDirectriz === 'uso-espacio' ? 'active' : ''}`}
              aria-pressed={filtroDirectriz === 'uso-espacio'}
              onClick={() => setFiltroDirectriz('uso-espacio')}
            >
              Uso de bienes y propiedad (3)
            </button>
            <button
              className={`filter-btn ${filtroDirectriz === 'animales' ? 'active' : ''}`}
              aria-pressed={filtroDirectriz === 'animales'}
              onClick={() => setFiltroDirectriz('animales')}
            >
              Bioética y uso de animales (4)
            </button>
          </div>
        ) : (
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
        )}
      </div>

      {/* ========================================================================= */}
      {/* VISTA 1: GALERÍA DE AUTORES EN HILERAS DE 3 CON MARCO ANTIGUO DORADO      */}
      {/* ========================================================================= */}
      {modoVista === 'autores' && (
        <div className="authors-grid-three-col">
          {autoresFiltrados.map((autor) => {
            const urlFoto = autor.fotoUrl ? resolverRutaImagen(autor.fotoUrl) : ''
            const iniciales = autor.nombre
              .split(' ')
              .map((n) => n[0])
              .join('')
              .slice(0, 2)

            return (
              <article key={autor.id} className="author-museum-card">
                {/* RETRATO OVALADO CON EL MARCO ANTIGUO DORADO */}
                <div className="author-frame-container">
                  <div className="author-frame-inner">
                    {urlFoto ? (
                      <img
                        src={urlFoto}
                        alt={autor.nombre}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                          if (e.currentTarget.nextElementSibling) {
                            e.currentTarget.nextElementSibling.style.display = 'block'
                          }
                        }}
                      />
                    ) : null}
                    <span
                      className="author-initials-fallback"
                      style={{ display: urlFoto ? 'none' : 'block' }}
                    >
                      {iniciales}
                    </span>
                  </div>

                  {/* SUPERPOSICIÓN DEL MARCO DORADO ANTIGUO */}
                  <img
                    src={rutaMarcoDorado}
                    alt="Marco antiguo dorado ovalado"
                    className="author-frame-overlay"
                  />
                </div>

                {/* CONTENIDO: NOMBRE Y PÁRRAFO ÚNICO */}
                <div className="author-card-content">
                  <h2 className="author-card-title">{autor.nombre}</h2>
                  <p className="author-card-posture">{autor.posturaResumida}</p>
                </div>
              </article>
            )
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* VISTA 2: TEORÍAS ÉTICAS GENERALES (CORRIENTES TEÓRICAS)                   */}
      {/* ========================================================================= */}
      {modoVista === 'teorias' && (
        <div className="library-cards-stack">
          {teoriasFiltradas.map((ficha, index) => (
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
      )}

      {/* BANNER INFERIOR PARA VOLVER AL CATÁLOGO DE DILEMAS */}
      <div className="home-bottom-strip" style={{ marginTop: '2.5rem' }}>
        <div>
          <strong>¿Listo para poner a prueba estos marcos éticos?</strong>
          <p>Elige un dilema del catálogo y experimenta cómo cada autor y corriente analiza tus decisiones.</p>
        </div>
        <button className="btn-primary" onClick={onExploreDilemmas}>
          Ir al Catálogo de dilemas →
        </button>
      </div>
    </div>
  )
}
