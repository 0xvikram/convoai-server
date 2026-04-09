import Groq from 'groq-sdk'
import { NextRequest, NextResponse } from 'next/server'

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

// Each tone has its own specific instruction
const toneInstructions: Record<string, string> = {
  improve: 'Improve the clarity, warmth and emotional intelligence of this message. Make it more engaging while keeping the original intent.',
  funnier: 'Make this message funnier and more playful. Add light humour or wit without making it cringe or try-hard.',
  deeper: 'Make this message more thoughtful and emotionally deeper. Show genuine curiosity and vulnerability.',
  flirty: 'Make this message subtly flirty and charming. Keep it tasteful — no cheesy pickup lines.',
  confident: 'Rewrite this message to sound more confident and self-assured. Remove any hesitation or over-apologetic tone.'
}

export async function POST(req: NextRequest) {
  try {
    // 1. Read what the UI sent us
    const { message, tone, userA, userB, conversation } = await req.json()

    // 2. Validate tone — fall back to improve if invalid
    const toneKey = toneInstructions[tone] ? tone : 'improve'
    const instruction = toneInstructions[toneKey]

    // 3. Build conversation context (last 3 messages only — enough context, not too much)
    const recentMessages = (conversation || [])
      .slice(-3)
      .map((msg: { role: string; text: string }) =>
        `${msg.role === 'a' ? userA.name : userB.name}: ${msg.text}`
      )
      .join('\n')

    // 4. Build the prompt
    const prompt = `You are helping someone on a dating app write better messages.

User A: ${userA.name}, interests: ${userA.interests.join(', ')}
User B: ${userB.name}, interests: ${userB.interests.join(', ')}

Recent conversation:
${recentMessages || 'This is the first message'}

Original message: "${message}"

Task: ${instruction}

Rules:
- Keep it under 2 sentences
- Sound human and natural, not like AI wrote it
- Use shared interests only if it fits naturally
- Do not add emojis unless the original had them
- Do not start with "I" if the original did not

Return a JSON object with exactly this structure:
{
  "rewritten": "the improved message here",
  "explanation": "one line explaining what you changed and why"
}

Return ONLY the JSON, no extra text, no markdown backticks`

    // 5. Call Groq
    const completion = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 512
    })

    // 6. Get response text
    const responseText = completion.choices[0]?.message?.content || ''

    // 7. Clean and parse
    const cleaned = responseText.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(cleaned)

    // 8. Send back to UI
    return NextResponse.json(parsed)

  } catch (error) {
    console.error('Rewrite API error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}