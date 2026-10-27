import {
  IconBook,
  IconCompass,
  IconLayers,
  IconScale,
  IconUsers,
} from './Icons'
import { TypewriterTitle } from './TypewriterTitle'

const resolverRutaImagen = (ruta) => {
  if (!ruta) return ''
  if (ruta.startsWith('http://') || ruta.startsWith('https://')) return ruta
  const limpia = ruta.replace(/^\.?\//, '')
  const base = import.meta.env.BASE_URL || './'
  return `${base}${limpia}`
}

export function AboutView() {
  const rutaFondo = resolverRutaImagen('images/filosofos/foto filosofica fondo.webp')
  const rutaMarcoCuadrado = resolverRutaImagen('images/filosofos/marco_cuadrado_transparente.png')

  // Tres autores del proyecto (espacios preparados para nombre, carrera y foto)
  const autoresEquipo = [
    {
      id: 'autor-1',
      nombre: 'Nombre de autor/a',
      carrera: 'Carrera',
      fotoUrl: '',
    },
    {
      id: 'autor-2',
      nombre: 'Nombre de autor/a',
      carrera: 'Carrera',
      fotoUrl: '',
    },
    {
      id: 'autor-3',
      nombre: 'Nombre de autor/a',
      carrera: 'Carrera',
      fotoUrl: '',
    },
  ]

  return (
    <div className="about-view-fullbleed">
      {/* CAPA DE FONDO CON IMAGEN FILOSÓFICA EN SU COLOR NATURAL SUAVIZADA */}
      <div
        className="about-bg-layer"
        style={{ backgroundImage: `url("${rutaFondo}")` }}
      />

      {/* CONTENIDO CENTRADO CON BLOQUES LEVEMENTE TRANSLÚCIDOS */}
      <div className="about-content-inner">
        {/* BLOQUE DE TÍTULO */}
        <div className="about-title-block">
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

          {/* SECCIÓN DE AUTORES DEL PROYECTO (SOMOS TRES) */}
          <section className="about-team-section">
            <div className="about-team-header">
              <h2 className="icon-heading">
                <IconUsers size={24} /> Autores del proyecto
              </h2>
              <p>Equipo responsable del desarrollo, investigación y diseño de Órbita Ética.</p>
            </div>

            <div className="about-team-grid">
              {autoresEquipo.map((autor, idx) => (
                <article key={autor.id} className="team-member-card">
                  <div className="team-frame-container">
                    <div className="team-frame-inner">
                      {autor.fotoUrl ? (
                        <img
                          src={resolverRutaImagen(autor.fotoUrl)}
                          alt={autor.nombre}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                            if (e.currentTarget.nextElementSibling) {
                              e.currentTarget.nextElementSibling.style.display = 'flex'
                            }
                          }}
                        />
                      ) : null}
                      <div
                        className="team-placeholder-inner"
                        style={{ display: autor.fotoUrl ? 'none' : 'flex' }}
                      >
                        <IconUsers size={32} />
                        <span>Autor {idx + 1}</span>
                      </div>
                    </div>
                    <img
                      src={rutaMarcoCuadrado}
                      alt="Marco cuadrado dorado"
                      className="team-frame-overlay"
                    />
                  </div>

                  <div className="team-member-info">
                    <h3 className="team-member-name">{autor.nombre}</h3>
                    <p className="team-member-career">{autor.carrera}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
