import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/State/Order/order.service';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/Models/AppState';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  
  
  products = [1,1,1,1]
  order: any
  address: any

  constructor(private activatedRoute:ActivatedRoute, private orderService: OrderService, private store: Store<AppState>) {}
  
  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get("id")
    if(id) {
      this.orderService.getOrderById(id)
    }
    this.store.pipe(select((store) => store.order)).subscribe(order => {
      this.order=order.order
    })
  }

}
