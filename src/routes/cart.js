import { fetchCart } from '../api/fetchProducts';
import { setLoading } from '../store/features/common';
import store from '../store/store';

export const loadCart = async () =>{
    try{
        //console.log(params);
        store.dispatch(setLoading(true));
        const cart = await fetchCart();
        //console.log(params?.id);
        store.dispatch(setLoading(false));
        console.log(cart.result);
        // console.log("hehe");
        return {cart: cart.result};
    }
    catch(err){

    }
}