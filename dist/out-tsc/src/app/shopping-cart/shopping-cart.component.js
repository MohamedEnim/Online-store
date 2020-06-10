import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let ShoppingCartComponent = class ShoppingCartComponent {
    constructor(shoppingSErv) {
        this.shoppingSErv = shoppingSErv;
    }
    ngOnInit() {
        this.shoppings = this.shoppingSErv.getShoppingCart();
        this.shoppingSErv.sendShoppings
            .subscribe(shopps => {
            this.shoppings = shopps;
        });
    }
    shoppingCartCount() {
        return this.shoppingSErv.shoppingCartCount();
    }
    get totalPrice() {
        let totalPrice = 0;
        for (let shopCart of this.shoppings)
            totalPrice += shopCart.quantityProduct * shopCart.products.price;
        return totalPrice;
    }
    getShoppingItemsPrice(shoppingCart) {
        return shoppingCart.quantityProduct * shoppingCart.products.price;
    }
    removeFromCart(product) {
        this.shoppingSErv.removeFromCart(product);
    }
    addToCart(product) {
        this.shoppingSErv.addToCart(product);
    }
    clearCart() {
        this.shoppingSErv.clearCart();
    }
};
ShoppingCartComponent = tslib_1.__decorate([
    Component({
        selector: 'app-shopping-cart',
        templateUrl: './shopping-cart.component.html',
        styleUrls: ['./shopping-cart.component.css']
    })
], ShoppingCartComponent);
export { ShoppingCartComponent };
//# sourceMappingURL=shopping-cart.component.js.map