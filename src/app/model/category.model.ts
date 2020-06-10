import { Product } from './product.model';


export class Category{
    public key?: number;
    constructor(public nameCateg: string,
                public numProduct: number,
                public products: Product[]){}
}