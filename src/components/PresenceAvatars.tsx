import { shallow } from "@liveblocks/client"
import { Presence, useOthers } from "../../liveblocks.config"

type Props = {
  presenceKey: keyof Presence
  presenceValue: string
}

export default function PresenceAvatars({ presenceKey, presenceValue }: Props) {
  const others = useOthers((users) => {
    return users.filter((u) => u.presence?.[presenceKey] === presenceValue)
  }, shallow)

  let counter = 0
  
  return (
    <div className="flex gap-1">
      {others.map((user) => {
        counter++;
      return (        
        <div key={`${user.id}-${counter}`}>
          <img 
          className="size-8 rounded-full"
          src={user.info?.image} alt="avatar" />
        </div>
      )
})}
    </div>
  )
}

