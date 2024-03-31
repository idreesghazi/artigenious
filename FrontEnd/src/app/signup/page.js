"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactLoading from "react-loading";

import Link from "next/link";

import orangeLogo from "../images/orangeLogo.png";
import textArti from "../images/textArti.png";
import apocCatHome from "../images/apocCatHome.png";
import loginImage from "../images/loginImage.png";
import userIcon from "../images/Frame.png";
import passwordIcon from "../images/Vector.png";
import googleIcon from "../images/google.png";
import facebookIcon from "../images/facebook.png";
import design from "../images/design.png";

export default function Login() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });

  const [disabledButton, setDisabledButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (
      formData.email.length > 0 &&
      formData.password.length > 0 &&
      formData.confirmPassword.length > 0 &&
      formData.firstName.length > 0 &&
      formData.lastName.length > 0 &&
      formData.dob.length > 0
    ) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    // Send data to the API for registration
    setIsLoading(true);
    const res = await fetch("http://localhost:3000/api/persona", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success) {
      toast.success("Signup successful! Redirecting to login...");
      setTimeout(() => {
        router.push("/login"); // Replace '/login' with your login page route
      }, 5000);
    } else {
      setIsLoading(false);
      toast.error(data.message);
    }
  };

  return (
    <div className="bg-[#FFFFFF] w-full flex justify-center items-center h-screen px-20 py-10 space-x-40">
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
      <div className="text-center">
        <div className="absolute left-0 bottom-24">
          <Image src={design} className="w-16" />
        </div>
        <h1 className="font-smooch font-bold text-9xl">Create Account</h1>
        <h2 className="font-poppins text-xl mb-10 mt-4">
          We are glad to have you!
        </h2>
        <div class="flex flex-col space-y-5">
          <div class="relative flex space-x-8">
            <input
              type="text"
              name="firstName"
              onChange={handleChange}
              placeholder="First Name"
              class="pl-6 pr-4 py-5  border-2  border-black rounded-2xl w-80 focus:border-black font-poppins"
            />
            <input
              type="text"
              name="lastName"
              onChange={handleChange}
              placeholder="Last Name"
              class="pl-6 pr-4 py-5 border-2  border-black rounded-2xl w-80 focus:border-black font-poppins"
            />
          </div>
          <div class="relative flex space-x-8">
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Your Email"
              class="pl-6 pr-4 py-5 border-2  border-black rounded-2xl w-80 focus:border-black font-poppins"
            />
            <input
              type="date"
              name="dob"
              onChange={handleChange}
              placeholder="Date of Birth dd/mm/yy"
              class="pl-6 pr-4 py-5 border-2  border-black rounded-2xl w-80 focus:border-black font-poppins"
            />
          </div>
          <div class="relative flex space-x-8">
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Password"
              class="pl-6 pr-4 py-5 border-2  border-black rounded-2xl w-80 focus:border-black font-poppins"
            />
            <input
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              placeholder="Confirm Password"
              class="pl-6 pr-4 py-5 border-2  border-black rounded-2xl w-80 focus:border-black font-poppins"
            />
          </div>
        </div>

        <h2 className="font-poppins font-semibold my-5">
          Already have an account?{" "}
          <Link
            href="./login"
            className="text-blue-600 transform transition-transform duration-200 hover:underline hover:font-bold "
          >
            Sign in
          </Link>
        </h2>
        <button
          onClick={handleSubmit}
          disabled={disabledButton}
          className={`p-5 w-120 bg-[#1C1C1C] text-white font-poppins rounded-2xl ${
            disabledButton
              ? "opacity-50"
              : "hover:scale-105 shadow-sm hover:shadow-md transition duration-300 ease-in-out text-lg font-semibold"
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <span className="mr-2">
                <ReactLoading
                  type="spin"
                  color="white"
                  height={12}
                  width={12}
                />
              </span>
              <span className="ml-2">Processing...</span>
            </div>
          ) : (
            "Register"
          )}
        </button>
        <div className="flex items-center space-x-2 my-5">
          <div className="flex-1 border-t border-gray-400"></div>
          <span className="px-4 text-xl font-poppins">
            <span className="font-bold">Register</span> with Other Platforms
          </span>
          <div className="flex-1 border-t border-gray-400"></div>
        </div>
        <div className="flex gap-5 my-5 justify-center items-center font-poppins">
          <button className="group hover:scale-105 w-64 flex items-center justify-center space-x-2 p-5 border-2 border-black rounded-2xl shadow-sm hover:shadow-md transition duration-300 ease-in-out">
            <Image src={googleIcon} className="w-5 h-5 mx-1" />
            <span className="transition-transform duration-300 ">
              Login with Google
            </span>
          </button>
          <button className="group hover:scale-105 w-64 flex items-center justify-center space-x-2 p-5 border-2 border-black rounded-2xl shadow-sm hover:shadow-md transition duration-300 ease-in-out">
            <Image src={facebookIcon} className="w-5 h-5 mx-1" />
            <span className="transition-transform duration-300">
              Login with Facebook
            </span>
          </button>
        </div>
      </div>
      <div className="">
        <Image src={loginImage} className="w-130" />
      </div>
    </div>
  );
}
