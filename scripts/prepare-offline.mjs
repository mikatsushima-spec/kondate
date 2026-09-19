import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const root=path.resolve('dist/client');
if(!fs.existsSync(root))throw Error('Build the application first');
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
const assets=walk(path.join(root,'_next')).filter(p=>/\.(m?js|css|woff2?)$/.test(p)).map(p=>'/'+path.relative(root,p).split(path.sep).join('/')).sort();
const stamp=crypto.createHash('sha256').update(assets.join('\n')).digest('hex').slice(0,12);
const source=fs.readFileSync('public/sw.js','utf8').replace("const VERSION='kondate-v1';",`const VERSION='kondate-${stamp}';`).replace('const APP_ASSETS=[];',`const APP_ASSETS=${JSON.stringify(assets)};`);
fs.writeFileSync(path.join(root,'sw.js'),source);
console.log(`Offline manifest: ${assets.length} application files`);
