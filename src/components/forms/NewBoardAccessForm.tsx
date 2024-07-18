"use client"

import { addEmailToBoard } from "@/app/actions/boardActions"
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function NewBoardAccessForm({boardId}: {boardId:string}) {
  const router = useRouter()
  const [formError, setFormError] = useState<string | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)

  async function addEmail(formData: FormData){
    setFormError(null)
    const email = formData.get('email')?.toString() || '';
    if(email.length > 0){
      await addEmailToBoard(boardId, email);
      //reseteamos el input del formulario
      if(inputRef.current){
        inputRef.current.value = "";
      }
      router.refresh();
    } else {
      setFormError("Sorry, input can't be empty!")      
    }
  }


  return (
    <form action={addEmail} className="max-w-xs">
      <h2 className="text-lg mb-2">Add Email
      {formError && (
          <span className="text-red-500 text-sm ml-2 text-end">{formError}</span>
        )}
      </h2>
      <input ref={inputRef} type="text" className="w-full mb-2" placeholder="john.doe@example.com" name="email" />
      
      <button className="w-full " type="submit">Save</button>
    </form>
  )
}
