// Contenido en español del sitio. Todo el texto visible vive aquí para facilitar
// un futuro selector de idioma (crear en.js con la misma estructura y elegir en App.js).
// Los textos se basan en la tesis: Sánchez Yalí, J. (2026). Epidemiología molecular del
// Tobamovirus fructirugosum (ToBRFV) en cultivos de tomate y pimentón en Colombia.
// Tesis de Maestría en Ciencias - Biotecnología, Universidad Nacional de Colombia, Sede Medellín.
//
// Los nombres científicos (Tobamovirus fructirugosum, Solanum lycopersicum, Capsicum annuum,
// familias -viridae/-aceae) se ponen en cursiva automáticamente al renderizar (src/lib/cientifico.js).

const es = {
  idioma: 'es',
  nav: [
    { id: 'inicio', label: 'Inicio' },
    { id: 'introduccion', label: 'Introducción' },
    { id: 'metodologia', label: 'Metodología' },
    { id: 'resultados', label: 'Resultados' },
    { id: 'redes', label: 'Redes' },
    { id: 'discusion', label: 'Discusión' },
    { id: 'conclusiones', label: 'Conclusiones' },
    { id: 'datos', label: 'Datos' },
  ],

  hero: {
    badge: 'Tobamovirus fructirugosum · ToBRFV',
    titulo: 'Epidemiología molecular del ToBRFV en tomate y pimentón en Colombia',
    subtitulo:
      'Primera detección en campo, caracterización genómica, redes espaciales de transmisión y diagnóstico rápido por RT-LAMP del virus del fruto rugoso marrón del tomate.',
    autor: 'Juliana Sánchez Yalí',
    programa: 'Tesis de Maestría en Ciencias – Biotecnología',
    afiliacion: 'Universidad Nacional de Colombia, Sede Medellín · Grupo de Investigación Biotecnología Microbiana',
    directores: 'Director: Mauricio A. Marín Montoya · Codirector: Pablo A. Gutiérrez Sánchez',
    cta1: 'Explorar el mapa',
    cta2: 'Ver redes de transmisión',
    stats: [
      { valor: '19/20', label: 'campos de tomate positivos en Antioquia' },
      { valor: '12', label: 'departamentos muestreados' },
      { valor: '1.er', label: 'reporte en pimentón en Colombia' },
      { valor: '>90 %', label: 'detección por RT-LAMP con extractos crudos' },
    ],
  },

  mapa: {
    titulo: 'Distribución del ToBRFV: del mundo a Antioquia',
    intro:
      'Explora la distribución mundial del virus y acércate a Colombia y Antioquia para ver las detecciones de esta tesis. Cambia de escala con los botones o navega con el mouse.',
    botones: { mundo: 'Mundo', colombia: 'Colombia', antioquia: 'Antioquia' },
    capas: {
      ncbi: {
        label: 'Secuencias en NCBI Virus',
        descripcion: 'Países con secuencias de ToBRFV depositadas en GenBank (archivo data.tsv descargado de NCBI Virus). El tamaño del círculo indica el número de secuencias.',
        fuente: 'Fuente: NCBI Virus, Tobamovirus fructirugosum (taxid 1761477). Se cuentan registros, no reportes oficiales.',
      },
      eppo: {
        label: 'Reportes oficiales (EPPO)',
        descripcion: 'Países con registro de presencia según la EPPO Global Database. Lista transcrita el 11 oct 2026 (actualización EPPO: 1 sep 2026).',
        fuente: 'Fuente: EPPO Global Database, Tobamovirus fructirugosum (TOBRFV), distribución mundial.',
        pendiente: 'Lista pendiente de verificación por la autora antes de publicar.',
      },
      tesis: {
        label: 'Detecciones de esta tesis',
        descripcion: 'Municipios muestreados en la tesis. Los puntos indican la cabecera municipal, no la ubicación exacta de los campos.',
      },
    },
    leyenda: {
      ncbi: 'Secuencias NCBI (tamaño = n.º de secuencias)',
      eppo: 'Reporte oficial EPPO (presente o transitorio)',
      tomatePos: 'Campo de tomate positivo',
      tomateNeg: 'Campo de tomate negativo',
      pimenton: 'Campos de pimentón positivos',
      riesgo: 'Riesgo de transmisión cruzada (modelo gravity)',
    },
    notaFuentes:
      'Los datos mundiales provienen de bases externas y deben verificarse antes de citarlos. Las detecciones en Colombia y Antioquia provienen exclusivamente de los capítulos 2 y 3 de la tesis.',
  },

  intro: {
    titulo: 'Introducción',
    lead:
      'El tomate (Solanum lycopersicum) y el pimentón (Capsicum annuum) son dos de las hortalizas más importantes de Colombia. Su producción enfrenta una amenaza creciente: el Tobamovirus fructirugosum (ToBRFV), un virus emergente de dispersión mundial.',
    parrafos: [
      'Colombia cultiva tomate en cerca de 17.362 hectáreas de 21 departamentos, a campo abierto y bajo invernadero, con una producción estimada de 905.439 toneladas anuales; Antioquia aporta cerca del 25 %. El pimentón ocupa unas 3.247 hectáreas, sobre todo en Valle del Cauca, Santander y Antioquia, y produce 56.803 toneladas.',
      'El ToBRFV se identificó en Israel y Jordania entre 2014 y 2015 y en pocos años alcanzó América, Europa, Asia y África. Se transmite por semilla, alojado en la testa, y de forma mecánica con gran eficiencia gracias a su alta estabilidad ambiental: herramientas, manos, ropa, polinizadores, agua de riego y plagas invasoras pueden dispersarlo. Causa pérdidas de rendimiento del 15 al 55 %, reduce el peso de los frutos entre 25 y 40 % y deteriora su calidad comercial.',
      'A diferencia de otros tobamovirus, supera los genes de resistencia Tm-1, Tm-2 y Tm-2² del tomate y los alelos L del pimentón, por lo que las variedades comerciales disponibles son susceptibles.',
      'En Colombia el virus solo se había reportado en semillas extraídas de frutos comerciales de tomate (Bados et al., 2024): no se había confirmado en campo, no se conocía el genoma de los aislamientos locales y no se había buscado en pimentón. Esta tesis llena esos vacíos integrando diagnóstico molecular, secuenciación de alto rendimiento (HTS), modelación espacial y una prueba RT-LAMP aplicable en campo.',
    ],
    hipotesisTitulo: 'Hipótesis',
    hipotesis: [
      'La HTS permitirá obtener secuencias parciales o completas del ToBRFV en tomate y pimentón de Colombia y revelar su variabilidad genética y posibles interacciones con otros virus.',
      'El ToBRFV circula en cultivos de tomate y pimentón de distintas regiones del país y puede detectarse con alta sensibilidad y especificidad por RT-qPCR (sonda TaqMan) y RT-LAMP, incluso en material asintomático o semillas comerciales.',
      'Es posible estandarizar una RT-LAMP que detecte el virus directamente en extractos crudos de hojas, frutos y semillas, como alternativa sencilla, rápida y económica para laboratorio y campo.',
      'La caracterización espacial de los casos permitirá construir un modelo de redes de transmisión que identifique rutas de dispersión y oriente el monitoreo y el manejo fitosanitario.',
    ],
    objetivoTitulo: 'Objetivo general',
    objetivoGeneral:
      'Estudiar los componentes epidemiológicos de la virosis causada por Tobamovirus fructirugosum (ToBRFV) en tomate y pimentón en Colombia mediante técnicas moleculares y bioinformáticas.',
    objetivosTitulo: 'Objetivos específicos',
    objetivos: [
      'Obtener secuencias de genomas completos o parciales del ToBRFV a partir de HTS y comparar su variabilidad intraespecífica y sinergias virales.',
      'Evaluar la incidencia del ToBRFV en cultivos y semillas de tomate y pimentón de Colombia mediante RT-qPCR con sonda TaqMan y RT-LAMP.',
      'Desarrollar una prueba RT-LAMP para la detección rápida del ToBRFV desde extractos crudos de hojas, semillas y frutos.',
      'Desarrollar un modelo epidemiológico basado en redes de dinámica espacial y de transmisión del ToBRFV en tomate y pimentón en Colombia.',
    ],
  },

  metodologia: {
    titulo: 'Metodología',
    lead:
      'La tesis combina muestreo de campo, diagnóstico molecular, secuenciación de alto rendimiento, bioinformática y modelación espacial. Cada capítulo corresponde a un artículo científico.',
    bloques: [
      {
        icono: 'leaf',
        titulo: 'Muestreo de campo y material de siembra',
        texto:
          'Cada muestra fue un compuesto de cinco hojas sintomáticas de plantas distintas en producción. En Antioquia: 20 campos de tomate (14 productores, 8 municipios) y 20 de pimentón California Wonder en Marinilla y El Peñol. A nivel nacional: 20 campos de tomate en 12 departamentos. Se analizaron además semillas informales extraídas de frutos, lotes de semilla comercial, plántulas de vivero y frutos sintomáticos de mercados y supermercados.',
      },
      {
        icono: 'flask',
        titulo: 'Extracción de RNA y RT-qPCR con sonda TaqMan',
        texto:
          'RNA total extraído con kits comerciales (GeneJET y RNeasy Plant); integridad del cDNA verificada con los genes constitutivos ubiquitina y actina. Detección por RT-qPCR con los cebadores ToBRFV_qs1/qas2 y la sonda ToBRFV_p1 (Menzel y Winter, 2021) en un Rotor-Gene Q, por duplicado y con controles positivo, sin molde y de planta sana.',
      },
      {
        icono: 'dna',
        titulo: 'Secuenciación Sanger y HTS',
        texto:
          'Amplicones de CP, MP y RdRp, y de cebadores degenerados para otros tobamovirus, secuenciados por Sanger (accesiones PZ136771-PZ136791). Genomas por RNA-seq de muestras compuestas (Illumina NovaSeq X, ~43-45 millones de lecturas pareadas de 100 pb por biblioteca), ensamblaje de novo con rnaSPAdes y validación por mapeo con Magic-BLAST (BioProject PRJNA1435812; genomas PZ166049-PZ166051).',
      },
      {
        icono: 'tree',
        titulo: 'Filogenia, resistencia del hospedante y modelación estructural',
        texto:
          'Alineamientos con MAFFT y árboles de máxima verosimilitud con IQ-TREE (ModelFinder, 1.000 réplicas ultrafast bootstrap). Los genes Tm-1 y Tm-2 se reconstruyeron del RNA-seq de Chonto y Cherry; la interacción Tm-1 - helicasa viral se modeló con Modeller y Rosetta, y la proteína de movimiento con AlphaFold.',
      },
      {
        icono: 'map',
        titulo: 'Modelo gravity de riesgo cruzado',
        texto:
          'Con las áreas cultivadas de 418 municipios (Agronet) se aplicó un modelo gravity log-transformado para estimar el riesgo de transmisión cruzada tomate-pimentón en los 128 municipios con cultivo mixto. Índices clasificados por cuartiles: bajo (<2,0), medio-bajo (<2,64), medio-alto (<3,17) y alto (>3,17).',
      },
      {
        icono: 'network',
        titulo: 'Redes espaciales de transmisión',
        texto:
          'Grilla climática de Colombia (Open-Meteo, 2023, 0,001°), límites administrativos (geoBoundaries, DANE) y uso del suelo agrícola 2024 (Agronet). La red se generó con caminatas aleatorias de 2 a 10 km entre veredas, con probabilidad de transición según la cercanía de la temperatura media del sitio al óptimo de cada cultivo (21-24 °C tomate, 18-28 °C pimentón); el peso de cada arista es el número de transiciones. Con NetworkX se calcularon intermediación (Brandes), PageRank (α = 0,85) y comunidades de Louvain; las figuras se renderizaron en Gephi.',
      },
      {
        icono: 'test',
        titulo: 'RT-LAMP en laboratorio y campo',
        texto:
          'RT-LAMP en tiempo real y colorimétrica con RNA total y extractos crudos (PEG alcalino, membrana de nitrocelulosa y tissue-printing). Se determinaron sensibilidad analítica, especificidad frente a diez virus de solanáceas, concordancia con RT-qPCR (kappa de Cohen) y costo y tiempo por reacción.',
      },
    ],
  },

  resultados: {
    titulo: 'Resultados',
    lead: 'Síntesis de los principales hallazgos de los capítulos 2, 3 y 4 de la tesis.',

    deteccion: {
      titulo: 'Detección en campo en Antioquia',
      texto: [
        'Frutos de tomate de mercados de Medellín con superficie rugosa, manchas pálidas o pardas, deformación y maduración irregular fueron positivos por RT-PCR en los diez casos analizados, con 99,2-99,8 % de identidad nucleotídica frente a aislamientos conocidos.',
        'En hojas de 20 campos de ocho municipios (Abejorral, Carepa, Frontino, Jardín, La Ceja, Marinilla, Medellín-Santa Elena y Venecia), la RT-qPCR con sonda TaqMan detectó el virus en 19 de 20 muestras (Ct 23,3-34,8), sin síntomas foliares evidentes: es la primera detección de ToBRFV en campo en Colombia.',
      ],
      tablaTitulo: 'Campos de tomate muestreados en Antioquia (Cap. 2)',
      columnas: ['Municipio', 'Campos', 'Positivos', 'Variedades', 'Ct'],
    },

    nacional: {
      titulo: 'Distribución nacional y primer reporte en pimentón',
      texto: [
        'De 20 campos de tomate en 12 departamentos, 16 muestras (31 réplicas) fueron positivas, con Ct de 8,4 a 34,6 (mediana 27,6). Las mayores cargas virales se observaron en Concepción (Santander), Ipiales (Nariño) y Abejorral (Antioquia); no hubo detección en Acacías (Meta), Pitalito (Huila) ni San Juan del Cesar (La Guajira).',
        'Los 20 campos de pimentón de Marinilla y El Peñol fueron positivos (Ct 21,6-32,0): primer reporte del ToBRFV en cultivos colombianos de pimentón. Los síntomas foliares fueron más leves que en tomate: rugosidad, ampollamiento, protuberancias oscuras y amarillamiento.',
        'El material de siembra de ambos cultivos está ampliamente contaminado: semillas informales, lotes comerciales y plántulas de vivero resultaron positivos en alta proporción, lo que señala al material de propagación infectado como vía clave de entrada y dispersión del virus.',
      ],
    },

    hospedantes: {
      titulo: 'Síntomas y detección en tomate y pimentón',
      lead: 'Síntomas y valores de Ct (RT-qPCR TaqMan) obtenidos en la tesis para los dos hospedantes principales.',
      tomate: {
        nombre: 'Tomate (Solanum lycopersicum)',
        etiqueta: 'Síntomas marcados',
        sintomas: [
          'Hojas: mosaico, deformación y estrechamiento de la lámina.',
          'Frutos: superficie rugosa, manchas pálidas o pardas, deformación, tamaño reducido y maduración irregular.',
          'Campos de Antioquia: hojas sin síntomas evidentes pero positivas (Ct 23,3-34,8).',
          'Variedades afectadas: Chonto, Cherry y Riñón; los alelos Tm-1 y Tm-2 no confieren resistencia.',
        ],
      },
      pimenton: {
        nombre: 'Pimentón (Capsicum annuum)',
        etiqueta: 'Síntomas leves o ausentes',
        sintomas: [
          'Hojas: rugosidad, ampollamiento, protuberancias ligeramente oscuras y amarillamiento; mosaico leve.',
          'Frutos: maduración irregular, decoloración, ampollas superficiales y lesiones cloróticas o necróticas.',
          'Los frutos secuenciados tenían infección mixta con ANSV, BPEV y PLRV, por lo que los síntomas no se atribuyen solo al ToBRFV.',
          'Puede actuar como reservorio asintomático de inóculo para cultivos vecinos de tomate.',
        ],
      },
      columnas: ['Material analizado', 'Positivos', 'Rango de Ct', 'Mediana Ct'],
      nota: 'Valores de Ct más bajos indican mayor carga viral. Datos del capítulo 3; los campos de tomate de Antioquia corresponden al capítulo 2.',
    },

    genomica: {
      titulo: 'Caracterización genómica y filogenia',
      texto: [
        'Los aislamientos Chonto y Cherry de Antioquia comparten 99,9 % de identidad nucleotídica entre sí y 99,7 % con la referencia Tom1-Jo (Jordania). Frente a ella presentan tres sustituciones en la RdRp (S232P, Y984H y H1496L) y dos en la proteína de movimiento (A134T y D233N), con proteína de la cápside idéntica; A134T se ha asociado a síntomas más severos.',
        'El genoma de pimentón (aislamiento JUN3) cubre el 99,73 % del genoma esperado con 92,3× de cobertura y es la secuencia más completa de ToBRFV en Colombia. Es 99,78 % idéntico a un aislamiento de semillas de tomate de Israel y difiere de la referencia en Y984H (RdRp), A134T y D233N (MP) y V130A (CP).',
        'La filogenia de genomas completos y de la región MP-CP ubica las secuencias colombianas en al menos tres clados sin segregar por hospedante: evidencia de salto entre hospedantes y de múltiples introducciones, probablemente por semilla importada, además de un linaje colombiano propio asociado a A134T.',
        'Los genes Tm-1 y Tm-2 reconstruidos de Chonto y Cherry son alelos de tipo silvestre. El análisis estructural halló cinco sustituciones en la interfaz Tm-1 - helicasa viral (entre ellas W57R) que debilitan la unión, en línea con la susceptibilidad observada en campo.',
        'La HTS reveló además otros virus: PYVV, PhyTV (primer reporte en tomate), ToCV y PeVYV2 (primeros reportes en Colombia) en tomate; ANSV, BPEV y PLRV en pimentón; y secuencias de posibles nuevas especies de Tombusviridae y Betaflexiviridae.',
      ],
      visorTitulo: 'Modelo estructural de la proteína de movimiento (MP)',
      visorTexto:
        'Modelo AlphaFold de la proteína de movimiento del ToBRFV. En el dominio central se ubican los residuos implicados en superar la resistencia del hospedante, incluidos los cambios A134T y D233N de los aislamientos colombianos. Explora el modelo en 3D.',
      visorPie: 'Figura: modelo tridimensional de la proteína de movimiento (MP) del ToBRFV (AlphaFold). Visor Mol*.',
    },

    riesgo: {
      titulo: 'Riesgo de transmisión cruzada tomate-pimentón',
      texto: [
        'El modelo gravity identificó cultivo mixto tomate-pimentón en 128 municipios de 16 departamentos, con índices de riesgo de 0,6 a 5,3 (mediana 2,64). El mayor riesgo del país está en El Peñol (5,3), con 260 ha de tomate y 260 ha de pimentón, en un clúster con Marinilla (4,7), El Carmen de Viboral (3,3) y El Santuario (2,7); un segundo foco en el suroeste antioqueño agrupa a Urrao, Jardín, Betania, Andes y Jericó.',
        'Por departamento, Cesar (3,2), Cundinamarca (3,1), Santander (3,0), Boyacá, Huila y Tolima (2,9) y Norte de Santander (2,7) superan la mediana nacional. La detección posterior del virus en los campos de pimentón de Marinilla y El Peñol confirmó la predicción del modelo.',
      ],
    },

    redes: {
      titulo: 'Redes espaciales de transmisión',
      lead:
        'Las redes modelan los corredores más probables de dispersión del ToBRFV entre veredas con clima apto para tomate y pimentón. Busca tu vereda o municipio, filtra por atributos y haz clic en un nodo para ver sus conexiones.',
      comoLeer: {
        titulo: 'Cómo leer estas redes',
        comun: [
          'Cada nodo es una vereda (código DANE). Su posición en el mapa es geográfica.',
          'Cada arista une dos veredas entre las que las caminatas aleatorias (2-10 km) registraron transiciones; su peso es el número de transiciones y mide la intensidad del contacto potencial (movimiento de personas, herramientas o material vegetal).',
          'Centralidad de intermediación (betweenness): cuántas rutas más cortas pasan por una vereda. Valores altos señalan corredores o cuellos de botella por donde el virus pasaría entre regiones.',
          'PageRank: importancia de una vereda según el número y la calidad de sus conexiones; identifica hubs con mayor riesgo de recibir y redistribuir el virus.',
          'Comunidades de Louvain: grupos de veredas más conectadas entre sí que con el resto; sugieren unidades de manejo epidemiológico.',
          'Zona productora principal: veredas de las áreas de mayor producción de tomate o pimentón (nodos grandes en la figura original); las demás son veredas de tránsito.',
        ],
        colombia: [
          'La red nacional conecta las zonas productoras de tomate y pimentón de los Andes (sin la Amazonía) y está dominada por un componente gigante; los municipios de producción bajo invernadero del altiplano de Boyacá y Cundinamarca quedan aislados.',
          'Las rutas de mayor intermediación se concentran cerca del límite Antioquia-Santander y forman tres ramas: norte (hacia La Guajira y la costa Caribe), oriental (entre las cordilleras Central y Oriental por Boyacá, Caldas, Cundinamarca y Tolima hasta Huila y Meta) y occidental, la más larga, que cruza Antioquia y baja por el valle del Cauca hasta Cauca, Nariño y Putumayo.',
          'Los diez municipios con mayor PageRank ponderado por área cultivada son Ábrego, Dagua, Ibagué, Pitalito, El Peñol, Ocaña, Piedecuesta, El Dovio, Calima y Fómeque.',
        ],
        antioquia: [
          'La red de Antioquia tiene mayor resolución: veredas clasificadas como zona productora principal o secundaria, con métricas recalculadas para el departamento (pr_antioquia y bc_antioquia).',
          'La ruta principal sigue la rama oriental nacional y enlaza a los productores del Norte, Occidente y Suroeste. El Bajo Cauca, con pocos productores, conecta la rama occidental con el centro del departamento y el resto del país; el Noroccidente y el Magdalena Medio son corredores de tránsito.',
          'Los municipios con mayor PageRank ponderado son El Peñol, Concordia, Sonsón, Marinilla y Urrao; los corredores Ituango/Fredonia, Tarazá/Yondó, Cáceres/Caracolí y Sonsón/Puerto Nare son sitios estratégicos para el monitoreo basado en riesgo.',
        ],
      },
      ui: {
        seleccionRed: 'Red',
        colombia: 'Colombia',
        antioquia: 'Antioquia',
        buscar: 'Buscar vereda o municipio…',
        sinResultados: 'Sin coincidencias',
        filtros: 'Filtros',
        departamento: 'Departamento',
        todos: 'Todos',
        cultivo: 'Cultivo en la vereda',
        tomate: 'Tomate a campo abierto',
        tomateInv: 'Tomate bajo invernadero',
        pimenton: 'Pimentón',
        sinCultivo: 'Sin cultivo registrado',
        zona: 'Zona productora',
        zonaPrincipal: 'Principal',
        zonaSecundaria: 'Secundaria',
        comunidad: 'Comunidad (Louvain)',
        colorPor: 'Color por',
        tamanoPor: 'Tamaño por',
        colorOpciones: { departamento: 'Departamento', comunidad: 'Comunidad Louvain', cultivo: 'Tipo de cultivo', betweenness: 'Intermediación', pagerank: 'PageRank' },
        tamanoOpciones: { pagerank: 'PageRank', betweenness: 'Intermediación', grado: 'Grado (n.º de conexiones)', uniforme: 'Uniforme' },
        aristas: 'Aristas visibles',
        umbral: 'Peso mínimo de arista',
        mostrarAristas: 'Mostrar aristas',
        limpiar: 'Limpiar filtros',
        recentrar: 'Recentrar',
        acercar: 'Acercar',
        alejar: 'Alejar',
        cargando: 'Cargando red…',
        nodoTitulo: 'Vereda seleccionada',
        nodoAyuda: 'Pasa el mouse o haz clic sobre un nodo para ver su información. Clic en el fondo para deseleccionar.',
        vecinos: 'Conexiones más fuertes',
        grado: 'Conexiones',
        ranking: 'puesto',
        de: 'de',
        stats: { veredas: 'Veredas', aristas: 'Aristas', municipios: 'Municipios', visibles: 'Veredas visibles' },
        leyenda: 'Leyenda',
        descargar: 'Descargar red (GEXF)',
      },
    },

    lamp: {
      titulo: 'Diagnóstico rápido por RT-LAMP',
      texto: [
        'La RT-LAMP, en tiempo real y colorimétrica, detectó el ToBRFV en más del 75 % de las muestras de hojas y frutos de tomate y pimentón, con concordancia sustancial a casi perfecta frente a la RT-qPCR (kappa de Cohen). El límite de detección fue 100 × 10⁻¹⁰ ng/µL, igual al de la RT-qPCR, sin reacción cruzada con otros diez virus de solanáceas, incluidos ToMV y TMV.',
        'Con extractos crudos (PEG alcalino, membrana de nitrocelulosa y tissue-printing) la detección superó el 90 %, lo que permite usar la prueba en campo sin extraer RNA ni equipos especializados, como prueba en el punto de atención (POCT).',
      ],
      metricas: [
        { valor: 'USD 11,48', label: 'costo por reacción RT-qPCR (patrón de oro)' },
        { valor: 'USD 1,71', label: 'costo por reacción cRT-LAMP con PEG alcalino (14,9 %)' },
        { valor: '115 min', label: 'tiempo para 20 muestras con cRT-LAMP frente a 180 min de RT-qPCR' },
        { valor: '< 1 h', label: 'respuesta en campo con tissue-printing (47 % del tiempo)' },
      ],
    },
  },

  discusion: {
    titulo: 'Discusión',
    parrafos: [
      'El ToBRFV llegó muy probablemente a Colombia en semilla importada, como indican la contaminación de lotes comerciales y la alta similitud de los aislamientos colombianos con secuencias de regiones distantes. Su dispersión local se ve favorecida por la transmisión mecánica, la intensa manipulación de ambos cultivos, la distribución de plántulas infectadas desde viveros y el uso de semilla informal por pequeños productores.',
      'La homogeneidad genética entre aislamientos de tomate y pimentón confirma la plasticidad de hospedante del virus dentro de las Solanaceae. La falta de síntomas claros en pimentón dificulta la detección visual y lo convierte en posible reservorio de inóculo, sobre todo donde ambos cultivos coexisten, como El Peñol y Marinilla. Las infecciones mixtas con ANSV y otros virus exigen inoculaciones individuales y combinadas para esclarecer el papel de cada uno en los síntomas.',
      'La geografía fragmentada de Colombia genera cuellos de botella naturales que la vigilancia puede aprovechar. Antioquia funciona como hub nacional, y los sitios con alta intermediación o PageRank son candidatos para muestreos basados en riesgo, rastreo del origen de brotes y simulación de escenarios de manejo. Las zonas bajo invernadero, aisladas de la red principal, tienen menor riesgo de introducción accidental.',
      'Mientras llegan variedades resistentes, el manejo debe centrarse en semilla libre de virus, desinfección de sustratos y herramientas, eliminación rápida de plantas sintomáticas, rotaciones, cuarentena y vigilancia. La RT-LAMP con extractos crudos ofrece una herramienta rápida y económica para apoyar estas acciones en viveros, puntos de venta de semilla, acopios y unidades productivas.',
    ],
  },

  conclusiones: {
    titulo: 'Conclusiones y recomendaciones',
    parrafos: [
      'La HTS permitió obtener genomas completos y parciales del ToBRFV de tomate y pimentón colombianos, con 99,9 % de identidad entre aislamientos, sustituciones relevantes en RdRp y MP (incluida A134T) y evidencia de múltiples introducciones. Los alelos Tm-1 y Tm-2 de Chonto y Cherry no confieren resistencia efectiva.',
      'La RT-qPCR con sonda TaqMan confirmó una amplia distribución del virus: 19 de 20 campos de tomate en Antioquia, presencia en múltiples departamentos y primer reporte en cultivos colombianos de pimentón, además de contaminación generalizada de semillas, plántulas y frutos. El material de propagación infectado es una vía crítica de entrada y dispersión.',
      'La RT-LAMP estandarizada detecta el virus en RNA total y extractos crudos con sensibilidad de 100 × 10⁻¹⁰ ng/µL, alta especificidad y concordancia sustancial con la prueba patrón; cumple los estándares de validación de la EPPO y es aplicable como POCT en campo.',
      'El modelo gravity y las redes espaciales señalaron a El Peñol y Marinilla, y a los departamentos de Cesar y Cundinamarca, como focos de alto riesgo de transmisión cruzada, y describieron corredores de dispersión que dan una base cuantitativa para priorizar la vigilancia y el manejo integrado.',
    ],
    recomendacionesTitulo: 'Recomendaciones',
    recomendaciones: [
      {
        titulo: 'Para la comunidad científica',
        items: [
          'Mantener vigilancia genómica continua del ToBRFV incorporando aislamientos de nuevas regiones y temporadas.',
          'Evaluar experimentalmente el papel de las sustituciones A134T y otras en genotipos con alelos Tm-1, Tm-2, Tm-2² y L1-L4.',
          'Explorar resistencia de nueva generación mediante edición génica (CRISPR-Cas) de factores de susceptibilidad.',
          'Estudiar las interacciones sinérgicas del ToBRFV con otros virus en coinfección mediante metatranscriptómica.',
        ],
      },
      {
        titulo: 'Para el manejo fitosanitario integrado',
        items: [
          'Certificación fitosanitaria obligatoria de semillas de tomate y pimentón con detección por RT-qPCR e indexación biológica.',
          'Adoptar la RT-LAMP como prueba POCT en viveros, puntos de venta de semilla, acopios y unidades productivas, con un kit de reactivos estables.',
          'Reforzar higiene y bioseguridad: desinfección de herramientas, ropa y manos, e inductores de resistencia.',
          'Capacitar a productores, proveedores y comercializadores en síntomas, vías de transmisión y contención.',
        ],
      },
      {
        titulo: 'Para la vigilancia epidemiológica',
        items: [
          'Diseñar un sistema de vigilancia activa estructurado en torno a los nodos y corredores de mayor riesgo identificados por las redes.',
          'Actualizar los mapas de riesgo con la evidencia observacional reciente e incluir otros virus (TSWV, INSV, begomovirus).',
          'Integrar datos de comercio de semillas y plántulas en los modelos para estimar flujos reales de transmisión pasiva.',
        ],
      },
      {
        titulo: 'Para la política agrícola e institucional',
        items: [
          'Reconocer al ToBRFV como plaga no cuarentenaria reglamentada, con protocolos de acción y apoyo a productores afectados.',
          'Incluir la prueba de ToBRFV como requisito en el análisis de riesgo de importación de semillas de solanáceas.',
          'Fortalecer la capacidad diagnóstica de los laboratorios fitopatológicos, incluida la HTS como vigilancia genómica.',
          'Financiar investigación sobre virosis emergentes y articular redes nacionales con EPPO y CABI; comunicar el riesgo a toda la cadena hortícola.',
        ],
      },
    ],
  },

  datos: {
    titulo: 'Datos, publicaciones y créditos',
    publicaciones: [
      { texto: 'Sánchez J., Gutiérrez P.A., Panno S., Caruso A.G., Davino S., Marín M. (2025). Molecular characterization and phylogenetic analysis of tomato brown rugose fruit virus (ToBRFV) isolates in tomato in Antioquia (Colombia). Journal of Plant Pathology 107:1721-1733.', capitulo: 'Capítulo 2' },
      { texto: 'Sánchez Yalí J., Marulanda Pulgarín J., Marín Montoya M.A., Gutiérrez Sánchez P.A. Tobamovirus fructirugosum (ToBRFV) is widely distributed in tomato and pepper fields in Colombia. Sometido a Journal of Phytopathology.', capitulo: 'Capítulo 3' },
      { texto: 'Sánchez Yalí J., Gutiérrez Sánchez P.A., Marín Montoya M.A. Laboratory and in-field RT-LAMP assays for detecting Tobamovirus fructirugosum (ToBRFV) in tomato and bell pepper crops in Colombia. Sometido a Archives of Phytopathology and Plant Protection.', capitulo: 'Capítulo 4' },
    ],
    accesiones: [
      { label: 'Secuencias Sanger (CP, MP, RdRp)', valor: 'GenBank PZ136771-PZ136791' },
      { label: 'Genomas de ToBRFV (HTS)', valor: 'GenBank PZ166049-PZ166051' },
      { label: 'Datos crudos de RNA-seq', valor: 'NCBI SRA, BioProject PRJNA1435812' },
    ],
    descargas: [
      { label: 'Red de transmisión de Colombia (GEXF, 68 MB)', archivo: 'final_Colombia_network_paper.gexf' },
      { label: 'Red de transmisión de Antioquia (GEXF, 9 MB)', archivo: 'final_Antioquia_network_paper.gexf' },
      { label: 'Secuencias de ToBRFV en NCBI Virus (TSV)', archivo: 'data.tsv' },
      { label: 'Modelo AlphaFold de la proteína de movimiento (mmCIF)', archivo: 'fold_2025_01_27_10_23_model_0.cif' },
    ],
    fuentesExternas: [
      { label: 'NCBI Virus – Tobamovirus fructirugosum', url: 'https://www.ncbi.nlm.nih.gov/labs/virus/vssi/#/virus?SeqType_s=Nucleotide&VirusLineage_ss=Tomato%20brown%20rugose%20fruit%20virus,%20taxid:1761477' },
      { label: 'EPPO Global Database – distribución de TOBRFV', url: 'https://gd.eppo.int/taxon/TOBRFV/distribution' },
      { label: 'Agronet – estadísticas agropecuarias', url: 'https://www.agronet.gov.co' },
      { label: 'Geoportal DANE', url: 'https://geoportal.dane.gov.co' },
    ],
    financiacion:
      'Proyectos: Tobamovirus transmitidos por semilla en tomate y pimentón (código 63082, Convocatoria Nacional 2024, Universidad Nacional de Colombia); Detección molecular de virus de RNA en tejido foliar y semillas de tomate en Antioquia mediante RT-qPCR y LAMP (código 60939, Facultad de Ciencias 2023); Detección molecular del ToBRFV en cultivos de tomate de Colombia (código 5249, Fundación para la Promoción de la Investigación y la Tecnología, Banco de la República). Muestras colectadas bajo el Permiso Marco de Recolección otorgado por la ANLA a la Universidad Nacional de Colombia (Resolución 000697 de 2024).',
    creditos:
      'Laboratorio de Microbiología Industrial, Grupo de Investigación Biotecnología Microbiana (COL000119), Facultad de Ciencias, Universidad Nacional de Colombia, Sede Medellín.',
  },

  footer: {
    texto: 'Sitio web complementario de la tesis de Maestría en Ciencias – Biotecnología de Juliana Sánchez Yalí (2026). Universidad Nacional de Colombia, Sede Medellín.',
    mapas: 'Mapas base: Esri World Dark Gray (© Esri, HERE, Garmin, OpenStreetMap contributors). Visualización de redes con sigma.js y graphology.',
  },
};

export default es;
