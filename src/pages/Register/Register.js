import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom';
import { setLoading } from '../../store/features/common';
import { useDispatch } from 'react-redux';
import { registerAPI } from '../../api/authentication';
import VerifyCode from './VerifyCode';

const Register = () => {
  const [values,setValues] =useState({
    email:'',
    password: '',
    confirmPassword: '',
    fullName: "",
    phone:'',
  });
  const [error,setError] =useState('');
  const dispatch = useDispatch();
  const [enableVerify,setEnableVerify] =useState(false);

  const onSubmit= useCallback((e)=>{
    e.preventDefault();
    setError('');
    dispatch(setLoading(true));
    registerAPI(values).then(res=>{
        if(res?.statusCode === 200){
          setEnableVerify(true);
        }
    }).catch(err=>{
      setError("Thông tin điền vào không hợp lệ hoặc Email đã tồn tại!")
    }).finally(()=>{
      dispatch(setLoading(false));
    })


  },[dispatch, values]);

  const handleOnChange = useCallback((e)=>{
    e.persist();
    setValues(values=>({
      ...values,
      [e.target.name]:e.target?.value,
    }))
    
  },[]);

  return (
    <div className='px-8 w-full lg:w-[70%]'>
      {!enableVerify && 
      <>
      <div className='pt-4'>
        <form onSubmit={onSubmit} autoComplete='off'>
          <label>Email</label>
          <input type="email" name='email' value={values?.email} onChange={handleOnChange} placeholder='Email address' className='h-[48px] w-full border p-2 mt-2 mb-4 border-gray-400' required autoComplete='off'/>
          <label>Họ và tên</label>
          <input type="text" name='fullName' value={values?.fullName} onChange={handleOnChange} placeholder='Full Name' className='h-[48px] w-full border p-2 mt-2 mb-4 border-gray-400' required autoComplete='off'/>
          <label>Số điện thoại</label>
          <input type="text" name='phone' value={values?.phone} onChange={handleOnChange} placeholder='Phone Number' className='h-[48px] w-full border p-2 mt-2 mb-4 border-gray-400' required autoComplete='off'/>
          <label>Mật khẩu</label>
          <input type="password" name='password' value={values?.password} onChange={handleOnChange} placeholder='Password' className='h-[48px] mt-2 w-full border p-2 border-gray-400' required autoComplete='new-password'/>
          <label>Xác nhận mật khẩu</label>
          <input type="password" name='confirmPassword' value={values?.confirmPassword} onChange={handleOnChange} placeholder='confirmPassword' className='h-[48px] mt-2 w-full border p-2 border-gray-400' required autoComplete='confirm-password'/>
          <button className='border w-full rounded-lg h-[48px] mb-4 bg-black text-white mt-4 hover:opacity-80'>Đăng Ký</button>
        </form>
      </div>
      {error && <p className='text-lg text-red-700'>{error}</p>}
      <Link to={"/v1/login"} className='underline text-gray-500 hover:text-black'>Đã có tài khoản! Đăng nhập ngay!</Link>
      </>
      }
      {enableVerify && <VerifyCode email={values?.email}/>}
    </div>
  )
}

export default Register