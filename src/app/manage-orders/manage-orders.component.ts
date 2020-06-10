import { Component, OnInit} from '@angular/core';
import { ManageOrdersService } from '../orderservice/manage-orders.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {

  Orders: any;
   
  constructor(private manageOrdersSErv: ManageOrdersService, private router: Router) { }

   async ngOnInit() {
    this.Orders = await this.manageOrdersSErv.getOrders();
  }

  onOrderDetail(userId: number, cartId: number){
    this.router.navigate(['/order/detail/', userId, cartId]);
}


}
