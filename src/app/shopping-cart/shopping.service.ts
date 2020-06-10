import { Injectable } from '@angular/core';
import { Shopping } from '../model/shopping.model';
import { Product } from '../model/product.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../auth-servises/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  shoppings: Shopping[] = [];

  constructor(private http: HttpClient, private router: Router, private authSErv : AuthService) { }

  getQuantity(nameProduct: string){
    let exist: number = 0;
    for(let shoppingProduct of this.shoppings) {
      if(shoppingProduct.products.nameProd.includes(nameProduct)){
        exist = shoppingProduct.quantityProduct; 
        return exist;
      }
    }
    return exist;
  }

  addToCart(productItem: Product){
    return this.addShoppingCartToDB(productItem);
  }

  private addShoppingCartToDB(productItem: Product){
    let cartId = localStorage.getItem('cartId');
  if(!cartId){ 
      const shoppingItem = new Shopping(productItem, 1);
      return this.http.post<any>("http://localhost:8080/appstore/addShoppingCart/" + this.authSErv.userId, shoppingItem)
         .pipe(map((shoppingCart: any)=>{
        return this.generateShopping(shoppingCart);
       }));
  }else {
    const shoppingItem = new Shopping(productItem, 1);
    return this.http.post<any>("http://localhost:8080/appstore/addProdToShoppingCart/" + this.authSErv.userId +"/" + cartId, shoppingItem)
      .pipe(map((shopping: any)=>{
       return this.generateShopping(shopping);
     })); 
  } 
  }

  removeFromCart(productItem: Product){
    let cartId = localStorage.getItem('cartId');
    let prodId: number;
    let index: number = 0;
    while(!this.shoppings[index].products.nameProd.includes(productItem.nameProd) ){
      index+=1;
    }  
    prodId = this.shoppings[index].products.id;
    return this.removeProdShoppingCartFromDb(productItem, +cartId, prodId);
  }

  private removeProdShoppingCartFromDb(productItem: Product, cartId: number, prodId: number){
    return this.http.delete<any>("http://localhost:8080/appstore/deleteShoppingCartProduct/" + this.authSErv.userId + "/" + cartId +"/" + prodId)
    .pipe(map((shopping: any)=>{
      return this.generateShopping(shopping);
    }));
  }

  shoppingCartCount(){
    let shoppingCartCount = 0;
    for(let shopCart of this.shoppings)
    shoppingCartCount += shopCart.quantityProduct;
    return shoppingCartCount;
  }

  clearCart(){
    let cartId = localStorage.getItem("cartId");
   return this.http.delete<any>("http://localhost:8080/appstore/deleteShoppingCart/" + this.authSErv.userId + "/" + cartId)
    .pipe(map((shopping: any)=>{
      console.log(shopping);
      return this.generateShopping(shopping);
    }));
  }

  getDBShoppingCart(cartId: number){
     return this.http.get<any>("http://localhost:8080/appstore/getShoppingCart/" + this.authSErv.userId + "/" + cartId)
     .pipe(map((shopping: any)=>{
      return this.generateShopping(shopping);
     }));
  }

  private generateShopping(shoppingCart: any){
    if(shoppingCart.shoppingCartProducts === null){
      localStorage.removeItem('cartId');
      this.shoppings = [];
      return  this.shoppings;
    }
    let cartId = localStorage.getItem('cartId');
    if(!cartId){
      let id = shoppingCart.shoppingCart.id;
      localStorage.setItem('cartId', id);
      const shopP: any = shoppingCart.shoppingCartProducts[0];
      const shoppingProduct: Product = new Product(shopP.nameProd, shopP.price, shopP.quantity, shopP.imgUrl);
      shoppingProduct.id = shopP.id;
      shoppingProduct.key = id;
      const shopQuantityProd: Shopping = new Shopping(shoppingProduct, shopP.quantityProduct); 
      this.shoppings.push(shopQuantityProd);
      return this.shoppings;
    
    }else{
      this.shoppings = [];
      for(let shopP of shoppingCart.shoppingCartProducts){   
        const shoppingProduct: Product = new Product(shopP.nameProd, shopP.price, shopP.quantity, shopP.imgUrl);
        shoppingProduct.id = shopP.id;
        shoppingProduct.key = +cartId;
        const shopQuantityProd: Shopping = new Shopping(shoppingProduct, shopP.quantityProduct); 
        this.shoppings.push(shopQuantityProd);
  
  }
    return this.shoppings;
    
  }
  }

}
