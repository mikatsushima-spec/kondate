// Regression: saved October dishes without art IDs must resolve to standalone
// images; photos and manually chosen art must remain untouched.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import ts from 'typescript';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';

const require=createRequire(import.meta.url);
const cache=new Map();
function sourceModule(file){
  file=path.resolve(file);
  if(cache.has(file))return cache.get(file);
  const compiled=ts.transpileModule(fs.readFileSync(file,'utf8'),{
    compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}
  }).outputText;
  const module={exports:{}};
  const localRequire=id=>id.startsWith('@/')?sourceModule(`${id.slice(2)}.ts`):id.startsWith('.')?sourceModule(path.resolve(path.dirname(file),`${id}.ts`)):require(id);
  new Function('require','module','exports',compiled)(localRequire,module,module.exports);
  cache.set(file,module.exports);
  return module.exports;
}
const {foodCatalog,findArt,artSource}=sourceModule('lib/food-art.ts');
const {october2026}=sourceModule('lib/lunch-2026-10.ts');
const {FoodImage}=sourceModule('components/food-image.tsx');
const {emptyData,validateData}=sourceModule('lib/storage.ts');
for(const entry of foodCatalog){
  assert.equal(findArt(entry.name),entry.art);
  assert.ok(fs.statSync(`public${artSource(entry.art)}`).size>100,entry.name);
}
let count=0;
for(const day of Object.values(october2026.days))for(const dish of day.dishes){
  const art=findArt(dish.name);
  assert.notEqual(art,undefined,dish.name);
  const html=renderToStaticMarkup(React.createElement(FoodImage,{...dish}));
  assert.ok(html.includes(`src="${artSource(art)}"`),dish.name);
  assert.ok(!html.includes('background-image'),dish.name);
  count++;
}
assert.equal(findArt('たんどりーちきん'),68);
assert.equal(findArt(' タンドリーチキン '),68);
assert.equal(findArt('未登録の料理'),undefined);
assert.equal(artSource(),'/food/items/57.webp');
const render=props=>renderToStaticMarkup(React.createElement(FoodImage,{name:'タンドリーチキン',...props}));
assert.ok(render({art:6}).includes('src="/food/items/6.webp"'));
assert.ok(render({art:57}).includes('src="/food/items/57.webp"'));
assert.ok(render({art:68,image:'data:image/png;base64,AAAA'}).includes('src="data:image/png;base64,AAAA"'));
assert.equal(validateData(emptyData()).months['2026-10'].days['2026-10-05'].dishes[0].art,undefined);
const data=structuredClone(emptyData());
data.months['2026-10'].days['2026-10-05'].dishes[0].art=foodCatalog.length-1;
assert.doesNotThrow(()=>validateData(data));
data.months['2026-10'].days['2026-10-05'].dishes[0].art=foodCatalog.length;
assert.throws(()=>validateData(data));
console.log(`Food art regression passed: ${foodCatalog.length} files, ${count} October dishes, saved data and manual choices.`);
