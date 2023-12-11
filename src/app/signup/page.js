import Image from 'next/image'

import Link from 'next/link';

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
  
  return (
    <div className='bg-[#FFFFFF] w-full flex justify-center items-center px-20 py-10 space-x-40'>
      <div className='text-center'>
        <div className='absolute left-0 bottom-24'>
          <Image src={design} className='w-16' />
        </div>
        <h1 className='font-smooch font-bold text-9xl'>
            Create Account
        </h1>
        <h2 className='font-poppins text-xl'>We are glad to have you!</h2>
        <div class="flex flex-col space-y-5">
          <div class="relative flex space-x-20">
            <input type="text" placeholder="First Name" class="pl-6 pr-4 py-5 bg-[#F2F2F2] border-0 rounded-2xl w-80 focus:border-black font-poppins" />
            <input type="text" placeholder="Last Name" class="pl-6 pr-4 py-5 bg-[#F2F2F2] border-0 rounded-2xl w-80 focus:border-black font-poppins" />
          </div>
          <div class="relative flex space-x-20">
            <input type="email" placeholder="Your Email" class="pl-6 pr-4 py-5 bg-[#F2F2F2] border-0 rounded-2xl w-80 focus:border-black font-poppins" />
            <input type="date" placeholder="Date of Birth dd/mm/yy" class="pl-6 pr-4 py-5 bg-[#F2F2F2] border-0 rounded-2xl w-80 focus:border-black font-poppins" />
          </div>
          <div class="relative flex space-x-20">
            <input type="password" placeholder="Password" class="pl-6 pr-4 py-5 bg-[#F2F2F2] border-0 rounded-2xl w-80 focus:border-black font-poppins" />
            <input type="password" placeholder="Confirm Password" class="pl-6 pr-4 py-5 bg-[#F2F2F2] border-0 rounded-2xl w-80 focus:border-black font-poppins" />
          </div>
        </div>  

        <h2 className='font-poppins font-semibold my-5'>Already have an account? <Link href='./login' className='text-blue-600 transform transition-transform duration-200 hover:underline hover:font-bold '>Sign in</Link></h2>
        <button className='p-5 w-120 bg-[#1C1C1C] text-white font-poppins rounded-2xl hover:scale-105 shadow-sm hover:shadow-md transition duration-300 ease-in-out text-lg font-semibold'>Register</button>
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
