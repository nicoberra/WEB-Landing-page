// Decide con qué modelo trabajar. Cada modelo es una carpeta en /modelos con
// su config.mjs y su carpeta assets/ (fotos, logo, imagen para redes).
// Prioridad: --modelo <nombre>  →  variable de entorno MODELO  →  modelo-activo.mjs
// (MODELO sirve en hostings como Vercel: un proyecto por modelo, mismo repositorio)
import { existsSync, readdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** Nombres de las carpetas de modelos. */
export const listModels = () =>
  readdirSync(path.join(root, 'modelos'), { withFileTypes: true })
    .filter((d) => d.isDirectory() && existsSync(path.join(root, 'modelos', d.name, 'config.mjs')))
    .map((d) => d.name)
    .sort();

/** Nombre del modelo elegido. */
export async function modelName(argv = process.argv.slice(2)) {
  const i = argv.indexOf('--modelo');
  const name =
    i !== -1 ? argv[i + 1] : process.env.MODELO ? process.env.MODELO.trim() : (await import(`${pathToFileURL(path.join(root, 'modelo-activo.mjs')).href}?t=${Date.now()}`)).default;
  if (!name || !existsSync(path.join(root, 'modelos', name, 'config.mjs'))) {
    throw new Error(`No existe el modelo "${name || ''}". Modelos disponibles: ${listModels().join(', ')}`);
  }
  return name;
}

/** Carpeta y archivo de configuración del modelo elegido. */
export async function modelPaths(argv) {
  const name = await modelName(argv);
  const dir = path.join(root, 'modelos', name);
  return { name, dir, config: path.join(dir, 'config.mjs'), assets: path.join(dir, 'assets') };
}
