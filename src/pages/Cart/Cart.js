import React, { useCallback, useMemo, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart, selectCartItems } from '../../store/features/cart';
import { NumberInput } from '../../components/NumberInput/NumberInput';
import { delteItemFromCartAction, updateItemToCartAction } from '../../store/actions/cartAction';
import DeleteIcon from '../../components/common/DeleteIcon';
import Modal from 'react-modal';
import { customStyles } from '../../styles/modal';
import { isTokenValid } from '../../utils/jwt-helper';
import { Link, useNavigate, useLoaderData } from 'react-router-dom';
import EmptyCart from '../../assets/img/empty_cart.png';
import { loadCart } from "../../store/features/cart";
import { setLoading } from "../../store/features/common";
import { fetchCart, removeFromCartAPI } from '../../api/fetchCart';
const headers = [
    "Tên Sản Phẩm","Giá","Số lượng","Giao hàng","Tổng tiền","Hành động"
];
const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

const Cart = () => {
  const [cartItems,setCartItems] = useState([]);

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(setLoading(true));
    fetchCart().then(res=>{
        setCartItems(res.result);
    }).catch(err=>{
      
    }).finally(()=>{
      dispatch(setLoading(false));
    })
    
  },[]);
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [deleteItem,setDeleteItem] = useState({}); 
  const navigate = useNavigate();

  const onChangeQuantity = useCallback((value,productId,variantId)=>{

    console.log("Received ",value);

    dispatch(updateItemToCartAction({
        productId:productId,
        variant_id:variantId,
        quantity: value
    }))
    

  },[dispatch]);

  const onDeleteProduct= useCallback((bookId)=>{
    setModalIsOpen(true);
    setDeleteItem({
        bookId: bookId
    })
  },[]);

  const onCloseModal = useCallback(()=>{
    setDeleteItem({});
    setModalIsOpen(false);
  },[]);


  const onDeleteItem= useCallback(() => {
    dispatch(setLoading(true));
    removeFromCartAPI(deleteItem).then(res => {
      dispatch(removeFromCart(res));
    dispatch(setLoading(false));
    setModalIsOpen(false);  
    }).catch(err => {
      
    }).finally(() => {
      dispatch(setLoading(false));
    });
  },[deleteItem, dispatch]);

  const subTotal = useMemo(()=>{
    let value = 0;
    cartItems?.forEach(element => {
       value += element?.quantity * element?.book.price; 
    });
    return value?.toFixed(2);
  },[cartItems]);

  const isLoggedIn = useMemo(()=>{
    return isTokenValid();
  },[])
  console.log("isLoggedIn ",isLoggedIn, isTokenValid());

  return (
    <>
    <div className='p-4'>
        {cartItems?.length >0 && 
        <>
        <p className='text-xl text-black p-4'>Giỏ hàng</p>
        <table className='w-full text-lg'>
            <thead className='text-sm bg-black text-white uppercase'>
                <tr>
                    {headers?.map(header=> {
                        return (
                            <th scope='col' className='px-6 py-3'>
                                {header}
                            </th>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                {
                    cartItems?.map((item,index)=>{
                        return (
                            <tr className='p-4 bg-white border-b'>
                                <td>
                                    <div className='flex p-4'>
                                       <img src={item?.book.urlThumbnail} alt={'product-'+index} className='w-[120px] h-[120px] object-cover'/>
                                       <div className='flex flex-col text-sm px-2 text-gray-600'>
                                        <p>{item?.book.bookName || 'Name'}</p>
                                       </div>         
                                    </div>
                                </td>
                                <td>
                                    <p className='text-center text-sm text-gray-600'>{VND.format(item.book.price)}</p>
                                </td>
                                    
                                <td>
                                <NumberInput max={2} quantity={item?.quantity} onChangeQuantity={(value)=> onChangeQuantity(value, item?.productId, item?.variant?.id)}/>
                                </td>

                                <td>
                                <p className='text-center text-sm text-gray-600'>Miễn Phí</p>
                                </td>

                                <td>
                                    <p className='text-center text-sm text-gray-600'>{VND.format(item.totalPrice)}</p>
                                </td>

                                <td>
                                    <button className='flex justify-center items-center w-full' onClick={()=> onDeleteProduct(item?.book.bookId)}><DeleteIcon /></button>
                                </td>
                            </tr>
                            
                        )
                    })
                }
            </tbody>
        </table>
        <div className='flex justify-between bg-gray-200 p-8'>
            <div className='mr-20 pr-8'>
                <div className='flex gap-8 text-lg'><p className='w-[120px]'>Tổng tiền hàng</p> <p>{VND.format(subTotal)}</p></div>
                <div className='flex gap-8 text-lg mt-2'><p className='w-[120px]'>Phí giao hàng</p> <p>{VND.format(0)}</p></div>
                <div className='flex gap-8 text-lg mt-2 font-bold'><p className='w-[120px]'>Tổng thanh toán</p> <p>{VND.format(subTotal)}</p></div>
                <hr className='h-[2px] bg-slate-400 mt-2'></hr>
                {isLoggedIn && <button className='w-full items-center h-[48px] bg-black border rounded-lg mt-2 text-white hover:bg-gray-800' onClick={()=> navigate("/checkout")}>Checkout</button>}
                {!isLoggedIn && <div className='p-4'><Link to={"/v1/login"} className='w-full p-2 items-center h-[48px] bg-black border rounded-lg mt-2 text-white hover:bg-gray-800'>Login to Checkout</Link></div>}
            </div>   
        </div>
        </>}
        {
            !cartItems?.length && 
            <div className='w-full items-center text-center'>
                <div className='flex justify-center'><img src={EmptyCart} className='w-[240px] h-[240px ' alt='empty-cart'/></div>
                <p className='text-3xl font-bold'>Your cart is empty</p>
                <div className='p-4'><Link to={"/"} className='w-full p-2 items-center h-[48px] bg-black border rounded-lg mt-2 text-white hover:bg-gray-800'>Continue Shopping</Link></div>
            </div>
        }
    </div>
    <Modal
        isOpen={modalIsOpen}
        onRequestClose={onCloseModal}
        style={customStyles}
        contentLabel="Remove Item"
      >
      <p>Are you sure you want to remve this item ?</p>
      <div className='flex justify-between p-4'>
        <button className='h-[48px]' onClick={onCloseModal}>Cancel</button>
        <button className='bg-black text-white w-[80px] h-[48px] border rounded-lg' onClick={onDeleteItem}>Remove</button>
      </div>  
      </Modal>
    </>
  )
}

export default Cart