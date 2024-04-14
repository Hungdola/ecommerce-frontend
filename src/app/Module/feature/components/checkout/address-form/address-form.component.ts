import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/State/Order/order.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent {

  addresses=[1,1,1,1,1]

  myForm: FormGroup = this.formBuiler.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    streetAddress: ["", Validators.required],
    city: ["", Validators.required],
    state: ["", Validators.required],
    zipCode: ["", Validators.required],
    mobile: ["", Validators.required],
  })

  constructor(private formBuiler: FormBuilder, private orderService: OrderService,private router: Router) {

  }
  
  handleCreateOrder(item: any) {

  }

  handleSubmit =() => {
    const formValue = this.myForm.value
    this.orderService.createOrder(formValue)
    console.log("form data: ", formValue)
    this.router.navigate(["checkout"])
  }
}
