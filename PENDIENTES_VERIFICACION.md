# Pendientes de verificación por la autora (antes de publicar)

1. **Lista EPPO** (`src/data/eppo_reportes_pendiente_verificacion.json`): transcrita de
   <https://gd.eppo.int/taxon/TOBRFV/distribution> el 2026-10-11 (actualización EPPO 2026-09-01).
   Revisar país por país; cambiar `"mostrar"` a `false` para excluir uno del mapa. Estonia está incluida.
2. **Coordenadas de municipios** (`src/data/sitios.js`): puntos aproximados de la cabecera municipal.
   Reemplazar por las coordenadas oficiales del DANE si se desea mayor precisión.
3. **Campo negativo de Antioquia** (Cap. 2): deducido comparando la sección 2.1 (Venecia: 3 campos;
   variedades Chonto 11, Cherry 5, Riñón 4) con la Fig. 2C (Venecia: 2 barras; Cherry: 4 barras).
   Resultado: el campo negativo está en Venecia, variedad Cherry. Confirmar con la Tabla suplementaria 1.
4. **Coordenadas de países** (`src/data/paises.js`): centroides aproximados usados solo para ubicar los círculos.
5. **Texto de las secciones** (`src/content/es.js`): redactado a partir de la tesis; revisar cifras y redacción.
