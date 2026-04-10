import { NextRequest, NextResponse } from 'next/server'
import { createRoom, generateRoomId } from '@/lib/store'

export async function POST(req: NextRequest) {
  try {
    const { userA, userB, goal } = await req.json()

    // Validate required fields
    if (!userA?.name || !userB?.name) {
      return NextResponse.json(
        { error: 'Both user profiles are required' },
        { status: 400 }
      )
    }

    // Generate unique room ID
    const roomId = generateRoomId()

    // Create and store the room
    const room = createRoom(roomId, userA, userB, goal || 'deep_connection')

    // Return the room ID and both profile links
    return NextResponse.json({
      roomId,
      linkA: `/chat/${roomId}?user=a`,
      linkB: `/chat/${roomId}?user=b`,
      room
    })

  } catch (error) {
    console.error('Rooms API error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}