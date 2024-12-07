import axios from "axios";
import { API_BASE_URL, API_URLS, getHeaders, ADD_TO_CART } from "./constant"


export const fetchCart = async()=> {
    const url = API_BASE_URL + API_URLS.GET_CART;

    try{
        const result = await axios(url,{
            method:'GET',
            headers:getHeaders()
        });
        return result?.data;
    }
    catch(e){
        console.log(e);
    }
}

export const addToCartAPI = async(body)=> {
    const url = API_BASE_URL + API_URLS.ADD_TO_CART;
    try{
        const result = await axios(url,{
            method:'POST',
            headers:getHeaders(),
            data: body
        });
        return result?.data;
    }
    catch(e){
        console.log(e);
    }
}

export const removeFromCartAPI = async(body)=> {
    const url = API_BASE_URL + API_URLS.REMOVE_TO_CART + `/${body.bookId}`;
    try{
        const result = await axios(url,{
            method:'DELETE',
            headers:getHeaders(),
            data: body
        });
        return result?.data;
    }
    catch(e){
        console.log(e);
    }
}