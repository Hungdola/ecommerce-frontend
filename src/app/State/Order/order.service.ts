import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { catchError, map, of } from "rxjs";
import { BASE_API_URL } from "src/app/config/api";
import { createOrderFailure, createOrderSuccess, getOrderByIdFailure, getOrderByIdSuccess, getOrderHistoryFailure, getOrderHistoryRequest, getOrderHistorySuccess } from "./order.action";

@Injectable({
    providedIn: 'root',
  })
export class OrderService {
    apiUrl = BASE_API_URL;
    headers: any
  
    constructor(
      private store: Store,
      private http: HttpClient,
      private router: Router,
      private route: ActivatedRoute
    ) {
        this.headers = new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json',
          });
    }

    createOrder(reqData: any) {
        console.log("create order ", reqData)
        const url = `${this.apiUrl}/api/orders/`

        return this.http
            .post(url, reqData, {headers: this.headers})
            .pipe(
              map((data: any) => {
                console.log("create order ", data)
                if(data.id) {
                  //step=3
                  this.router.navigate([`/checkout/payment/${data.id}`], {
                    queryParams: {step: '3', order_id: data.id}
                  })
                }
                console.log("create order -", data)
                    return createOrderSuccess({order: data})
                  }),
                  catchError((error: any) => {
                    return of(
                      createOrderFailure(
                        error.response && error.response.data.message
                          ? error.response.data.message
                          : error.message
                      )
                    );
                  })
                )
            .subscribe((action) => this.store.dispatch(action));
    }

    getOrderById(orderId: string) {
        console.log("get order req ", orderId)
        const url = `${this.apiUrl}/api/orders/${orderId}`

        return this.http
            .get(url, {headers: this.headers})
            .pipe(
                map((data: any) => {
                    console.log(" order by id ", data)
                    return getOrderByIdSuccess({order: data})
                }),
                catchError((error: any) => {
                    return of(
                      getOrderByIdFailure(
                        error.response && error.response.data.message
                          ? error.response.data.message
                          : error.message
                      )
                    );
                  })
                )
            .subscribe((action) => this.store.dispatch(action));
    }

    getOrderHistory() {
        const url = `${this.apiUrl}/api/orders/user`

        this.store.dispatch(getOrderHistoryRequest())

        return this.http
            .get(url, {headers: this.headers})
            .pipe(
                map((data: any) => {
                    console.log(" order history ", data)
                    return getOrderHistorySuccess({orders: data})
                }),
                catchError((error: any) => {
                    return of(
                      getOrderHistoryFailure(
                        error.response && error.response.data.message
                          ? error.response.data.message
                          : error.message
                      )
                    );
                  })
                )
            .subscribe((action) => this.store.dispatch(action));
    }

    getAllOrders() {
        const url = `${this.apiUrl}/api/orders/user`

        this.store.dispatch(getOrderHistoryRequest())

        return this.http
            .get(url, {headers: this.headers})
            .pipe(
                map((data: any) => {
                    console.log(" order history ", data)
                    return getOrderHistorySuccess({orders: data})
                }),
                catchError((error: any) => {
                    return of(
                      getOrderHistoryFailure(
                        error.response && error.response.data.message
                          ? error.response.data.message
                          : error.message
                      )
                    );
                  })
                )
            .subscribe((action) => this.store.dispatch(action));
    }
}