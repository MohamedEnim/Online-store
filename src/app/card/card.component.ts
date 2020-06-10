import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../model/product.model';
import { ShoppingService } from '../shopping-cart/shopping.service';
import { Shopping } from '../model/shopping.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit { 

  @Input('productItem') productItem: Product;
   shoppings: Shopping[];
  
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

  getQuantity(nameProduct: string){
    return this.shoppingSErv.getQuantity(nameProduct);
  }

   addToCart(productItem: Product){
    let userKey = localStorage.getItem('User_Key')
    if(!userKey){
      this.router.navigateByUrl('/signin');
    }else{
     this.shoppingSErv.addToCart(productItem).subscribe((shoppings: any)=>{
      this.shoppings = shoppings; 
     });
    }
  }

 async removeFromCart(productItem: Product){
  this.shoppings = await this.shoppingSErv.removeFromCart(productItem).toPromise();
 }
  

}
