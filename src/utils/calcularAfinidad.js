/**
 * Función independiente y transparente para calcular la afinidad filosófica
 * con los autores evaluados en el caso piloto de Órbita Ética.
 *
 * Métrica:
 * Para cada autor se evalúa la distancia normalizada entre la respuesta
 * del usuario (escala 1 a 5) y el perfil de referencia documentado del autor.
 * La similitud ponderada se normaliza a un porcentaje de 0% a 100%.
 *
 * Nota: Los porcentajes reflejan afinidad con las afirmaciones evaluadas en este caso,
 * no una medición absoluta de la totalidad del pensamiento de cada autor.
 */

export function calcularAfinidadFilosofica(respuestasUsuario, testConfig, autoresConfig) {
  if (!respuestasUsuario || !testConfig || !testConfig.perfilesReferencia) {
    return []
  }

  const afirmaciones = testConfig.afirmaciones || []
  const perfiles = testConfig.perfilesReferencia
  const autoresMap = (autoresConfig || []).reduce((acc, a) => {
    acc[a.id] = a
    return acc
  }, {})

  const resultados = Object.keys(perfiles).map((autorKey) => {
    const perfil = perfiles[autorKey]
    const autorData = autoresMap[autorKey] || {}

    let sumaPonderadaSimilitud = 0
    let sumaPesos = 0
    const coincidencias = []
    const diferencias = []

    afirmaciones.forEach((afirmacion, idx) => {
      const respUsuario = Number(respuestasUsuario[afirmacion.id]) || 3
      const respIdeal = perfil.respuestasIdeales[idx] ?? 3
      const peso = perfil.pesos ? (perfil.pesos[idx] ?? 1) : 1

      // Distancia absoluta en la escala de 1 a 5 (rango máximo = 4)
      const distancia = Math.abs(respUsuario - respIdeal)
      const similitudItem = 1 - distancia / 4

      sumaPonderadaSimilitud += similitudItem * peso
      sumaPesos += peso

      // Clasificación cualitativa de coincidencias y diferencias
      if (distancia <= 1) {
        coincidencias.push({
          id: afirmacion.id,
          numero: afirmacion.numero,
          texto: afirmacion.texto,
          eje: afirmacion.eje,
          tuRespuesta: respUsuario,
          posturaAutor: respIdeal,
        })
      } else if (distancia >= 2) {
        diferencias.push({
          id: afirmacion.id,
          numero: afirmacion.numero,
          texto: afirmacion.texto,
          eje: afirmacion.eje,
          tuRespuesta: respUsuario,
          posturaAutor: respIdeal,
        })
      }
    })

    const porcentajeCrudo = sumaPesos > 0 ? (sumaPonderadaSimilitud / sumaPesos) * 100 : 50
    const porcentaje = Math.min(100, Math.max(0, Math.round(porcentajeCrudo)))

    return {
      autorId: autorKey,
      nombre: perfil.nombre || autorData.nombre || autorKey,
      porcentaje,
      descripcionAfinidad: perfil.descripcionAfinidad || '',
      obraReferencia: autorData.obraReferencia || '',
      enfoque: autorData.enfoque || '',
      resumenArgumento: autorData.resumenArgumento || '',
      aplicacionCaso: autorData.aplicacionCaso || '',
      citasClave: autorData.citasClave || [],
      fuentesAccesoAbierto: autorData.fuentesAccesoAbierto || [],
      coincidencias,
      diferencias,
    }
  })

  // Ordenar de mayor a menor afinidad
  return resultados.sort((a, b) => b.porcentaje - a.porcentaje)
}
