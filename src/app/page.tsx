'use client';

import { useState } from 'react';
import ChatInput from '@/components/ChatInput';
import MessageList from '@/components/MessageList';
import LoadingIndicator from '@/components/LoadingIndicator';

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage(message: string) {
    setMessages((prev) => [...prev, { role: 'user', content: message }]);
    setLoading(true);

    const res = await fetch('/api/ai', {
      method: 'POST',
      body: JSON.stringify({
        messages: [...messages, { role: 'user', content: message }],
      }),
    });

    const { result } = await res.json();

    setMessages((prev) => [
      ...prev,
      { role: 'ai', content: JSON.stringify(result, null, 2) },
    ]);
    setLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <MessageList messages={messages} />
      {loading && <LoadingIndicator />}
      <ChatInput onSend={sendMessage} />
    </div>
  );
}
