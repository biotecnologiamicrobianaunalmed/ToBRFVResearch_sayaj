// Utilidades para cargar y describir las redes de transmisión (public/data/red_*.json).
import { UndirectedGraph } from 'graphology';
import COLORES_DEP from '../data/colores_departamentos.json';

// Los nodos se dibujan sobre un mapa base oscuro (Esri World Dark Gray, ~#2b2b2b),
// por eso los colores son claros/saturados y se aclaran los demasiado oscuros.
export const COLOR_CULTIVO = {
  mixto: { color: '#b48cff', label: 'Tomate y pimentón' },
  tomate: { color: '#ff6a52', label: 'Tomate a campo abierto' },
  tomateInv: { color: '#d9a066', label: 'Tomate bajo invernadero' },
  pimenton: { color: '#f7b733', label: 'Pimentón' },
  sin: { color: '#8c9bb0', label: 'Sin cultivo registrado (tránsito)' },
};

// Luminancia relativa (WCAG) de un color hex.
function luminancia(hex) {
  const h = hex.replace('#', '');
  const c = [0, 2, 4].map((i) => parseInt(h.substr(i, 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}

// Mezcla el color con blanco hasta que su luminancia alcance `min` (legible sobre el mapa oscuro).
export function aclarar(hex, min = 0.25) {
  if (!/^#[0-9a-f]{6}$/i.test(hex)) return hex;
  let rgb = [0, 2, 4].map((i) => parseInt(hex.substr(i + 1, 2), 16));
  let salida = hex;
  for (let k = 0; k < 12 && luminancia(salida) < min; k += 1) {
    rgb = rgb.map((v) => Math.round(v + (255 - v) * 0.18));
    salida = `#${rgb.map((v) => v.toString(16).padStart(2, '0')).join('')}`;
  }
  return salida;
}

const PALETA_COMUNIDADES = ['#ff6a52', '#3ec6dc', '#f7b733', '#b48cff', '#5cc496', '#ffd166', '#f15bb5', '#6fa8ff', '#d9a066', '#8ac926', '#ff8fd6', '#2ec4b6', '#ff9f68', '#7fb3e6', '#c77dff', '#ff5d8f', '#4cc9f0', '#b5e48c', '#ffb86b', '#9d8cff', '#56cfe1', '#ff7096', '#06d6a0', '#ffe066', '#a685ff', '#72ddf7', '#fb8b24', '#aab8cf', '#c084fc', '#80ed99', '#e0a458', '#9fb1c9'];

export function colorComunidad(lv, lista) {
  const i = lista.indexOf(lv);
  return PALETA_COMUNIDADES[(i >= 0 ? i : 0) % PALETA_COMUNIDADES.length];
}

const COLORES_DEP_CLAROS = Object.fromEntries(Object.entries(COLORES_DEP).map(([k, v]) => [k, aclarar(v)]));

export function colorDepartamento(dep) {
  return COLORES_DEP_CLAROS[dep] || '#9fb1c9';
}

export function tipoCultivo(flags) {
  const tom = !!(flags & 2);
  const inv = !!(flags & 4);
  const pim = !!(flags & 8);
  if ((tom || inv) && pim) return 'mixto';
  if (tom) return 'tomate';
  if (inv) return 'tomateInv';
  if (pim) return 'pimenton';
  return 'sin';
}

// Escala secuencial (azul apagado -> verde -> pimentón -> rojo tomate) para métricas, sobre el rango 0..1.
// Debe coincidir con .leyenda-gradiente en RedesTransmision.css.
export function colorMetrica(v) {
  const paradas = [[0.0, [70, 120, 150]], [0.35, [143, 216, 180]], [0.65, [242, 165, 65]], [1.0, [228, 87, 63]]];
  const x = Math.max(0, Math.min(1, v));
  for (let i = 1; i < paradas.length; i += 1) {
    if (x <= paradas[i][0]) {
      const [a, ca] = paradas[i - 1];
      const [b, cb] = paradas[i];
      const f = (x - a) / (b - a);
      const c = ca.map((ch, k) => Math.round(ch + (cb[k] - ch) * f));
      return `rgb(${c[0]},${c[1]},${c[2]})`;
    }
  }
  return 'rgb(228,87,63)';
}

export async function cargarRed(nombre, onProgreso) {
  const url = `${process.env.PUBLIC_URL}/data/red_${nombre}.json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`No se pudo cargar ${url}`);
  const total = Number(res.headers.get('content-length')) || 0;
  if (!res.body || !onProgreso) return res.json();
  const reader = res.body.getReader();
  const partes = [];
  let recibido = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    partes.push(value);
    recibido += value.length;
    onProgreso(total ? recibido / total : null, recibido);
  }
  const blob = new Blob(partes);
  return JSON.parse(await blob.text());
}

// Construye el grafo graphology y los índices auxiliares a partir del JSON compacto.
export function construirGrafo(datos) {
  const graph = new UndirectedGraph();
  const nodos = datos.nodes;
  const n = nodos.length;
  const registros = new Array(n);
  const porMunicipio = new Map();
  const esAntioquia = datos.meta.name === 'Antioquia';

  for (let i = 0; i < n; i += 1) {
    const [id, vereda, mun, dep, lat, lon, flags, pr, bc, lv, prA, bcA] = nodos[i];
    const reg = {
      id, vereda, mun, dep, lat, lon, flags, lv,
      pr: esAntioquia && prA != null ? prA : pr,
      bc: esAntioquia && bcA != null ? bcA : bcA == null ? bc : bc,
      prNacional: pr, bcNacional: bc,
      cultivo: tipoCultivo(flags), principal: !!(flags & 1), grado: 0, idx: i,
    };
    registros[i] = reg;
    graph.addNode(id, { x: 0, y: 0, lat, lng: lon, label: capitalizar(vereda) || id, size: 3, color: '#8c9bb0', i });
    const k = `${dep}|${mun}`;
    if (!porMunicipio.has(k)) porMunicipio.set(k, { dep, mun, ids: [] });
    porMunicipio.get(k).ids.push(id);
  }

  const { source, target, weight } = datos.edges;
  const m = source.length;
  for (let e = 0; e < m; e += 1) {
    const s = nodos[source[e]][0];
    const t = nodos[target[e]][0];
    if (s === t) continue;
    try {
      graph.addEdgeWithKey(String(e), s, t, { weight: weight[e], e });
      registros[source[e]].grado += 1;
      registros[target[e]].grado += 1;
    } catch (err) {
      // arista duplicada: se ignora
    }
  }

  const ordenar = (clave) => registros.slice().sort((a, b) => b[clave] - a[clave]).map((r) => r.id);
  const rankPr = new Map(ordenar('pr').map((id, i) => [id, i + 1]));
  const rankBc = new Map(ordenar('bc').map((id, i) => [id, i + 1]));
  const rankGrado = new Map(ordenar('grado').map((id, i) => [id, i + 1]));
  const maxPr = Math.max(...registros.map((r) => r.pr));
  const maxBc = Math.max(...registros.map((r) => r.bc));
  const maxGrado = Math.max(...registros.map((r) => r.grado));
  const comunidades = Array.from(new Set(registros.map((r) => r.lv))).sort((a, b) => a - b);
  const departamentos = Array.from(new Set(registros.map((r) => r.dep))).sort();
  const municipios = Array.from(porMunicipio.values()).sort((a, b) => a.mun.localeCompare(b.mun));

  const porId = new Map(registros.map((r) => [r.id, r]));

  return {
    graph, registros, porId, porMunicipio, municipios, comunidades, departamentos,
    rankPr, rankBc, rankGrado, maxPr, maxBc, maxGrado,
    pesos: weight, // ordenados de mayor a menor
    meta: datos.meta,
  };
}

// Número de aristas con peso >= umbral (pesos ordenados descendentemente).
export function aristasSobreUmbral(pesos, umbral) {
  let lo = 0;
  let hi = pesos.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (pesos[mid] >= umbral) lo = mid + 1; else hi = mid;
  }
  return lo;
}

export function formatoNumero(x, dec = 0) {
  return new Intl.NumberFormat('es-CO', { maximumFractionDigits: dec, minimumFractionDigits: dec }).format(x);
}

export function capitalizar(s) {
  if (!s) return '';
  return s.toLowerCase().replace(/(^|\s|\(|-)([a-záéíóúñü])/g, (m, p, c) => p + c.toUpperCase()).replace(/\bDe\b/g, 'de').replace(/\bDel\b/g, 'del').replace(/\bLa\b/g, 'la').replace(/\bLas\b/g, 'las').replace(/\bY\b/g, 'y').replace(/^(.)/, (c) => c.toUpperCase());
}
