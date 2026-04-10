'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Copy, CheckCircle2, ChevronDown } from 'lucide-react'

interface UserProfileInput {
  name: string
  age: string
  interestInput: string
  interests: string[]
}

export default function SetupPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [goal, setGoal] = useState('Casual')
  const [modalOpen, setModalOpen] = useState(false)
  const [roomData, setRoomData] = useState<{ roomId: string } | null>(null)
  const [copied, setCopied] = useState(false)

  const [userA, setUserA] = useState<UserProfileInput>({
    name: 'Sarah',
    age: '24',
    interestInput: '',
    interests: ['Coffee', 'Photography', 'Dogs']
  })

  const [userB, setUserB] = useState<UserProfileInput>({
    name: 'Alex',
    age: '26',
    interestInput: '',
    interests: ['Hiking', 'Tech', 'Coffee']
  })

  const handleAddInterest = (
    e: React.KeyboardEvent<HTMLInputElement>,
    userType: 'A' | 'B',
    state: UserProfileInput,
    setState: React.Dispatch<React.SetStateAction<UserProfileInput>>
  ) => {
    if (e.key === 'Enter' && state.interestInput.trim()) {
      e.preventDefault()
      setState({
        ...state,
        interests: [...state.interests, state.interestInput.trim()],
        interestInput: ''
      })
    }
  }

  const removeInterest = (
    index: number,
    state: UserProfileInput,
    setState: React.Dispatch<React.SetStateAction<UserProfileInput>>
  ) => {
    setState({
      ...state,
      interests: state.interests.filter((_, i) => i !== index)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userA: {
            name: userA.name,
            age: parseInt(userA.age) || 25,
            interests: userA.interests
          },
          userB: {
            name: userB.name,
            age: parseInt(userB.age) || 25,
            interests: userB.interests
          },
          goal
        })
      })
      const data = await res.json()

      if (data.roomId) {
        setRoomData(data)
        setModalOpen(true)
        // Note: The prompt instructed to automatically open user A in current tab, 
        // but we're showing a modal so they can copy the link for user B first.
        // We will put a "Begin Session" button in the modal.
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    if (!roomData) return
    const url = `${window.location.origin}/chat/${roomData.roomId}?user=b`
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const startSession = () => {
    if (roomData) {
      router.push(`/chat/${roomData.roomId}?user=a`)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center p-6 selection:bg-indigo-500/30">
      
      {/* Background flare */}
      <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl w-full z-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Configure Demo Session</h1>
          <p className="text-gray-400">Set up two user profiles to simulate a live chat experience.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* User A */}
            <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-indigo-500 text-xs flex items-center justify-center text-white">A</div>
                Profile A (You)
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Name</label>
                  <input 
                    required
                    type="text" 
                    value={userA.name}
                    onChange={e => setUserA({ ...userA, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium placeholder:text-white/20" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Age</label>
                  <input 
                    required
                    type="number" 
                    value={userA.age}
                    onChange={e => setUserA({ ...userA, age: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium placeholder:text-white/20" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1 flex justify-between">
                    Interests 
                    <span className="text-[10px] bg-white/10 px-1.5 rounded">Press Enter</span>
                  </label>
                  <input 
                    type="text" 
                    value={userA.interestInput}
                    onChange={e => setUserA({ ...userA, interestInput: e.target.value })}
                    onKeyDown={e => handleAddInterest(e, 'A', userA, setUserA)}
                    placeholder="Add an interest..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium placeholder:text-white/20 mb-2" 
                  />
                  <div className="flex flex-wrap gap-2">
                    {userA.interests.map((interest, i) => (
                      <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-medium border border-indigo-500/20">
                        {interest}
                        <button type="button" onClick={() => removeInterest(i, userA, setUserA)} className="hover:text-white ml-1">&times;</button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* User B */}
            <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl relative">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-pink-500 text-xs flex items-center justify-center text-white">B</div>
                Profile B (Them)
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Name</label>
                  <input 
                    required
                    type="text" 
                    value={userB.name}
                    onChange={e => setUserB({ ...userB, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all font-medium placeholder:text-white/20" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Age</label>
                  <input 
                    required
                    type="number" 
                    value={userB.age}
                    onChange={e => setUserB({ ...userB, age: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all font-medium placeholder:text-white/20" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1 flex justify-between">
                    Interests 
                    <span className="text-[10px] bg-white/10 px-1.5 rounded">Press Enter</span>
                  </label>
                  <input 
                    type="text" 
                    value={userB.interestInput}
                    onChange={e => setUserB({ ...userB, interestInput: e.target.value })}
                    onKeyDown={e => handleAddInterest(e, 'B', userB, setUserB)}
                    placeholder="Add an interest..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all font-medium placeholder:text-white/20 mb-2" 
                  />
                  <div className="flex flex-wrap gap-2">
                    {userB.interests.map((interest, i) => (
                      <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-pink-500/20 text-pink-300 text-xs font-medium border border-pink-500/20">
                        {interest}
                        <button type="button" onClick={() => removeInterest(i, userB, setUserB)} className="hover:text-white ml-1">&times;</button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
          </div>

          <div className="max-w-sm mx-auto">
             <label className="block text-center text-sm font-medium text-gray-400 mb-3">Conversation Goal</label>
             <div className="relative">
                <select 
                  value={goal}
                  onChange={e => setGoal(e.target.value)}
                  className="w-full appearance-none bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                >
                  <option value="Casual">Casual Chat</option>
                  <option value="Deep Connection">Deep Connection</option>
                  <option value="Plan a Date">Plan a Date</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
             </div>
          </div>

          <div className="flex justify-center pt-4">
            <button 
              type="submit" 
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-gray-100 transition-all active:scale-95 min-w-[200px]"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  Start Session <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Share Modal */}
      {modalOpen && roomData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-[#111] border border-white/10 shadow-2xl rounded-3xl max-w-md w-full p-8 text-center">
            <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Session Ready!</h3>
            <p className="text-gray-400 text-sm mb-6">
              To test the SDK properly, open the secondary link in a different browser, incognito window, or mobile device.
            </p>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8">
              <p className="text-xs text-gray-500 font-medium mb-2 uppercase tracking-wider text-left">Link for Profile B</p>
              <div className="flex items-center gap-2">
                <input 
                  readOnly 
                  onClick={(e) => (e.target as HTMLInputElement).select()}
                  value={`${window.location.origin}/chat/${roomData.roomId}?user=b`}
                  className="flex-1 bg-black/50 overflow-hidden border border-white/5 rounded-lg px-3 py-2 text-xs font-mono text-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button 
                  type="button" 
                  onClick={copyToClipboard}
                  className="px-3 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-colors flex items-center justify-center shrink-0"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button 
              onClick={startSession}
              className="w-full py-4 rounded-xl bg-white text-black font-semibold hover:bg-gray-100 transition-all text-sm"
            >
              Enter Chat as Profile A
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
