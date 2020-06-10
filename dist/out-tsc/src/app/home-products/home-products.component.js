import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let HomeProductsComponent = class HomeProductsComponent {
    constructor(homeProdSErv, categorySErv, shoppingSErv) {
        this.homeProdSErv = homeProdSErv;
        this.categorySErv = categorySErv;
        this.shoppingSErv = shoppingSErv;
        this.categoryItems = [];
    }
    ngOnInit() {
        this.homeProdSErv.getHomeItems().subscribe((categories) => {
            this.categoryItems = categories;
            this.homeProdSErv.setCategories(this.categoryItems);
            this.homeProdSErv.sendCategoryItem.next(this.categoryItems);
        });
        this.homeProdSErv.sendSelectCategoryItem.subscribe((dbcategory) => {
            this.categoryItems = [];
            this.categoryItems.push(this.homeProdSErv.setDBCategory(dbcategory));
        });
        this.homeProdSErv.sendSelectCategories.subscribe((categories) => {
            this.categoryItems = categories;
        });
    }
    getQuantity(nameProduct) {
        return this.shoppingSErv.getQuantity(nameProduct);
    }
    addToCart(productItem) {
        this.shoppingSErv.addToCart(productItem);
    }
    removeFromCart(productItem) {
        this.shoppingSErv.removeFromCart(productItem);
    }
    ngOnDestroy() {
    }
};
HomeProductsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-home-products',
        templateUrl: './home-products.component.html',
        styleUrls: ['./home-products.component.css']
    })
], HomeProductsComponent);
export { HomeProductsComponent };
//# sourceMappingURL=home-products.component.js.map