import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth-servises/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ManageOrdersService {

  constructor(private http: HttpClient, private authSErv: AuthService) {}

  getMyOrders(userId: number){
    return this.http.get<any>("http://localhost:8080/appstore/my/orders/" + userId);
  }

  getMyOrderDetail(cartId: string, userId: string){
    return this.http.get<any>("http://localhost:8080/appstore/my/order/detail/" + userId + "/" + cartId );
  }

  getOrders(){
    return this.http.get<any>("http://localhost:8080/appstore/orders");
  }

}
