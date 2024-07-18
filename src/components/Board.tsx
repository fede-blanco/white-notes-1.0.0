"use client"
import {
  RoomProvider,
  useMyPresence,
  useUpdateMyPresence,
} from "../../liveblocks.config"
import { LiveList } from "@liveblocks/client"
import { ClientSideSuspense } from "@liveblocks/react"
import Columns from "./Columns"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCog } from "@fortawesome/free-solid-svg-icons"
import { FormEvent, useEffect, useRef, useState } from "react"
import { updateBoard } from "@/app/actions/boardActions"
import { useRouter } from "next/navigation"
import { BoardContextProvider } from "./contexts/BoardContext"

export default function Board({ id, name }: { id: string; name: string }) {
  const [renameMode, setRenameMode] = useState(false)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const updateMyPresence = useUpdateMyPresence()

  useEffect(() => {
    updateMyPresence({ boardId: id })

    return () => {
      updateMyPresence({ boardId: null })
    }
  }, [])

  function handleNameSubmit(ev: FormEvent) {
    ev.preventDefault()
    setFormError(null)
    const input = (ev.target as HTMLFormElement).querySelector("input")
    if (input) {
      const newName = input.value

      if (newName.length > 0) {
        updateBoard(id, { metadata: { boardName: newName } })
        input.value = ""
        setRenameMode(false)
        router.refresh()
      } else {
        setFormError("Sorry, input can't be empty!")
      }
    }
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setRenameMode(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <BoardContextProvider>
      <RoomProvider
        id={id}
        initialPresence={{
          cardId: null,
          boardId: null,
        }}
        initialStorage={{
          columns: new LiveList(),
          cards: new LiveList(),
        }}
      >
        <ClientSideSuspense
          fallback={
            <div className="w-full text-center pt-10 text-2xl">Loading...</div>
          }
        >
          {() => (
            <>
              <div className="flex justify-between mb-2 flex-wrap gap-2">
                {!renameMode && (
                  <div>
                    <h1
                      className="text-xl font-bold flex justify-around p-2"
                      onClick={() => setRenameMode(true)}
                    >
                      {name}
                    </h1>
                  </div>
                )}
                {renameMode && (
                  <form onSubmit={handleNameSubmit}>
                    <input
                      ref={inputRef}
                      type="text"
                      defaultValue={name}
                      className="mb-2"
                    />
                    {formError && (
                      <span className="text-red-500 text-sm ml-2">
                        {formError}
                      </span>
                    )}
                  </form>
                )}
                <Link
                  href={`/boards/${id}/settings`}
                  className="hidden md:flex gap-2 items-center btn primary "
                >
                  <FontAwesomeIcon icon={faCog} />
                  Board Settings
                </Link>
                <Link
                  href={`/boards/${id}/settings`}
                  className="flex gap-2 items-center btn primary md:hidden"
                >
                  <FontAwesomeIcon icon={faCog} className="w-5 h-5" />
                </Link>
              </div>
              <hr className="mb-1" />
              <Columns />
            </>
          )}
        </ClientSideSuspense>
      </RoomProvider>
    </BoardContextProvider>
  )
}
