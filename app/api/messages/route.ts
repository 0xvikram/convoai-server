import { NextRequest, NextResponse } from 'next/server'
import Pusher from 'pusher'
import { getRoom, addMessage } from '@/lib/store'

// Initialize Pusher server client
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true
})

export async function POST(req: NextRequest) {
  try {
    const { roomId, role, text } = await req.json()

    // 1. Validate
    if (!roomId || !role || !text) {
      return NextResponse.json(
        { error: 'roomId, role and text are required' },
        { status: 400 }
      )
    }

    // 2. Get the room
    const room = getRoom(roomId)
    if (!room) {
      return NextResponse.json(
        { error: 'Room not found' },
        { status: 404 }
      )
    }

    // 3. Save message to memory
    const message = addMessage(roomId, role as 'a' | 'b', text)

    // 4. Broadcast message to both browsers via Pusher
    await pusher.trigger(`room-${roomId}`, 'new-message', {
      role,
      text,
      timestamp: message?.timestamp
    })

    // 5. Get AI suggestions for BOTH users in parallel
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

    const [suggestA, suggestB] = await Promise.all([
      // Suggestions for user A (what should A say next)
      fetch(`${baseUrl}/api/suggest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userA: room.userA,
          userB: room.userB,
          conversation: room.messages,
          goal: room.goal,
          perspective: 'a'
        })
      }).then(r => r.json()),

      // Suggestions for user B (what should B say next)
      fetch(`${baseUrl}/api/suggest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userA: room.userB,
          userB: room.userA,
          conversation: room.messages,
          goal: room.goal,
          perspective: 'b'
        })
      }).then(r => r.json())
    ])

    // 6. Send AI updates to each user separately
    await Promise.all([
      pusher.trigger(`room-${roomId}`, 'ai-update-a', suggestA),
      pusher.trigger(`room-${roomId}`, 'ai-update-b', suggestB)
    ])

    return NextResponse.json({ success: true, message })

  } catch (error) {
    console.error('Messages API error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}