'use client';
import { useChat } from '@ai-sdk/react';
import MessageList from '@/components/MessageList';
import ChatInput from '@/components/ChatInput';
import LoadingIndicator from '@/components/LoadingIndicator';

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit, status } = useChat({
    api: '/api/ai',
    streamProtocol: 'text',
    onResponse: (r) => {
      console.log('response');
      console.log(r);
    },
    onFinish: (messages) => {
      console.log('messages');
      console.log(messages);
    },
    onError: (e) => {
      console.log('error');
      console.log(e);
    },
  });
  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <MessageList messages={messages} />
      {status === 'streaming' && <LoadingIndicator />}
      <ChatInput
        onSend={handleSubmit}
        input={input}
        onChange={handleInputChange}
      />
    </div>
  );
}
