import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Category } from 'src/app/model/category.model';
import { Product } from '../../model/product.model';
let AddProductComponent = class AddProductComponent {
    constructor(manageProductSErv, router, route, categorySErv, homeProdSErv) {
        this.manageProductSErv = manageProductSErv;
        this.router = router;
        this.route = route;
        this.categorySErv = categorySErv;
        this.homeProdSErv = homeProdSErv;
        this.product = new Product(null, null, null, null);
        this.categoryItem = new Category(this.manageProductSErv.addNameCategory, this.manageProductSErv.addNumProduct, []);
        this.isEdit = false;
    }
    ngOnInit() {
        this.numberProduct = this.manageProductSErv.addNumProduct;
        this.route.params.subscribe((params) => {
            this.category = params['category'];
            this.name = params['name'];
            if (this.category !== undefined && this.name !== undefined) {
                this.isEdit = true;
                this.categoryIndex = this.manageProductSErv.categoryIndex;
                this.productIndex = this.manageProductSErv.productIndex;
                this.manageProductSErv.getProduct(this.productIndex).subscribe((dbProduct) => {
                    this.product = dbProduct;
                });
            }
        });
    }
    onSubmit() {
        if (this.isEdit) {
            const product = new Product(this.productData.value.nameProd, this.productData.value.price, this.productData.value.quantity, this.productData.value.imgUrl);
            this.manageProductSErv.editProduct(product, this.productIndex, this.categoryIndex)
                .subscribe((categories) => {
                this.isEdit = false;
                this.router.navigate(['../../../list'], { relativeTo: this.route });
            });
        }
        else {
            if (this.numberProduct !== 1) {
                const product = new Product(this.productData.value.nameProd, this.productData.value.price, this.productData.value.quantity, this.productData.value.imgUrl);
                this.categoryItem.products.push(product); //
                this.numberProduct -= 1;
                this.router.navigate(['./'], { relativeTo: this.route });
                this.onClear();
            }
            else {
                const product = new Product(this.productData.value.nameProd, this.productData.value.price, this.productData.value.quantity, this.productData.value.imgUrl);
                this.categoryItem.products.push(product); //
                this.categorySErv.addCategory(this.categoryItem)
                    .subscribe((category) => {
                    console.log(category);
                    this.router.navigate(['/addCategory'], { relativeTo: this.route });
                    this.onClear();
                });
            }
        }
    }
    onClear() {
        this.productData.reset();
    }
    onReturn() {
        this.router.navigate(['../list'], { relativeTo: this.route });
    }
    onDelete() {
        this.manageProductSErv.deleteProduct(this.productIndex, this.categoryIndex)
            .subscribe((categories) => {
            console.log(categories);
            this.isEdit = false;
            this.router.navigate(['../../../list'], { relativeTo: this.route });
        });
    }
    ngOnDestroy() { }
};
tslib_1.__decorate([
    ViewChild('productData', { static: false })
], AddProductComponent.prototype, "productData", void 0);
AddProductComponent = tslib_1.__decorate([
    Component({
        selector: 'app-add-product',
        templateUrl: './add-product.component.html',
        styleUrls: ['./add-product.component.css']
    })
], AddProductComponent);
export { AddProductComponent };
//# sourceMappingURL=add-product.component.js.map