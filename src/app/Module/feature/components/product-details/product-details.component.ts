import { ProductService } from './../../../../State/Product/product.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { lehngacholiPage2 } from 'src/Data/Saree/lenghaCholiPage2';
import { AppState } from 'src/app/Models/AppState';
import { CartService } from 'src/app/State/Cart/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  
  selectedSize: any
  
  reviews = [1,1,1,1,1]
  relatedProducts: any
  product: any
  productId: any

  constructor(private router: Router, private productService:ProductService, private activatedRoute:ActivatedRoute, private store: Store<AppState>, private cartService: CartService) {

  }
  
  
  ngOnInit(): void {
    this.relatedProducts = lehngacholiPage2
    const id = this.activatedRoute.snapshot.paramMap.get("id")
    this.productService.findProductById(id)
    this.productId = id

    this.store.pipe(select((store) => store.product)).subscribe((product) => {
      this.product = product.product
      console.log("store data ",product.product )
    })
  }

  handleAddToCart() {
    console.log("selected size", this.selectedSize)
    const data = {size:this.selectedSize, productId: this.productId}
    this.cartService.addItemToCart(data)

    this.cartService.getCart
    this.router.navigate(['cart'])
  }

}
