"use client"
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { signIn } from "next-auth/react"

export default function LoginButton() {
  return (
    <button
      className="transition-all duration-300 bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded-md ml-2 tracking-wide font-medium inline-flex gap-2 items-center"
      onClick={() => signIn("google")}
    >
      Login  <FontAwesomeIcon className="h-5" icon={faArrowRightToBracket} />
    </button>
  )
}
