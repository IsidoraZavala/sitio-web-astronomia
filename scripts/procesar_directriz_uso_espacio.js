import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { GoogleGenAI } from '@google/genai'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.resolve(__dirname, '..')

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

async function procesarDirectrizUsoEspacio() {
  console.log('🚀 Iniciando análisis de fuentes con Google AI Studio para Directriz del Uso del Espacio...')

  const apiKey = getApiKey()
  if (!apiKey) {
    console.error('❌ ERROR: No se encontró GEMINI_API_KEY en .env.local.')
    process.exit(1)
  }

  const ai = new GoogleGenAI({ apiKey })

  const pdfDir = path.join(ROOT_DIR, 'bibliografia_pdf', 'directriz_uso_espacio')
  if (!fs.existsSync(pdfDir)) {
    console.error(`❌ Directorio no encontrado: ${pdfDir}`)
    process.exit(1)
  }

  // Lista prioritaria de PDFs esenciales (tamaño ligero)
  const prioridades = [
    'Caso y filósofos (uso del espacio).pdf',
    'El rol de la propiedad privada en el espacio (artículo).pdf',
    'Outer Space Treaties (ONU).pdf',
    '¿Quién es dueño del espacio exterior_ - BBC News Mundo.pdf'
  ]

  const contents = []
  for (const filename of prioridades) {
    const fullPath = path.join(pdfDir, filename)
    if (fs.existsSync(fullPath)) {
      console.log(`📤 Cargando fuente para análisis: ${filename}...`)
      try {
        const fileData = fs.readFileSync(fullPath)
        contents.push({
          inlineData: {
            data: fileData.toString('base64'),
            mimeType: 'application/pdf',
          },
        })
      } catch (err) {
        console.warn(`⚠️ Error leyendo ${filename}: ${err.message}`)
      }
    }
  }

  const promptInstrucciones = `
Eres un Diseñador Curricular y Especialista en Filosofía y Ética Espacial para la plataforma interactiva "Órbita Ética".
Tu tarea es generar la base de datos COMPLETA y de MÁXIMA CALIDAD para la DIRECTRIZ: "Uso de bienes materiales extraterrestres y derecho de propiedad".

Pregunta ética central de la directriz:
"¿Qué principios éticos deberían regular el uso de bienes materiales extraterrestres y a qué objetivos deben subordinarse tales bienes?"

AUTORES FILOSÓFICOS DE REFERENCIA:
1. Robert Nozick: Libertarismo, derechos de propiedad naturales basados en la apropiación por trabajo (John Locke), no interferencia estatal, el impuesto como trabajo forzado (Nozick, 1988, p. 170). Quien invierte capital y trabajo en la Luna o asteroides adquiere propiedad irrestricta.
2. John Rawls: Liberalismo igualitarista, justicia distributiva, posición original tras el velo de la ignorancia, principio maximin (Rawls, 2006, p. 27). Las desigualdades solo son admisibles si compensan de manera prioritaria a los miembros menos aventajados de la sociedad.
3. Santo Tomás de Aquino: Doctrina de la ley natural y bien común (ST II-II, q. 66, a. 1; ST I-II, q. 5). La propiedad no es absoluta; los bienes del cosmos están destinados al perfeccionamiento humano y a la contemplación de la verdad. La investigación científica tiene primacía moral sobre el lucro comercial.

REGLAS PEDAGÓGICAS ESTRICTAS PARA PREGUNTAS Y ALTERNATIVAS:
1. TOTALMENTE PROHIBIDO usar "Sí", "No", "Depende" o frases binarias.
2. TOTALMENTE PROHIBIDO usar el formato "Idea : descripción". Cada alternativa debe ser una redacción fluida, contundente y natural.
3. EXACTAMENTE CINCO (5) ALTERNATIVAS (A, B, C, D, E) para cada una de las 8 preguntas.
4. PUNTO MEDIO DE REDACCIÓN: Lenguaje claro y accesible para estudiantes universitarios de diversas carreras (no solo filosofía), pero conservando una fuerte tensión ética y dilemática, sin sonar neutral, infantil ni burocrático.
5. CUESTIONAMIENTO SOCRÁTICO OBLIGATORIO PARA CADA ALTERNATIVA:
   - Debe formular una pregunta reflexiva punzante que exponga el costo moral, la contradicción inherente o el sacrificio ético de haber elegido esa opción, SIN calificarla de correcta o incorrecta.
6. ESTRUCTURA DE LAS 8 PREGUNTAS:
   - P1: Misión Peregrine 1 y memoriales lunares comerciales vs. respeto al carácter sagrado/cultural para pueblos indígenas (Nación Navajo) y patrimonio común.
   - P2: Muestras Apolo y la transformación de recursos extraterrestres (res extra commercium) en propiedad privada enajenable vs. custodia científica pública universal.
   - P3: Reivindicación de la Órbita Geoestacionaria (Declaración de Bogotá 1976) vs. el principio de "primer llegado, primer servido" de las potencias industriales.
   - P4: Minería comercial de asteroides / Acuerdos de Artemisa vs. el régimen del Patrimonio Común de la Humanidad (ONU / Tratado de la Luna).
   - P5: Saturación orbital y basura espacial (colisiones, fragmentaciones de satélites) vs. expansión comercial desregulada (Tragedia de los comunes).
   - P6 (Dilema General A): Investigación científica y contemplación de la verdad vs. explotación comercial de combustible en cráteres lunares con hielo escaso.
   - P7 (Dilema General B): Apropiación legítima por trabajo y capital (Nozick) vs. redistribución compensatoria para el Sur Global (Rawls).
   - P8 (Dilema General D): Alivio urgente de crisis en la Tierra presente vs. sostenibilidad y preservación de recursos no renovables para generaciones futuras.

REGLAS PARA LA ETAPA 3 (REFLEXIÓN ABIERTA):
- Diseña 3 preguntas de reflexión filosófica abierta correspondientes a los 3 autores (Nozick, Rawls, Santo Tomás).
- Cada una DEBE incluir una "contextualizacionPrevia" clara, pedagógica y breve que explique la premisa del autor, ya que los estudiantes aún no los conocen.

REGLAS PARA EL TEST (ETAPA 4):
- 8 afirmaciones en escala Likert (1 a 5) con calibración balanceada para Nozick, Rawls y Santo Tomás.

REGLAS PARA LOS AUTORES (ETAPA 5):
- Fichas completas de Robert Nozick, John Rawls y Santo Tomás de Aquino, incluyendo sus citas textuales rigurosas (Nozick 1988 p. 170, Rawls 2006 p. 27, Tomás de Aquino ST II-II q. 66 y ST I-II q. 5) y fuentes de acceso abierto.

FORMATO DE SALIDA ESTRICTO:
Debes responder ÚNICAMENTE con un objeto JSON válido con la siguiente estructura:
{
  "caso": {
    "tituloDilema": "...",
    "subtitulo": "...",
    "descripcionGeneral": "...",
    "conflictoCentral": "...",
    "casosDocumentados": [
      {
        "id": "caso_peregrine",
        "numero": 1,
        "titulo": "Servicios funerarios lunares y la misión Peregrine 1",
        "subtitulo": "La Luna como memorial privado frente al patrimonio cultural sagrado",
        "fecha": "2023–2024",
        "resumen": "...",
        "hechosReales": "...",
        "proyectosPropuestas": "...",
        "actores": "...",
        "tensionEtica": "...",
        "fotoId": "foto_peregrine"
      },
      ... (5 casos documentados: peregrine, apolo_muestras, orbita_bogota, mineria_artemisa, basura_orbital)
    ]
  },
  "preguntas": [
    {
      "id": "p1_servicios_funerarios",
      "numero": 1,
      "casoVinculadoId": "caso_peregrine",
      "tituloCaso": "Servicios funerarios lunares y la misión Peregrine 1",
      "descripcionDetallada": [
        "Párrafo 1 con los hechos reales...",
        "Párrafo 2 con el dilema ético..."
      ],
      "pregunta": "...",
      "alternativas": [
        {
          "id": "A",
          "letra": "A",
          "texto": "...",
          "cuestionamiento": "..."
        },
        ... (B, C, D, E)
      ]
    },
    ... (8 preguntas en total)
  ],
  "reflexionTresPreguntas": {
    "titulo": "Preguntas de reflexión filosófica",
    "descripcion": "Examina las premisas fundamentales que guían tus decisiones sobre la propiedad y el destino de los recursos espaciales.",
    "preguntas": [
      {
        "id": "ref_1_propiedad_nozick",
        "numero": 1,
        "autorId": "nozick",
        "autorNombre": "Robert Nozick",
        "corriente": "Libertarismo y derechos de propiedad",
        "contextualizacionPrevia": "...",
        "citaReferencia": "El impuesto a los productos del trabajo va a la par con el trabajo forzado (Nozick, 1988, p. 170)",
        "pregunta": "..."
      },
      {
        "id": "ref_2_justicia_rawls",
        "numero": 2,
        "autorId": "rawls",
        "autorNombre": "John Rawls",
        "corriente": "Liberalismo igualitarista y justicia distributiva",
        "contextualizacionPrevia": "...",
        "citaReferencia": "Las desigualdades sociales y económicas sólo son justas si producen beneficios compensadores para todos y, en particular, para los miembros menos aventajados (Rawls, 2006, p. 27)",
        "pregunta": "..."
      },
      {
        "id": "ref_3_saber_tomas",
        "numero": 3,
        "autorId": "tomas",
        "autorNombre": "Santo Tomás de Aquino",
        "corriente": "Ley natural, bien común y contemplación de la verdad",
        "contextualizacionPrevia": "...",
        "citaReferencia": "Todos los bienes del universo están subordinados al ser humano para su perfección y contemplación de la verdad (ST II-II, q. 66; ST I-II, q. 5)",
        "pregunta": "..."
      }
    ]
  },
  "test": {
    "titulo": "Test de afinidad sobre el uso y propiedad del espacio",
    "descripcion": "Compara tus principios con las corrientes de Robert Nozick, John Rawls y Santo Tomás de Aquino.",
    "afirmaciones": [
      {
        "id": 1,
        "numero": 1,
        "texto": "...",
        "eje": "...",
        "autorRelevante": "Robert Nozick"
      },
      ... (8 afirmaciones)
    ],
    "perfilesReferencia": {
      "nozick": {
        "autorId": "nozick",
        "nombre": "Robert Nozick",
        "corriente": "Libertarismo y propiedad irrestricta",
        "respuestasIdeales": [5, 1, 2, 5, 1, 1, 5, 2],
        "pesos": [1.4, 1.2, 1.0, 1.5, 1.2, 1.3, 1.5, 1.1],
        "descripcionAfinidad": "..."
      },
      "rawls": {
        "autorId": "rawls",
        "nombre": "John Rawls",
        "corriente": "Justicia distributiva y equidad global",
        "respuestasIdeales": [1, 5, 3, 2, 5, 4, 2, 4],
        "pesos": [1.2, 1.5, 1.0, 1.2, 1.5, 1.3, 1.2, 1.3],
        "descripcionAfinidad": "..."
      },
      "tomas": {
        "autorId": "tomas",
        "nombre": "Santo Tomás de Aquino",
        "corriente": "Bien común y valor supremo del saber",
        "respuestasIdeales": [2, 4, 5, 1, 4, 5, 1, 5],
        "pesos": [1.1, 1.2, 1.5, 1.3, 1.2, 1.5, 1.4, 1.5],
        "descripcionAfinidad": "..."
      }
    }
  },
  "autores": [
    {
      "id": "nozick",
      "nombre": "Robert Nozick",
      "epoca": "Filosofía política contemporánea (1938–2002)",
      "obraReferencia": "Anarquía, Estado y Utopía (1974 / 1988)",
      "enfoque": "Libertarismo y derechos absolutos de propiedad",
      "resumenArgumento": "...",
      "aplicacionCaso": "...",
      "citasClave": [
        {
          "cita": "[e]l impuesto a los productos del trabajo va a la par con el trabajo forzado",
          "contexto": "Capítulo VII: La justicia distributiva",
          "referencia": "Nozick (1988, p. 170)"
        }
      ],
      "fuentesAccesoAbierto": [
        {
          "titulo": "Stanford Encyclopedia of Philosophy: Robert Nozick",
          "url": "https://plato.stanford.edu/entries/nozick-political/",
          "tipo": "Enciclopedia académica de acceso abierto",
          "idioma": "Inglés"
        }
      ]
    },
    {
      "id": "rawls",
      "nombre": "John Rawls",
      "epoca": "Filosofía moral y política contemporánea (1921–2002)",
      "obraReferencia": "Teoría de la Justicia (1971 / 2006)",
      "enfoque": "Liberalismo igualitarista, velo de la ignorancia y principio maximin",
      "resumenArgumento": "...",
      "aplicacionCaso": "...",
      "citasClave": [
        {
          "cita": "las desigualdades sociales y económicas... sólo son justas si producen beneficios compensadores para todos y, en particular, para los miembros menos aventajados de la sociedad",
          "contexto": "Primera Parte: La justicia como imparcialidad",
          "referencia": "Rawls (2006, p. 27)"
        }
      ],
      "fuentesAccesoAbierto": [
        {
          "titulo": "Stanford Encyclopedia of Philosophy: John Rawls",
          "url": "https://plato.stanford.edu/entries/rawls/",
          "tipo": "Enciclopedia académica de acceso abierto",
          "idioma": "Inglés"
        }
      ]
    },
    {
      "id": "tomas",
      "nombre": "Santo Tomás de Aquino",
      "epoca": "Filosofía y teología escolástica (1225–1274)",
      "obraReferencia": "Suma Teológica (Summa Theologiae)",
      "enfoque": "Ley natural, destino universal de los bienes y contemplación de la verdad",
      "resumenArgumento": "...",
      "aplicacionCaso": "...",
      "citasClave": [
        {
          "cita": "El ser humano tiene sobre las cosas exteriores un dominio natural por su razón y voluntad, pero su posesión debe ordenarse al bien común y a la perfección del hombre",
          "contexto": "Tratado de la Justicia, sobre el robo y el hurto",
          "referencia": "Suma Teológica (ST II-II, q. 66, a. 1)"
        },
        {
          "cita": "La última y perfecta felicidad del hombre no puede estar sino en la contemplación de la verdad divina",
          "contexto": "Tratado de la Felicidad humana",
          "referencia": "Suma Teológica (ST I-II, q. 5)"
        }
      ],
      "fuentesAccesoAbierto": [
        {
          "titulo": "Stanford Encyclopedia of Philosophy: Saint Thomas Aquinas",
          "url": "https://plato.stanford.edu/entries/aquinas/",
          "tipo": "Enciclopedia académica de acceso abierto",
          "idioma": "Inglés"
        }
      ]
    }
  ],
  "fuentes": [
    {
      "id": "fuente_bbc_espacio",
      "titulo": "¿Quién es dueño del espacio exterior?",
      "autores": "BBC News Mundo",
      "ano": "2016",
      "tipo": "Reportaje periodístico e investigación internacional",
      "resumen": "Análisis sobre el vacío legal de la minería lunar y de asteroides frente al Tratado del Espacio de 1967.",
      "url": "https://www.bbc.com/mundo/noticias/2016/02/160204_quien_propietario_espacio_sideral_finde_dv"
    },
    {
      "id": "fuente_propiedad_espacial",
      "titulo": "El papel del derecho de propiedad privada en el ámbito espacial. Tres estudios de caso",
      "autores": "Jairo Becerra & Julián Rodríguez",
      "ano": "2016",
      "tipo": "Artículo de investigación jurídica",
      "resumen": "Estudio sobre derechos reales, res extra commercium y transformación de recursos espaciales en bienes muebles en la Luna y Marte.",
      "url": "https://revistacientificaesmic.com/"
    },
    {
      "id": "fuente_outer_space_treaty",
      "titulo": "Tratado sobre los principios que deben regir las actividades de los Estados en la exploración y utilización del espacio ultraterrestre (OST)",
      "autores": "Naciones Unidas (Asamblea General)",
      "ano": "1967",
      "tipo": "Tratado internacional vinculante",
      "resumen": "Establece la no apropiación nacional soberana y el uso del espacio para el beneficio de toda la humanidad.",
      "url": "https://www.unoosa.org/"
    },
    {
      "id": "fuente_moon_agreement",
      "titulo": "Acuerdo que debe regir las actividades de los Estados en la Luna y otros cuerpos celestes (Tratado de la Luna)",
      "autores": "Naciones Unidas (Asamblea General)",
      "ano": "1979",
      "tipo": "Tratado internacional",
      "resumen": "Declara a la Luna y sus recursos naturales como Patrimonio Común de la Humanidad y propone un régimen internacional de distribución equitativa.",
      "url": "https://www.unoosa.org/"
    }
  ]
}
`

  console.log('🤖 Llamando a Gemini con las fuentes completas y reglas pedagógicas estrictas...')
  contents.push({ text: promptInstrucciones })

  const modelosAProbar = ['gemini-3.8-flash', 'gemini-3.1-pro-preview']
  let dataFinal = null

  for (const modelo of modelosAProbar) {
    for (let intento = 1; intento <= 3; intento++) {
      try {
        console.log(`📡 Intentando generación con modelo: ${modelo} (intento ${intento}/3)...`)
        const response = await ai.models.generateContent({
          model: modelo,
          contents,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.3,
          },
        })

        const raw = response.text
        dataFinal = JSON.parse(raw)
        console.log(`✅ ¡Generación exitosa con ${modelo}!`)
        break
      } catch (err) {
        console.warn(`⚠️ Intento ${intento} con ${modelo} falló: ${err.message}`)
        if (intento < 3) {
          console.log('⏳ Esperando 5 segundos antes de reintentar...')
          await new Promise((r) => setTimeout(r, 5000))
        }
      }
    }
    if (dataFinal) break
  }

  if (!dataFinal) {
    throw new Error('No se pudo generar la base de datos con ningún modelo.')
  }

  // Guardar en src/data/directrizUsoEspacio/
  const outDir = path.join(ROOT_DIR, 'src', 'data', 'directrizUsoEspacio')
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
  }

  fs.writeFileSync(path.join(outDir, 'casos.json'), JSON.stringify(dataFinal.caso, null, 2), 'utf-8')
  fs.writeFileSync(path.join(outDir, 'preguntas.json'), JSON.stringify(dataFinal.preguntas, null, 2), 'utf-8')
  fs.writeFileSync(path.join(outDir, 'reflexion.json'), JSON.stringify(dataFinal.reflexionTresPreguntas, null, 2), 'utf-8')
  fs.writeFileSync(path.join(outDir, 'test.json'), JSON.stringify(dataFinal.test, null, 2), 'utf-8')
  fs.writeFileSync(path.join(outDir, 'autores.json'), JSON.stringify(dataFinal.autores, null, 2), 'utf-8')
  fs.writeFileSync(path.join(outDir, 'fuentes.json'), JSON.stringify(dataFinal.fuentes, null, 2), 'utf-8')

  console.log('🎉 ¡Todos los archivos JSON fueron generados exitosamente en src/data/directrizUsoEspacio/!')
}

procesarDirectrizUsoEspacio().catch((err) => {
  console.error('❌ Error fatal:', err)
  process.exit(1)
})
