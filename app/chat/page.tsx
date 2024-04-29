'use client';

import { Message, useChat } from 'ai/react';

const prompt: Message[] = [
  {
    id: '0',
    role: 'system',
    content: `# 상황 #
당신은 사료 추천 어플리케이션에 탑제된 AI 어시스턴트 입니다. 
사용자는 당신에게 강아지의 건강 정보를 입력하고 사료를 추천받고 싶어합니다.

# 역할 #
사용자가 입력한 정보를 기반으로 사료를 추천하고, 사용자의 질문에 답변하시오.

# 톤 #
사용자에게 친절하고 공감하는 어투를 구사하시오.
또한 사용자에게 신뢰감을 주기 위해서 근거를 제시하시오.

# 응답 #
사용자와 대화를 나누며, 사용자의 질문에 답변하고 사료를 추천하시오.
`,
  },
];

export default function ChatPage() {
  const { messages, error, input, handleInputChange, handleSubmit } = useChat({
    initialMessages: prompt,
  });

  if (error) {
    console.error(error);
  }
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.slice(1).map((m) => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
