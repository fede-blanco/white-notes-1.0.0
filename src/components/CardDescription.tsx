import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useRoom, useSelf } from "../../liveblocks.config"
import * as Y from "yjs"
import LiveblocksProvider from "@liveblocks/yjs"
import CardDescriptionEditor from "./CardDescriptionEditor"

export default function CardDescription() {
  const { cardId } = useParams()
  const room = useRoom()
  const userInfo = useSelf((userInfo) => userInfo.info)

  const [doc, setDoc] = useState<Y.Doc | null>(null)
  const [provider, setProvider] = useState<LiveblocksProvider<
    any,
    any,
    any,
    any
  > | null>(null)

  useEffect(() => {
    const yDoc = new Y.Doc()
    const yProvider = new LiveblocksProvider(room, yDoc)

    setDoc(yDoc)
    setProvider(yProvider)

    return () => {
      yDoc.destroy()
      yProvider.destroy()
    }
  }, [room])

  if (!doc || !provider || !userInfo) {
    return null
  }

  return (
    <div>
      <CardDescriptionEditor
        doc={doc}
        provider={provider}
        cardId={cardId.toString()}
        userInfo={userInfo}
      />
    </div>
  )
}
