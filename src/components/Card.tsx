"use client"
import Link from "next/link"
import { useParams} from "next/navigation"
import { useContext} from "react"
import { BoardContext } from "./contexts/BoardContext"
import PresenceAvatars from "./PresenceAvatars"

export default function Card({ id, name }: { id: string; name: string }) {
  const params = useParams()
  const boardContext = useContext(BoardContext)

  const timeStamp = new Date().getTime()

  return (
    <Link
      href={`/boards/${params.boardId}/cards/${id}` + `?timestamp=${timeStamp}`}
      className="relative border block bg-white my-2 py-8 px-4 rounded-md font-medium drop-shadow-sm"
    >
      <span>{name}</span>

      <div className="absolute bottom-1 right-1">
        <PresenceAvatars presenceKey={'cardId'} presenceValue={id} />
      </div>

    </Link>
  )
}

