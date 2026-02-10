
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { getChatSession, getFallbackResponse } from '../services/gemini';
import { GoogleGenAI } from "@google/genai";

// Audio Decoding Functions (pcm to buffer)
function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
  return bytes;
}

async function decodeAudioData(data: Uint8Array, ctx: AudioContext): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const buffer = ctx.createBuffer(1, dataInt16.length, 24000);
  const channelData = buffer.getChannelData(0);
  for (let i = 0; i < dataInt16.length; i++) channelData[i] = dataInt16[i] / 32768.0;
  return buffer;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([
    { role: 'assistant', text: "Je suis l'extension numérique de Fred. Je suis prêt à vous accompagner dans la découverte de son œuvre." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const chatSession = useMemo(() => {
    try { return getChatSession(); } catch (e) { return null; }
  }, []);

  const speakText = async (text: string) => {
    if (isSpeaking) return;
    setIsSpeaking(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
      if (!process.env.API_KEY) {
        throw new Error("API Key missing");
      }
      const response = await (ai as any).models.generateContent({
        model: "gemini-1.5-flash",
        contents: [{ parts: [{ text: `D'une voix calme et distinguée, dis : ${text}` }] }],
        config: {
          responseModalities: ["AUDIO"],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        if (!audioContextRef.current) audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        const audioBuffer = await decodeAudioData(decodeBase64(base64Audio), audioContextRef.current);
        const source = audioContextRef.current.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContextRef.current.destination);
        source.onended = () => setIsSpeaking(false);
        source.start();
      } else {
        setIsSpeaking(false);
      }
    } catch (e) {
      console.error("TTS Error:", e);
      setIsSpeaking(false);
    }
  };

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userMsg = input.trim();
    if (!userMsg || isLoading) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      let responseText = "";
      if (chatSession) {
        try {
          const result = await chatSession.sendMessage({ message: userMsg });
          responseText = result.text || "Erreur de transmission.";
        } catch (error) {
          console.error("Gemini Error:", error);
          responseText = getFallbackResponse(userMsg);
        }
      } else {
        responseText = getFallbackResponse(userMsg);
      }
      setMessages(prev => [...prev, { role: 'assistant', text: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', text: "Lien temporairement interrompu." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 ${isOpen ? 'bg-white text-black rotate-90' : 'bg-blue-600 text-white'}`}
      >
        {isOpen ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6 6 18M6 6l12 12"/></svg> : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2m16 0h2m-7-1v2m-6-2v2"/></svg>}
      </button>

      <div className={`absolute bottom-24 right-0 w-[380px] h-[600px] bg-[#020617]/95 backdrop-blur-3xl border border-slate-800 rounded-[2rem] shadow-2xl flex flex-col transition-all duration-500 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'}`}>
        <div className="p-6 border-b border-slate-800/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center"><div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div></div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-white">Extension Digitale</h4>
              <p className="text-[8px] text-slate-500 uppercase tracking-widest">Fred Marc-Owen</p>
            </div>
          </div>
        </div>
        
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
          {messages.map((msg, i) => (
            <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`max-w-[85%] p-4 text-sm font-light leading-relaxed ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-[1.2rem] rounded-tr-none' : 'bg-slate-800/40 border border-slate-700/30 text-slate-200 rounded-[1.2rem] rounded-tl-none'}`}>
                {msg.text}
              </div>
              {msg.role === 'assistant' && i === messages.length - 1 && !isLoading && (
                <button 
                  onClick={() => speakText(msg.text)} 
                  disabled={isSpeaking}
                  className="mt-2 text-[8px] uppercase tracking-widest text-blue-500 hover:text-white transition-colors flex items-center gap-1"
                >
                  {isSpeaking ? 'Lecture en cours...' : 'Écouter'}
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                </button>
              )}
            </div>
          ))}
          {isLoading && <div className="w-8 h-8 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin"></div>}
        </div>

        <form onSubmit={handleSubmit} className="p-6 border-t border-slate-800/50">
          <div className="relative flex items-center">
            <input 
              type="text" value={input} onChange={(e) => setInput(e.target.value)} 
              placeholder="Dialoguer avec l'extension..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl py-4 px-5 pr-12 focus:border-blue-600 outline-none text-sm font-light text-white"
            />
            <button type="submit" disabled={isLoading || !input.trim()} className="absolute right-3 text-slate-500 hover:text-blue-500"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m22 2-7 20-4-9-9-4ZM22 2 11 13"/></svg></button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ChatBot;