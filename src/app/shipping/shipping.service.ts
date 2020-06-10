import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Shipping } from '../model/shipping';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  constructor(private http: HttpClient) { }

  setShipping(shipping: Shipping, userId: number){
    let cartId: string = localStorage.getItem('cartId');
    console.log(shipping);
    
    return this.http.post<any>("http://localhost:8080/appstore/shipping/" + userId + "/" + cartId, shipping);
  }


}
