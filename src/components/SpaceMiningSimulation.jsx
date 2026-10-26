import { useEffect, useRef, useState } from 'react'

const CUERPOS_MINERIA = [
  {
    id: 'psyche',
    nombre: '16 Psyche',
    tipo: 'Asteroide Metálico (Cinturón Principal)',
    recursos: 'Hierro, Níquel, Oro, Platino',
    valorEstimado: '~$10.000 trillones USD',
    mision: 'NASA Psyche (En ruta)',
    semiejeUA: 2.92,
    excentricidad: 0.134,
    color: '#F59E0B',
    inclinacionRad: 0.08,
  },
  {
    id: 'bennu',
    nombre: '101955 Bennu',
    tipo: 'Asteroide Carbonáceo (NEO)',
    recursos: 'Agua helada, Carbono, Minerales raros',
    valorEstimado: 'Muestras retornadas a la Tierra',
    mision: 'OSIRIS-REx (2023)',
    semiejeUA: 1.126,
    excentricidad: 0.204,
    color: '#34D399',
    inclinacionRad: 0.12,
  },
  {
    id: 'apophis',
    nombre: '99942 Apophis',
    tipo: 'Asteroide Apolo (Aproximación récord 2029)',
    recursos: 'Silicatos, Níquel-Hierro',
    valorEstimado: 'Aproximación a 31.600 km de la Tierra',
    mision: 'OSIRIS-APEX (2029)',
    semiejeUA: 0.922,
    excentricidad: 0.191,
    color: '#A78BFA',
    inclinacionRad: 0.06,
  },
]

export function SpaceMiningSimulation({ compact = false }) {
  const canvasRef = useRef(null)
  const [cuerpoActivoId, setCuerpoActivoId] = useState('psyche')
  const [pausado, setPausado] = useState(false)
  const rotRef = useRef({ x: 0.72, y: 0.15 })
  const dragRef = useRef({ active: false, x: 0, y: 0 })

  const cuerpoActivo = CUERPOS_MINERIA.find((c) => c.id === cuerpoActivoId) || CUERPOS_MINERIA[0]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let tick = 0

    const estrellas = Array.from({ length: 45 }, (_, i) => ({
      x: ((i * 113) % (compact ? 420 : 520)) + 6,
      y: ((i * 71) % (compact ? 240 : 300)) + 6,
      r: i % 4 === 0 ? 1.5 : 0.8,
      alpha: 0.25 + (i % 5) * 0.15,
    }))

    // Proyección 3D ortográfica
    const proyectar = (x, y, z, cx, cy, rx, ry) => {
      const cosY = Math.cos(ry)
      const sinY = Math.sin(ry)
      const x1 = x * cosY - z * sinY
      const z1 = z * cosY + x * sinY

      const cosX = Math.cos(rx)
      const sinX = Math.sin(rx)
      const y2 = y * cosX - z1 * sinX
      const z2 = z1 * cosX + y * sinX

      return { x: cx + x1, y: cy + y2, z: z2 }
    }

    const render = () => {
      if (!pausado) {
        tick += 1
        if (!dragRef.current.active) {
          rotRef.current.y += 0.0025
        }
      }

      const w = canvas.width
      const h = canvas.height
      const cx = w / 2
      const cy = h / 2
      const rx = rotRef.current.x
      const ry = rotRef.current.y

      ctx.fillStyle = '#060814'
      ctx.fillRect(0, 0, w, h)

      // 1. Estrellas de fondo
      estrellas.forEach((st) => {
        ctx.fillStyle = `rgba(255, 255, 255, ${st.alpha})`
        ctx.beginPath()
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2)
        ctx.fill()
      })

      // Escala: 1 UA = escalaPixels
      const escalaUA = compact ? 52 : 65

      // 2. Sol central resplandeciente
      const solRadio = compact ? 9 : 12
      const gradSol = ctx.createRadialGradient(cx, cy, solRadio * 0.4, cx, cy, solRadio * 2.8)
      gradSol.addColorStop(0, '#FEF08A')
      gradSol.addColorStop(0.35, '#F59E0B')
      gradSol.addColorStop(0.7, 'rgba(217, 119, 6, 0.2)')
      gradSol.addColorStop(1, 'rgba(6, 8, 20, 0)')
      ctx.fillStyle = gradSol
      ctx.beginPath()
      ctx.arc(cx, cy, solRadio * 2.8, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = '#FDE047'
      ctx.beginPath()
      ctx.arc(cx, cy, solRadio, 0, Math.PI * 2)
      ctx.fill()

      // 3. Órbita de la Tierra (1.00 UA)
      const rTierra = 1.0 * escalaUA
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)'
      ctx.lineWidth = 1.2
      ctx.beginPath()
      for (let a = 0; a <= 360; a += 8) {
        const rad = (a * Math.PI) / 180
        const p = proyectar(rTierra * Math.cos(rad), 0, rTierra * Math.sin(rad), cx, cy, rx, ry)
        if (a === 0) ctx.moveTo(p.x, p.y)
        else ctx.lineTo(p.x, p.y)
      }
      ctx.stroke()

      // Posición de la Tierra en su órbita
      const thetaTierra = tick * 0.008
      const tierraPos = proyectar(
        rTierra * Math.cos(thetaTierra),
        0,
        rTierra * Math.sin(thetaTierra),
        cx,
        cy,
        rx,
        ry
      )

      // Dibujar la Tierra
      ctx.fillStyle = '#38BDF8'
      ctx.beginPath()
      ctx.arc(tierraPos.x, tierraPos.y, compact ? 4 : 5.5, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = '#FFFFFF'
      ctx.lineWidth = 0.8
      ctx.stroke()
      ctx.fillStyle = '#94A3B8'
      ctx.font = '9px monospace'
      ctx.fillText('TIERRA', tierraPos.x + 8, tierraPos.y + 3)

      // 4. Dibujar las órbitas de los asteroides de la base de datos JPL
      CUERPOS_MINERIA.forEach((cuerpo) => {
        const esSeleccionado = cuerpo.id === cuerpoActivoId
        const aOrb = cuerpo.semiejeUA * escalaUA
        const eOrb = cuerpo.excentricidad
        const bOrb = aOrb * Math.sqrt(Math.max(0.1, 1 - eOrb * eOrb))
        const cOrb = aOrb * eOrb // Desplazamiento del foco (el Sol está en un foco)

        ctx.strokeStyle = esSeleccionado ? cuerpo.color : 'rgba(148, 163, 184, 0.18)'
        ctx.lineWidth = esSeleccionado ? 1.6 : 0.8
        if (!esSeleccionado) ctx.setLineDash([3, 4])
        else ctx.setLineDash([])

        ctx.beginPath()
        for (let ang = 0; ang <= 360; ang += 8) {
          const rad = (ang * Math.PI) / 180
          // Ecuación elíptica con foco en el origen: x = a*cos - c
          const xEll = aOrb * Math.cos(rad) - cOrb
          const zEll = bOrb * Math.sin(rad)
          const yEll = Math.sin(rad) * aOrb * cuerpo.inclinacionRad

          const p = proyectar(xEll, yEll, zEll, cx, cy, rx, ry)
          if (ang === 0) ctx.moveTo(p.x, p.y)
          else ctx.lineTo(p.x, p.y)
        }
        ctx.stroke()
        ctx.setLineDash([])

        // Calcular posición actual del asteroide (Kepler aproximado)
        const velAngular = (0.01 / Math.sqrt(cuerpo.semiejeUA * cuerpo.semiejeUA * cuerpo.semiejeUA))
        const thetaAst = tick * velAngular + (cuerpo.id === 'psyche' ? 1.2 : cuerpo.id === 'bennu' ? 2.5 : 0.4)
        const xAst = aOrb * Math.cos(thetaAst) - cOrb
        const zAst = bOrb * Math.sin(thetaAst)
        const yAst = Math.sin(thetaAst) * aOrb * cuerpo.inclinacionRad
        const pAst = proyectar(xAst, yAst, zAst, cx, cy, rx, ry)

        // Dibujar cuerpo celeste
        ctx.fillStyle = cuerpo.color
        ctx.beginPath()
        ctx.arc(pAst.x, pAst.y, esSeleccionado ? (compact ? 5 : 6.5) : 3, 0, Math.PI * 2)
        ctx.fill()

        if (esSeleccionado) {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)'
          ctx.lineWidth = 1.2
          ctx.stroke()

          // Halo de selección
          ctx.strokeStyle = cuerpo.color
          ctx.lineWidth = 0.8
          ctx.beginPath()
          ctx.arc(pAst.x, pAst.y, compact ? 10 : 13, 0, Math.PI * 2)
          ctx.stroke()

          ctx.fillStyle = '#F8FAFC'
          ctx.font = '10px monospace'
          ctx.fillText(cuerpo.nombre, pAst.x + 10, pAst.y - 4)

          // 5. Trayectoria de transferencia espacial hipotética (Tierra -> Asteroide)
          ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)'
          ctx.lineWidth = 1
          ctx.setLineDash([2, 4])
          ctx.beginPath()
          ctx.moveTo(tierraPos.x, tierraPos.y)
          // Curva Bezier hacia el asteroide
          const midX = (tierraPos.x + pAst.x) / 2 + 15
          const midY = (tierraPos.y + pAst.y) / 2 - 25
          ctx.quadraticCurveTo(midX, midY, pAst.x, pAst.y)
          ctx.stroke()
          ctx.setLineDash([])

          // Nave de prospección viajando
          const prog = (tick % 240) / 240
          const naveX = (1 - prog) * (1 - prog) * tierraPos.x + 2 * (1 - prog) * prog * midX + prog * prog * pAst.x
          const naveY = (1 - prog) * (1 - prog) * tierraPos.y + 2 * (1 - prog) * prog * midY + prog * prog * pAst.y
          ctx.fillStyle = '#F8FAFC'
          ctx.beginPath()
          ctx.arc(naveX, naveY, 2.5, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      animId = requestAnimationFrame(render)
    }

    render()
    return () => cancelAnimationFrame(animId)
  }, [compact, cuerpoActivoId, pausado])

  const handleMouseDown = (e) => {
    dragRef.current = { active: true, x: e.clientX, y: e.clientY }
  }

  const handleMouseMove = (e) => {
    if (!dragRef.current.active) return
    const dx = e.clientX - dragRef.current.x
    const dy = e.clientY - dragRef.current.y
    dragRef.current = { active: true, x: e.clientX, y: e.clientY }
    rotRef.current.y += dx * 0.012
    rotRef.current.x = Math.max(0.1, Math.min(1.4, rotRef.current.x + dy * 0.012))
  }

  const handleMouseUp = () => {
    dragRef.current.active = false
  }

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden', borderRadius: '8px' }}>
      {/* HEADER DE TELEMETRÍA JPL SBDB */}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '12px',
          right: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontSize: '10px',
            fontFamily: 'monospace',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            background: 'rgba(15, 23, 42, 0.88)',
            color: '#FBBF24',
            border: '1px solid rgba(245, 158, 11, 0.45)',
            padding: '2px 8px',
            borderRadius: '12px',
            backdropFilter: 'blur(4px)',
          }}
        >
          NASA JPL SBDB · Prospección Minera
        </span>

        <span
          style={{
            fontSize: '9.5px',
            fontFamily: 'monospace',
            background: 'rgba(245, 158, 11, 0.15)',
            color: '#FDE68A',
            border: '1px solid rgba(245, 158, 11, 0.35)',
            padding: '2px 6px',
            borderRadius: '12px',
          }}
        >
          {cuerpoActivo.semiejeUA} UA · e={cuerpoActivo.excentricidad}
        </span>
      </div>

      {/* CANVAS INTERACTIVO 3D */}
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: 'grab', display: 'flex', justifyContent: 'center' }}
      >
        <canvas
          ref={canvasRef}
          width={compact ? 420 : 520}
          height={compact ? 240 : 300}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>

      {/* BARRA DE CONTROLES INFERIOR: SELECTOR DE ASTEROIDES DE MINERÍA */}
      <div
        style={{
          position: 'absolute',
          bottom: '8px',
          left: '10px',
          right: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '6px',
          zIndex: 2,
        }}
      >
        <div style={{ display: 'flex', gap: '4px' }}>
          {CUERPOS_MINERIA.map((item) => (
            <button
              key={item.id}
              onClick={() => setCuerpoActivoId(item.id)}
              style={{
                fontSize: '10px',
                padding: '2px 7px',
                borderRadius: '6px',
                border: '1px solid',
                borderColor: cuerpoActivoId === item.id ? item.color : 'rgba(148, 163, 184, 0.25)',
                background: cuerpoActivoId === item.id ? 'rgba(245, 158, 11, 0.25)' : 'rgba(15, 23, 42, 0.8)',
                color: cuerpoActivoId === item.id ? '#F8FAFC' : '#94A3B8',
                cursor: 'pointer',
              }}
            >
              {item.nombre.split(' ')[1] || item.nombre}
            </button>
          ))}
        </div>

        <button
          onClick={() => setPausado(!pausado)}
          style={{
            fontSize: '10px',
            padding: '2px 8px',
            borderRadius: '6px',
            border: '1px solid rgba(148, 163, 184, 0.3)',
            background: 'rgba(15, 23, 42, 0.8)',
            color: '#E2E8F0',
            cursor: 'pointer',
          }}
        >
          {pausado ? '▶ Reanudar' : '⏸ Pausa'}
        </button>
      </div>
    </div>
  )
}
