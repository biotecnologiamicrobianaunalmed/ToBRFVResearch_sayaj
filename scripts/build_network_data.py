#!/usr/bin/env python3
"""Convierte las redes GEXF (NetworkX) de public/ a JSON compacto para el visor web.

Uso:  python3 scripts/build_network_data.py

Genera:
  public/data/red_antioquia.json
  public/data/red_colombia.json
  public/data/municipios.json   (centroides municipales derivados de las veredas)

Formato de cada red:
  {
    "meta": {...},
    "nodes": [[id, vereda, municipio, departamento, lat, lon, flags, pagerank, betweenness,
               louvain, pr_antioquia|null, bc_antioquia|null], ...],
    "edges": {"source": [idx...], "target": [idx...], "weight": [w...]}   # ordenadas por peso desc.
  }
  flags = bit0 cultivation_region, bit1 tomate, bit2 tomate_inv, bit3 pimenton
"""
import json, math, os, sys, collections
import xml.etree.ElementTree as ET

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUB = os.path.join(ROOT, 'public')
OUT = os.path.join(PUB, 'data')
NS = '{http://www.gexf.net/1.2draft}'
VIZ = '{http://www.gexf.net/1.2draft/viz}'
R = 6378137.0


def mercator_to_latlon(x, y):
    lon = x / R * 180.0 / math.pi
    lat = math.degrees(math.atan(math.sinh(y / R)))
    return round(lat, 5), round(lon, 5)


def convert(src, dst, name):
    attrs = {}
    nodes = []
    index = {}
    edges = []
    for ev, el in ET.iterparse(src, events=('end',)):
        tag = el.tag
        if tag == NS + 'attribute':
            attrs[el.get('id')] = el.get('title')
        elif tag == NS + 'node':
            a = {attrs[av.get('for')]: av.get('value') for av in el.iter(NS + 'attvalue')}
            p = el.find(VIZ + 'position')
            lat, lon = mercator_to_latlon(float(p.get('x')), float(p.get('y')))
            flags = (1 if a.get('cultivation_region') == 'true' else 0) \
                | (2 if a.get('tomate') == 'true' else 0) \
                | (4 if a.get('tomate_inv') == 'true' else 0) \
                | (8 if a.get('pimenton') == 'true' else 0)
            nid = el.get('id')
            index[nid] = len(nodes)
            nodes.append([
                nid, a.get('vereda', ''), a.get('municipio', ''), a.get('departamento', ''),
                lat, lon, flags,
                float('%.4g' % float(a.get('pagerank', 0))),
                float('%.4g' % float(a.get('betweenness', 0))),
                int(a.get('louvain', -1)),
                float('%.4g' % float(a['pr_antioquia'])) if 'pr_antioquia' in a else None,
                float('%.4g' % float(a['bc_antioquia'])) if 'bc_antioquia' in a else None,
            ])
            el.clear()
        elif tag == NS + 'edge':
            s, t = index.get(el.get('source')), index.get(el.get('target'))
            if s is not None and t is not None:
                edges.append((s, t, float(el.get('weight', 1))))
            el.clear()
    edges.sort(key=lambda e: -e[2])
    ws = [e[2] for e in edges]
    q = lambda f: ws[min(len(ws) - 1, int(f * len(ws)))]
    data = {
        'meta': {
            'name': name, 'nodes': len(nodes), 'edges': len(edges),
            'source': os.path.basename(src),
            'weight_quantiles': {'p50': q(0.5), 'p75': q(0.25), 'p90': q(0.10), 'p99': q(0.01), 'max': ws[0], 'min': ws[-1]},
            'louvain': sorted({n[9] for n in nodes}),
            'departamentos': sorted({n[3] for n in nodes}),
        },
        'nodes': nodes,
        'edges': {
            'source': [e[0] for e in edges],
            'target': [e[1] for e in edges],
            'weight': [int(e[2]) if e[2].is_integer() else e[2] for e in edges],
        },
    }
    with open(dst, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, separators=(',', ':'))
    print(f'{name}: {len(nodes)} nodos, {len(edges)} aristas -> {dst} ({os.path.getsize(dst)/1e6:.1f} MB)')
    return nodes


def main():
    os.makedirs(OUT, exist_ok=True)
    ant = convert(os.path.join(PUB, 'final_Antioquia_network_paper.gexf'), os.path.join(OUT, 'red_antioquia.json'), 'Antioquia')
    col = convert(os.path.join(PUB, 'final_Colombia_network_paper.gexf'), os.path.join(OUT, 'red_colombia.json'), 'Colombia')
    munis = collections.defaultdict(list)
    for n in col:
        munis[(n[3], n[2])].append((n[4], n[5]))
    out = [
        {'departamento': d, 'municipio': m, 'lat': round(sum(p[0] for p in pts) / len(pts), 4),
         'lon': round(sum(p[1] for p in pts) / len(pts), 4), 'veredas': len(pts)}
        for (d, m), pts in sorted(munis.items())
    ]
    with open(os.path.join(OUT, 'municipios.json'), 'w', encoding='utf-8') as f:
        json.dump(out, f, ensure_ascii=False, separators=(',', ':'))
    print(f'municipios: {len(out)} -> municipios.json')


if __name__ == '__main__':
    main()
