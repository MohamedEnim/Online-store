import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let CategoryService = class CategoryService {
    constructor(homeProdSErv, http) {
        this.homeProdSErv = homeProdSErv;
        this.http = http;
    }
    //This Function add category to the dataBase
    addCategory(category) {
        return this.http.post("http://localhost:8080/appstore/category", category);
    }
    getSelectIndex(nameCategory) {
        return this.http.get("http://localhost:8080/appstore/" + nameCategory);
    }
    getSelectCategories() {
        return this.homeProdSErv.getHomeItems();
    }
};
CategoryService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], CategoryService);
export { CategoryService };
//# sourceMappingURL=category.service.js.map