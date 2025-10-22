'use client'

import { useEffect, useState } from "react";
import Footer from "./components/footer";
import { HeroSec } from "./components/HeroSec";
import MidSec from "./components/Midsec";
import NavBar from "./components/NavBar";
import axios from "axios";

export default function Home() {
  const [loggedin, setLogIn] = useState<boolean>(false)
  
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await axios.get<{loggedIn: boolean}>("/api/checkLoggedIn");
        setLogIn(response.data.loggedIn);
      } catch (error) {
        console.error("Error checking login:", error);
        setLogIn(false);
      }
    };

    checkLoggedIn(); 
  }, []);
  return (<div className="relative">
    <NavBar loggedIn={loggedin}/>
    <HeroSec loggedIn={loggedin}/>
    <MidSec/>
    <Footer/>
  </div>);
}
