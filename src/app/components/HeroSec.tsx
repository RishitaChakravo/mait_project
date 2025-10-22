"use client";

import { motion } from "motion/react";
import React from "react";
import { AuroraBackground } from "./ui/aurora-background";
import Link from "next/link";

export function HeroSec({loggedIn}: { loggedIn: boolean }) {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-5xl md:text-7xl font-bold dark:text-white text-center">
          Smarter Heath Starts With You.
        </div>
        <div className="font-extralight text-xl md:text-4xl dark:text-neutral-200 py-4">
          Describe your symptoms - we'll help you understand what they mean.
        </div>
        <Link href="/signup">
          <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
            Start Now
          </button>
        </Link>
      </motion.div>
      {
          loggedIn && <div className="z-50 fixed top-11 right-5 h-11 w-11 rounded-full border overflow-hidden cursor-pointer">
            <img
              src="/image.png" 
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
      }
    </AuroraBackground>
  );
}
