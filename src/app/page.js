"use client";
import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'

import orangeLogo from './images/orangeLogo.png'
import textArti from './images/textArti.png'
import apocCatHome from './images/apocCatHome.png'

import chatIcon from './images/icons8-chatbot.gif'
import sendIcon from './images/sendIcon.png'
import settingsIcon from './images/chatIcon.png'
import downIcon from './images/sendIcon.png'

import logo from './images/logo.jpg'
import ReactLoading from 'react-loading'; // Import the loading component
import ConfigureData from './Component/ConfigureData'

export default function Home() {

  const [isChatboxOpen, setIsChatboxOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // New state for loading
  const [chatbotModel, setChatbotModel] = useState("OpenAI");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState('OpenAI');

  const handleChatButtonClick = () => {
    setIsChatboxOpen(!isChatboxOpen);
    if (isSettingsOpen) setIsSettingsOpen(false);
  };

  const handleSettingsButtonClick = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const handleOutsideClick = () => {
    if (isChatboxOpen) {
      setIsChatboxOpen(false);
      setIsSettingsOpen(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const message = e.target.message.value;
    if (message.trim() === '') return;
    // Add the user's message to the chat messages
    setChatMessages((prevMessages) => [...prevMessages, { text: message, sender: 'user' }]);
    setIsLoading(true); // Set loading to true while waiting for response

    if (chatbotModel == "OpenAI" || chatbotModel == "Hugging Face") {
      try {
        // Send the user's message to the Flask API
        const response = await fetch('http://127.0.0.1:5002/chats', {
          method: 'POST',
          headers: {

            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ query: message, model: chatbotModel })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch the chatbot response.');
        }

        // Get the chatbot's response from the API
        const data = await response.json();
        const chatbotResponse = data.answer;

        // Add the chatbot's response to the chat messages
        setChatMessages((prevMessages) => [...prevMessages, { text: chatbotResponse, sender: 'chatbot' }]);
      } catch (error) {
        console.error(error);
      }
    }
    else if (chatbotModel == "GPT4ALL") {
      try {
        // Send the user's message to the Flask API
        const response = await fetch('http://127.0.0.1:5001/ask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ query: message })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch the chatbot response.');
        }

        // Get the chatbot's response from the API
        const data = await response.json();
        const chatbotResponse = data.answer;

        // Add the chatbot's response to the chat messages
        setChatMessages((prevMessages) => [...prevMessages, { text: chatbotResponse, sender: 'chatbot' }]);
      } catch (error) {
        console.error(error);
      }
    }

    setIsLoading(false); // Set loading back to false after response is received
    e.target.reset(); // Clear the input field after sending the message
  };

  const handleSelectionBoxChange = (event) => {
    setChatbotModel(event.target.value);
    const selectedValue = event.target.value;
    setSelectedModel(selectedValue);

    setChatMessages([]);
  };

  return (
    <div className='bg-[#FFFAF3]'>
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
          <Link href='/login'>
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

      

      <div className={`configure-data ${isSettingsOpen ? 'open' : ''}`}>
      
      {isSettingsOpen && <ConfigureData />}
      </div>
      <div className="chatbot-container">
        <div className={`chat-button ${isChatboxOpen ? 'open' : ''}`} onClick={handleChatButtonClick}>
          <Image src={chatIcon} alt="Chat Icon" width={40} height={40} />
        </div>
        {isChatboxOpen && (
          <div className="chatbox bg-[#FFFAF3] w-[40rem] h-[30rem] font-poppins">
            <div className="flex flex-col justify-between h-full">
              <div className='flex flex-row p-3 border-b border-gray-600'>
                <div className='w-10 mr-3'>
                <Image src={logo} alt="Logo" className='rounded-full w-10' />
                </div>
                <div>
                  <h1 className="text-black font-semibold text-3xl mt-1">Chatbot</h1>
                </div>
                <div className='ml-auto flex flex-row space-x-4 mb-2'>
                  <select className="px-4 py-2 bg-white text-black rounded-xl mt-1" value={chatbotModel} onChange={handleSelectionBoxChange}>
                    <option value="OpenAI">OpenAI</option>
                    <option value="Hugging Face">Hugging Face</option>
                    <option value="GPT4ALL">GPT4ALL</option>
                  </select>
                  <button onClick={handleSettingsButtonClick}>
                    <Image src={isSettingsOpen ? downIcon : settingsIcon} alt="Settings Icon" className='bg-[#78B4D5] p-2 rounded-full transform transition hover:scale-110' width={20} height={20} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col-reverse mt-2 mb-4 space-y-4 flex-grow overflow-y-auto">
                <div>
                  {isLoading && (
                    <span className="ml-2">
                      <ReactLoading type="spin" color="black" height={12} width={12} />
                    </span>
                  )}
                </div>
                {chatMessages.slice().reverse().map((message, index) => (
                  <div
                    key={index}
                    className={`${message.sender === 'user' ? 'ml-[20rem] bg-gray-300 text-black' : 'mr-auto bg-blue-600 text-white'
                      } rounded-lg px-4 py-2 max-w-[50%] break-words`}
                  >
                    {message.text}
                  </div>
                ))}
                <div className="bg-white text-black shadow-md border-2 border-gray-200 text-center rounded-lg px-4 py-2">
                  Selected Model: {selectedModel}
                </div>
              </div>

              <form onSubmit={handleSendMessage} className="flex items-center">
                <input
                  type="text"
                  name="message"
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 bg-white text-black rounded-2xl border  focus:outline-none focus:ring focus:border-blue-500"
                  disabled={isLoading} // Disable the input if loading is true
                />
                <button
                  type="submit"
                  className="ml-2 bg-black text-white rounded-full transform transition hover:scale-110 focus:outline-none"
                  disabled={isLoading} // Disable the button if loading is true
                >
                  <Image src={sendIcon} alt="Send Icon" width={30} height={30} />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>



      </div>
    </div>
  )
}
