"use client"
import { deleteBoard } from "@/app/actions/boardActions"
import { useRouter } from "next/navigation"

export default function BoardDeleteButton({ boardId }: { boardId: string }) {
  const router = useRouter()

  async function handleDeleteBoard() {
    await deleteBoard(boardId)
    router.push("/")
  }

  return (
    <div>
      <button className="btn btn-red" onClick={() => {handleDeleteBoard()}}>
        Delete board
      </button>
    </div>
  )
}
