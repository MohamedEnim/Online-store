import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let CategoriesComponent = class CategoriesComponent {
    constructor(homeProdSErv, categorySErv, router) {
        this.homeProdSErv = homeProdSErv;
        this.categorySErv = categorySErv;
        this.router = router;
        this.categoryItems = [];
    }
    ngOnInit() {
        this.homeProdSErv.sendCategoryItem.subscribe((category) => {
            this.categoryItems = category;
        });
    }
    onSelect(nameCategory) {
        this.categorySErv.getSelectIndex(nameCategory).subscribe((filtercategory) => {
            this.homeProdSErv.sendSelectCategoryItem.next(filtercategory);
            this.router.navigate(['/home/', nameCategory]);
        });
    }
    onCategories() {
        this.categorySErv.getSelectCategories().subscribe((categories) => {
            this.homeProdSErv.sendSelectCategories.next(categories);
            this.router.navigate(['/home']);
        });
    }
};
CategoriesComponent = tslib_1.__decorate([
    Component({
        selector: 'app-categories',
        templateUrl: './categories.component.html',
        styleUrls: ['./categories.component.css']
    })
], CategoriesComponent);
export { CategoriesComponent };
//# sourceMappingURL=categories.component.js.map