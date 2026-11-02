import { useState, useCallback } from 'react'
import './App.css'
import './design.css'
import { AboutView } from './components/AboutView'
import { CatalogView } from './components/CatalogView'
import { EnvironmentalDilemmaExperience } from './components/EnvironmentalDilemmaExperience'
import { SpaceUseDilemmaExperience } from './components/SpaceUseDilemmaExperience'
import { AnimalResearchDilemmaExperience } from './components/AnimalResearchDilemmaExperience'
import { HomeView } from './components/HomeView'
import {
  IconCompass,
  IconGlobe,
  IconHome,
  IconLayers,
} from './components/Icons'
import { LibraryView } from './components/LibraryView'
import { DILEMAS_CATALOGO, PERSPECTIVAS_BIBLIOTECA } from './data/dilemasData'

const STORAGE_KEY = 'orbita_etica_recorrido_v1'

function App() {
  const [seccionActiva, setSeccionActiva] = useState('inicio')
  const [dilemaActivoId, setDilemaActivoId] = useState(null)
  const [menuAbierto, setMenuAbierto] = useState(false)

  const [progresoGuardado, setProgresoGuardado] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : {}
    } catch {
      return {}
    }
  })

  const guardarProgresoDilema = useCallback((datosDilema) => {
    setProgresoGuardado((prev) => {
      const actual = prev[datosDilema.dilemaId]
      if (
        actual &&
        actual.completado === datosDilema.completado &&
        actual.momentoActual === datosDilema.momentoActual &&
        actual.faseActual === datosDilema.faseActual
      ) {
        return prev
      }
      const actualizado = {
        ...prev,
        [datosDilema.dilemaId]: datosDilema,
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(actualizado))
      } catch {
        // continuar en memoria de sesión
      }
      return actualizado
    })
  }, [])

  const abrirDilema = (id) => {
    setDilemaActivoId(id)
    setSeccionActiva('experiencia-dilema')
    setMenuAbierto(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navegarSeccion = (seccion) => {
    setSeccionActiva(seccion)
    setMenuAbierto(false)
    if (seccion !== 'experiencia-dilema') {
      setDilemaActivoId(null)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const dilemaSeleccionado = DILEMAS_CATALOGO.find((d) => d.id === dilemaActivoId)

  return (
    <div className="orbita-app">
      <header className="top-navbar">
        <div className="navbar-inner">
          <button className="brand-btn" onClick={() => navegarSeccion('inicio')}>
            <span className="brand-mark">ÓÉ</span>
            <span className="brand-name">Órbita Ética</span>
          </button>

          <button
            className="mobile-menu-btn"
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-expanded={menuAbierto}
          >
            Menú
          </button>

          <nav
            className={`main-nav-links ${menuAbierto ? 'menu-open' : ''}`}
            aria-label="Navegación principal"
          >
            <button
              className={`nav-item-btn icon-btn ${seccionActiva === 'inicio' ? 'active' : ''}`}
              onClick={() => navegarSeccion('inicio')}
            >
              <IconHome size={14} /> Inicio
            </button>
            <button
              className={`nav-item-btn icon-btn ${
                seccionActiva === 'catalogo' || seccionActiva === 'experiencia-dilema'
                  ? 'active'
                  : ''
              }`}
              onClick={() => navegarSeccion('catalogo')}
            >
              <IconGlobe size={14} /> Dilemas
            </button>
            <button
              className={`nav-item-btn icon-btn ${seccionActiva === 'biblioteca' ? 'active' : ''}`}
              onClick={() => navegarSeccion('biblioteca')}
            >
              <IconCompass size={14} /> Perspectivas
            </button>
            <button
              className={`nav-item-btn icon-btn ${seccionActiva === 'proyecto' ? 'active' : ''}`}
              onClick={() => navegarSeccion('proyecto')}
            >
              <IconLayers size={14} /> Proyecto
            </button>
          </nav>
        </div>
      </header>

      <main className={`main-content-wrapper ${seccionActiva === 'proyecto' || seccionActiva === 'biblioteca' ? 'main-project-fullbleed' : ''}`}>
        {seccionActiva === 'inicio' && (
          <HomeView
            onExploreDilemmas={() => navegarSeccion('catalogo')}
            onOpenLibrary={() => navegarSeccion('biblioteca')}
            onStartFeaturedDilemma={() => abrirDilema('huellas-exploracion-espacial')}
            onSelectSpecificDilemma={abrirDilema}
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
          dilemaSeleccionado.esDirectrizAmbiental || dilemaSeleccionado.id === 'huellas-exploracion-espacial' ? (
            <EnvironmentalDilemmaExperience
              key={dilemaSeleccionado.id}
              onVolverAlCatalogo={() => navegarSeccion('catalogo')}
              onGuardarGlobal={guardarProgresoDilema}
            />
          ) : dilemaSeleccionado.esDirectrizUsoEspacio || dilemaSeleccionado.id === 'uso-bienes-materiales-propiedad' ? (
            <SpaceUseDilemmaExperience
              key={dilemaSeleccionado.id}
              onVolverAlCatalogo={() => navegarSeccion('catalogo')}
              onGuardarGlobal={guardarProgresoDilema}
            />
          ) : (
            <AnimalResearchDilemmaExperience
              key={dilemaSeleccionado.id}
              onVolverAlCatalogo={() => navegarSeccion('catalogo')}
              onGuardarGlobal={guardarProgresoDilema}
            />
          )
        )}

        {seccionActiva === 'biblioteca' && (
          <LibraryView
            perspectivas={PERSPECTIVAS_BIBLIOTECA}
            onExploreDilemmas={() => navegarSeccion('catalogo')}
            onSelectSpecificDilemma={abrirDilema}
          />
        )}

        {seccionActiva === 'proyecto' && (
          <AboutView onExploreDilemmas={() => navegarSeccion('catalogo')} />
        )}
      </main>

      <footer className="solid-footer">
        <p>
          <strong>Órbita Ética</strong>
        </p>
      </footer>
    </div>
  )
}

export default App
