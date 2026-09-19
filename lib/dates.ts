export const todayJapan=(date=new Date())=>new Intl.DateTimeFormat("sv-SE",{timeZone:"Asia/Tokyo",year:"numeric",month:"2-digit",day:"2-digit"}).format(date);
export const dateObj=(date:string)=>new Date(date+"T12:00:00+09:00");
export function shiftDay(date:string,days:number){const d=dateObj(date);d.setUTCDate(d.getUTCDate()+days);return todayJapan(d);}
export function weekStart(date:string){const w=dateObj(date).getUTCDay();return shiftDay(date,-((w+6)%7));}
export function weekDates(date:string){const start=weekStart(date);return Array.from({length:7},(_,i)=>shiftDay(start,i));}
export const dayLabel=(date:string)=>new Intl.DateTimeFormat("ja-JP",{timeZone:"Asia/Tokyo",month:"long",day:"numeric",weekday:"short"}).format(dateObj(date));
export const validDate=(s:string)=>/^\d{4}-\d{2}-\d{2}$/.test(s)&&!isNaN(dateObj(s).getTime())&&todayJapan(dateObj(s))===s;
export const monthDays=(month:string)=>{const[y,m]=month.split("-").map(Number);return Array.from({length:new Date(Date.UTC(y,m,0)).getUTCDate()},(_,i)=>`${month}-${String(i+1).padStart(2,"0")}`);};
