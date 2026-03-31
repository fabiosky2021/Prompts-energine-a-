import { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user'|'assistant', content: string}[]>([
    { role: 'assistant', content: 'Olá! Sou seu assistente virtual com acesso à internet. Como posso ajudar?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: input,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });
      
      const assistantMsg = { 
        role: 'assistant' as const, 
        content: response.text || 'Desculpe, não consegui encontrar uma resposta.' 
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Erro ao buscar resposta.' }]);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-primary text-black rounded-full shadow-lg z-50 hover:scale-105 transition-transform"
      >
        <MessageSquare size={24} />
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 h-96 bg-surface-container-low rounded-lg shadow-xl z-50 flex flex-col border border-outline-variant/20">
          <div className="p-4 border-b border-outline-variant/20 flex justify-between items-center">
            <h3 className="font-bold text-primary">Assistente Inteligente</h3>
            <button onClick={() => setIsOpen(false)}><X size={18} /></button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-2">
            {messages.map((m, i) => (
              <div key={i} className={`text-sm p-2 rounded ${m.role === 'user' ? 'bg-primary/20 text-right' : 'bg-surface-container-high'}`}>
                {m.content}
              </div>
            ))}
          </div>
          <div className="p-2 border-t border-outline-variant/20 flex gap-2">
            <input 
              value={input} onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-surface-container-lowest rounded p-2 text-sm"
              placeholder="Pergunte algo..."
            />
            <button onClick={handleSend} className="p-2 bg-primary rounded"><Send size={16} /></button>
          </div>
        </div>
      )}
    </>
  );
}
