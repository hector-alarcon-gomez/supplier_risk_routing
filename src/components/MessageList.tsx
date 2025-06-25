import ChatMessage from './ChatMessage';

export default function MessageList({
  messages,
}: {
  messages: { role: string; content: string }[];
}) {
  return (
    <div className="space-y-2">
      {messages.map((m, i) => (
        <ChatMessage key={i} role={m.role} content={m.content} />
      ))}
    </div>
  );
}
