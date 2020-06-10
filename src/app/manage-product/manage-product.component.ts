import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ManageProductService } from './manage-product.service';
import { Category } from '../model/category.model';


@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit {
  

  constructor() {}

  ngOnInit() {}


}
