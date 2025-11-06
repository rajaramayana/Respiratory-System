
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import type { SyllabusModule } from '../types';
import { ChatBubbleIcon } from './icons';

// A simple markdown to HTML converter
const markdownToHtml = (text: string) => {
    // Bold: **text** -> <strong>text</strong>
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Italics: *text* -> <em>text</em>
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // Newlines to <br>
    text = text.replace(/\n/g, '<br />');
    return text;
};

interface Message {
    role: 'user' | 'model';
    text: string;
}

interface ChatbotProps {
    moduleData: SyllabusModule | null;
}

export const Chatbot: React.FC<ChatbotProps> = ({ moduleData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    // Initialize or reset chat session when moduleData changes
    useEffect(() => {
        if (!moduleData || !moduleData.module_title) return;

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const systemInstruction = `You are GM Tutor AI, a helpful assistant for undergraduate health sciences students in Nepal. Your knowledge is based on the following JSON data for the current module: ${JSON.stringify(moduleData)}. Answer questions clearly and concisely based on this data. If the user asks something outside this context, politely state that your knowledge is limited to the provided module content. Format your responses with simple markdown (bold, italics). The current module is '${moduleData.module_title}'.`;
            
            chatRef.current = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: { systemInstruction },
            });
            
            setMessages([
                { role: 'model', text: `Hello! I'm your AI assistant for the "${moduleData.module_title}" module. How can I help you study?` }
            ]);
            setError(null);
        } catch (e) {
            console.error("Failed to initialize Gemini chat:", e);
            setError("Could not initialize the AI assistant. Please check your API key.");
            setMessages([]);
        }

    }, [moduleData]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || !chatRef.current) return;

        const userMessage: Message = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setError(null);

        try {
            const stream = await chatRef.current.sendMessageStream({ message: input });
            let modelResponse = '';
            setMessages(prev => [...prev, { role: 'model', text: '' }]); // Add empty model message
            
            for await (const chunk of stream) {
                modelResponse += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].text = modelResponse;
                    return newMessages;
                });
            }
        } catch (err) {
            console.error(err);
            setError("Sorry, I couldn't get a response. Please try again.");
            // Remove the empty model message on error
            setMessages(prev => prev.slice(0, -1));
        } finally {
            setIsLoading(false);
        }
    };
    
    if (!moduleData) return null;

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="no-print fixed bottom-6 right-6 bg-sky-600 text-white rounded-full p-4 shadow-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-transform transform hover:scale-110 z-50"
                aria-label="Open AI assistant"
            >
                <ChatBubbleIcon className="w-8 h-8" />
            </button>

            {isOpen && (
                <div className="no-print fixed bottom-24 right-6 w-full max-w-md h-[70vh] max-h-[600px] bg-white dark:bg-slate-800 rounded-xl shadow-2xl flex flex-col z-50 transition-all duration-300 origin-bottom-right transform">
                    <header className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                        <h3 className="font-bold text-lg">GM Tutor AI Assistant</h3>
                        <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 text-2xl font-bold">&times;</button>
                    </header>
                    
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-lg ${msg.role === 'user' ? 'bg-sky-500 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>
                                    <p className="text-sm" dangerouslySetInnerHTML={{ __html: markdownToHtml(msg.text) }} />
                                </div>
                            </div>
                        ))}
                         {isLoading && (
                            <div className="flex justify-start">
                                <div className="max-w-[80%] p-3 rounded-lg bg-slate-200 dark:bg-slate-700">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {error && <p className="text-sm text-red-500 text-center py-2">{error}</p>}
                        <div ref={messagesEndRef} />
                    </div>
                    
                    <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-200 dark:border-slate-700">
                        <div className="relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask a question..."
                                disabled={isLoading}
                                className="w-full bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg py-2 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                            />
                            <button type="submit" disabled={isLoading || !input.trim()} className="absolute inset-y-0 right-0 flex items-center justify-center w-10 text-sky-600 hover:text-sky-800 disabled:text-slate-400">
                               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                               </svg>
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};
