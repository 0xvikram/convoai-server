'use client'
import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import Pusher from 'pusher-js'
import { Sparkles, Send, Activity, MessageSquareHeart, ChevronRight, Wand2 } from 'lucide-react'

interface Message {
  role: 'a' | 'b'
  text: string
  timestamp: number
}

interface Room {
  roomId: string
  userA: { name: string; age: number; interests: string[] }
  userB: { name: string; age: number; interests: string[] }
  goal: string
}

interface AIUpdate {
  suggestions?: string[]
  followUp?: string
  score?: {
    status: 'engaging' | 'one-sided' | 'dying'
    reason: string
    tip: string
  }
}

export default function ChatPage({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = React.use(params)
  const searchParams = useSearchParams()
  const userRole = searchParams.get('user') as 'a' | 'b' || 'a'

  const [room, setRoom] = useState<Room | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [loading, setLoading] = useState(true)
  const [aiEnabled, setAiEnabled] = useState(false)
  const [aiData, setAiData] = useState<AIUpdate | null>(null)
  const [rewriting, setRewriting] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 1. Fetch Room Data
    const fetchRoom = async () => {
      try {
        const res = await fetch(`/api/rooms/${roomId}`)
        if (res.ok) {
          const data = await res.json()
          setRoom(data)
          if (data.messages) setMessages(data.messages)
        }
      } catch (err) {
        console.error('Failed to load room:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchRoom()

    // 2. Setup Pusher
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!
    })

    const channel = pusher.subscribe(`room-${roomId}`)

    channel.bind('new-message', (data: Message) => {
      setMessages(prev => [...prev, data])
    })

    channel.bind(`ai-update-${userRole}`, (data: AIUpdate) => {
      setAiData(data)
    })

    return () => {
      channel.unbind_all()
      channel.unsubscribe()
      pusher.disconnect()
    }
  }, [roomId, userRole])

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputText.trim()) return

    const textToSend = inputText.trim()
    setInputText('')

    try {
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId: roomId,
          role: userRole,
          text: textToSend
        })
      })
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  const handleRewrite = async (tone: string) => {
    if (!inputText.trim() || !room) return
    setRewriting(true)

    try {
      const res = await fetch('/api/rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: inputText,
          tone,
          userA: room.userA,
          userB: room.userB,
          conversation: messages
        })
      })
      const data = await res.json()
      if (data.rewritten) {
        setInputText(data.rewritten)
      }
    } catch (error) {
      console.error('Failed to rewrite message:', error)
    } finally {
      setRewriting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin" />
      </div>
    )
  }

  if (!room) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center">
        <p className="text-gray-400">Room not found</p>
      </div>
    )
  }

  const me = userRole === 'a' ? room.userA : room.userB
  const them = userRole === 'a' ? room.userB : room.userA

  const scoreColor =
    aiData?.score?.status === 'engaging' ? 'text-green-400 bg-green-400/10 border-green-400/20' :
      aiData?.score?.status === 'one-sided' ? 'text-orange-400 bg-orange-400/10 border-orange-400/20' :
        aiData?.score?.status === 'dying' ? 'text-red-400 bg-red-400/10 border-red-400/20' :
          'text-gray-400 bg-white/5 border-white/10'

  return (
    <div className="min-h-screen flex bg-black text-white overflow-hidden selection:bg-indigo-500/30">

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative w-full max-w-3xl border-r border-white/5 mx-auto bg-[#0A0A0A]">

        {/* Header */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-6 bg-[#0A0A0A]/80 backdrop-blur-md z-10 sticky top-0 shrink-0">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-gray-800 to-gray-700 flex items-center justify-center text-xl font-medium shadow-inner">
                {them.name[0]}
              </div>
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-[#0A0A0A] rounded-full" />
            </div>
            <div>
              <h1 className="font-semibold text-lg leading-tight flex items-center gap-2">
                {them.name}, <span className="text-gray-400 font-normal">{them.age}</span>
              </h1>
              <p className="text-xs text-gray-500 max-w-[200px] truncate md:max-w-md">
                {them.interests.join(' • ')}
              </p>
            </div>
          </div>

          <button
            onClick={() => setAiEnabled(!aiEnabled)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 font-medium text-sm group ${aiEnabled
              ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 border border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.15)]'
              : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5'
              }`}
          >
            <Sparkles className={`w-4 h-4 transition-transform duration-500 ${aiEnabled ? 'scale-110 text-indigo-400' : ''}`} />
            <span className="hidden sm:inline">AI Co-Pilot {aiEnabled ? 'On' : 'Off'}</span>
          </button>
        </header>

        {/* Message Thread */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col relative z-0">
          {messages.length === 0 ? (
            <div className="my-auto text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-3xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4">
                <MessageSquareHeart className="w-8 h-8" />
              </div>
              <p className="text-gray-400 font-medium">You matched with {them.name}!</p>
              <p className="text-sm text-gray-500 mt-1 max-w-sm">Goal: {room.goal}</p>
            </div>
          ) : (
            messages.map((msg, i) => {
              const isMe = msg.role === userRole
              return (
                <div key={i} className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                  <div className={`max-w-[75%] md:max-w-[65%] rounded-2xl px-5 py-3.5 text-[0.95rem] leading-relaxed shadow-sm ${isMe
                    ? 'bg-indigo-600 text-white rounded-br-sm'
                    : 'bg-white/10 text-gray-100 rounded-bl-sm border border-white/5'
                    }`}>
                    {msg.text}
                  </div>
                </div>
              )
            })
          )}
          <div ref={messagesEndRef} className="h-1 shrink-0" />
        </main>

        {/* Input Area */}
        <div className="p-4 bg-[#0A0A0A] border-t border-white/5 relative z-10 shrink-0">
          <form onSubmit={handleSendMessage} className="relative flex items-end overflow-hidden rounded-2xl bg-white/5 border border-white/10 transition-colors focus-within:bg-white/10 focus-within:border-white/20">
            <textarea
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage(e)
                }
              }}
              placeholder={`Message ${them.name}...`}
              className="w-full bg-transparent p-4 min-h-[56px] max-h-32 resize-none outline-none text-sm leading-relaxed"
              rows={1}
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="m-2 p-2 rounded-xl bg-indigo-500 text-white disabled:opacity-50 disabled:bg-white/10 hover:bg-indigo-600 transition-colors shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>

      {/* Floating Glass AI Co-Pilot Panel */}
      <div
        className={`fixed top-24 right-4 md:right-8 w-80 lg:w-96 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl p-6 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] z-50 overflow-hidden flex flex-col gap-6
          ${aiEnabled ? 'opacity-100 translate-y-0 pointer-events-auto scale-100' : 'opacity-0 translate-y-8 pointer-events-none scale-95'}
        `}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none" />

        {/* Health Tracker */}
        <div className="relative">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Activity className="w-3.5 h-3.5" /> Room Health
          </h3>
          <div className={`p-4 rounded-2xl border ${scoreColor} transition-colors duration-500`}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold capitalize text-sm">{aiData?.score?.status || 'Analyzing...'}</span>
              {aiData?.score?.status && <div className="w-2 h-2 rounded-full bg-current animate-pulse" />}
            </div>
            <p className="text-xs opacity-80 leading-relaxed">{aiData?.score?.reason || 'Say hello to start the analysis.'}</p>
            {aiData?.score?.tip && (
              <p className="text-[11px] mt-3 pt-3 border-t border-current/20 font-medium">Tip: {aiData.score.tip}</p>
            )}
          </div>
        </div>

        {/* AI Suggestions (if no input) */}
        {!inputText.trim() && (
          <div className="relative animate-in slide-in-from-right-4 fade-in duration-300">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> What to say next
            </h3>
            {aiData?.suggestions ? (
              <div className="space-y-2">
                {aiData.suggestions.map((sugg, i) => (
                  <button
                    key={i}
                    onClick={() => setInputText(sugg)}
                    className="w-full text-left p-3 rounded-xl bg-white/5 border border-white/5 hover:border-indigo-500/50 hover:bg-white/10 transition-all text-sm group"
                  >
                    <p className="line-clamp-2 text-gray-200">{sugg}</p>
                    <div className="flex items-center gap-1 mt-2 text-indigo-400 text-[10px] uppercase font-bold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                      Use this <ChevronRight className="w-3 h-3" />
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-xl border border-dashed border-white/10 text-center">
                <p className="text-xs text-gray-500">Wait for responses to get intelligent suggestions</p>
              </div>
            )}
          </div>
        )}

        {/* Tone Rewriter (if user started typing) */}
        {inputText.trim() && (
          <div className="relative animate-in slide-in-from-left-4 fade-in duration-300">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center justify-between">
              <span className="flex items-center gap-2"><Wand2 className="w-3.5 h-3.5" /> Enhance Tone</span>
              {rewriting && <div className="w-3 h-3 border-2 border-indigo-400/30 border-t-indigo-400 rounded-full animate-spin" />}
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Improve', 'Funnier', 'Deeper', 'Flirty', 'Confident'].map((tone) => (
                <button
                  key={tone}
                  onClick={() => !rewriting && handleRewrite(tone.toLowerCase())}
                  disabled={rewriting}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 border border-white/10 hover:bg-indigo-500/20 hover:border-indigo-500/40 hover:text-indigo-300 transition-all disabled:opacity-50"
                >
                  {tone}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-gray-500 mt-3 pt-3 border-t border-white/5">
              Click a tone to automagically rewrite your drafted message above.
            </p>
          </div>
        )}

        {/* Branding Footer */}
        <div className="mt-auto pt-4 flex justify-center items-center gap-1.5 opacity-50 relative">
          <Sparkles className="w-3 h-3 text-indigo-400" />
          <span className="text-[10px] font-medium tracking-widest text-gray-400 uppercase">Powered by ConvoAI</span>
        </div>
      </div>
    </div>
  )
}
