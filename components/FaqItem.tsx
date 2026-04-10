'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
      >
        <span className="font-medium text-white">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`px-6 text-gray-400 overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 pb-4 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pt-2">{answer}</div>
      </div>
    </div>
  );
}
