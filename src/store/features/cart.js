import { createSlice } from "@reduxjs/toolkit"

// {id:Number,quantity:number}

const initialState = {
    cart: []
}

const cartSlice = createSlice({
    name: 'cartState',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            const newItem = action?.payload?.result;

            // Kiểm tra nếu sản phẩm đã tồn tại trong giỏ hàng
            const existingItem = state.cart.find(item => item.book.bookId === newItem.book.bookId);

            if (existingItem) {
                // Nếu tồn tại, cập nhật số lượng sản phẩm
                existingItem.quantity += newItem.quantity;
                //existingItem.subTotal = existingItem.quantity * existingItem.price; // Tính lại tổng tiền
            } else {
                // Nếu không tồn tại, thêm sản phẩm mới
                state.cart.push(newItem);
            }

            return state;
        },
        removeFromCart: (state, action) => {
            return {
                ...state,
                cart: state?.cart?.filter((item) => (item.book.bookId !== action?.payload?.bookId))
            }
        },
        updateQuantity: (state, action) => {
            return {
                ...state,
                cart: state?.cart?.map((item) => {
                    if (item?.variant?.id === action?.payload?.variant_id) {
                        return {
                            ...item,
                            quantity: action?.payload?.quantity,
                            subTotal: action?.payload?.quantity * item.price
                        }
                    }
                    return item;
                })
            };
        },
        deleteCart: (state, action) => {
            return {
                ...state,
                cart: []
            }
        },
        loadCart: (state, action) => {
            return {
                ...state,
                cart: action?.payload.result
            }
        }
    }
})


export const { addToCart, removeFromCart, updateQuantity, deleteCart, loadCart } = cartSlice?.actions;


export const countCartItems = (state) => state?.cartState?.cart?.length;
export const selectCartItems = (state) => state?.cartState?.cart ?? []
export default cartSlice.reducer;

