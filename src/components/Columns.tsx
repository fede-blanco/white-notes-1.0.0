"use client"
import NewColumnForm from "./forms/NewColumnForm"
import { Column, useMutation, useStorage } from "../../liveblocks.config"
import { ReactSortable } from "react-sortablejs"
import { default as BoardColumn } from "./Column"
import { LiveList, LiveObject, shallow } from "@liveblocks/client"

export default function Columns() {
  const columns = useStorage(
    (root) => root.columns.map((c) => ({ ...c })),
    shallow
  )

  const updateColumn = useMutation(
    ({ storage }, columns: LiveObject<Column>[]) => {
      storage.set("columns", new LiveList(columns))
    },
    []
  )

  if (!columns) {
    return
  }
  if (columns.length == 0) {
    return (
      <div className="flex-col gap-4">
        <NewColumnForm />
        <div className="w-full mt-24 flex justify-center text-xl font-medium text-gray-700">
          Hello, Try creating your first List!
        </div>
      </div>
    )
  }

  function setColumnsOrder(sortedColumns: Column[]) {
    const newColumns: LiveObject<Column>[] = []
    sortedColumns.forEach((sortedColumn, newIndex) => {
      const newSortedColumn = { ...sortedColumn }
      newSortedColumn.index = newIndex
      newColumns.push(new LiveObject(newSortedColumn))
    })
    updateColumn(newColumns)
  }

  return (
    <div className="flex-col gap-4">
      <NewColumnForm />
      <div className="w-full flex justify-center">
        <ReactSortable
          group={"board-column"}
          list={columns}
          setList={setColumnsOrder}
          className="w-full flex gap-7 flex-wrap justify-left"
          ghostClass="opacity-40"
        >
          {columns?.length > 0 &&
            columns.map((c) => <BoardColumn key={c.id} {...c} />)}
        </ReactSortable>
      </div>
    </div>
  )
}
