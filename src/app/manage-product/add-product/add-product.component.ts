import { Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import { Category } from 'src/app/model/category.model';
import { Product } from '../../model/product.model'; 
import { NgForm } from '@angular/forms';
import { ManageProductService } from '../manage-product.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HomeProductService } from 'src/app/home-products/home-product.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent implements OnInit{

  @ViewChild('productData', {static: false}) productData: NgForm;
  product: Product = new Product(null, null, null, null);
  categoryItem: Category = new Category(this.manageProductSErv.addNameCategory, this.manageProductSErv.addNumProduct, []);
  newProduct: Product[] = [];
  isEdit: boolean = false;
  isNew: boolean = false;
  numberProduct: number;
  categoryIndex: number;
  productIndex: number;
  category: string;
  name: string;

  constructor(private manageProductSErv: ManageProductService, private router: Router, 
    private route: ActivatedRoute, private homeProdSErv: HomeProductService ) { 
  } 

  ngOnInit() {
      this.numberProduct = this.manageProductSErv.addNumProduct;
      this.route.params.subscribe((params: Params) =>{
      this.category = params['category'] ;
        this.name = params['name'];
        if(this.category !== undefined && this.name !== undefined){
        this.isEdit = true;
        this.categoryIndex = this.manageProductSErv.categoryIndex;
        this.productIndex = this.manageProductSErv.productIndex;
        this.manageProductSErv.getProduct(this.productIndex).subscribe((dbProduct: Product)=>{
          this.product = dbProduct;
        });
      }
      else if(this.category !== undefined && this.name === undefined){
        this.isNew =  true;
      }
      });
  }

  onSubmit(){
    
    if(this.isEdit){
      const product = new Product( this.productData.value.nameProd,
      this.productData.value.price,this.productData.value.quantity,this.productData.value.imgUrl);
      this.manageProductSErv.editProduct(product, this.productIndex, this.categoryIndex )
      .subscribe((categories: any)=>{
        this.isEdit = false;
        this.router.navigate(['../../../list'], {relativeTo: this.route});
      });
    }else if(this.isNew){
      
      if(this.numberProduct !== 1){   
        const product = new Product(this.productData.value.nameProd, this.productData.value.price,
        this.productData.value.quantity,this.productData.value.imgUrl);
        this.newProduct.push(product);//
        this.numberProduct -= 1;
        this.router.navigate(['./'], {relativeTo: this.route});
        this.onClear();
      }else{
         const product = new Product(this.productData.value.nameProd, this.productData.value.price,
          this.productData.value.quantity, this.productData.value.imgUrl);
          this.newProduct.push(product);//
          this.homeProdSErv.addProductToExisteCateg(this.newProduct, this.manageProductSErv.addNameCategory)
          .subscribe((category: Category) =>{
          this.isNew = false; 
          this.router.navigate(['../'],  {relativeTo: this.route});
          this.onClear();         
          });    
      } 
    
    
    }else{
     
      if(this.numberProduct !== 1){   
        const product = new Product(this.productData.value.nameProd, this.productData.value.price,
        this.productData.value.quantity,this.productData.value.imgUrl);
        this.categoryItem.products.push(product);//
        this.numberProduct -= 1;
        this.router.navigate(['./'], {relativeTo: this.route});
        this.onClear();
      }else{
         const product = new Product(this.productData.value.nameProd, this.productData.value.price,
          this.productData.value.quantity, this.productData.value.imgUrl);
          this.categoryItem.products.push(product);//
          this.homeProdSErv.addCategory(this.categoryItem)
          .subscribe((category: Category) =>{ 
          this.router.navigate(['../'],  {relativeTo: this.route});
          this.onClear();         
          });    
      } 
    }
  }

  onClear(){
    this.productData.reset();
  }

  onReturn(){
    if(this.isEdit){
      this.router.navigate(['../list'], {relativeTo: this.route});
    }else if(this.isNew){
      this.router.navigate(['../../'], {relativeTo: this.route});
    }else{
      this.router.navigate(['../'], {relativeTo: this.route});
    }
    
  }

  onDelete(){
    this.manageProductSErv.deleteProduct(this.productIndex, this.categoryIndex)
    .subscribe((categories: any)=>{
      console.log(categories);
      this.isEdit = false;
      this.router.navigate(['../../../list'], {relativeTo: this.route});
    }); 
  }

}
