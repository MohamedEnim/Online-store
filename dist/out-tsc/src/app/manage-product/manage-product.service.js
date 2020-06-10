import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let ManageProductService = class ManageProductService {
    constructor(homeProdSErv, http) {
        this.homeProdSErv = homeProdSErv;
        this.http = http;
    }
    getProduct(prodIndex) {
        return this.http.get("http://localhost:8080/appstore/product/" + prodIndex);
    }
    editProduct(product, dbProductIndex, dbCategoryIndex) {
        return this.http.post("http://localhost:8080/appstore/postProduct/" + dbCategoryIndex + "/" + dbProductIndex, product);
    }
    deleteProduct(dbProductIndex, dbCategoryIndex) {
        return this.http.delete("http://localhost:8080/appstore/deleteProduct/" + dbCategoryIndex + "/" + dbProductIndex);
    }
    getSelectCategory() {
        return this.homeProdSErv.sendSelectCategoryItem;
    }
    getSelectCategories() {
        return this.homeProdSErv.sendSelectCategories;
    }
    getTableProducts(category) {
        let data = [];
        for (let selCategory of category) {
            for (let product of selCategory.products) {
                data.push(product);
            }
        }
        return data;
    }
    getSelectTableProducts(category) {
        let data = [];
        let dindex = 0;
        for (let product of category.products) {
            data.push(product);
            data[dindex].key = category.key;
            dindex += 1;
        }
        return data;
    }
    setCategIndexAndProdIndex(categIndex, prodIndex) {
        this.categoryIndex = categIndex;
        this.productIndex = prodIndex;
    }
};
ManageProductService = tslib_1.__decorate([
    Injectable()
], ManageProductService);
export { ManageProductService };
//# sourceMappingURL=manage-product.service.js.map