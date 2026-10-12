import React from 'react';
import './Footer.css';
import T from '../lib/cientifico';

function Footer({ t }) {
  return (
    <footer className="pie">
      <div className="contenedor pie-interior">
        <p><T>{t.footer.texto}</T></p>
        <p className="pie-nota"><T>{t.footer.mapas}</T></p>
      </div>
    </footer>
  );
}

export default Footer;
