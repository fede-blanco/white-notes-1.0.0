import { ReactSortable } from "react-sortablejs"
import { Card, useMutation, useStorage } from "../../liveblocks.config"
import NewCardForm from "./forms/NewCardForm"
import { shallow } from "@liveblocks/core"
import { FormEvent, useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsis, faTrash } from "@fortawesome/free-solid-svg-icons"
import { default as ColumnCard } from "./Card"
import CancelEditButton from "./buttons/CancelEditButton"

type BoardColumnProps = {
  id: string
  name: string
}

export default function Column({ name, id }: BoardColumnProps) {
  const [renameMode, setRenameMode] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const columnCards = useStorage<Card[]>((root) => {
    return root.cards
      .filter((card) => card.columnId === id)
      .map((c) => ({ ...c }))
      .sort((a, b) => a.index - b.index)
  }, shallow)

  const updateCard = useMutation(({ storage }, index, updateData) => {
    const card = storage.get("cards").get(index)
    if (card) {
      for (let key in updateData) {
        card?.set(key as keyof Card, updateData[key])
      }
    }
  }, [])

  const updateColumnName = useMutation(({ storage }, id, newName) => {
    const columns = storage.get("columns")
    columns.find((c) => c.toObject().id === id)?.set("name", newName)
  }, [])

  const deleteColumn = useMutation(({ storage }, id) => {
    const columns = storage.get("columns")
    const columnIndex = columns.findIndex((c) => c.toObject().id === id)
    columns.delete(columnIndex)
  }, [])

  const setTasksOrderForColumn = useMutation(
    ({ storage }, sortedCards: Card[], newColumnId) => {
      const idsOfSortedCards = sortedCards.map((c) => c.id.toString())
      const allCards: Card[] = [
        ...storage.get("cards").map((c) => c.toObject()),
      ]
      idsOfSortedCards.forEach((sortedCardId, colIndex) => {
        const cardStorageIndex = allCards.findIndex(
          (c) => c.id.toString() === sortedCardId
        )
        updateCard(cardStorageIndex, {
          columnId: newColumnId,
          index: colIndex,
        })
      })
    },
    []
  )

  function handleRenameSubmit(ev: FormEvent) {
    ev.preventDefault()
    setFormError(null)
    const input = (ev.target as HTMLFormElement).querySelector("input")
    if (input) {
      const newColumnName = input.value
      if (newColumnName.length > 0) {
        updateColumnName(id, newColumnName)
        input.value = ""
        setRenameMode(false)
      } else {
        setFormError("Sorry, input can't be empty!")
      }
    }
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setRenameMode(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33%-1rem)] shadow-md bg-white rounded-md p-2">
      {!renameMode && (
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-xl">{name}</h3>
          <button
            className="text-gray-300 flex items-center"
            onClick={() => setRenameMode(true)}
          >
            <FontAwesomeIcon icon={faEllipsis} className="w-6 h-6" />
          </button>
        </div>
      )}
      {renameMode && (
        <div ref={formRef} className="mb-8">
          <form onSubmit={handleRenameSubmit} className="mb-2">
            <input
              type="text"
              defaultValue={name}
              className="max-w-full mb-2"
            />
            {formError && (
              <div className="text-red-500 text-sm ml-2 mb-2">{formError}</div>
            )}
            <button type="submit" className="btn primary w-full">
              Save
            </button>
          </form>
          <button
            className="btn btn-red flex gap-2 items-center w-full justify-center"
            onClick={() => deleteColumn(id)}
          >
            <FontAwesomeIcon icon={faTrash} />
            Delete column
          </button>
          <CancelEditButton onClick={() => setRenameMode(false)} />
        </div>
      )}

      {!renameMode && columnCards && (
        <ReactSortable
          list={columnCards}
          setList={(items) => setTasksOrderForColumn(items, id)}
          group="cards"
          className="min-h-12 max-h-[40svh] overflow-y-scroll scroll-container"
          ghostClass="opacity-40"
        >
          {columnCards.map((card) => (
            <ColumnCard key={card.id} id={card.id} name={card.name} />
          ))}
        </ReactSortable>
      )}
      {columnCards === null ||
        (columnCards.length === 0 && !renameMode && (
          <div className="-mt-12 text-xs py-2 text-gray-500 font-medium pl-2">
            Add a card or drag one into this column...
          </div>
        ))}
      {!renameMode && <NewCardForm columnId={id} />}
    </div>
  )
}
