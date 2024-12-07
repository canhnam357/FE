import { getProductById } from '../api/fetchProducts';
import { setLoading } from '../store/features/common';
import store from '../store/store';

export const loadProductById = async ({params}) =>{
    try{
        //console.log(params);
        store.dispatch(setLoading(true));
        const product = await getProductById(params?.id);
        //console.log(params?.id);
        store.dispatch(setLoading(false));
        console.log(product.result);
        // console.log("hehe");
        return {product: product.result};
    }
    catch(err){

    }
}