import Link from 'next/link'
import { Sparkles, ArrowLeft, Terminal, Cpu, Zap, Lock, Users, MessageSquareHeart } from 'lucide-react'

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
      {/* Navigation */}
      <nav className="w-full fixed top-0 border-b border-white/10 bg-black/60 backdrop-blur-xl z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span className="font-bold text-lg tracking-tight">ConvoAI Docs</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-24 flex gap-12">
        {/* Sidebar */}
        <aside className="w-64 hidden md:block shrink-0 pt-8 sticky top-24 h-max">
          <div className="space-y-8">
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Getting Started</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#quickstart" className="hover:text-white transition-colors">Quickstart</a></li>
                <li><a href="#architecture" className="hover:text-white transition-colors">Architecture</a></li>
                <li><a href="#authentication" className="hover:text-white transition-colors">Authentication</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Core Concepts</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#rooms" className="hover:text-white transition-colors">Rooms & Users</a></li>
                <li><a href="#messaging" className="hover:text-white transition-colors">Real-time Messaging</a></li>
                <li><a href="#suggestions" className="hover:text-white transition-colors">AI Suggestions</a></li>
                <li><a href="#rewrites" className="hover:text-white transition-colors">Tone Rewriter</a></li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 max-w-3xl pt-8 space-y-16">
          
          <section id="quickstart">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-4xl font-bold">Quickstart</h1>
              <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">SDK Coming Soon</span>
            </div>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Integrate the ConvoAI intelligence layer into your dating platform in minutes. We use Pusher for low-latency WebSockets and REST APIs for immutable actions.
            </p>

            <div className="backdrop-blur-md bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden mb-8 shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
              <div className="flex items-center px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                <Terminal className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-sm font-mono text-gray-400">Terminal</span>
              </div>
              <div className="p-4 overflow-x-auto text-sm font-mono text-gray-300">
                <code>npm install convoai-sdk pusher-js</code>
              </div>
            </div>
          </section>

          <section id="architecture">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-indigo-400" /> Architecture
            </h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              ConvoAI operates as a headless communication and AI engine. You maintain your frontend UI, while we supply the live messaging pipeline and the LLM evaluators.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="p-5 rounded-xl border border-white/10 backdrop-blur-md bg-white/[0.02] shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
                <h3 className="font-semibold mb-2">1. The REST APIs</h3>
                <p className="text-sm text-gray-500">Used for creating rooms (`/api/rooms`), sending messages (`/api/messages`), and triggering explicit AI actions like rewrites.</p>
              </div>
              <div className="p-5 rounded-xl border border-white/10 backdrop-blur-md bg-white/[0.02] shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
                <h3 className="font-semibold mb-2">2. The Websocket (Pusher)</h3>
                <p className="text-sm text-gray-500">Used for receiving inbound messages (`new-message`) and passive live AI updates (`ai-update-a`) with zero polling.</p>
              </div>
            </div>
          </section>

          <section id="rooms">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-400" /> Rooms & Users
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Every conversation happens inside a dedicated Room. A Room binds two user profiles with a specific conversation context or Goal. 
              Always establish a session via `POST /api/rooms` before securely connecting WebSockets.
            </p>
          </section>

          <section id="messaging">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-400" /> Sending Messages & AI Triggers
            </h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              When a user sends a message, POST it to our backend. ConvoAI automatically evaluates the new conversation state, generates suggestions for both users, updates the health score, and syncs everything via Pusher.
            </p>

            <div className="backdrop-blur-md bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden mb-8 shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
              <div className="p-4 overflow-x-auto text-sm font-mono leading-relaxed">
                <span className="text-pink-400">await</span> fetch(<span className="text-green-300">'/api/messages'</span>, {'{'}
                <br/>  method: <span className="text-green-300">'POST'</span>,
                <br/>  body: <span className="text-indigo-300">JSON</span>.stringify({'{'}
                <br/>    roomId: <span className="text-green-300">'ROOM_123'</span>,
                <br/>    role: <span className="text-green-300">'a'</span>,
                <br/>    text: <span className="text-green-300">'Hey, love the hiking photo! Where was that?'</span>
                <br/>  {'}'})
                <br/>{'}'})
              </div>
            </div>
            
            <p className="text-gray-400 text-sm p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
              <strong className="text-white">Magic behind the scenes:</strong> This single API call automatically fires the `new-message` event to update the chat UI, whilst simultaneously parallel-processing the LLM to trigger `ai-update-a` and `ai-update-b` via Websockets.
            </p>
          </section>

          <section id="suggestions">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" /> Listening to AI Updates
            </h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              To inject the AI Co-Pilot into your app, simply securely subscribe the client to their specific private channel. They will instantly receive fresh data every time the chat updates.
            </p>

            <div className="backdrop-blur-md bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden mb-8 shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
              <div className="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-gray-300">
                <span className="text-gray-500">// Initialize client</span>
                <br/>
                <span className="text-pink-400">const</span> pusher = <span className="text-pink-400">new</span> Pusher(<span className="text-green-300">'YOUR_KEY'</span>, {'{'} cluster: <span className="text-green-300">'us3'</span> {'}'});
                <br/><br/>
                <span className="text-pink-400">const</span> channel = pusher.subscribe(<span className="text-green-300">`room-{'${roomId}'}`</span>);
                <br/><br/>
                <span className="text-gray-500">// Listen strictly to User A's unique AI evaluations</span>
                <br/>
                channel.bind(<span className="text-green-300">'ai-update-a'</span>, (data) ={'>'} {'{'}
                <br/>  console.log(data.score.status);      <span className="text-gray-500">// "engaging" | "dying"</span>
                <br/>  console.log(data.score.tip);         <span className="text-gray-500">// "Ask about their dog."</span>
                <br/>  console.log(data.suggestions);       <span className="text-gray-500">// ["Cute dog!", "What breed?"]</span>
                <br/>{'}'});
              </div>
            </div>
          </section>

          <section id="rewrites">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <MessageSquareHeart className="w-5 h-5 text-indigo-400" /> Tone Rewriter
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              When your user drafts a message, expose our Rewriter API to let them adjust the tone. Post the current draft alongside recent conversation context to `/api/rewrite`. Our proprietary engine will instantaneously generate a funnier, deeper, or flirtier variation matching their personality.
            </p>
          </section>

          <section id="authentication">
            <div className="p-6 rounded-2xl border border-white/10 backdrop-blur-md bg-white/[0.02] shadow-[0_8px_30px_rgb(0,0,0,0.5)] flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5 text-gray-400" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Ready for Production?</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  This demo uses public channels for demonstration purposes. In a real-world dating application, you must use Pusher Presence or Private channels along with robust JWT authentication to ensure users can only subscribe to rooms they belong to.
                </p>
                <button className="px-4 py-2 rounded-lg backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 transition-all text-sm font-medium inline-flex items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                  Read Auth Guide <ArrowLeft className="w-3 h-3 rotate-180" />
                </button>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  )
}
