
import React, { useState, useRef, useEffect } from 'react';
import { getLeanAdvice } from '../services/geminiService';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const LeanAdvisor: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'مرحباً بك! أنا مستشارك في البناء الرشيق. كيف يمكنني مساعدتك اليوم في تحسين إنتاجية موقعك أو حل مشاكل الهدر؟' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    const advice = await getLeanAdvice(userMessage);
    setMessages(prev => [...prev, { role: 'assistant', content: advice }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-white rounded-2xl shadow-sm border border-slate-100">
      <div className="p-4 border-b border-slate-100 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-xl">🤖</div>
        <div>
          <h3 className="font-bold text-slate-800">مستشار Lean الذكي</h3>
          <p className="text-xs text-slate-500">مدعوم بتقنية Gemini</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-slate-100 text-slate-800 rounded-bl-none'
            }`}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-end">
            <div className="bg-slate-100 p-4 rounded-2xl rounded-bl-none animate-pulse text-slate-400 text-sm">
              جاري التفكير في حل رشيق...
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-slate-100 flex gap-2">
        <input 
          type="text"
          placeholder="مثلاً: كيف أطبق الـ 5S في مخزن الموقع؟"
          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
        />
        <button 
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition-colors disabled:opacity-50"
          disabled={isLoading}
        >
          إرسال
        </button>
      </form>
    </div>
  );
};

export default LeanAdvisor;
