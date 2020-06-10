import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
let AddCategoryComponent = class AddCategoryComponent {
    constructor(manageProductSErv, router, route) {
        this.manageProductSErv = manageProductSErv;
        this.router = router;
        this.route = route;
    }
    ngOnInit() { }
    onSubmit() {
        this.manageProductSErv.addNameCategory = this.formAddCategory.value.nameCateg;
        this.manageProductSErv.addNumProduct = this.formAddCategory.value.numProd;
        this.router.navigate(['/addProduct']);
    }
};
tslib_1.__decorate([
    ViewChild('formAddCategory', { static: false })
], AddCategoryComponent.prototype, "formAddCategory", void 0);
AddCategoryComponent = tslib_1.__decorate([
    Component({
        selector: 'app-add-category',
        templateUrl: './add-category.component.html',
        styleUrls: ['./add-category.component.css']
    })
], AddCategoryComponent);
export { AddCategoryComponent };
//# sourceMappingURL=add-category.component.js.map