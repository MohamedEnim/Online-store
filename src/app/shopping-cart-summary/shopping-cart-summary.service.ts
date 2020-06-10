import { Injectable } from '@angular/core';
import { Shopping } from '../model/shopping.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartSummaryService {

  constructor() { }

  getPriceProduct(shopping: Shopping){
    return shopping.products.price*shopping.quantityProduct;
  }

  getTotalPrice(shoppings: Shopping[]){
    let totalPrice: number = 0;
    for(let shopping of shoppings){
      totalPrice += shopping.products.price*shopping.quantityProduct;
    }
    return totalPrice;
  }

}
