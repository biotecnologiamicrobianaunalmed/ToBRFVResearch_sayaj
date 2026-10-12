import React, { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip, useMap, useMapEvents, Pane } from 'react-leaflet';
import './MapaDistribucion.css';
import PAISES from '../data/paises';
import T from '../lib/cientifico';
import EPPO from '../data/eppo_reportes_pendiente_verificacion.json';
import { CAMPOS_TOMATE_ANTIOQUIA, CAMPOS_PIMENTON_ANTIOQUIA, MUESTREO_NACIONAL, RIESGO_CRUZADO_ANTIOQUIA, RIESGO_CRUZADO_COLOMBIA } from '../data/sitios';

export const TILES = {
  url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
  referencia: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
  attribution: 'Tiles &copy; Esri &mdash; Esri, HERE, Garmin, &copy; OpenStreetMap contributors',
};

const VISTAS = {
  mundo: { bounds: [[-50, -130], [65, 160]] },
  colombia: { bounds: [[-4.5, -80], [13, -66]] },
  antioquia: { bounds: [[5.45, -76.7], [7.1, -74.5]] },
};

// Colores pensados para el mapa base oscuro (Esri World Dark Gray).
const COLOR = { ncbi: '#3ec6dc', eppo: '#f2a541', tomate: '#e4573f', pimenton: '#f2a541', borde: '#eef3f9' };

function parseTSV(texto) {
  const filas = texto.split('\n').filter((l) => l.trim());
  const cab = filas[0].split('\t');
  return filas.slice(1).map((l) => {
    const v = l.split('\t');
    const o = {};
    cab.forEach((c, i) => { o[c] = v[i] || ''; });
    return o;
  });
}

function agruparPorPais(registros) {
  const g = {};
  registros.forEach((r) => {
    const pais = r.Country;
    if (!pais) return;
    if (!g[pais]) g[pais] = { pais, n: 0, tomate: 0, pimenton: 0, otros: 0, anios: [] };
    const e = g[pais];
    e.n += 1;
    const h = (r.Host || '').toLowerCase();
    if (h.includes('lycopersicum')) e.tomate += 1;
    else if (h.includes('capsicum')) e.pimenton += 1;
    else e.otros += 1;
    const a = (r.Collection_Date || '').slice(0, 4);
    if (/^\d{4}$/.test(a)) e.anios.push(Number(a));
  });
  return Object.values(g).map((e) => ({ ...e, anioMin: e.anios.length ? Math.min(...e.anios) : null, anioMax: e.anios.length ? Math.max(...e.anios) : null }));
}

function Vista({ vista }) {
  const map = useMap();
  useEffect(() => {
    map.flyToBounds(VISTAS[vista].bounds, { duration: 1.1, padding: [10, 10] });
  }, [vista, map]);
  return null;
}

function Zoom({ onZoom }) {
  const map = useMapEvents({ zoomend: () => onZoom(map.getZoom()) });
  useEffect(() => { onZoom(map.getZoom()); }, [map, onZoom]);
  return null;
}

// Une los datos de la tesis por municipio para construir un marcador por sitio.
function construirSitiosTesis() {
  const m = new Map();
  const clave = (s) => `${s.municipio}|${s.lat}`;
  const get = (s, dep) => {
    const k = clave(s);
    if (!m.has(k)) m.set(k, { municipio: s.municipio, departamento: dep || 'Antioquia', lat: s.lat, lon: s.lon, tomate: null, nacional: null, pimenton: false, riesgo: null });
    return m.get(k);
  };
  CAMPOS_TOMATE_ANTIOQUIA.forEach((s) => { get(s).tomate = s; });
  MUESTREO_NACIONAL.forEach((s) => { get(s, s.departamento).nacional = s; });
  CAMPOS_PIMENTON_ANTIOQUIA.forEach((s) => { get(s).pimenton = true; });
  RIESGO_CRUZADO_ANTIOQUIA.forEach((s) => { get(s).riesgo = s.ri; });
  RIESGO_CRUZADO_COLOMBIA.forEach((s) => { get(s, s.departamento).riesgo = s.ri; });
  return Array.from(m.values());
}

function MapaDistribucion({ t }) {
  const m = t.mapa;
  const [vista, setVista] = useState('mundo');
  const [zoom, setZoom] = useState(2);
  const [capas, setCapas] = useState({ ncbi: true, eppo: true, tesis: true });
  const [ncbi, setNcbi] = useState([]);
  const [sinPais, setSinPais] = useState(0);
  const [totalNcbi, setTotalNcbi] = useState(0);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data.tsv`)
      .then((r) => r.text())
      .then((txt) => {
        const regs = parseTSV(txt);
        setTotalNcbi(regs.length);
        setSinPais(regs.filter((r) => !r.Country).length);
        setNcbi(agruparPorPais(regs));
      })
      .catch((e) => console.error('No se pudo leer data.tsv', e));
  }, []);

  const eppoVisibles = useMemo(() => EPPO.paises.filter((p) => p.mostrar), []);
  const sitios = useMemo(() => construirSitiosTesis(), []);
  const mostrarTesis = capas.tesis && zoom >= 5;
  const mostrarRiesgo = mostrarTesis && zoom >= 7;
  const escala = zoom >= 8 ? 1.4 : zoom >= 6 ? 1.1 : 0.85;

  const toggle = (k) => setCapas((c) => ({ ...c, [k]: !c[k] }));

  return (
    <section id="mapa" className="seccion">
      <div className="contenedor contenedor--ancho">
        <div className="seccion-cabecera">
          <span className="seccion-kicker">Mapa interactivo</span>
          <h2 className="seccion-titulo"><T>{m.titulo}</T></h2>
          <p className="seccion-lead"><T>{m.intro}</T></p>
        </div>
        <div className="mapa-marco">
          <div className="mapa-barra">
            <div className="segmentado" role="group" aria-label="Escala del mapa">
              {['mundo', 'colombia', 'antioquia'].map((v) => (
                <button key={v} className={vista === v ? 'activo' : ''} onClick={() => setVista(v)}>{m.botones[v]}</button>
              ))}
            </div>
            <div className="capas">
              <label><input type="checkbox" checked={capas.ncbi} onChange={() => toggle('ncbi')} /> {m.capas.ncbi.label}</label>
              <label><input type="checkbox" checked={capas.eppo} onChange={() => toggle('eppo')} /> {m.capas.eppo.label}</label>
              <label><input type="checkbox" checked={capas.tesis} onChange={() => toggle('tesis')} /> {m.capas.tesis.label}</label>
            </div>
          </div>
          <div className="mapa-lienzo">
            <MapContainer bounds={VISTAS.mundo.bounds} minZoom={2} maxZoom={12} scrollWheelZoom={false} worldCopyJump>
              <TileLayer url={TILES.url} attribution={TILES.attribution} />
              <TileLayer url={TILES.referencia} opacity={0.9} />
              <Vista vista={vista} />
              <Zoom onZoom={setZoom} />
              <Pane name="riesgo" style={{ zIndex: 400 }} />
              <Pane name="ncbi" style={{ zIndex: 410 }} />
              <Pane name="eppo" style={{ zIndex: 420 }} />
              <Pane name="tesis" style={{ zIndex: 430 }} />

              {capas.eppo && eppoVisibles.map((p) => {
                const c = PAISES[p.pais_en];
                if (!c) return null;
                return (
                  <CircleMarker key={`eppo-${p.pais_en}`} pane="eppo" center={[c.lat, c.lon]} radius={12} pathOptions={{ color: COLOR.eppo, weight: 2.5, dashArray: '5 4', fill: false, opacity: 0.95 }}>
                    <Popup>
                      <div className="popup">
                        <h4>{p.pais}</h4>
                        <p><span className="chip chip--pimenton">EPPO</span><T>{p.estado_es}</T></p>
                        {p.subregiones && <p><T>{p.subregiones}</T></p>}
                        <p className="nota">{m.capas.eppo.pendiente}</p>
                      </div>
                    </Popup>
                  </CircleMarker>
                );
              })}

              {capas.ncbi && ncbi.map((e) => {
                const c = PAISES[e.pais];
                if (!c) { console.warn('Sin coordenadas para', e.pais); return null; }
                return (
                  <CircleMarker key={`ncbi-${e.pais}`} pane="ncbi" center={[c.lat, c.lon]} radius={4 + Math.sqrt(e.n) * 1.5} pathOptions={{ color: COLOR.borde, weight: 1.5, fillColor: COLOR.ncbi, fillOpacity: 0.85 }}>
                    <Tooltip direction="top" offset={[0, -6]}><strong>{c.es}</strong>: {e.n} secuencias</Tooltip>
                    <Popup>
                      <div className="popup">
                        <h4>{c.es}</h4>
                        <p><span className="chip">NCBI</span>{e.n} secuencias de ToBRFV</p>
                        <p>Tomate: {e.tomate} · Pimentón: {e.pimenton} · Otros/sin dato: {e.otros}</p>
                        {e.anioMin && <p>Colecta: {e.anioMin === e.anioMax ? e.anioMin : `${e.anioMin}–${e.anioMax}`}</p>}
                      </div>
                    </Popup>
                  </CircleMarker>
                );
              })}

              {mostrarRiesgo && sitios.filter((s) => s.riesgo != null).map((s) => (
                <CircleMarker key={`ri-${s.municipio}`} pane="riesgo" center={[s.lat, s.lon]} radius={(4 + s.riesgo * 3) * (zoom >= 9 ? 1.6 : 1)} pathOptions={{ color: COLOR.tomate, weight: 1, opacity: 0.6, fillColor: COLOR.tomate, fillOpacity: 0.18 }} interactive={false} />
              ))}

              {mostrarTesis && sitios.map((s) => {
                const positivo = (s.tomate && s.tomate.positivos > 0) || (s.nacional && s.nacional.resultado === '+');
                const soloRiesgo = !s.tomate && !s.nacional && !s.pimenton;
                const r = (soloRiesgo ? 4 : 7) * escala;
                const estilo = soloRiesgo
                  ? { color: COLOR.tomate, weight: 1.5, fillColor: '#1c1f24', fillOpacity: 0.9, dashArray: '2 3' }
                  : positivo
                    ? { color: COLOR.borde, weight: 1.5, fillColor: COLOR.tomate, fillOpacity: 0.95 }
                    : { color: COLOR.tomate, weight: 2.5, fillColor: '#fff', fillOpacity: 1 };
                return (
                  <React.Fragment key={`tesis-${s.municipio}-${s.lat}`}>
                    {s.pimenton && (
                      <CircleMarker pane="tesis" center={[s.lat, s.lon]} radius={r + 5} pathOptions={{ color: COLOR.pimenton, weight: 3, fillOpacity: 0 }} interactive={false} />
                    )}
                    <CircleMarker pane="tesis" center={[s.lat, s.lon]} radius={r} pathOptions={estilo}>
                      <Tooltip direction="right" offset={[8, 0]} permanent={zoom >= 9 && !soloRiesgo} className="etiqueta-mapa">{s.municipio}{soloRiesgo ? ` · riesgo ${s.riesgo.toFixed(2)}` : ''}</Tooltip>
                      <Popup>
                        <div className="popup">
                          <h4>{s.municipio} <small>({s.departamento})</small></h4>
                          {s.tomate && (
                            <p><span className="chip chip--tomate">Tomate · Cap. 2</span>{s.tomate.positivos} de {s.tomate.campos} campos positivos · variedades {s.tomate.variedades} · Ct {s.tomate.ct}{s.tomate.nota ? ` · ${s.tomate.nota}` : ''}</p>
                          )}
                          {s.nacional && (
                            <p><span className="chip chip--tomate">Tomate · Cap. 3</span>{s.nacional.resultado === '+' ? 'Positivo' : 'Negativo'} en el muestreo nacional{s.nacional.nota ? ` · ${s.nacional.nota}` : ''}</p>
                          )}
                          {s.pimenton && (
                            <p><span className="chip chip--pimenton">Pimentón · Cap. 3</span>Campos de pimentón positivos (20 campos entre Marinilla y El Peñol, Ct 21,6–32,0). Primer reporte en Colombia.</p>
                          )}
                          {s.riesgo != null && (
                            <p><span className="chip">Riesgo cruzado</span>Índice de riesgo tomate–pimentón: {s.riesgo.toFixed(2)} (modelo gravity, Cap. 2)</p>
                          )}
                          <p className="nota">Punto en la cabecera municipal; no indica la ubicación del campo.</p>
                        </div>
                      </Popup>
                    </CircleMarker>
                  </React.Fragment>
                );
              })}
            </MapContainer>
            {capas.tesis && zoom < 5 && <div className="mapa-ayuda">Acércate a Colombia para ver las detecciones de la tesis.</div>}
          </div>
          <div className="mapa-leyenda">
            <span><i className="ley-icono ley-ncbi" />{m.leyenda.ncbi}</span>
            <span><i className="ley-icono ley-eppo" />{m.leyenda.eppo}</span>
            <span><i className="ley-icono ley-tomate" />{m.leyenda.tomatePos}</span>
            <span><i className="ley-icono ley-neg" />{m.leyenda.tomateNeg}</span>
            <span><i className="ley-icono ley-pim" />{m.leyenda.pimenton}</span>
            <span><i className="ley-icono ley-riesgo" />{m.leyenda.riesgo}</span>
          </div>
        </div>
        <details className="mapa-fuentes">
          <summary>Fuentes y notas</summary>
          <ul>
            <li><strong>{m.capas.ncbi.label}:</strong> <T>{m.capas.ncbi.descripcion}</T> <T>{m.capas.ncbi.fuente}</T> {totalNcbi > 0 && `Registros: ${totalNcbi} (${sinPais} sin país, no graficados).`}</li>
            <li><strong>{m.capas.eppo.label}:</strong> <T>{m.capas.eppo.descripcion}</T> <T>{m.capas.eppo.fuente}</T> <em>{m.capas.eppo.pendiente}</em></li>
            <li><strong>{m.capas.tesis.label}:</strong> <T>{m.capas.tesis.descripcion}</T></li>
            <li><T>{m.notaFuentes}</T></li>
          </ul>
        </details>
      </div>
    </section>
  );
}

export default MapaDistribucion;
