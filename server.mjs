import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
const root = process.cwd();
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml'};
http.createServer(async (req,res) => {
  try {
    const relative = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    const file = path.resolve(root, '.' + (relative === '/' ? '/index.html' : relative));
    if (!file.startsWith(root + path.sep) || !['.html','.css','.js','.svg'].includes(path.extname(file))) {res.writeHead(404);res.end();return;}
    const content = await readFile(file);
    res.writeHead(200, {'Content-Type':types[path.extname(file)],'Cache-Control':'no-store'});res.end(content);
  } catch {res.writeHead(404);res.end('Arquivo não encontrado');}
}).listen(8080,'0.0.0.0',()=>console.log('Compras Seguras: http://localhost:8080'));
