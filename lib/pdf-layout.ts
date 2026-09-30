import type {LunchDay} from "./types";
import {findArt,kana} from "./food-art";
import {dateObj,validDate} from "./dates";
export interface PdfWord{text:string;x:number;y:number;w:number;h:number;}
export interface PdfPicture{x:number;y:number;width:number;height:number;}
export interface PdfPageData{width:number;height:number;words:PdfWord[];pictures:PdfPicture[];}
export interface ParseResult{days:Record<string,LunchDay>;warnings:string[];detectedMonth:number|null;supported:boolean;}
const norm=(s:string)=>s.normalize("NFKC").replace(/\s/g,"");
export function parseLayout(pages:PdfPageData[],year:number,month:number):ParseResult{
 const days:Record<string,LunchDay>={};const warnings:string[]=[];let detectedMonth:number|null=null;let supported=true;
 for(const page of pages){const{words,width}=page;const title=words.filter(w=>w.y<page.height*.085).map(w=>w.text).join("");const match=norm(title).match(/(\d{1,2})(?:がつ|月)/);if(match){detectedMonth=Number(match[1]);if(detectedMonth!==month)throw Error(`PDFは${detectedMonth}月の献立です。対象月を確認してください。`);}
 const headings=words.filter(w=>w.y<page.height*.085).map(w=>norm(w.text)).join("");
 if(!headings.includes("こんだて")||!headings.includes("牛乳")||!headings.includes("日付")){supported=false;continue;}
 const anchors=words.filter(w=>w.x<width*.07&&w.y>page.height*.08&&/^\d{1,2}$/.test(norm(w.text))).sort((a,b)=>a.y-b.y);
 if(!anchors.length){supported=false;continue;}
 const centers=anchors.map(a=>{const wd=words.find(w=>w.x<width*.07&&w.y>a.y&&w.y<a.y+width*.025&&/^[月火水木金土日]$/.test(w.text));return{...a,weekday:wd?.text,center:wd?(a.y+wd.y)/2:a.y};});
 for(let i=0;i<centers.length;i++){const a=centers[i];const top=i?((centers[i-1].center+a.center)/2):(a.center-width*.033);const bottom=i<centers.length-1?(a.center+centers[i+1].center)/2:a.center+width*.033;
 const row=words.filter(w=>w.y>=top&&w.y<bottom);const all=row.map(w=>w.text).join("");const date=`${year}-${String(month).padStart(2,"0")}-${String(Number(norm(a.text))).padStart(2,"0")}`;
 if(!validDate(date))throw Error(`存在しない日付（${date}）を検出しました。`);if(days[date])throw Error(`${date}が重複しています。PDFを確認してください。`);
 const expected="日月火水木金土"[dateObj(date).getUTCDay()];if(a.weekday&&a.weekday!==expected)throw Error(`${Number(norm(a.text))}日の曜日が合いません。対象年・月を確認してください。`);
 const holiday=norm(all).match(/スポーツのひ|すぽーつのひ|スポーツの日|たいいくのひ|体育の日|けいろうのひ|こくみんのきゅうじつ|しゅうぶんのひ|きゅうしょくなし|給食なし|休校|祝日|敬老の日|秋分の日|国民の休日|ぶんかのひ|文化の日|きんろうかんしゃのひ|勤労感謝の日|ふりかえきゅうじつ|振替休日/)?.[0]??"";
 const noMeal=!!holiday;
 const eventHits=row.filter(w=>/郷土料理|メニュー|行事/.test(w.text));
 const eventWords=row.filter(w=>w.x>width*.3&&w.x<width*.46&&eventHits.some(e=>Math.abs(e.y-w.y)<4)).sort((a,b)=>a.x-b.x);
 const menuWords=row.filter(w=>w.x>width*.115&&w.x<width*.455&&!eventWords.includes(w)&&!/^『|^☆/.test(w.text)&&w.h>=width*.0095);
 const lines:{y:number;items:PdfWord[]}[]=[];for(const w of menuWords.sort((a,b)=>a.y-b.y||a.x-b.x)){const l=lines.find(l=>Math.abs(l.y-w.y)<2);if(l)l.items.push(w);else lines.push({y:w.y,items:[w]});}
 const names=noMeal?[]:lines.map(l=>l.items.sort((a,b)=>a.x-b.x).map(w=>w.text).join("").trim()).filter(Boolean);
 const milk=page.pictures.some(p=>p.x>width*.065&&p.x<width*.12&&p.y>=top&&p.y<bottom&&p.width<width*.05&&p.height<width*.05)?true:null;
 
 const status=noMeal?"none":names.length?"meal":"unknown";
 const note=status==="unknown"?"献立を読み取れませんでした。手入力するか未登録にしてください。":milk===null&&status==="meal"?"牛乳を確認してください。":"";
 days[date]={date,status,dishes:names.map((name,j)=>({id:`${date}-${j}`,name,reading:kana(name),art:findArt(name)})),milk:status==="meal"?milk:false,event:noMeal?holiday:eventWords.map(w=>w.text.replace(/[★☆『』]/g,"")).join(""),note,confirmed:false};
 }
 }
 if(!supported)return{days:{},warnings:["このPDFの形式は自動読み取りに対応していません。原本を見ながら手入力できます。"],detectedMonth,supported:false};
 if(!Object.keys(days).length)warnings.push("文字や日付を読み取れませんでした。原本を見ながら手入力できます。");
 warnings.push("年・日付・料理名・牛乳を、原本と見比べて確認してください。");
 return{days,warnings,detectedMonth,supported:true};
}
