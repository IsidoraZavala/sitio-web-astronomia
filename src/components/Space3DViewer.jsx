import { useEffect, useRef, useState } from 'react'

const ESCENAS_IDS = ['marte', 'orbita', 'basura', 'luna', 'telescopio']

export function Space3DViewer({
  initialMode = 'marte',
  compact = false,
  autoCycle = false,
  cycleIntervalMs = 4500,
}) {
  const canvasRef = useRef(null)
  const [modo, setModo] = useState(initialMode)
  const densidad = 60
  const rotRef = useRef({ x: 0.35, y: 0.45 })
  const dragRef = useRef({ active: false, x: 0, y: 0 })

  useEffect(() => {
    setModo(initialMode)
  }, [initialMode])

  useEffect(() => {
    if (!autoCycle) return
    const timer = setInterval(() => {
      setModo((prev) => {
        const idx = ESCENAS_IDS.indexOf(prev)
        return ESCENAS_IDS[(idx + 1) % ESCENAS_IDS.length]
      })
    }, cycleIntervalMs)
    return () => clearInterval(timer)
  }, [autoCycle, cycleIntervalMs])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let tick = 0

    const estrellas = Array.from({ length: 55 }, (_, i) => ({
      x: ((i * 97) % 520) + 10,
      y: ((i * 53) % 360) + 10,
      r: i % 4 === 0 ? 1.8 : 1.1,
      color: i % 3 === 0 ? '#FFFFFF' : '#94A3B8',
    }))

    const generarObjetos = (cantidad, tipo) => {
      return Array.from({ length: cantidad }, (_, i) => {
        const anillo = i % 4
        const inclinacion =
          tipo === 'orbita' ? anillo * 0.45 - 0.6 : Math.sin(i * 4.7) * 1.45
        const radio = tipo === 'orbita' ? 112 + anillo * 14 : 98 + ((i * 17) % 62)
        const fase = (i / cantidad) * Math.PI * 2 * (anillo + 1)
        const velocidad = 0.006 + anillo * 0.0018
        return { inclinacion, radio, fase, velocidad, anillo }
      })
    }

    const objetos = generarObjetos(densidad, modo)

    const proyectar3D = (x, y, z, cx, cy, rx, ry) => {
      const x1 = x * Math.cos(ry) - z * Math.sin(ry)
      const z1 = z * Math.cos(ry) + x * Math.sin(ry)
      const y2 = y * Math.cos(rx) - z1 * Math.sin(rx)
      const z2 = z1 * Math.cos(rx) + y * Math.sin(rx)
      return { x: cx + x1, y: cy + y2, z: z2 }
    }

    const dibujarEsferaMalla = (cx, cy, radio, colorRelleno, colorLinea, colorBorde, rx, ry) => {
      ctx.beginPath()
      ctx.arc(cx, cy, radio, 0, Math.PI * 2)
      ctx.fillStyle = colorRelleno
      ctx.fill()
      ctx.lineWidth = 2
      ctx.strokeStyle = colorBorde
      ctx.stroke()

      ctx.strokeStyle = colorLinea
      ctx.lineWidth = 1.1
      for (let lat = -60; lat <= 60; lat += 30) {
        const radLat = (lat * Math.PI) / 180
        const r = Math.cos(radLat) * radio
        const y = Math.sin(radLat) * radio
        ctx.beginPath()
        let iniciado = false
        for (let lon = 0; lon <= 360; lon += 10) {
          const radLon = (lon * Math.PI) / 180
          const p = proyectar3D(r * Math.cos(radLon), y, r * Math.sin(radLon), cx, cy, rx, ry)
          if (p.z >= 0) {
            if (!iniciado) {
              ctx.moveTo(p.x, p.y)
              iniciado = true
            } else {
              ctx.lineTo(p.x, p.y)
            }
          } else {
            iniciado = false
          }
        }
        ctx.stroke()
      }

      for (let lon = 0; lon < 180; lon += 30) {
        const radLon = (lon * Math.PI) / 180
        ctx.beginPath()
        let iniciado = false
        for (let a = 0; a <= 360; a += 10) {
          const radA = (a * Math.PI) / 180
          const x = radio * Math.sin(radA) * Math.cos(radLon)
          const y = radio * Math.cos(radA)
          const z = radio * Math.sin(radA) * Math.sin(radLon)
          const p = proyectar3D(x, y, z, cx, cy, rx, ry)
          if (p.z >= 0) {
            if (!iniciado) {
              ctx.moveTo(p.x, p.y)
              iniciado = true
            } else {
              ctx.lineTo(p.x, p.y)
            }
          } else {
            iniciado = false
          }
        }
        ctx.stroke()
      }
    }

    const render = () => {
      tick += 1
      if (!dragRef.current.active) {
        rotRef.current.y += 0.0035
      }

      const w = canvas.width
      const h = canvas.height
      const cx = w / 2
      const cy = h / 2
      const rx = rotRef.current.x
      const ry = rotRef.current.y

      ctx.fillStyle = '#05060A'
      ctx.fillRect(0, 0, w, h)

      estrellas.forEach((st) => {
        ctx.fillStyle = st.color
        ctx.beginPath()
        ctx.arc(st.x % w, st.y % h, st.r, 0, Math.PI * 2)
        ctx.fill()
      })

      if (modo === 'marte') {
        const escala = compact ? 0.78 : 1
        const rTierraOrb = 78 * escala
        const rMarteOrb = 148 * escala

        ;[
          { r: rTierraOrb, color: '#1E3A5F' },
          { r: rMarteOrb, color: '#4A2511' },
        ].forEach((orb) => {
          ctx.strokeStyle = orb.color
          ctx.lineWidth = 1.4
          ctx.beginPath()
          for (let a = 0; a <= 360; a += 6) {
            const rad = (a * Math.PI) / 180
            const p = proyectar3D(orb.r * Math.cos(rad), 0, orb.r * Math.sin(rad), cx, cy, rx, ry)
            if (a === 0) ctx.moveTo(p.x, p.y)
            else ctx.lineTo(p.x, p.y)
          }
          ctx.stroke()
        })

        const semiMayor = (rTierraOrb + rMarteOrb) / 2
        const centroElipse = rMarteOrb - semiMayor
        const semiMenor = Math.sqrt(rTierraOrb * rMarteOrb)
        ctx.strokeStyle = '#F59E0B'
        ctx.lineWidth = 2
        ctx.setLineDash([5, 4])
        ctx.beginPath()
        for (let a = 0; a <= 180; a += 5) {
          const rad = (a * Math.PI) / 180
          const xE = -centroElipse + semiMayor * Math.cos(rad)
          const zE = semiMenor * Math.sin(rad)
          const p = proyectar3D(xE, 0, zE, cx, cy, rx, ry)
          if (a === 0) ctx.moveTo(p.x, p.y)
          else ctx.lineTo(p.x, p.y)
        }
        ctx.stroke()
        ctx.setLineDash([])

        const pSol = proyectar3D(0, 0, 0, cx, cy, rx, ry)
        ctx.beginPath()
        ctx.arc(pSol.x, pSol.y, 10 * escala, 0, Math.PI * 2)
        ctx.fillStyle = '#F59E0B'
        ctx.fill()

        const pTierra = proyectar3D(rTierraOrb, 0, 0, cx, cy, rx, ry)
        dibujarEsferaMalla(
          pTierra.x,
          pTierra.y,
          22 * escala,
          '#1B4965',
          '#38BDF8',
          '#E2E8F0',
          rx,
          ry
        )

        const pMarte = proyectar3D(-rMarteOrb, 0, 0, cx, cy, rx, ry)
        dibujarEsferaMalla(
          pMarte.x,
          pMarte.y,
          30 * escala,
          '#9A3412',
          '#EA580C',
          '#FED7AA',
          rx,
          ry
        )

        const prog = ((tick * 0.008) % 1) * Math.PI
        const xNave = -centroElipse + semiMayor * Math.cos(prog)
        const zNave = semiMenor * Math.sin(prog)
        const pNave = proyectar3D(xNave, 0, zNave, cx, cy, rx, ry)
        ctx.fillStyle = '#FFFFFF'
        ctx.fillRect(pNave.x - 4, pNave.y - 4, 8, 8)
        ctx.strokeStyle = '#F59E0B'
        ctx.lineWidth = 2
        ctx.strokeRect(pNave.x - 4, pNave.y - 4, 8, 8)
      } else if (modo === 'orbita' || modo === 'basura') {
        const radioPlaneta = compact ? 68 : 82

        if (modo === 'orbita') {
          ;[-0.6, -0.15, 0.3, 0.75].forEach((inc, idx) => {
            const rOrb = radioPlaneta + 32 + idx * 13
            ctx.strokeStyle = '#1E293B'
            ctx.lineWidth = 1.2
            ctx.beginPath()
            for (let a = 0; a <= 360; a += 8) {
              const rad = (a * Math.PI) / 180
              const x0 = rOrb * Math.cos(rad)
              const z0 = rOrb * Math.sin(rad)
              const p = proyectar3D(x0 * Math.cos(inc), x0 * Math.sin(inc), z0, cx, cy, rx, ry)
              if (a === 0) ctx.moveTo(p.x, p.y)
              else ctx.lineTo(p.x, p.y)
            }
            ctx.stroke()
          })
        }

        objetos.forEach((obj) => {
          const ang = obj.fase + tick * obj.velocidad
          const escala = radioPlaneta / 78
          const r = obj.radio * escala
          const x0 = r * Math.cos(ang)
          const z0 = r * Math.sin(ang)
          const p = proyectar3D(
            x0 * Math.cos(obj.inclinacion),
            x0 * Math.sin(obj.inclinacion),
            z0,
            cx,
            cy,
            rx,
            ry
          )
          const ocultoPorPlaneta = p.z < 0 && Math.hypot(p.x - cx, p.y - cy) < radioPlaneta
          if (p.z < 0 && !ocultoPorPlaneta) {
            ctx.fillStyle = modo === 'basura' ? '#B45309' : '#64748B'
            ctx.fillRect(p.x - 2.5, p.y - 2.5, 5, 5)
          }
        })

        dibujarEsferaMalla(cx, cy, radioPlaneta, '#1B4965', '#2C6E91', '#E2E8F0', rx, ry)

        objetos.forEach((obj) => {
          const ang = obj.fase + tick * obj.velocidad
          const escala = radioPlaneta / 78
          const r = obj.radio * escala
          const x0 = r * Math.cos(ang)
          const z0 = r * Math.sin(ang)
          const p = proyectar3D(
            x0 * Math.cos(obj.inclinacion),
            x0 * Math.sin(obj.inclinacion),
            z0,
            cx,
            cy,
            rx,
            ry
          )
          if (p.z >= 0) {
            ctx.fillStyle =
              modo === 'basura'
                ? obj.anillo % 2 === 0
                  ? '#F59E0B'
                  : '#EF4444'
                : obj.anillo === 0
                ? '#F59E0B'
                : '#FFFFFF'
            ctx.fillRect(p.x - 3.5, p.y - 3.5, 7, 7)
          }
        })
      } else if (modo === 'luna') {
        const radioLuna = compact ? 82 : 96
        dibujarEsferaMalla(cx, cy, radioLuna, '#334155', '#475569', '#CBD5E1', rx, ry)

        const puntosLunares = [
          { lat: 75, lon: 0, color: '#38BDF8' },
          { lat: 68, lon: 65, color: '#F59E0B' },
          { lat: 70, lon: -70, color: '#22C55E' },
          { lat: 62, lon: 140, color: '#38BDF8' },
        ]

        puntosLunares.forEach((pt) => {
          const rLat = (pt.lat * Math.PI) / 180
          const rLon = (pt.lon * Math.PI) / 180
          const x = radioLuna * Math.cos(rLat) * Math.cos(rLon)
          const y = radioLuna * Math.sin(rLat)
          const z = radioLuna * Math.cos(rLat) * Math.sin(rLon)
          const p = proyectar3D(x, y, z, cx, cy, rx, ry)
          if (p.z >= 0) {
            ctx.beginPath()
            ctx.arc(p.x, p.y, 7, 0, Math.PI * 2)
            ctx.fillStyle = pt.color
            ctx.fill()
            ctx.lineWidth = 2
            ctx.strokeStyle = '#05060A'
            ctx.stroke()
          }
        })
      } else if (modo === 'telescopio') {
        const rLente = compact ? 105 : 124
        ctx.save()
        ctx.beginPath()
        ctx.arc(cx, cy, rLente, 0, Math.PI * 2)
        ctx.clip()

        ctx.fillStyle = '#0B1320'
        ctx.fillRect(cx - rLente, cy - rLente, rLente * 2, rLente * 2)

        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate(-0.35)
        ctx.fillStyle = '#2563EB'
        ctx.beginPath()
        ctx.ellipse(0, 0, 44, 18, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = '#F59E0B'
        ctx.beginPath()
        ctx.arc(0, 0, 10, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        const numTrazas = Math.floor(densidad / 12)
        ctx.strokeStyle = '#F59E0B'
        ctx.lineWidth = 2
        ctx.beginPath()
        for (let i = 0; i < numTrazas; i++) {
          const offset = (i - numTrazas / 2) * 26
          ctx.moveTo(cx - rLente, cy + offset - 40)
          ctx.lineTo(cx + rLente, cy + offset + 45)
        }
        ctx.stroke()

        ctx.strokeStyle = '#334155'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(cx - rLente, cy)
        ctx.lineTo(cx + rLente, cy)
        ctx.moveTo(cx, cy - rLente)
        ctx.lineTo(cx, cy + rLente)
        ctx.stroke()
        ctx.restore()

        ctx.beginPath()
        ctx.arc(cx, cy, rLente, 0, Math.PI * 2)
        ctx.lineWidth = 3
        ctx.strokeStyle = '#475569'
        ctx.stroke()
      }

      animId = requestAnimationFrame(render)
    }

    render()
    return () => cancelAnimationFrame(animId)
  }, [modo, densidad, compact])

  const handleMouseDown = (e) => {
    dragRef.current = { active: true, x: e.clientX, y: e.clientY }
  }

  const handleMouseMove = (e) => {
    if (!dragRef.current.active) return
    const dx = e.clientX - dragRef.current.x
    const dy = e.clientY - dragRef.current.y
    dragRef.current = { active: true, x: e.clientX, y: e.clientY }
    rotRef.current.y += dx * 0.01
    rotRef.current.x = Math.max(-1.2, Math.min(1.2, rotRef.current.x + dy * 0.01))
  }

  const handleMouseUp = () => {
    dragRef.current.active = false
  }

  return (
    <div className="space-3d-viewer">
      <div
        className="canvas-stage-wrapper"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <canvas
          ref={canvasRef}
          width={compact ? 420 : 520}
          height={compact ? 250 : 320}
          className="space-3d-canvas"
        />
      </div>
    </div>
  )
}
