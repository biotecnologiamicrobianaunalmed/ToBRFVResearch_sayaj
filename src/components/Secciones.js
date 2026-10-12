import React from 'react';
import './Secciones.css';
import VirusBackground from './VirusBackground';
import { CAMPOS_TOMATE_ANTIOQUIA, DETECCION_MATERIALES } from '../data/sitios';
import T from '../lib/cientifico';

const ICONOS = {
  leaf: <path d="M5 19c6 0 13-4 14-14C9 5 5 11 5 19Zm0 0c2-5 5-8 9-10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />,
  flask: <path d="M9 3h6M10 3v6L4 20h16l-6-11V3M7 15h10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />,
  dna: <path d="M6 3c0 6 12 6 12 12M6 21c0-6 12-6 12-12M8 8h8M8 16h8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />,
  tree: <path d="M12 3v18M12 9H6V5M12 9h6v4M12 15H8v4M12 15h5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />,
  map: <path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2V6Zm6-2v14m6-12v14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />,
  network: <g fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="5" cy="6" r="2.3" /><circle cx="19" cy="6" r="2.3" /><circle cx="12" cy="18" r="2.3" /><circle cx="12" cy="11" r="2" /><path d="M7 7l3.3 2.6M17 7l-3.3 2.6M12 13v3" /></g>,
  test: <path d="M8 3h8M9 3v4l-4 9a3 3 0 0 0 3 4h8a3 3 0 0 0 3-4l-4-9V3M7 14h10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />,
};

function Cabecera({ kicker, titulo, lead }) {
  return (
    <div className="seccion-cabecera">
      {kicker && <span className="seccion-kicker">{kicker}</span>}
      <h2 className="seccion-titulo"><T>{titulo}</T></h2>
      {lead && <p className="seccion-lead"><T>{lead}</T></p>}
    </div>
  );
}

export function Introduccion({ t }) {
  const i = t.intro;
  return (
    <section id="introduccion" className="seccion seccion--alt">
      <div className="contenedor">
        <Cabecera kicker="01" titulo={i.titulo} lead={i.lead} />
        <div className="prosa prosa--dos">
          {i.parrafos.map((p, k) => <p key={k}><T>{p}</T></p>)}
        </div>
        <div className="rejilla rejilla--2" style={{ marginTop: 36 }}>
          <div className="tarjeta">
            <h3>{i.hipotesisTitulo}</h3>
            <ol className="lista-numerada" style={{ marginTop: 12 }}>
              {i.hipotesis.map((h, k) => <li key={k}><T>{h}</T></li>)}
            </ol>
          </div>
          <div className="tarjeta">
            <h3>{i.objetivoTitulo}</h3>
            <p><T>{i.objetivoGeneral}</T></p>
            <h3 style={{ marginTop: 18 }}>{i.objetivosTitulo}</h3>
            <ol className="lista-numerada" style={{ marginTop: 12 }}>
              {i.objetivos.map((o, k) => <li key={k}><T>{o}</T></li>)}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Metodologia({ t }) {
  const m = t.metodologia;
  return (
    <section id="metodologia" className="seccion">
      <div className="contenedor">
        <Cabecera kicker="02" titulo={m.titulo} lead={m.lead} />
        <div className="rejilla rejilla--2">
          {m.bloques.map((b) => (
            <div className="tarjeta metodo" key={b.titulo}>
              <div className="metodo-icono" aria-hidden="true"><svg viewBox="0 0 24 24">{ICONOS[b.icono]}</svg></div>
              <div>
                <h3><T>{b.titulo}</T></h3>
                <p><T>{b.texto}</T></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Resultado({ num, titulo, children }) {
  return (
    <div className="resultado">
      <div className="resultado-cabecera">
        <span className="resultado-num">{num}</span>
        <h3 className="resultado-titulo"><T>{titulo}</T></h3>
      </div>
      {children}
    </div>
  );
}

function TablaMateriales({ filas, columnas }) {
  return (
    <div className="tabla-envoltura">
      <table className="tabla">
        <thead><tr>{columnas.map((c) => <th key={c}>{c}</th>)}</tr></thead>
        <tbody>
          {filas.map((f) => (
            <tr key={f.material}><td>{f.material}</td><td>{f.positivos}</td><td>{f.ct}</td><td>{f.mediana}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Resultados({ t }) {
  const r = t.resultados;
  const pub = process.env.PUBLIC_URL;
  return (
    <section id="resultados" className="seccion seccion--alt">
      <div className="contenedor">
        <Cabecera kicker="03" titulo={r.titulo} lead={r.lead} />

        <Resultado num="3.1" titulo={r.deteccion.titulo}>
          <div className="resultado-rejilla">
            <div className="prosa">{r.deteccion.texto.map((p, k) => <p key={k}><T>{p}</T></p>)}</div>
            <div>
              <p className="nota" style={{ marginBottom: 8 }}>{r.deteccion.tablaTitulo}</p>
              <div className="tabla-envoltura">
                <table className="tabla">
                  <thead><tr>{r.deteccion.columnas.map((c) => <th key={c}>{c}</th>)}</tr></thead>
                  <tbody>
                    {CAMPOS_TOMATE_ANTIOQUIA.map((c) => (
                      <tr key={c.municipio}>
                        <td>{c.municipio}{c.nota && <span className="chip chip--alerta" style={{ marginLeft: 6 }}>1 negativo</span>}</td>
                        <td>{c.campos}</td><td>{c.positivos}</td><td>{c.variedades}</td><td>{c.ct}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Resultado>

        <Resultado num="3.2" titulo={r.nacional.titulo}>
          <div className="prosa prosa--dos">{r.nacional.texto.map((p, k) => <p key={k}><T>{p}</T></p>)}</div>
        </Resultado>

        <Resultado num="3.3" titulo={r.hospedantes.titulo}>
          <p className="seccion-lead" style={{ marginBottom: 20 }}><T>{r.hospedantes.lead}</T></p>
          <div className="rejilla rejilla--2">
            <div className="tarjeta hospedante">
              <img className="hospedante-imagen" src={`${pub}/tomato_tobrfv.jpg`} alt="Frutos de tomate con síntomas de ToBRFV" loading="lazy" />
              <h3><span><T>{r.hospedantes.tomate.nombre}</T></span> <span className="chip chip--tomate">{r.hospedantes.tomate.etiqueta}</span></h3>
              <ul className="lista-check">{r.hospedantes.tomate.sintomas.map((s, k) => <li key={k}><T>{s}</T></li>)}</ul>
              <TablaMateriales filas={DETECCION_MATERIALES.tomate} columnas={r.hospedantes.columnas} />
            </div>
            <div className="tarjeta hospedante hospedante--pimenton">
              <img className="hospedante-imagen" src={`${pub}/pepper_tobrfv.jpg`} alt="Frutos de pimentón con síntomas de ToBRFV" loading="lazy" />
              <h3><span><T>{r.hospedantes.pimenton.nombre}</T></span> <span className="chip chip--pimenton">{r.hospedantes.pimenton.etiqueta}</span></h3>
              <ul className="lista-check">{r.hospedantes.pimenton.sintomas.map((s, k) => <li key={k}><T>{s}</T></li>)}</ul>
              <TablaMateriales filas={DETECCION_MATERIALES.pimenton} columnas={r.hospedantes.columnas} />
            </div>
          </div>
          <p className="nota" style={{ marginTop: 12 }}><T>{r.hospedantes.nota}</T></p>
        </Resultado>

        <Resultado num="3.4" titulo={r.riesgo.titulo}>
          <div className="prosa prosa--dos">{r.riesgo.texto.map((p, k) => <p key={k}><T>{p}</T></p>)}</div>
        </Resultado>
      </div>

      <div className="seccion seccion--oscura genomica-fondo" style={{ marginTop: 56, paddingBottom: 72 }}>
        <VirusBackground />
        <div className="contenedor genomica-contenido">
          <Resultado num="3.5" titulo={r.genomica.titulo}>
            <div className="resultado-rejilla">
              <div className="prosa">{r.genomica.texto.map((p, k) => <p key={k}><T>{p}</T></p>)}</div>
              <div>
                <h4 style={{ fontSize: '1.05rem' }}>{r.genomica.visorTitulo}</h4>
                <p style={{ fontSize: '0.95rem' }} className="justificado"><T>{r.genomica.visorTexto}</T></p>
                <div className="visor-proteina">
                  <iframe src={`${pub}/molstar-viewer.html`} title="Visor Mol* de la proteína de movimiento del ToBRFV" loading="lazy" />
                </div>
                <p className="nota" style={{ marginTop: 10 }}><T>{r.genomica.visorPie}</T></p>
              </div>
            </div>
          </Resultado>
        </div>
      </div>

      <div className="contenedor" style={{ paddingTop: 56 }}>
        <Resultado num="3.6" titulo={r.lamp.titulo}>
          <div className="prosa prosa--dos">{r.lamp.texto.map((p, k) => <p key={k}><T>{p}</T></p>)}</div>
          <div className="metricas" style={{ marginTop: 20 }}>
            {r.lamp.metricas.map((m) => (
              <div className="metrica" key={m.label}><div className="metrica-valor">{m.valor}</div><div className="metrica-label"><T>{m.label}</T></div></div>
            ))}
          </div>
        </Resultado>
      </div>
    </section>
  );
}

export function Discusion({ t }) {
  return (
    <section id="discusion" className="seccion">
      <div className="contenedor">
        <Cabecera kicker="05" titulo={t.discusion.titulo} />
        <div className="prosa prosa--dos">{t.discusion.parrafos.map((p, k) => <p key={k}><T>{p}</T></p>)}</div>
      </div>
    </section>
  );
}

export function Conclusiones({ t }) {
  const c = t.conclusiones;
  return (
    <section id="conclusiones" className="seccion seccion--alt">
      <div className="contenedor">
        <Cabecera kicker="06" titulo={c.titulo} />
        <ol className="lista-numerada" style={{ maxWidth: 900 }}>
          {c.parrafos.map((p, k) => <li key={k}><T>{p}</T></li>)}
        </ol>
        <h3 className="subtitulo" style={{ marginTop: 40, marginBottom: 18 }}>{c.recomendacionesTitulo}</h3>
        <div className="recomendaciones">
          {c.recomendaciones.map((r) => (
            <div className="tarjeta" key={r.titulo}>
              <h3>{r.titulo}</h3>
              <ul className="lista-check">{r.items.map((it, k) => <li key={k}><T>{it}</T></li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Datos({ t }) {
  const d = t.datos;
  const pub = process.env.PUBLIC_URL;
  return (
    <section id="datos" className="seccion">
      <div className="contenedor">
        <Cabecera kicker="07" titulo={d.titulo} />
        <div className="rejilla rejilla--2">
          <div className="tarjeta">
            <h3>Publicaciones derivadas</h3>
            <ul className="datos-lista">
              {d.publicaciones.map((p) => <li key={p.capitulo}><span className="chip">{p.capitulo}</span><span><T>{p.texto}</T></span></li>)}
            </ul>
            <h3 style={{ marginTop: 22 }}>Accesiones</h3>
            <ul className="datos-lista">
              {d.accesiones.map((a) => <li key={a.label}><strong>{a.label}:</strong><code>{a.valor}</code></li>)}
            </ul>
          </div>
          <div className="tarjeta">
            <h3>Descargas</h3>
            <ul className="datos-lista">
              {d.descargas.map((x) => <li key={x.archivo}><a href={`${pub}/${x.archivo}`} download>{x.label}</a></li>)}
            </ul>
            <h3 style={{ marginTop: 22 }}>Fuentes externas</h3>
            <ul className="datos-lista">
              {d.fuentesExternas.map((f) => <li key={f.url}><a href={f.url} target="_blank" rel="noreferrer"><T>{f.label}</T></a></li>)}
            </ul>
          </div>
        </div>
        <div className="tarjeta" style={{ marginTop: 18 }}>
          <h3>Financiación y créditos</h3>
          <p><T>{d.financiacion}</T></p>
          <p style={{ marginTop: 10 }}><T>{d.creditos}</T></p>
        </div>
      </div>
    </section>
  );
}
