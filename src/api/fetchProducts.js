import axios from "axios";
import { API_BASE_URL, API_URLS } from "./constant"


export const getAllProducts = async ()=>{
    let url = API_BASE_URL + API_URLS.GET_PRODUCTS;
    try{
        const result = await axios(url,{
            method:"GET"
        });
        return result?.data;
    }
    catch(err){
        console.error(err);
    }
}



export const getProductById = async (id)=>{
    const url = API_BASE_URL + API_URLS.GET_PRODUCTS + `/${id}`;
    console.log(url);
    try{
        const result = await axios(url,{
            method:"GET",
        });
        return result?.data;
    }
    catch(err){
        console.error(err);
    }
}