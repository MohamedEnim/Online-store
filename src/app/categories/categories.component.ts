import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../model/category.model';
import { HomeProductService } from '../home-products/home-product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categoryItems: Category[] = [];

  constructor(private homeProdSErv: HomeProductService, private router: Router) { }
  
  ngOnInit() {
     this.homeProdSErv.getHomeItems().subscribe((categories: Category[])=>{
      this.categoryItems = categories;  
    });
  }

  onSelect(nameCategory: string){
    this.homeProdSErv.getSelectIndex(nameCategory).subscribe( (filtercategory)=>{
      this.homeProdSErv.sendSelectCategoryItem.next(filtercategory);
    });
  }

  onCategories(){
    this.homeProdSErv.getSelectCategories().subscribe((categories: Category[])=>{
      this.homeProdSErv.sendSelectCategories.next(categories);
    });
  }

}
