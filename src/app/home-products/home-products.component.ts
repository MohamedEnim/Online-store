import { Component, OnInit } from '@angular/core';
import { HomeProductService } from './home-product.service';
import { Category } from '../model/category.model';
import { ShoppingService } from '../shopping-cart/shopping.service';



@Component({
  selector: 'app-home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.css']
})

export class HomeProductsComponent implements OnInit {

  categoryItems: Category[] = []; 
  
  constructor(private homeProdSErv: HomeProductService, private shoppingSErv: ShoppingService) { }

  ngOnInit() {
   
    this.homeProdSErv.getHomeItems().subscribe((categories: Category[])=>{
       this.categoryItems = categories;
    });

    this.homeProdSErv.sendSelectCategoryItem.subscribe((dbcategory: Category)=>{
      this.categoryItems = [];
      this.categoryItems.push(this.homeProdSErv.setDBCategory(dbcategory));
    });

    this.homeProdSErv.sendSelectCategories.subscribe((categories: Category[])=>{
      this.categoryItems = categories;
    });
  }

}
