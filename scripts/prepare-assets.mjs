import fs from 'node:fs';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
fs.mkdirSync('public/pdfjs',{recursive:true});
fs.copyFileSync(require.resolve('pdfjs-dist/build/pdf.worker.min.mjs'),'public/pdfjs/pdf.worker.min.mjs');
