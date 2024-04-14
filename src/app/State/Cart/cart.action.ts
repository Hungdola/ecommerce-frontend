import { createAction, props } from "@ngrx/store";

//add item to cart
export const addItemToCartRequest = createAction(
    '[Cart] Add Item To Cart Request', props<{reqData: any}>()
)
export const addItemToCartSuccess = createAction(
    '[Cart] Add Item To Cart Success', props<{payload: any}>()
)
export const addItemToCartFailure = createAction(
    '[Cart] Add Item To Cart Failure', props<{error: any}>()
)

//get cart
export const getCartRequest = createAction(
    '[Cart] Get Cart Request'
)
export const getCartSuccess = createAction(
    '[Cart] Get Cart Success', props<{payload: any}>()
)
export const getCartFailure = createAction(
    '[Cart] Get Cart Failure', props<{error: any}>()
)

//remove cart item
export const removeCartItemRequest = createAction(
    '[Cart] Remove Cart Item Request', props<{reqData: any}>()
)
export const removeCartItemSuccess = createAction(
    '[Cart] Remove Cart Item Success', props<{cartItemId: number}>()
)
export const removeCartItemFailure = createAction(
    '[Cart] Remove Cart Item Failure', props<{error: any}>()
)

//update cart item
export const updateCartItemRequest = createAction(
    '[Cart] Add Item To Cart Request', props<{reqData: any}>()
)
export const updateCartItemSuccess = createAction(
    '[Cart] Add Item To Cart Success', props<{payload: any}>()
)
export const updateCartItemFailure = createAction(
    '[Cart] Add Item To Cart Failure', props<{error: any}>()
)