function isValidJson(str: string) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

export default function ChatMessage({
  role,
  content,
}: {
  role: string;
  content: string;
}) {
  const isUser = role === 'user';
  console.log('content');
  console.log(content);

  let humanMessage = content;
  if (isValidJson(content)) {
    const { rows, summary } = JSON.parse(content);
    humanMessage = summary;
  }

  return (
    <div className={`w-full flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-11/12 px-4 py-2 rounded-lg ${
          isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
        }`}
      >
        <pre className="whitespace-pre-wrap break-words">{humanMessage}</pre>
      </div>
    </div>
  );
}
