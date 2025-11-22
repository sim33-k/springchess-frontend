'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  user: string;
  text: string;
  timestamp: Date;
}

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      user: 'System',
      text: 'Welcome to the game! Good luck!',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputValue.trim() === '') return;

    const newMessage: Message = {
      id: Date.now().toString(),
      user: 'You',
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputValue('');

    // TODO: Send message via socket.io
    // socket.emit('chatMessage', { gameId, message: inputValue });
  };

  return (
    <div className="flex flex-col h-full bg-slate-800 rounded-lg">
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <h2 className="text-xl font-bold text-white">Game Chat</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-3 rounded-lg ${
              message.user === 'You'
                ? 'bg-blue-600 ml-auto'
                : message.user === 'System'
                ? 'bg-slate-700'
                : 'bg-slate-600'
            } max-w-[80%] ${message.user === 'You' ? 'text-right' : ''}`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-gray-300">
                {message.user}
              </span>
              <span className="text-xs text-gray-400">
                {message.timestamp.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
            <p className="text-sm text-white">{message.text}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
