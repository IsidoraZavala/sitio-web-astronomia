import { useEffect, useState } from 'react'
import './App.css'
import { AboutView } from './components/AboutView'
import { CatalogView } from './components/CatalogView'
import { DilemmaExperience } from './components/DilemmaExperience'
import { HomeView } from './components/HomeView'
import { JourneyView } from './components/JourneyView'
import { LibraryView } from './components/LibraryView'
import { DILEMAS_CATALOGO, PERSPECTIVAS_BIBLIOTECA } from './data/dilemasData'

const STORAGE_KEY = 'orbita_etica_recorrido_v1'
const THEME_KEY = 'orbita_etica_tema_solido'

function App() {
  const [seccionActiva, setSeccionActiva] = useState('inicio')
  const [dilemaActivoId, setDilemaActivoId] = useState(null)

  const [temaSolido, setTemaSolido] = useState(() => {
    return localStorage.getItem(THEME_KEY) || 'light-solid'
  })

  const [progresoGuardado, setProgresoGuardado] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : {}
    } catch {
      return {}
    }
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', temaSolido)
    localStorage.setItem(THEME_KEY, temaSolido)
  }, [temaSolido])

  const guardarProgresoDilema = (datosDilema) => {
    setProgresoGuardado((prev) => {
      const actualizado = {
        ...prev,
        [datosDilema.dilemaId]: datosDilema,
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(actualizado))
      } catch {
        // continuar en memoria de sesión si localStorage no está disponible
      }
      return actualizado
    })
  }

  const limpiarTodoElRecorrido = () => {
    setProgresoGuardado({})
    localStorage.removeItem(STORAGE_KEY)
  }

  const abrirDilema = (id) => {
    setDilemaActivoId(id)
    setSeccionActiva('experiencia-dilema')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navegarSeccion = (seccion) => {
    setSeccionActiva(seccion)
    if (seccion !== 'experiencia-dilema') {
      setDilemaActivoId(null)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const dilemaSeleccionado = DILEMAS_CATALOGO.find((d) => d.id === dilemaActivoId)
  const cantidadReflexiones = Object.keys(progresoGuardado).length

  return (
    <div className="orbita-app">
      {/* Barra de navegación con las 5 secciones propuestas en el documento */}
      <header className="top-navbar">
        <div className="navbar-inner">
          <button className="brand-btn" onClick={() => navegarSeccion('inicio')}>
            <span className="brand-mark">ÓÉ</span>
            <div>
              <span className="brand-name">Órbita Ética</span>
              <span className="brand-subtitle">Laboratorio de decisiones éticas espaciales</span>
            </div>
          </button>

          <nav className="main-nav-links" aria-label="Navegación principal">
            <button
              className={`nav-item-btn ${seccionActiva === 'inicio' ? 'active' : ''}`}
              onClick={() => navegarSeccion('inicio')}
            >
              Página de inicio
            </button>
            <button
              className={`nav-item-btn ${
                seccionActiva === 'catalogo' || seccionActiva === 'experiencia-dilema'
                  ? 'active'
                  : ''
              }`}
              onClick={() => navegarSeccion('catalogo')}
            >
              Explorar dilemas
            </button>
            <button
              className={`nav-item-btn ${seccionActiva === 'biblioteca' ? 'active' : ''}`}
              onClick={() => navegarSeccion('biblioteca')}
            >
              Perspectivas éticas
            </button>
            <button
              className={`nav-item-btn ${seccionActiva === 'proyecto' ? 'active' : ''}`}
              onClick={() => navegarSeccion('proyecto')}
            >
              Sobre el proyecto
            </button>
            <button
              className={`nav-item-btn ${seccionActiva === 'recorrido' ? 'active' : ''}`}
              onClick={() => navegarSeccion('recorrido')}
            >
              Mi recorrido
              {cantidadReflexiones > 0 && (
                <span className="nav-count-pill">{cantidadReflexiones}</span>
              )}
            </button>
          </nav>

          <button
            className="theme-toggle-btn"
            onClick={() =>
              setTemaSolido((prev) => (prev === 'light-solid' ? 'dark-solid' : 'light-solid'))
            }
            title="Alternar entre fondo sólido claro y fondo sólido oscuro mate"
          >
            {temaSolido === 'light-solid' ? 'Color: Claro Sólido' : 'Color: Oscuro Mate'}
          </button>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="main-content-wrapper">
        {seccionActiva === 'inicio' && (
          <HomeView
            onExploreDilemmas={() => navegarSeccion('catalogo')}
            onOpenLibrary={() => navegarSeccion('biblioteca')}
            onStartFeaturedDilemma={() => abrirDilema('ocupacion-orbita')}
          />
        )}

        {seccionActiva === 'catalogo' && (
          <CatalogView
            dilemas={DILEMAS_CATALOGO}
            progresoGuardado={progresoGuardado}
            onSelectDilema={abrirDilema}
          />
        )}

        {seccionActiva === 'experiencia-dilema' && dilemaSeleccionado && (
          <DilemmaExperience
            key={dilemaSeleccionado.id}
            dilema={dilemaSeleccionado}
            initialProgress={progresoGuardado[dilemaSeleccionado.id]}
            onSaveProgress={guardarProgresoDilema}
            onBackToCatalog={() => navegarSeccion('catalogo')}
          />
        )}

        {seccionActiva === 'biblioteca' && (
          <LibraryView
            perspectivas={PERSPECTIVAS_BIBLIOTECA}
            onExploreDilemmas={() => navegarSeccion('catalogo')}
          />
        )}

        {seccionActiva === 'recorrido' && (
          <JourneyView
            progresoGuardado={progresoGuardado}
            onOpenDilema={abrirDilema}
            onClearProgress={limpiarTodoElRecorrido}
            onExploreDilemmas={() => navegarSeccion('catalogo')}
          />
        )}

        {seccionActiva === 'proyecto' && (
          <AboutView onExploreDilemmas={() => navegarSeccion('catalogo')} />
        )}
      </main>

      <footer className="solid-footer">
        <p>
          <strong>Órbita Ética</strong> — Plataforma educativa e interactiva de deliberación ética
          sobre la actividad espacial.
        </p>
      </footer>
    </div>
  )
}

export default App
