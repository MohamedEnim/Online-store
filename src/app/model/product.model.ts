import { Category } from './category.model';


export class Product{ 
    id?: number;
    key?: number;
    constructor(
        public nameProd:string,
        public price:number,
        public quantity:number,
        public imgUrl:string){} 
}