"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

import orangeLogo from "./images/orangeLogo.png";
import textArti from "./images/textArti.png";
import apocCatHome from "./images/apocCatHome.png";

import chatIcon from "./images/icons8-chatbot.gif";
import sendIcon from "./images/sendIcon.png";
import settingsIcon from "./images/chatIcon.png";
import downIcon from "./images/sendIcon.png";
import step1Img from "./images/step1.png";
import step2Img from "./images/step2.png";
import step3Img from "./images/step3.png";
import blackLogo from "./images/blackLogoArti.png";
import orangeLogo2 from "./images/orangeLogoArti.png";

import logo from "./images/logo.jpg";
import ReactLoading from "react-loading"; // Import the loading component
import ConfigureData from "./Component/ConfigureData";
import { FaInstagramSquare } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";


export default function Home() {
  const { status } = useSession();

  const [isChatboxOpen, setIsChatboxOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // New state for loading
  const [chatbotModel, setChatbotModel] = useState("OpenAI");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState("OpenAI");

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
    if (message.trim() === "") return;
    // Add the user's message to the chat messages
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { text: message, sender: "user" },
    ]);
    setIsLoading(true); // Set loading to true while waiting for response

    if (chatbotModel == "OpenAI" || chatbotModel == "Hugging Face") {
      try {
        // Send the user's message to the Flask API
        const response = await fetch("http://127.0.0.1:5002/chats", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: message, model: chatbotModel }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch the chatbot response.");
        }

        // Get the chatbot's response from the API
        const data = await response.json();
        const chatbotResponse = data.answer;

        // Add the chatbot's response to the chat messages
        setChatMessages((prevMessages) => [
          ...prevMessages,
          { text: chatbotResponse, sender: "chatbot" },
        ]);
      } catch (error) {
        console.error(error);
      }
    } else if (chatbotModel == "GPT4ALL") {
      try {
        // Send the user's message to the Flask API
        const response = await fetch("http://127.0.0.1:5001/ask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: message }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch the chatbot response.");
        }

        // Get the chatbot's response from the API
        const data = await response.json();
        const chatbotResponse = data.answer;

        // Add the chatbot's response to the chat messages
        setChatMessages((prevMessages) => [
          ...prevMessages,
          { text: chatbotResponse, sender: "chatbot" },
        ]);
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
    <>
      <head>
        <title>ArtiGenious: Welcome to the future of artistry with ArtiGenious NFTs</title>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body>
      <div className="bg-[#FFFAF3] h-screen">
        <div className="header flex p-12 w-full justify-between">
          <div className="flex">
            <div className="transition-transform duration-100 hover:scale-110">
              <Image src={orangeLogo} className="w-20  " />
            </div>
            <div className="w-96">
              <Image src={textArti} className="" />
            </div>
          </div>
          <div className="p-6 space-x-20 mr-20">
            <a
              href="#home"
              className="font-mont font-semibold text-black hover:text-orange-400 text-xl"
            >
              Home
            </a>
            <a
              href="#services"
              className="font-mont font-semibold text-black hover:text-orange-400 text-xl"
            >
              Services
            </a>
            <a
              href="#packages"
              className="font-mont font-semibold text-black hover:text-orange-400 text-xl"
            >
              Packages
            </a>
            {status !== "authenticated" ? (
              <Link href="/login">
                <button className="font-mont font-semibold text-[#8155FF] duration-100 transition-transform hover:scale-110 hover:text-blue-900 text-xl">
                  Login
                </button>
              </Link>
            ) : (
              <Link href="/">
                <button
                  onClick={() => signOut()}
                  className="font-mont font-semibold text-[#8155FF] duration-100 transition-transform hover:scale-110 hover:text-blue-900 text-xl"
                >
                  Logout
                </button>
              </Link>
            )}
          </div>
        </div>

        <div id="home" className="body flex">
          <div className="p-24 space-y-10 ">
            <h1 className="font-smooch font-bold md:text-6xl lg:text-6xl">
              Welcome to the future of artistry with ArtiGenious NFTs
            </h1>
            <h2 className="font-poppins font-normal md:text-xl lg:text-xl">
              Where your imagination sparks into reality through the power of
              AI. Dive into the realm of endless possibilities, crafting unique,
              blockchain-enshrined artworks with just a few clicks.
            </h2>
            <Link href="./art_generation">
              <button className="bg-[#1C1C1C] font-poppins mt-20 px-14 py-4 transition-transform duration-100 hover:scale-110 hover:text-blue-600 rounded-2xl text-2xl text-white">
                Try it Now!
              </button>
            </Link>
          </div>

          <div className="w-full flex justify-end -mt-16">
            <Image src={apocCatHome} className="w-11/12 h-11/12" />
          </div>

          <div className={`configure-data ${isSettingsOpen ? "open" : ""}`}>
            {isSettingsOpen && <ConfigureData />}
          </div>
          <div className="chatbot-container">
            <div
              className={`chat-button ${isChatboxOpen ? "open" : ""}`}
              onClick={handleChatButtonClick}
            >
              <Image src={chatIcon} alt="Chat Icon" width={40} height={40} />
            </div>
            {isChatboxOpen && (
              <div className="chatbox bg-[#FFFAF3] w-[40rem] h-[30rem] font-poppins">
                <div className="flex flex-col justify-between h-full">
                  <div className="flex flex-row p-3 border-b border-gray-600">
                    <div className="w-10 mr-3">
                      <Image
                        src={logo}
                        alt="Logo"
                        className="rounded-full w-10"
                      />
                    </div>
                    <div>
                      <h1 className="text-black font-semibold text-3xl mt-1">
                        Chatbot
                      </h1>
                    </div>
                    <div className="ml-auto flex flex-row space-x-4 mb-2">
                      <select
                        className="px-4 py-2 bg-white text-black rounded-xl mt-1"
                        value={chatbotModel}
                        onChange={handleSelectionBoxChange}
                      >
                        <option value="OpenAI">OpenAI</option>
                        <option value="Hugging Face">Hugging Face</option>
                        <option value="GPT4ALL">GPT4ALL</option>
                      </select>
                      <button onClick={handleSettingsButtonClick}>
                        <Image
                          src={isSettingsOpen ? downIcon : settingsIcon}
                          alt="Settings Icon"
                          className="bg-[#78B4D5] p-2 rounded-full transform transition hover:scale-110"
                          width={20}
                          height={20}
                        />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col-reverse mt-2 mb-4 space-y-4 flex-grow overflow-y-auto">
                    <div>
                      {isLoading && (
                        <span className="ml-2">
                          <ReactLoading
                            type="spin"
                            color="black"
                            height={12}
                            width={12}
                          />
                        </span>
                      )}
                    </div>
                    {chatMessages
                      .slice()
                      .reverse()
                      .map((message, index) => (
                        <div
                          key={index}
                          className={`${
                            message.sender === "user"
                              ? "ml-[20rem] bg-gray-300 text-black"
                              : "mr-auto bg-blue-600 text-white"
                          } rounded-lg px-4 py-2 max-w-[50%] break-words`}
                        >
                          {message.text}
                        </div>
                      ))}
                    <div className="bg-white text-black shadow-md border-2 border-gray-200 text-center rounded-lg px-4 py-2">
                      Selected Model: {selectedModel}
                    </div>
                  </div>

                  <form
                    onSubmit={handleSendMessage}
                    className="flex items-center"
                  >
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
                      <Image
                        src={sendIcon}
                        alt="Send Icon"
                        width={30}
                        height={30}
                      />
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div id="services" className="bg-[#1C1C1C] h-screen">
        <div className="flex flex-col items-center">
          <h1 className="font-smooch font-bold text-white text-6xl p-20">
            How it Works?
          </h1>
        </div>
        <div className="grid grid-cols-3 gap-10 p-20">
          <div className="flex flex-col items-center justify-center border border-white rounded-xl">
            <Image
              className="hover:scale-110 transition-transform duration-200"
              src={step1Img}
              width={300}
              height={300}
            />
            <h1 className="font-smooch font-bold text-white text-4xl p-5">
              Step 1
            </h1>
            <h2 className="font-poppins font-normal text-white text-2xl p-5 text-center">
              Start by entering a creative prompt that describes the NFT you
              want to generate. This could be anything from an abstract concept
              to a detailed description of an image.
            </h2>
          </div>
          <div className="flex flex-col items-center justify-center border border-white rounded-xl">
            <Image
              className="hover:scale-110 transition-transform duration-200"
              src={step2Img}
              width={300}
              height={300}
            />
            <h1 className="font-smooch font-bold text-white text-4xl p-5">
              Step 2
            </h1>
            <h2 className="font-poppins font-normal text-white text-2xl p-5 text-center">
              After entering your prompt, customize various layers to add
              uniqueness to your NFT. This could include adjusting colors,
              patterns, or adding specific elements.
            </h2>
          </div>
          <div className="flex flex-col items-center justify-center border border-white rounded-xl">
            <Image
              className="hover:scale-110 transition-transform duration-200"
              src={step3Img}
              width={300}
              height={300}
            />
            <h1 className="font-smooch font-bold text-white text-4xl p-5">
              Step 3
            </h1>
            <h2 className="font-poppins font-normal text-white text-2xl p-5 text-center">
              Once you're satisfied with the customization, click 'Generate' to
              create your NFT collection. Each piece will be unique and based on
              the specifications of your prompt and customizations.{" "}
            </h2>
          </div>
        </div>
      </div>

      <div id="packages" className="bg-[#E9E6E6] h-screen">
        <div className="flex flex-col items-center">
          <h1 className="font-smooch font-bold text-black text-6xl p-10">
            Creator Packages
          </h1>
        </div>
        <div className="container mx-auto grid grid-cols-2 gap-10 p-10">
          <div className="border-4 border-[#DDDCDC] flex flex-col items-center justify-center shadow-xl rounded-xl">
            <div className="flex space-x-5 self-start p-10">
              <div>
                <Image src={blackLogo} width={60} height={60} />
              </div>
              <div className="flex flex-col ">
                <h1 className="font-poppins font-bold text-xl text-[#393838]">
                  Individual
                </h1>
                <h2 className="font-poppins font-bold text-4xl text-black">
                  Starter
                </h2>
              </div>
            </div>
            <div className="w-[90%] border-t-2 border-black p-2"></div>
            <div className="font-poppins text-2xl self-start space-y-10 p-10">
              <h1 className="font-bold">Whats Included?</h1>
              <h1>NFT Prompt Craft</h1>
              <h1>Layer Customization</h1>
              <h1>Collection Generation</h1>
              <h1>Collection Generation</h1>
              <h1>AI Chatbot Assistance</h1>
            </div>
            <button className="bg-[#6179F8] w-130 font-poppins px-14 py-4 mb-10 transition-transform duration-100 hover:bg-[#334187] hover:font-bold rounded-2xl text-xl text-white">
              Get it Now!
            </button>
          </div>

          <div className="border-4 border-[#DDDCDC] flex flex-col items-center justify-center shadow-xl rounded-xl">
            <div className="flex space-x-5 self-start p-10">
              <div>
                <Image src={orangeLogo2} width={60} height={60} />
              </div>
              <div className="flex flex-col ">
                <h1 className="font-poppins font-bold text-xl text-[#393838]">
                  Team
                </h1>
                <h2 className="font-poppins font-bold text-4xl text-[#2F71D3]">
                  Enterprise
                </h2>
              </div>
            </div>
            <div className="w-[90%] border-t-2 border-black p-2"></div>
            <div className="font-poppins text-2xl self-start space-y-10 p-10">
              <h1 className="font-bold">Starter + Premium</h1>
              <h1>Priority Rendering</h1>
              <h1>Dedicated Account Manager</h1>
              <h1>Enterprise Prompt Engine</h1>
              <h1>Real-time Preview</h1>
              <h1>Expert Assistance + AI Chatbot Assistance</h1>
            </div>
            <button className="bg-[#6179F8] w-130 font-poppins px-14 py-4 mb-10 transition-transform duration-100 hover:bg-[#334187] hover:font-bold rounded-2xl text-xl text-white">
              Contact Us
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#1C1C1C] px-20 py-10 flex justify-between">
        <div className="text-white font-bold font-lg">
          <h1>© 2023 Artigenious Art, INC</h1>
          <h1>All Rights Reserved ®</h1>
        </div>

        {/* adding logos of social media */}
        <div className="flex space-x-10">
          <a href="https://instagram.com" target="_blank">
            <FaInstagramSquare className="text-white text-2xl m-2 hover:scale-125 transition-transform duration-200" />
          </a>
          <a href="https://x.com" target="_blank">
            <BsTwitterX className="text-white text-2xl m-2 hover:scale-125 transition-transform duration-200" />
          </a>
          <a href="https://facebook.com" target="_blank">
            <FaFacebookF className="text-white text-2xl m-2 hover:scale-125 transition-transform duration-200" />
          </a>
          <a href="https://youtube.com" target="_blank">
            <FaYoutube className="text-white text-2xl m-2 hover:scale-125 transition-transform duration-200" />
          </a>
        </div>
      </div>
      </body>
    </>
  );
}
