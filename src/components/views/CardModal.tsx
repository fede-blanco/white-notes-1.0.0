"use client"
import { useParams, useRouter } from "next/navigation"
import { useContext, useEffect } from "react"
import { BoardContext } from "../contexts/BoardContext"
import "@liveblocks/react-comments/styles.css" 
import CardModalBody from "../CardModalBody"
import { useUpdateMyPresence } from "../../../liveblocks.config"

export default function CardModal() {
  const router = useRouter()
  const params = useParams()
  const context = useContext(BoardContext)

  const updateMyPresence = useUpdateMyPresence()
  
  useEffect(() => {
    if(params.cardId){
      updateMyPresence({cardId: params.cardId.toString()})
    }
  },[])
  

  function handleBackdropClick() {
    router.back()
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleBackdropClick}
      >
        <div className="w-full flex justify-center px-2">
          <div
            className="bg-white p-4 rounded-md w-full max-w-sm md:max-w-lg lg:max-w-xl mt-8 max-h-[calc(100vh-4rem)] scroll-container overflow-y-scroll"
            onClick={(ev) => ev.stopPropagation()}
          >
            <CardModalBody />
          </div>
        </div>
      </div>
    </>
  )
}
