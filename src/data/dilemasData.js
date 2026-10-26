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
  {
    id: 'mision-marte',
    numero: '01',
    titulo: '¿Explorar Marte mientras existen urgencias en la Tierra?',
    subtitulo:
      'Un gobierno evalúa financiar una misión a Marte frente a necesidades urgentes en salud, educación y servicios básicos.',
    tema: 'Financiamiento espacial y justicia social',
    modo3D: 'marte',
    tipoIlustracion: 'exploracion',
    destacado: true,

    contexto: {
      escenario:
        'Un Estado considera destinar 4.500 millones de dólares de fondos públicos a una misión a Marte. Sus defensores destacan el avance científico y tecnológico; sus críticos cuestionan gastar esa suma cuando persisten carencias urgentes en hospitales, escuelas y servicios básicos.',
      conflictoEtico:
        'Atender de inmediato las necesidades sociales urgentes frente a impulsar el conocimiento científico y el desarrollo futuro.',
      evidenciaCientifica: [
        'El gasto espacial suele representar entre el 0,05 % y el 0,5 % del presupuesto público.',
        'Estudiar otros planetas ha sido clave para comprender el clima terrestre y desarrollar tecnologías médicas y de sensores.',
      ],
      supuestosEscenario: [
        'El presupuesto de la misión equivale al costo de modernizar la red nacional de atención primaria de salud.',
        'Los hallazgos científicos serán abiertos, pero los contratos industriales se concentrarán en el sector aeroespacial.',
      ],
    },

    actores: [
      {
        id: 'comunidad-cientifica',
        nombre: 'Comunidad científica',
        rol: 'Promotores de la misión',
        intereses: 'Investigar si hubo vida en Marte y desarrollar ciencia de frontera en el país.',
        argumentoCentral:
          '«Si esperáramos a resolver cada problema antes de investigar, jamás habríamos creado la ciencia que hoy nos permite solucionarlos.»',
      },
      {
        id: 'organizaciones-sociales',
        nombre: 'Salud y educación',
        rol: 'Prioridad social inmediata',
        intereses: 'Financiar hospitales, escuelas y servicios básicos urgentes.',
        argumentoCentral:
          '«Las carencias en salud y educación causan daño hoy; financiar Marte con impuestos generales posterga deberes urgentes.»',
      },
      {
        id: 'ciudadania-contribuyente',
        nombre: 'Ciudadanía',
        rol: 'Contribuyentes',
        intereses: 'Transparencia fiscal, servicios públicos dignos y participación en las prioridades.',
        argumentoCentral:
          '«Quienes pagamos impuestos debemos decidir qué prioridades se financian y quiénes reciben sus beneficios.»',
      },
    ],

    capsulas: [
      {
        titulo: 'Costo espacial vs. presupuesto público',
        contenido:
          'Una misión a Marte cuesta unos 4.500 millones de dólares a lo largo de 10 años: una fracción pequeña del presupuesto total, pero equivalente a decenas de hospitales.',
      },
      {
        titulo: 'Ciencia básica y utilidad imprevista',
        contenido:
          'Descubrimientos teóricos sin utilidad aparente al inicio —como la relatividad para el GPS— terminaron siendo indispensables décadas después.',
      },
    ],

    nodoInicialId: 'nodo_inicial',
    nodosDialogo: {
      nodo_inicial: {
        id: 'nodo_inicial',
        etiquetaPaso: 'Pregunta 1 de 3',
        tipo: 'alternativa',
        pregunta:
          '¿Consideras justificable que un Estado financie una misión a Marte mientras existen necesidades sociales importantes?',
        perspectivaRelacionada: 'Punto de partida',
        infoComplementaria: 'Elige una opción para abrir la siguiente pregunta del diálogo.',
        alternativas: [
          {
            id: 'ruta_a_si',
            etiquetaCorta: 'Sí',
            texto: 'Es justificable financiar la misión a Marte aunque existan necesidades pendientes.',
            principioSugerido: 'Valor del conocimiento científico e impulso al futuro',
            siguienteNodoId: 'rama_a_profundizacion',
          },
          {
            id: 'ruta_b_no',
            etiquetaCorta: 'No',
            texto: 'No es justificable mientras persistan necesidades urgentes en la Tierra.',
            principioSugerido: 'Prioridad moral de las necesidades básicas urgentes',
            siguienteNodoId: 'rama_b_profundizacion',
          },
          {
            id: 'ruta_c_depende',
            etiquetaCorta: 'Depende',
            texto: 'Solo es justificable si se cumplen ciertas condiciones previas.',
            principioSugerido: 'Equilibrio condicional entre derechos básicos y ciencia',
            siguienteNodoId: 'rama_c_profundizacion',
          },
        ],
      },

      // --- RUTA A: SÍ ---
      rama_a_profundizacion: {
        id: 'rama_a_profundizacion',
        etiquetaPaso: 'Pregunta 2 de 3 · Ruta Sí',
        tipo: 'alternativa',
        pregunta:
          '¿Qué hace que la búsqueda de conocimiento científico sea razón suficiente para destinar recursos públicos?',
        perspectivaRelacionada: 'Valor epistémico vs. Utilitarismo',
        alternativas: [
          {
            id: 'a1_valor_intrinseco',
            etiquetaCorta: 'El saber vale por sí mismo',
            texto: 'Comprender el universo tiene valor propio, más allá de su utilidad inmediata.',
            principioSugerido: 'Valor intrínseco del conocimiento científico',
            siguienteNodoId: 'rama_a1_seguimiento',
          },
          {
            id: 'a2_beneficios_futuros',
            etiquetaCorta: 'Genera avances futuros',
            texto: 'Impulsa innovaciones tecnológicas y médicas que beneficiarán a la humanidad.',
            principioSugerido: 'Beneficio colectivo futuro mediante la innovación',
            siguienteNodoId: 'rama_a2_seguimiento',
          },
          {
            id: 'a3_coexistencia_presupuestaria',
            etiquetaCorta: 'Ambos gastos son compatibles',
            texto: 'Representa una fracción menor del presupuesto y no impide atender el gasto social.',
            principioSugerido: 'Equilibrio entre deberes presentes e inversión futura',
            siguienteNodoId: 'rama_a3_seguimiento',
          },
        ],
      },

      rama_a1_seguimiento: {
        id: 'rama_a1_seguimiento',
        etiquetaPaso: 'Pregunta 3 de 3 · Seguimiento',
        tipo: 'alternativa',
        pregunta:
          'Si una investigación nunca produjera beneficios prácticos, ¿seguiría siendo valioso financiarla con fondos públicos?',
        perspectivaRelacionada: 'Caso límite',
        alternativas: [
          {
            id: 'a1_sigue_siendo_valioso',
            etiquetaCorta: 'Sí, sigue siendo valioso',
            texto: 'Igual que el arte o la filosofía, el saber humano no se reduce a utilidad material.',
            siguienteNodoId: 'rama_a_abierta',
          },
          {
            id: 'a1_requiere_algun_beneficio',
            etiquetaCorta: 'Requiere retorno social',
            texto: 'Si usa grandes fondos públicos, debe aportar también beneficios educativos o sociales.',
            siguienteNodoId: 'rama_a_abierta',
          },
        ],
      },

      rama_a2_seguimiento: {
        id: 'rama_a2_seguimiento',
        etiquetaPaso: 'Pregunta 3 de 3 · Seguimiento',
        tipo: 'alternativa',
        pregunta:
          'Si esos beneficios futuros son inciertos y tardan décadas, ¿por qué deberían pagarlos hoy personas con urgencias actuales?',
        perspectivaRelacionada: 'Utilitarismo y Justicia distributiva',
        alternativas: [
          {
            id: 'a2_inversion_intergeneracional',
            etiquetaCorta: 'Deber con las próximas generaciones',
            texto: 'Sin ciencia de frontera hoy, el futuro tendrá menos herramientas frente a grandes crisis.',
            siguienteNodoId: 'rama_a_abierta',
          },
          {
            id: 'a2_condicionar_transferencia',
            etiquetaCorta: 'Exigir transferencia inmediata',
            texto: 'La misión debe compartir desde el inicio sus desarrollos con hospitales y servicios públicos.',
            siguienteNodoId: 'rama_a_abierta',
          },
        ],
      },

      rama_a3_seguimiento: {
        id: 'rama_a3_seguimiento',
        etiquetaPaso: 'Pregunta 3 de 3 · Seguimiento',
        tipo: 'alternativa',
        pregunta:
          'Aunque sea un porcentaje menor, cada millón invertido en Marte deja de usarse hoy en un hospital. ¿Cómo justificas esa prioridad?',
        perspectivaRelacionada: 'Costo de oportunidad',
        alternativas: [
          {
            id: 'a3_desarrollo_integral',
            etiquetaCorta: 'El país necesita ciencia propia',
            texto: 'Cancelar la ciencia debilita el desarrollo técnico y económico que sostiene al propio Estado.',
            siguienteNodoId: 'rama_a_abierta',
          },
          {
            id: 'a3_reorte_otras_partidas',
            etiquetaCorta: 'Recortar gastos superfluos',
            texto: 'Los recursos para salud deben salir de gastos militares o superfluos, no de la ciencia.',
            siguienteNodoId: 'rama_a_abierta',
          },
        ],
      },

      rama_a_abierta: {
        id: 'rama_a_abierta',
        etiquetaPaso: 'Síntesis de tu rama',
        tipo: 'respuesta_abierta',
        pregunta:
          '¿Cómo defenderías el valor del conocimiento ante quienes exigen beneficios inmediatos?',
        perspectivaRelacionada: 'Tu argumento',
        placeholder: 'Escribe tu argumento en 2 o 3 líneas...',
        siguienteNodoId: 'fin_dialogo',
      },

      // --- RUTA B: NO ---
      rama_b_profundizacion: {
        id: 'rama_b_profundizacion',
        etiquetaPaso: 'Pregunta 2 de 3 · Ruta No',
        tipo: 'alternativa',
        pregunta:
          '¿Deberíamos suspender toda investigación que no atienda necesidades inmediatas?',
        perspectivaRelacionada: 'Alcance de la prioridad social',
        alternativas: [
          {
            id: 'b1_esperar_toda_no_esencial',
            etiquetaCorta: 'Sí, la ciencia no esencial debe esperar',
            texto: 'Mientras haya carencias vitales, todo proyecto costoso no esencial debe postergarse.',
            principioSugerido: 'Prioridad absoluta de las necesidades vitales urgentes',
            siguienteNodoId: 'rama_b1_seguimiento',
          },
          {
            id: 'b2_solo_ciencia_aplicada',
            etiquetaCorta: 'Financiar solo ciencia útil a la Tierra',
            texto: 'Priorizar investigación médica, climática y satelital con impacto directo.',
            principioSugerido: 'Orientación social directa de la ciencia pública',
            siguienteNodoId: 'rama_b2_seguimiento',
          },
          {
            id: 'b3_solo_capital_privado',
            etiquetaCorta: 'Dejar Marte a la inversión privada',
            texto: 'No usar impuestos públicos; quien quiera explorar Marte debe hacerlo con capital privado.',
            principioSugerido: 'Reserva exclusiva del presupuesto público para fines sociales',
            siguienteNodoId: 'rama_b3_seguimiento',
          },
        ],
      },

      rama_b1_seguimiento: {
        id: 'rama_b1_seguimiento',
        etiquetaPaso: 'Pregunta 3 de 3 · Seguimiento',
        tipo: 'alternativa',
        pregunta:
          'Si siempre existieran necesidades urgentes, ¿significaría eso que nunca deberíamos explorar el espacio?',
        perspectivaRelacionada: 'Caso límite',
        alternativas: [
          {
            id: 'b1_aceptar_consecuencia',
            etiquetaCorta: 'Sí, primero está la vida digna',
            texto: 'Es preferible no ir a Marte que desatender a personas con necesidades básicas.',
            siguienteNodoId: 'rama_b_abierta',
          },
          {
            id: 'b1_umbral_minimo',
            etiquetaCorta: 'Explorar al lograr un piso digno',
            texto: 'No exige resolver todo, sino asegurar antes un piso mínimo de salud y educación.',
            siguienteNodoId: 'rama_b_abierta',
          },
        ],
      },

      rama_b2_seguimiento: {
        id: 'rama_b2_seguimiento',
        etiquetaPaso: 'Pregunta 3 de 3 · Seguimiento',
        tipo: 'alternativa',
        pregunta:
          'Muchos avances médicos nacieron de investigaciones sin utilidad aparente al inicio. ¿Cómo saber de antemano qué ciencia será útil?',
        perspectivaRelacionada: 'Filosofía de la ciencia',
        alternativas: [
          {
            id: 'b2_priorizar_probabilidad',
            etiquetaCorta: 'Invertir donde el impacto es directo',
            texto: 'Ante recursos escasos, es más seguro financiar medicina que esperar hallazgos indirectos.',
            siguienteNodoId: 'rama_b_abierta',
          },
          {
            id: 'b2_permitir_fraccion_basica',
            etiquetaCorta: 'Mantener ciencia básica de bajo costo',
            texto: 'Apoyar ciencia básica accesible, pero evitar megamisiones de miles de millones.',
            siguienteNodoId: 'rama_b_abierta',
          },
        ],
      },

      rama_b3_seguimiento: {
        id: 'rama_b3_seguimiento',
        etiquetaPaso: 'Pregunta 3 de 3 · Seguimiento',
        tipo: 'alternativa',
        pregunta:
          'Si solo empresas privadas exploran el espacio, ¿es aceptable que el conocimiento y los recursos queden bajo control corporativo?',
        perspectivaRelacionada: 'Bienes comunes',
        alternativas: [
          {
            id: 'b3_regular_privados',
            etiquetaCorta: 'Regular y cobrar impuestos',
            texto: 'Permitir inversión privada pero bajo reglas públicas e impuestos para gasto social.',
            siguienteNodoId: 'rama_b_abierta',
          },
          {
            id: 'b3_riesgo_monopolio',
            etiquetaCorta: 'Evitar monopolios privados',
            texto: 'Reconozco el riesgo: privatizar el espacio puede aumentar la desigualdad global.',
            siguienteNodoId: 'rama_b_abierta',
          },
        ],
      },

      rama_b_abierta: {
        id: 'rama_b_abierta',
        etiquetaPaso: 'Síntesis de tu rama',
        tipo: 'respuesta_abierta',
        pregunta:
          '¿Es aceptable renunciar indefinidamente a nuevos conocimientos por atender necesidades presentes?',
        perspectivaRelacionada: 'Tu argumento',
        placeholder: 'Escribe tu argumento en 2 o 3 líneas...',
        siguienteNodoId: 'fin_dialogo',
      },

      // --- RUTA C: DEPENDE ---
      rama_c_profundizacion: {
        id: 'rama_c_profundizacion',
        etiquetaPaso: 'Pregunta 2 de 3 · Ruta Depende',
        tipo: 'alternativa',
        pregunta: '¿Qué condición deberían cumplirse antes de financiar la misión a Marte?',
        perspectivaRelacionada: 'Condiciones de legitimidad',
        alternativas: [
          {
            id: 'c1_garantizar_derechos_basicos',
            etiquetaCorta: 'Garantizar servicios básicos primero',
            texto: 'Alcanzar un umbral mínimo de salud, educación y vivienda en la población.',
            principioSugerido: 'Umbral prioritario de derechos y servicios básicos',
            siguienteNodoId: 'rama_c1_seguimiento',
          },
          {
            id: 'c2_retorno_social_directo',
            etiquetaCorta: 'Exigir retorno tecnológico público',
            texto: 'Asegurar que las innovaciones de la misión se apliquen en hospitales y escuelas.',
            principioSugerido: 'Reciprocidad y transferencia tecnológica al sector público',
            siguienteNodoId: 'rama_c2_seguimiento',
          },
          {
            id: 'c3_cooperacion_y_deliberacion',
            etiquetaCorta: 'Cooperación y decisión ciudadana',
            texto: 'Compartir costos entre países y aprobar el gasto de forma democrática.',
            principioSugerido: 'Legitimidad democrática y cooperación internacional',
            siguienteNodoId: 'rama_c3_seguimiento',
          },
        ],
      },

      rama_c1_seguimiento: {
        id: 'rama_c1_seguimiento',
        etiquetaPaso: 'Pregunta 3 de 3 · Seguimiento',
        tipo: 'alternativa',
        pregunta:
          '¿Cómo determinar cuándo se han satisfecho suficientemente esas necesidades y qué umbral debería alcanzarse?',
        perspectivaRelacionada: 'Problema del umbral',
        alternativas: [
          {
            id: 'c1_indicadores_objetivos',
            etiquetaCorta: 'Fijar metas medibles por ley',
            texto: 'Exigir indicadores concretos como cero pobreza extrema y salud primaria universal.',
            siguienteNodoId: 'rama_c_abierta',
          },
          {
            id: 'c1_proporcionalidad_progresiva',
            etiquetaCorta: 'Regla de inversión proporcional',
            texto: 'Por cada dólar en exploración espacial, asegurar un monto mayor en gasto social.',
            siguienteNodoId: 'rama_c_abierta',
          },
        ],
      },

      rama_c2_seguimiento: {
        id: 'rama_c2_seguimiento',
        etiquetaPaso: 'Pregunta 3 de 3 · Seguimiento',
        tipo: 'alternativa',
        pregunta:
          'Si la misión tiene enorme valor científico pero no garantiza aplicaciones prácticas inmediatas, ¿debería descartarse?',
        perspectivaRelacionada: 'Ciencia pura vs. utilidad',
        alternativas: [
          {
            id: 'c2_mantener_exigencia_aplicada',
            etiquetaCorta: 'Sí, exigir utilidad práctica',
            texto: 'Con urgencias pendientes, el dinero público debe exigir retornos concretos.',
            siguienteNodoId: 'rama_c_abierta',
          },
          {
            id: 'c2_combinar_ciencia_y_retorno',
            etiquetaCorta: 'Valorar también educación y talento',
            texto: 'Formar científicos locales y abrir los datos ya cuenta como retorno social.',
            siguienteNodoId: 'rama_c_abierta',
          },
        ],
      },

      rama_c3_seguimiento: {
        id: 'rama_c3_seguimiento',
        etiquetaPaso: 'Pregunta 3 de 3 · Seguimiento',
        tipo: 'alternativa',
        pregunta:
          'Si en una votación ciudadana la mayoría decide eliminar toda la ciencia básica, ¿debería aceptarse?',
        perspectivaRelacionada: 'Democracia y ciencia',
        alternativas: [
          {
            id: 'c3_respetar_soberania',
            etiquetaCorta: 'Sí, respetar la decisión ciudadana',
            texto: 'La ciudadanía tiene derecho a decidir las prioridades del presupuesto público.',
            siguienteNodoId: 'rama_c_abierta',
          },
          {
            id: 'c3_piso_protegido_ciencia',
            etiquetaCorta: 'Proteger un piso mínimo científico',
            texto: 'Asegurar una base para la ciencia y consultar solo las megamisiones costosas.',
            siguienteNodoId: 'rama_c_abierta',
          },
        ],
      },

      rama_c_abierta: {
        id: 'rama_c_abierta',
        etiquetaPaso: 'Síntesis de tu rama',
        tipo: 'respuesta_abierta',
        pregunta: '¿Quién definiría ese umbral y qué ocurriría si nunca se alcanza?',
        perspectivaRelacionada: 'Tu argumento',
        placeholder: 'Escribe tu argumento en 2 o 3 líneas...',
        siguienteNodoId: 'fin_dialogo',
      },
    },

    experimentosMentales: [
      {
        id: 'exp_valor_cientifico_puro',
        titulo: '1. Valor científico puro sin aplicación práctica',
        escenarioHipotetico:
          'La misión tiene un enorme valor científico (confirmar si hubo vida en Marte), pero ninguna aplicación práctica ni económica conocida.',
        pregunta: '¿Mantienes tu postura bajo esta condición?',
        tensionFilosofica: 'Valor intrínseco vs. utilidad práctica.',
      },
      {
        id: 'exp_avances_medicos_baja_probabilidad',
        titulo: '2. Avance médico con baja probabilidad',
        escenarioHipotetico:
          'La misión podría producir avances médicos importantes para la Tierra, aunque su probabilidad de éxito es baja (20 %).',
        pregunta: '¿Justifica ese posible avance asumir el riesgo con fondos públicos?',
        tensionFilosofica: 'Beneficio incierto vs. necesidad segura.',
      },
      {
        id: 'exp_equivalencia_servicios_publicos',
        titulo: '3. Equivalencia directa con servicios públicos',
        escenarioHipotetico:
          'El presupuesto de la misión equivale exactamente al costo de mejorar la red de salud primaria y agua potable rural del país.',
        pregunta: '¿Cambia tu evaluación ante este costo de oportunidad directo?',
        tensionFilosofica: 'Urgencias inmediatas vs. largo plazo.',
      },
      {
        id: 'exp_empresa_privada_infraestructura_publica',
        titulo: '4. Empresa privada con infraestructura pública',
        escenarioHipotetico:
          'La misión es financiada por una empresa privada, pero utiliza infraestructura pública y reclama las patentes obtenidas.',
        pregunta: '¿Aceptarías este modelo para ahorrar gasto estatal?',
        tensionFilosofica: 'Ahorro fiscal vs. privatización del saber.',
      },
      {
        id: 'exp_concentracion_paises_avanzados',
        titulo: '5. Beneficios en países avanzados',
        escenarioHipotetico:
          'Todos los países aportan al presupuesto, pero los beneficios tecnológicos se concentran en los países más avanzados.',
        pregunta: '¿Debería participar un país con urgencias sociales bajo ese reparto?',
        tensionFilosofica: 'Justicia distributiva internacional.',
      },
    ],

    perspectivas: {
      utilitarismo: {
        nombre: 'Utilitarismo',
        subtitulo: 'Bienestar general y consecuencias',
        autores: 'Bentham · Mill · Singer',
        interpretacion:
          'Compara el bienestar futuro que pueden generar los descubrimientos espaciales frente al alivio seguro e inmediato del sufrimiento actual en la Tierra.',
        posturasPosibles: [
          {
            postura: 'A favor por impacto futuro',
            razon: 'Las tecnologías espaciales pueden beneficiar a millones a largo plazo.',
          },
          {
            postura: 'En contra por urgencia actual',
            razon: 'Invertir hoy en salud reduce sufrimiento de manera inmediata y segura.',
          },
        ],
        preguntasPropias: [
          '¿Cómo comparar beneficios futuros e inciertos con necesidades actuales?',
        ],
        objecion:
          '¿Puede una promesa lejana para la humanidad justificar que hoy no se atienda a quienes sufren carencias evitables?',
      },
      deontologia: {
        nombre: 'Deontología',
        subtitulo: 'Deberes y derechos fundamentales',
        autores: 'Kant · Korsgaard · Ross',
        interpretacion:
          'Pregunta qué obligaciones morales deben respetarse con independencia de los resultados: asegurar derechos básicos y cultivar el conocimiento humano.',
        posturasPosibles: [
          {
            postura: 'Prioridad de deberes básicos',
            razon: 'El Estado no debe postergar los derechos fundamentales de sus ciudadanos.',
          },
          {
            postura: 'Deber de cultivar el saber',
            razon: 'Desarrollar la ciencia es parte de nuestra responsabilidad racional.',
          },
        ],
        preguntasPropias: [
          '¿Qué obligaciones deben respetarse con independencia de los resultados?',
        ],
        objecion:
          '¿Se respeta la dignidad de las personas vulnerables si financian con impuestos misiones cuyos beneficios no recibirán?',
      },
      justiciaDistributiva: {
        nombre: 'Justicia distributiva',
        subtitulo: 'Reparto justo de costos y beneficios',
        autores: 'Rawls · Sen · Nussbaum',
        interpretacion:
          'Examina quién asume los costos fiscales de la misión y quién captura sus beneficios tecnológicos, científicos y económicos.',
        posturasPosibles: [
          {
            postura: 'Crítica a la desigualdad',
            razon: 'Toda la población paga, pero las rentas tecnológicas quedan en pocos sectores.',
          },
          {
            postura: 'Apoyo con retorno social',
            razon: 'Es justa si se financia progresivamente y transfiere tecnología al sector público.',
          },
        ],
        preguntasPropias: [
          '¿Por qué toda la población debería asumir los costos si los beneficios se concentran en ciertos sectores?',
        ],
        objecion:
          '¿Es suficiente que una misión beneficie a la humanidad en general si sus costos recaen sobre personas con necesidades mucho más urgentes?',
      },
    },

    objecionesPorRuta: {
      ruta_a_si: {
        titulo: 'Objeción a tu postura (Ruta Sí)',
        posturaDetectada:
          'Defiendes financiar la misión por el valor de la ciencia o sus beneficios futuros.',
        objecionPrincipal:
          '«¿Es suficiente que una actividad pueda beneficiar a la humanidad en general si sus costos recaen hoy sobre personas con necesidades mucho más urgentes?»',
        perspectivaObjecion: 'Justicia distributiva',
      },
      ruta_b_no: {
        titulo: 'Objeción a tu postura (Ruta No)',
        posturaDetectada:
          'Sostienes que no debe financiarse Marte mientras existan urgencias en la Tierra.',
        objecionPrincipal:
          '«Como siempre existirán problemas urgentes por resolver, esperar a solucionarlos todos significaría renunciar para siempre a la ciencia básica y a explorar el universo.»',
        perspectivaObjecion: 'Valor epistémico de la ciencia',
      },
      ruta_c_depende: {
        titulo: 'Objeción a tu postura (Ruta Depende)',
        posturaDetectada:
          'Condicionas la misión a alcanzar primero un umbral social o retornos garantizados.',
        objecionPrincipal:
          '«Los estándares sociales cambian continuamente y la ciencia básica no puede garantizar de antemano qué aplicaciones producirá. ¿No se vuelve tu condición imposible de cumplir?»',
        perspectivaObjecion: 'Filosofía de la ciencia',
      },
    },
  },

  // =========================================================================
  // CASO 02: OCUPACIÓN DE LA ÓRBITA TERRESTRE
  // =========================================================================
  {
    id: 'ocupacion-orbita',
    numero: '02',
    titulo: '¿Quién tiene derecho a ocupar la órbita terrestre?',
    subtitulo:
      'Megaconstelaciones satelitales para internet global frente a la pérdida del cielo astronómico y la saturación orbital.',
    tema: 'Sostenibilidad orbital y astronomía',
    modo3D: 'orbita',
    tipoIlustracion: 'orbita',
    destacado: false,

    contexto: {
      escenario:
        'Una empresa solicita desplegar 15.000 satélites en órbita baja para ofrecer internet en zonas aisladas. Astrónomos y agencias espaciales advierten que sus estelas luminosas degradan la observación del universo y saturan órbitas comunes.',
      conflictoEtico:
        'Conectar hoy a comunidades aisladas frente a proteger el cielo nocturno y la seguridad de un espacio orbital común.',
      evidenciaCientifica: [
        'Los satélites activos en órbita baja superaron los 10.000 en pocos años.',
        'Sus trazas luminosas afectan hasta el 30 % de las capturas astronómicas crepusculares.',
      ],
      supuestosEscenario: [
        'La red conectaría a 2.500 escuelas rurales, pero reducir su brillo aumentaría un 25 % el costo.',
        'No existe aún un tratado que fije cuotas máximas de órbita por empresa o país.',
      ],
    },

    actores: [
      {
        id: 'comunidad-astronomica',
        nombre: 'Comunidad astronómica',
        rol: 'Observatorios científicos',
        intereses: 'Conservar cielos oscuros para investigar el cosmos y detectar asteroides.',
        argumentoCentral: '«Ninguna empresa privada tiene derecho a cegar la ventana científica de la humanidad.»',
      },
      {
        id: 'operadores-satelitales',
        nombre: 'Operadores satelitales',
        rol: 'Telecomunicaciones',
        intereses: 'Cobertura global rápida para educación, salud y servicios digitales.',
        argumentoCentral: '«Conectar a millones de personas aisladas es más urgente que evitar trazas ópticas.»',
      },
      {
        id: 'comunidades-rurales',
        nombre: 'Comunidades rurales',
        rol: 'Usuarios y guardianes del cielo',
        intereses: 'Acceso a internet asequible sin perder el patrimonio cultural del cielo nocturno.',
        argumentoCentral: '«Necesitamos conectividad a precios justos, pero cuidando el cielo como bien común.»',
      },
    ],

    capsulas: [
      {
        titulo: 'Reflejo solar en órbita baja',
        contenido:
          'A 500 km de altura los satélites reflejan la luz del Sol horas después del atardecer, dejando líneas brillantes en los telescopios.',
      },
    ],

    nodoInicialId: 'nodo_inicial',
    nodosDialogo: {
      nodo_inicial: {
        id: 'nodo_inicial',
        etiquetaPaso: 'Pregunta 1 de 2',
        tipo: 'alternativa',
        pregunta:
          '¿Es justificable autorizar megaconstelaciones satelitales para dar internet global aunque alteren el cielo astronómico?',
        perspectivaRelacionada: 'Punto de partida',
        alternativas: [
          {
            id: 'ruta_a_si',
            etiquetaCorta: 'Sí',
            texto: 'Conectar a comunidades aisladas tiene prioridad sobre las restricciones orbitales.',
            principioSugerido: 'Prioridad del beneficio social de conectividad',
            siguienteNodoId: 'rama_a_profundizacion',
          },
          {
            id: 'ruta_b_no',
            etiquetaCorta: 'No',
            texto: 'Ninguna empresa debe saturar la órbita ni degradar la observación científica.',
            principioSugerido: 'Protección de la órbita y el cielo como bien común',
            siguienteNodoId: 'rama_b_profundizacion',
          },
          {
            id: 'ruta_c_depende',
            etiquetaCorta: 'Depende',
            texto: 'Solo con límites estrictos de brillo, cuotas orbitales y tarifas sociales.',
            principioSugerido: 'Regulación vinculante y mitigación técnica',
            siguienteNodoId: 'rama_c_profundizacion',
          },
        ],
      },
      rama_a_profundizacion: {
        id: 'rama_a_profundizacion',
        etiquetaPaso: 'Pregunta 2 de 2 · Ruta Sí',
        tipo: 'alternativa',
        pregunta:
          'Si las primeras empresas ocupan las órbitas más seguras, ¿qué ocurre con los países que quieran lanzar satélites en el futuro?',
        perspectivaRelacionada: 'Justicia distributiva',
        alternativas: [
          {
            id: 'a1_innovacion_compensa',
            etiquetaCorta: 'El servicio global lo compensa',
            texto: 'Lo importante es que el servicio conecte a las personas hoy.',
            siguienteNodoId: 'rama_a_abierta',
          },
          {
            id: 'a2_reservar_cuotas',
            etiquetaCorta: 'Reservar cuotas para otros países',
            texto: 'Autorizar el despliegue pero reservando espacio orbital para países emergentes.',
            siguienteNodoId: 'rama_a_abierta',
          },
        ],
      },
      rama_a_abierta: {
        id: 'rama_a_abierta',
        etiquetaPaso: 'Síntesis de tu rama',
        tipo: 'respuesta_abierta',
        pregunta: '¿Cómo justificarías ante las generaciones futuras la alteración del cielo oscuro?',
        perspectivaRelacionada: 'Tu argumento',
        placeholder: 'Escribe tu argumento en 2 o 3 líneas...',
        siguienteNodoId: 'fin_dialogo',
      },
      rama_b_profundizacion: {
        id: 'rama_b_profundizacion',
        etiquetaPaso: 'Pregunta 2 de 2 · Ruta No',
        tipo: 'alternativa',
        pregunta:
          'Si rechazas la megaconstelación, ¿qué alternativa ofreces a las zonas rurales sin internet?',
        perspectivaRelacionada: 'Necesidades actuales',
        alternativas: [
          {
            id: 'b1_alternativas_terrestres',
            etiquetaCorta: 'Redes terrestres y menos satélites',
            texto: 'Usar fibra óptica y constelaciones pequeñas sin inundar la órbita.',
            siguienteNodoId: 'rama_b_abierta',
          },
          {
            id: 'b2_moratoria_internacional',
            etiquetaCorta: 'Esperar un tratado internacional',
            texto: 'Pausar los lanzamientos masivos hasta acordar reglas globales justas.',
            siguienteNodoId: 'rama_b_abierta',
          },
        ],
      },
      rama_b_abierta: {
        id: 'rama_b_abierta',
        etiquetaPaso: 'Síntesis de tu rama',
        tipo: 'respuesta_abierta',
        pregunta: '¿Por qué el cielo nocturno y la órbita no deben sacrificarse por telecomunicaciones?',
        perspectivaRelacionada: 'Tu argumento',
        placeholder: 'Escribe tu argumento en 2 o 3 líneas...',
        siguienteNodoId: 'fin_dialogo',
      },
      rama_c_profundizacion: {
        id: 'rama_c_profundizacion',
        etiquetaPaso: 'Pregunta 2 de 2 · Ruta Depende',
        tipo: 'alternativa',
        pregunta:
          'Si exigir satélites oscuros encarece el servicio para zonas rurales, ¿quién debe asumir ese costo?',
        perspectivaRelacionada: 'Distribución de costos',
        alternativas: [
          {
            id: 'c1_absorber_empresa',
            etiquetaCorta: 'La empresa operadora',
            texto: 'Quien usa un bien común debe asumir el costo de no dañarlo.',
            siguienteNodoId: 'rama_c_abierta',
          },
          {
            id: 'c2_cofinanciamiento_publico',
            etiquetaCorta: 'Subsidio público con reglas',
            texto: 'El Estado puede subsidiar zonas rurales exigiendo protección astronómica.',
            siguienteNodoId: 'rama_c_abierta',
          },
        ],
      },
      rama_c_abierta: {
        id: 'rama_c_abierta',
        etiquetaPaso: 'Síntesis de tu rama',
        tipo: 'respuesta_abierta',
        pregunta: '¿Quién debería fijar el límite de satélites en órbita y bajo qué criterios?',
        perspectivaRelacionada: 'Tu argumento',
        placeholder: 'Escribe tu argumento en 2 o 3 líneas...',
        siguienteNodoId: 'fin_dialogo',
      },
    },

    experimentosMentales: [
      {
        id: 'exp_orb_1',
        titulo: '1. Uso mayoritario para finanzas de alta velocidad',
        escenarioHipotetico:
          'El 85 % de la red se usará para transacciones bursátiles rápidas en países ricos y solo el 15 % para zonas rurales.',
        pregunta: '¿Mantienes tu postura sobre autorizar el uso de la órbita?',
        tensionFilosofica: 'Necesidad social vs. lucro privado.',
      },
      {
        id: 'exp_orb_2',
        titulo: '2. Dificultad para detectar asteroides peligrosos',
        escenarioHipotetico:
          'Las trazas luminosas reducen en un 40 % la capacidad de detectar a tiempo asteroides con riesgo de impacto.',
        pregunta: '¿Cambia tu evaluación ante este riesgo planetario?',
        tensionFilosofica: 'Conectividad vs. seguridad colectiva.',
      },
    ],

    perspectivas: {
      utilitarismo: {
        nombre: 'Utilitarismo',
        subtitulo: 'Conectividad frente a riesgo orbital',
        autores: 'Mill · Singer',
        interpretacion:
          'Pondera el beneficio de conectar zonas aisladas frente al daño a la astronomía y el riesgo de colisiones.',
        posturasPosibles: [
          {
            postura: 'Despliegue mínimo necesario',
            razon: 'Permitir solo los satélites indispensables con bajo brillo.',
          },
        ],
        preguntasPropias: [
          '¿El beneficio del internet satelital compensa degradar la observación del universo?',
        ],
        objecion: 'Priorizar solo la comodidad actual puede arruinar la órbita para las próximas generaciones.',
      },
      deontologia: {
        nombre: 'Deontología',
        subtitulo: 'Respeto a los bienes comunes',
        autores: 'Kant · Ostrom',
        interpretacion:
          'Ningún actor debe apropiarse unilateralmente de una órbita común bajo una regla que colapsaría el espacio si todos la imitaran.',
        posturasPosibles: [
          {
            postura: 'Deber de no saturar la órbita',
            razon: 'La órbita no pertenece a quien llega primero.',
          },
        ],
        preguntasPropias: [
          '¿Podrían todas las empresas lanzar 15.000 satélites sin destruir la seguridad orbital?',
        ],
        objecion: 'No es legítimo invocar a comunidades rurales sin garantizarles acceso real ni cuidar el cielo.',
      },
      justiciaDistributiva: {
        nombre: 'Justicia distributiva',
        subtitulo: 'Equidad en el acceso a la órbita',
        autores: 'Rawls · Sen',
        interpretacion:
          'Cuestiona que empresas privadas capturen las mejores órbitas mientras socializan la pérdida del cielo oscuro.',
        posturasPosibles: [
          {
            postura: 'Cuotas orbitales y tarifa social',
            razon: 'Reservar capacidad orbital para países en desarrollo.',
          },
        ],
        preguntasPropias: [
          '¿Por qué toda la humanidad asume el costo ambiental si las ganancias son privadas?',
        ],
        objecion: 'El principio de «primero en llegar» excluye del espacio a los países en desarrollo.',
      },
    },

    objecionesPorRuta: {
      ruta_a_si: {
        titulo: 'Objeción a tu postura (Ruta Sí)',
        posturaDetectada: 'Priorizas el despliegue satelital por sus beneficios de conectividad.',
        objecionPrincipal:
          '«Si una sola corporación ocupa miles de posiciones orbitales, ¿no privatiza de hecho un bien común e impide el acceso futuro de otros países?»',
        perspectivaObjecion: 'Justicia distributiva',
      },
      ruta_b_no: {
        titulo: 'Objeción a tu postura (Ruta No)',
        posturaDetectada: 'Defiendes bloquear la megaconstelación para proteger el cielo y la órbita.',
        objecionPrincipal:
          '«Para comunidades aisladas sin fibra óptica, el internet satelital significa educación y telemedicina hoy. ¿Es justo negarles ese acceso?»',
        perspectivaObjecion: 'Utilitarismo',
      },
      ruta_c_depende: {
        titulo: 'Objeción a tu postura (Ruta Depende)',
        posturaDetectada: 'Autorizas la red bajo condiciones técnicas y sociales.',
        objecionPrincipal:
          '«Sin una autoridad espacial con poder de sanción, las empresas pueden registrar sus satélites en países con reglas laxas. ¿Cómo evitar que tus condiciones sean letra muerta?»',
        perspectivaObjecion: 'Gobernanza global',
      },
    },
  },

  // =========================================================================
  // CASO 03: BASURA ESPACIAL
  // =========================================================================
  {
    id: 'basura-espacial',
    numero: '03',
    titulo: '¿Quién debe hacerse cargo de la basura espacial?',
    subtitulo:
      '¿Deben pagar la limpieza orbital quienes contaminaron históricamente o todos los países que hoy usan el espacio?',
    tema: 'Responsabilidad histórica y riesgo orbital',
    modo3D: 'basura',
    tipoIlustracion: 'basura',
    destacado: false,

    contexto: {
      escenario:
        'Para evitar una cascada de colisiones (síndrome de Kessler), se propone un Fondo Mundial de Limpieza Orbital. Las potencias plantean que todos paguen una tasa igual por lanzamiento; los países emergentes exigen que paguen quienes generaron el 85 % de los desechos actuales.',
      conflictoEtico:
        'Urgencia de limpiar la órbita común frente a la justicia histórica («quien contaminó paga»).',
      evidenciaCientifica: [
        'Más de 36.000 fragmentos mayores a 10 cm orbitan a 28.000 km/h.',
        'Una colisión en cadena inutilizaría órbitas vitales para satélites climáticos y de comunicación.',
      ],
      supuestosEscenario: [
        'Retirar los 50 restos más peligrosos cuesta 3.000 millones de dólares anuales.',
        'Una tasa uniforme encarecería un 35 % el primer satélite climático de países emergentes.',
      ],
    },

    actores: [
      {
        id: 'potencias-espaciales',
        nombre: 'Potencias espaciales',
        rol: 'Actores históricos',
        intereses: 'Repartir el costo de limpieza entre todos los operadores actuales.',
        argumentoCentral: '«La seguridad orbital actual nos beneficia y exige aportes de todos por igual.»',
      },
      {
        id: 'paises-emergentes',
        nombre: 'Países emergentes',
        rol: 'Nuevos usuarios orbitales',
        intereses: 'Lanzar satélites de monitoreo climático y social sin pagar deuda ajena.',
        argumentoCentral: '«No es justo cobrar igual a quien lanza su primer satélite que a quien dejó miles de desechos.»',
      },
    ],

    capsulas: [
      {
        titulo: 'Síndrome de Kessler',
        contenido:
          'Escenario en que los choques entre objetos en órbita generan una reacción en cadena de fragmentos que vuelve intransitable el espacio cercano.',
      },
    ],

    nodoInicialId: 'nodo_inicial',
    nodosDialogo: {
      nodo_inicial: {
        id: 'nodo_inicial',
        etiquetaPaso: 'Pregunta 1 de 2',
        tipo: 'alternativa',
        pregunta:
          '¿Deben pagar la limpieza espacial únicamente las potencias y empresas que generaron históricamente los desechos?',
        perspectivaRelacionada: 'Punto de partida',
        alternativas: [
          {
            id: 'ruta_a_si',
            etiquetaCorta: 'Sí',
            texto: 'Quien generó la basura espacial y se benefició de ella debe pagar su retiro.',
            principioSugerido: 'Responsabilidad histórica («quien contamina paga»)',
            siguienteNodoId: 'rama_a_profundizacion',
          },
          {
            id: 'ruta_b_no',
            etiquetaCorta: 'No',
            texto: 'Todos los usuarios actuales deben aportar para evitar una catástrofe orbital.',
            principioSugerido: 'Corresponsabilidad pragmática ante una emergencia común',
            siguienteNodoId: 'rama_b_profundizacion',
          },
          {
            id: 'ruta_c_depende',
            etiquetaCorta: 'Depende',
            texto: 'Aportes diferenciados según el historial de desechos y la capacidad económica.',
            principioSugerido: 'Responsabilidades comunes pero diferenciadas',
            siguienteNodoId: 'rama_c_profundizacion',
          },
        ],
      },
      rama_a_profundizacion: {
        id: 'rama_a_profundizacion',
        etiquetaPaso: 'Pregunta 2 de 2 · Ruta Sí',
        tipo: 'alternativa',
        pregunta:
          'Si las potencias se niegan a pagar el 100 % y el riesgo de choque aumenta, ¿debemos esperar aunque colapse la órbita?',
        perspectivaRelacionada: 'Justicia vs. urgencia',
        alternativas: [
          {
            id: 'a1_sanciones_y_obligacion',
            etiquetaCorta: 'Bloquear nuevos lanzamientos',
            texto: 'Condicionar las licencias de las potencias a que retiren antes su basura.',
            siguienteNodoId: 'rama_a_abierta',
          },
          {
            id: 'a2_fondo_emergencia',
            etiquetaCorta: 'Limpiar ahora con deuda exigible',
            texto: 'Actuar de urgencia, pero cobrando legalmente la deuda a los responsables.',
            siguienteNodoId: 'rama_a_abierta',
          },
        ],
      },
      rama_a_abierta: {
        id: 'rama_a_abierta',
        etiquetaPaso: 'Síntesis de tu rama',
        tipo: 'respuesta_abierta',
        pregunta: '¿Por qué no debe diluirse la responsabilidad histórica aunque el riesgo afecte a todos?',
        perspectivaRelacionada: 'Tu argumento',
        placeholder: 'Escribe tu argumento en 2 o 3 líneas...',
        siguienteNodoId: 'fin_dialogo',
      },
      rama_b_profundizacion: {
        id: 'rama_b_profundizacion',
        etiquetaPaso: 'Pregunta 2 de 2 · Ruta No',
        tipo: 'alternativa',
        pregunta:
          'Si todos pagan igual al lanzar hoy, ¿no se penaliza injustamente a países pobres que no causaron el problema?',
        perspectivaRelacionada: 'Equidad internacional',
        alternativas: [
          {
            id: 'b1_prioridad_seguridad',
            etiquetaCorta: 'Todo nuevo satélite añade riesgo',
            texto: 'Quien use la órbita hoy debe cumplir el mismo estándar de seguridad.',
            siguienteNodoId: 'rama_b_abierta',
          },
          {
            id: 'b2_eximir_primeros_satelites',
            etiquetaCorta: 'Eximir satélites públicos básicos',
            texto: 'Cobrar a operadores comerciales y eximir los primeros satélites de países emergentes.',
            siguienteNodoId: 'rama_b_abierta',
          },
        ],
      },
      rama_b_abierta: {
        id: 'rama_b_abierta',
        etiquetaPaso: 'Síntesis de tu rama',
        tipo: 'respuesta_abierta',
        pregunta: '¿Por qué priorizas la eficacia inmediata de la limpieza sobre la culpa histórica?',
        perspectivaRelacionada: 'Tu argumento',
        placeholder: 'Escribe tu argumento en 2 o 3 líneas...',
        siguienteNodoId: 'fin_dialogo',
      },
      rama_c_profundizacion: {
        id: 'rama_c_profundizacion',
        etiquetaPaso: 'Pregunta 2 de 2 · Ruta Depende',
        tipo: 'alternativa',
        pregunta: '¿Qué criterio debe pesar más para calcular el aporte de cada país o empresa?',
        perspectivaRelacionada: 'Criterio distributivo',
        alternativas: [
          {
            id: 'c1_masa_en_orbita',
            etiquetaCorta: 'Cantidad de objetos en órbita',
            texto: 'Pagar en proporción directa a la masa y restos que cada actor mantiene en órbita.',
            siguienteNodoId: 'rama_c_abierta',
          },
          {
            id: 'c2_transferencia_tecnologica',
            etiquetaCorta: 'Financiamiento + tecnología abierta',
            texto: 'Que las potencias limpien restos antiguos y cedan tecnología a países emergentes.',
            siguienteNodoId: 'rama_c_abierta',
          },
        ],
      },
      rama_c_abierta: {
        id: 'rama_c_abierta',
        etiquetaPaso: 'Síntesis de tu rama',
        tipo: 'respuesta_abierta',
        pregunta: '¿Cómo lograrías que tanto las potencias como los países emergentes acepten tu regla?',
        perspectivaRelacionada: 'Tu argumento',
        placeholder: 'Escribe tu argumento en 2 o 3 líneas...',
        siguienteNodoId: 'fin_dialogo',
      },
    },

    experimentosMentales: [
      {
        id: 'exp_bas_1',
        titulo: '1. Tecnología limpiadora de doble uso militar',
        escenarioHipotetico:
          'Las naves con brazos robóticos para retirar basura también pueden usarse para capturar satélites de otros países.',
        pregunta: '¿Quién debería controlar esas naves limpiadoras?',
        tensionFilosofica: 'Limpieza orbital vs. seguridad geopolítica.',
      },
      {
        id: 'exp_bas_2',
        titulo: '2. Fragmento de origen desconocido',
        escenarioHipotetico:
          'Un resto antiguo no identificado amenaza con destruir mañana un satélite que alerta sobre huracanes.',
        pregunta: 'Cuando no se conoce al culpable, ¿quién debe pagar el rescate?',
        tensionFilosofica: 'Culpa histórica vs. protección inmediata de vidas.',
      },
    ],

    perspectivas: {
      utilitarismo: {
        nombre: 'Utilitarismo',
        subtitulo: 'Evitar el colapso orbital',
        autores: 'Bentham · Singer',
        interpretacion:
          'Busca reducir cuanto antes el riesgo de colisiones que destruirían satélites climáticos y de comunicación.',
        posturasPosibles: [
          {
            postura: 'Limpieza inmediata financiada por quienes pueden pagar',
            razon: 'Prioriza salvar la órbita sin demoras diplomáticas.',
          },
        ],
        preguntasPropias: ['¿Qué mecanismo logra retirar más basura peligrosa en menos tiempo?'],
        objecion: 'Ignorar la responsabilidad histórica premia a quienes contaminaron sin cuidado.',
      },
      deontologia: {
        nombre: 'Deontología',
        subtitulo: 'Deber de reparar el daño causado',
        autores: 'Kant · Jonas',
        interpretacion:
          'Quien genera un daño o riesgo en un espacio común tiene el deber moral directo de repararlo.',
        posturasPosibles: [
          {
            postura: 'Obligación estricta del contaminador',
            razon: 'No es moralmente legítimo transferir la propia culpa a terceros.',
          },
        ],
        preguntasPropias: ['¿Es justo cobrar a países inocentes por desechos que no lanzaron?'],
        objecion: '¿Qué hacer con los restos de hace 50 años cuyos responsables ya no existen?',
      },
      justiciaDistributiva: {
        nombre: 'Justicia distributiva',
        subtitulo: 'Cargas proporcionales y derecho al desarrollo',
        autores: 'Rawls · Shue',
        interpretacion:
          'Reparte el costo según la contribución histórica al problema y protege el acceso espacial de los países emergentes.',
        posturasPosibles: [
          {
            postura: 'Fondo progresivo con exención básica',
            razon: 'Aporta más quien más objetos lanzó y se protege el desarrollo emergente.',
          },
        ],
        preguntasPropias: ['¿Cómo limpiar la órbita sin bloquear el acceso de los países en desarrollo?'],
        objecion: 'Las disputas sobre porcentajes pueden retrasar una limpieza urgente.',
      },
    },

    objecionesPorRuta: {
      ruta_a_si: {
        titulo: 'Objeción a tu postura (Ruta Sí)',
        posturaDetectada: 'Exiges que paguen únicamente quienes generaron la basura histórica.',
        objecionPrincipal:
          '«Muchos restos peligrosos son huérfanos o de hace medio siglo. Si nadie asume su retiro, ¿dejaremos que colapse la órbita por mantener un principio rígido?»',
        perspectivaObjecion: 'Utilitarismo',
      },
      ruta_b_no: {
        titulo: 'Objeción a tu postura (Ruta No)',
        posturaDetectada: 'Propones que todos los usuarios actuales paguen para limpiar la órbita.',
        objecionPrincipal:
          '«Hacer que un país con necesidades urgentes pague sobrecostos por los cohetes que abandonaron las superpotencias obliga a los más vulnerables a subsidiar a los más ricos.»',
        perspectivaObjecion: 'Justicia distributiva',
      },
      ruta_c_depende: {
        titulo: 'Objeción a tu postura (Ruta Depende)',
        posturaDetectada: 'Planteas cuotas diferenciadas según historial y capacidad.',
        objecionPrincipal:
          '«En la crisis climática terrestre, discutir cuánto debe pagar cada país ha bloqueado acuerdos durante décadas. ¿Cómo evitar esa parálisis en la órbita?»',
        perspectivaObjecion: 'Pragmatismo ético',
      },
    },
  },

  // =========================================================================
  // CASO 04: RECURSOS DE LA LUNA
  // =========================================================================
  {
    id: 'recursos-luna',
    numero: '04',
    titulo: '¿Es ético explotar los recursos de la Luna?',
    subtitulo:
      'Extracción de hielo en el Polo Sur Lunar frente a la preservación científica y el patrimonio común.',
    tema: 'Minería lunar y bienes comunes',
    modo3D: 'luna',
    tipoIlustracion: 'luna',
    destacado: false,

    contexto: {
      escenario:
        'Agencias y empresas planean extraer hielo de agua en el Polo Sur Lunar para fabricar combustible espacial. Científicos advierten que esos cráteres guardan un registro único de 4.000 millones de años y que los primeros en instalarse acapararán los pocos sitios con agua y luz.',
      conflictoEtico:
        'Aprovechar recursos lunares para impulsar misiones frente a preservar un archivo científico irreemplazable y el acceso equitativo.',
      evidenciaCientifica: [
        'El hielo lunar se concentra en unos pocos cráteres oscuros a menos de -160 °C.',
        'Los picos con luz solar continua junto a esos cráteres abarcan apenas unos kilómetros cuadrados.',
      ],
      supuestosEscenario: [
        'La minería alteraría de forma irreversible el hielo cercano antes de su estudio científico.',
        'Las primeras bases establecerían zonas de exclusión sobre los cráteres más ricos.',
      ],
    },

    actores: [
      {
        id: 'consorcio-minero',
        nombre: 'Consorcios mineros',
        rol: 'Extracción de recursos',
        intereses: 'Producir agua y combustible en la Luna para abaratar los viajes espaciales.',
        argumentoCentral: '«Usar recursos del espacio es indispensable para no agotar los de la Tierra.»',
      },
      {
        id: 'cientificos-planetarios',
        nombre: 'Comunidad científica',
        rol: 'Ciencia planetaria',
        intereses: 'Estudiar el hielo primordial antes de que la actividad industrial lo contamine.',
        argumentoCentral: '«Esos cráteres son una biblioteca única del sistema solar; quemar su hielo es irreparable.»',
      },
      {
        id: 'naciones-sur-global',
        nombre: 'Países sin alunizaje',
        rol: 'Defensa del bien común',
        intereses: 'Evitar que los pocos sitios con agua sean acaparados por quienes lleguen primero.',
        argumentoCentral: '«Ocupar los únicos cráteres con agua y luz equivale a una apropiación de hecho.»',
      },
    ],

    capsulas: [
      {
        titulo: 'Tratado del Espacio Exterior (1967)',
        contenido:
          'Prohíbe reclamar soberanía nacional sobre la Luna, pero mantiene un vacío legal sobre la extracción comercial de sus recursos.',
      },
    ],

    nodoInicialId: 'nodo_inicial',
    nodosDialogo: {
      nodo_inicial: {
        id: 'nodo_inicial',
        etiquetaPaso: 'Pregunta 1 de 2',
        tipo: 'alternativa',
        pregunta:
          '¿Es justificable extraer hielo del Polo Sur Lunar aunque altere sitios científicos únicos y favorezca a quienes lleguen primero?',
        perspectivaRelacionada: 'Punto de partida',
        alternativas: [
          {
            id: 'ruta_a_si',
            etiquetaCorta: 'Sí',
            texto: 'Aprovechar los recursos lunares es necesario para el avance espacial.',
            principioSugerido: 'Uso de recursos extraterrestres para el progreso humano',
            siguienteNodoId: 'rama_a_profundizacion',
          },
          {
            id: 'ruta_b_no',
            etiquetaCorta: 'No',
            texto: 'La Luna debe preservarse como santuario científico y patrimonio común.',
            principioSugerido: 'Preservación científica e inalienabilidad de bienes comunes',
            siguienteNodoId: 'rama_b_profundizacion',
          },
          {
            id: 'ruta_c_depende',
            etiquetaCorta: 'Depende',
            texto: 'Solo bajo reglas internacionales que protejan zonas científicas y acceso justo.',
            principioSugerido: 'Gobernanza internacional y reservas científicas',
            siguienteNodoId: 'rama_c_profundizacion',
          },
        ],
      },
      rama_a_profundizacion: {
        id: 'rama_a_profundizacion',
        etiquetaPaso: 'Pregunta 2 de 2 · Ruta Sí',
        tipo: 'alternativa',
        pregunta:
          'Como los sitios con agua en la Luna son muy escasos, ¿qué ocurre con los países que aún no tienen tecnología para llegar?',
        perspectivaRelacionada: 'Justicia global',
        alternativas: [
          {
            id: 'a1_incentivo_inversion',
            etiquetaCorta: 'Premiar a quien asume el costo',
            texto: 'Quien invierte y arriesga para llegar primero merece prioridad de uso.',
            siguienteNodoId: 'rama_a_abierta',
          },
          {
            id: 'a2_compartir_infraestructura',
            etiquetaCorta: 'Obligación de compartir recursos',
            texto: 'Permitir la extracción, pero compartiendo agua y datos con misiones de otros países.',
            siguienteNodoId: 'rama_a_abierta',
          },
        ],
      },
      rama_a_abierta: {
        id: 'rama_a_abierta',
        etiquetaPaso: 'Síntesis de tu rama',
        tipo: 'respuesta_abierta',
        pregunta: '¿Por qué consideras legítimo transformar un entorno celeste intacto en fuente de recursos?',
        perspectivaRelacionada: 'Tu argumento',
        placeholder: 'Escribe tu argumento en 2 o 3 líneas...',
        siguienteNodoId: 'fin_dialogo',
      },
      rama_b_profundizacion: {
        id: 'rama_b_profundizacion',
        etiquetaPaso: 'Pregunta 2 de 2 · Ruta No',
        tipo: 'alternativa',
        pregunta:
          '¿Debería prohibirse incluso extraer agua en pequeña escala para sostener una base científica internacional?',
        perspectivaRelacionada: 'Límites de preservación',
        alternativas: [
          {
            id: 'b1_modelo_antartico',
            etiquetaCorta: 'Permitir solo uso científico mínimo',
            texto: 'Como en la Antártida: prohibir la minería comercial y permitir solo investigación.',
            siguienteNodoId: 'rama_b_abierta',
          },
          {
            id: 'b2_preservacion_total',
            etiquetaCorta: 'No tocar los cráteres con hielo',
            texto: 'Mantener intactos los cráteres polares hasta estudiarlos sin contaminación.',
            siguienteNodoId: 'rama_b_abierta',
          },
        ],
      },
      rama_b_abierta: {
        id: 'rama_b_abierta',
        etiquetaPaso: 'Síntesis de tu rama',
        tipo: 'respuesta_abierta',
        pregunta: '¿Qué valor ético o científico se perdería si tratamos a la Luna como una mina?',
        perspectivaRelacionada: 'Tu argumento',
        placeholder: 'Escribe tu argumento en 2 o 3 líneas...',
        siguienteNodoId: 'fin_dialogo',
      },
      rama_c_profundizacion: {
        id: 'rama_c_profundizacion',
        etiquetaPaso: 'Pregunta 2 de 2 · Ruta Depende',
        tipo: 'alternativa',
        pregunta:
          'Varias potencias planean alunizar antes de que exista un tratado global. ¿Qué debería hacerse mientras tanto?',
        perspectivaRelacionada: 'Gobernanza',
        alternativas: [
          {
            id: 'c1_moratoria_previa',
            etiquetaCorta: 'Moratoria hasta lograr el tratado',
            texto: 'Suspender toda extracción hasta acordar reglas multilaterales.',
            siguienteNodoId: 'rama_c_abierta',
          },
          {
            id: 'c2_cuotas_provisionales',
            etiquetaCorta: 'Proteger ya los cráteres principales',
            texto: 'Declarar reservas científicas intangibles y permitir pruebas en una sola zona.',
            siguienteNodoId: 'rama_c_abierta',
          },
        ],
      },
      rama_c_abierta: {
        id: 'rama_c_abierta',
        etiquetaPaso: 'Síntesis de tu rama',
        tipo: 'respuesta_abierta',
        pregunta: '¿Qué regla concreta equilibraría la ciencia, la equidad entre países y el uso de recursos?',
        perspectivaRelacionada: 'Tu argumento',
        placeholder: 'Escribe tu argumento en 2 o 3 líneas...',
        siguienteNodoId: 'fin_dialogo',
      },
    },

    experimentosMentales: [
      {
        id: 'exp_lun_1',
        titulo: '1. Recurso lunar para energía limpia en la Tierra',
        escenarioHipotetico:
          'El recurso extraído no se usa para cohetes, sino para generar energía limpia y barata para países con crisis energética.',
        pregunta: '¿Cambiaría tu evaluación si resuelve una urgencia terrestre?',
        tensionFilosofica: 'Preservación lunar vs. bienestar ambiental en la Tierra.',
      },
      {
        id: 'exp_lun_2',
        titulo: '2. Hallazgo de compuestos del origen de la vida',
        escenarioHipotetico:
          'El cráter elegido para la planta minera contiene moléculas orgánicas intactas clave para entender cómo surgió la vida en la Tierra.',
        pregunta: '¿Mantendrías la extracción en ese cráter?',
        tensionFilosofica: 'Utilidad técnica vs. conocimiento irreemplazable.',
      },
    ],

    perspectivas: {
      utilitarismo: {
        nombre: 'Utilitarismo',
        subtitulo: 'Utilidad técnica frente a valor científico',
        autores: 'Mill · Singer',
        interpretacion:
          'Pondera si usar el hielo como combustible genera mayor beneficio futuro que conservar intacto ese registro científico.',
        posturasPosibles: [
          {
            postura: 'Zonificación equilibrada',
            razon: 'Proteger los cráteres de mayor valor científico y usar zonas secundarias.',
          },
        ],
        preguntasPropias: ['¿Qué uso del hielo lunar aporta un beneficio más duradero a la humanidad?'],
        objecion: 'Quemar un archivo de 4.000 millones de años destruye un saber único por ahorro técnico.',
      },
      deontologia: {
        nombre: 'Deontología',
        subtitulo: 'Prohibición de apropiación encubierta',
        autores: 'Kant · Jonas',
        interpretacion:
          'Exige respetar de buena fe el principio de no apropiación del espacio y no destruir patrimonio irreemplazable.',
        posturasPosibles: [
          {
            postura: 'Rechazo a las zonas de exclusión',
            razon: 'Acaparar los únicos cráteres con agua vulnera el derecho común.',
          },
        ],
        preguntasPropias: ['¿Puede una empresa apropiarse de recursos de un patrimonio común?'],
        objecion: 'Llamar «zona de seguridad» al control exclusivo de un cráter viola la equidad internacional.',
      },
      justiciaDistributiva: {
        nombre: 'Justicia distributiva',
        subtitulo: 'Patrimonio común de la humanidad',
        autores: 'Rawls · Ostrom',
        interpretacion:
          'Critica que la ventaja tecnológica permita a pocos países capturar recursos escasos antes de que otros puedan acceder.',
        posturasPosibles: [
          {
            postura: 'Régimen internacional compartido',
            razon: 'Compartir muestras, datos y beneficios con países en desarrollo.',
          },
        ],
        preguntasPropias: ['¿Cómo evitar que la explotación lunar cree una nueva desigualdad colonial?'],
        objecion: 'La regla de «quien llega primero se lo queda» consolida la desigualdad global.',
      },
    },

    objecionesPorRuta: {
      ruta_a_si: {
        titulo: 'Objeción a tu postura (Ruta Sí)',
        posturaDetectada: 'Defiendes extraer los recursos del Polo Sur Lunar.',
        objecionPrincipal:
          '«Los cráteres con hielo son escasos e irrepetibles. Si los primeros en llegar los consumen, destruirán un registro científico único y excluirán al resto de los países.»',
        perspectivaObjecion: 'Justicia distributiva',
      },
      ruta_b_no: {
        titulo: 'Objeción a tu postura (Ruta No)',
        posturaDetectada: 'Propones preservar la Luna sin extracción de recursos.',
        objecionPrincipal:
          '«Sin usar agua lunar para soporte vital y combustible, incluso mantener una base científica pública requerirá decenas de lanzamientos contaminantes desde la Tierra.»',
        perspectivaObjecion: 'Utilitarismo',
      },
      ruta_c_depende: {
        titulo: 'Objeción a tu postura (Ruta Depende)',
        posturaDetectada: 'Condicionas la extracción a un acuerdo internacional previo.',
        objecionPrincipal:
          '«Las grandes potencias ya rechazaron en 1979 el Acuerdo de la Luna para compartir recursos. ¿Qué harías si se niegan a aceptar una autoridad internacional?»',
        perspectivaObjecion: 'Realismo político',
      },
    },
  },
  {
    id: 'megaconstelaciones-astronomia',
    numero: '05',
    titulo:
      '¿Deberíamos limitar las megaconstelaciones satelitales para proteger la investigación astronómica?',
    subtitulo:
      'El crecimiento acelerado de constelaciones de satélites frente a la protección de las observaciones científicas y el cielo nocturno.',
    tema: 'Megaconstelaciones, astronomía y tecnología',
    modo3D: 'orbita',
    tipoIlustracion: 'orbita',
    esPilotoNuevo: true,
    destacado: true,
  },
]
