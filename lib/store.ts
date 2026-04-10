// Types
export interface UserProfile {
  name: string
  age: number
  interests: string[]
}

export interface Message {
  role: 'a' | 'b'
  text: string
  timestamp: number
}

export interface Room {
  roomId: string
  userA: UserProfile
  userB: UserProfile
  goal: string
  messages: Message[]
  createdAt: number
}

// In-memory storage
// This lives as long as the server is running
const rooms = new Map<string, Room>()

// Create a new room
export function createRoom(
  roomId: string,
  userA: UserProfile,
  userB: UserProfile,
  goal: string
): Room {
  const room: Room = {
    roomId,
    userA,
    userB,
    goal,
    messages: [],
    createdAt: Date.now()
  }
  rooms.set(roomId, room)
  return room
}

// Get a room by ID
export function getRoom(roomId: string): Room | undefined {
  return rooms.get(roomId)
}

// Add a message to a room
export function addMessage(roomId: string, role: 'a' | 'b', text: string): Message | null {
  const room = rooms.get(roomId)
  if (!room) return null

  const message: Message = {
    role,
    text,
    timestamp: Date.now()
  }

  room.messages.push(message)
  return message
}

// Generate a random room ID
export function generateRoomId(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}