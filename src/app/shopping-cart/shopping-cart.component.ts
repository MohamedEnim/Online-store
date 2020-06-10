import { Component, OnInit } from '@angular/core';
import { ShoppingService } from './shopping.service';
import { Shopping } from '../model/shopping.model';
import { Product } from '../model/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  shoppings: Shopping[] = [];
 
  constructor(private shoppingSErv: ShoppingService, private router: Router) { }

  ngOnInit() {
   
    let cartId = localStorage.getItem('cartId');
    if(!cartId){
      this.shoppingSErv.shoppings= [];
    }else{
      this.shoppingSErv.getDBShoppingCart(+cartId).subscribe((shoppings: Shopping[])=>{
        this.shoppings = shoppings;
      });
    } 
  }


 shoppingCartCount(){
    return this.shoppingSErv.shoppingCartCount();
  }

  getShoppingItemsPrice(shoppingCart: Shopping){
    return shoppingCart.quantityProduct * shoppingCart.products.price;
  }

  removeFromCart(productItem: Product){
    this.shoppingSErv.removeFromCart(productItem).subscribe((shoppings: Shopping[])=>{
      this.shoppings = shoppings;
   });
  }

  addToCart(productItem: Product){
     this.shoppingSErv.addToCart(productItem).subscribe((shoppings: Shopping[])=>{
        this.shoppings = shoppings;
      });
  }

  clearCart(){
    this.shoppingSErv.clearCart().subscribe((shoppings: Shopping[])=>{
      this.shoppings = shoppings;
   });
  }

  get totalPrice(){
    let totalPrice = 0;
    for(let shopCart of this.shoppings)
    totalPrice += shopCart.quantityProduct * shopCart.products.price;
     return totalPrice;
   }

   onRoute(){
     let user = localStorage.getItem('User_Key');
     if(user){
       this.router.navigateByUrl('/check-out');
     }else{
       this.router.navigateByUrl('/signin');
     }
   }
}
