export type MealStatus="meal"|"none"|"unknown";
export interface Dish{id:string;name:string;reading:string;art?:number;image?:string;}
export interface LunchDay{date:string;status:MealStatus;dishes:Dish[];milk:boolean|null;event:string;note?:string;confirmed:boolean;}
export interface LunchMonth{key:string;name:string;pdf?:string;days:Record<string,LunchDay>;importedAt:string;previous?:Omit<LunchMonth,"previous">;}
export interface DinnerSelection{id:string;seen:string[];trail:string[];}
export interface AppData{version:1;revision:number;months:Record<string,LunchMonth>;dinner:Record<string,string>;suggestions:Record<string,DinnerSelection>;favorites:string[];dislikes:string[];images:Record<string,string>;shopping:Record<string,string[]>;}
export interface Ingredient{name:string;amount:string;category:"野菜"|"肉"|"その他";}
export interface Dinner{id:string;category:string;title:string;main:string;side:string;reading:string;time:number;image:string;weeklyLimited:boolean;ingredients:Ingredient[];steps:[string,string,string];stepLabels:[string,string,string];}
