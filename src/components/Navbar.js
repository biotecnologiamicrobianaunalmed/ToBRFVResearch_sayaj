import React, { useEffect, useState } from 'react';
import './Navbar.css';

function Navbar({ t }) {
  const [abierto, setAbierto] = useState(false);
  const [activo, setActivo] = useState('inicio');
  const [solido, setSolido] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolido(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const secciones = t.nav.map((n) => document.getElementById(n.id)).filter(Boolean);
    if (!('IntersectionObserver' in window) || secciones.length === 0) return undefined;
    const obs = new IntersectionObserver(
      (entries) => {
        const visibles = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visibles[0]) setActivo(visibles[0].target.id);
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.2, 0.5] }
    );
    secciones.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [t.nav]);

  const ir = (id) => (e) => {
    e.preventDefault();
    setAbierto(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className={`nav ${solido || abierto ? 'nav--solida' : ''}`}>
      <div className="nav-interior">
        <a href="#inicio" className="nav-marca" onClick={ir('inicio')}>
          <span className="nav-marca-icono" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22"><circle cx="12" cy="12" r="5" fill="currentColor" /><g stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" /></g></svg>
          </span>
          <span className="nav-marca-texto">ToBRFV <span>Colombia</span></span>
        </a>
        <button className="nav-hamburguesa" aria-label="Abrir menú" aria-expanded={abierto} onClick={() => setAbierto((v) => !v)}>
          <span /><span /><span />
        </button>
        <nav className={`nav-enlaces ${abierto ? 'nav-enlaces--abierto' : ''}`} aria-label="Secciones">
          {t.nav.map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={ir(n.id)} className={activo === n.id ? 'activo' : ''}>
              {n.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
