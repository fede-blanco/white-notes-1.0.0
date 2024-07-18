"use client"

import { FormEvent, useState } from "react"
import { Card, useMutation } from "../../../liveblocks.config"
import { LiveObject } from "@liveblocks/client"
import uniqid from "uniqid"

export default function NewCardForm({ columnId }: { columnId: string }) {
  const [formError, setFormError] = useState<string | null>(null)

  const addCard = useMutation(
    ({ storage }, cardName) => {
      return storage.get("cards").push(
        new LiveObject<Card>({
          name: cardName,
          id: uniqid.time(),
          columnId: columnId,
          index: 9999,
        })
      )
    },
    [columnId]
  )

  function handleNewCardFormSubmit(ev: FormEvent) {
    ev.preventDefault()
    setFormError(null)
    const input = (ev.target as HTMLFormElement).querySelector("input")
    if (input) {
      const cardName = input?.value

      if (cardName.length > 0) {
        addCard(cardName)
        input.value = ""
      } else {
        setFormError("Sorry, input can't be empty!")
      }
    }
  }

  return (
    <form onSubmit={handleNewCardFormSubmit}>
      {formError && (
        <div className="text-red-500 text-sm mr-2 mb-1 text-right">{formError}</div>
      )}
      <input type="text" placeholder="Card name" className="w-full mb-2" />
    </form>
  )
}
