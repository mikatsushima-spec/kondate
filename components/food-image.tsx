import {artSource,findArt} from "@/lib/food-art";

export function FoodImage({art,image,name,className=""}:{art?:number;image?:string;name:string;className?:string}){
  // Resolve at display time so saved menus benefit without another PDF upload.
  // Explicitly selected illustrations and personal photos still take priority.
  const selected=art??findArt(name);
  return <img src={image??artSource(selected)} alt={!image&&selected===undefined?`${name}（おさらのイラスト）`:name} width={320} height={320} className={`food-image ${className}`}/>;
}
