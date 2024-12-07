import { getToken } from "../utils/jwt-helper";
export const API_URLS = {
    GET_PRODUCTS:'/api/books',
    GET_PRODUCT: (id) => `/api/books/${id}`,
    GET_CATEGORIES:'/api/categories',
    GET_CATEGORY: (id) => `/api/categories/${id}`,
    GET_CART: '/api/cart',
    ADD_TO_CART: "/api/cart/add-to-cart",
    REMOVE_TO_CART: "/api/cart"
}

export const API_BASE_URL = 'http://localhost:8080';


export const getHeaders = ()=>{
    return {
        'Authorization':`Bearer ${getToken()}`
    }
}