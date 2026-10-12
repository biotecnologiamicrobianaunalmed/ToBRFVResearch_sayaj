# ToBRFV en Colombia · sitio web de la tesis

Sitio complementario de la tesis **Epidemiología molecular del *Tobamovirus fructirugosum* (ToBRFV) en cultivos de tomate (*Solanum lycopersicum*) y pimentón (*Capsicum annuum*) en Colombia** (Juliana Sánchez Yalí, Maestría en Ciencias – Biotecnología, Universidad Nacional de Colombia, Sede Medellín, 2026).

Publicado en GitHub Pages: <https://biotecnologiamicrobianaunalmed.github.io/ToBRFVResearch_sayaj/>

## Qué contiene

- **Mapa interactivo** (Leaflet): distribución mundial del ToBRFV con dos capas diferenciadas, secuencias depositadas en NCBI Virus (`public/data.tsv`) y reportes oficiales de la EPPO (`src/data/eppo_reportes_pendiente_verificacion.json`), más las detecciones de la tesis en Colombia y Antioquia (`src/data/sitios.js`).
- **Redes de transmisión** (sigma.js + graphology sobre WebGL, con fondo de mapa): redes de Colombia (14.053 veredas, 302.337 aristas) y Antioquia (2.105 veredas, 37.681 aristas), con búsqueda, filtros, resaltado de vecinos, leyendas y explicación de lectura.
- Secciones de introducción, metodología, resultados (detección, distribución nacional, síntomas y Ct, riesgo cruzado, genómica con visor Mol*, RT-LAMP), discusión, conclusiones y datos.

Todo el texto visible está en `src/content/es.js` para facilitar un futuro selector de idioma.

## Desarrollo

```bash
npm install
npm start        # servidor local en http://localhost:3000
npm run build    # compila en build/
npm run deploy   # publica build/ en la rama gh-pages
```

## Datos de las redes

Las redes originales (NetworkX, formato GEXF) están en `public/` y se ofrecen como descarga. Para la visualización se usan versiones compactas en `public/data/`, generadas con:

```bash
python3 scripts/build_network_data.py
```

El script convierte posiciones Web Mercator a latitud/longitud, codifica los atributos de nodo (`cultivation_region`, `tomate`, `tomate_inv`, `pimenton`, `pagerank`, `betweenness`, `louvain`, `pr_antioquia`, `bc_antioquia`) y ordena las aristas por peso para poder filtrarlas por umbral. También genera `public/data/municipios.json` con centroides municipales derivados de las veredas.

## Datos que requieren verificación antes de publicar

Ver `PENDIENTES_VERIFICACION.md`.

## Estructura

```
public/            archivos estáticos (GEXF, data.tsv, modelo .cif, visor Mol*, video, imágenes)
public/data/       redes en JSON compacto y centroides municipales (generados)
scripts/           preprocesamiento de datos
src/content/es.js  textos del sitio
src/data/          datos de la tesis, lista EPPO, coordenadas de países, colores por departamento
src/components/    Navbar, Hero, MapaDistribucion, Secciones, RedesTransmision, Footer
src/lib/redes.js   carga y construcción del grafo, escalas de color
```

La carpeta `Tesis/` (PDF) está excluida del repositorio mediante `.gitignore`.
