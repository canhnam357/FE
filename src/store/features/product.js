import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    products:[]
}

const productSlice = createSlice({
    name:'productState',
    initialState:initialState,
    reducers:{
        addProduct:(state,action) =>{
            state.products.push(action?.payload.result)
            return state;
        },
        loadProducts:(state,action)=>{
            return {
                ...state,
                products: action?.payload.result
            }
        }
    }
})

export const { addProduct, loadProducts } = productSlice?.actions;
export default productSlice.reducer;

