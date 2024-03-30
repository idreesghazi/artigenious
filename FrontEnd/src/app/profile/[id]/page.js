"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import batmanPfp from "../../images/batman.jpg";
import orangeLogo from "../../images/orangeLogoArti.png";
import artboard1 from "../../images/catImg.jpg";
import artboard2 from "../../images/animeImg.jpg";
import artboard3 from "../../images/eyeImg.jpg";
import artboard4 from "../../images/batmanImg.jpg";

import { FaCrown } from "react-icons/fa6";
import { HiMiniHome } from "react-icons/hi2";
import { RiAiGenerate } from "react-icons/ri";
import { IoLogOut } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { MdAddCircleOutline } from "react-icons/md";
import { MdOutlineLibraryAdd } from "react-icons/md";

const ProfilePage = ({ params }) => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [premiumStatus, setPremiumStatus] = useState(false);

  const [isTabOpen, setIsTabOpen] = useState(false);

  const imageCards = [
    { src: artboard1, alt: "Generated NFT 1" },
    { src: artboard2, alt: "Generated NFT 2" },
    { src: artboard3, alt: "Generated NFT 2" },
    { src: artboard4, alt: "Generated NFT 2" },
    // Add more image objects as needed
  ];

  const toggleTab = () => {
    setIsTabOpen(!isTabOpen);
  };

  const closeTab = () => {
    setIsTabOpen(false);
  };

  const handleLogout = async () => {
    await fetch("http://localhost:3000/api/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    router.push("/login");
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/myUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${session?.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFirstName(data.data.firstName);
        setLastName(data.data.lastName);
        setPremiumStatus(data.data.premiumUser);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const AbsoluteTab = () => {
    return (
      <div className="absolute bg-[#FFFAF3] shadow-lg rounded-xl flex flex-col">
        <button className="px-5 py-3 hover:bg-[#e6dfd6] text-left rounded-t-xl">
          Disable Account
        </button>
        <button className="px-5 py-3 hover:bg-[#e6dfd6] text-left rounded-b-xl">
          Delete Account
        </button>
      </div>
    );
  };

  return (
    <div className="flex mx-auto h-screen bg-[#FFFAF3]">
      <div className=" justify-between flex flex-col">
        {/* Add your profile content here */}
        <div className="flex flex-row space-x-5 px-6 py-10">
          <Image src={orangeLogo} alt="logo" width={60} height={60} />
          <h1 className="text-3xl font-poppins mt-2 font-semibold">
            ArtiGenious
          </h1>
        </div>
        <div className="flex flex-col mb-5">
          <button
            className="bg-white border border-[#000000] border-opacity-10 hover:border-none group text-black flex justify-between items-center font-poppins w-80 h-16 px-5 py-2 text-lg  text-left  hover:bg-[#FF8C32] hover:text-white font-semibold mt-4 ml-2 rounded-2xl"
            onClick={() => router.replace("/")}
          >
            <span className="group-hover:scale-110 transition-transform duration-200">
              Home
            </span>
            <HiMiniHome className="text-black text-lg group-hover:text-red-600 group-hover:scale-125 transition-transform duration-200" />
          </button>
          <button
            className="bg-white border border-[#000000] border-opacity-10 hover:border-none group text-black flex justify-between items-center font-poppins w-80 h-16 px-5 py-2 text-lg  text-left  hover:bg-[#FF8C32] hover:text-white font-semibold mt-4 ml-2 rounded-2xl"
            onClick={() => router.push("/art_generation")}
          >
            <span className="group-hover:scale-110 transition-transform duration-200">
              Generate NFTs
            </span>
            <RiAiGenerate className="text-black text-lg group-hover:text-blue-600 group-hover:scale-125 transition-transform duration-200" />
          </button>
          <button
            className="bg-white border border-[#000000] border-opacity-10 hover:border-none group text-black flex justify-between items-center font-poppins w-80 h-16 px-5 py-2 text-lg  text-left  hover:bg-[#FF8C32] hover:text-white font-semibold mt-4 ml-2 rounded-2xl"
            onClick={() => router.push("/payment")}
          >
            <span className="group-hover:scale-110 transition-transform duration-200">
              Subscription
            </span>
            <FaCrown className="text-yellow-400 text-lg group-hover:text-yellow-200 group-hover:scale-125 transition-transform duration-200" />
          </button>
          <button
            className="bg-white border border-[#000000] border-opacity-10 hover:border-none group text-black flex justify-between items-center font-poppins w-80 h-16 px-5 py-2 text-lg  text-left  hover:bg-[#FF8C32] hover:text-white font-semibold mt-4 ml-2 rounded-2xl"
            onClick={handleLogout}
          >
            <span className="group-hover:scale-110 transition-transform duration-200">
              Logout
            </span>
            <IoLogOut className="text-black text-lg group-hover:text-gray-600 group-hover:scale-125 transition-transform duration-200" />
          </button>
        </div>
      </div>
      <div className="flex flex-col w-full p-10">
        <div className="flex flex-row space-x-32 ">
          <div className="flex space-x-10">
            <div>
              <Image
                src={batmanPfp}
                alt="profile"
                width={100}
                height={100}
                className="rounded-full"
              />
            </div>
            <div className="flex-col">
              <h1 className="text-2xl font-poppins mt-2 font-semibold">
                {firstName} {lastName}
              </h1>
              <h1 className="text-lg font-poppins mt-2 font-semibold">
                Status:{" "}
                <span
                  className={`space-x-1 ${
                    premiumStatus ? "text-green-600" : "text-blue-600"
                  }`}
                >
                  {premiumStatus ? "Premium User" : "Free User"}
                </span>
              </h1>
            </div>
          </div>

          <div className="flex flex-row space-x-6">
            <div className="space-x-3">
              <button className="bg-white hover:text-white text-center border border-[#000000] border-opacity-10 text-black font-poppins w-52 h-12 px-5 py-2 text-lg   hover:bg-[#FF8C32] font-bold mt-4 rounded-2xl">
                Edit Profile
              </button>
              <button className="bg-white hover:text-white text-center border border-[#000000] border-opacity-10 text-black font-poppins w-52 h-12 px-5 py-2 text-lg    hover:bg-[#FF8C32] font-bold mt-4 rounded-2xl">
                View Collections
              </button>
            </div>
            <button onClick={toggleTab} className="self-start mt-5">
              <IoSettingsOutline className="text-black text-2xl hover:rotate-180 hover:text-gray-600 hover:scale-125 transition-transform duration-200" />
              {isTabOpen && <AbsoluteTab />}
            </button>
          </div>
        </div>
        <div className="flex space-x-10">
        <div className="flex w-full flex-col border-2 border-dashed border-gray-200 hover:scale-105 transition-all duration-200 rounded-2xl justify-center items-center mt-5">
            <MdAddCircleOutline className="text-9xl text-gray-300" />
            <h1 className="text-2xl text-gray-300 font-poppins mt-2 font-semibold">
                Add Collections
            </h1>
        </div>
        <div className="flex w-full flex-col border-2 border-dashed border-gray-200 hover:scale-105 transition-all duration-200 rounded-2xl justify-center items-center mt-5">
            <MdOutlineLibraryAdd className="text-9xl text-gray-300" />
            <h1 className="text-2xl text-gray-300 font-poppins mt-2 font-semibold">
                Add Libraries
            </h1>
        </div>
        </div>
        <div className="flex flex-col mt-10">
          <h1 className="text-2xl font-poppins mt-2 font-semibold ">
            Your Collections
          </h1>
          <div className="flex flex-col mt-5 overflow-y-auto h-120 p-5 custom-scrollbar">
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
                      className="rounded-lg"
                      width={300}
                      height={300}
                      layout="responsive"
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
