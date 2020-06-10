import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Category } from '../model/category.model';
import { Product } from '../model/product.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
let HomeProductService = class HomeProductService {
    constructor(http) {
        this.http = http;
        this.sendCategoryItem = new Subject();
        this.sendSelectCategoryItem = new Subject();
        this.sendSelectCategories = new Subject();
        this.categoryItems = [];
    }
    //This Function get all the categories from the DataBase 
    getHomeItems() {
        return this.http.get("http://localhost:8080/appstore/categories")
            .pipe(map((categories) => {
            return this.setDBCategories(categories);
        }));
    }
    //This Function recieve the table category from the DataBase and 
    //transform it to categories table
    setDBCategories(categories) {
        let categoryItems = [];
        for (let category of categories) {
            let dbProducts = [];
            for (let product of category.products) {
                let dbProduct = new Product(product.nameProd, product.price, product.quantity, product.imgUrl);
                dbProduct.id = product.id;
                dbProduct.key = category.id;
                dbProducts.push(dbProduct);
            }
            let categ = new Category(category.nameCateg, category.numProduct, dbProducts);
            categ.key = category.id;
            categoryItems.push(categ);
        }
        return categoryItems;
    }
    setDBCategory(dbCategory) {
        let dbProducts = [];
        let filtercategory;
        for (let product of dbCategory.products) {
            let dbProduct = new Product(product.nameProd, product.price, product.quantity, product.imgUrl);
            dbProducts.push(dbProduct);
            filtercategory = new Category(dbCategory.nameCateg, dbCategory.numProduct, dbProducts);
            filtercategory.key = dbCategory.id;
        }
        return filtercategory;
    }
    getCategories() {
        return this.categoryItems;
    }
    setCategories(categories) {
        this.categoryItems = categories;
    }
};
HomeProductService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], HomeProductService);
export { HomeProductService };
//# sourceMappingURL=home-product.service.js.map