"use client"

import { FormEvent, useState } from "react"
import { useMutation } from "../../../liveblocks.config"
import uniqid from "uniqid"
import { LiveObject } from "@liveblocks/client"

export default function NewColumnForm() {
  const addColumn = useMutation(({ storage }, columnName) => {
    storage.get("columns").push(
      new LiveObject({
        name: columnName,
        id: uniqid.time(),
        index: 9999,
      })
    )
  }, [])

  const [formError, setFormError] = useState<string | null>(null)

  function handleNewColumn(ev: FormEvent) {
    ev.preventDefault()
    setFormError(null)
    const input = (ev.target as HTMLFormElement).querySelector("input")
    if (input) {
      const columnName = input?.value
      if (columnName.length > 0) {
        addColumn(columnName)
        input.value = ""
      } else {
        setFormError("Sorry, input can't be empty!")
      }
    }
  }

  return (
      <form
        onSubmit={handleNewColumn}
        className="flex flex-wrap md:flex-nowrap md:gap-4 md:w-8/12 lg:w-1/2 mb-4 drop-shadow-sm"
      >
        <label className="w-full md:w-8/12">
          <span className="text-gray-600 inline-block font-medium">
            Column name:
          </span>
          {formError && (
            <span className="text-red-500 text-sm ml-2">{formError}</span>
          )}
          <input type="text" placeholder="new column name" className="w-full" />
        </label>
        <button type="submit" className="mt-2 w-full md:w-auto shadow-md">
          Create column
        </button>
      </form>
  )
}
