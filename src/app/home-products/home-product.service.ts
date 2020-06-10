import { Injectable } from '@angular/core';
import { Category } from '../model/category.model';
import { Product } from '../model/product.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HomeProductService {

  //sendCategoryItem = new Subject<Category[]>();
  sendSelectCategoryItem = new Subject<any>();
  sendSelectCategories = new Subject<Category[]>();
  categoryItems: Category[] = [];

  constructor(private http: HttpClient) { }

//This Function get all the categories from the DataBase 
  getHomeItems(){
    return this.http.get<any>("http://localhost:8080/appstore/categories")
    .pipe(map((categories: any)=>{
     return this.setDBCategories(categories);
    }));
  }

  addCategory(category: Category){
    return this.http.post<Category>("http://localhost:8080/appstore/category/", category);
   }

  
  addProductToExisteCateg(newProduct: Product[], nameCateg: string){
    return this.http.post<Category>("http://localhost:8080/appstore/existeCategory/" + nameCateg, newProduct);
  }

  getSelectIndex(nameCategory: string){
    return this.http.get<Category>("http://localhost:8080/appstore/select/" + nameCategory);
  }

//This Function recieve the table category from the DataBase and 
//transform it to categories table
 public setDBCategories(categories: any): Category[] {
    let categoryItems: Category[] = [];
    for(let category of categories){
      let dbProducts: Product[] = [];
      for( let product of category.products){
      let dbProduct: Product = new Product(product.nameProd, product.price, product.quantity,
        product.imgUrl);
        dbProduct.id = product.id;
        dbProduct.key = category.id;
        dbProducts.push(dbProduct);
      }
      let categ: Category = new Category(category.nameCateg, category.numProduct, dbProducts);
      categ.key = category.id;
      categoryItems.push(categ);
    } 
    this.categoryItems =categoryItems;
    return categoryItems;
   }

   public setDBCategory(dbCategory: any): Category {
      let dbProducts: Product[] = [];
      let filtercategory: Category;
      for( let product of dbCategory.products){
      let dbProduct: Product = new Product(product.nameProd, product.price, product.quantity,
        product.imgUrl);
        dbProducts.push(dbProduct);
      filtercategory = new Category(dbCategory.nameCateg, dbCategory.numProduct, dbProducts);
      filtercategory.key = dbCategory.id;
    } 
    return filtercategory;
   }

 getSelectCategories(){
   return this.getHomeItems();
 }

}
