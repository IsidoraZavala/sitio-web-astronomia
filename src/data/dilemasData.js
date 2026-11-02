export const PERSPECTIVAS_BIBLIOTECA = [
  {
    id: 'utilitarismo',
    nombre: 'Utilitarismo',
    categoria: 'Teoría ética general',
    resumenCorto: 'Evalúa las decisiones por sus consecuencias sobre el bienestar general.',
    definicion:
      'Sostiene que una decisión es justa si promueve el mayor bienestar posible y reduce el sufrimiento. En el espacio, compara beneficios futuros e inciertos con el alivio de urgencias actuales.',
    autores: ['Jeremy Bentham', 'John Stuart Mill', 'Peter Singer'],
    principiosCentrales: [
      'Evaluar políticas por sus consecuencias reales sobre el bienestar.',
      'Ponderar tanto la magnitud del beneficio como su probabilidad.',
      'Considerar a las personas actuales y a las generaciones futuras.',
    ],
    preguntasHabituales: [
      '¿Cómo comparar beneficios futuros e inciertos con necesidades urgentes hoy?',
      '¿Qué uso de los recursos genera mayor bienestar verificable?',
    ],
    ejemploEspacial:
      'Puede objetar una misión a Marte si ese dinero salva vidas hoy de forma segura, o apoyarla si sus innovaciones (clima, medicina) previenen crisis globales mayores.',
  },
  {
    id: 'deontologia',
    nombre: 'Deontología',
    categoria: 'Teoría ética general',
    resumenCorto: 'Se basa en deberes y derechos que deben respetarse más allá de los resultados.',
    definicion:
      'Afirma que existen obligaciones morales y derechos básicos que no pueden postergarse en nombre de beneficios futuros, junto con el deber racional de cultivar el conocimiento.',
    autores: ['Immanuel Kant', 'Christine Korsgaard', 'W. D. Ross'],
    principiosCentrales: [
      'Tratar a cada persona como un fin y nunca solo como un medio.',
      'Cumplir primero los deberes de justicia básica hacia los ciudadanos.',
      'Actuar bajo reglas que todos los afectados puedan aceptar.',
    ],
    preguntasHabituales: [
      '¿Qué obligaciones deben respetarse con independencia de los resultados?',
      '¿Es justo usar impuestos de personas vulnerables para metas que no disfrutarán?',
    ],
    ejemploEspacial:
      'Destaca la tensión entre el deber estatal de asegurar derechos básicos en la Tierra y el deber humano de investigar y comprender el universo.',
  },
  {
    id: 'justicia-distributiva',
    nombre: 'Justicia distributiva',
    categoria: 'Teoría ética general',
    resumenCorto: 'Analiza cómo se reparten costos, riesgos y beneficios en la sociedad.',
    definicion:
      'Examina quién paga los costos de una política y quién recibe sus beneficios. Según John Rawls, las desigualdades solo son justas si benefician a los menos aventajados.',
    autores: ['John Rawls', 'Amartya Sen', 'Martha Nussbaum'],
    principiosCentrales: [
      'Garantizar un umbral digno de derechos y capacidades básicas.',
      'Evitar que toda la población pague costos cuyos beneficios se concentran en pocos.',
      'Exigir retorno social de las inversiones públicas.',
    ],
    preguntasHabituales: [
      '¿Cómo se reparten los costos y beneficios de la actividad espacial?',
      '¿Qué umbral social debe asegurarse antes de financiar megamisiones?',
    ],
    ejemploEspacial:
      'Cuestiona que los impuestos de toda la población financien misiones cuyos contratos y patentes quedan en manos de consorcios o potencias tecnológicas.',
  },
  {
    id: 'valor-conocimiento',
    nombre: 'Valor epistémico de la ciencia',
    categoria: 'Enfoque especializado',
    resumenCorto: 'Defiende que comprender el universo tiene valor por sí mismo.',
    definicion:
      'Distingue entre la utilidad práctica de la ciencia y su valor intrínseco: ampliar la comprensión humana del cosmos como parte esencial de la cultura.',
    autores: ['Aristóteles', 'Karl Popper', 'Carl Sagan', 'Philip Kitcher'],
    principiosCentrales: [
      'El saber fundamental vale por sí mismo, no solo por su rentabilidad.',
      'Exigir utilidad inmediata destruiría la ciencia básica.',
      'Armonizar la investigación con la deliberación democrática.',
    ],
    preguntasHabituales: [
      'Si una investigación no produjera beneficios prácticos, ¿seguiría siendo valioso financiarla?',
      '¿Cómo defender el valor del saber ante quienes exigen utilidad inmediata?',
    ],
    ejemploEspacial:
      'Buscar vida pasada en Marte o observar galaxias lejanas responde preguntas fundamentales de la humanidad más allá del lucro.',
  },
  {
    id: 'etica-ambiental-espacial',
    nombre: 'Sostenibilidad espacial',
    categoria: 'Enfoque especializado',
    resumenCorto: 'Promueve el cuidado de las órbitas y de otros cuerpos celestes.',
    definicion:
      'Cuestiona tratar el espacio como un depósito infinito de desechos o una mina sin reglas, exigiendo precaución ante daños irreversibles.',
    autores: ['Hans Jonas', 'Holmes Rolston III', 'Tony Milligan'],
    principiosCentrales: [
      'Principio de precaución ante colisiones orbitales o contaminación planetaria.',
      'Preservar órbitas seguras y cielos oscuros para el futuro.',
    ],
    preguntasHabituales: [
      '¿Tenemos derecho a alterar irreversiblemente la órbita o la Luna?',
    ],
    ejemploEspacial:
      'Exige límites a la basura espacial y protección de cráteres lunares con valor científico único.',
  },
]

export const DILEMAS_CATALOGO = [
  {
    id: 'huellas-exploracion-espacial',
    titulo:
      '¿Bajo qué criterios y límites resulta éticamente aceptable alterar o dejar huellas en otros cuerpos celestes, y qué responsabilidades asume la humanidad ante el impacto de su presencia en el espacio?',
    subtitulo:
      'Materiales y residuos en la Luna y Marte: necesidad técnica, valor del entorno y responsabilidad futura.',
    tema: 'Ética ambiental espacial, residuos y objetos abandonados',
    modo3D: 'luna',
    tipoIlustracion: 'luna',
    esDirectrizAmbiental: true,
    destacado: true,
  },
  {
    id: 'uso-bienes-materiales-propiedad',
    titulo:
      '¿Qué principios éticos deberían regular el uso de bienes materiales extraterrestres y a qué objetivos deben subordinarse tales bienes?',
    subtitulo:
      'Minería lunar, memoriales privados y soberanía extraterrestre: libertarismo, justicia distributiva y bien común.',
    tema: 'Uso de bienes materiales extraterrestres y derecho de propiedad',
    modo3D: 'orbita',
    tipoIlustracion: 'recursos',
    esDirectrizUsoEspacio: true,
    destacado: true,
  },
  {
    id: 'uso-animales-investigacion-espacial',
    titulo:
      '¿Cómo debe conciliarse el valor moral de los animales con las necesidades científicas y de seguridad de la exploración espacial humana?',
    subtitulo:
      'Vuelos pioneros, adiestramiento aversivo, eutanasia post-misión y el principio de reemplazo: Bentham, Singer, Regan y Nussbaum.',
    tema: 'Bioética animal, experimentación espacial y derechos sintientes',
    modo3D: 'orbita',
    tipoIlustracion: 'animales',
    esDirectrizAnimales: true,
    destacado: true,
  },
]
