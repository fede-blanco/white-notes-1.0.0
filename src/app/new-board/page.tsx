"use client"

import { redirect } from "next/navigation"
import { createBoard } from "../actions/boardActions"
import { useState } from "react"

export default function NewBoardPage() {
  const [formError, setFormError] = useState<string | null>(null)
  async function handleNewBoardSubmit(formData: FormData) { 
    setFormError(null)
    const boardName = formData.get("name")?.toString() || ""

    if (boardName.length > 0){
      const boardInfo = await createBoard(boardName as string)
      let id = ""
      if(typeof boardInfo !== 'boolean'){
       id = boardInfo.id;
      }
      redirect(`/boards/${id}`)
    } else {
      setFormError("Sorry, input can't be empty!")
    }
  }

  return (
    <div>
      <form action={handleNewBoardSubmit} className="max-w-xs">
        <h1 className="text-2xl mb-4">Create new board</h1>
        <input type="text" name="name" placeholder="Board name" className="w-full mb-2"/>
        {formError && (
          <span className="text-red-500 text-sm ml-2">{formError}</span>
        )}
        <button type="submit" className="mt-2 w-full">
          Create Board
        </button>
      </form>
    </div>
  )
}

