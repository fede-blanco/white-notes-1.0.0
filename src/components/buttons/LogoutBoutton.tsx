"use client"

import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { signOut } from "next-auth/react"

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="btn btn-red ml-2 inline-flex items-center gap-1"
    >
      Logout <FontAwesomeIcon className="h-5" icon={faArrowRightFromBracket} />
    </button>
  )
}
