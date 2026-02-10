// src/pages/Chatbot.jsx
import ChatInterface from '../components/ChatInterface';

export default function Chatbot() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 pt-24">
      <div className="w-full max-w-2xl mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Virtual Assistant</h1>
        <p className="text-gray-600">Ask us anything about our transformers and services.</p>
      </div>
      <ChatInterface />
    </div>
  );
}
