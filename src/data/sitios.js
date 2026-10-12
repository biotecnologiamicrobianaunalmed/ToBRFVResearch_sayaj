// Sitios de muestreo y resultados tomados EXCLUSIVAMENTE de la tesis
// (Sánchez Yalí, 2026). Coordenadas: punto aproximado de la cabecera municipal
// (la tesis usa coordenadas municipales del DANE; verificar contra el geoportal
// DANE antes de publicar). No representan la ubicación exacta de los campos.
//
// Fuentes:
//  [C2] Capítulo 2 – Sánchez et al. (2025) J Plant Pathol 107:1721-1733. Sección 2.1 y Fig. 2.
//  [C3] Capítulo 3 – artículo sometido a J. Phytopathology. Fig. 1A-B, sección "Detection of ToBRFV bell pepper fields".
//  [C2-R] Capítulo 2 – modelo gravity de riesgo cruzado (Fig. 4C-D, sección 3.3).

export const CAMPOS_TOMATE_ANTIOQUIA = [
  // [C2] 20 campos de tomate, 14 productores, 8 municipios; 19/20 positivos por RT-qPCR (Ct 23.3-34.8).
  { municipio: 'Marinilla', lat: 6.174, lon: -75.339, campos: 6, positivos: 6, variedades: 'Chonto', ct: '25.7-32.6' },
  { municipio: 'Carepa', lat: 7.758, lon: -76.653, campos: 1, positivos: 1, variedades: 'Cherry', ct: '30.9' },
  { municipio: 'Jardín', lat: 5.598, lon: -75.819, campos: 2, positivos: 2, variedades: 'Chonto', ct: '32.6-32.7' },
  { municipio: 'Frontino', lat: 6.776, lon: -76.131, campos: 3, positivos: 3, variedades: 'Chonto, Riñón', ct: '23.3-33.1' },
  { municipio: 'Venecia', lat: 5.964, lon: -75.735, campos: 3, positivos: 2, variedades: 'Cherry, Riñón', ct: '31.1-32.5',
    nota: 'Único campo negativo del muestreo (variedad Cherry).' },
  { municipio: 'Abejorral', lat: 5.789, lon: -75.428, campos: 2, positivos: 2, variedades: 'Riñón, Chonto', ct: '33.2-34.8' },
  { municipio: 'Medellín (Santa Elena)', lat: 6.212, lon: -75.498, campos: 1, positivos: 1, variedades: 'Cherry', ct: '29.5' },
  { municipio: 'La Ceja', lat: 6.028, lon: -75.431, campos: 2, positivos: 2, variedades: 'Cherry, Riñón', ct: '33.2-34.6' },
];

export const CAMPOS_PIMENTON_ANTIOQUIA = [
  // [C3] 20 campos de pimentón (California Wonder) en Marinilla y El Peñol; 100 % positivos (Ct 21.6-32.0, mediana 25.9).
  { municipio: 'Marinilla', lat: 6.174, lon: -75.339 },
  { municipio: 'El Peñol', lat: 6.219, lon: -75.243 },
];

export const MUESTREO_NACIONAL = [
  // [C3] Fig. 1A-B: 20 campos de tomate en 12 departamentos. Positivos (+) y negativos (-).
  { municipio: 'Marinilla', departamento: 'Antioquia', lat: 6.174, lon: -75.339, resultado: '+' },
  { municipio: 'Venecia', departamento: 'Antioquia', lat: 5.964, lon: -75.735, resultado: '+' },
  { municipio: 'Abejorral', departamento: 'Antioquia', lat: 5.789, lon: -75.428, resultado: '+', nota: 'Entre las cargas virales más altas del país.' },
  { municipio: 'Juan de Acosta', departamento: 'Atlántico', lat: 10.829, lon: -75.034, resultado: '+' },
  { municipio: 'Duitama', departamento: 'Boyacá', lat: 5.827, lon: -73.034, resultado: '+' },
  { municipio: 'Riosucio', departamento: 'Caldas', lat: 5.421, lon: -75.703, resultado: '+' },
  { municipio: 'Florencia', departamento: 'Caquetá', lat: 1.614, lon: -75.606, resultado: '+' },
  { municipio: 'Montelíbano', departamento: 'Córdoba', lat: 7.975, lon: -75.421, resultado: '+' },
  { municipio: 'Choachí', departamento: 'Cundinamarca', lat: 4.528, lon: -73.923, resultado: '+' },
  { municipio: 'Ipiales', departamento: 'Nariño', lat: 0.830, lon: -77.644, resultado: '+', nota: 'Entre las cargas virales más altas del país.' },
  { municipio: 'Concepción', departamento: 'Santander', lat: 6.769, lon: -72.695, resultado: '+', nota: 'Carga viral más alta del muestreo nacional.' },
  { municipio: 'Pitalito', departamento: 'Huila', lat: 1.853, lon: -76.051, resultado: '-' },
  { municipio: 'San Juan del Cesar', departamento: 'La Guajira', lat: 10.771, lon: -73.003, resultado: '-' },
  { municipio: 'Acacías', departamento: 'Meta', lat: 3.988, lon: -73.766, resultado: '-' },
];

export const RIESGO_CRUZADO_ANTIOQUIA = [
  // [C2-R] Índice de riesgo (RI) de transmisión cruzada tomate-pimentón, modelo gravity log-transformado (Fig. 4C).
  { municipio: 'El Peñol', lat: 6.219, lon: -75.243, ri: 5.34 },
  { municipio: 'Marinilla', lat: 6.174, lon: -75.339, ri: 4.74 },
  { municipio: 'El Carmen de Viboral', lat: 6.083, lon: -75.335, ri: 3.27 },
  { municipio: 'Urrao', lat: 6.317, lon: -76.134, ri: 2.92 },
  { municipio: 'El Santuario', lat: 6.137, lon: -75.264, ri: 2.68 },
  { municipio: 'Jardín', lat: 5.598, lon: -75.819, ri: 2.23 },
  { municipio: 'Betania', lat: 5.746, lon: -75.977, ri: 1.86 },
  { municipio: 'Medellín', lat: 6.245, lon: -75.574, ri: 1.69 },
  { municipio: 'Andes', lat: 5.656, lon: -75.879, ri: 1.65 },
  { municipio: 'Envigado', lat: 6.171, lon: -75.586, ri: 0.85 },
  { municipio: 'Entrerríos', lat: 6.566, lon: -75.517, ri: 0.70 },
  { municipio: 'Jericó', lat: 5.792, lon: -75.786, ri: 0.60 },
];

export const RIESGO_CRUZADO_COLOMBIA = [
  // [C2-R] Municipios de mayor RI fuera de Antioquia (Fig. 4D).
  { municipio: 'Ábrego', departamento: 'Norte de Santander', lat: 8.081, lon: -73.221, ri: 4.98 },
  { municipio: 'La Paz', departamento: 'Cesar', lat: 10.387, lon: -73.171, ri: 4.87 },
  { municipio: 'El Dovio', departamento: 'Valle del Cauca', lat: 4.510, lon: -76.236, ri: 4.47 },
  { municipio: 'Cáqueza', departamento: 'Cundinamarca', lat: 4.405, lon: -73.947, ri: 4.43 },
  { municipio: 'Ocaña', departamento: 'Norte de Santander', lat: 8.238, lon: -73.356, ri: 4.42 },
  { municipio: 'La Playa', departamento: 'Norte de Santander', lat: 8.212, lon: -73.238, ri: 4.41 },
  { municipio: 'Dagua', departamento: 'Valle del Cauca', lat: 3.657, lon: -76.689, ri: 4.18 },
  { municipio: 'Pitalito', departamento: 'Huila', lat: 1.853, lon: -76.051, ri: 4.13 },
];

export const RIESGO_DEPARTAMENTOS = [
  // [C2-R] Mediana del RI por departamento (Fig. 4B). Mediana nacional 2.64.
  { departamento: 'Cesar', ri: 3.2 }, { departamento: 'Cundinamarca', ri: 3.1 }, { departamento: 'Santander', ri: 3.0 },
  { departamento: 'Boyacá', ri: 2.9 }, { departamento: 'Huila', ri: 2.9 }, { departamento: 'Tolima', ri: 2.9 },
  { departamento: 'Norte de Santander', ri: 2.7 }, { departamento: 'Amazonas', ri: 2.6 }, { departamento: 'Caldas', ri: 2.4 },
  { departamento: 'Magdalena', ri: 2.3 }, { departamento: 'Valle del Cauca', ri: 2.2 }, { departamento: 'Antioquia', ri: 2.0 },
  { departamento: 'Nariño', ri: 1.8 }, { departamento: 'Quindío', ri: 1.8 }, { departamento: 'Cauca', ri: 1.3 }, { departamento: 'Risaralda', ri: 1.0 },
];

export const TOP_PAGERANK_COLOMBIA = [
  // [C3] Diez municipios con mayor puntaje PageRank × área cultivada (Fig. 5C, Supplementary Table 1).
  'Ábrego (Norte de Santander)', 'Dagua (Valle del Cauca)', 'Ibagué (Tolima)', 'Pitalito (Huila)', 'El Peñol (Antioquia)',
  'Ocaña (Norte de Santander)', 'Piedecuesta (Santander)', 'El Dovio (Valle del Cauca)', 'Calima (Valle del Cauca)', 'Fómeque (Cundinamarca)',
];

export const TOP_PAGERANK_ANTIOQUIA = [
  // [C3] Fig. 5E, orden del puntaje PageRank ponderado en Antioquia.
  'El Peñol', 'Concordia', 'Sonsón', 'Marinilla', 'Urrao', 'Ituango', 'Fredonia', 'Támesis', 'Guarne', 'El Carmen de Viboral',
];

// Detección en material de siembra y frutos [C3]. Porcentaje de muestras positivas y rango de Ct.
export const DETECCION_MATERIALES = {
  tomate: [
    { material: 'Hojas de campo (20 campos, 12 departamentos)', positivos: '16 de 20 muestras', ct: '8.4-34.6', mediana: 27.6 },
    { material: 'Semillas informales (20 muestras, 5 variedades)', positivos: '77.5 % de réplicas', ct: '7.8-32.2', mediana: 26.6 },
    { material: 'Semillas comerciales (10 lotes)', positivos: '8 de 10 lotes', ct: '17.3-31.2', mediana: 29.1 },
    { material: 'Plántulas de vivero (10 muestras)', positivos: '100 %', ct: '22.2-28.9', mediana: 25.4 },
    { material: 'Frutos sintomáticos (pericarpio externo)', positivos: '100 %', ct: '3.0-26.5', mediana: 4.7 },
  ],
  pimenton: [
    { material: 'Hojas de campo (20 campos, Marinilla y El Peñol)', positivos: '100 %', ct: '21.6-32.0', mediana: 25.9 },
    { material: 'Semillas informales (Antioquia 16, Cundinamarca 3, Valle 1)', positivos: '67.5 %', ct: '25.4-34.1', mediana: 32.1 },
    { material: 'Semillas comerciales (10 lotes California Wonder)', positivos: '100 %', ct: '27.1-32.7', mediana: 31.0 },
    { material: 'Plántulas de vivero (Antioquia)', positivos: '100 %', ct: '24.9-30.8', mediana: 27.7 },
    { material: 'Frutos sintomáticos', positivos: '100 %', ct: '15.5-27.8', mediana: 23.1 },
  ],
};
