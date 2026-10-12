// Nombres científicos en cursiva según las normas del ICTV / nomenclatura binomial.
// Van en cursiva: especie, género y familia (Tobamovirus fructirugosum, Tobamovirus,
// Virgaviridae, Solanum lycopersicum, Capsicum annuum...). NO van en cursiva el nombre
// común del virus (tomato brown rugose fruit virus) ni la sigla ToBRFV.
// Uso: <T>{texto}</T> o T({ children: texto }) en cualquier cadena visible.
import React from 'react';

const NOMBRES = [
  // especies (binomios) primero, para que ganen sobre el género solo
  'Tobamovirus fructirugosum',
  'Solanum lycopersicum',
  'Capsicum annuum',
  // familias
  'Virgaviridae',
  'Solanaceae',
  'Tombusviridae',
  'Betaflexiviridae',
  // géneros (solo con mayúscula inicial; "tobamovirus" en minúscula es nombre común)
  'Tobamovirus',
  'Solanum',
  'Capsicum',
];

const PATRON = new RegExp(`\\b(${NOMBRES.join('|')})\\b`, 'g');

// Devuelve un arreglo de nodos React con los nombres científicos envueltos en <i>.
export function cursiva(texto) {
  if (typeof texto !== 'string' || !PATRON.test(texto)) return texto;
  PATRON.lastIndex = 0;
  const partes = [];
  let ultimo = 0;
  let m;
  let k = 0;
  while ((m = PATRON.exec(texto)) !== null) {
    if (m.index > ultimo) partes.push(texto.slice(ultimo, m.index));
    partes.push(<i className="sci" key={k++}>{m[1]}</i>);
    ultimo = m.index + m[0].length;
  }
  if (ultimo < texto.length) partes.push(texto.slice(ultimo));
  return partes;
}

export function T({ children }) {
  if (Array.isArray(children)) return <>{children.map((c, i) => <React.Fragment key={i}>{cursiva(c)}</React.Fragment>)}</>;
  return <>{cursiva(children)}</>;
}

export default T;
