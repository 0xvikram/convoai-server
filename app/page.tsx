import Link from 'next/link';
import { ArrowRight, Sparkles, MessageSquareHeart, Activity } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-indigo-500/30">
      {/* Navigation */}
      <nav className="w-full fixed top-0 border-b border-white/5 bg-[#0A0A0A]/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">ConvoAI</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">Features</Link>
            <Link href="#pricing" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</Link>
            <Link 
              href="/setup" 
              className="text-sm font-medium px-4 py-2 rounded-full bg-white text-black hover:bg-gray-100 transition-colors"
            >
              See it live
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 text-center space-y-8 py-20 relative">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[120px] -z-10" />

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500"></span>
            The missing layer for dating platforms
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl mx-auto leading-tight">
            Users match. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">Conversations die.</span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Dates never happen.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Fix the "hey" problem natively. ConvoAI is a frictionless, real-time AI conversation intelligence layer that plugs right into your app.
          </p>

          <div className="flex justify-center gap-4 pt-4">
            <Link 
              href="/setup" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-100 transition-all hover:scale-105 active:scale-95"
            >
              See it live <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/docs" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 text-white font-medium hover:bg-white/10 transition-colors border border-white/5"
            >
              Read Docs
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="max-w-7xl mx-auto px-6 py-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Turn dead air into dates</h2>
            <p className="text-gray-400">Everything needed to guarantee deep connectivity, delivered via one SDK.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Contextual Suggestions</h3>
              <p className="text-gray-400 leading-relaxed">
                Appears as a floating glass overlay directly inside the chat. Synthesizes user profiles to suggest perfect follow-ups.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-6">
                <MessageSquareHeart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Message Rewriter</h3>
              <p className="text-gray-400 leading-relaxed">
                Transform a boring "hi" into something funny, flirty, or deep at the tap of a button. Matches the user's natural cadence.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-pink-500/20 text-pink-400 flex items-center justify-center mb-6">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Health Score</h3>
              <p className="text-gray-400 leading-relaxed">
                Real-time analysis detects when a conversation goes one-sided or dying, and prompts users with actionable recovery tips.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="max-w-7xl mx-auto px-6 py-32 border-t border-white/5">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-gray-400">Scale as you grow. No hidden fees.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 flex flex-col items-center text-center">
              <h3 className="text-gray-400 font-medium mb-2">Hobby</h3>
              <p className="text-4xl font-bold mb-1">Free</p>
              <p className="text-sm text-gray-500 mb-6">500 calls/month</p>
              <button className="w-full py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium mt-auto">
                Get Started
              </button>
            </div>

            <div className="p-8 rounded-3xl bg-indigo-500/[0.05] border border-indigo-500/20 flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[50px] rounded-full" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />
              <h3 className="text-indigo-400 font-medium mb-2">Starter</h3>
              <p className="text-4xl font-bold mb-1">$49<span className="text-lg text-gray-500 font-normal">/mo</span></p>
              <p className="text-sm text-gray-500 mb-6">10,000 calls/month</p>
              <button className="w-full py-2 rounded-full bg-indigo-500 hover:bg-indigo-600 transition-colors text-sm font-medium mt-auto">
                Subscribe
              </button>
            </div>

            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 flex flex-col items-center text-center">
              <h3 className="text-gray-400 font-medium mb-2">Growth</h3>
              <p className="text-4xl font-bold mb-1">$199<span className="text-lg text-gray-500 font-normal">/mo</span></p>
              <p className="text-sm text-gray-500 mb-6">100,000 calls/month</p>
              <button className="w-full py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium mt-auto">
                Subscribe
              </button>
            </div>

            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 flex flex-col items-center text-center">
              <h3 className="text-gray-400 font-medium mb-2">Enterprise</h3>
              <p className="text-4xl font-bold mb-1">Custom</p>
              <p className="text-sm text-gray-500 mb-6">Unlimited volume</p>
              <button className="w-full py-2 rounded-full bg-white text-black hover:bg-gray-100 transition-colors text-sm font-medium mt-auto">
                Contact Sales
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span className="font-semibold">ConvoAI</span>
          </div>
          <p className="text-sm text-gray-500">© 2026 ConvoAI Inc. Supercharging Romance.</p>
        </div>
      </footer>
    </div>
  )
}
