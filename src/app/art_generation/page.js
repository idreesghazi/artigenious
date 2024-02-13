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
import artboard1 from '../images/artboard1.png'
import artboard2 from '../images/artboard2.png'
import artboard3 from '../images/artboard3.png'
import artboard4 from '../images/artboard4.png'
import coinPng from '../images/coinPng.png'
import { checkout } from '@/checkout';

export default function art_generation() {
    const router = useRouter();
    const [showImages, setShowImages] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [generatedImage, setGeneratedImage] = useState('');

    const imageCards = [
        { src: artboard1, alt: 'Generated NFT 1' },
        { src: artboard2, alt: 'Generated NFT 2' },
        { src: artboard3, alt: 'Generated NFT 2' },
        { src: artboard4, alt: 'Generated NFT 2' },
        // Add more image objects as needed
    ];



    const handleGenerateClick = async () => {
        if (!prompt) {
            toast.error("Please enter a prompt.");
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:5000/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate image');
            }

            const data = await response.json();

            if (data.success) {
                // Convert encoded image data to blob and create a URL for it
                const blob = new Blob([Buffer.from(data.image, 'latin1')], { type: 'image/png' });
                const url = URL.createObjectURL(blob);
                setGeneratedImage(url); // Update state with URL to display the image
                setShowImages(true);
            } else {
                toast.error("Error: " + data.error);
            }
        } catch (error) {
            toast.error("Request failed: " + error.message);
        }
    };



    return (
        <div className="mx-auto px-5 py-5 bg-[#FFFAF3] font-poppins">
            <div className="flex space-x-10">
                {/* Left section */}
                <div className="w-96">
                    <div className=' mx-4 flex px-2 gap-2 items-center'>
                        <Image src={orangeLogo} alt="Orange Logo" width={50} height={50} />
                        <span className="text-xl font-semibold">ArtiGenious</span>
                    </div>
                    {/* Balance and Upgrade */}
                    <div className="flex items-center space-x-2 bg-white px-5 py-2 rounded-xl mx-10 my-8 shadow-md">
                        <span className="text-xl font-bold">260</span>
                        <Image src={coinPng} alt="Coin" width={20} height={20} />

                        <button onClick={(() => {
                            checkout(
                                {
                                    lineItems: [{ price: "price_1OjKxkClJNcB9xu1Tsh1wi6b", quantity: 1 }]
                                }
                            )
                        })} className="bg-[#FF8C32] text-white py-1 px-3 rounded-xl ml-5 hover:scale-105 transition-transform duration-300">
                            Upgrade
                        </button>

                    </div>
                    {/* Image Dimension */}
                    <div className='border-t-2 border-[#D15C00] py-8 border-opacity-30'>
                        <h3 className="text-lg font-semibold mb-2 ml-2">Image Dimension</h3>
                        {/* Buttons for dimensions */}
                        <div className='space-x-3 '>
                            <button className='bg-white border w-36 border-[#000000] border-opacity-10 font-semibold py-2 rounded-xl hover:bg-[#FF8C32] hover:text-white hover:shadow-md hover:border-0 transition-transform duration-300'>
                                512 x 512
                            </button>
                            <button className='bg-white border w-36 border-[#000000] border-opacity-10 font-semibold py-2 rounded-xl hover:bg-[#FF8C32] hover:text-white hover:shadow-md hover:border-0 transition-transform duration-300'>
                                1024x1024
                            </button>
                        </div>

                        <div className='space-x-3 mt-3'>
                            <button className='bg-white border w-36 border-[#000000] border-opacity-10 font-semibold py-2 rounded-xl hover:bg-[#FF8C32] hover:text-white hover:shadow-md hover:border-0 transition-transform duration-300'>
                                768x1368
                            </button>
                            <button className='bg-white border w-36 border-[#000000] border-opacity-10 font-semibold py-2 rounded-xl hover:bg-[#FF8C32] hover:text-white hover:shadow-md hover:border-0 transition-transform duration-300'>
                                1024x768
                            </button>
                        </div>
                    </div>
                    {/* Number of Images */}
                    <div className='border-t-2 border-[#D15C00] py-8 border-opacity-30'>
                        <h3 className="text-lg font-semibold mb-2 ml-2">Number of Images</h3>
                        <div className='space-x-3 '>
                            <button className='bg-white border w-16 border-[#000000] border-opacity-10 font-semibold py-2 rounded-xl hover:bg-[#FF8C32] hover:text-white hover:shadow-md hover:border-0 transition-transform duration-300'>
                                1
                            </button>
                            <button className='bg-white border w-16 border-[#000000] border-opacity-10 font-semibold py-2 rounded-xl hover:bg-[#FF8C32] hover:text-white hover:shadow-md hover:border-0 transition-transform duration-300'>
                                2
                            </button>
                            <button className='bg-white border w-16 border-[#000000] border-opacity-10 font-semibold py-2 rounded-xl hover:bg-[#FF8C32] hover:text-white hover:shadow-md hover:border-0 transition-transform duration-300'>
                                3
                            </button>
                            <button className='bg-white border w-16 border-[#000000] border-opacity-10 font-semibold py-2 rounded-xl hover:bg-[#FF8C32] hover:text-white hover:shadow-md hover:border-0 transition-transform duration-300'>
                                4
                            </button>
                        </div>

                        <div className='space-x-3 mt-3'>
                            <button className='bg-white border w-16 border-[#000000] border-opacity-10 font-semibold py-2 rounded-xl hover:bg-[#FF8C32] hover:text-white hover:shadow-md hover:border-0 transition-transform duration-300'>
                                5
                            </button>
                            <button className='bg-white border w-16 border-[#000000] border-opacity-10 font-semibold py-2 rounded-xl hover:bg-[#FF8C32] hover:text-white hover:shadow-md hover:border-0 transition-transform duration-300'>
                                6
                            </button>
                            <button className='bg-white border w-16 border-[#000000] border-opacity-10 font-semibold py-2 rounded-xl hover:bg-[#FF8C32] hover:text-white hover:shadow-md hover:border-0 transition-transform duration-300'>
                                7
                            </button>
                            <button className='bg-white border w-16 border-[#000000] border-opacity-10 font-semibold py-2 rounded-xl hover:bg-[#FF8C32] hover:text-white hover:shadow-md hover:border-0 transition-transform duration-300'>
                                8
                            </button>
                        </div>
                        {/* Buttons for number of images */}
                    </div>
                    {/* Art Style */}
                    <div className='border-t-2 border-[#D15C00] py-8 border-opacity-30'>
                        <h3 className="text-lg font-semibold mb-2 ml-2">Art Style</h3>
                        {/* Buttons for art styles */}
                        <div className='space-x-3 '>
                            <button className='bg-white border w-36 border-[#000000] border-opacity-10 font-semibold py-2 rounded-xl hover:bg-[#FF8C32] hover:text-white hover:shadow-md hover:border-0 transition-transform duration-300'>
                                Anime
                            </button>
                            <button className='bg-white border w-36 border-[#000000] border-opacity-10 font-semibold py-2 rounded-xl hover:bg-[#FF8C32] hover:text-white hover:shadow-md hover:border-0 transition-transform duration-300'>
                                Realistic
                            </button>
                        </div>

                        <div className='space-x-3 mt-3'>
                            <button className='bg-white border w-36 border-[#000000] border-opacity-10 font-semibold py-2 rounded-xl hover:bg-[#FF8C32] hover:text-white hover:shadow-md hover:border-0 transition-transform duration-300'>
                                Chibby
                            </button>
                            <button className='bg-white border w-36 border-[#000000] border-opacity-10 font-semibold py-2 rounded-xl hover:bg-[#FF8C32] hover:text-white hover:shadow-md hover:border-0 transition-transform duration-300'>
                                Doodle
                            </button>
                        </div>
                        <div className='space-x-3 mt-3'>
                            <button className='bg-white border w-36 border-[#000000] border-opacity-10 font-semibold py-2 rounded-xl hover:bg-[#FF8C32] hover:text-white hover:shadow-md hover:border-0 transition-transform duration-300'>
                                Sketch
                            </button>
                            <button className='bg-white border w-36 border-[#000000] border-opacity-10 font-semibold py-2 rounded-xl hover:bg-[#FF8C32] hover:text-white hover:shadow-md hover:border-0 transition-transform duration-300'>
                                3d Art
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right section */}
                <div className="space-y-4 w-full">
                    {/* Generate NFTs Header */}
                    <h2 className="text-3xl font-semibold text-[#131313]">Generate NFTs</h2>
                    {/* Text input for NFT description */}
                    <div className='flex space-x-10'>
                        <input
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            type="text" placeholder="Describe the art you want to envision" className="w-full px-4 py-3 rounded-xl border border-gray-200"
                        />
                        <button onClick={handleGenerateClick} className='flex bg-[#131313] text-white items-center px-4 py-3 rounded-xl justify-between space-x-3 font-semibold'>
                            <div>
                                Generate
                            </div>
                            <div className='flex p-2 space-x-2 items-center'>
                                <h1>20</h1>
                                <div className='w-4 h-4'>
                                    <Image src={coinPng} alt="Design" width={20} height={20} />
                                </div>
                            </div>
                        </button>
                    </div>
                    {/* Generation History */}
                    {generatedImage != '' && ( // Conditional rendering based on showImages state

                        <div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Generated Image</h3>
                                <div className="w-80 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
                                    <Image src={generatedImage} alt="Generated Art" className='rounded-lg ' width={100} height={100} layout="responsive" />
                                </div>
                            </div>
                            {/* <h3 className="text-lg font-semibold mb-2">Generation History</h3>
                            <div className="grid grid-cols-3 gap-4">
                            {imageCards.map((card, index) => (
                                <div key={index} className="rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
                                <Image src={card.src} alt={card.alt} className='rounded-lg ' width={300} height={300} layout="responsive" />
                                </div>
                            ))}
                            </div> */}
                        </div>
                    )}
                    {/* Prompt Generation */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Prompt Generation</h3>
                        {/* Card layout for prompts */}
                    </div>
                </div>
            </div>
        </div>
    )
}
