'use client';
export default function ChatInput({
  onSend,
  input,
  onChange,
}: {
  onSend: () => void;
  input: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSend();
      }}
      className="flex gap-2"
    >
      <input
        className="flex-1 border p-2 rounded"
        value={input}
        onChange={onChange}
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
