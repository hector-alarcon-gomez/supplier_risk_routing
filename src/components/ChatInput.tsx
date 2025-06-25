'use client';

import { useState } from 'react';

export default function ChatInput({
  onSend,
}: {
  onSend: (text: string) => void;
}) {
  const [value, setValue] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    onSend(value);
    setValue('');
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        className="flex-1 border p-2 rounded"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Ask something..."
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        type="submit"
      >
        Send
      </button>
    </form>
  );
}
