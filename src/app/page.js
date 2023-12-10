import Image from 'next/image'

import Link from 'next/link'

import orangeLogo from './images/orangeLogo.png'
import textArti from './images/textArti.png'
import apocCatHome from './images/apocCatHome.png'

export default function Home() {


  return (
    <div className='bg-[#FFFFFF]'>
      <div className='header flex p-12 w-full justify-between'>
        <div className='flex'>
          <div className='transition-transform duration-100 hover:scale-110'>
            <Image src={orangeLogo} className='w-20  '/>
          </div>
          <div className='w-96'>
            <Image src={textArti} className='' />
          </div>
        </div>
        <div className='p-6 space-x-20 mr-20'>
          <a href='#home' className='font-mont font-semibold text-black hover:text-orange-400 text-xl'>Home</a>
          <a href='#services' className='font-mont font-semibold text-black hover:text-orange-400 text-xl'>Services</a>
          <a href='#packages' className='font-mont font-semibold text-black hover:text-orange-400 text-xl'>Packages</a>
          <Link href='/screens/login'>
          <button  className='font-mont font-semibold text-[#8155FF] duration-100 transition-transform hover:scale-110 hover:text-blue-900 text-xl'>Login</button>
          </Link>
        </div>

      </div>

      <div id='home' className='body flex'>
        <div className='p-24 space-y-10 '>
          <h1 className='font-smooch font-bold md:text-6xl lg:text-6xl'>
            Welcome to the future of artistry with ArtiGenious NFTs
          </h1>
          <h2 className='font-poppins font-normal md:text-xl lg:text-xl'>
            Where your imagination sparks into reality through the power of AI. Dive into the realm of endless possibilities, crafting unique, blockchain-enshrined artworks with just a few clicks. 
          </h2>
          <button className='bg-[#1C1C1C] font-poppins px-14 py-4 transition-transform duration-100 hover:scale-110 hover:text-blue-600 rounded-2xl text-2xl text-white'>
            Try it Now!
          </button>
        </div>

        <div className='w-full flex justify-end -mt-16'>
          <Image src={apocCatHome} className='w-11/12 h-11/12' />
        </div>
      </div>
    </div>
  )
}
