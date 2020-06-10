import { Component, OnInit, Input } from '@angular/core';
import { Shopping } from '../model/shopping.model';
import { ShoppingCartSummaryService } from './shopping-cart-summary.service';

@Component({
  selector: 'app-shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit {
   
  @Input('shoppings') shoppings:  Shopping[];
  
  constructor(private shoppingCartSummarySErv: ShoppingCartSummaryService) { }

  ngOnInit() {
  }

  getPriceProduct(shopping: Shopping){
    return this.shoppingCartSummarySErv.getPriceProduct(shopping);
  }

  getTotalPrice(){
    return this.shoppingCartSummarySErv.getTotalPrice(this.shoppings);
  }

  get numberProducts(){
    let index: number = 0;
    for(let shopping of this.shoppings){
      index += 1;
    }
    return index;
  }

}
