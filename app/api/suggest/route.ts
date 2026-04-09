import Groq from 'groq-sdk'
import { NextRequest, NextResponse } from 'next/server'

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

export async function POST(req: NextRequest) {
  try {
    // 1. Read what the UI sent us
    const { userA, userB, conversation, goal } = await req.json()

    // 2. Build conversation history as readable text
    const conversationText = conversation
      .map((msg: { role: string; text: string }) =>
        `${msg.role === 'a' ? userA.name : userB.name}: ${msg.text}`
      )
      .join('\n')

    // 3. Build the prompt
    const prompt = `You are an AI conversation assistant for a serious dating platform.

User A: ${userA.name}, age ${userA.age}, interests: ${userA.interests.join(', ')}
User B: ${userB.name}, age ${userB.age}, interests: ${userB.interests.join(', ')}
Goal: ${goal}

Conversation so far:
${conversationText}

Return a JSON object with exactly this structure:
{
  "suggestions": ["reply 1", "reply 2", "reply 3"],
  "followUp": "one follow-up question",
  "score": {
    "status": "engaging" or "one-sided" or "dying",
    "reason": "one line explanation",
    "tip": "one quick improvement tip"
  }
}

Rules:
- Replies must feel natural, not generic
- Use shared interests when possible
- Match the goal tone
- Return ONLY the JSON, no extra text, no markdown backticks`

    // 4. Call Groq
    const completion = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1024
    })

    // 5. Get the response text
    const responseText = completion.choices[0]?.message?.content || ''

    // 6. Clean and parse
    const cleaned = responseText.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(cleaned)

    // 7. Send back to UI
    return NextResponse.json(parsed)

  } catch (error) {
    console.error('Suggest API error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}