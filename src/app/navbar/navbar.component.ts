import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingService } from '../shopping-cart/shopping.service';
import { AuthService } from '../auth-servises/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  
  isLogin: boolean = false;
  isAdmin: boolean = false;
  subSubscription: Subscription;
  
  constructor(private shoppingSErv: ShoppingService, private authSErv : AuthService,
    private router: Router) { }
 
  ngOnInit() {
   
   this.subSubscription = this.authSErv.isLoginisAdmin.subscribe((resp: any) =>{
      this.isLogin = resp.isLogin;
      this.isAdmin = resp.isAdmin;
    });
  }

  shoppingCartCount(){
    return this.shoppingSErv.shoppingCartCount();
  }

  onSignOut(){
    
    let cartId: string = localStorage.getItem('cartId');
    if(cartId){
      this.shoppingSErv.clearCart().subscribe((shoppings: any)=>{
        localStorage.clear();
        this.isAdmin = false;
        this.isLogin = false;
        this.router.navigateByUrl('/home');
     });
    }else{
      localStorage.clear();
      this.isAdmin = false;
      this.isLogin = false;
      this.router.navigateByUrl('/home');
    }  
  }

  ngOnDestroy(){
    this.subSubscription.unsubscribe();
  }

}
