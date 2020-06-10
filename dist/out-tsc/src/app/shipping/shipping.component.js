import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
let ShippingComponent = class ShippingComponent {
    constructor() { }
    ngOnInit() {
    }
    onSubmit() {
        console.log(this.formShipping.value);
    }
};
tslib_1.__decorate([
    ViewChild('formShipping', { static: false })
], ShippingComponent.prototype, "formShipping", void 0);
ShippingComponent = tslib_1.__decorate([
    Component({
        selector: 'app-shipping',
        templateUrl: './shipping.component.html',
        styleUrls: ['./shipping.component.css']
    })
], ShippingComponent);
export { ShippingComponent };
//# sourceMappingURL=shipping.component.js.map