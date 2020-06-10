import * as tslib_1 from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeProductsComponent } from './home-products/home-products.component';
import { CategoriesComponent } from './categories/categories.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { AddProductComponent } from './manage-product/add-product/add-product.component';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from 'ng-angular8-datatable';
import { ManageProductService } from './manage-product/manage-product.service';
import { ListProductComponent } from './manage-product/list-product/list-product.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShippingComponent } from './shipping/shipping.component';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
const appRoute = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeProductsComponent },
    { path: 'home/:category', component: HomeProductsComponent },
    { path: 'shopping-cart', component: ShoppingCartComponent },
    { path: 'shipping', component: ShippingComponent },
    { path: 'manage', component: ManageProductComponent, children: [
            { path: 'product/:category/:name', component: AddProductComponent },
            { path: 'list', component: ListProductComponent }
        ] },
    { path: 'addCategory', component: AddCategoryComponent },
    { path: 'addProduct', component: AddProductComponent }
];
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    NgModule({
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
            AddCategoryComponent
        ],
        imports: [
            BrowserModule,
            RouterModule.forRoot(appRoute),
            HttpClientModule,
            FormsModule,
            DataTableModule
        ],
        providers: [
            ManageProductService
        ],
        bootstrap: [
            AppComponent
        ]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map