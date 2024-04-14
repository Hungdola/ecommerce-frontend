import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  constructor(private router: Router) {

  }

  @Input() product: any

  navigate() {
    this.router.navigate([`/product-details/${this.product.id}`])
  }
}
