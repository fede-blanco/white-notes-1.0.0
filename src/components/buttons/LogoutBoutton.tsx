"use client"

import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function LogoutButton() {

  const router = useRouter()

  return (
    <button
      onClick={() => {
        signOut()
        router.push("/")
      }}
      className="btn btn-red ml-2 inline-flex items-center gap-1"
    >
      Logout <FontAwesomeIcon className="h-5" icon={faArrowRightFromBracket} />
    </button>
  )
}
