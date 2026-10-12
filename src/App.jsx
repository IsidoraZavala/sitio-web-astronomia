import { useState } from 'react'
import './App.css'

const CELESTIAL_BODIES = [
  {
    id: 'tierra',
    name: 'Tierra',
    emoji: '🌍',
    type: 'Planeta Rocoso',
    distanceSun: '149.6M km (1 UA)',
    gravity: 9.81,
    moons: 1,
    temp: '15 °C (media)',
    description:
      'Nuestro hogar cósmico y el único mundo conocido con océanos de agua líquida en la superficie y atmósfera rica en nitrógeno y oxígeno.',
  },
  {
    id: 'marte',
    name: 'Marte',
    emoji: '🔴',
    type: 'Planeta Rocoso',
    distanceSun: '227.9M km (1.52 UA)',
    gravity: 3.72,
    moons: 2,
    temp: '-65 °C (media)',
    description:
      'El Planeta Rojo alberga el Monte Olimpo, el volcán más grande del Sistema Solar, y antiguos cauces fluviales estudiados por rovers.',
  },
  {
    id: 'jupiter',
    name: 'Júpiter',
    emoji: '🪐',
    type: 'Gigante Gaseoso',
    distanceSun: '778.5M km (5.20 UA)',
    gravity: 24.79,
    moons: 95,
    temp: '-110 °C (media)',
    description:
      'El planeta más masivo del Sistema Solar. Destaca por su Gran Mancha Roja y sus lunas galileanas: Ío, Europa, Ganímedes y Calisto.',
  },
  {
    id: 'saturno',
    name: 'Saturno',
    emoji: '💫',
    type: 'Gigante Gaseoso',
    distanceSun: '1,434M km (9.58 UA)',
    gravity: 10.44,
    moons: 146,
    temp: '-140 °C (media)',
    description:
      'Famoso por su espectacular sistema de anillos formados por hielo y roca, y por lunas fascinantes como Titán y Encélado.',
  },
]

function App() {
  const [activeTab, setActiveTab] = useState('explorador')
  const [selectedPlanetId, setSelectedPlanetId] = useState('marte')
  const [earthWeight, setEarthWeight] = useState(65)

  const currentPlanet =
    CELESTIAL_BODIES.find((body) => body.id === selectedPlanetId) || CELESTIAL_BODIES[0]

  const calculatedWeight = ((Number(earthWeight) || 0) * (currentPlanet.gravity / 9.81)).toFixed(1)

  return (
    <div className="app-container">
      {/* Barra de Navegación */}
      <header className="navbar">
        <div className="brand">
          <span className="brand-icon" aria-hidden="true">🔭</span>
          <span className="brand-title">Sitio Web Astronomía</span>
          <span className="brand-badge">Base v0.1</span>
        </div>

        <nav className="nav-tabs" aria-label="Secciones principales">
          <button
            className={`nav-tab ${activeTab === 'explorador' ? 'active' : ''}`}
            onClick={() => setActiveTab('explorador')}
          >
            Explorador Planetario
          </button>
          <button
            className={`nav-tab ${activeTab === 'calculadora' ? 'active' : ''}`}
            onClick={() => setActiveTab('calculadora')}
          >
            Calculadora de Gravedad
          </button>
          <button
            className={`nav-tab ${activeTab === 'proximamente' ? 'active' : ''}`}
            onClick={() => setActiveTab('proximamente')}
          >
            Próximos Módulos
          </button>
        </nav>
      </header>

      {/* Hero Principal */}
      <section className="hero">
        <div>
          <p className="hero-eyebrow">Plataforma Interactiva de Astronomía</p>
          <h1>Explora el Cosmos desde tu Navegador</h1>
          <p>
            Estructura base en React + Vite lista para escalar con nuevas secciones,
            visualizaciones astronómicas, catálogos celestes y herramientas interactivas.
          </p>
        </div>

        <div className="hero-stats">
          <div className="stat-box">
            <span className="stat-label">Velocidad de la luz</span>
            <span className="stat-value">299,792 km/s</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">Unidad Astronómica</span>
            <span className="stat-value">149.6M km</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">Cuerpos de ejemplo</span>
            <span className="stat-value">{CELESTIAL_BODIES.length} Planetas</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">Estado del Proyecto</span>
            <span className="stat-value">Base Activa</span>
          </div>
        </div>
      </section>

      {/* Contenido dinámico según pestaña */}
      {activeTab === 'explorador' && (
        <main>
          <div className="section-header">
            <h2 className="section-title">Explorador del Sistema Solar</h2>
          </div>

          <div className="planet-selector" role="tablist" aria-label="Seleccionar planeta">
            {CELESTIAL_BODIES.map((body) => (
              <button
                key={body.id}
                className={`planet-btn ${selectedPlanetId === body.id ? 'selected' : ''}`}
                onClick={() => setSelectedPlanetId(body.id)}
              >
                <span>{body.emoji}</span>
                <span>{body.name}</span>
              </button>
            ))}
          </div>

          <article className="planet-card">
            <div>
              <div className="planet-header">
                <span className="planet-emoji">{currentPlanet.emoji}</span>
                <div>
                  <span className="planet-type">{currentPlanet.type}</span>
                  <h3 className="planet-name">{currentPlanet.name}</h3>
                </div>
              </div>
              <p className="planet-description">{currentPlanet.description}</p>
            </div>

            <div className="metrics-grid">
              <div className="metric-item">
                <span>Distancia al Sol</span>
                <strong>{currentPlanet.distanceSun}</strong>
              </div>
              <div className="metric-item">
                <span>Gravedad superficial</span>
                <strong>{currentPlanet.gravity} m/s²</strong>
              </div>
              <div className="metric-item">
                <span>Lunas conocidas</span>
                <strong>{currentPlanet.moons}</strong>
              </div>
              <div className="metric-item">
                <span>Temperatura media</span>
                <strong>{currentPlanet.temp}</strong>
              </div>
            </div>
          </article>
        </main>
      )}

      {activeTab === 'calculadora' && (
        <main className="tool-card">
          <h2 className="section-title">Simulador de Peso Planetario</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
            Ingresa una masa o peso de referencia en la Tierra para comparar cómo cambia según la
            gravedad superficial de cada planeta.
          </p>

          <div className="input-group">
            <label htmlFor="weight-input">Peso en la Tierra (kg):</label>
            <input
              id="weight-input"
              type="number"
              min="1"
              max="1000"
              className="input-field"
              value={earthWeight}
              onChange={(e) => setEarthWeight(e.target.value)}
            />
          </div>

          <div className="metrics-grid" style={{ marginTop: '1.5rem' }}>
            {CELESTIAL_BODIES.map((body) => {
              const weightOnPlanet = ((Number(earthWeight) || 0) * (body.gravity / 9.81)).toFixed(1)
              return (
                <div key={body.id} className="metric-item">
                  <span>
                    {body.emoji} En {body.name}
                  </span>
                  <strong>{weightOnPlanet} kg</strong>
                </div>
              )
            })}
          </div>
        </main>
      )}

      {activeTab === 'proximamente' && (
        <main className="tool-card">
          <h2 className="section-title">Espacio para tus Nuevas Secciones</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            Esta base está preparada para agregar los módulos específicos que definas en el
            siguiente paso (por ejemplo: fases lunares, mapa estelar, galería astronómica, eventos
            del cielo nocturno, etc.).
          </p>
        </main>
      )}

      {/* Banner inferior */}
      <footer className="roadmap-banner">
        <div>
          <strong>🚀 Base lista para personalizar</strong>
          <p>
            En cuanto envíes los detalles de lo que quieres incluir, adaptaremos las secciones y
            componentes de este proyecto.
          </p>
        </div>
        <span className="brand-badge">Equivalente en {currentPlanet.name}: {calculatedWeight} kg</span>
      </footer>
    </div>
  )
}

export default App
