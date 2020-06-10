import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ManageProductService } from '../manage-product.service';
import { Category } from 'src/app/model/category.model';
import { HomeProductService } from 'src/app/home-products/home-product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  @ViewChild('formNewProducts', {static: false}) formNewProducts: NgForm;
  categoryItems: Category[] = [];
  nameCateg: string;
  numProd: number;

  constructor(private manageProductSErv: ManageProductService, private router: Router, private route: ActivatedRoute,
    private homeProdSErv: HomeProductService) { }

  ngOnInit() {
    this.homeProdSErv.getHomeItems().subscribe((categories: Category[])=>{
      this.categoryItems = categories;
      this.nameCateg = this.categoryItems[0].nameCateg;
    });
  }

  onSubmit(){
    this.manageProductSErv.addNameCategory = this.nameCateg;
    this.manageProductSErv.addNumProduct = this.numProd;
    this.router.navigate(['/addProduct', this.nameCateg]); 
  }

}
