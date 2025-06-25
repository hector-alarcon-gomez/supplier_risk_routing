export default function ChatMessage({
  role,
  content,
}: {
  role: string;
  content: string;
}) {
  const isUser = role === 'user';

  return (
    <div className={`w-full flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg ${
          isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
        }`}
      >
        <pre className="whitespace-pre-wrap break-words">{content}</pre>
      </div>
    </div>
  );
}
