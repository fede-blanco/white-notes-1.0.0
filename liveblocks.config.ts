import { LiveList, LiveObject, createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  authEndpoint: "/api/liveblocks-auth",
  throttle: 100,
  resolveUsers: async ({ userIds }) => {
    const params = new URLSearchParams(userIds.map(id => ['ids', id]));
    const response = await fetch(`/api/users?` + params.toString())
    return await response.json()
  },
  resolveMentionSuggestions: async ({text}) => {
    const response = await fetch(`/api/users?search=${text}`)
    const users = await response.json()
    return users.map((user:UserMeta) => user.id)
  }
});

export type Presence = {
  boardId?: string|null;
  cardId?: string|null;
};

export type Column = {
  name: string;
  id: string;
  index: number;
}

export type Card = {
  name: string;
  id: string;
  index: number;
  columnId: string;
}

type Storage = {
  columns: LiveList<LiveObject<Column>>
  cards: LiveList<LiveObject<Card>>

};

type UserMeta = {
  id?: string, 
  info?: {
    name: string,
    email: string,
    image: string
  }, 
};

type RoomEvent = {};


// each thread. Can only contain booleans, strings, and numbers.
export type ThreadMetadata = {
  cardId: string;
};

export const {
  RoomProvider,
  useMyPresence,
  useUpdateMyPresence,
  useStorage,
  useMutation,
  useRoom,
  useSelf,
  useThreads,
  useOthers,
  /* ...all the other hooks you’re using... */
} = createRoomContext<
  Presence,
  Storage,
  UserMeta,
  RoomEvent,
  ThreadMetadata
>(client);
