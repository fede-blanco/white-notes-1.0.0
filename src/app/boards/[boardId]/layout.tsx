"use client"
import { useParams } from "next/navigation"
import { RoomProvider } from "../../../../liveblocks.config"
import { LiveList } from "@liveblocks/client"
import { BoardContextProvider } from "@/components/contexts/BoardContext"

type PageProps = {
  children: React.ReactNode
  modal: React.ReactNode
}

export default function BoardLayout({ children, modal }: PageProps) {
  const params = useParams()

  return (
    <BoardContextProvider>
      <RoomProvider
        id={params.boardId.toString()}
        initialPresence={{
          cardId: null,
          boardId:null,
        }}
        initialStorage={{
          columns: new LiveList(),
          cards: new LiveList(),
        }}
      >
        {children}
        {modal}
      </RoomProvider>
    </BoardContextProvider>
  )
}
