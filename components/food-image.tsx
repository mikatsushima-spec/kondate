import {artSource,findArt} from "@/lib/food-art";

export function FoodImage({art,image,name,className=""}:{art?:number;image?:string;name:string;className?:string}){
  // Resolve by dish name first: old imports can contain the empty-plate fallback
  // or a stale art ID. A user-provided image remains the highest priority.
  const matched=findArt(name);
  const selected=matched??(art===57?undefined:art);
  return <img src={image??artSource(selected)} alt={!image&&selected===undefined?`${name}（おさらのイラスト）`:name} width={320} height={320} className={`food-image ${className}`}/>;
}
