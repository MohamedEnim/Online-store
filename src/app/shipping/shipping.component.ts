import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShippingService } from './shipping.service';
import { Router } from '@angular/router';
import { Shipping } from '../model/shipping';
import { AuthService } from '../auth-servises/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit, OnDestroy {

  @ViewChild('formShipping', {static: false}) formShipping: NgForm;

  userName: any;
  userId: number;
  subSubscription: Subscription;
  
  constructor(private shippingSErv: ShippingService, private router: Router,
    private authSErv: AuthService) { }

  ngOnInit() {
    this.subSubscription = this.authSErv.userIdUserNameSubject.subscribe((userIdUserName: any) =>{
      this.userId = userIdUserName.userId;
      this.userName = userIdUserName.userName;
    });
  }

  onSubmit(){
    console.log(this.formShipping.value.city);

    let shipping: Shipping = new Shipping(this.formShipping.value.name, this.formShipping.value.adress1, 
    this.formShipping.value.city);
    shipping.address_2 = this.formShipping.value.adress2;

   

    this.shippingSErv.setShipping(shipping, this.userId).subscribe((shipping: any) =>{
      console.log(shipping);
      localStorage.removeItem('cartId');
      this.router.navigateByUrl('/home');
    });
    
  }

  ngOnDestroy(){
    this.subSubscription.unsubscribe();
  }

}
