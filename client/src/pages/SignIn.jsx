import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';
import Swal from 'sweetalert2';
import { FaEyeSlash, FaRegEye } from 'react-icons/fa';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [isShow,setIsshow] = useState('');
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      // Show the success alert after successful login
      Swal.fire({
        title: 'Login Successful!',
        text: 'You have been successfully logged in!',
        icon: 'success',
      }).then(() => {
        // Navigate only after the alert is closed
        navigate('/');
      });
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };



  
  // toggle password...
  const toggleState = () =>{
    setIsshow(!isShow)
}



  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />
     
     <div className='relative'>
          <input
            type={isShow ? 'text' : 'password'}
            placeholder='Password'
            className='border p-3 rounded-lg w-full pr-10 text-sm sm:text-base'
            id='password'
            onChange={handleChange}
          />
          <div
            onClick={toggleState}
            className='absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500'
          >
            {isShow ? <FaEyeSlash size={20} /> : <FaRegEye size={20} />}
          </div>
        </div>

        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}
