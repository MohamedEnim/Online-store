import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let ListProductComponent = class ListProductComponent {
    constructor(manageProductSErv, router, route, homeProdSErv) {
        this.manageProductSErv = manageProductSErv;
        this.router = router;
        this.route = route;
        this.homeProdSErv = homeProdSErv;
        this.data = [];
        this.prodData = [];
        this.dataTable = [];
    }
    ngOnInit() {
        this.homeProdSErv.getHomeItems().subscribe((categories) => {
            this.dataTable = categories;
            this.homeProdSErv.sendCategoryItem.next(this.dataTable);
            this.data = this.manageProductSErv.getTableProducts(this.dataTable);
            this.prodData.push(...this.data);
        });
        this.manageProductSErv.getSelectCategory().subscribe((category) => {
            this.data = [];
            this.data = this.manageProductSErv.getSelectTableProducts(category);
            this.prodData = this.data;
        });
        this.manageProductSErv.getSelectCategories().subscribe((categories) => {
            this.data = this.manageProductSErv.getTableProducts(categories);
            this.prodData = this.data;
        });
    }
    onEdit(indexCateg, indexProd, nameProduct) {
        let category = this.dataTable[indexCateg - 1].nameCateg;
        let name = nameProduct;
        this.manageProductSErv.setCategIndexAndProdIndex(indexCateg, indexProd);
        this.router.navigate(['/manage/product/', category, name]);
    }
    onFilter(query) {
        this.data = (query) ?
            this.prodData.filter(p => p.nameProd.toLowerCase().includes(query.toLowerCase())) :
            this.prodData;
    }
};
ListProductComponent = tslib_1.__decorate([
    Component({
        selector: 'app-list-product',
        templateUrl: './list-product.component.html',
        styleUrls: ['./list-product.component.css']
    })
], ListProductComponent);
export { ListProductComponent };
//# sourceMappingURL=list-product.component.js.map