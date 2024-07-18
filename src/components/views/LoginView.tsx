"use client"

import { signIn } from "next-auth/react"
import LoginButton from "../buttons/LoginButton"

import { Poppins } from "next/font/google"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
})

import { Lobster } from "next/font/google"

const lobster = Lobster({
  subsets: ["latin"],
  weight: "400",
})

export default function LoginView() {
  return (
    <div className="w-full pt-8 text-center min-h-[100svh] flex items-center flex-col">
      <div className={`${poppins.className} pb-16`}>
        <h1 className="text-[calc(1rem+2vw)] mb-4">
          Welcome to{" "}
          <span className={`text-[calc(3rem+2vw)] ${lobster.className} text-nowrap`}>White-Notes</span>
        </h1>
        <h1 className="text-[calc(1rem+2vw)]">Take note of your dreams...</h1>
      </div>
      <LoginButton />
    </div>
  )
}
