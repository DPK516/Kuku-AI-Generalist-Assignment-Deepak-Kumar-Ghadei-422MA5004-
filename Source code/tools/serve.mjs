// Minimal static server for local preview: node tools/serve.mjs [port]
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'public');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.zip': 'application/zip', '.pdf': 'application/pdf' };
const port = +process.env.PORT || +process.argv[2] || 8787;
http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (p === '/__local/scripts.zip') { // local testing only (this server is never deployed)
    const z = path.resolve(root, '..', '..', 'input_pack', 'scripts.zip');
    res.writeHead(200, { 'content-type': 'application/zip' });
    return fs.createReadStream(z).pipe(res);
  }
  if (p === '/__local/p1.json' || p === '/__local/p3.json') { // local testing only
    const f = path.resolve(root, '..', 'outputs', p.includes('p1') ? 'p1/ai/promos.json' : 'p3/ai/continuity.json');
    res.writeHead(200, { 'content-type': 'application/json' });
    return fs.createReadStream(f).pipe(res);
  }
  if (p.endsWith('/')) p += 'index.html';
  const f = path.join(root, p);
  if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end('not found'); }
  res.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream', 'cache-control': 'no-store' });
  fs.createReadStream(f).pipe(res);
}).listen(port, () => console.log(`serving ${root} on http://localhost:${port}`));
