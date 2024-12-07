import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setLoading } from '../../store/features/common';
import { verifyAPI } from '../../api/authentication';

const VerifyCode = ({ email }) => {

  const [values, setValues] = useState({
    email: email,
    otp: ''
  });

  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    setError('');
    dispatch(setLoading(true));
    verifyAPI(values).then(res => {
      setMessage('Email của bạn đã xác nhận thành công! Bây giờ bạn có thể đăng nhập vào hệ thống. Chúc bạn mua hàng vui vẻ!')
    }).catch(err => {
      setError('Mã OTP của bạn không chính xác hoặc đã hết hạn! Vui lòng đăng ký lại.');
    }).finally(() => {
      dispatch(setLoading(false));
    })

  }, [dispatch, values]);

  const handleOnChange = useCallback((e) => {
    e.persist();
    setValues(values => ({
      ...values,
      [e.target.name]: e.target?.value,
    }))
  }, []);


  return (
    <div className='p-4'>
      {!message &&
        <>
          <p className='text-lg text-blue-900'>Đăng ký thành công! Vui lòng kiểm tra Email để nhận được mã OTP xác nhận.</p>
          <p className='text-lg text-gray-600 pt-4 font-bold'>Vui lòng nhập vào mã OTP gồm 6 chữ số được gửi vào Email của bạn.</p>

          <form onSubmit={onSubmit} className='flex flex-col gap-4'>
            <input type='text' name='otp' value={values?.otp} maxLength={6} onChange={handleOnChange} placeholder='6 digit otp' className='h-[48px] border rounded border-gray-600 p-2 mt-4' required />
            <button type='submit' className='border w-[120px] rounded-lg h-[48px] bg-black text-white mb-4'>Xác nhận</button>
          </form>
          {error && <p className='text-xl text-red-600'>{error}</p>}
        </>
      }
      {message && <p className='text-lg'>{message}</p>}
    </div>
  )
}

export default VerifyCode