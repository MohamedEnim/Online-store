import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeProductsComponent } from './home-products/home-products.component';
import { CategoriesComponent } from './categories/categories.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddProductComponent } from './manage-product/add-product/add-product.component';
import { FormsModule } from '@angular/forms'
import { DataTableModule } from 'ng-angular8-datatable';
import { ManageProductService } from './manage-product/manage-product.service';
import { ListProductComponent } from './manage-product/list-product/list-product.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShippingComponent } from './shipping/shipping.component';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { NewProductComponent } from './manage-product/new-product/new-product.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { RegisterComponent } from './register/register.component';
import { AuthInterceptorService } from './auth-servises/auth-interceptor.service';
import { CardComponent } from './card/card.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { AppRoutingModule } from './app-routing.module';



@NgModule({
  declarations: [
    AppComponent,
    HomeProductsComponent,
    CategoriesComponent,
    ManageProductComponent,
    NavbarComponent,
    AddProductComponent,
    ListProductComponent,
    ShoppingCartComponent,
    ShippingComponent,
    AddCategoryComponent,
    NewProductComponent,
    CheckOutComponent,
    ShoppingCartSummaryComponent,
    SignInComponent,
    RegisterComponent,
    CardComponent,
    MyOrderComponent,
    ManageOrdersComponent,
    OrderDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DataTableModule
  ],
  providers: [
    ManageProductService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
   ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
