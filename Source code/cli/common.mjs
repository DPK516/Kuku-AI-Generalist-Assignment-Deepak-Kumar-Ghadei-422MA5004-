// Shared CLI helpers: .env loading, arg parsing, reading a folder or a .zip of scripts.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { unzip } from '../public/js/core/files.js';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export function loadEnv() {
  const p = path.join(ROOT, '.env');
  if (fs.existsSync(p)) {
    for (const line of fs.readFileSync(p, 'utf8').split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  }
  return process.env;
}

export function args(argv = process.argv.slice(2)) {
  const a = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const t = argv[i];
    if (t.startsWith('--')) {
      const [k, v] = t.slice(2).split('=');
      if (v !== undefined) a[k] = v;
      else if (argv[i + 1] && !argv[i + 1].startsWith('--')) a[k] = argv[++i];
      else a[k] = true;
    } else a._.push(t);
  }
  return a;
}

export async function readInput(p) {
  const st = fs.statSync(p);
  if (st.isDirectory()) {
    const out = [];
    const walk = (d) => {
      for (const n of fs.readdirSync(d)) {
        const f = path.join(d, n);
        if (fs.statSync(f).isDirectory()) walk(f);
        else if (/\.txt$/i.test(n)) out.push({ name: n, text: fs.readFileSync(f, 'utf8') });
      }
    };
    walk(p);
    return out;
  }
  if (/\.zip$/i.test(p)) return (await unzip(fs.readFileSync(p))).filter((f) => /\.txt$/i.test(f.name));
  return [{ name: path.basename(p), text: fs.readFileSync(p, 'utf8') }];
}

export function write(dir, name, content) {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, name), content);
  return path.join(dir, name);
}
