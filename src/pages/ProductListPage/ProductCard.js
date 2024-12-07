import React from 'react'
import SvgFavourite from '../../components/common/SvgFavourite'
import { Link } from 'react-router-dom'
import './ProductCard.css'
const VND = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});
const ProductCard = ({bookId, bookName, inStock, price, description, numberOfPage, publishedDate, weight, author, publisher, contributor, bookType, images, urlThumbnail}) => {
  return (
    <div className='flex flex-col hover:scale-105 relative'>
      <Link to={`/books/${bookId}`}>
        <img className={`h-[320px] w-[280px]
         border rounded-lg cursor-pointer object-cover block`} src={urlThumbnail} alt={bookName}/>
         </Link>
         
         <div className='flex justify-between items-center'>
          <div className='flex flex-col pt-2'>
          <p className='text-[16px] p-1'>{bookName}</p>
          {/* {description && <p className='text-[12px] px-1 text-gray-600'>{brand}</p>} */}
          </div>
          <div>
            <p>{VND.format(price)}</p>
          </div>
        </div>
        <button onClick={()=> console.log("Click button")} className='absolute top-0 right-0 pt-4 pr-4 cursor-pointer'><SvgFavourite /></button>
    </div>
  )
}

export default ProductCard