import {artStyle} from "@/lib/food-art";
export function FoodImage({art,image,name,className=""}:{art?:number;image?:string;name:string;className?:string}){return image?<img src={image} alt={name} className={`food-image ${className}`}/>:<div role="img" aria-label={art===undefined?`${name}（おさらのイラスト）`:name} className={`food-image ${className}`} style={artStyle(art)}/>;}
