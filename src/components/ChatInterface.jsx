import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Server, Loader2 } from 'lucide-react';

export default function ChatInterface() {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I am your local AI assistant. I run on the server to keep your device fast.", sender: 'bot' }
    ]);
    const [inputText, setInputText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const userMessage = {
            id: Date.now(),
            text: inputText,
            sender: 'user'
        };

        setMessages(prev => [...prev, userMessage]);
        setInputText("");
        setIsTyping(true);

        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: userMessage.text }),
            });

            if (!response.ok) {
                throw new Error('Server error');
            }

            const data = await response.json();

            setMessages(prev => [
                ...prev,
                { id: Date.now() + 1, text: data.response || "No response received.", sender: 'bot' }
            ]);

        } catch (error) {
            console.error("Chat Error:", error);
            setMessages(prev => [
                ...prev,
                { id: Date.now() + 1, text: `Error: ${error.message}. Make sure 'node server.js' is running and visible.`, sender: 'bot', isError: true }
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="flex flex-col h-[600px] w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 relative">

            {/* Header */}
            <div className="bg-accent p-4 text-white flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="bg-white/20 p-2 rounded-full">
                        <Bot size={24} />
                    </div>
                    <div>
                        <h2 className="font-semibold text-lg">Iconic Local AI</h2>
                        <p className="text-xs text-gray-300 flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                            Server Online
                        </p>
                    </div>
                </div>
                <div className="bg-white/10 p-2 rounded-full" title="Running on Local Server">
                    <Server size={20} />
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${message.sender === 'user'
                                ? 'bg-blue-600 text-white rounded-br-none'
                                : message.isError
                                    ? 'bg-red-50 text-red-600 border border-red-200 rounded-bl-none'
                                    : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                                }`}
                        >
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                            <span className={`text-[10px] block mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100">
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 bg-gray-100 text-gray-900 placeholder-gray-500 border-0 rounded-full px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-inner"
                    />
                    <button
                        type="submit"
                        disabled={!inputText.trim() || isTyping}
                        className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md transform active:scale-95"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </form>
        </div>
    );
}
