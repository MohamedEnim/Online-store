import { Component, OnInit } from '@angular/core';
import { Shopping } from '../model/shopping.model';
import { ShoppingService } from '../shopping-cart/shopping.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  obsShoppings: Observable<Shopping[]>;
  
  constructor(private shoppingSErv: ShoppingService) { }

  async ngOnInit() {
    let cartId = localStorage.getItem('cartId');
    this.obsShoppings = await this.shoppingSErv.getDBShoppingCart(+cartId);
  }

}
