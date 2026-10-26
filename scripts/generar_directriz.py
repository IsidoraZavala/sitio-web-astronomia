import os
import json
import requests

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
env_path = os.path.join(ROOT_DIR, '.env.local')

api_key = None
if os.path.exists(env_path):
    with open(env_path, 'r', encoding='utf-8') as f:
        for line in f:
            if line.startswith('GEMINI_API_KEY='):
                api_key = line.split('=', 1)[1].strip().strip('"').strip("'")
                break

if not api_key:
    raise ValueError("GEMINI_API_KEY no encontrada en .env.local")

url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key={api_key}"

prompt = """
Eres un Diseñador Curricular Senior y Catedrático de Filosofía y Ética de la Ciencia, especializado en Ética Espacial para la plataforma educativa universitaria "Órbita Ética".

Tu misión es redactar la base de datos completa de la directriz: "Uso de bienes materiales extraterrestres y derecho de propiedad".

FUENTES Y ANTECEDENTES DOCUMENTADOS DE LA INVESTIGACIÓN:

1. DOCUMENTO DE BASE: "Caso sobre uso de recursos en el espacio y derecho de propiedad":
- Empresas pioneras: Moon Express y Planetary Resources buscan expandir recursos económicos desde la Luna y asteroides.
- Vacío normativo: El Tratado del Espacio Ultraterrestre de 1967 (OST) prohíbe la reivindicación de soberanía nacional (art. 2), pero no regula expresamente la propiedad privada sobre recursos extraídos. El Acuerdo de la Luna de 1979 declaró a la Luna "Patrimonio Común de la Humanidad" (art. 11), pero no fue ratificado por las potencias espaciales.
- Problemas éticos: ¿Quién es dueño de los recursos extraídos? ¿Cómo se adquiere propiedad? ¿Cómo afecta a la investigación científica la escasez de muestras o la alteración de objetos celestes?
- Autores filosóficos:
  * Robert Nozick (Libertarismo): Defiende los derechos naturales de propiedad nacidos de la autopropiedad y la adquisición por trabajo sobre cosas que no pertenecen a nadie (Locke). "El impuesto a los productos del trabajo va a la par con el trabajo forzado" (1988, p. 170). Quien invierte capital y trabajo en la Luna o asteroides adquiere propiedad irrestricta.
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
2. TOTALMENTE PROHIBIDO usar el formato "Idea : descripción". Cada alternativa debe ser una oración fluida, redactada con voz propia, defendible y con fuerte convicción ética (ejemplo de la directriz ambiental: "La vida de los astronautas es el único valor supremo: si para...", "Ninguna misión tiene derecho a transformar un mundo virgen en su basurero...").
3. EXACTAMENTE CINCO (5) ALTERNATIVAS (A, B, C, D, E) por pregunta. Cada una debe representar una postura moral y filosófica distinta, sustantiva y bien articulada.
4. PUNTO MEDIO DE REDACCIÓN: Clara y comprensible para estudiantes universitarios de diversas carreras (no solo filosofía), pero conservando una fuerte tensión ética y dilemática, sin sonar neutral, infantil ni burocrático.
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
Debes responder ÚNICAMENTE con el objeto JSON sin formato markdown extra:
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
        "resumen": "En 2024, la misión privada Peregrine 1 transportó cenizas humanas para depositarlas en la Luna, desatando una enérgica protesta del Pueblo Navajo, que considera a la Luna un santuario sagrado. Aunque la nave falló antes de alunizar, el caso abrió un debate urgente sobre la privatización y desacralización del satélite.",
        "hechosReales": "Astrobotic Technology lanzó el módulo Peregrine 1 con cargas de Celestis y Elysium Space que contenían ADN y restos cremados. La Nación Navajo exigió la suspensión del lanzamiento y consultas formales al gobierno de EE. UU. Una fuga de combustible destruyó la nave al reingresar a la Tierra, pero empresas privadas mantienen contratos para futuros entierros lunares.",
        "proyectosPropuestas": "Empresas funerarias espaciales promueven la Luna como memorial eterno a partir de 13.000 dólares, mientras defensores de los derechos indígenas y la UNESCO discuten declarar a la Luna patrimonio cultural inmaterial protegido.",
        "actores": "Empresas comerciales (Astrobotic, Celestis), agencias estatales (NASA), Pueblo Navajo y comunidades indígenas globales.",
        "tensionEtica": "El choque entre la libre disposición de bienes e iniciativas comerciales privadas y el respeto irrestricto al patrimonio espiritual y cultural colectivo.",
        "fotoId": "foto_peregrine"
      },
      {
        "id": "caso_apolo_muestras",
        "numero": 2,
        "titulo": "Recolección y comercialización de muestras lunares Apolo",
        "subtitulo": "La transformación de recursos naturales en mercancías privadas",
        "fecha": "1969–presente",
        "resumen": "Las misiones Apolo recolectaron 382 kg de rocas lunares que fueron entregadas como obsequios diplomáticos o mantenidas para la ciencia. Sin embargo, con los años han surgido subastas internacionales privadas donde pequeños fragmentos alcanzan millones de dólares.",
        "hechosReales": "El Tratado de la Luna prohíbe que los recursos in situ sean objeto de propiedad. No obstante, una vez que el material es extraído, envasado y traído a la Tierra, la doctrina jurídica debate si se convierte en una 'res nova' (cosa nueva) sujeta al comercio privado y subastas coleccionistas.",
        "proyectosPropuestas": "Creación de un registro internacional de custodia perpetua bajo fideicomiso científico de las Naciones Unidas frente a iniciativas de legalización del mercado privado de minerales espaciales.",
        "actores": "Gobierno de EE. UU., comunidad científica internacional, casas de subastas y coleccionistas privados.",
        "tensionEtica": "La frontera entre el derecho de un explorador a enajenar lo que obtuvo con su esfuerzo y el deber de preservar muestras cósmicas irreemplazables como patrimonio público de la ciencia.",
        "fotoId": "foto_apolo_muestras"
      },
      {
        "id": "caso_orbita_bogota",
        "numero": 3,
        "titulo": "La Declaración de Bogotá y la Órbita Geoestacionaria",
        "subtitulo": "La lucha contra el monopolio orbital de las potencias industriales",
        "fecha": "1976",
        "resumen": "Ocho países ecuatoriales reclamaron soberanía sobre los segmentos de la órbita geoestacionaria situados sobre sus territorios, denunciando que las naciones ricas estaban copando las mejores posiciones y frecuencias antes de que el Sur Global pudiera desarrollar su tecnología.",
        "hechosReales": "La Declaración de Bogotá de 1976 argumentó que la órbita sincrónica es un recurso natural limitado y escaso. Aunque el reclamo de soberanía fue rechazado bajo el Tratado de 1967, obligó a la Unión Internacional de Telecomunicaciones (UIT) a reconocer la escasez de las órbitas y diseñar mecanismos de acceso equitativo.",
        "proyectosPropuestas": "Sistemas de reserva obligatoria de cuotas orbitales para países en desarrollo frente a modelos de subastas al mejor postor propuestos por consorcios satelitales comerciales.",
        "actores": "Países ecuatoriales (Colombia, Ecuador, etc.), potencias espaciales tradicionales, UIT y operadores de telecomunicaciones.",
        "tensionEtica": "La supuesta 'libertad de uso' que en la práctica favorece a los países con capacidad tecnológica inmediata, frente a la justicia distributiva que exige reservar recursos para quienes aún no pueden acceder a ellos.",
        "fotoId": "foto_orbita_bogota"
      },
      {
        "id": "caso_mineria_artemisa",
        "numero": 4,
        "titulo": "Minería lunar y los Acuerdos de Artemisa",
        "subtitulo": "Zonas de seguridad y explotación privada de recursos celestes",
        "fecha": "2015–2020",
        "resumen": "Con la mira en extraer hielo en los polos lunares para transformarlo en combustible y soporte vital, EE. UU. impulsó los Acuerdos de Artemisa, reconociendo el derecho a extraer recursos y establecer 'zonas de seguridad' bilaterales, desatando acusaciones de unilateralismo.",
        "hechosReales": "Compañías como Moon Express y Planetary Resources sentaron las bases para la minería espacial. La ley estadounidense de 2015 y los Acuerdos de 2020 avalan que las empresas privadas posean y vendan lo extraído. Países no firmantes critican que esto elude el consenso de la ONU y el principio de patrimonio común.",
        "proyectosPropuestas": "Creación de un régimen minero multilateral similar al de los fondos marinos de la ONU (CONVEMAR) frente a tratados de clubes de naciones que operan por acuerdos bilaterales de facto.",
        "actores": "Empresas mineras privadas, potencias espaciales líderes, coaliciones de países emergentes y la Asamblea General de la ONU.",
        "tensionEtica": "El debate entre el derecho legítimo a obtener ganancias por arriesgar capital e innovar, frente a la creación de monopolios que priven a la humanidad de recursos estratégicos cósmicos.",
        "fotoId": "foto_mineria_artemisa"
      },
      {
        "id": "caso_basura_orbital",
        "numero": 5,
        "titulo": "Saturación orbital, fragmentaciones y la tragedia de los comunes",
        "subtitulo": "La degradación del entorno cercano a la Tierra por el auge comercial",
        "fecha": "2009–presente",
        "resumen": "Colisiones históricas como la de Cosmos e Iridium en 2009 y explosiones de etapas de cohetes han dejado decenas de miles de fragmentos de metralla en órbita baja. El despliegue de megaconstelaciones satelitales acelera el riesgo de un colapso en cadena (síndrome de Kessler).",
        "hechosReales": "Más de 35.000 objetos de basura espacial de más de 10 cm giran a 28.000 km/h. Nuevas constelaciones prevén sumar hasta 100.000 satélites en esta década. Cada operador privado maximiza su flota para ganar mercado, trasladando el riesgo de colisión al conjunto del entorno compartido.",
        "proyectosPropuestas": "Regulación obligatoria de desorbitado seguro en 5 años, cuotas ambientales de saturación por empresa y misiones activas de captura y limpieza de chatarra espacial.",
        "actores": "Operadores privados de megaconstelaciones, agencias espaciales civiles (ESA, NASA), comunidad astronómica y generaciones futuras.",
        "tensionEtica": "La contradicción entre maximizar la conectividad digital y los beneficios comerciales hoy, y el riesgo de inutilizar las órbitas terrestres para los próximos siglos.",
        "fotoId": "foto_basura_orbital"
      }
    ]
  },
  "preguntas": [
    ... (8 preguntas rigurosamente redactadas con 5 alternativas A, B, C, D, E y cuestionamientos socráticos)
  ],
  "reflexionTresPreguntas": {
    "titulo": "Preguntas de reflexión filosófica",
    "descripcion": "Examina las premisas fundamentales que guían tus decisiones sobre la propiedad y el destino de los recursos espaciales.",
    "preguntas": [
      ... (3 preguntas con contextualizacionPrevia, citaReferencia y pregunta abierta)
    ]
  },
  "test": {
    "titulo": "Test de afinidad sobre el uso y propiedad del espacio",
    "descripcion": "Compara tus principios éticos con las corrientes de Robert Nozick, John Rawls y Santo Tomás de Aquino.",
    "afirmaciones": [
      ... (8 afirmaciones)
    ],
    "perfilesReferencia": {
      "nozick": { ... },
      "rawls": { ... },
      "tomas": { ... }
    }
  },
  "autores": [
    ... (fichas de Robert Nozick, John Rawls y Santo Tomás de Aquino con citas exactas)
  ],
  "fuentes": [
    ... (fuentes bibliográficas completas)
  ]
}
"""

print("[*] Enviando solicitud a gemini-3.5-flash...")
headers = {"Content-Type": "application/json"}
payload = {
    "contents": [{"parts": [{"text": prompt}]}],
    "generationConfig": {
        "responseMimeType": "application/json",
        "temperature": 0.25
    }
}

response = requests.post(url, headers=headers, json=payload, timeout=90)
if response.status_code != 200:
    print(f"[X] Error {response.status_code}: {response.text}")
    exit(1)

print("[OK] Respuesta exitosa recibida. Procesando JSON...")
data = response.json()
text_content = data['candidates'][0]['content']['parts'][0]['text']

parsed_data = json.loads(text_content)

out_dir = os.path.join(ROOT_DIR, 'src', 'data', 'directrizUsoEspacio')
os.makedirs(out_dir, exist_ok=True)

with open(os.path.join(out_dir, 'casos.json'), 'w', encoding='utf-8') as f:
    json.dump(parsed_data['caso'], f, indent=2, ensure_ascii=False)

with open(os.path.join(out_dir, 'preguntas.json'), 'w', encoding='utf-8') as f:
    json.dump(parsed_data['preguntas'], f, indent=2, ensure_ascii=False)

with open(os.path.join(out_dir, 'reflexion.json'), 'w', encoding='utf-8') as f:
    json.dump(parsed_data['reflexionTresPreguntas'], f, indent=2, ensure_ascii=False)

with open(os.path.join(out_dir, 'test.json'), 'w', encoding='utf-8') as f:
    json.dump(parsed_data['test'], f, indent=2, ensure_ascii=False)

with open(os.path.join(out_dir, 'autores.json'), 'w', encoding='utf-8') as f:
    json.dump(parsed_data['autores'], f, indent=2, ensure_ascii=False)

with open(os.path.join(out_dir, 'fuentes.json'), 'w', encoding='utf-8') as f:
    json.dump(parsed_data['fuentes'], f, indent=2, ensure_ascii=False)

print("[DONE] Todos los archivos JSON fueron generados exitosamente en src/data/directrizUsoEspacio/!")
