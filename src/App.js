import React from 'react';
import 'leaflet/dist/leaflet.css';
import './App.css';
import es from './content/es';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MapaDistribucion from './components/MapaDistribucion';
import { Introduccion, Metodologia, Resultados, Discusion, Conclusiones, Datos } from './components/Secciones';
import RedesTransmision from './components/RedesTransmision';
import Footer from './components/Footer';

// Para agregar un selector de idioma: importar en.js con la misma estructura
// que es.js y elegir aquí `t` según el idioma seleccionado.
const t = es;

function App() {
  return (
    <div className="app">
      <Navbar t={t} />
      <main>
        <Hero t={t} />
        <MapaDistribucion t={t} />
        <Introduccion t={t} />
        <Metodologia t={t} />
        <Resultados t={t} />
        <RedesTransmision t={t} />
        <Discusion t={t} />
        <Conclusiones t={t} />
        <Datos t={t} />
      </main>
      <Footer t={t} />
    </div>
  );
}

export default App;
