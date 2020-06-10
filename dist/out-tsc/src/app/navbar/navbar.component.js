import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let NavbarComponent = class NavbarComponent {
    constructor(shoppingSErv) {
        this.shoppingSErv = shoppingSErv;
    }
    ngOnInit() {
    }
    shoppingCartCount() {
        return this.shoppingSErv.shoppingCartCount();
    }
};
NavbarComponent = tslib_1.__decorate([
    Component({
        selector: 'app-navbar',
        templateUrl: './navbar.component.html',
        styleUrls: ['./navbar.component.css']
    })
], NavbarComponent);
export { NavbarComponent };
//# sourceMappingURL=navbar.component.js.map