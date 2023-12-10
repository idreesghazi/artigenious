import Image from 'next/image'

import Link from 'next/link';

import orangeLogo from '../images/orangeLogo.png'
import textArti from '../images/textArti.png'
import apocCatHome from '../images/apocCatHome.png'
import loginImage from '../images/loginImage'

export default function Login() {
  
  return (
    <div className='bg-[#FFFFFF] flex'>
      <div>
        <h1>
            Welcome
        </h1>
        <h2>We are glad to see you back with us</h2>
        <input type='text' placeholder='Username' />
        <input type='password' placeholder='Password' />
        <h2>Don't have an account? <a href='#'>Sign up</a></h2>
        <button>Next</button>
        <h1>Login</h1>
        <h2>with Others</h2>
        <div>
          <button>Login with Google</button>
          <button>Login with Facebook</button>
        </div>
      </div>
      <div>
        <Image src={loginImage} className='' />
      </div>
    </div>
  )
}
