import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ManageOrdersService } from '../orderservice/manage-orders.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})

export class OrderDetailComponent implements OnInit {

  cartId: string;
  userId: string;
  myOrderDetails: any[] = [] ;

  constructor(private route: ActivatedRoute, private manageOrdersSErv: ManageOrdersService) { }

  ngOnInit() {

   this.route.params.pipe(switchMap((params: Params)=>{
    this.cartId = params['cartId'];
    this.userId = params['userId'];
    return this.manageOrdersSErv.getMyOrderDetail(this.cartId, this.userId);
  })).subscribe((myOrderDetails: any) =>{
     this.myOrderDetails = myOrderDetails;
   });

  }

  getShoppingItemsPrice(myOrderDetail: any){
    return myOrderDetail.quantityProduct * myOrderDetail.price;
  }

  get totalPrice(){
    let totalPrice = 0;
    for(let myOrderDetail of this.myOrderDetails)
    totalPrice += myOrderDetail.quantityProduct * myOrderDetail.price;
     return totalPrice;
   }


}
