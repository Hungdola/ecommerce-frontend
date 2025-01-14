import { addItemToCartFailure, addItemToCartRequest, addItemToCartSuccess, getCartFailure, getCartRequest, getCartSuccess, removeCartItemFailure, removeCartItemRequest, removeCartItemSuccess, updateCartItemFailure, updateCartItemRequest, updateCartItemSuccess } from './cart.action';
import { createReducer, on } from "@ngrx/store"

export interface CartState {
    cartItems: any[],
    loading: boolean,
    error: any,
    cart: any
}

export const initialState: CartState = {
    cartItems: [],
    loading: false,
    error: null,
    cart: null
}

export const cartReducer = createReducer (

    initialState,

    on(addItemToCartRequest,getCartRequest, removeCartItemRequest, updateCartItemRequest, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(addItemToCartSuccess, (state, action) => ({
        ...state,
        loading: false,
        cartItems: [...state.cartItems, action.payload],
    })),
    on(addItemToCartFailure, (state, action) => ({
        ...state,
        loading: false,
        error: action.error
    })),


    on(getCartSuccess, (state, action) => ({
        ...state,
        loading: false,
        cartItems: action.payload.cartItems,
        cart: action.payload
    })),
    on(getCartFailure, (state, action) => ({
        ...state,
        loading: false,
        error: action.error
    })),


    on(removeCartItemSuccess, (state, action) => ({
        ...state,
        loading: false,
        cartItems: state.cartItems.filter((item) => item.id !== action.cartItemId)
    })),
    on(removeCartItemFailure, (state, action) => ({
        ...state,
        loading: false,
        error: action.error
    })),


    on(updateCartItemSuccess, (state, action) => ({
        ...state,
        loading: false,
        cartItems: state.cartItems.map((item) => item.id == action.payload.id ? action.payload : item)
    })),
    on(updateCartItemFailure, (state, action) => ({
        ...state,
        loading: false,
        error: action.error
    }))

)