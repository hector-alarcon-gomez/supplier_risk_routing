// What are the top 3 suppliers with the highest risk scores?
// Show me all suppliers in the healthcare industry
// Which suppliers have financial compliance risks?

'use client';
import { useChat } from '@ai-sdk/react';
import MessageList from '@/components/MessageList';
import ChatInput from '@/components/ChatInput';
import LoadingIndicator from '@/components/LoadingIndicator';
import { useEffect, useRef } from 'react';

export default function Page() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    stop,
    reload,
    status,
  } = useChat({
    // api: '/api/sql_routing',
    api: '/api/sql_generator',
    streamProtocol: 'text',
    onFinish: (message, { usage, finishReason }) => {
      console.log('Finished streaming message:', message);
      console.log('Token usage:', usage);
      console.log('Finish reason:', finishReason);
    },
    onError: (error) => {
      console.error('An error occurred:', error);
    },
    onResponse: (response) => {
      console.log('Received HTTP response from server:', response);
    },
  });

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, status]);

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">📊 Supplier Risk Chat</h1>

      <MessageList messages={messages} />

      {status === 'streaming' && <LoadingIndicator />}

      {status === 'error' && (
        <div className="bg-red-100 border border-red-400 text-red-700 p-2 rounded">
          ⚠️ Oops! Something went wrong. Please try again.
        </div>
      )}

      <div className="flex items-center gap-2">
        <ChatInput
          onSend={handleSubmit}
          input={input}
          onChange={handleInputChange}
        />

        {status === 'streaming' && (
          <button
            onClick={stop}
            className="bg-orange-500 text-white px-3 py-2 rounded"
          >
            Stop
          </button>
        )}

        {status === 'error' && (
          <button
            onClick={() => reload()}
            className="bg-blue-500 text-white px-3 py-2 rounded"
          >
            Retry
          </button>
        )}
      </div>

      <div ref={bottomRef} />
    </div>
  );
}
