"use client"
import {faTrash, faUndo } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

type Props = {
  onDelete: () => void
}

export default function DeleteWithConfirmation({ onDelete }: Props) {
  const [wannaDelete, setWannaDelete] = useState(false);

  if(wannaDelete){
    return (
      <div className="flex flex-col items-stretch">
        <h4 className="text-center mb-2 font-medium">Are you sure?</h4>
      <div className="flex gap-2">
        <button 
        onClick={() => setWannaDelete(false)}
        className="btn primary w-full flex gap-2 items-center justify-center">
          <FontAwesomeIcon icon={faUndo} />
          No, cancel...</button>
        <button
        onClick={onDelete} className="btn btn-red w-full flex gap-2 items-center justify-center">
          <FontAwesomeIcon icon={faTrash} />
          Yes, delete!</button>
      </div>
          </div>
    )
  }

  return (
    <button 
    onClick={() => setWannaDelete(true)}
    className="btn btn-red w-full flex gap-2 items-center justify-center">
      <FontAwesomeIcon icon={faTrash} />
      Delete Card
    </button>
  )
}


