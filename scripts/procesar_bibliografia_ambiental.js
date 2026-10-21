import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { GoogleGenAI } from '@google/genai'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.resolve(__dirname, '..')

// 1. Cargar GEMINI_API_KEY desde .env.local o entorno
function getApiKey() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY
  if (process.env.VITE_GEMINI_API_KEY) return process.env.VITE_GEMINI_API_KEY

  const envLocalPath = path.join(ROOT_DIR, '.env.local')
  if (fs.existsSync(envLocalPath)) {
    const content = fs.readFileSync(envLocalPath, 'utf-8')
    for (const line of content.split('\n')) {
      const trimmed = line.trim()
      if (trimmed.startsWith('GEMINI_API_KEY=')) {
        return trimmed.replace('GEMINI_API_KEY=', '').trim().replace(/^["']|["']$/g, '')
      }
      if (trimmed.startsWith('VITE_GEMINI_API_KEY=')) {
        return trimmed.replace('VITE_GEMINI_API_KEY=', '').trim().replace(/^["']|["']$/g, '')
      }
    }
  }
  return null
}

async function procesarBibliografia() {
  console.log('🚀 Iniciando procesador automático de bibliografía para Órbita Ética...')

  const apiKey = getApiKey()
  if (!apiKey) {
    console.error('❌ ERROR: No se encontró GEMINI_API_KEY en .env.local.')
    console.error('   Crea un archivo .env.local en la raíz con: GEMINI_API_KEY=tu_clave_aqui')
    process.exit(1)
  }

  const ai = new GoogleGenAI({ apiKey })

  const pdfBaseDir = path.join(ROOT_DIR, 'bibliografia_pdf')
  if (!fs.existsSync(pdfBaseDir)) {
    fs.mkdirSync(pdfBaseDir, { recursive: true })
  }

  function getAllPdfs(dir) {
    let results = []
    if (!fs.existsSync(dir)) return results
    const list = fs.readdirSync(dir)
    for (const file of list) {
      const fullPath = path.join(dir, file)
      const stat = fs.statSync(fullPath)
      if (stat && stat.isDirectory()) {
        results = results.concat(getAllPdfs(fullPath))
      } else if (file.toLowerCase().endsWith('.pdf')) {
        results.push(fullPath)
      }
    }
    return results
  }

  const pdfPaths = getAllPdfs(pdfBaseDir)
  console.log(`📂 Archivos PDF detectados en bibliografia_pdf/: ${pdfPaths.length}`)
  pdfPaths.forEach((p) => console.log(`   - ${path.relative(ROOT_DIR, p)}`))

  const contents = []

  // Subir o cargar cada PDF
  for (const fullPath of pdfPaths) {
    const filename = path.basename(fullPath)
    console.log(`📤 Cargando documento para análisis: ${filename}...`)
    try {
      const fileData = fs.readFileSync(fullPath)
      contents.push({
        inlineData: {
          data: fileData.toString('base64'),
          mimeType: 'application/pdf',
        },
      })
    } catch (err) {
      console.warn(`⚠️ No se pudo cargar ${filename}: ${err.message}`)
    }
  }

  const systemInstructions = `
Eres el Diseñador Pedagógico y Curador Académico de Órbita Ética.
Tu misión es generar la base de datos completa de la DIRECTRIZ AMBIENTAL: "Las huellas de la exploración espacial".
Pregunta ética central: "¿Hasta qué punto es justificable alterar o contaminar un entorno extraterrestre para desarrollar la exploración espacial?"

REGLAS PEDAGÓGICAS Y FILOSÓFICAS ESTRICTAS:
1. RIGOR DOCUMENTAL: Todo hecho, cita y perspectiva debe estar estrictamente respaldada por la bibliografía científica y por los tres autores de la directriz:
   - Patrick Lin (ética de la exploración espacial, deberes morales y riesgos tecnológicos).
   - Christopher Newman (gobernanza, regulación y responsabilidades espaciales).
   - Charles Cockell (ética ambiental extraterrestre, valor intrínseco vs instrumental).
2. CINCO (5) ALTERNATIVAS POR PREGUNTA (A, B, C, D, E):
   - PROHIBIDO usar respuestas simples o binarias como "Sí", "No", "Depende".
   - Cada una de las 5 alternativas debe expresar una postura ética sustantiva, articulada y defendible (ej: prioridad de viabilidad técnica/seguridad, principio de precaución ambiental estricto, valor patrimonial e histórico, gobernanza multilateral previa, remediación activa y compensación).
   - Para cada una de las 5 alternativas, redacta un CUESTIONAMIENTO ADAPTATIVO que problematice la elección, señalando sus costos, límites o posibles contradicciones, SIN catalogarla como "correcta" o "incorrecta".
3. PREGUNTAS DEL RECORRIDO (Mínimo 6 a 8 preguntas):
   - Secuencia de preguntas vinculadas a las 5 fotografías documentales reales:
     * Foto 1: Bolsa de residuos de Apolo 11 (Luna, 1969) — Residuos deliberados y masa de despegue.
     * Foto 2: Etapas de descenso Apolo 11-17 (Luna, 1969-1972) — Infraestructura histórica vs residuos.
     * Foto 3: Hakuto-R Mission 1 (Luna, 2023) — Restos por impacto accidental y gestión de fallas.
     * Foto 4: Paracaídas y cubierta de Perseverance (Marte, 2022) — Componentes de seguridad indispensables.
     * Foto 5: Fragmentos de aislamiento térmico de Perseverance (Marte, 2022) — Dispersión eólica y efectos acumulativos.
   - Preguntas transversales de cierre (incertidumbre, generaciones futuras, normas vinculantes).
4. REFLEXIÓN FINAL (3 preguntas abiertas):
   - Pregunta 1: Construcción de una postura ante el dilema.
   - Pregunta 2: Evaluación crítica y posibles contradicciones de su razonamiento.
   - Pregunta 3: Aplicación a una norma vinculante para futuras misiones.
5. TEST DE AFINIDAD FILOSÓFICA (8 afirmaciones Likert 1 a 5):
   - Evaluando principios éticos de Patrick Lin, Christopher Newman y Charles Cockell con citas textuales auténticas traducidas al español.
`

  const prompt = `
A partir de los documentos PDF adjuntos (y de la bibliografía académica de Patrick Lin, Christopher Newman y Charles Cockell sobre ética espacial ambiental), genera la estructura completa en formato JSON con la siguiente estructura de claves:

{
  "caso": {
    "id": "huellas-exploracion-espacial",
    "titulo": "Las huellas de la exploración espacial",
    "preguntaCentral": "¿Hasta qué punto es justificable alterar o contaminar un entorno extraterrestre para desarrollar la exploración espacial?",
    "resumen": "Resumen riguroso de aproximadamente 100 palabras...",
    "queEstaOcurriendo": "Párrafos con evidencia científica...",
    "porQueEsDilemaEtico": "Tensiones de valores y deberes...",
    "carruselFotos": [
      {
        "id": "foto_apolo11_residuos",
        "numero": 1,
        "titulo": "Bolsa de residuos de Apolo 11 — Luna, 1969",
        "descripcion": "Descripción neutral...",
        "eje": "Necesidad operativa, reducción de masa y residuos deliberados",
        "archivoImagen": "/images/ambiental/foto1_apolo11_residuos.jpg",
        "credito": "NASA / Neil Armstrong (AS11-40-5850)",
        "fuenteUrl": "https://eol.jsc.nasa.gov/SearchPhotos/photo.pl?frame=5850&mission=AS11&roll=40"
      },
      {
        "id": "foto_sitios_apolo",
        "numero": 2,
        "titulo": "Etapas de descenso de las seis misiones Apolo — Luna, 1969–1972",
        "descripcion": "Descripción neutral...",
        "eje": "Permanencia de infraestructura y patrimonio histórico",
        "archivoImagen": "/images/ambiental/foto2_sitios_apolo.jpg",
        "credito": "NASA / GSFC / Arizona State University (LROC)",
        "fuenteUrl": "https://lroc.im-ldi.com/"
      },
      {
        "id": "foto_hakuto_r",
        "numero": 3,
        "titulo": "Sitio de impacto de HAKUTO-R Mission 1 — Luna, 2023",
        "descripcion": "Descripción neutral...",
        "eje": "Responsabilidad por accidentes y restos imprevistos",
        "archivoImagen": "/images/ambiental/foto3_hakuto_r.jpg",
        "credito": "NASA / Goddard Space Flight Center / LROC",
        "fuenteUrl": "https://www.nasa.gov/centers-and-facilities/goddard/nasas-lro-views-impact-site-of-hakuto-r-mission-1-moon-lander/"
      },
      {
        "id": "foto_perseverance_paracaidas",
        "numero": 4,
        "titulo": "Paracaídas y cubierta protectora de Perseverance — Marte, 2022",
        "descripcion": "Descripción neutral...",
        "eje": "Materiales indispensables para la seguridad y viabilidad",
        "archivoImagen": "/images/ambiental/foto4_perseverance_paracaidas.jpg",
        "credito": "NASA / JPL-Caltech (Ingenuity)",
        "fuenteUrl": "https://science.nasa.gov/photojournal/debris-field-for-perseverance-landing-gear-seen-from-mars-helicopter/"
      },
      {
        "id": "foto_perseverance_aislamiento",
        "numero": 5,
        "titulo": "Fragmentos de aislamiento térmico dispersados — Marte, 2022",
        "descripcion": "Descripción neutral...",
        "eje": "Dispersión eólica, dificultad de recuperación y efectos acumulativos",
        "archivoImagen": "/images/ambiental/foto5_perseverance_aislamiento.jpg",
        "credito": "NASA / JPL-Caltech",
        "fuenteUrl": "https://science.nasa.gov/blog/images-of-edl-debris/"
      }
    ]
  },
  "preguntas": [
    {
      "id": "p1_residuos_operativos",
      "numero": 1,
      "fotoVinculadaId": "foto_apolo11_residuos",
      "dimension": "Residuos deliberados y necesidad operativa",
      "pregunta": "¿...",
      "alternativas": [
        {
          "id": "A",
          "letra": "A",
          "texto": "Postura sustantiva A...",
          "cuestionamiento": "Cuestionamiento adaptativo a A..."
        },
        {
          "id": "B",
          "letra": "B",
          "texto": "Postura sustantiva B...",
          "cuestionamiento": "Cuestionamiento adaptativo a B..."
        },
        {
          "id": "C",
          "letra": "C",
          "texto": "Postura sustantiva C...",
          "cuestionamiento": "Cuestionamiento adaptativo a C..."
        },
        {
          "id": "D",
          "letra": "D",
          "texto": "Postura sustantiva D...",
          "cuestionamiento": "Cuestionamiento adaptativo a D..."
        },
        {
          "id": "E",
          "letra": "E",
          "texto": "Postura sustantiva E...",
          "cuestionamiento": "Cuestionamiento adaptativo a E..."
        }
      ]
    }
  ],
  "reflexionTresPreguntas": [
    {
      "id": "ref_1_postura",
      "numero": 1,
      "titulo": "Construcción de una postura",
      "enunciado": "Después de analizar los casos, ¿bajo qué condiciones consideras justificable dejar materiales humanos en la Luna o Marte? ¿Qué criterios son más importantes para fundamentar tu decisión?"
    },
    {
      "id": "ref_2_critica",
      "numero": 2,
      "titulo": "Evaluación crítica del razonamiento",
      "enunciado": "¿Hubo alguna situación que te hiciera cuestionar tu postura inicial? ¿Qué dificultades o posibles contradicciones reconoces en los criterios que utilizaste?"
    },
    {
      "id": "ref_3_norma",
      "numero": 3,
      "titulo": "Aplicación a futuras decisiones y gobernanza",
      "enunciado": "Si tuvieras que establecer una norma para futuras misiones espaciales, ¿qué responsabilidades exigirías respecto de los materiales que dejan en otros cuerpos celestes? ¿Cómo justificarías esa norma?"
    }
  ],
  "autores": [
    {
      "id": "lin",
      "nombre": "Patrick Lin",
      "obraReferencia": "Space Ethics (Oxford University Press / Routledge)",
      "enfoque": "Ética del riesgo y responsabilidades morales espaciales",
      "resumenArgumento": "...",
      "aplicacionCaso": "...",
      "citasClave": [
        {
          "cita": "...",
          "contexto": "...",
          "referencia": "..."
        }
      ],
      "fuentesAccesoAbierto": [
        {
          "titulo": "Space Ethics (Patrick Lin, Stanford / California Polytechnic)",
          "url": "https://ethics.calpoly.edu/space.html",
          "tipo": "Ensayo académico de acceso libre",
          "idioma": "Inglés"
        }
      ]
    },
    {
      "id": "newman",
      "nombre": "Christopher Newman",
      "obraReferencia": "Space Law and Governance (Northumbria University)",
      "enfoque": "Gobernanza, regulación y responsabilidad jurídica ambiental",
      "resumenArgumento": "...",
      "aplicacionCaso": "...",
      "citasClave": [],
      "fuentesAccesoAbierto": []
    },
    {
      "id": "cockell",
      "nombre": "Charles Cockell",
      "obraReferencia": "Space on Earth: Saving Our World by Seeking Others / Extraterrestrial Environmental Ethics",
      "enfoque": "Ética ambiental extraterrestre y valor intrínseco",
      "resumenArgumento": "...",
      "aplicacionCaso": "...",
      "citasClave": [],
      "fuentesAccesoAbierto": []
    }
  ],
  "test": {
    "titulo": "Test de afinidad con la ética ambiental espacial",
    "descripcion": "Indica tu grado de acuerdo con 8 afirmaciones para comparar tus criterios con Patrick Lin, Christopher Newman y Charles Cockell.",
    "afirmaciones": [
      {
        "id": 1,
        "numero": 1,
        "texto": "Afirmación 1...",
        "eje": "Eje...",
        "autorRelevante": "Charles Cockell"
      }
    ],
    "perfilesReferencia": {
      "lin": {
        "autorId": "lin",
        "nombre": "Patrick Lin",
        "respuestasIdeales": [4, 5, 3, 4, 4, 3, 5, 4],
        "pesos": [1.2, 1.5, 1.0, 1.2, 1.0, 1.0, 1.3, 1.0],
        "descripcionAfinidad": "Tu enfoque sintoniza con Patrick Lin..."
      },
      "newman": {
        "autorId": "newman",
        "nombre": "Christopher Newman",
        "respuestasIdeales": [3, 4, 5, 5, 4, 3, 4, 5],
        "pesos": [1.0, 1.0, 1.5, 1.5, 1.0, 1.0, 1.2, 1.3],
        "descripcionAfinidad": "Tu enfoque sintoniza con Christopher Newman..."
      },
      "cockell": {
        "autorId": "cockell",
        "nombre": "Charles Cockell",
        "respuestasIdeales": [5, 5, 3, 3, 5, 2, 5, 5],
        "pesos": [1.5, 1.5, 0.8, 0.8, 1.4, 1.3, 1.5, 1.5],
        "descripcionAfinidad": "Tu enfoque sintoniza con Charles Cockell..."
      }
    }
  }
}
`

  console.log('🤖 Consultando a Gemini 3.8 Flash con las directrices y PDFs...')
  contents.push({ text: `${systemInstructions}\n\n${prompt}` })

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        responseMimeType: 'application/json',
      },
    })

    const rawText = response.text
    console.log('✅ Respuesta recibida de Gemini. Parseando JSON...')
    const data = JSON.parse(rawText)

    // Guardar archivos JSON separados en src/data/directrizAmbiental/
    const outDir = path.join(ROOT_DIR, 'src', 'data', 'directrizAmbiental')
    fs.writeFileSync(path.join(outDir, 'casos.json'), JSON.stringify(data.caso, null, 2), 'utf-8')
    fs.writeFileSync(path.join(outDir, 'preguntas.json'), JSON.stringify(data.preguntas, null, 2), 'utf-8')
    fs.writeFileSync(path.join(outDir, 'reflexion.json'), JSON.stringify(data.reflexionTresPreguntas, null, 2), 'utf-8')
    fs.writeFileSync(path.join(outDir, 'autores.json'), JSON.stringify(data.autores, null, 2), 'utf-8')
    fs.writeFileSync(path.join(outDir, 'test.json'), JSON.stringify(data.test, null, 2), 'utf-8')

    console.log('🎉 ¡Archivos generados con éxito en src/data/directrizAmbiental/:')
    console.log('   - casos.json')
    console.log('   - preguntas.json (con 5 alternativas sustantivas y cuestionamientos)')
    console.log('   - reflexion.json (con las 3 preguntas abiertas de la propuesta)')
    console.log('   - autores.json (Patrick Lin, Christopher Newman, Charles Cockell)')
    console.log('   - test.json (afirmaciones Likert 1-5 y ponderaciones)')
  } catch (err) {
    console.error('❌ Error al procesar con Gemini:', err.message)
    if (err.stack) console.error(err.stack)
  }
}

procesarBibliografia()
