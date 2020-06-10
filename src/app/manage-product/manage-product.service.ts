import { Injectable } from '@angular/core';
import { HomeProductService } from '../home-products/home-product.service';
import { Product } from '../model/product.model';
import { Category } from '../model/category.model';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ManageProductService  {

  categoryIndex: number;
  productIndex: number;
  addNameCategory: string;
  addNumProduct: number;

  constructor(private homeProdSErv: HomeProductService, private http: HttpClient) {}

  getProduct( prodIndex: number){
    return this.http.get<any>("http://localhost:8080/appstore/product/" + prodIndex);
  }

  editProduct(product: Product, dbProductIndex: number, dbCategoryIndex: number){
    return this.http.post<any>("http://localhost:8080/appstore/postProduct/"  + dbCategoryIndex + "/" + dbProductIndex, product);
  }

  deleteProduct(dbProductIndex: number, dbCategoryIndex: number){
    return this.http.delete<any>("http://localhost:8080/appstore/deleteProduct/"  + dbCategoryIndex + "/" + dbProductIndex)
  }
  
  getSelectCategory(){
    return this.homeProdSErv.sendSelectCategoryItem;
  }

  getSelectCategories(){
    return this.homeProdSErv.sendSelectCategories;
  }

  getTableProducts(category: Category[]): Product[]{
    let data: Product[] = []; 
    for(let selCategory of category){
      for(let product of selCategory.products){
        data.push( product );
      }
    }
    return data;
  }

  getSelectTableProducts(category: Category): Product[]{
    let data: Product[] = [];
    let dindex = 0;
      for(let product of category.products){
        data.push( product );
        data[dindex].key = category.key;
        dindex += 1;
      }
    return data;
  }

setCategIndexAndProdIndex(categIndex: number, prodIndex: number){
  this.categoryIndex = categIndex;
  this.productIndex = prodIndex;
}  

}
