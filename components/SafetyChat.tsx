
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/geminiService';
import { Message } from '../types';

const SafetyChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello. I am your SDG 5 Safety Assistant. I can help you understand gender equality, provide advice on workplace discrimination, or guide you if you're experiencing harassment. How can I support you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await geminiService.getSafetyAdvice(input);
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden max-w-4xl mx-auto">
      <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-sdg-5 rounded-full flex items-center justify-center text-white">
            <i className="fa-solid fa-headset text-xs"></i>
          </div>
          <span className="font-bold text-gray-800">Support Agent</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Active Secure Session</span>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl p-4 ${
              msg.role === 'user' 
                ? 'bg-sdg-5 text-white rounded-br-none shadow-md' 
                : 'bg-gray-100 text-gray-800 rounded-bl-none'
            }`}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              <p className={`text-[10px] mt-2 opacity-60 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl p-4 rounded-bl-none">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-100 bg-white">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="w-full pl-4 pr-14 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sdg-5 outline-none transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="absolute right-2 p-2 bg-sdg-5 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
          >
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
        <p className="text-[10px] text-gray-400 text-center mt-3 uppercase font-bold">Safe & Private Conversation</p>
      </div>
    </div>
  );
};

export default SafetyChat;
