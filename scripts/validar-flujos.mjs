// Revisa que los JSON de flows/ se puedan importar y no lleven secretos.
// Corre en CI y local: node scripts/validar-flujos.mjs
import { readdirSync, readFileSync } from 'node:fs';

const errores = [];
const archivos = readdirSync('flows').filter((f) => f.endsWith('.json'));
if (archivos.length === 0) errores.push('flows/ no tiene ningun flujo');

for (const archivo of archivos) {
  const falla = (msg) => errores.push(`${archivo}: ${msg}`);
  let wf;
  try {
    wf = JSON.parse(readFileSync(`flows/${archivo}`, 'utf8'));
  } catch (e) {
    falla(`no es JSON valido (${e.message})`);
    continue;
  }

  const nombres = (wf.nodes ?? []).map((n) => n.name);
  if (nombres.length === 0) falla('no tiene nodos');
  if (new Set(nombres).size !== nombres.length) falla('hay nodos con el mismo nombre');

  for (const [origen, salidas] of Object.entries(wf.connections ?? {})) {
    if (!nombres.includes(origen)) falla(`conexion desde un nodo que no existe: ${origen}`);
    for (const destino of Object.values(salidas).flat(2)) {
      if (!nombres.includes(destino.node)) falla(`${origen} conecta con un nodo que no existe: ${destino.node}`);
    }
  }

  // las credenciales solo pueden ser referencias (id + nombre), nunca valores
  for (const nodo of wf.nodes ?? []) {
    for (const [tipo, ref] of Object.entries(nodo.credentials ?? {})) {
      const claves = Object.keys(ref).sort().join(',');
      if (claves !== 'id,name') falla(`${nodo.name}: la credencial ${tipo} trae algo mas que id y name`);
    }
  }
  if (/AIza[0-9A-Za-z_-]{30,}|sk-[0-9A-Za-z]{20,}/.test(JSON.stringify(wf))) falla('parece haber una API key dentro del flujo');
}

if (errores.length) {
  console.error(errores.join('\n'));
  process.exit(1);
}
console.log(`${archivos.length} flujos validos`);
