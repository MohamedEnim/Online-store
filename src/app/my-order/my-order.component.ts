import { Component, OnInit, OnDestroy } from '@angular/core';
import { ManageOrdersService } from '../orderservice/manage-orders.service';
import { AuthService } from '../auth-servises/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit, OnDestroy {

  myOrders: any;
  userName: any;
  userId: number;
  subSubscribtion: Subscription;
  constructor(private manageOrdersSErv: ManageOrdersService, private authSErv: AuthService,
    private router: Router) { }

   async ngOnInit() {
   this.subSubscribtion = this.authSErv.userIdUserNameSubject.subscribe((userIdUserName: any) =>{
     this.userId = userIdUserName.userId;
     this.userName = userIdUserName.userName;
   });
    this.myOrders = await this.manageOrdersSErv.getMyOrders(this.userId);
     
  }

  onMyOrderDetail(cartId: number){
      this.router.navigate(['/order/detail/', this.userId, cartId]);
  }

  ngOnDestroy(){
    this.subSubscribtion.unsubscribe();
  }

}
