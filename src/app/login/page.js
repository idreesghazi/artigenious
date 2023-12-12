"use client";
import Cookie from 'js-cookie';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import orangeLogo from '../images/orangeLogo.png'
import textArti from '../images/textArti.png'
import apocCatHome from '../images/apocCatHome.png'
import loginImage from '../images/loginImage.png'
import userIcon from '../images/Frame.png'
import passwordIcon from '../images/Vector.png'
import googleIcon from '../images/google.png'
import facebookIcon from '../images/facebook.png'
import design from '../images/design.png'
export default function Login() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Call your API endpoint for login
    const res = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    
    if (data.success) {
      Cookie.set('userEmail', email, { expires: 1 });
      toast.success('Login successful! Redirecting...');
      setTimeout(() => {
        router.push('/'); // Replace '/' with your home page route
      }, 5000); // Delay for toast to be read
    } else {
      toast.error(data.message || 'Login failed');
    }
  };

  return (
    <div className='bg-[#FFFFFF] w-full flex justify-center items-center px-20 py-10 space-x-40'>
      <ToastContainer />
      <div className='text-center'>
        <div className='absolute left-0 bottom-24'>
          <Image src={design} className='w-16' />
        </div>
        <h1 className='font-smooch font-bold text-9xl text-[#1C1C1C]'>
            Welcome 
        </h1>
        <h2 className='font-poppins text-xl text-[#1C1C1C]'>We are glad to see you back with us</h2>
        <div class="flex flex-col space-y-5 pt-8">
          <div class="relative">
            <Image src={userIcon} class="absolute left-0 top-1/2 transform -translate-y-1/2 ml-3" alt="Username Icon" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Email" class="pl-12 pr-4 py-5 bg-[#F2F2F2] border-0 rounded-2xl w-120 focus:border-black font-poppins" />
          </div>
          <div class="relative">
            <Image src={passwordIcon} class="absolute left-0 top-1/2 transform -translate-y-1/2 ml-3" alt="Password Icon" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" class="pl-12 pr-4 py-5 bg-[#F2F2F2] border-0 rounded-2xl w-120 focus:border-black font-poppins" />
          </div>
        </div>  

        <h2 className='font-poppins font-semibold my-5'>Don't have an account? <Link href='./signup' className='text-blue-600 transform transition-transform duration-200 hover:underline hover:font-bold '>Sign up</Link></h2>
        <button onClick={handleLogin} className='p-5 w-120 bg-[#1C1C1C] text-white font-poppins rounded-2xl hover:scale-105 shadow-sm hover:shadow-md transition duration-300 ease-in-out text-lg font-semibold'>Next</button>
        <div className="flex items-center space-x-2 my-5">
          <div className="flex-1 border-t border-gray-400"></div>
          <span className="px-4 text-xl font-poppins"><span className="font-bold">Login</span> with Others</span>
          <div className="flex-1 border-t border-gray-400"></div>
        </div>
        <div className='flex flex-col items-center space-y-4 font-poppins'>
          <button className='group w-120 flex items-center justify-center space-x-2 p-5 border-2 border-black rounded-2xl shadow-sm hover:shadow-md transition duration-300 ease-in-out'>
            <Image src={googleIcon} className='w-5 h-5 mx-1' />
            <span className='transition-transform duration-300 group-hover:scale-110'>Login with Google</span>
          </button>
          <button className='group w-120 flex items-center justify-center space-x-2 p-5 border-2 border-black rounded-2xl shadow-sm hover:shadow-md transition duration-300 ease-in-out'>
          <Image src={facebookIcon} className='w-5 h-5 mx-1' />
            <span className='transition-transform duration-300 group-hover:scale-110'>Login with Facebook</span>
          </button>
        </div>
      </div>
      <div className=''>
        <Image src={loginImage} className='w-130' />
      </div>
    </div>
  )
}
