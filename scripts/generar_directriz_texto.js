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

async function main() {
  console.log('🚀 Iniciando generador textual de alta fidelidad con Google AI Studio...')

  const apiKey = getApiKey()
  if (!apiKey) {
    console.error('❌ Falta GEMINI_API_KEY en .env.local')
    process.exit(1)
  }

  const ai = new GoogleGenAI({ apiKey })

  const prompt = `
Eres un Diseñador Curricular Senior y Catedrático de Filosofía y Ética de la Ciencia, especializado en Ética Espacial para la plataforma educativa universitaria "Órbita Ética".

Tu misión es redactar la base de datos completa de la directriz: "Uso de bienes materiales extraterrestres y derecho de propiedad".

FUENTES Y ANTECEDENTES DOCUMENTADOS DE LA INVESTIGACIÓN:

1. DOCUMENTO DE BASE: "Caso sobre uso de recursos en el espacio y derecho de propiedad":
- Empresas pioneras: Moon Express y Planetary Resources buscan expandir recursos económicos desde la Luna y asteroides.
- Vacío normativo: El Tratado del Espacio Ultraterrestre de 1967 (OST) prohíbe la reivindicación de soberanía nacional (art. 2), pero no regula expresamente la propiedad privada sobre recursos extraídos. El Acuerdo de la Luna de 1979 declaró a la Luna "Patrimonio Común de la Humanidad" (art. 11), pero no fue ratificado por las potencias espaciales.
- Problemas éticos: ¿Quién es dueño de los recursos extraídos? ¿Cómo se adquiere propiedad? ¿Cómo afecta a la investigación científica la escasez de muestras o la alteración de objetos celestes?
- Autores filosóficos:
  * Robert Nozick (Libertarismo): Defiende los derechos naturales de propiedad nacidos de la autopropiedad y la adquisición por trabajo sobre cosas que no pertenecen a nadie (Locke). "El impuesto a los productos del trabajo va a la par con el trabajo forzado" (1988, p. 170). Quien invierte y extrae recursos espaciales tiene derecho absoluto a ellos; quitárselos o gravarlos es robo. La minería no debería tener restricciones.
  * John Rawls (Liberalismo igualitarista / Justicia distributiva): Principios de justicia imparciales tras el "velo de la ignorancia". Principio maximin: las desigualdades socioeconómicas sólo son justas si benefician prioritariamente a los miembros menos aventajados de la sociedad (2006, p. 27). La apropiación irrestricta por corporaciones multimillonarias aumenta la desigualdad y perjudica a los más vulnerables.
  * Santo Tomás de Aquino (Ley natural y bien común): Todos los bienes del universo están subordinados al ser humano para su subsistencia y perfeccionamiento hacia la contemplación de la verdad (ST II-II, q. 66, a. 1; ST I-II, q. 5). La propiedad privada no es absoluta ni se reduce al reparto económico: la investigación científica y la búsqueda de la verdad tienen primacía ética sobre el lucro comercial y la minería.

2. LOS 5 CASOS REALES Y DILEMAS GENERALES:
- Caso 1: Servicios funerarios lunares y misión Peregrine 1 (2023-2024). Astrobotic, Celestis, Elysium Space cobran por depositar cenizas y ADN en la Luna. La Nación Navajo denuncia profanación cultural y espiritual de un cuerpo celeste sagrado. Tensión entre libertad comercial privada y respeto al patrimonio cultural/religioso indígena.
- Caso 2: Recolección y comercio de muestras lunares Apolo (1969-1972). NASA trajo 382 kg de rocas; donó 270 kg como diplomacia y retuvo el resto. Años después se subastan privadamente fragmentos. Tensión: ¿la extracción científica autoriza a convertir una "res extra commercium" en mercancía privada con fines de lucro ("res nova") o debe ser fideicomiso público perpetuo?
- Caso 3: Reivindicación de la Órbita Geoestacionaria y Declaración de Bogotá (1976). 8 países ecuatoriales reclamaron su órbita ante la saturación de frecuencias por potencias industriales. Tensión: "primer llegado, primer servido" vs. cuotas reservadas para el desarrollo del Sur Global.
- Caso 4: Minería de asteroides y Acuerdos de Artemisa (2015-2020). Extracción de agua en polo sur lunar y metales en asteroides. Marco bilateral liderado por EE. UU. (zonas de seguridad y apropiación) vs. régimen multilateral de la ONU (Patrimonio Común de la Humanidad).
- Caso 5: Saturación orbital y basura espacial (2009-2026). Colisiones (Cosmos-Iridium), explosiones de etapas de cohetes, síndrome de Kessler y megaconstelaciones. Tensión: tragedia de los comunes, límites estrictos a satélites vs. libertad comercial de conectividad.
- Dilema General A: Investigación científica desinteresada (Tomás de Aquino) vs. Explotación comercial de combustible y agua lunar.
- Dilema General B: Propiedad privada por trabajo e inversión (Nozick) vs. Justicia distributiva global y fondos compensatorios (Rawls).
- Dilema General D: Explotación intensiva para alivio ecológico y energético presente vs. Sostenibilidad no renovable para generaciones futuras.

REGLAS PEDAGÓGICAS ESTRICTAS PARA LAS PREGUNTAS Y ALTERNATIVAS:
1. TOTALMENTE PROHIBIDO usar "Sí", "No", "Depende" o palabras afines al inicio o como núcleo de las alternativas.
2. TOTALMENTE PROHIBIDO usar el formato "Idea : descripción". Cada alternativa debe ser una oración fluida, redactada con voz propia, defendible y con fuerte convicción ética.
3. EXACTAMENTE CINCO (5) ALTERNATIVAS (A, B, C, D, E) por pregunta. Cada una debe representar una postura moral y filosófica distinta, sustantiva y bien articulada.
4. PUNTO MEDIO DE REDACCIÓN: Clara y comprensible para estudiantes universitarios de carreras diversas (ingeniería, derecho, humanidades, ciencias), sin jerga hermética pero SIN perder la profundidad ética ni sonar neutral o tibia.
5. CUESTIONAMIENTO SOCRÁTICO OBLIGATORIO PARA CADA ALTERNATIVA:
   - Debe plantear un cuestionamiento punzante que obligue al estudiante a mirar el costo moral, el dilema no resuelto o la contradicción de su elección. No debe decir si está "bien" o "mal".
6. OCHO (8) PREGUNTAS:
   - Pregunta 1: Misión Peregrine 1 y memoriales lunares comerciales.
   - Pregunta 2: Muestras Apolo y privatización de materiales extraterrestres.
   - Pregunta 3: Órbita geoestacionaria y reparto equitativo de recursos finitos.
   - Pregunta 4: Minería lunar y Acuerdos de Artemisa vs. régimen internacional.
   - Pregunta 5: Basura espacial, saturación orbital y tragedia de los comunes.
   - Pregunta 6: Investigación científica (verdad) vs. planta comercial de combustible.
   - Pregunta 7: Ganancias de minería de asteroides: propiedad total vs. compensación distributiva.
   - Pregunta 8: Explotación de recursos lunares hoy vs. preservación intergeneracional.

REGLAS PARA LA ETAPA 3 (REFLEXIÓN ABIERTA):
- 3 preguntas abiertas de reflexión profunda.
- Cada una DEBE incluir una "contextualizacionPrevia" pedagógica de 3 a 4 líneas explicando con sencillez la premisa del autor (Nozick, Rawls, Tomás de Aquino), para que el estudiante comprenda el marco ético antes de reflexionar.

REGLAS PARA EL TEST (ETAPA 4):
- 8 afirmaciones en escala Likert (1 a 5) con calibración precisa y ponderaciones para los perfiles de Nozick, Rawls y Tomás de Aquino.

REGLAS PARA LOS AUTORES (ETAPA 5):
- Fichas biográficas y conceptuales rigurosas de Robert Nozick, John Rawls y Santo Tomás de Aquino, con sus citas textuales directas de las fuentes.

ESTRUCTURA EXACTA DEL JSON DE SALIDA:
Debes responder ÚNICAMENTE con el objeto JSON sin texto antes ni después:
{
  "caso": {
    "tituloDilema": "El uso de recursos espaciales y el derecho de propiedad",
    "subtitulo": "Minería lunar, memoriales privados y la soberanía sobre bienes extraterrestres",
    "descripcionGeneral": "La llegada de empresas privadas a la Luna y los asteroides plantea dilemas sin precedentes: ¿quién puede adueñarse de recursos que nunca antes pertenecieron a nadie? ¿Debe prevalecer la libertad de comercio, la justicia distributiva o el valor supremo del conocimiento científico?",
    "conflictoCentral": "La tensión entre la apropiación privada de recursos espaciales mediante inversión técnica y la exigencia de preservar el cosmos como patrimonio común ordenado al bien de toda la humanidad.",
    "casosDocumentados": [
      {
        "id": "caso_peregrine",
        "numero": 1,
        "titulo": "Servicios funerarios lunares y la misión Peregrine 1",
        "subtitulo": "La Luna como memorial comercial frente al patrimonio cultural sagrado",
        "fecha": "2023–2024",
        "resumen": "...",
        "hechosReales": "...",
        "proyectosPropuestas": "...",
        "actores": "...",
        "tensionEtica": "...",
        "fotoId": "foto_peregrine"
      },
      ... (5 casos documentados: caso_peregrine, caso_apolo_muestras, caso_orbita_bogota, caso_mineria_artemisa, caso_basura_orbital)
    ]
  },
  "preguntas": [
    {
      "id": "p1_servicios_funerarios",
      "numero": 1,
      "casoVinculadoId": "caso_peregrine",
      "tituloCaso": "Servicios funerarios lunares y la misión Peregrine 1",
      "descripcionDetallada": [
        "Párrafo 1...",
        "Párrafo 2..."
      ],
      "pregunta": "¿...",
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
    ... (8 preguntas)
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
        "corriente": "Ley natural, bien común y primacía de la verdad",
        "contextualizacionPrevia": "...",
        "citaReferencia": "Todos los bienes del universo están subordinados al ser humano para su perfección y contemplación de la verdad (ST II-II, q. 66; ST I-II, q. 5)",
        "pregunta": "..."
      }
    ]
  },
  "test": {
    "titulo": "Test de afinidad sobre el uso y propiedad del espacio",
    "descripcion": "Compara tus principios éticos con las corrientes de Robert Nozick, John Rawls y Santo Tomás de Aquino.",
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
        "corriente": "Bien común y primacía del conocimiento",
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
      "enfoque": "Ley natural, bien común y subordinación al conocimiento de la verdad",
      "resumenArgumento": "...",
      "aplicacionCaso": "...",
      "citasClave": [
        {
          "cita": "El ser humano tiene sobre las cosas exteriores un dominio natural por su razón y voluntad, pero su posesión debe ordenarse al bien común y a la perfección del hombre",
          "contexto": "Tratado de la Justicia, sobre el robo y el hurto",
          "referencia": "Suma Teológica (ST II-II, q. 66, a. 1)"
        },
        {
          "cita": "La última y perfecta felicidad del hombre no puede estar sino en la contemplación de la verdad",
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

  console.log('📡 Consultando modelo gemini-3.8-flash...')
  let responseText = null
  for (let i = 1; i <= 3; i++) {
    try {
      const res = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [{ text: prompt }],
        config: {
          responseMimeType: 'application/json',
          temperature: 0.3,
        },
      })
      responseText = res.text
      console.log('✅ Generación de texto exitosa en intento', i)
      break
    } catch (e) {
      console.warn(`⚠️ Intento ${i} falló:`, e.message)
      await new Promise((r) => setTimeout(r, 6000))
    }
  }

  if (!responseText) {
    console.log('📡 Intentando con modelo alternativo gemini-3.1-pro-preview...')
    const res = await ai.models.generateContent({
      model: 'gemini-3.1-pro-preview',
      contents: [{ text: prompt }],
      config: {
        responseMimeType: 'application/json',
        temperature: 0.3,
      },
    })
    responseText = res.text
  }

  console.log('📦 Parseando JSON generado...')
  const data = JSON.parse(responseText)

  const outDir = path.join(ROOT_DIR, 'src', 'data', 'directrizUsoEspacio')
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
  }

  fs.writeFileSync(path.join(outDir, 'casos.json'), JSON.stringify(data.caso, null, 2), 'utf-8')
  fs.writeFileSync(path.join(outDir, 'preguntas.json'), JSON.stringify(data.preguntas, null, 2), 'utf-8')
  fs.writeFileSync(path.join(outDir, 'reflexion.json'), JSON.stringify(data.reflexionTresPreguntas, null, 2), 'utf-8')
  fs.writeFileSync(path.join(outDir, 'test.json'), JSON.stringify(data.test, null, 2), 'utf-8')
  fs.writeFileSync(path.join(outDir, 'autores.json'), JSON.stringify(data.autores, null, 2), 'utf-8')
  fs.writeFileSync(path.join(outDir, 'fuentes.json'), JSON.stringify(data.fuentes, null, 2), 'utf-8')

  console.log('🎉 ¡Todos los archivos fueron creados exitosamente en src/data/directrizUsoEspacio/!')
}

main().catch((err) => {
  console.error('❌ Error fatal:', err)
  process.exit(1)
})
