"use server"

import Board from "@/components/Board"
import { liveblocksClient } from "@/lib/liveBlocksClient"
import { getUserEmail } from "@/lib/userClient"

type PageProps = {
  params: {
    boardId: string
    cartId?: string
  }
}

export default async function BoardPage(props: PageProps) {
  const boardId = props.params.boardId
  const userEmail = await getUserEmail()
  const boardInfo = await liveblocksClient.getRoom(boardId)
  const userAccess = boardInfo.usersAccesses?.[userEmail]
  const hasAccess = userAccess && [...userAccess].includes("room:write")

  if (!hasAccess) {
    return <div className="text-red-500">Access Denied</div>
  }

  return (
    <>
      <div>
        <Board name={boardInfo.metadata.boardName.toString()} id={boardId} />
      </div>
    </>
  )
}
