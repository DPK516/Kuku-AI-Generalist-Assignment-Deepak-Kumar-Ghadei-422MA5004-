// Tiny dependency-free ZIP reader (stored + deflate) using the standard DecompressionStream,
// which exists in modern browsers and Node 20+. Lets both the web app and the CLI take the
// input pack exactly as it is shipped (a .zip) or as loose .txt files.

async function inflateRaw(bytes) {
  const ds = new DecompressionStream('deflate-raw');
  const stream = new Blob([bytes]).stream().pipeThrough(ds);
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

export async function unzip(buf) {
  const u8 = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  const dv = new DataView(u8.buffer, u8.byteOffset, u8.byteLength);
  // Find End Of Central Directory.
  let eocd = -1;
  for (let i = u8.length - 22; i >= Math.max(0, u8.length - 65557); i--) if (dv.getUint32(i, true) === 0x06054b50) { eocd = i; break; }
  if (eocd < 0) throw new Error('not a zip file');
  const count = dv.getUint16(eocd + 10, true);
  let p = dv.getUint32(eocd + 16, true);
  const dec = new TextDecoder('utf-8');
  const out = [];
  for (let k = 0; k < count; k++) {
    if (dv.getUint32(p, true) !== 0x02014b50) break;
    const method = dv.getUint16(p + 10, true);
    const csize = dv.getUint32(p + 20, true);
    const nlen = dv.getUint16(p + 28, true), xlen = dv.getUint16(p + 30, true), clen = dv.getUint16(p + 32, true);
    const local = dv.getUint32(p + 42, true);
    const name = dec.decode(u8.subarray(p + 46, p + 46 + nlen));
    p += 46 + nlen + xlen + clen;
    if (name.endsWith('/')) continue;
    const lnlen = dv.getUint16(local + 26, true), lxlen = dv.getUint16(local + 28, true);
    const data = u8.subarray(local + 30 + lnlen + lxlen, local + 30 + lnlen + lxlen + csize);
    const raw = method === 0 ? data : method === 8 ? await inflateRaw(data) : null;
    if (!raw) continue;
    out.push({ name: name.split('/').pop(), path: name, text: dec.decode(raw) });
  }
  return out;
}

/** Browser: FileList -> [{name, text}], expanding zips. */
export async function readFileList(fileList) {
  const out = [];
  for (const f of fileList) {
    if (/\.zip$/i.test(f.name)) out.push(...(await unzip(new Uint8Array(await f.arrayBuffer()))));
    else out.push({ name: f.name, text: await f.text() });
  }
  return out.filter((f) => /\.(txt|md|fountain)$/i.test(f.name));
}
