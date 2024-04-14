import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, map, of } from 'rxjs';
import { BASE_API_URL } from 'src/app/config/api';
import {
  addItemToCartFailure,
  addItemToCartSuccess,
  getCartFailure,
  getCartSuccess,
  removeCartItemFailure,
  removeCartItemSuccess,
  updateCartItemFailure,
  updateCartItemSuccess,
} from './cart.action';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  apiUrl = BASE_API_URL;

  constructor(
    private store: Store,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  addItemToCart(reqData: any) {
    const url = `${this.apiUrl}/api/cart/add`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
    });

    return this.http
      .put(url, reqData, { headers })
      .pipe(
        map((data: any) => {
          console.log('added item ', data);
          return addItemToCartSuccess({ payload: data });
        }),
        catchError((error: any) => {
          return of(
            addItemToCartFailure(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            )
          );
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  getCart() {
    const url = `${this.apiUrl}/api/cart/`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
    });

    return this.http
      .get(url, { headers })
      .pipe(
        map((data: any) => {
          return getCartSuccess({ payload: data });
        }),
        catchError((error: any) => {
          return of(
            getCartFailure(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            )
          );
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  removeCartItem(cartItemId: number) {
    const url = `${this.apiUrl}/api/cart_items/${cartItemId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
    });

    return this.http
      .delete(url, { headers })
      .pipe(
        map((data: any) => {
          console.log('remove item ', data);
          return removeCartItemSuccess({ cartItemId });
        }),
        catchError((error: any) => {
          return of(
            removeCartItemFailure(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            )
          );
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  updateCartItem(reqData: any) {
    const url = `${this.apiUrl}/api/cart_items/${reqData.cartItemId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
    });

    return this.http
      .put(url, reqData.data, { headers })
      .pipe(
        map((data: any) => {
          console.log('update item to ', data);
          return updateCartItemSuccess({ payload: data });
        }),
        catchError((error: any) => {
          return of(
            updateCartItemFailure(
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
