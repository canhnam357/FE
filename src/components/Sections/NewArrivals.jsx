import React from 'react'
import SectionHeading from './SectionsHeading/SectionHeading'
import Card from '../Card/Card';
import Carousel from 'react-multi-carousel';
import { responsive } from '../../utils/Section.constants';
import './NewArrivals.css';

const items = [{
    'title':'Chat GPT Thực Chiến',
    imagePath:require('../../assets/img/chat-gpt-thuc-chien.jpg')
},{
    'title':'Xuân Thu Sử thi Bắc Kỳ',
    imagePath:require('../../assets/img/xuan-thu-su-thi-bac-ky.jpg')
},{
    'title':'Tư Duy Ngược',
    imagePath:require('../../assets/img/tu-duy-nguoc.jpg')
},{
    'title':'Tâm Lý Học Về Tiền',
    imagePath:require('../../assets/img/tam-ly-hoc-ve-tien.jpg')
},
{
    'title':'Lý Thuyết Trò Chơi',
    imagePath:require('../../assets/img/ly-thuyet-tro-choi.jpg')
},
{
    'title':'Xứ Sở Miên Man',
    imagePath:require('../../assets/img/xu-so-mien-man.jpg')
},
{
    'title':'Búp Sen Xanh',
    imagePath:require('../../assets/img/bup-sen-xanh.jpg')
},
{
    'title':'Kinh Dịch',
    imagePath:require('../../assets/img/kinh-dich.jpg')
}];

const NewArrivals = () => {
  return (
    <>
    <SectionHeading title={'SÁCH MỚI'}/>
    <Carousel
        responsive={responsive}
        autoPlay={false}
        swipeable={true}
        draggable={false}
        showDots={false}
        infinite={false}
        partialVisible={false}
        itemClass={'react-slider-custom-item'}
        className='px-8'
      >
        {items && items?.map((item,index)=> <Card key={item?.title +index} title={item.title} imagePath={item.imagePath}/>)}

      </Carousel>
    </>
  )
}

export default NewArrivals