import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Shopping } from '../model/shopping.model';
import { Subject } from 'rxjs';
let ShoppingService = class ShoppingService {
    constructor(http) {
        this.http = http;
        this.shoppings = [];
        this.sendShoppings = new Subject();
    }
    getShoppingCart() {
        return this.shoppings;
    }
    getQuantity(nameProduct) {
        let exist = 0;
        for (let shoppingItem of this.shoppings) {
            if (shoppingItem.products.nameProd === nameProduct) {
                exist = shoppingItem.quantityProduct;
            }
        }
        return exist;
    }
    addToCart(productItem) {
        let indexProd = this.shoppings.findIndex(sh => sh.products === productItem);
        console.log(indexProd);
        console.log(productItem);
        if (indexProd === -1) {
            const shoppingItem = new Shopping(productItem, 1);
            this.shoppings.push(shoppingItem);
        }
        else {
            this.shoppings[indexProd].quantityProduct++;
        }
        this.sendShoppings.next(this.shoppings);
        localStorage.getItem;
        this.http.post("http://localhost:8080/appstore/addShoppingCart/" + dbCategoryIndex + "/" + dbProductIndex, product);
    }
    removeFromCart(productItem) {
        let indexProd = this.shoppings.findIndex(sh => sh.products === productItem);
        this.shoppings[indexProd].quantityProduct--;
        if (this.shoppings[indexProd].quantityProduct === 0) {
            this.shoppings.splice(indexProd, 1);
        }
        this.sendShoppings.next(this.shoppings);
    }
    shoppingCartCount() {
        let shoppingCartCount = 0;
        for (let shopCart of this.shoppings)
            shoppingCartCount += shopCart.quantityProduct;
        return shoppingCartCount;
    }
    clearCart() {
        this.shoppings.splice(0, this.shoppings.length);
    }
};
ShoppingService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], ShoppingService);
export { ShoppingService };
//# sourceMappingURL=shopping.service.js.map