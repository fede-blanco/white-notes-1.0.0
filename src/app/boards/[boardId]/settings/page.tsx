"use server"

import BoardDeleteButton from "@/components/BoardDeleteButton"
import EmailsAccessList from "@/components/EmailsAccessList"
import NewBoardAccessForm from "@/components/forms/NewBoardAccessForm"
import { liveblocksClient } from "@/lib/liveBlocksClient"
import { getUserEmail } from "@/lib/userClient"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

type PageProps = {
  params: {
    boardId: string
  }
}

export default async function BoardSettings({ params }: PageProps) {
  //Obtengo el id de la Board de los parámetros de la url
  const { boardId } = params
  //obtengo toda la información de dicha board con el cliente de liveBlocks y la función getRoom
  const boardInfo = await liveblocksClient.getRoom(boardId)

  //Obtenemos el email del usuario logueado con una función personalizada
  const userEmail = await getUserEmail()
  // si no hay usuario que coincida dentro de userAccesses devuelve solo un mensaje
  if (!boardInfo.usersAccesses[userEmail]) {
    return "Access Denied!"
  }
  
  return (
    <>
      <div>
        <div className="flex justify-between">
          <Link
            className="inline-flex gap-2 items-center btn primary mb-4"
            href={`/boards/${boardId}`}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Go back to board
          </Link>
          <BoardDeleteButton boardId={boardId} />
        </div>
        <h1 className="text-2xl">
          Access to board: {boardInfo.metadata.boardName}{" "}
        </h1>
        <div className="mb-6 border-b-2">
          <EmailsAccessList
            boardId={boardId}
            usersAccesses={boardInfo.usersAccesses}
          />
        </div>
        {Object.keys(boardInfo.usersAccesses).length < 10 && (
          <NewBoardAccessForm boardId={boardId} />
        )}
      </div>
    </>
  )
}
