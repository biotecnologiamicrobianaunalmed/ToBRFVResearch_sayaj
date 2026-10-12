import React, { useEffect, useState } from 'react';
import './Hero.css';
import T from '../lib/cientifico';

const irA = (id) => (e) => {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

function Hero({ t }) {
  // El video solo se carga en pantallas grandes y sin preferencia de movimiento reducido;
  // en celular se usa la imagen estática (hero-poster.jpg).
  const [conVideo, setConVideo] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px) and (prefers-reduced-motion: no-preference)');
    const actualizar = () => setConVideo(mq.matches);
    actualizar();
    mq.addEventListener('change', actualizar);
    return () => mq.removeEventListener('change', actualizar);
  }, []);

  const poster = `${process.env.PUBLIC_URL}/hero-poster.jpg`;
  const h = t.hero;

  return (
    <section id="inicio" className="hero">
      {conVideo ? (
        <video className="hero-fondo" autoPlay muted loop playsInline poster={poster} preload="metadata">
          <source src={`${process.env.PUBLIC_URL}/hero-video.mp4`} type="video/mp4" />
        </video>
      ) : (
        <img className="hero-fondo" src={poster} alt="" />
      )}
      <div className="hero-velo" />
      <div className="hero-contenido">
        <span className="hero-badge"><T>{h.badge}</T></span>
        <h1 className="hero-titulo"><T>{h.titulo}</T></h1>
        <p className="hero-subtitulo"><T>{h.subtitulo}</T></p>
        <div className="hero-autor">
          <strong>{h.autor}</strong>
          <span>{h.programa}</span>
          <span>{h.afiliacion}</span>
          <span className="hero-directores">{h.directores}</span>
        </div>
        <div className="hero-acciones">
          <a href="#mapa" className="boton boton--primario" onClick={irA('mapa')}>{h.cta1}</a>
          <a href="#redes" className="boton boton--secundario" onClick={irA('redes')}>{h.cta2}</a>
        </div>
        <ul className="hero-stats">
          {h.stats.map((s) => (
            <li key={s.label}><strong>{s.valor}</strong><span>{s.label}</span></li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Hero;
