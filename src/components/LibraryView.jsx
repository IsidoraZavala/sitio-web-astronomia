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

export function LibraryView({ onExploreDilemmas }) {
  const [filtroDirectriz, setFiltroDirectriz] = useState('todas')

  const autoresFiltrados =
    filtroDirectriz === 'todas'
      ? AUTORES_BIBLIOTECA
      : AUTORES_BIBLIOTECA.filter((a) => a.directrizId === filtroDirectriz)

  const rutaMarcoDorado = resolverRutaImagen('images/filosofos/marco_2_ovalado.png')

  return (
    <div className="library-view">
      <div className="page-title-block">
        <TypewriterTitle as="h1" text="Perspectivas éticas y autores" speed={24} />
        <p>
          Conoce a los autores y pensadores fundamentales que guían la deliberación ética de
          la exploración espacial humana y sus posturas filosóficas frente a estos desafíos.
        </p>

        {/* FILTROS POR DIRECTRIZ ÉTICA */}
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
      </div>

      {/* GALERÍA DE AUTORES EN HILERAS DE 3 CON MARCO ANTIGUO DORADO */}
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
