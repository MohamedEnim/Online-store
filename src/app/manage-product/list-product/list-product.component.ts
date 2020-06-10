import { Component, OnInit} from '@angular/core';
import { ManageProductService } from '../manage-product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/product.model';
import { Category } from 'src/app/model/category.model';
import { HomeProductService } from 'src/app/home-products/home-product.service';
import { AuthService } from 'src/app/auth-servises/auth.service';



@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

    data:Product[] =  [];
    prodData:Product[] =  [];
    dataTable: Category[] = [];
    isAdmin: boolean = false;

  constructor(private manageProductSErv: ManageProductService, private router: Router,
    private route: ActivatedRoute, private homeProdSErv: HomeProductService,
    private authSErv : AuthService) {
     }

  ngOnInit() {

    this.isAdmin = this.authSErv.getIsAdmin();

      this.homeProdSErv.getHomeItems().subscribe((categories: Category[])=>{
        this.dataTable = categories;
        this.data = this.manageProductSErv.getTableProducts(this.dataTable);
        this.prodData.push(...this.data);
      });

      
     this.manageProductSErv.getSelectCategory().subscribe((category: Category) =>{
       this.data = [];
       this.data = this.manageProductSErv.getSelectTableProducts(category);
       this.prodData = this.data;
     });

     this.manageProductSErv.getSelectCategories().subscribe((categories: Category[])=>{
      this.data = this.manageProductSErv.getTableProducts(categories);
      this.prodData = this.data;
     });

  }

  onEdit(indexCateg: number, indexProd: number, nameProduct: string){
   
    let category = this.dataTable[indexCateg-1].nameCateg;
    let name = nameProduct;
    this.manageProductSErv.setCategIndexAndProdIndex(indexCateg, indexProd);
    this.router.navigate(['/manage/product/', category, name]);
    }

   onFilter(query: string){
     this.data = (query) ?
     this.prodData.filter(p => p.nameProd.toLowerCase().includes(query.toLowerCase())) :
     this.prodData;
   }

}
