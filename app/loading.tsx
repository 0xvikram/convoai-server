import LightRays from '@/components/LightRays';
import { Sparkles } from 'lucide-react';

export default function Loading() {
  return (
    <div className="fixed inset-0 min-h-screen bg-black flex flex-col items-center justify-center z-[100] overflow-hidden">
      {/* Light Rays Background shining from the top */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={2}
          lightSpread={0.8}
          rayLength={3}
          followMouse={false}
          className="w-full h-full"
          fadeDistance={1}
          saturation={0.5}
        />
      </div>
      
      {/* Loading Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 animate-pulse">
        <div className="relative flex items-center justify-center">
            {/* Outer spinning ring */}
            <div className="absolute inset-0 w-24 h-24 border-t-2 border-indigo-500 rounded-full animate-spin"></div>
            {/* Outer spinning ring 2 */}
            <div className="absolute inset-0 w-24 h-24 border-r-2 border-purple-500 rounded-full animate-spin animation-delay-200" style={{ animationDirection: 'reverse' }}></div>
            {/* Inner Logo */}
            <div className="w-16 h-16 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                <Sparkles className="w-8 h-8 text-white" />
            </div>
        </div>
        <div className="flex flex-col items-center gap-1">
            <span className="font-bold text-xl tracking-tight text-white">ConvoAI</span>
            <p className="text-gray-500 text-xs tracking-[0.2em] uppercase font-medium">Initializing</p>
        </div>
      </div>
    </div>
  );
}
