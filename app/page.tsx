import Link from 'next/link';
import { ArrowRight, Sparkles, MessageSquareHeart, Activity } from 'lucide-react';
// import RotatingText from '@/components/RotatingText';
import BorderGlow from '@/components/BorderGlow';
import LightRays from '@/components/LightRays';
import FaqItem from '@/components/FaqItem';
import LaserFlow from '@/components/LaserFlow';
import CurvedLoop from '@/components/CurvedLoop';
import ShinyText from '@/components/ShinyText';
import ElectricBorder from '@/components/ElectricBorder';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
      {/* Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[800px] border border-white/10 bg-white/5 backdrop-blur-2xl rounded-full z-50 shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
        <div className="px-6 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">ConvoAI</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium text-gray-400 hover:text-white transition-colors hidden sm:block">Features</Link>
            <Link href="#pricing" className="text-sm font-medium text-gray-400 hover:text-white transition-colors hidden sm:block">Pricing</Link>
            <Link href="/docs" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Docs</Link>
            <Link href="/setup">
              <ElectricBorder color="#a855f7" speed={1.5} className="ml-2">
                <div className="text-sm font-medium px-5 py-2 text-white transition-all hover:bg-white/5 rounded-full z-10 w-full h-full flex items-center justify-center">
                  See it live
                </div>
              </ElectricBorder>
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24 relative overflow-hidden">
        {/* Light Rays Background */}
        <div className="absolute inset-x-0 top-0 h-[800px] pointer-events-none z-0">
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={1.5}
            lightSpread={0.7}
            rayLength={3}
            followMouse={true}
            mouseInfluence={0.05}
            fadeDistance={1}
            saturation={0.4}
          />
        </div>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 text-center space-y-8 py-20 relative z-10">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[120px] -z-10" />

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">
            <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider">Beta</span>
            <span className="flex h-1 w-1 rounded-full bg-gray-600 mx-1"></span>
            The missing layer for dating platforms
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl mx-auto leading-tight">
            Users match. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">Conversations die.</span> <br />
            <ShinyText
              text="Dates never happen."
              color="#a855f7"
              shineColor="#ffffff"
              speed={2}
              className="drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]"
            />
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Fix the "hey" problem natively. ConvoAI is a frictionless, real-time AI conversation intelligence layer that plugs right into your app.
          </p>

          <div className="flex justify-center gap-4 pt-4">
            <Link
              href="/setup"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
            >
              See it live <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-md bg-white/5 text-white font-medium hover:bg-white/10 transition-colors border border-white/10"
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
            <BorderGlow borderRadius={24} glowRadius={250} backgroundColor="transparent" colors={['#8b5cf6', '#d946ef', '#f43f5e']} className="p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group relative shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Contextual Suggestions</h3>
              <p className="text-gray-400 leading-relaxed">
                Appears as a floating glass overlay directly inside the chat. Synthesizes user profiles to suggest perfect follow-ups.
              </p>
            </BorderGlow>

            <BorderGlow borderRadius={24} glowRadius={250} backgroundColor="transparent" colors={['#8b5cf6', '#d946ef', '#f43f5e']} className="p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group relative shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-6">
                <MessageSquareHeart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Message Rewriter</h3>
              <p className="text-gray-400 leading-relaxed">
                Transform a boring "hi" into something funny, flirty, or deep at the tap of a button. Matches the user's natural cadence.
              </p>
            </BorderGlow>

            <BorderGlow borderRadius={24} glowRadius={250} backgroundColor="transparent" colors={['#8b5cf6', '#d946ef', '#f43f5e']} className="p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group relative shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
              <div className="w-12 h-12 rounded-2xl bg-pink-500/20 text-pink-400 flex items-center justify-center mb-6">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Health Score</h3>
              <p className="text-gray-400 leading-relaxed">
                Real-time analysis detects when a conversation goes one-sided or dying, and prompts users with actionable recovery tips.
              </p>
            </BorderGlow>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="max-w-7xl mx-auto px-6 py-32 border-t border-white/5 relative">
          <div className="text-center mb-16 flex flex-col items-center">
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-semibold tracking-wide uppercase">
              SDK Coming Soon
            </div>
            <h2 className="text-3xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-gray-400">Scale as you grow. No hidden fees.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <BorderGlow borderRadius={24} glowRadius={250} backgroundColor="transparent" colors={['#38bdf8', '#818cf8', '#c084fc']} className="p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 flex flex-col items-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
              <h3 className="text-gray-400 font-medium mb-2">Hobby</h3>
              <p className="text-4xl font-bold mb-1">Free</p>
              <p className="text-sm text-gray-500 mb-6">500 calls/month</p>
              <button className="w-full py-2 rounded-full backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-medium mt-auto">
                Get Started
              </button>
            </BorderGlow>

            <BorderGlow borderRadius={24} glowRadius={250} backgroundColor="transparent" colors={['#6366f1', '#a855f7', '#ec4899']} glowIntensity={1.5} className="p-8 rounded-3xl backdrop-blur-xl bg-indigo-500/10 border border-indigo-500/30 flex flex-col items-center text-center relative overflow-hidden shadow-[0_8px_30px_rgba(99,102,241,0.2)]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[50px] rounded-full" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />
              <h3 className="text-indigo-400 font-medium mb-2">Starter</h3>
              <p className="text-4xl font-bold mb-1">$49<span className="text-lg text-gray-500 font-normal">/mo</span></p>
              <p className="text-sm text-gray-500 mb-6">10,000 calls/month</p>
              <button className="w-full py-2 rounded-full backdrop-blur-md bg-indigo-500 border border-indigo-400 hover:bg-indigo-600 transition-all text-sm font-medium mt-auto text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                Subscribe
              </button>
            </BorderGlow>

            <BorderGlow borderRadius={24} glowRadius={250} backgroundColor="transparent" colors={['#38bdf8', '#818cf8', '#c084fc']} className="p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 flex flex-col items-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
              <h3 className="text-gray-400 font-medium mb-2">Growth</h3>
              <p className="text-4xl font-bold mb-1">$199<span className="text-lg text-gray-500 font-normal">/mo</span></p>
              <p className="text-sm text-gray-500 mb-6">100,000 calls/month</p>
              <button className="w-full py-2 rounded-full backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-medium mt-auto">
                Subscribe
              </button>
            </BorderGlow>

            <BorderGlow borderRadius={24} glowRadius={250} backgroundColor="transparent" colors={['#38bdf8', '#818cf8', '#c084fc']} className="p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 flex flex-col items-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
              <h3 className="text-gray-400 font-medium mb-2">Enterprise</h3>
              <p className="text-4xl font-bold mb-1">Custom</p>
              <p className="text-sm text-gray-500 mb-6">Unlimited volume</p>
              <button className="w-full py-2 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all text-sm font-medium mt-auto shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                Contact Sales
              </button>
            </BorderGlow>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="max-w-4xl mx-auto px-6 py-32 border-t border-white/5 relative">
          <LaserFlow
            color="#CF9EFF"
            className="-right-[150px] bottom-[calc(100%-1px)]"
            style={{ opacity: 0.6 }}
          />
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-400">Everything you need to know about integrating ConvoAI.</p>
          </div>

          <div className="space-y-4">
            <FaqItem
              question="How easy is it to integrate ConvoAI?"
              answer="Integration takes just a few minutes. You simply need to plug our backend REST APIs into your server and use our WebSocket channels on your frontend. We provide detailed documentation to get you up and running swiftly."
            />
            <FaqItem
              question="Does ConvoAI work with any dating platform?"
              answer="Yes! ConvoAI is designed to be completely platform-agnostic. It functions as a headless AI engine running in the background while you maintain full control over your frontend UI and user experience."
            />
            <FaqItem
              question="Are user conversations private and secure?"
              answer="Absolutely. Data privacy is our top priority. We evaluate conversation data transiently. For production builds, our architecture is fully compatible with secure Pusher Private/Presence channels and strict JWT authentication."
            />
            <FaqItem
              question="Can I customize the Tone Rewriter options?"
              answer="Currently, we offer highly optimized core tones: Flirty, Funny, and Deep. On our Enterprise tier, you can deploy custom system prompts and models tailored precisely to your application's unique user demographic."
            />
          </div>
        </section>

        {/* Dynamic Curved Footer Marquee */}
        <div className="relative border-t border-white/5 bg-black z-20 h-[100px] md:h-[150px] pt-6 flex items-center">
          <CurvedLoop
            marqueeText=" ConvoAI ✦ Turn dead air into dates ✦"
            speed={1.5}
            curveAmount={150}
            direction="left"
            interactive={true}
          />
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-6 md:py-8 relative z-30 bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span className="font-semibold text-gray-300">ConvoAI</span>
          </div>

          <div className="text-sm text-gray-400">
            Made with ☕ and desperation by  <a href="https://github.com/0xvikram" target="_blank" rel="noopener noreferrer" className="text-white hover:text-indigo-400 transition-colors font-medium">Vikram (Still single)</a>
          </div>

          <p className="text-sm text-gray-500">© 2026 ConvoAI. Supercharging Romance.</p>
        </div>
      </footer>
    </div>
  )
}
