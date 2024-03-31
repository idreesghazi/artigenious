"use client";
import React, { useEffect } from "react";
import { SessionProvider } from "next-auth/react";

import AOS from "aos";
import "aos/dist/aos.css";

const Authprovider = ({ children }) => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  return <SessionProvider>{children}</SessionProvider>;
};

export default Authprovider;
