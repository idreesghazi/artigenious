"use client";
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

import paypalLogo from '../images/paypalLogo.png'
import visaLogo from '../images/visaLogo.png'
import mastercardLogo from '../images/mastercardLogo.png'
import easypaisaLogo from '../images/easypaisaLogo.png'
import jazzcashLogo from '../images/jazzCashLogo.png'

export default function payment() {
    
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('paypal');
    return (
        <>
        <div className='flex justify-between'>
            <h1 className='font-smooch text-6xl font-bold p-4'>Payment System</h1>
            <div className='p-6 space-x-20 mr-20'>
            <a href='#home' className='font-mont font-semibold text-black hover:text-orange-400 text-xl'>Home</a>
            <a href='#services' className='font-mont font-semibold text-black hover:text-orange-400 text-xl'>Services</a>
            <a href='#packages' className='font-mont font-semibold text-black hover:text-orange-400 text-xl'>Packages</a>
            <Link href='/login'>
            <button  className='font-mont font-semibold text-[#8155FF] duration-100 transition-transform hover:scale-110 hover:text-blue-900 text-xl'>Login</button>
            </Link>
            </div>
        </div>
        <div className="flex justify-center items-center">
            <div className="w-full mx-auto px-8 py-4 flex justify-center space-x-28">
            <div className="bg-white border border-[#000000] border-opacity-30 shadow-2xl rounded-lg p-4 flex flex-col lg:flex-row">
                <div className="lg:w-160">
                <h2 className="text-2xl font-bold mb-6 font-poppins">Payment Details</h2>
                <div className='flex items-center my-5'>
                    <div className="flex-1 border-t border-gray-400"></div>
                    <span className="px-4 text-full font-poppins font-semibold text-gray-400">Select Method</span>
                    <div className="flex-1 border-t border-gray-400"></div>
                </div>
                <div className="mb-4 space-x-5 flex justify-center">
                    {/* Payment Method Selection */}
                    
                    <button className='w-40 px-10 py-2 justify-center rounded-full border-2 border-gray-300 hover:scale-105 transition-transform duration-300'>
                        <Image src={paypalLogo} alt="Logo" className=' w-20' />
                    </button>
                    <button className='w-40 px-10 py-2 justify-center rounded-full border-2 border-gray-300 hover:scale-105 transition-transform duration-300'>
                        <Image src={visaLogo} alt="Logo" className='ml-3 w-11' />
                    </button>
                    <button className='w-40 px-6 bg-[#0F2B45] py-2 justify-center rounded-full hover:scale-105 transition-transform duration-300'>
                        <Image src={mastercardLogo} alt="Logo" className='w-40' />
                    </button>
                </div>
                <div className="mb-4 space-x-5 flex justify-center">
                    {/* Payment Method Selection */}
                    <button className='w-40 px-6 py-2 justify-center rounded-full border-2 border-gray-300 hover:scale-105 transition-transform duration-300'>
                        <Image src={easypaisaLogo} alt="Logo" className='w-40' />
                    </button>
                    <button className='w-40 bg-[#222222] px-6 py-2 justify-center rounded-full hover:scale-105 transition-transform duration-300'>
                        <Image src={jazzcashLogo} alt="Logo" className='ml-3 w-40' />
                    </button>
                </div>
                <div className='flex items-center my-5'>
                    <div className="flex-1 border-t border-gray-400"></div>
                    <span className="px-4 text-full font-poppins font-semibold text-gray-400">Add Details</span>
                    <div className="flex-1 border-t border-gray-400"></div>
                </div>
                <div className="mb-4">
                    {/* Add Details Form */}
                    <form>
                    <div className="space-x-6 mb-4">
                        <input type="text" name='cardHolderName' placeholder="Card Holder Name" class="text-sm p-3 bg-[#F2F2F2] border-0 rounded-2xl w-72 focus:border-black font-poppins" />
                        <input type="number" name='mm' placeholder="MM" class="text-sm p-3 bg-[#F2F2F2] border-0 rounded-2xl w-14 focus:border-black font-poppins" />
                        <input type="number" name='yy' placeholder="YY" class="text-sm  p-3 bg-[#F2F2F2] border-0 rounded-2xl w-14 focus:border-black font-poppins" />
                        <input type="number" name='securityCode' placeholder="Security Code" class="text-sm p-3 bg-[#F2F2F2] border-0 rounded-2xl w-32 focus:border-black font-poppins" />
                        
                    </div>
                    <div className="grid grid-cols-2 gap-5 mb-4">
                        <input type="text" name='billingAddress1' placeholder="Billing Address" class="text-sm p-3 bg-[#F2F2F2] border-0 rounded-2xl w-72 focus:border-black font-poppins" />
                        <input type="text" name='city' placeholder="City" class="text-sm p-3 bg-[#F2F2F2] border-0 rounded-2xl w-72 focus:border-black font-poppins" />
                    
                        <input type="text" name='billingAddress2' placeholder="Billing Address" class="text-sm p-3 bg-[#F2F2F2] border-0 rounded-2xl w-72 focus:border-black font-poppins" />
                        <input type="number" name='zipCode' placeholder="Zip or Postal Code" class="text-sm p-3 bg-[#F2F2F2] border-0 rounded-2xl w-72 focus:border-black font-poppins" />

                        <input type='text' name='country' placeholder="Country" class="text-sm p-3 bg-[#F2F2F2] border-0 rounded-2xl w-72 focus:border-black font-poppins" />
                        <input type="number" name='phoneNumber' placeholder="Phone Number" class="text-sm p-3 bg-[#F2F2F2] border-0 rounded-2xl w-72 focus:border-black font-poppins" />
                    
                    </div>
                    {/* ... more input fields */}
                    <div className='flex space-x-2 p-2'>
                    <input type='radio' placeholder='Save my payment information so checkout is easy next time' className='' />
                    <h1 className='font-semibold text-sm font-poppins'>Save my payment information so checkout is easy next time</h1>
                    </div>
                    </form>
                </div>
                </div>
            </div>
            <div className="lg:w-1/3 p-4 gradient-background rounded-lg lg:ml-4 font-poppins my-auto py-28 px-8">

                <h3 className="text-2xl font-semibold mb-2 text-black">Artigenious Premium</h3>
                <p className="text-gray-600 mb-1">$96/year</p>
                <div className="text-gray-600 my-4 w-full">
                    <div className="flex justify-between">
                    <span className='text-black font-semibold'>Subtotal</span>
                    <span className='text-black font-semibold'>$192.00</span>
                    </div>
                    <div className="flex justify-between">
                    <span className='text-black'>Yearly plan discount</span>
                    <span className="text-red-600">-$96.00</span>
                    </div>
                    <div className="flex justify-between">
                    <span className='text-black'>Additional 37.5% off</span>
                    <span className="text-red-600">-$36.00</span>
                    </div>
                    <div className="border-t border-gray-400 my-4"></div>
                    <div className="flex justify-between">
                    <span className="font-bold">Billed Now</span>
                    <span className="font-bold">$60.00</span>
                    </div>
                </div>
                <button className="bg-black text-white py-4 font-semibold px-6 rounded-2xl mt-4 w-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 transition-all">
                    Subscribe
                </button>    
                
            </div>
            </div>
        </div>
        </>
    );
}
