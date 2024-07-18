import Board from "@/components/Board"
import LoginView from "@/components/views/LoginView"
import { authOptions } from "@/lib/authOptions"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowRight,
  faPlus,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons"
import Boards from "@/components/Boards"

import { Lobster, Poppins, Permanent_Marker } from "next/font/google"
import { getUserEmail } from "@/lib/userClient"
import { liveblocksClient } from "@/lib/liveBlocksClient"

const permanentMarker = Permanent_Marker({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
})

export default async function Home() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return <LoginView />
  }
  //Consigo el email del usuario en sesion utilizando la función personalizada guardad en la librería
  const email = await getUserEmail()
  //Consigo la información de las rooms de este usuario con la función nativa de liveblocks "getRooms".
  // La info viene dentro de la propiedad "data" del objeto devuelto por liveblocks y la renombro a "rooms"
  const { data: rooms } = await liveblocksClient.getRooms({ userId: email })

  return (
    <div>
      <h1
        className={`${permanentMarker.className} text-4xl mb-4 font-semibold`}
      >
        Boards
      </h1>
      <div className="flex flex-col-reverse md:flex">
        <Boards />
        {rooms.length < 8 && (
          <div className="flex md:justify-end md:mb-4 md:-mt-12">
            <Link
              className="btn primary inline-flex gap-8 items-center"
              href={"/new-board"}
            >
              Create new board <FontAwesomeIcon className="h-5" icon={faPlus} />
            </Link>
          </div>
        )}
      </div>
      {rooms.length === 0 && (
        <div className="w-full h-48 flex justify-center items-center px-10">
          <h3 className="text-xl text-gray-700 font-medium w-full text-center">
            Hello, Try creating your first board!
          </h3>
        </div>
      )}
    </div>
  )
}
