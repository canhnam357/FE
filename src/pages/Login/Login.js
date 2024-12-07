import React, { useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setLoading } from '../../store/features/common'
import { loginAPI } from '../../api/authentication';
import { saveToken } from '../../utils/jwt-helper';
const Login = () => {
  const [values,setValues] =useState({
    email:'',
    password:''
  });
  const [error,setError] =useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit= useCallback((e)=>{
    e.preventDefault();
    setError('');
    dispatch(setLoading(true));
    loginAPI(values).then(res=>{
        alert(res.result.accessToken);
        if(res?.result.accessToken){
          saveToken(res?.result.accessToken);
          navigate('/')
        }
        else{
          setError("Something went wrong!");
        }
    }).catch(err=>{
      //To-do Check response status
      setError("Invalid Credentials!");
    }).finally(()=>{
      dispatch(setLoading(false));
    });


  },[dispatch, navigate, values]);

  const handleOnChange = useCallback((e)=>{
    e.persist();
    setValues(values=>({
      ...values,
      [e.target.name]:e.target?.value,
    }))
  },[]);

  return (
    <div className='px-8 w-full lg:w-[70%]'>
      <h1>ĐĂNG NHẬP</h1>
      <div className='pt-4'>
        <form onSubmit={onSubmit}>
          <input type="email" name='email' value={values?.email} onChange={handleOnChange} placeholder='Email address' className='h-[48px] w-full border p-2 border-gray-400' required/>
          <input type="password" name='password' value={values?.password} onChange={handleOnChange} placeholder='Password' className='h-[48px] mt-8 w-full border p-2 border-gray-400' required autoComplete='new-password'/>
          <Link className='text-right w-full float-right underline pt-2 text-gray-500 hover:text-black'>Quên mật khẩu?</Link>
          <button className='border w-full rounded-lg h-[48px] mb-4 bg-black text-white mt-4 hover:opacity-80'>Đăng Nhập</button>
        </form>
      </div>
      {error && <p className='text-lg text-red-700'>{error}</p>}
      <Link to={"/v1/register"} className='underline text-gray-500 hover:text-black'>Chưa có tài khoản? Đăng ký ngay!</Link>
    </div>
  )
}

export default Login