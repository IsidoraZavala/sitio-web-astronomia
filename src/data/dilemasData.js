export const PERSPECTIVAS_BIBLIOTECA = [
  {
    id: 'utilitarismo',
    nombre: 'Utilitarismo',
    categoria: 'Teoría ética general',
    resumenCorto: 'Evalúa las acciones según sus consecuencias y el balance global de bienestar o perjuicio que producen.',
    definicion:
      'Corriente consecuencialista según la cual una decisión es éticamente justificable cuando promueve el mayor beneficio o bienestar posible para el mayor número de personas (y seres sintientes) afectados, minimizando los daños previsibles.',
    autores: ['Jeremy Bentham (1748–1832)', 'John Stuart Mill (1806–1873)', 'Peter Singer (1946–)'],
    principiosCentrales: [
      'Imparcialidad: el bienestar de cada persona afectada cuenta por igual.',
      'Consecuencialismo: importa el resultado real y medible de la acción, no solo la buena intención.',
      'Maximización del beneficio neto: comparar beneficios totales frente a costos, daños y riesgos.',
    ],
    preguntasHabituales: [
      '¿Qué consecuencias concretas genera esta decisión a corto, mediano y largo plazo?',
      '¿Los beneficios globales superan claramente los perjuicios ocasionados?',
      '¿Existe otra alternativa que logre beneficios similares causando menos daño?',
    ],
    ejemploEspacial:
      'Al evaluar una megaconstelación satelital, el utilitarismo pondera la mejora en conectividad para millones de personas en zonas remotas frente al deterioro de la observación astronómica mundial y el riesgo de colisiones en órbita.',
  },
  {
    id: 'deontologia',
    nombre: 'Deontología',
    categoria: 'Teoría ética general',
    resumenCorto: 'Se centra en los deberes morales, el respeto a las normas y las obligaciones que no deben vulnerarse.',
    definicion:
      'Marco ético basado en el cumplimiento de deberes, principios y derechos fundamentales. Sostiene que ciertas acciones son correctas o incorrectas en sí mismas, independientemente de cuán rentables o convenientes sean sus resultados.',
    autores: ['Immanuel Kant (1724–1804)', 'W. D. Ross (1877–1971)', 'Onora O’Neill (1941–)'],
    principiosCentrales: [
      'Respeto a las personas y actores: no instrumentalizar a otros únicamente como medios para un fin privado.',
      'Universalizabilidad: actuar según reglas que todos los operadores podrían seguir sin contradicción.',
      'Deber de no dañar y responsabilidad: cumplir normas internacionales y prevenir daños previsibles.',
    ],
    preguntasHabituales: [
      '¿Qué deberes y obligaciones fundamentales deben respetarse en este caso?',
      '¿Podría universalizarse esta práctica si todas las empresas o países hicieran lo mismo?',
      '¿Se está respetando la autonomía y los derechos de las comunidades afectadas?',
    ],
    ejemploEspacial:
      'Desde la deontología, ningún actor privado o estatal debería apropiarse de facto de una órbita o degradar un bien común científico si esa máxima no puede sostenerse cuando todos los demás operadores actúan igual.',
  },
  {
    id: 'justicia-distributiva',
    nombre: 'Justicia distributiva',
    categoria: 'Teoría ética general',
    resumenCorto: 'Analiza cómo se reparten equitativamente los beneficios, costos, cargas y riesgos entre distintos grupos.',
    definicion:
      'Enfoque ético y político que examina la equidad en la distribución de bienes comunes, oportunidades, recursos y riesgos. Cuestiona las situaciones en que un grupo concentra las ganancias mientras otros asumen las cargas o externalidades.',
    autores: ['John Rawls (1921–2002)', 'Amartya Sen (1933–)', 'Iris Marion Young (1949–2006)'],
    principiosCentrales: [
      'Equidad en cargas y beneficios: quien obtiene ganancias de una actividad debe asumir sus costos y riesgos.',
      'Protección de los más vulnerables: las desigualdades solo son aceptables si benefician a quienes están en desventaja.',
      'Acceso justo a los bienes comunes: el espacio ultraterrestre es incumbencia de toda la humanidad.',
    ],
    preguntasHabituales: [
      '¿Quién recibe los beneficios directos de este proyecto y quién asume los costos o riesgos?',
      '¿Las comunidades en desventaja tienen acceso real a los beneficios prometidos?',
      '¿Están participando en la decisión todos los grupos que sufrirán sus consecuencias?',
    ],
    ejemploEspacial:
      'En la explotación de recursos lunares o el uso de órbitas bajas, la justicia distributiva cuestiona si unas pocas potencias y corporaciones tecnológicas monopolizan el acceso mientras el resto de los países pierde oportunidades futuras.',
  },
  {
    id: 'justicia-intergeneracional',
    nombre: 'Ética ambiental y justicia intergeneracional',
    categoria: 'Enfoque especializado',
    resumenCorto: 'Evalúa nuestra responsabilidad hacia el entorno orbital y hacia las generaciones futuras.',
    definicion:
      'Marco ético que amplía la responsabilidad moral hacia la preservación de entornos frágiles (como la órbita terrestre y los cuerpos celestes) y hacia los derechos e intereses de las generaciones humanas venideras.',
    autores: ['Hans Jonas (1903–1993)', 'Edith Brown Weiss (1942–)', 'Holmes Rolston III (1932–2025)'],
    principiosCentrales: [
      'Principio de precaución ante daños irreversibles o acumulativos.',
      'Conservación de opciones: dejar a las generaciones futuras un entorno orbital utilizable y seguro.',
      'Cuidado del patrimonio científico y natural del cosmos.',
    ],
    preguntasHabituales: [
      '¿Esta decisión compromete la seguridad o libertad de acción de las próximas generaciones?',
      '¿Estamos generando un daño acumulativo difícil o imposible de revertir?',
      '¿Qué obligaciones de preservación tenemos sobre entornos más allá de la Tierra?',
    ],
    ejemploEspacial:
      'La acumulación de basura espacial puede desencadenar colisiones en cascada (Síndrome de Kessler), clausurando órbitas enteras durante décadas y privando a las generaciones futuras del acceso seguro al espacio.',
  },
]

export const DILEMAS_CATALOGO = [
  {
    id: 'ocupacion-orbita',
    numero: '01',
    titulo: '¿Quién tiene derecho a ocupar la órbita?',
    subtitulo:
      'Expansión de megaconstelaciones satelitales frente a la protección de la investigación astronómica y el entorno orbital.',
    tema: 'Desarrollo tecnológico y responsabilidad científica',
    tipoIlustracion: 'orbita',
    destacado: true,
    resumenEscenario:
      'Una corporación aeroespacial solicita autorización para desplegar una megaconstelación de 12.000 satélites en órbita terrestre baja (LEO) con el objetivo de ofrecer internet de alta velocidad a nivel global, incluyendo regiones rurales y aisladas. Sin embargo, observatorios astronómicos y agencias espaciales advierten que el incremento masivo de satélites alterará la observación del cielo nocturno, generará interferencias de radiofrecuencia y elevará drásticamente la congestión orbital.',
    hechosCientificos: [
      'En menos de una década, el número de satélites activos en órbita terrestre baja (entre 300 y 1.200 km de altitud) pasó de unos pocos miles a más de 10.000 unidades operativas.',
      'Los paneles y superficies de los satélites reflejan la luz solar durante el crepúsculo y la noche, dejando trazas brillantes en las exposiciones fotográficas de telescopios ópticos terrestres.',
      'Las emisiones de comunicación satelital pueden solaparse con bandas adyacentes utilizadas por radiotelescopios para estudiar señales cósmicas extremadamente débiles.',
    ],
    supuestosEscenario: [
      'La empresa promete destinar un 15% de su capacidad a escuelas, postas médicas y comunidades aisladas, aunque el servicio comercial general tendrá una tarifa mensual de mercado.',
      'Existe tecnología experimental de recubrimiento oscuro y viseras antirreflejo, pero reduce parcialmente la eficiencia térmica de los satélites y aumenta el costo del proyecto en un 18%.',
      'Actualmente no existe un tribunal internacional con capacidad sancionadora directa que limite el número total de satélites por empresa.',
    ],
    actores: [
      {
        id: 'empresa',
        nombre: 'Empresa espacial',
        rol: 'Operación, inversión y conectividad',
        intereses:
          'Busca rentabilizar una inversión multimillonaria, liderar el mercado global de telecomunicaciones orbitales y demostrar que la infraestructura satelital puede cerrar la brecha digital en zonas sin fibra óptica.',
        preocupacion:
          'Teme que regulaciones estrictas o demoras burocráticas hagan inviable el modelo de negocio frente a competidores de otros países.',
      },
      {
        id: 'astronomia',
        nombre: 'Comunidad astronómica',
        rol: 'Investigación científica y observación del cielo',
        intereses:
          'Necesita cielos oscuros y silenciosos en radiofrecuencia para detectar asteroides cercanos a la Tierra, estudiar galaxias lejanas y preservar el patrimonio científico y cultural del cielo nocturno.',
        preocupacion:
          'Advierte que hasta un 30% de las imágenes de gran campo en grandes observatorios (muchos ubicados en el norte de Chile) pueden verse degradadas por trazas satelitales.',
      },
      {
        id: 'comunidades',
        nombre: 'Comunidades aisladas',
        rol: 'Acceso a servicios digitales y derechos básicos',
        intereses:
          'Requieren conexión estable para telemedicina, educación a distancia, alerta temprana ante desastres naturales y desarrollo económico local donde las redes terrestres no llegan.',
        preocupacion:
          'Les preocupa quedar nuevamente postergadas si el proyecto se cancela, pero también dudan de si las tarifas finales serán realmente asequibles sin subsidios o compromisos vinculantes.',
      },
      {
        id: 'operadores',
        nombre: 'Otros operadores orbitales',
        rol: 'Seguridad espacial y gestión de tráfico',
        intereses:
          'Agencias públicas, satélites meteorológicos y operadores de otros países necesitan órbitas seguras y coordinadas para evitar colisiones y maniobras constantes de evasión.',
        preocupacion:
          'La saturación de ciertas altitudes obliga a realizar miles de maniobras evasivas al año, consumiendo combustible de misiones científicas y meteorológicas.',
      },
      {
        id: 'futuras',
        nombre: 'Generaciones futuras',
        rol: 'Sostenibilidad orbital a largo plazo',
        intereses:
          'Dependen de que el entorno orbital terrestre se mantenga limpio, accesible y libre de reacciones en cadena de fragmentos espaciales.',
        preocupacion:
          'No tienen voz directa en el comité actual, pero heredarán las consecuencias de una órbita saturada o de un cielo nocturno permanentemente alterado.',
      },
    ],
    capsulasCientificas: [
      {
        titulo: '¿Qué es la Órbita Terrestre Baja (LEO)?',
        contenido:
          'La órbita terrestre baja comprende altitudes entre los 160 km y los 2.000 km sobre la superficie de la Tierra. A diferencia de los satélites geoestacionarios (a 35.786 km), los satélites en LEO están mucho más cerca, lo que reduce la latencia de internet a pocos milisegundos, pero requiere miles de unidades en red porque cada satélite cubre solo una pequeña porción del planeta en cada instante.',
      },
      {
        titulo: 'Interferencia óptica y radioastronómica',
        contenido:
          'Los telescopios modernos capturan luz extremadamente tenue durante exposiciones largas. Cuando un satélite iluminado por el Sol cruza el campo visual, satura los sensores dejando una línea brillante. Además, los transmisores orbitales pueden emitir ruido electrónico que oculta señales naturales provenientes del universo temprano.',
      },
      {
        titulo: 'Congestión orbital y Síndrome de Kessler',
        contenido:
          'Propuesto por el científico Donald Kessler en 1978, describe un escenario en el que la densidad de objetos en órbita baja es tan alta que una colisión entre dos satélites genera una nube de fragmentos que impacta a otros satélites, produciendo una reacción en cadena capaz de inutilizar regiones orbitales por décadas.',
      },
    ],
    preguntaComite:
      'Eres parte de un comité internacional encargado de evaluar el proyecto de la megaconstelación satelital. ¿Qué decisión tomarías?',
    alternativas: [
      {
        id: 'autorizar',
        titulo: 'Autorizar el proyecto',
        descripcion:
          'Aprobar el despliegue completo de la constelación para acelerar la conectividad global y el desarrollo tecnológico sin imponer restricciones adicionales.',
        requiereCondiciones: false,
      },
      {
        id: 'condicionar',
        titulo: 'Autorizar con condiciones',
        descripcion:
          'Permitir el despliegue únicamente si la empresa cumple medidas técnicas, científicas y sociales obligatorias y verificables.',
        requiereCondiciones: true,
      },
      {
        id: 'rechazar',
        titulo: 'Rechazar el proyecto',
        descripcion:
          'Denegar la autorización mientras no existan garantías internacionales vinculantes que aseguren la protección astronómica y la seguridad orbital.',
        requiereCondiciones: false,
      },
      {
        id: 'propia',
        titulo: 'Proponer una solución propia',
        descripcion:
          'Redactar una alternativa diferente o un modelo híbrido diseñado por ti para resolver el conflicto.',
        requiereCondiciones: false,
        esLibre: true,
      },
    ],
    condicionesDisponibles: [
      {
        id: 'desorbitacion',
        texto: 'Retiro y desorbitación activa garantizada en un máximo de 2 años tras finalizar su vida útil o ante fallas.',
      },
      {
        id: 'brillo',
        texto: 'Límite estricto de brillo óptico (magnitud superior a 7) y apagado de transmisores al pasar sobre observatorios astronómicos.',
      },
      {
        id: 'supervision',
        texto: 'Auditoría independiente y reducción del 40% en el número inicial de satélites hasta evaluar el impacto real de la primera fase.',
      },
      {
        id: 'tarifa-social',
        texto: 'Obligación legal de proveer conectividad gratuita o subsidiada a escuelas, centros de salud y comunidades aisladas.',
      },
    ],
    analisisFilosofico: {
      utilitarismo: {
        explicacionBreve:
          'Evalúa qué decisión produce el mayor balance neto de bienestar y los menores perjuicios agregados para todos los afectados.',
        preguntaPrincipal: '¿Qué consecuencias genera la decisión y cómo se equilibra el balance global entre conectividad y ciencia?',
        porDecision: {
          autorizar:
            'Respalda la rápida expansión del acceso a internet para millones de usuarios, pero cuestiona que se ignoren costos globales severos: pérdida de descubrimientos astronómicos, menor capacidad de alerta ante asteroides y riesgo de colisiones orbitales.',
          condicionar:
            'La autorización condicionada busca conservar los beneficios de conectividad mientras reduce los perjuicios científicos y orbitales. Sin embargo, exige verificar empíricamente si las medidas técnicas realmente logran un balance global positivo.',
          rechazar:
            'Evita de forma inmediata los daños a la astronomía y el riesgo de saturación orbital, pero implica renunciar o postergar beneficios tangibles de conectividad en salud, educación y emergencias para poblaciones aisladas.',
          propia:
            'Un enfoque utilitarista evaluará tu propuesta según su eficacia práctica: ¿logra maximizar simultáneamente el acceso social a las comunicaciones y la preservación de la investigación científica sin generar nuevos costos ocultos?',
        },
        preguntaDesafio:
          '¿Qué ocurriría si, a pesar de las promesas de conectividad, los perjuicios acumulados para la ciencia astronómica y la seguridad orbital superaran los beneficios reales a mediano plazo?',
      },
      deontologia: {
        explicacionBreve:
          'Examina si la decisión respeta deberes morales, normas universales y la prohibición de dañar o instrumentalizar a otros actores.',
        preguntaPrincipal: '¿Qué deberes y obligaciones fundamentales deben respetarse antes de ocupar el espacio orbital?',
        porDecision: {
          autorizar:
            'Cuestiona severamente una autorización sin límites: si cada empresa o Estado desplegara decenas de miles de satélites sin restricciones, la regla sería insostenible y vulneraría el deber de no dañar un bien común.',
          condicionar:
            'La decisión puede justificarse si las condiciones garantizan el deber de prevenir daños, cumplir normas internacionales y respetar tanto a la comunidad científica como a las comunidades aisladas sin tratarlas como mera coartada comercial.',
          rechazar:
            'Defiende el principio de precaución y el deber de no alterar unilateralmente el entorno común antes de contar con reglas universales justas, aunque plantea la pregunta de qué deber tenemos hacia quienes hoy carecen de conectividad básica.',
          propia:
            'Para la deontología, tu propuesta será válida si establece reglas universales que cualquier operador espacial deba cumplir por igual, respetando los derechos de terceros sin excepciones oportunistas.',
        },
        preguntaDesafio:
          '¿Autorizarías el proyecto si sus beneficios económicos y tecnológicos fueran enormes, pero vulnerara una obligación fundamental de preservación científica o seguridad común?',
      },
      'justicia-distributiva': {
        explicacionBreve:
          'Analiza si el reparto de beneficios, costos y riesgos entre corporaciones, comunidades y sociedad global es equitativo.',
        preguntaPrincipal: '¿Quién recibe los beneficios directos de la megaconstelación y quién asume los costos y riesgos?',
        porDecision: {
          autorizar:
            'Advierte una asimetría crítica: una empresa privada captura las ganancias comerciales y el control de las órbitas más valiosas, mientras externaliza los costos (contaminación lumínica y riesgo orbital) hacia la ciencia pública y el resto del mundo.',
          condicionar:
            'Intenta corregir la desigualdad exigiendo que los beneficios lleguen efectivamente a las comunidades aisladas y que la propia empresa asuma el costo económico de mitigar sus impactos técnicos y ambientales.',
          rechazar:
            'Frena la apropiación desigual del espacio orbital por parte de un actor privado, pero exige pensar mecanismos alternativos justos para que las regiones desconectadas no sigan excluidas del acceso digital.',
          propia:
            'Desde la justicia distributiva, el criterio clave para evaluar tu solución es si impide que unos pocos concentren los beneficios mientras la sociedad global y las regiones vulnerables cargan con los riesgos.',
        },
        preguntaDesafio:
          '¿Es justo que una empresa privada obtenga beneficios comerciales directos ocupando una órbita común mientras astrónomos, operadores públicos y ciudadanos asumen parte de los riesgos y costos?',
      },
    },
  },
  {
    id: 'basura-espacial',
    numero: '02',
    titulo: '¿Quién debe hacerse cargo de la basura espacial?',
    subtitulo:
      'Responsabilidad por los desechos que permanecen en órbita y distribución de los costos de retirarlos.',
    tema: 'Responsabilidad ambiental y justicia intergeneracional',
    tipoIlustracion: 'basura',
    destacado: true,
    resumenEscenario:
      'Más de 36.000 objetos mayores a 10 cm y millones de fragmentos más pequeños orbitan la Tierra a velocidades superiores a 28.000 km/h. Una agencia internacional propone crear un Fondo Obligatorio de Limpieza Orbital para financiar misiones de remoción activa de desechos. El conflicto surge al definir quién debe pagar: las potencias espaciales históricas que generaron la mayoría de los residuos durante décadas, todos los países que hoy utilizan servicios satelitales o las nuevas empresas y naciones emergentes que recién comienzan a lanzar misiones.',
    hechosCientificos: [
      'A velocidades orbitales (7 a 8 km/s), un fragmento de pintura o aluminio de apenas 1 centímetro puede perforar el blindaje de un satélite activo o poner en riesgo una estación espacial tripulada.',
      'Más del 80% de la masa de desechos en órbita proviene de lanzamientos históricos realizados por un grupo reducido de potencias espaciales y de etapas de cohetes abandonadas desde la década de 1960.',
      'En altitudes superiores a 800 km, los objetos abandonados no caen por sí solos en pocos años: pueden permanecer en órbita durante siglos.',
    ],
    supuestosEscenario: [
      'Retirar activamente los 50 objetos grandes más peligrosos al año tiene un costo estimado de miles de millones de dólares mediante naves remolcadoras y redes robóticas.',
      'Los países en vías de desarrollo argumentan que imponer un impuesto elevado a cada lanzamiento nuevo frenaría sus primeros programas satelitales meteorológicos y agrícolas.',
      'Las potencias espaciales tradicionales sostienen que cuando lanzaron sus primeras misiones no existían normas internacionales sobre desorbitación.',
    ],
    actores: [
      {
        id: 'potencias',
        nombre: 'Potencias espaciales históricas',
        rol: 'Estados con décadas de actividad orbital',
        intereses:
          'Prefieren un modelo enfocado hacia el futuro donde todos los operadores actuales aporten por igual según sus lanzamientos presentes, evitando pagos retroactivos por desechos antiguos.',
        preocupacion:
          'Consideran injusto asumir casi todo el costo financiero por misiones realizadas cuando la tecnología de reingreso controlado aún no existía.',
      },
      {
        id: 'emergentes',
        nombre: 'Países con programas espaciales emergentes',
        rol: 'Nuevos actores científicos y satelitales',
        intereses:
          'Buscan acceder a órbitas seguras para lanzar satélites de observación climática, gestión hídrica y telecomunicaciones sin pagar por una contaminación orbital que no causaron.',
        preocupacion:
          'Temen que las tasas uniformes de limpieza funcionen como una barrera económica que consolide el monopolio de las grandes potencias.',
      },
      {
        id: 'operadores-comerciales',
        nombre: 'Operadores comerciales actuales',
        rol: 'Empresas de lanzamientos y telecomunicaciones',
        intereses:
          'Necesitan que se retiren los grandes restos antiguos porque amenazan la integridad de sus flotas activas y encarecen los seguros espaciales.',
        preocupacion:
          'Rechazan impuestos excesivos que reduzcan la competitividad de la industria aeroespacial privada.',
      },
      {
        id: 'agencias-seguridad',
        nombre: 'Comunidad científica y tripulaciones',
        rol: 'Seguridad de misiones tripuladas y telescopios espaciales',
        intereses:
          'Exigen acción urgente de remoción activa antes de que una colisión mayor entre etapas de cohetes abandonadas multiplique por miles los fragmentos incontrolables.',
        preocupacion:
          'La parálisis diplomática sobre quién paga retrasa cada año la limpieza efectiva de las órbitas más críticas.',
      },
      {
        id: 'generaciones-futuras',
        nombre: 'Generaciones futuras',
        rol: 'Herederos del entorno orbital terrestre',
        intereses:
          'Requieren que la humanidad actual estabilice el entorno orbital para no quedar encerrada en un planeta rodeado de metralla hiperveloz.',
        preocupacion:
          'El costo de no actuar hoy se multiplicará exponencialmente para quienes vivan en las próximas décadas.',
      },
    ],
    capsulasCientificas: [
      {
        titulo: 'Velocidad de impacto en órbita',
        contenido:
          'En la órbita terrestre baja, los objetos se desplazan a unos 28.000 km/h. Si dos objetos chocan en trayectorias cruzadas, la velocidad relativa de impacto puede rondar los 40.000 o 50.000 km/h, liberando una energía cinética equivalente a una explosión diez veces superior a su masa en TNT.',
      },
      {
        titulo: 'Tecnologías de Remoción Activa de Desechos (ADR)',
        contenido:
          'Actualmente se prueban brazos robóticos, arpones, redes magnéticas y remolcadores orbitales capaces de capturar satélites muertos o etapas de cohetes y empujarlos hacia la atmósfera para que se desintegren de manera controlada.',
      },
      {
        titulo: 'Responsabilidad común pero diferenciada',
        contenido:
          'Concepto originado en el derecho ambiental internacional según el cual todos los Estados comparten el deber de proteger un bien común global, pero la contribución financiera y técnica debe ser proporcional a la huella histórica y a la capacidad económica de cada actor.',
      },
    ],
    preguntaComite:
      'Debes votar el modelo de financiamiento y responsabilidad para el Tratado Internacional de Limpieza Orbital. ¿Qué decisión tomarías?',
    alternativas: [
      {
        id: 'autorizar',
        titulo: 'Financiamiento proporcional a la huella histórica',
        descripcion:
          'Exigir que los Estados y corporaciones financien la limpieza en proporción directa a la masa de desechos que han dejado en órbita desde 1957.',
        requiereCondiciones: false,
      },
      {
        id: 'condicionar',
        titulo: 'Fondo mixto con responsabilidades diferenciadas',
        descripcion:
          'Combinar aportes históricos de las grandes potencias con tasas escalonadas para nuevos lanzamientos, seleccionando medidas específicas de equidad y control.',
        requiereCondiciones: true,
      },
      {
        id: 'rechazar',
        titulo: 'Tasa uniforme solo para lanzamientos futuros',
        descripcion:
          'Establecer un cobro igualitario por cada nuevo satélite lanzado a partir de hoy, sin aplicar cobros retroactivos por la basura histórica.',
        requiereCondiciones: false,
      },
      {
        id: 'propia',
        titulo: 'Proponer una solución propia',
        descripcion:
          'Diseñar otro mecanismo institucional, económico o tecnológico para resolver la limpieza orbital.',
        requiereCondiciones: false,
        esLibre: true,
      },
    ],
    condicionesDisponibles: [
      {
        id: 'exencion-emergentes',
        texto: 'Eximir de tasas a las primeras misiones científicas, educativas y climáticas de países en desarrollo.',
      },
      {
        id: 'fianza-reingreso',
        texto: 'Exigir una fianza económica reembolsable que solo se devuelve cuando el operador desorbita con éxito su satélite.',
      },
      {
        id: 'prioridad-riesgo',
        texto: 'Destinar el 70% del fondo a retirar primero las etapas de cohetes antiguas con mayor probabilidad estadística de colisión.',
      },
      {
        id: 'transferencia-tecnologica',
        texto: 'Compartir tecnología abierta de prevención de colisiones con todas las agencias espaciales del mundo.',
      },
    ],
    analisisFilosofico: {
      utilitarismo: {
        explicacionBreve:
          'Prioriza el acuerdo que logre limpiar efectivamente la órbita lo antes posible y reduzca al mínimo el riesgo de colisiones globales.',
        preguntaPrincipal: '¿Qué esquema de responsabilidad logra retirar más desechos peligrosos en menos tiempo sin paralizar la cooperación?',
        porDecision: {
          autorizar:
            'Apunta directamente a quienes tienen más recursos y mayor responsabilidad material, pero corre el riesgo de que las grandes potencias boicoteen el tratado y la limpieza nunca se ejecute.',
          condicionar:
            'Un fondo mixto con incentivos prácticos (como fianzas reembolsables y prioridad en los objetos más peligrosos) maximiza la viabilidad política del acuerdo y acelera la reducción real del riesgo orbital.',
          rechazar:
            'Facilita que las potencias históricas firmen el acuerdo rápidamente, pero puede recaudar fondos insuficientes y desincentivar proyectos satelitales de alto valor social en países emergentes.',
          propia:
            'El utilitarismo evaluará tu propuesta según su efectividad real para evitar el Síndrome de Kessler y proteger los servicios espaciales de los que depende la humanidad.',
        },
        preguntaDesafio:
          'Si exigir justicia histórica estricta provocara que las grandes potencias abandonen el acuerdo y no se limpie la órbita, ¿seguirías defendiendo esa postura o priorizarías un acuerdo pragmático?',
      },
      deontologia: {
        explicacionBreve:
          'Sostiene el principio moral de que quien causa un daño o genera un riesgo tiene el deber directo de repararlo.',
        preguntaPrincipal: '¿Qué obligaciones morales se derivan de haber contaminado un entorno común?',
        porDecision: {
          autorizar:
            'Coincide fuertemente con el deber de reparación ("quien contamina, limpia"): haberse beneficiado durante décadas del uso orbital genera una obligación moral ineludible de retirar los propios desechos.',
          condicionar:
            'Articula el deber de reparación histórica con la obligación universal actual de que ningún nuevo lanzamiento abandone objetos sin plan de retiro verificado.',
          rechazar:
            'Resulta problemático desde el deber de responsabilidad causal, pues exime a quienes generaron más del 80% de los residuos actuales y traslada la carga moral hacia actores inocentes.',
          propia:
            'Desde la ética del deber, tu propuesta debe asegurar que ningún actor pueda desentenderse de las consecuencias previsibles de sus propios artefactos en órbita.',
        },
        preguntaDesafio:
          '¿Puede considerarse moralmente responsable a un país por desechos generados hace cincuenta años cuando no existían normas ni tecnología para desorbitarlos?',
      },
      'justicia-distributiva': {
        explicacionBreve:
          'Examina cómo repartir las cargas de limpieza sin reproducir desigualdades entre países ricos y países en desarrollo.',
        preguntaPrincipal: '¿Cómo distribuir justamente los costos de limpiar la órbita sin cerrar el acceso al espacio a las naciones emergentes?',
        porDecision: {
          autorizar:
            'Defiende que quienes acumularon ventajas tecnológicas y económicas gracias al uso temprano del espacio asuman el costo de restaurar el bien común.',
          condicionar:
            'Aplica el principio de responsabilidades comunes pero diferenciadas: protege el derecho al desarrollo de países emergentes mientras exige mayor aporte a quienes tienen mayor huella y capacidad.',
          rechazar:
            'Una tasa plana por igual para todos es regresiva: penaliza proporcionalmente mucho más a una universidad o país emergente que a una superpotencia o megacorporación.',
          propia:
            'La justicia distributiva analizará si tu modelo garantiza igualdad de oportunidades en el acceso al espacio y evita que los costos recaigan sobre quienes menos se beneficiaron.',
        },
        preguntaDesafio:
          '¿Cómo equilibrar el derecho de los países emergentes a lanzar sus propios satélites con el hecho físico de que la órbita ya está cerca de su límite de seguridad?',
      },
    },
  },
  {
    id: 'recursos-luna',
    numero: '03',
    titulo: '¿Es ético explotar los recursos de la Luna?',
    subtitulo:
      'Beneficios científicos y económicos de la extracción de recursos frente a preguntas sobre acceso, preservación y regulación.',
    tema: 'Explotación de recursos y justicia distributiva',
    tipoIlustracion: 'luna',
    destacado: false,
    resumenEscenario:
      'Un consorcio de agencias espaciales y empresas mineras proyecta instalar plantas de extracción en los cráteres del polo sur lunar, donde existen reservas limitadas de hielo de agua y tierras raras. El agua lunar permitiría producir oxígeno e hidrógeno como combustible para misiones más profundas, pero los sitios con hielo son escasos y coinciden con zonas de altísimo valor científico para estudiar el origen del Sistema Solar.',
    hechosCientificos: [
      'En las regiones permanentemente ensombrecidas del polo sur lunar existen depósitos de hielo de agua acumulados durante miles de millones de años que funcionan como un registro fósil del Sistema Solar.',
      'Extraer agua en la Luna evita el enorme costo energético de lanzar cada litro de agua desde la gravedad terrestre.',
      'El polvo lunar (regolito) levantado por excavaciones y aterrizajes puede desplazarse grandes distancias en ausencia de atmósfera y contaminar instrumentos científicos cercanos.',
    ],
    supuestosEscenario: [
      'El Tratado del Espacio Ultraterrestre de 1967 prohíbe la apropiación nacional de la Luna por soberanía, pero existe un vacío legal sobre la propiedad privada de los recursos una vez extraídos.',
      'Los picos de luz perpetua y cráteres con hielo en el polo sur lunar abarcan áreas reducidas de apenas unos pocos kilómetros cuadrados.',
    ],
    actores: [
      {
        id: 'consorcio-minero',
        nombre: 'Consorcio aeroespacial y minero',
        rol: 'Inversión e infraestructura lunar',
        intereses:
          'Busca seguridad jurídica sobre los recursos extraídos para financiar bases permanentes y estaciones de abastecimiento espacial.',
        preocupacion:
          'Sin derechos claros de explotación comercial, consideran imposible atraer la inversión necesaria para desarrollar tecnología lunar.',
      },
      {
        id: 'cientificos-planetarios',
        nombre: 'Comunidad de ciencia planetaria',
        rol: 'Preservación de archivos geológicos y astronómicos',
        intereses:
          'Quiere proteger cráteres prístinos del polo sur y de la cara oculta de la Luna (único lugar libre de ruido de radio terrestre) antes de que la actividad industrial los altere irreversiblemente.',
        preocupacion:
          'La minería comercial puede destruir muestras irrepetibles sobre el origen del agua en la Tierra y laLuna.',
      },
      {
        id: 'paises-no-espaciales',
        nombre: 'Países sin capacidad de alunizaje actual',
        rol: 'Defensores del patrimonio común de la humanidad',
        intereses:
          'Reclaman que la Luna sea tratada como patrimonio común y que sus sitios estratégicos no se repartan por orden de llegada ("el primero que llega se lo queda").',
        preocupacion:
          'Cuando el resto de las naciones desarrolle capacidad lunar en unas décadas, los pocos puntos con agua y energía solar continua ya estarán ocupados.',
      },
    ],
    capsulasCientificas: [
      {
        titulo: 'Utilización de Recursos In Situ (ISRU)',
        contenido:
          'Se refiere a la recolección y procesamiento de materiales locales en otros cuerpos celestes (como hielo de agua lunar o regolito) para producir agua potable, oxígeno respirable, propelente de cohetes y materiales de construcción sin traerlos desde la Tierra.',
      },
      {
        titulo: 'Tratado de 1967 vs. Acuerdos recientes',
        contenido:
          'El Tratado del Espacio Ultraterrestre de 1967 declara que la exploración espacial debe realizarse en beneficio de todos los países. Sin embargo, el debate jurídico contemporáneo gira en torno a si extraer y vender recursos equivale o no a apropiarse del territorio.',
      },
    ],
    preguntaComite:
      'Como integrante de una comisión de la ONU sobre gobernanza lunar, ¿qué régimen propondrías para las solicitudes de extracción en el polo sur de la Luna?',
    alternativas: [
      {
        id: 'autorizar',
        titulo: 'Autorizar la extracción comercial e industrial',
        descripcion:
          'Permitir que los operadores extraigan y utilicen libremente los recursos lunares para impulsar la presencia humana permanente en el espacio.',
        requiereCondiciones: false,
      },
      {
        id: 'condicionar',
        titulo: 'Autorizar bajo régimen internacional y zonas protegidas',
        descripcion:
          'Permitir la extracción limitada sujetándola a reservas científicas intocables, cuotas de uso y reparto de beneficios científicos.',
        requiereCondiciones: true,
      },
      {
        id: 'rechazar',
        titulo: 'Declarar moratoria comercial y reserva científica',
        descripcion:
          'Prohibir la minería con fines de lucro y permitir únicamente investigaciones científicas internacionales de mínimo impacto, similar al Tratado Antártico.',
        requiereCondiciones: false,
      },
      {
        id: 'propia',
        titulo: 'Proponer una solución propia',
        descripcion:
          'Plantear un marco alternativo de gobernanza para los recursos lunares.',
        requiereCondiciones: false,
        esLibre: true,
      },
    ],
    condicionesDisponibles: [
      {
        id: 'zonas-exclusion',
        texto: 'Declarar al menos el 50% de los cráteres polares y la cara oculta como Parques Científicos Internacionales libres de minería.',
      },
      {
        id: 'muestras-abiertas',
        texto: 'Obligación de compartir datos geológicos y muestras extraídas con universidades y centros científicos de todo el mundo.',
      },
      {
        id: 'limite-cuota',
        texto: 'Fijar cuotas máximas de extracción de hielo por década para evitar el agotamiento temprano de depósitos escasos.',
      },
    ],
    analisisFilosofico: {
      utilitarismo: {
        explicacionBreve:
          'Compara el impulso que el combustible y el agua lunar darían a la ciencia y exploración humana frente a la pérdida irreversible de registros científicos.',
        preguntaPrincipal: '¿Qué modelo de uso lunar genera mayor valor científico y social para la humanidad en su conjunto?',
        porDecision: {
          autorizar:
            'Acelera la creación de bases lunares y misiones espaciales, pero corre el riesgo de agotar o contaminar desordenadamente sitios únicos de valor científico incalculable.',
          condicionar:
            'Busca compatibilizar el aprovechamiento práctico del agua para soporte vital y misiones científicas con la preservación de santuarios geológicos y astronómicos.',
          rechazar:
            'Garantiza la conservación intacta de los cráteres lunares, pero encarece y limita drásticamente el alcance de las misiones científicas tripuladas en el espacio profundo.',
          propia:
            'El análisis utilitarista evaluará si tu propuesta logra un equilibrio óptimo entre el avance del conocimiento humano y la conservación del entorno lunar.',
        },
        preguntaDesafio:
          '¿Compensa abaratar futuros viajes espaciales si en el proceso destruimos registros geológicos únicos de hace 4.000 millones de años?',
      },
      deontologia: {
        explicacionBreve:
          'Examina el deber de respetar los tratados internacionales y el principio de no apropiación unilateral de un patrimonio común.',
        preguntaPrincipal: '¿Qué obligaciones jurídicas y morales impiden tratar la Luna como tierra de nadie disponible por orden de llegada?',
        porDecision: {
          autorizar:
            'Cuestiona que establecer "zonas operativas exclusivas" en los pocos cráteres con agua equivale en la práctica a una apropiación prohibida por el espíritu del derecho espacial.',
          condicionar:
            'Exige que cualquier actividad respete normas universales acordadas multilateralmente y el deber de preservar el patrimonio científico de la humanidad.',
          rechazar:
            'Sostiene el deber estricto de preservar la Luna como un espacio dedicado exclusivamente a la paz y la ciencia cooperativa, fuera de la lógica de explotación comercial.',
          propia:
            'Desde la deontología, tu propuesta debe basarse en reglas que todas las naciones puedan aceptar libremente sin vulnerar el estatuto de bien común.',
        },
        preguntaDesafio:
          'Si un tratado prohíbe apropiarse del territorio lunar, ¿es éticamente coherente apropiarse y agotar los únicos recursos valiosos que hay en ese territorio?',
      },
      'justicia-distributiva': {
        explicacionBreve:
          'Cuestiona que la ventaja tecnológica actual de unos pocos países se traduzca en el monopolio permanente de los recursos lunares.',
        preguntaPrincipal: '¿Cómo evitar que el acceso a los recursos espaciales profundice la brecha entre naciones?',
        porDecision: {
          autorizar:
            'El criterio de "el primero que llega explota el recurso" reproduce una profunda inequidad, dejando fuera a la gran mayoría de los países que aún no poseen cohetes pesados.',
          condicionar:
            'Introduce mecanismos de equidad: reserva de sitios para el futuro, acceso compartido a datos y muestras, y regulación por una autoridad internacional representativa.',
          rechazar:
            'Impide la concentración privada de recursos escasos, asegurando que ningún actor monopolice el polo sur lunar.',
          propia:
            'La justicia distributiva evaluará si tu propuesta garantiza que los beneficios de la Luna alcancen a toda la humanidad y no solo a una élite tecnológica.',
        },
        preguntaDesafio:
          '¿Es justo que quienes hoy tienen la tecnología para llegar primero a la Luna decidan por sí solos cómo usar recursos que son escasos e irreemplazables?',
      },
    },
  },
  {
    id: 'limites-exploracion',
    numero: '04',
    titulo: '¿Hasta dónde deberíamos llegar en la exploración espacial?',
    subtitulo:
      'Decisiones sobre financiamiento público de grandes misiones espaciales frente a necesidades y prioridades terrestres.',
    tema: 'Prioridades sociales y distribución de recursos',
    tipoIlustracion: 'exploracion',
    destacado: false,
    resumenEscenario:
      'Un gobierno evalúa su presupuesto científico y tecnológico para la próxima década. Se propone destinar una inversión extraordinaria a un programa internacional de exploración tripulada a Marte. Sin embargo, diversos sectores sociales y científicos plantean que esos recursos públicos deberían priorizar urgencias terrestres inmediatas, como la mitigación del cambio climático, la salud pública y el desarrollo de satélites de monitoreo ambiental.',
    hechosCientificos: [
      'Aproximadamente la mitad de las variables climáticas esenciales definidas por la ONU (temperatura oceánica, deshielo polar, deforestación, gases de efecto invernadero) solo pueden medirse globalmente desde satélites en órbita.',
      'La investigación espacial ha generado transferencias tecnológicas directas en telemedicina, purificación de agua, paneles solares, sensores ópticos y nuevos materiales.',
      'Las misiones tripuladas al espacio profundo son significativamente más costosas y riesgosas que las sondas robóticas o los satélites de observación terrestre.',
    ],
    supuestosEscenario: [
      'El presupuesto total de ciencia y tecnología es limitado: aumentar la partida para misiones interplanetarias tripuladas implica reducir o postergar otros fondos de investigación aplicada.',
      'Abandonar por completo la cooperación espacial internacional dejaría al país fuera del desarrollo tecnológico de frontera durante décadas.',
    ],
    actores: [
      {
        id: 'agencia-espacial',
        nombre: 'Agencia espacial e investigadores aeroespaciales',
        rol: 'Ciencia de frontera e innovación tecnológica',
        intereses:
          'Defienden que la exploración del espacio profundo impulsa el conocimiento fundamental, inspira vocaciones científicas y desarrolla tecnologías críticas que luego se aplican en la Tierra.',
        preocupacion:
          'Recortar la ciencia básica y de exploración detiene capacidades científicas que tardan generaciones en construirse.',
      },
      {
        id: 'organizaciones-sociales',
        nombre: 'Organizaciones sociales y de salud pública',
        rol: 'Atención de necesidades básicas urgentes',
        intereses:
          'Priorizan la reducción de la pobreza, el fortalecimiento hospitalario, la educación básica y el acceso a agua potable antes que proyectos interplanetarios de largo plazo.',
        preocupacion:
          'Consideran éticamente cuestionable destinar miles de millones a misiones a Marte mientras persisten carencias severas en la Tierra.',
      },
      {
        id: 'cientificos-clima',
        nombre: 'Científicos ambientales y climáticos',
        rol: 'Monitoreo y protección de la biosfera terrestre',
        intereses:
          'Proponen que la inversión espacial se concentre prioritariamente en satélites de observación de la Tierra, prevención de incendios, sequías y transición energética.',
        preocupacion:
          'Temen que el entusiasmo por Marte desvíe recursos urgentes para proteger la habitabilidad de nuestro único planeta.',
      },
    ],
    capsulasCientificas: [
      {
        titulo: 'Ciencia básica vs. Ciencia orientada a misiones terrestres',
        contenido:
          'La historia de la ciencia muestra que muchos avances prácticos surgieron de investigaciones básicas sin aplicación inmediata aparente. Sin embargo, en contextos de crisis climática o social, la ética de la política científica debate cómo equilibrar el horizonte de largo plazo con las urgencias del presente.',
      },
      {
        titulo: 'Observación de la Tierra desde el espacio',
        contenido:
          'No toda actividad espacial mira lejos de la Tierra: gran parte de la infraestructura orbital actual está dedicada a estudiar los océanos, la atmósfera, la agricultura y los desastres naturales en nuestro propio planeta.',
      },
    ],
    preguntaComite:
      'Formas parte del Consejo Nacional de Política Científica y Presupuesto Público. ¿Qué decisión tomarías respecto al financiamiento espacial?',
    alternativas: [
      {
        id: 'autorizar',
        titulo: 'Aprobar el presupuesto completo de exploración profunda',
        descripcion:
          'Financiar íntegramente el programa de exploración interplanetaria como motor estratégico de ciencia, innovación y cooperación internacional.',
        requiereCondiciones: false,
      },
      {
        id: 'condicionar',
        titulo: 'Aprobar un presupuesto equilibrado con prioridades terrestres',
        descripcion:
          'Mantener el programa espacial pero reorientando su presupuesto bajo condiciones de impacto social, ambiental y transferencia tecnológica.',
        requiereCondiciones: true,
      },
      {
        id: 'rechazar',
        titulo: 'Postergar la exploración profunda y priorizar urgencias terrestres',
        descripcion:
          'Redirigir la totalidad de esos fondos hacia salud, educación, mitigación climática y satélites de observación ambiental directa.',
        requiereCondiciones: false,
      },
      {
        id: 'propia',
        titulo: 'Proponer una solución propia',
        descripcion:
          'Definir tu propio criterio ético y presupuestario para distribuir los recursos.',
        requiereCondiciones: false,
        esLibre: true,
      },
    ],
    condicionesDisponibles: [
      {
        id: 'prioridad-clima',
        texto: 'Destinar al menos el 60% del presupuesto espacial a satélites de monitoreo climático, hídrico y prevención de desastres.',
      },
      {
        id: 'patentes-abiertas',
        texto: 'Exigir que toda tecnología médica, energética o hídrica desarrollada en el programa se libere con licencia pública para uso social.',
      },
      {
        id: 'sondas-roboticas',
        texto: 'Priorizar misiones robóticas no tripuladas (mucho más económicas y seguras) en lugar de misiones tripuladas de altísimo costo.',
      },
    ],
    analisisFilosofico: {
      utilitarismo: {
        explicacionBreve:
          'Evalúa dónde cada unidad de presupuesto público produce la mayor reducción del sufrimiento y el mayor bienestar sostenible.',
        preguntaPrincipal: '¿Qué asignación de recursos genera mayores beneficios reales para la sociedad actual y futura?',
        porDecision: {
          autorizar:
            'Apuesta por los beneficios tecnológicos y científicos de largo plazo, pero enfrenta la crítica utilitarista de que el mismo dinero invertido hoy en salud o clima salvaría y mejoraría muchas más vidas de forma directa.',
          condicionar:
            'Busca optimizar el impacto social del gasto espacial enfocándolo en observación climática, misiones robóticas eficientes y transferencia tecnológica directa hacia problemas terrestres.',
          rechazar:
            'Prioriza el alivio directo de necesidades urgentes en la Tierra, aunque podría perder innovaciones científicas y capacidades satelitales que también protegen el bienestar humano.',
          propia:
            'Desde el utilitarismo, tu criterio presupuestario se mide por su capacidad de maximizar el bienestar tangible sin descuidar las herramientas científicas que previenen crisis futuras.',
        },
        preguntaDesafio:
          '¿Cómo comparar éticamente un beneficio inmediato y seguro en el presente frente a un descubrimiento científico incierto pero potencialmente transformador en el futuro?',
      },
      deontologia: {
        explicacionBreve:
          'Plantea si existen deberes prioritarios de asistencia hacia los ciudadanos que sufren carencias básicas antes de emprender proyectos suntuarios o lejanos.',
        preguntaPrincipal: '¿Qué obligaciones morales tienen prioridad cuando los recursos públicos son finitos?',
        porDecision: {
          autorizar:
            'Defiende el valor intrínseco del conocimiento humano, pero debe responder si se están cumpliendo primero los deberes básicos de protección social y ambiental en la Tierra.',
          condicionar:
            'Reconoce que el Estado tiene simultáneamente el deber de atender derechos básicos terrestres y la responsabilidad de fomentar la ciencia al servicio del bien común.',
          rechazar:
            'Sostiene una jerarquía estricta de deberes: mientras existan urgencias vitales desatendidas en la Tierra, es moralmente prioritario destinar allí los recursos públicos.',
          propia:
            'El análisis deontológico evaluará si tu propuesta respeta los derechos básicos de la población sin presentar la ciencia y la justicia social como enemigas irreconciliables.',
        },
        preguntaDesafio:
          '¿Existe un deber moral de resolver primero todos los problemas de la Tierra antes de explorar otros mundos, o eso significaría no explorar jamás?',
      },
      'justicia-distributiva': {
        explicacionBreve:
          'Examina quién financia con sus impuestos las misiones espaciales y qué sectores de la sociedad reciben sus beneficios.',
        preguntaPrincipal: '¿Cómo asegurar que la inversión pública en el espacio beneficie a toda la ciudadanía y especialmete a los sectores más vulnerables?',
        porDecision: {
          autorizar:
            'Cuestiona si los grandes contratos aeroespaciales concentran recursos públicos en sectores de alta tecnología mientras las comunidades vulnerables reciben beneficios solo indirectos o tardíos.',
          condicionar:
            'Vincula el financiamiento espacial a retornos públicos concretos: datos climáticos abiertos para agricultores, prevención de catástrofes y patentes abiertas en salud y energía.',
          rechazar:
            'Busca una redistribución directa del presupuesto hacia servicios públicos esenciales para reducir desigualdades inmediatas.',
          propia:
            'Desde la justicia distributiva, tu solución será justa si la inversión científica financiada por todos devuelve beneficios reales para mejorar las condiciones de vida de quienes menos tienen.',
        },
        preguntaDesafio:
          '¿Bajo qué condiciones es justo utilizar impuestos de toda la población para financiar misiones espaciales cuyos resultados tardarán décadas en verse?',
      },
    },
  },
]
