import { authOptions } from "@/lib/authOptions"
import { getServerSession } from "next-auth"
import LoginButton from "./buttons/LoginButton"
import LogoutButton from "./buttons/LogoutBoutton"
import Link from "next/link"

import { Lobster } from "next/font/google"

const lobster = Lobster({
  subsets: ["latin"],
  weight: "400",
})

export default async function Header() {
  const session = await getServerSession(authOptions)

  return (
    <header className="p-4 md:px-8 relative">
      <div className="flex justify-between items-center">
        <Link href="/" className={`text-[calc(2rem+1vw)] ${lobster.className}`}>
          White-Notes
        </Link>
        <div>
          {session && (
            <>
              <div className="flex gap-4 items-center">
              <p className="text-xl font-medium hidden md:block">Hello, {session.user?.name}</p>
                <LogoutButton />
              </div>
            </>
          )}
          {!session && (
            <>
              <LoginButton />
            </>
          )}
        </div>
      </div>
      {session && (
        <p className="absolute bottom-1 left-6 text-sm md:hidden">Hello, {session.user?.name}</p>
      )}
    </header>
  )
}
