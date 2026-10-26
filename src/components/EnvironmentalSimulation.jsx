import { useEffect, useRef, useState } from 'react'

export function EnvironmentalSimulation({ compact = false }) {
  const canvasRef = useRef(null)
  const [capaFiltro, setCapaFiltro] = useState('todos') // 'todos' | 'leo' | 'luna'
  const [pausado, setPausado] = useState(false)
  const rotRef = useRef({ x: 0.38, y: 0.25 })
  const dragRef = useRef({ active: false, x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let tick = 0

    // Estrellas de fondo
    const estrellas = Array.from({ length: 45 }, (_, i) => ({
      x: ((i * 127) % (compact ? 420 : 520)) + 6,
      y: ((i * 83) % (compact ? 240 : 300)) + 6,
      r: i % 4 === 0 ? 1.6 : 0.9,
      alpha: 0.3 + (i % 5) * 0.15,
    }))

    // Enjambre de 75 objetos orbitales (satélites y desechos) según datos de NASA ODPO
    const objetos = Array.from({ length: 75 }, (_, i) => {
      const esGeo = i > 62
      const esActivo = i % 5 === 0
      const radio = esGeo
        ? (compact ? 150 : 180) + (i % 4) * 8
        : (compact ? 52 : 68) + (i % 7) * (compact ? 7 : 9)
      const velocidad = (esGeo ? 0.004 : 0.016 + (i % 5) * 0.003) * (i % 2 === 0 ? 1 : 0.95)
      const inclinacion = (Math.sin(i * 3.7) * Math.PI) / (esGeo ? 12 : 3)
      const fase = (i / 75) * Math.PI * 2

      return {
        id: i,
        tipo: esActivo ? 'activo' : esGeo ? 'geo' : 'basura',
        radio,
        velocidad,
        inclinacion,
        fase,
        tamaño: esActivo ? 2.2 : i % 3 === 0 ? 1.8 : 1.2,
        color: esActivo ? '#10B981' : esGeo ? '#38BDF8' : i % 2 === 0 ? '#EF4444' : '#F59E0B',
      }
    })

    // Proyección 3D ortográfica con rotación X (inclinación) e Y (azimut)
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
          rotRef.current.y += 0.003
        }
      }

      const w = canvas.width
      const h = canvas.height
      const cx = w / 2
      const cy = h / 2
      const rx = rotRef.current.x
      const ry = rotRef.current.y

      ctx.fillStyle = '#05070E'
      ctx.fillRect(0, 0, w, h)

      // 1. Dibujar estrellas
      estrellas.forEach((st) => {
        ctx.fillStyle = `rgba(255, 255, 255, ${st.alpha})`
        ctx.beginPath()
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2)
        ctx.fill()
      })

      // 2. Anillo de órbita lunar si está activa la vista
      const radioLuna = compact ? 175 : 215
      ctx.strokeStyle = 'rgba(217, 119, 6, 0.22)'
      ctx.lineWidth = 1
      ctx.setLineDash([4, 4])
      ctx.beginPath()
      for (let a = 0; a <= 360; a += 10) {
        const rad = (a * Math.PI) / 180
        const p = proyectar(
          radioLuna * Math.cos(rad),
          Math.sin(rad * 2) * 12,
          radioLuna * Math.sin(rad),
          cx,
          cy,
          rx,
          ry
        )
        if (a === 0) ctx.moveTo(p.x, p.y)
        else ctx.lineTo(p.x, p.y)
      }
      ctx.stroke()
      ctx.setLineDash([])

      // 3. Posición de la Luna
      const anguloLuna = tick * 0.002
      const luna3D = proyectar(
        radioLuna * Math.cos(anguloLuna),
        Math.sin(anguloLuna * 2) * 12,
        radioLuna * Math.sin(anguloLuna),
        cx,
        cy,
        rx,
        ry
      )

      // 4. Objetos y desechos antes de la Tierra (z < 0)
      const elementosVisibles = objetos.filter((obj) => {
        if (capaFiltro === 'luna') return obj.tipo === 'activo'
        if (capaFiltro === 'leo') return obj.tipo === 'basura'
        return true
      })

      // Ordenar por Z para orden de profundidad
      const renderObjetos = elementosVisibles.map((obj) => {
        const theta = obj.fase + tick * obj.velocidad
        const xOrb = obj.radio * Math.cos(theta)
        const yOrb = obj.radio * Math.sin(theta) * Math.sin(obj.inclinacion)
        const zOrb = obj.radio * Math.sin(theta) * Math.cos(obj.inclinacion)
        const p = proyectar(xOrb, yOrb, zOrb, cx, cy, rx, ry)
        return { ...obj, px: p.x, py: p.y, pz: p.z }
      })

      // Dibujar objetos detrás de la Tierra
      renderObjetos
        .filter((o) => o.pz < 0)
        .forEach((o) => {
          ctx.fillStyle = o.color
          ctx.beginPath()
          ctx.arc(o.px, o.py, o.tamaño * 0.8, 0, Math.PI * 2)
          ctx.fill()
        })

      // Dibujar la Luna si está detrás
      if (luna3D.z < 0) {
        ctx.fillStyle = '#CBD5E1'
        ctx.beginPath()
        ctx.arc(luna3D.x, luna3D.y, compact ? 7 : 9, 0, Math.PI * 2)
        ctx.fill()
        ctx.strokeStyle = 'rgba(255,255,255,0.4)'
        ctx.stroke()
      }

      // 5. La Tierra central
      const radioTierra = compact ? 34 : 44

      // Halo atmosférico azul/cian
      const gradHalo = ctx.createRadialGradient(cx, cy, radioTierra * 0.8, cx, cy, radioTierra * 1.5)
      gradHalo.addColorStop(0, 'rgba(56, 189, 248, 0.35)')
      gradHalo.addColorStop(0.5, 'rgba(16, 185, 129, 0.15)')
      gradHalo.addColorStop(1, 'rgba(5, 7, 14, 0)')
      ctx.fillStyle = gradHalo
      ctx.beginPath()
      ctx.arc(cx, cy, radioTierra * 1.5, 0, Math.PI * 2)
      ctx.fill()

      // Globo terrestre
      const gradTierra = ctx.createRadialGradient(
        cx - radioTierra * 0.3,
        cy - radioTierra * 0.3,
        radioTierra * 0.1,
        cx,
        cy,
        radioTierra
      )
      gradTierra.addColorStop(0, '#1E3A8A')
      gradTierra.addColorStop(0.65, '#0F172A')
      gradTierra.addColorStop(1, '#020617')
      ctx.fillStyle = gradTierra
      ctx.beginPath()
      ctx.arc(cx, cy, radioTierra, 0, Math.PI * 2)
      ctx.fill()

      // Borde de la Tierra
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)'
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Líneas de latitud de la Tierra (malla sutil)
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.35)'
      ctx.lineWidth = 0.9
      for (let lat = -45; lat <= 45; lat += 45) {
        const radLat = (lat * Math.PI) / 180
        const rLat = Math.cos(radLat) * radioTierra
        const yLat = Math.sin(radLat) * radioTierra
        ctx.beginPath()
        for (let a = 0; a <= 360; a += 15) {
          const radA = (a * Math.PI) / 180
          const p = proyectar(rLat * Math.cos(radA), yLat, rLat * Math.sin(radA), cx, cy, rx, ry)
          if (p.z >= 0) {
            if (a === 0) ctx.moveTo(p.x, p.y)
            else ctx.lineTo(p.x, p.y)
          }
        }
        ctx.stroke()
      }

      // Dibujar la Luna si está delante
      if (luna3D.z >= 0) {
        ctx.fillStyle = '#E2E8F0'
        ctx.beginPath()
        ctx.arc(luna3D.x, luna3D.y, compact ? 7 : 9, 0, Math.PI * 2)
        ctx.fill()
        ctx.strokeStyle = '#D97706'
        ctx.lineWidth = 1.2
        ctx.stroke()

        // Etiqueta de la Luna
        ctx.fillStyle = '#F8FAFC'
        ctx.font = '9px monospace'
        ctx.fillText('LUNA', luna3D.x + 10, luna3D.y + 3)
      }

      // 6. Objetos y desechos delante de la Tierra (z >= 0)
      renderObjetos
        .filter((o) => o.pz >= 0)
        .forEach((o) => {
          ctx.fillStyle = o.color
          ctx.beginPath()
          ctx.arc(o.px, o.py, o.tamaño, 0, Math.PI * 2)
          ctx.fill()

          // Si es satélite activo, dibuja un sutil destello
          if (o.tipo === 'activo') {
            ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)'
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.arc(o.px, o.py, o.tamaño * 2.2, 0, Math.PI * 2)
            ctx.stroke()
          }
        })

      animId = requestAnimationFrame(render)
    }

    render()
    return () => cancelAnimationFrame(animId)
  }, [compact, capaFiltro, pausado])

  const handleMouseDown = (e) => {
    dragRef.current = { active: true, x: e.clientX, y: e.clientY }
  }

  const handleMouseMove = (e) => {
    if (!dragRef.current.active) return
    const dx = e.clientX - dragRef.current.x
    const dy = e.clientY - dragRef.current.y
    dragRef.current = { active: true, x: e.clientX, y: e.clientY }
    rotRef.current.y += dx * 0.012
    rotRef.current.x = Math.max(-1.1, Math.min(1.1, rotRef.current.x + dy * 0.012))
  }

  const handleMouseUp = () => {
    dragRef.current.active = false
  }

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden', borderRadius: '8px' }}>
      {/* HEADER DE TELEMETRÍA CIENTÍFICA */}
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
            background: 'rgba(15, 23, 42, 0.85)',
            color: '#34D399',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            padding: '2px 8px',
            borderRadius: '12px',
            backdropFilter: 'blur(4px)',
          }}
        >
          NASA ODPO · LEO & Órbita Lunar
        </span>

        <span
          style={{
            fontSize: '9.5px',
            fontFamily: 'monospace',
            background: 'rgba(239, 68, 68, 0.18)',
            color: '#F87171',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            padding: '2px 6px',
            borderRadius: '12px',
          }}
        >
          ~36.500 restos &gt;10cm
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

      {/* BARRA DE CONTROLES INFERIOR SUTIL */}
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
          {[
            { id: 'todos', label: 'Todos' },
            { id: 'leo', label: 'Solo Chatarra' },
            { id: 'luna', label: 'Luna' },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setCapaFiltro(btn.id)}
              style={{
                fontSize: '10px',
                padding: '2px 7px',
                borderRadius: '6px',
                border: '1px solid',
                borderColor: capaFiltro === btn.id ? '#10B981' : 'rgba(148, 163, 184, 0.25)',
                background: capaFiltro === btn.id ? 'rgba(16, 185, 129, 0.25)' : 'rgba(15, 23, 42, 0.8)',
                color: capaFiltro === btn.id ? '#F8FAFC' : '#94A3B8',
                cursor: 'pointer',
              }}
            >
              {btn.label}
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
