import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Sigma from 'sigma';
import bindLeafletLayer from '@sigma/layer-leaflet';
import './RedesTransmision.css';
import { TILES } from './MapaDistribucion';
import { cargarRed, construirGrafo, aristasSobreUmbral, colorComunidad, colorDepartamento, colorMetrica, COLOR_CULTIVO, formatoNumero, capitalizar } from '../lib/redes';
import T from '../lib/cientifico';

// Colores para el mapa base oscuro (Esri World Dark Gray): aristas verde claro, selección rojo tomate.
const COLOR_ARISTA = 'rgba(143, 216, 180, 0.22)';
const COLOR_ARISTA_ACTIVA = 'rgba(255, 122, 100, 0.95)';
const COLOR_ATENUADO = '#4b5868';
const COLOR_ETIQUETA = '#f3f7fb';

// Etiqueta al pasar el mouse: caja oscura con texto claro (la de sigma por defecto es blanca).
function dibujarHover(context, data, settings) {
  const size = settings.labelSize;
  const font = settings.labelFont;
  const weight = settings.labelWeight;
  context.font = `${weight} ${size}px ${font}`;
  context.fillStyle = 'rgba(11, 22, 38, 0.92)';
  context.shadowOffsetX = 0;
  context.shadowOffsetY = 0;
  context.shadowBlur = 8;
  context.shadowColor = '#000';
  const PADDING = 3;
  if (typeof data.label === 'string') {
    const textWidth = context.measureText(data.label).width;
    const boxWidth = Math.round(textWidth + 6);
    const boxHeight = Math.round(size + 2 * PADDING);
    const radius = Math.max(data.size, size / 2) + PADDING;
    const angleRadian = Math.asin(boxHeight / 2 / radius);
    const xDeltaCoord = Math.sqrt(Math.abs(radius ** 2 - (boxHeight / 2) ** 2));
    context.beginPath();
    context.moveTo(data.x + xDeltaCoord, data.y + boxHeight / 2);
    context.lineTo(data.x + radius + boxWidth, data.y + boxHeight / 2);
    context.lineTo(data.x + radius + boxWidth, data.y - boxHeight / 2);
    context.lineTo(data.x + xDeltaCoord, data.y - boxHeight / 2);
    context.arc(data.x, data.y, radius, angleRadian, -angleRadian);
    context.closePath();
    context.fill();
  } else {
    context.beginPath();
    context.arc(data.x, data.y, data.size + PADDING, 0, Math.PI * 2);
    context.closePath();
    context.fill();
  }
  context.shadowBlur = 0;
  if (data.label) {
    context.fillStyle = COLOR_ETIQUETA;
    context.fillText(data.label, data.x + data.size + 3, data.y + size / 3);
  }
}

const FILTROS_INICIALES = { dep: '', mun: '', tomate: true, tomateInv: true, pimenton: true, sin: true, zona: 'todas', comunidad: '' };

function Icono({ tipo }) {
  if (tipo === 'mas') return <span>+</span>;
  if (tipo === 'menos') return <span>−</span>;
  if (tipo === 'centrar') return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3" /><path d="M12 2v4M12 18v4M2 12h4M18 12h4" /></svg>;
  return null;
}

function RedesTransmision({ t }) {
  const ui = t.resultados.redes.ui;
  const [red, setRed] = useState('antioquia');
  const [modelo, setModelo] = useState(null);
  const [carga, setCarga] = useState({ activo: true, progreso: null, bytes: 0 });
  const [error, setError] = useState(null);
  const [filtros, setFiltros] = useState(FILTROS_INICIALES);
  const [colorPor, setColorPor] = useState('cultivo');
  const [tamanoPor, setTamanoPor] = useState('pagerank');
  const [umbral, setUmbral] = useState(1);
  const [mostrarAristas, setMostrarAristas] = useState(true);
  const [seleccion, setSeleccion] = useState(null);
  const [hover, setHover] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [listaAbierta, setListaAbierta] = useState(false);
  const [visibles, setVisibles] = useState(0);

  const contenedorRef = useRef(null);
  const sigmaRef = useRef(null);
  const capaRef = useRef(null);
  const estadoRef = useRef({});

  // ---- carga de datos ----
  useEffect(() => {
    let cancelado = false;
    setCarga({ activo: true, progreso: null, bytes: 0 });
    setError(null);
    setModelo(null);
    setSeleccion(null);
    setHover(null);
    setFiltros(FILTROS_INICIALES);
    cargarRed(red, (p, b) => { if (!cancelado) setCarga({ activo: true, progreso: p, bytes: b }); })
      .then((datos) => {
        if (cancelado) return;
        const m = construirGrafo(datos);
        setModelo(m);
        setColorPor(red === 'colombia' ? 'departamento' : 'cultivo');
        setUmbral(red === 'colombia' ? m.meta.weight_quantiles.p75 : m.meta.weight_quantiles.min);
        setCarga({ activo: false, progreso: 1, bytes: 0 });
      })
      .catch((e) => { if (!cancelado) { console.error(e); setError(String(e.message || e)); setCarga({ activo: false }); } });
    return () => { cancelado = true; };
  }, [red]);

  // ---- estado compartido con los reducers de sigma ----
  const conjuntoVisible = useMemo(() => {
    if (!modelo) return null;
    const f = filtros;
    const todoCultivo = f.tomate && f.tomateInv && f.pimenton && f.sin;
    const sinFiltro = !f.dep && !f.mun && todoCultivo && f.zona === 'todas' && f.comunidad === '';
    if (sinFiltro) return null;
    const set = new Set();
    modelo.registros.forEach((r) => {
      if (f.dep && r.dep !== f.dep) return;
      if (f.mun && `${r.dep}|${r.mun}` !== f.mun) return;
      if (f.zona === 'principal' && !r.principal) return;
      if (f.zona === 'secundaria' && r.principal) return;
      if (f.comunidad !== '' && r.lv !== Number(f.comunidad)) return;
      const c = r.cultivo;
      if (c === 'tomate' && !f.tomate) return;
      if (c === 'tomateInv' && !f.tomateInv) return;
      if (c === 'pimenton' && !f.pimenton) return;
      if (c === 'mixto' && !(f.tomate || f.tomateInv || f.pimenton)) return;
      if (c === 'sin' && !f.sin) return;
      set.add(r.id);
    });
    return set;
  }, [modelo, filtros]);

  const vecinosSeleccion = useMemo(() => {
    if (!modelo || !seleccion || !modelo.graph.hasNode(seleccion)) return null;
    return new Set(modelo.graph.neighbors(seleccion));
  }, [modelo, seleccion]);

  useEffect(() => {
    if (!modelo) return;
    setVisibles(conjuntoVisible ? conjuntoVisible.size : modelo.registros.length);
  }, [modelo, conjuntoVisible]);

  const colorNodo = useCallback((r) => {
    if (!modelo) return '#999';
    switch (colorPor) {
      case 'departamento': return colorDepartamento(r.dep);
      case 'comunidad': return colorComunidad(r.lv, modelo.comunidades);
      case 'betweenness': return colorMetrica(Math.sqrt(r.bc / (modelo.maxBc || 1)));
      case 'pagerank': return colorMetrica(Math.sqrt(r.pr / (modelo.maxPr || 1)));
      default: return COLOR_CULTIVO[r.cultivo].color;
    }
  }, [modelo, colorPor]);

  const tamanoNodo = useCallback((r) => {
    if (!modelo) return 3;
    const base = red === 'colombia' ? 2 : 3;
    const extra = red === 'colombia' ? 9 : 11;
    switch (tamanoPor) {
      case 'betweenness': return base + extra * Math.sqrt(r.bc / (modelo.maxBc || 1));
      case 'grado': return base + extra * Math.sqrt(r.grado / (modelo.maxGrado || 1));
      case 'uniforme': return base + 1.5;
      default: return base + extra * Math.sqrt(r.pr / (modelo.maxPr || 1));
    }
  }, [modelo, tamanoPor, red]);

  estadoRef.current = { modelo, conjuntoVisible, seleccion, vecinosSeleccion, colorNodo, tamanoNodo, umbral, mostrarAristas };

  // ---- instancia de sigma ----
  useEffect(() => {
    if (!modelo || !contenedorRef.current) return undefined;
    const { graph } = modelo;
    const modeloLocal = modelo;
    const maxPeso = modelo.meta.weight_quantiles.max;
    const logMax = Math.log(maxPeso + 1);

    const renderer = new Sigma(graph, contenedorRef.current, {
      allowInvalidContainer: true,
      renderLabels: true,
      labelFont: 'Inter, sans-serif',
      labelSize: 12,
      labelWeight: '600',
      labelColor: { color: COLOR_ETIQUETA },
      defaultDrawNodeHover: dibujarHover,
      labelRenderedSizeThreshold: red === 'colombia' ? 7 : 5,
      labelDensity: 0.1,
      labelGridCellSize: 110,
      hideEdgesOnMove: true,
      hideLabelsOnMove: true,
      zIndex: true,
      defaultEdgeColor: COLOR_ARISTA,
      nodeReducer: (node, data) => {
        const st = estadoRef.current;
        const r = modeloLocal.porId.get(node);
        if (!r) return data;
        const res = { ...data, size: st.tamanoNodo(r), color: st.colorNodo(r), zIndex: 1 };
        if (st.conjuntoVisible && !st.conjuntoVisible.has(node)) { res.hidden = true; return res; }
        if (st.seleccion) {
          if (node === st.seleccion) { res.zIndex = 3; res.size = res.size * 1.4 + 2; res.forceLabel = true; res.highlighted = true; }
          else if (st.vecinosSeleccion && st.vecinosSeleccion.has(node)) { res.zIndex = 2; res.forceLabel = res.size > 5; }
          else { res.color = COLOR_ATENUADO; res.zIndex = 0; res.label = ''; }
        }
        return res;
      },
      edgeReducer: (edge, data) => {
        const st = estadoRef.current;
        const res = { ...data };
        if (!st.mostrarAristas || data.weight < st.umbral) { res.hidden = true; return res; }
        const [s, tg] = modeloLocal.graph.extremities(edge);
        if (st.conjuntoVisible && (!st.conjuntoVisible.has(s) || !st.conjuntoVisible.has(tg))) { res.hidden = true; return res; }
        const w = Math.log(data.weight + 1) / logMax;
        res.size = 0.4 + 1.8 * w;
        if (st.seleccion) {
          if (s === st.seleccion || tg === st.seleccion) { res.color = COLOR_ARISTA_ACTIVA; res.size = 1 + 2.5 * w; res.zIndex = 2; }
          else { res.color = 'rgba(143, 216, 180, 0.05)'; res.zIndex = 0; }
        } else {
          res.color = `rgba(143, 216, 180, ${0.12 + 0.4 * w})`;
        }
        return res;
      },
    });

    const capa = bindLeafletLayer(renderer, {
      tileLayer: { urlTemplate: TILES.url, attribution: TILES.attribution },
      getNodeLatLng: (a) => ({ lat: a.lat, lng: a.lng }),
    });

    renderer.on('enterNode', ({ node }) => setHover(node));
    renderer.on('leaveNode', () => setHover(null));
    renderer.on('clickNode', ({ node }) => setSeleccion((s) => (s === node ? null : node)));
    renderer.on('clickStage', () => setSeleccion(null));

    sigmaRef.current = renderer;
    capaRef.current = capa;
    if (process.env.NODE_ENV === 'development') window.__sigma = renderer;
    return () => {
      sigmaRef.current = null;
      try { capa.clean(); } catch (e) { /* la capa ya fue destruida */ }
      renderer.kill();
      sigmaRef.current = null;
      capaRef.current = null;
    };
  }, [modelo, red]);

  // Vuelve a aplicar los reducers cuando cambia el estado visual.
  useEffect(() => {
    if (sigmaRef.current && modelo) sigmaRef.current.refresh({ skipIndexation: true });
  }, [modelo, conjuntoVisible, seleccion, vecinosSeleccion, colorNodo, tamanoNodo, umbral, mostrarAristas]);

  // ---- navegación de cámara ----
  const acercar = () => sigmaRef.current && sigmaRef.current.getCamera().animatedZoom({ duration: 300 });
  const alejar = () => sigmaRef.current && sigmaRef.current.getCamera().animatedUnzoom({ duration: 300 });
  const recentrar = () => sigmaRef.current && sigmaRef.current.getCamera().animatedReset({ duration: 500 });

  const enfocarNodos = useCallback((ids, ratio) => {
    const s = sigmaRef.current;
    if (!s || ids.length === 0) return;
    let minX = Infinity; let maxX = -Infinity; let minY = Infinity; let maxY = -Infinity;
    ids.forEach((id) => {
      const d = s.getNodeDisplayData(id);
      if (!d) return;
      minX = Math.min(minX, d.x); maxX = Math.max(maxX, d.x); minY = Math.min(minY, d.y); maxY = Math.max(maxY, d.y);
    });
    if (!Number.isFinite(minX)) return;
    const cam = s.getCamera();
    const extent = Math.max(maxX - minX, maxY - minY);
    const r = ratio != null ? ratio : Math.max(0.02, Math.min(1, extent * 1.6 || 0.05));
    cam.animate({ x: (minX + maxX) / 2, y: (minY + maxY) / 2, ratio: r }, { duration: 600 });
  }, []);

  // ---- búsqueda ----
  const resultadosBusqueda = useMemo(() => {
    if (!modelo || busqueda.trim().length < 2) return [];
    const q = busqueda.trim().toLowerCase();
    const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
    const qn = norm(q);
    const out = [];
    for (const mun of modelo.municipios) {
      if (norm(mun.mun).includes(qn)) out.push({ tipo: 'municipio', label: capitalizar(mun.mun), sub: `${capitalizar(mun.dep)} · ${mun.ids.length} veredas`, clave: `${mun.dep}|${mun.mun}`, ids: mun.ids });
      if (out.length >= 6) break;
    }
    for (const r of modelo.registros) {
      if (r.vereda && norm(r.vereda).includes(qn)) out.push({ tipo: 'vereda', label: capitalizar(r.vereda), sub: `${capitalizar(r.mun)}, ${capitalizar(r.dep)}`, id: r.id });
      if (out.length >= 14) break;
    }
    return out;
  }, [modelo, busqueda]);

  const elegirResultado = (res) => {
    setListaAbierta(false);
    setBusqueda(res.label);
    if (res.tipo === 'vereda') {
      setSeleccion(res.id);
      enfocarNodos([res.id], red === 'colombia' ? 0.06 : 0.12);
    } else {
      setSeleccion(null);
      setFiltros((f) => ({ ...f, mun: res.clave, dep: '' }));
      setTimeout(() => enfocarNodos(res.ids), 50);
    }
  };

  const limpiar = () => { setFiltros(FILTROS_INICIALES); setSeleccion(null); setBusqueda(''); };

  // ---- datos del nodo activo ----
  const activo = (seleccion || hover) && modelo ? modelo.porId.get(seleccion || hover) : null;
  const vecinosActivo = useMemo(() => {
    if (!activo || !modelo) return [];
    const g = modelo.graph;
    const lista = [];
    g.forEachEdge(activo.id, (edge, attrs, s, tg) => {
      const otro = s === activo.id ? tg : s;
      lista.push({ id: otro, peso: attrs.weight, reg: modelo.porId.get(otro) });
    });
    lista.sort((a, b) => b.peso - a.peso);
    return lista.slice(0, 8);
  }, [activo, modelo]);

  const q = modelo ? modelo.meta.weight_quantiles : null;
  const aristasVisibles = modelo && mostrarAristas ? aristasSobreUmbral(modelo.pesos, umbral) : 0;
  const logMin = q ? Math.log(q.min) : 0;
  const logTop = q ? Math.log(q.p99) : 1;
  const umbralSlider = q ? ((Math.log(umbral) - logMin) / (logTop - logMin || 1)) * 1000 : 0;
  const onSlider = (v) => { const u = Math.exp(logMin + (v / 1000) * (logTop - logMin)); setUmbral(Math.max(q.min, Math.round(u))); };

  const r = t.resultados.redes;

  const Filtros = (
    <div className="panel-bloque filtros">
      <h4>{ui.filtros}</h4>
      {red === 'colombia' && modelo && (
        <div className="filtro">
          <label className="campo">{ui.departamento}
            <select value={filtros.dep} onChange={(e) => setFiltros((f) => ({ ...f, dep: e.target.value, mun: '' }))}>
              <option value="">{ui.todos}</option>
              {modelo.departamentos.map((d) => <option key={d} value={d}>{capitalizar(d)}</option>)}
            </select>
          </label>
        </div>
      )}
      {modelo && (
        <div className="filtro">
          <label className="campo">Municipio
            <select value={filtros.mun} onChange={(e) => setFiltros((f) => ({ ...f, mun: e.target.value }))}>
              <option value="">{ui.todos}</option>
              {modelo.municipios.filter((m) => !filtros.dep || m.dep === filtros.dep).map((m) => (
                <option key={`${m.dep}|${m.mun}`} value={`${m.dep}|${m.mun}`}>{capitalizar(m.mun)}{red === 'colombia' && !filtros.dep ? ` (${capitalizar(m.dep)})` : ''}</option>
              ))}
            </select>
          </label>
        </div>
      )}
      <div className="filtro">
        <span className="campo" style={{ display: 'block', marginBottom: 4 }}>{ui.cultivo}</span>
        <div className="casillas">
          {[['tomate', ui.tomate], ['tomateInv', ui.tomateInv], ['pimenton', ui.pimenton], ['sin', ui.sinCultivo]].map(([k, label]) => (
            <label key={k}><input type="checkbox" checked={filtros[k]} onChange={(e) => setFiltros((f) => ({ ...f, [k]: e.target.checked }))} /><i style={{ background: COLOR_CULTIVO[k].color }} />{label}</label>
          ))}
        </div>
      </div>
      <div className="filtro">
        <label className="campo">{ui.zona}
          <select value={filtros.zona} onChange={(e) => setFiltros((f) => ({ ...f, zona: e.target.value }))}>
            <option value="todas">{ui.todos}</option>
            <option value="principal">{ui.zonaPrincipal}</option>
            <option value="secundaria">{ui.zonaSecundaria}</option>
          </select>
        </label>
      </div>
      {modelo && (
        <div className="filtro">
          <label className="campo">{ui.comunidad}
            <select value={filtros.comunidad} onChange={(e) => setFiltros((f) => ({ ...f, comunidad: e.target.value }))}>
              <option value="">{ui.todos}</option>
              {modelo.comunidades.map((c) => <option key={c} value={c}>Comunidad {c}</option>)}
            </select>
          </label>
        </div>
      )}
      <div className="filtro">
        <label className="campo">{ui.colorPor}
          <select value={colorPor} onChange={(e) => setColorPor(e.target.value)}>
            {Object.entries(ui.colorOpciones).filter(([k]) => red === 'colombia' || k !== 'departamento').map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </label>
      </div>
      <div className="filtro">
        <label className="campo">{ui.tamanoPor}
          <select value={tamanoPor} onChange={(e) => setTamanoPor(e.target.value)}>
            {Object.entries(ui.tamanoOpciones).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </label>
      </div>
      {q && (
        <div className="filtro">
          <label className="campo">{ui.umbral}: {formatoNumero(umbral)} · {ui.aristas}: {formatoNumero(aristasVisibles)}
            <input type="range" min="0" max="1000" value={Math.round(umbralSlider)} onChange={(e) => onSlider(Number(e.target.value))} />
          </label>
          <div className="casillas" style={{ marginTop: 6 }}>
            <label><input type="checkbox" checked={mostrarAristas} onChange={(e) => setMostrarAristas(e.target.checked)} />{ui.mostrarAristas}</label>
          </div>
        </div>
      )}
      <div className="filtros-acciones">
        <button className="boton boton--claro boton--peq" onClick={limpiar}>{ui.limpiar}</button>
        <a className="boton boton--claro boton--peq" href={`${process.env.PUBLIC_URL}/${red === 'colombia' ? 'final_Colombia_network_paper.gexf' : 'final_Antioquia_network_paper.gexf'}`} download>{ui.descargar}</a>
      </div>
    </div>
  );

  const Leyenda = modelo && (
    <div className="panel-bloque">
      <h4>{ui.leyenda}</h4>
      {colorPor === 'cultivo' && (
        <div className="leyenda-lista">{Object.entries(COLOR_CULTIVO).map(([k, v]) => <span key={k}><i style={{ background: v.color }} />{v.label}</span>)}</div>
      )}
      {colorPor === 'departamento' && (
        <div className="leyenda-lista">{modelo.departamentos.map((d) => <span key={d}><i style={{ background: colorDepartamento(d) }} />{capitalizar(d)}</span>)}</div>
      )}
      {colorPor === 'comunidad' && (
        <div className="leyenda-lista">{modelo.comunidades.map((c) => <span key={c}><i style={{ background: colorComunidad(c, modelo.comunidades) }} />Comunidad {c}</span>)}</div>
      )}
      {(colorPor === 'betweenness' || colorPor === 'pagerank') && (
        <div>
          <div className="leyenda-gradiente" />
          <div className="leyenda-extremos"><span>{colorPor === 'betweenness' ? 'Intermediación' : 'PageRank'} baja</span><span>alta</span></div>
        </div>
      )}
      <div className="leyenda-tamano"><i style={{ width: 6, height: 6 }} /><i style={{ width: 12, height: 12 }} /><i style={{ width: 18, height: 18 }} /> Tamaño = {ui.tamanoOpciones[tamanoPor].toLowerCase()}</div>
    </div>
  );

  const PanelNodo = (
    <div className="panel-bloque">
      <h4>{ui.nodoTitulo}</h4>
      {!activo ? (
        <p className="nodo-vacio">{ui.nodoAyuda}</p>
      ) : (
        <div>
          <div className="nodo-nombre">{capitalizar(activo.vereda) || activo.id}</div>
          <div className="nodo-ubicacion">{capitalizar(activo.mun)}, {capitalizar(activo.dep)} · código {activo.id}</div>
          <div className="nodo-chips">
            <span className="chip" style={{ background: COLOR_CULTIVO[activo.cultivo].color, color: '#07111f' }}>{COLOR_CULTIVO[activo.cultivo].label}</span>
            <span className="chip">{activo.principal ? 'Zona productora principal' : 'Zona secundaria / tránsito'}</span>
            <span className="chip">Comunidad {activo.lv}</span>
          </div>
          <div className="nodo-metricas">
            <div><span>PageRank{red === 'antioquia' ? ' (Antioquia)' : ''}</span><strong>{activo.pr.toExponential(2)} · {ui.ranking} {formatoNumero(modelo.rankPr.get(activo.id))} {ui.de} {formatoNumero(modelo.registros.length)}</strong></div>
            <div><span>Intermediación{red === 'antioquia' ? ' (Antioquia)' : ''}</span><strong>{activo.bc.toExponential(2)} · {ui.ranking} {formatoNumero(modelo.rankBc.get(activo.id))}</strong></div>
            <div><span>{ui.grado}</span><strong>{formatoNumero(activo.grado)} · {ui.ranking} {formatoNumero(modelo.rankGrado.get(activo.id))}</strong></div>
            {red === 'antioquia' && <div><span>PageRank / intermediación (red nacional)</span><strong>{activo.prNacional.toExponential(2)} / {activo.bcNacional.toExponential(2)}</strong></div>}
            <div><span>Coordenadas</span><strong>{activo.lat.toFixed(3)}, {activo.lon.toFixed(3)}</strong></div>
          </div>
          {vecinosActivo.length > 0 && (
            <div>
              <h4 style={{ marginTop: 12 }}>{ui.vecinos}</h4>
              <ul className="vecinos">
                {vecinosActivo.map((v) => (
                  <li key={v.id}>
                    <button onClick={() => { setSeleccion(v.id); enfocarNodos([v.id], red === 'colombia' ? 0.06 : 0.12); }}>
                      <span>{capitalizar(v.reg.vereda) || v.id} <small style={{ color: 'var(--c-ink-3)' }}>({capitalizar(v.reg.mun)})</small></span>
                      <span className="peso">{formatoNumero(v.peso)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const Stats = modelo && (
    <div className="panel-bloque">
      <div className="stats-mini">
        <div><strong>{formatoNumero(modelo.registros.length)}</strong><span>{ui.stats.veredas}</span></div>
        <div><strong>{formatoNumero(modelo.meta.edges)}</strong><span>{ui.stats.aristas}</span></div>
        <div><strong>{formatoNumero(modelo.municipios.length)}</strong><span>{ui.stats.municipios}</span></div>
        <div><strong>{formatoNumero(visibles)}</strong><span>{ui.stats.visibles}</span></div>
      </div>
    </div>
  );

  return (
    <section id="redes" className="seccion">
      <div className="contenedor contenedor--ancho">
        <div className="seccion-cabecera">
          <span className="seccion-kicker">04</span>
          <h2 className="seccion-titulo"><T>{r.titulo}</T></h2>
          <p className="seccion-lead"><T>{r.lead}</T></p>
        </div>

        <div className="redes-marco">
          <div className="redes-barra">
            <div className="segmentado" role="group" aria-label={ui.seleccionRed}>
              <button className={red === 'antioquia' ? 'activo' : ''} onClick={() => setRed('antioquia')}>{ui.antioquia}</button>
              <button className={red === 'colombia' ? 'activo' : ''} onClick={() => setRed('colombia')}>{ui.colombia}</button>
            </div>
            <div className="buscador">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
              <input
                type="search" placeholder={ui.buscar} value={busqueda} disabled={!modelo}
                onChange={(e) => { setBusqueda(e.target.value); setListaAbierta(true); }}
                onFocus={() => setListaAbierta(true)}
                onBlur={() => setTimeout(() => setListaAbierta(false), 150)}
                aria-label={ui.buscar}
              />
              {listaAbierta && busqueda.trim().length >= 2 && (
                <div className="buscador-lista">
                  {resultadosBusqueda.length === 0 && <div className="vacio">{ui.sinResultados}</div>}
                  {resultadosBusqueda.map((res) => (
                    <button key={`${res.tipo}-${res.id || res.clave}`} onMouseDown={(e) => e.preventDefault()} onClick={() => elegirResultado(res)}>
                      <span>{res.label}</span><small>{res.tipo === 'municipio' ? 'Municipio · ' : 'Vereda · '}{res.sub}</small>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="redes-cuerpo">
            <div className="redes-lienzo">
              <div ref={contenedorRef} className="sigma-container" />
              <div className="redes-controles">
                <button onClick={acercar} title={ui.acercar} aria-label={ui.acercar}><Icono tipo="mas" /></button>
                <button onClick={alejar} title={ui.alejar} aria-label={ui.alejar}><Icono tipo="menos" /></button>
                <button onClick={recentrar} title={ui.recentrar} aria-label={ui.recentrar}><Icono tipo="centrar" /></button>
              </div>
              {carga.activo && (
                <div className="redes-carga">
                  <div>
                    <div className="spinner" />
                    <div>{ui.cargando} {red === 'colombia' ? '(≈5,6 MB)' : '(≈0,7 MB)'}</div>
                    {carga.progreso != null && <div className="barra"><i style={{ width: `${Math.round(carga.progreso * 100)}%` }} /></div>}
                  </div>
                </div>
              )}
              {error && <div className="redes-carga"><div>Error al cargar la red: {error}</div></div>}
            </div>

            <aside className="redes-panel">
              {Stats}
              {PanelNodo}
              {Leyenda}
              {Filtros}
            </aside>
          </div>
        </div>

        <div className="como-leer">
          <details open>
            <summary>{r.comoLeer.titulo}</summary>
            <ul>{r.comoLeer.comun.map((p, k) => <li key={k}><T>{p}</T></li>)}</ul>
            <h4>Red de Colombia</h4>
            <ul>{r.comoLeer.colombia.map((p, k) => <li key={k}><T>{p}</T></li>)}</ul>
            <h4>Red de Antioquia</h4>
            <ul>{r.comoLeer.antioquia.map((p, k) => <li key={k}><T>{p}</T></li>)}</ul>
          </details>
        </div>
      </div>
    </section>
  );
}

export default RedesTransmision;
