
'use server'
import { liveblocksClient } from "@/lib/liveBlocksClient";
import { getUserEmail } from "@/lib/userClient";
import { RoomInfo } from "@liveblocks/node";
import uniqid from 'uniqid';

export async function createBoard(name: string): Promise<boolean | RoomInfo> {
  const email = await getUserEmail();
  if (email) {
    const roomId = uniqid.time()
    return await liveblocksClient.createRoom(roomId, {
      defaultAccesses: [],
      usersAccesses: {
        [email]: ['room:write']
      },
      metadata: {
        boardName: name,
      }
    })
  }
  return false
}

export async function addEmailToBoard(boardId: string, email: string) {
  const room = await liveblocksClient.getRoom(boardId)
  const usersAccesses = room.usersAccesses
  usersAccesses[email] = ['room:write'];
  await liveblocksClient.updateRoom(boardId, { usersAccesses })
  return true;
}

export async function removeEmailFromBoard(boardId: string, emailToDelete: string) {
  const room = await liveblocksClient.getRoom(boardId)
  const usersAccesses: any = room.usersAccesses
  usersAccesses[emailToDelete] = null
  await liveblocksClient.updateRoom(boardId, { usersAccesses })
  return true;
}

export async function deleteBoard(boardId: string) {
  await liveblocksClient.deleteRoom(boardId);
  return true;
}

export async function updateBoard(boardId: string, updateData: any) {
  const result = await liveblocksClient.updateRoom(boardId, updateData)
  return true;
}

