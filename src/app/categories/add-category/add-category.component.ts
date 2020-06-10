import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ManageProductService } from 'src/app/manage-product/manage-product.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  @ViewChild('formAddCategory', {static: false}) formAddCategory: NgForm;

  constructor(private manageProductSErv: ManageProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {}

  onSubmit(){
    this.manageProductSErv.addNameCategory = this.formAddCategory.value.nameCateg;
    this.manageProductSErv.addNumProduct = this.formAddCategory.value.numProd;
    this.router.navigate(['/addProduct']);
  }
 
}
