"use client"
import Link from "next/link"
import PresenceAvatars from "./PresenceAvatars"
import { RoomInfo } from "@liveblocks/node"
import { RoomProvider } from "../../liveblocks.config"

export default function BoardsTiles({ boards }: { boards: RoomInfo[] }) {

  return (
    <>
      <div className="my-4 grid md:grid-cols-4 gap-2">
        {boards?.length > 0 &&
          boards.map((board) => (
            <Link
              key={board.id}
              className="relative bg-[#ffffff] py-10 px-4 rounded-md block drop-shadow-md font-semibold"
              href={`/boards/${board.id}`}
            >
              {board.metadata.boardName}
              <RoomProvider id={board.id} initialPresence={{}}>
                <div className="absolute bottom-1 right-1">
                  <PresenceAvatars
                    presenceKey={"boardId"}
                    presenceValue={board.id}
                  />
                </div>
              </RoomProvider>
            </Link>
          ))}
      </div>
    </>
  )
}
