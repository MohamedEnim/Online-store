import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeProductsComponent } from './home-products/home-products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AdminGuardService } from './guards/admin-guard.service';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { LoginGuardService } from './guards/login-guard.service';
import { MyOrderComponent } from './my-order/my-order.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { AddProductComponent } from './manage-product/add-product/add-product.component';
import { ListProductComponent } from './manage-product/list-product/list-product.component';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { NewProductComponent } from './manage-product/new-product/new-product.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { RegisterComponent } from './register/register.component';


const appRoute:Routes = [
    {path: '', redirectTo: '/home' , pathMatch: 'full'},
    {path: 'home', component: HomeProductsComponent},
    {path: 'home/:category', component: HomeProductsComponent},
    {path: 'shopping-cart', component: ShoppingCartComponent},
  
    {path: 'manage/orders', canActivate: [AdminGuardService], component: ManageOrdersComponent},
    {path: 'my/orders', canActivate: [LoginGuardService], component: MyOrderComponent},
    {path: 'order/detail/:userId/:cartId', canActivate: [AdminGuardService, LoginGuardService], component: OrderDetailComponent},
  
    {path: 'check-out', canActivate: [LoginGuardService], component: CheckOutComponent},
    {path: 'manage', component: ManageProductComponent , children: [
      { path: 'product/:category/:name', canActivate: [AdminGuardService], component: AddProductComponent},
      { path: 'list', component: ListProductComponent}
    ]},
    {path: 'addCategory', canActivate: [AdminGuardService, LoginGuardService], component: AddCategoryComponent},
    {path: 'addProduct', canActivate: [AdminGuardService, LoginGuardService], component: AddProductComponent},
    {path: 'newProduct', canActivate: [AdminGuardService, LoginGuardService], component:  NewProductComponent},
    {path: 'addProduct/:category', canActivate: [AdminGuardService, LoginGuardService], component: AddProductComponent},
    {path: 'signin', component: SignInComponent},
    {path: 'register', component: RegisterComponent}
  
  ];

  
@NgModule({
    imports: [
        RouterModule.forRoot(appRoute)
    ],

    exports: [
        RouterModule
    ]
    
})

export class AppRoutingModule{}