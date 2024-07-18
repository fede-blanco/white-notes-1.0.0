"use client"

import { removeEmailFromBoard } from "@/app/actions/boardActions"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { RoomAccesses } from "@liveblocks/node"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function EmailsAccessList({
  boardId,
  usersAccesses,
}: {
  boardId: string
  usersAccesses: RoomAccesses
}) {
  const router = useRouter()

  useEffect(() => {
    router.refresh()
  }, [router])

  async function handleDelete(emailToDelete: string) {
    await removeEmailFromBoard(boardId, emailToDelete)
    router.refresh()
  }

  return (
    //
    <div className="max-h-[260px] md:max-h-[300px] overflow-y-scroll md:overflow-y-auto flex flex-col items-center md:flex-wrap gap-2 my-2 pb-2">
      {Object.keys(usersAccesses).map((email) => (
        <div
          key={email}
          className="min-w-[350px] flex gap-2 items-center justify-between border rounded-md pl-2"
        >
          {email}
          <button
            onClick={() => handleDelete(email)}
            className="btn btn-delete-email"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ))}
    </div>
  )
}
