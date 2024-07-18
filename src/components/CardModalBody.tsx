"use client"
import { useParams, useRouter } from "next/navigation"
import {
  Card,
  useMutation,
  useStorage,
  useThreads,
} from "../../liveblocks.config"
import {
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react"
import { BoardContext} from "./contexts/BoardContext"
import { shallow } from "@liveblocks/client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faEllipsis } from "@fortawesome/free-solid-svg-icons"
import DeleteWithConfirmation from "./DeleteWithConfirmation"
import CancelEditButton from "./buttons/CancelEditButton"
import { faFileLines, faComments } from "@fortawesome/free-regular-svg-icons"
import CardDescription from "./CardDescription"
import { Composer, Thread } from "@liveblocks/react-comments"

export default function CardModalBody() {
  const boardContext = useContext(BoardContext)
  const [formError, setFormError] = useState<string | null>(null)
  const { setOpenCard } = boardContext
  const router = useRouter()
  const params = useParams()
  const { threads } = useThreads({
    query: {
      metadata: {
        cardId: params.cardId.toString(),
      },
    },
  })
  const [editMode, setEditMode] = useState(false)

  const card = useStorage((root) => {
    return root.cards.find((c) => c.id === params.cardId)
  }, shallow)

  const updateCard = useMutation(({ storage }, cardId, updateData) => {
    const cards = storage.get("cards").map((c) => c.toObject())
    const index = cards.findIndex((c) => c.id === cardId)
    const card = storage.get("cards").get(index)
    for (let updateKey in updateData) {
      card?.set(updateKey as keyof Card, updateData[updateKey])
    }
  }, [])

  const deleteCard = useMutation(({ storage }, id) => {
    const cards = storage.get("cards")
    const cardIndex = cards.findIndex((c) => c.toObject().id === id)
    cards.delete(cardIndex)
  }, [])

  useEffect(() => {
    if (params.cardId && setOpenCard) {
      setOpenCard(params.cardId.toString())
    }
  }, [params, setOpenCard])
  function handleCardDelete() {
    deleteCard(params.cardId)
    if (setOpenCard) {
      setOpenCard(null)
    }
    router.back()
  }

  function handleNameChangeSubmit(ev: FormEvent) {
    ev.preventDefault()
    setFormError(null)
    const input = (ev.target as HTMLFormElement).querySelector("input")
    if (input) {
      const newName = input.value
      if (newName.length > 0) {
        updateCard(params.cardId, { name: newName })
        input.value = ""
        setEditMode(false)
      } else {
        setFormError("Sorry, input can't be empty!")
      }
    }
  }

  return (
    <div className="relative">
      {editMode && (
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center gap-2">
            {/* <h4>{card?.name}</h4> */}
            <form onSubmit={handleNameChangeSubmit} className=" w-full">
              <div className="flex items-center justify-between">
                <input type="text" defaultValue={card?.name} className="" />
                <button className="btn check">
                  <FontAwesomeIcon icon={faCheck} />
                </button>
              </div>
              {formError && (
                <span className="text-red-500 text-sm ml-2 mt-2">{formError}</span>
              )}
            </form>
          </div>
          <div className="mt-4">
            <hr className="mb-2" />
            <DeleteWithConfirmation onDelete={() => handleCardDelete()} />
            <CancelEditButton onClick={() => setEditMode(false)} />
          </div>
        </div>
      )}
      {!editMode && (
        <div className="">
          <div className="">
            <div className="flex justify-between items-center gap-2">
              <h4 className="text-2xl font-semibold">{card?.name}</h4>
              <button
                className="text-gray-400"
                onClick={() => setEditMode(true)}
              >
                <FontAwesomeIcon icon={faEllipsis} />
              </button>
            </div>
            <hr />

            <div className="">
              <h2 className="flex gap-2 items-center mt-2">
                <FontAwesomeIcon icon={faFileLines} />
                Description
              </h2>
              <CardDescription />
            </div>
          </div>

          <h2 className="flex gap-2 items-center mt-2">
            <FontAwesomeIcon icon={faComments} />
            Comments
          </h2>

          <div className="-mx-4 -mb-2">
            {threads &&
              threads.map((thread) => (
                <div key={thread.id}>
                  <Thread thread={thread} id={thread.id} />
                </div>
              ))}
            {threads?.length === 0 && (
              <div>
                <Composer metadata={{ cardId: params.cardId.toString() }} />
              </div>
            )}
          </div>
        </div>
      )}
      {/* {!editMode && (
        
      )} */}
    </div>
  )
}
