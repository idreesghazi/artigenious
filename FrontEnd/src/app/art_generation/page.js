"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactLoading from "react-loading";

import orangeLogo from "../images/orangeLogo.png";
import orangeLogoArti from "../images/orangeLogoArti.png";
import textArti from "../images/textArti.png";
import apocCatHome from "../images/apocCatHome.png";
import loginImage from "../images/loginImage.png";
import userIcon from "../images/Frame.png";
import passwordIcon from "../images/Vector.png";
import googleIcon from "../images/google.png";
import facebookIcon from "../images/facebook.png";
import design from "../images/design.png";
import artboard1 from "../images/artboard1.png";
import artboard2 from "../images/artboard2.png";
import artboard3 from "../images/artboard3.png";
import artboard4 from "../images/artboard4.png";
import coinPng from "../images/coinPng.png";
import GingerBody from "../images/GingerBody.png";
import expandBtn from "../images/expandBtn.png";
import condenseBtn from "../images/condenseBtn.png";

import { checkout } from "@/checkout";

import { storage } from "../lib/firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { set } from "mongoose";

export default function art_generation() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const [activeButtonDim, setActiveButtonDim] = useState("512x512");
  const [activeButtonNum, setActiveButtonNum] = useState(1);
  const [activeButtonStyle, setActiveButtonStyle] = useState("Anime");

  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");
  const [images, setImages] = useState([]);
  const [fileUrls, setFileUrls] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [traitsType, setTraitsType] = useState("");
  const [traits, setTraits] = useState({
    background:
      "https://firebasestorage.googleapis.com/v0/b/artigenious-f34eb.appspot.com/o/Background%2FAutumn%2350.png?alt=media&token=d4b62e3c-d957-4d2e-8641-0e97cd747f0c",
    body: GingerBody,
    face: "https://firebasestorage.googleapis.com/v0/b/artigenious-f34eb.appspot.com/o/Face%2FBTC%20Eyes%2330.png?alt=media&token=265eeff4-db0e-4340-9109-92ca0cc9f19f",
    dress:
      "https://firebasestorage.googleapis.com/v0/b/artigenious-f34eb.appspot.com/o/Dress%2FBaggy%23100.png?alt=media&token=02b40925-fd0d-4dc1-b769-e28dee077cbe",
    head: "https://firebasestorage.googleapis.com/v0/b/artigenious-f34eb.appspot.com/o/Head%2FCrown%2310.png?alt=media&token=73204d69-a6e9-4598-97df-9a409d0b84d2",
    hand: "https://firebasestorage.googleapis.com/v0/b/artigenious-f34eb.appspot.com/o/Hand%2FBaseball%20Bat%23100.png?alt=media&token=551c5bd3-2f50-4108-9a71-3866eb1ab311",
    mouth:
      "https://firebasestorage.googleapis.com/v0/b/artigenious-f34eb.appspot.com/o/Mouth%2FJoint%23100.png?alt=media&token=ea0718e2-f3be-466e-8410-818ba9d99ed8",
  });

  const [segmentedImage, setSegmentedImage] = useState(null);

  const handleSegmentClick = async () => {
    if (!generatedImage) {
      toast.error("Please generate an image first.");
      return;
    }
    console.log(generatedImage);
    // setLoading(true);
    try {
      const segmentResponse = await fetch("http://127.0.0.1:5003/segment2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl: generatedImage }), // Send the generated image URL
      });

      if (!segmentResponse.ok) {
        throw new Error("Failed to segment image");
      }

      // Convert the response to image data
      const imageData = await segmentResponse.blob();
      console.log(imageData);
      const url = URL.createObjectURL(imageData);
      setSegmentedImage(url); // Set the segmented image URL to state
    } catch (error) {
      toast.error("Request failed: " + error.message);
    } finally {
      // setLoading(false);
    }
  };

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };
  const handleActiveButtonClickDim = (dimension) => {
    setActiveButtonDim(dimension);
  };
  const handleActiveButtonClickNum = (number) => {
    setActiveButtonNum(number);
  };
  const setActiveButtonClickedStyle = (style) => {
    setActiveButtonStyle(style);
  };
  // Function to update traits state
  const updateTrait = (traitType, url) => {
    setTraits((prevTraits) => ({
      ...prevTraits,
      [traitType]: url,
    }));
  };

  const listFiles = async (directory) => {
    setTraitsType(directory.toLowerCase());
    const listRef = ref(storage, directory);

    try {
      const res = await listAll(listRef);
      const urls = await Promise.all(
        res.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          console.log(url);
          return url;
        })
      );
      setFileUrls(urls);
    } catch (error) {
      // Uh-oh, an error occurred!
      console.error("Error listing files:", error);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = async () => {
    setIsOpen(!isOpen);

    if (!isOpen) {
      const chatbotModel = "OpenAI";
      if (chatbotModel == "OpenAI" || chatbotModel == "Hugging Face") {
        try {
          // Send the user's message to the Flask API
          const response = await fetch("http://127.0.0.1:5002/generateScript", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query: prompt, model: chatbotModel }),
          });

          if (!response.ok) {
            throw new Error("Failed to fetch the chatbot response.");
          }

          // Get the chatbot's response from the API
          const data = await response.json();
          const generateResponse = data.answer;
          console.log(generateResponse);
          // Add the chatbot's response to the chat messages
        } catch (error) {
          console.error(error);
        }
      }
      handleSegmentClick();
    }
  };

  const imageCards = [
    { src: artboard1, alt: "Generated NFT 1" },
    { src: artboard2, alt: "Generated NFT 2" },
    { src: artboard3, alt: "Generated NFT 2" },
    { src: artboard4, alt: "Generated NFT 2" },
    // Add more image objects as needed
  ];

  const handleGenerateClick = async () => {
    if (!prompt) {
      toast.error("Please enter a prompt.");
      return;
    }

    const traitsStartIndex = prompt.indexOf("with atleast");
    if (traitsStartIndex === -1) {
      toast.error("Please provide traits in the prompt.");
      return;
    }
    const traitsString = prompt.substring(0, traitsStartIndex).trim();
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: traitsString }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate image");
      }

      const data = await response.json();

      if (data.success) {
        // Convert encoded image data to blob and create a URL for it
        const blob = new Blob([Buffer.from(data.image, "latin1")], {
          type: "image/png",
        });
        const url = URL.createObjectURL(blob);
        setGeneratedImage(url); // Update state with URL to display the image
        setShowImages(true);
      } else {
        toast.error("Error: " + data.error);
      }
    } catch (error) {
      toast.error("Request failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderButtons = () => {
    const buttons = [];
    const buttonCount = 10; // Change this number according to your needs

    for (let i = 1; i <= buttonCount; i++) {
      buttons.push(
        <button
          key={i}
          onClick={toggleModal}
          className="w-auto text-left bg-white text-gray-500 border border-gray-300 items-center px-4 py-3 rounded-xl justify-between  hover:bg-[#FF8C32] hover:text-white hover:shadow-md hover:border-0 transition-transform duration-300"
        >
          <div>{`${i}%`}</div>
          <div>{`Blocky Green`}</div>
        </button>
      );
    }

    return buttons;
  };

  const layerCustomization = (url) => {
    return (
      <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center">
        <div
          className="absolute top-0 left-0 w-full h-full bg-orange-100/10 backdrop-blur-sm"
          onClick={toggleModal}
        ></div>
        <div className="relative z-50 bg-white p-8 rounded-lg shadow-lg border  ">
          {/* Close button */}
          <div>
            <h1 className="text-4xl font-semibold mb-2">Explore Blueprints</h1>
            <button
              className="absolute top-3 right-3 mt-2 mr-2 text-gray-600"
              onClick={toggleModal}
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div className="flex gap-6 justify-center items-center p-5">
            <div>
              <h1 className="text-xl font-semibold mb-2">Types</h1>
              <div className="">
                <div className="custom-scrollbar py-4 flex space-x-3 max-w-4xl overflow-x-auto mb-10">
                  {renderButtons()}
                </div>
                <div className="flex space-y-2 justify-between">
                  <div className="w-96 flex flex-col space-y-4">
                    <h1 className="text-xl font-semibold mb-2">Layers</h1>
                    <button
                      onClick={() => listFiles("Dress")}
                      className="text-left text-gray-500 border border-gray-400 items-center px-4 py-3 rounded-xl justify-between  hover:bg-[#FF8C32] hover:text-white hover:shadow-md hover:border-[#FF8C32] transition-transform duration-300"
                    >
                      Dress
                    </button>
                    <button
                      onClick={() => listFiles("Face")}
                      className="text-left text-gray-500 border border-gray-400 items-center px-4 py-3 rounded-xl justify-between  hover:bg-[#FF8C32] hover:text-white hover:shadow-md hover:border-[#FF8C32] transition-transform duration-300"
                    >
                      Face
                    </button>
                    <button
                      onClick={() => listFiles("Hand")}
                      className="text-left text-gray-500 border border-gray-400 items-center px-4 py-3 rounded-xl justify-between  hover:bg-[#FF8C32] hover:text-white hover:shadow-md hover:border-[#FF8C32] transition-transform duration-300"
                    >
                      Hand
                    </button>
                    <button
                      onClick={() => listFiles("Head")}
                      className="text-left text-gray-500 border border-gray-400 items-center px-4 py-3 rounded-xl justify-between  hover:bg-[#FF8C32] hover:text-white hover:shadow-md hover:border-[#FF8C32] transition-transform duration-300"
                    >
                      Head
                    </button>
                    <button
                      onClick={() => listFiles("Mouth")}
                      className="text-left text-gray-500 border border-gray-400 items-center px-4 py-3 rounded-xl justify-between  hover:bg-[#FF8C32] hover:text-white hover:shadow-md hover:border-[#FF8C32] transition-transform duration-300"
                    >
                      Mouth
                    </button>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <h1 className="text-xl font-semibold mb-2">States</h1>
                    <div className="custom-scrollbar p-3 grid grid-cols-3 grid-row-3 max-h-80 overflow-y-auto gap-6 w-96">
                      {fileUrls.map((url, index) => (
                        <button
                          onClick={() => updateTrait(traitsType, url)}
                          key={index}
                          className="border border-gray-300 rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105"
                        >
                          <Image
                            src={url}
                            alt={"image"}
                            className="rounded-lg "
                            width={5}
                            height={5}
                            layout="responsive"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between items-center mt-20">
              <div className=" -mt-16 ml-10">
                <div className="lg:h-[26rem] lg:w-[22rem] flex flex-col items-center bg-white shadow-lg rounded-xl">
                  {url === "" ? (
                    <CombinedImages traits={traits} />
                  ) : (
                    <Image
                      src={url}
                      alt="Generated Art"
                      className="rounded-lg"
                      width={300}
                      height={300}
                      layout="responsive"
                    />
                  )}
                  {/* <Image
                  src={traits.body}
                  alt="Preview Image"
                  className="rounded-t-lg overflow-auto"
                  width={300}
                  height={300}
                  layout="responsive"
                /> */}
                  <button
                    onClick={() => setGeneratedImage("")}
                    className="my-5 bg-[#131313] text-white text-lg w-40 text-center px-4 py-2 rounded-xl hover:scale-110 transition-transform duration-300"
                  >
                    Randomize
                  </button>
                </div>
                {/* <div>
              {segmentedImage && <Image src={segmentedImage} alt="Segmented Image" width={100} height={100} />}
              </div> */}
              </div>
              {/* <button
                onClick={() => setGeneratedImage("")}
                className="my-5 bg-[#FF8C32] text-white text-lg w-full self-end mt-20 text-center px-4 py-2 rounded-xl hover:scale-110 transition-transform duration-300"
              >
                Generate Collection
              </button> */}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CombinedImages = ({ traits }) => {
    return (
      <div className="relative rounded-t-xl w-full h-full">
        <Image
          src={traits.background}
          width={300}
          height={300}
          alt="Background"
          className="rounded-t-xl absolute inset-0 w-full h-full"
        />
        <Image
          src={GingerBody}
          width={300}
          height={300}
          alt="Body"
          className="absolute inset-0 w-full h-full"
          style={{ top: "0", left: "0" }}
        />
        <Image
          src={traits.mouth}
          width={300}
          height={300}
          alt="Mouth"
          className="absolute inset-0 w-full h-full"
          style={{ top: "0", left: "0" }}
        />
        <Image
          src={traits.face}
          width={300}
          height={300}
          alt="Face"
          className="absolute inset-0 w-full h-full"
          style={{ top: "0", left: "0" }}
        />
        <Image
          src={traits.dress}
          width={300}
          height={300}
          alt="Dress"
          className="absolute inset-0 w-full h-full"
          style={{ top: "0", left: "0" }}
        />
        <Image
          src={traits.head}
          width={300}
          height={300}
          alt="Head"
          className="absolute inset-0 w-full h-full"
          style={{ top: "0", left: "0" }}
        />
        <Image
          src={traits.hand}
          width={300}
          height={300}
          alt="Hand"
          className="absolute inset-0 w-full h-full"
          style={{ top: "0", left: "0" }}
        />
      </div>
    );
  };

  // animating expansion of prompt guide

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isExpanded ? contentRef.current.scrollHeight : 0);
    }
  }, [isExpanded]);

  return (
    <div className="mx-auto px-5 py-5 bg-[#FFFAF3] font-poppins">
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      <div className="flex space-x-10">
        {/* Left section */}
        <div className="w-96">
          <div className=" mx-4 flex px-2 gap-2 items-center">
            <Image src={orangeLogo} alt="Orange Logo" width={50} height={50} />
            <span className="text-xl font-semibold">ArtiGenious</span>
          </div>
          {/* Balance and Upgrade */}
          <div className="flex items-center space-x-2 bg-white px-5 py-2 rounded-xl mx-10 my-8 shadow-md">
            <span className="text-xl font-bold">260</span>
            <Image src={coinPng} alt="Coin" width={20} height={20} />

            <button
              onClick={() => router.push("./payment")}
              className="bg-[#FF8C32] text-white py-1 px-3 rounded-xl ml-5 hover:scale-105 transition-transform duration-300"
            >
              Upgrade
            </button>
            {/* <button onClick={(() => {
                            checkout(
                                {
                                    lineItems: [{ price: "price_1OjKxkClJNcB9xu1Tsh1wi6b", quantity: 1 }]
                                }
                            )
                        })} className="bg-[#FF8C32] text-white py-1 px-3 rounded-xl ml-5 hover:scale-105 transition-transform duration-300">
                            Upgrade
                        </button> */}
          </div>
          {/* Image Dimension */}
          <div className="border-t-2 border-[#D15C00] py-8 border-opacity-30">
            <h3 className="text-lg font-semibold mb-2 ml-2">Image Dimension</h3>
            {/* Buttons for dimensions */}
            <div className="space-x-3">
              <button
                className={`w-36  py-2 rounded-xl border border-[#000000] border-opacity-10 transition-transform duration-300 ${
                  activeButtonDim === "512x512"
                    ? "bg-[#FF8C32] text-white shadow-md border-0"
                    : "bg-white hover:bg-[#FF8C32] hover:text-white hover:shadow-md hover:border-0"
                }`}
                onClick={() => handleActiveButtonClickDim("512x512")}
              >
                512 x 512
              </button>
              <button
                className={`w-36  py-2 rounded-xl border border-[#000000] border-opacity-10 transition-transform duration-300 ${
                  activeButtonDim === "1024x1024"
                    ? "bg-[#FF8C32] text-white shadow-md border-[#FF8C32]"
                    : "bg-white hover:bg-[#FF8C32] hover:text-white hover:shadow-md hover:border-0"
                }`}
                onClick={() => handleActiveButtonClickDim("1024x1024")}
              >
                1024x1024
              </button>
            </div>

            <div className="space-x-3 mt-3">
              <button
                className={`w-36 py-2 rounded-xl border border-[#000000] border-opacity-10 transition-all duration-300 ${
                  activeButtonDim === "768x1368"
                    ? "bg-[#FF8C32] text-white shadow-md border-[#FF8C32]"
                    : "bg-white hover:bg-[#FF8C32] hover:text-white hover:shadow-md "
                }`}
                onClick={() => handleActiveButtonClickDim("768x1368")}
              >
                768x1368
              </button>
              <button
                className={`w-36 py-2 rounded-xl border border-[#000000] border-opacity-10 transition-all duration-300 ${
                  activeButtonDim === "1024x768"
                    ? "bg-[#FF8C32] text-white shadow-md border-[#FF8C32]"
                    : "bg-white hover:bg-[#FF8C32] hover:text-white hover:shadow-md "
                }`}
                onClick={() => handleActiveButtonClickDim("1024x768")}
              >
                1024x768
              </button>
            </div>
          </div>
          {/* Number of Images */}
          <div className="border-t-2 border-[#D15C00] py-8 border-opacity-30">
            <h3 className="text-lg font-semibold mb-2 ml-2">
              Number of Images
            </h3>
            <div className="space-x-3">
              {[1, 2, 3, 4].map((number) => (
                <button
                  key={number}
                  className={`w-16  py-2 rounded-xl border border-[#000000] border-opacity-10 transition-all duration-300 ${
                    activeButtonNum === number
                      ? "bg-[#FF8C32] text-white shadow-md border-[#FF8C32]"
                      : "bg-white hover:bg-[#FF8C32] hover:text-white hover:shadow-md hover:border-0"
                  }`}
                  onClick={() => handleActiveButtonClickNum(number)}
                >
                  {number}
                </button>
              ))}
            </div>

            <div className="space-x-3 mt-3">
              {[5, 6, 7, 8].map((number) => (
                <button
                  key={number}
                  className={`w-16  py-2 rounded-xl border border-[#000000] border-opacity-10 transition-all duration-300 ${
                    activeButtonNum === number
                      ? "bg-[#FF8C32] text-white shadow-md border-[#FF8C32]  "
                      : "bg-white hover:bg-[#FF8C32] hover:text-white hover:shadow-md hover:border-0"
                  }`}
                  onClick={() => handleActiveButtonClickNum(number)}
                >
                  {number}
                </button>
              ))}
            </div>
          </div>
          {/* Art Style */}
          <div className="border-t-2 border-[#D15C00] py-8 border-opacity-30">
            <h3 className="text-lg font-semibold  mb-2 ml-2">Art Style</h3>
            {/* Buttons for art styles */}
            <div className="space-x-3 ">
              <button className="bg-white border w-36 border-[#000000] border-opacity-10 font-normal py-2 rounded-xl  hover:bg-[#FF8C32] hover:text-white hover:shadow-md hover:border-[#FF8C32]  transition-all duration-300">
                Anime
              </button>
              <button className="bg-white border w-36 border-[#000000] border-opacity-10 font-normal py-2 rounded-xl hover:bg-[#FF8C32] hover:text-white hover:shadow-md hover:border-[#FF8C32] transition-all  duration-300">
                Realistic
              </button>
            </div>

            <div className="space-x-3 mt-3">
              <button className="bg-white border w-36 border-[#000000] border-opacity-10 font-normal py-2 rounded-xl hover:bg-[#FF8C32] hover:text-white hover:shadow-md hover:border-[#FF8C32] transition-all  duration-300">
                Chibby
              </button>
              <button className="bg-white border w-36 border-[#000000] border-opacity-10 font-normal py-2 rounded-xl hover:bg-[#FF8C32] hover:text-white hover:shadow-md hover:border-[#FF8C32] transition-all  duration-300">
                Doodle
              </button>
            </div>
            <div className="space-x-3 mt-3">
              <button className="bg-white border w-36 border-[#000000] border-opacity-10 font-normal py-2 rounded-xl hover:bg-[#FF8C32] hover:text-white hover:shadow-md hover:border-[#FF8C32] transition-all  duration-300">
                Sketch
              </button>
              <button className="bg-white border w-36 border-[#000000] border-opacity-10 font-normal py-2 rounded-xl hover:bg-[#FF8C32] hover:text-white hover:shadow-md hover:border-[#FF8C32] transition-all duration-300">
                3d Art
              </button>
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="space-y-4 w-full">
          {/* Generate NFTs Header */}
          <h2 className="text-3xl font-semibold text-[#131313]">
            Generate NFTs
          </h2>
          {!isExpanded ? (
            <div
              ref={contentRef}
              className="flex font-poppins p-2 rounded-lg transition-all duration-500"
            >
              <button onClick={toggleExpansion}>
                <Image src={expandBtn} alt="Design" width={20} height={20} />
              </button>
              <h1 className="font-semibold">Prompt Guide</h1>
            </div>
          ) : (
            <div className="font-poppins p-2 bg-[#f2e4d0] rounded-lg transition-all duration-500">
              <div className="flex">
                <button onClick={toggleExpansion}>
                  <Image
                    src={condenseBtn}
                    alt="Design"
                    width={20}
                    height={20}
                  />
                </button>
                <h1 className="font-semibold">Prompt Guide</h1>
              </div>
              {isExpanded && (
                <div
                  ref={contentRef}
                  className="overflow-hidden transition-all duration-500"
                  style={{ height: contentHeight }}
                >
                  <h1>
                    Generate NFTs by providing a prompt to the AI model. The AI
                    model will generate an image based on the prompt provided.
                  </h1>
                  <h1>
                    For instance: "Generate an image of a cat
                    <span className="font-semibold text-red-600 mx-1">
                      with atleast
                    </span>
                    10 backgrounds, head traits, dress traits, hand traits,
                    mouth traits, and face traits. etc"
                  </h1>
                </div>
              )}
            </div>
          )}
          {/* Text input for NFT description */}
          <div className="flex space-x-10">
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              type="text"
              placeholder="Describe the art you want to envision"
              className="w-full px-4 py-3 rounded-xl border border-gray-200"
            />
            <button
              onClick={handleGenerateClick}
              className="flex bg-[#131313] text-white items-center px-4 py-3 rounded-xl justify-between space-x-3 font-semibold"
            >
              <div>Generate</div>
              <div className="flex p-2 space-x-2 items-center">
                <h1>20</h1>
                <div className="w-4 h-4">
                  <Image src={coinPng} alt="Design" width={20} height={20} />
                </div>
              </div>
            </button>
          </div>
          {/* Generation History */}
          {loading && (
            <div className="relative bg-gray-200 bg-opacity-40 w-80 h-80 flex flex-col items-center justify-center rounded-xl">
              <ReactLoading
                className="absolute z-10 top-2 left-2"
                type="spin"
                color="#000"
                height={20}
                width={20}
              />
              <Image
                src={orangeLogoArti}
                className="opacity-50 rounded-xl"
                alt="Design"
                width={50}
                height={50}
              />
              <h1 className="opacity-50 font-poppins font-bold mt-4">
                Please Wait...
              </h1>
            </div>
          )}
          {generatedImage != "" && ( // Conditional rendering based on showImages state
            <div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Generated Image</h3>
                <button
                  onClick={() => {
                    toggleModal();
                  }}
                  className="w-full rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
                >
                  <Image
                    src={generatedImage}
                    alt="Generated Art"
                    className="rounded-lg "
                    width={100}
                    height={100}
                    layout="responsive"
                  />
                </button>
              </div>
              <h3 className="text-lg font-semibold mb-2">Generation History</h3>
              <div className="grid grid-cols-3 gap-4">
                {imageCards.map((card, index) => (
                  <div key={index} className="relative">
                    <button
                      onClick={() => {
                        toggleModal();
                      }}
                      key={index}
                      className="rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
                    >
                      <Image
                        src={card.src}
                        alt={card.alt}
                        className="rounded-lg "
                        width={300}
                        height={300}
                        layout="responsive"
                      />
                    </button>
                    {isOpen && layerCustomization(generatedImage)}
                  </div>
                ))}
              </div>
            </div>
          )}
          {generatedImage == "" && ( // Conditional rendering based on showImages state
            <div>
              {/* <div>
                <h3 className="text-lg font-semibold mb-2">Generated Image</h3>
                <div className="w-80 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
                  <Image
                    src={generatedImage}
                    alt="Generated Art"
                    className="rounded-lg "
                    width={100}
                    height={100}
                    layout="responsive"
                  />
                </div>
              </div> */}
              <h3 className="text-2xl font-semibold mb-4">
                Generation History
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {imageCards.map((card, index) => (
                  <div key={index} className="relative">
                    <button
                      onClick={() => {
                        toggleModal();
                      }}
                      key={index}
                      className="rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
                    >
                      <Image
                        src={card.src}
                        alt={card.alt}
                        className="rounded-lg "
                        width={300}
                        height={300}
                        layout="responsive"
                      />
                    </button>

                    {isOpen && layerCustomization("")}
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Prompt Generation */}
          <div>
            {/*<h3 className="text-lg font-semibold mb-2">Prompt Generation</h3> */}
            {/* Card layout for prompts */}
          </div>
        </div>
      </div>
    </div>
  );
}
