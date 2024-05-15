'use client';

import { createChatLog } from '@/actions/chat';
import { Input } from '@/components/Input';
import { Button } from '@/components/ui/button';
import { IconUser } from '@/components/ui/icons';
import { cn } from '@/lib/utils';
import { Message, useChat } from 'ai/react';
import { useEffect, useRef } from 'react';

interface AiChatBoxProps {
  initialMessages: Message[];
}

export default function AIChatBox({ initialMessages }: AiChatBoxProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
      initialMessages,
      initialInput: '어떤 사료가 좋을까요?',
      onFinish(message) {
        const assistantMessage = {
          role: message.role,
          content: message.content,
          id: message.id,
          createdAt: Date.now().toString(),
        };
        createChatLog(assistantMessage);
        console.log(assistantMessage);
      },
    });

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const lastMessageIsUser = messages[messages.length - 1]?.role === 'user';

  return (
    <>
      <div className="mt-3 h-full overflow-y-auto px-3" ref={scrollRef}>
        {messages.slice(1).map((message) => (
          <ChatMessage message={message} key={message.id} />
        ))}
        {isLoading && lastMessageIsUser && (
          <ChatMessage
            message={{
              role: 'assistant',
              content: '생각중...',
            }}
          />
        )}
        {error && (
          <ChatMessage
            message={{
              role: 'assistant',
              content: '에러가 발생했습니다. 다시 시도해주세요.',
            }}
          />
        )}
      </div>
      <form onSubmit={handleSubmit} className="m-3 flex gap-1">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="메시지를 입력해주세요."
          ref={inputRef}
        />
        <Button type="submit">Send</Button>
      </form>
    </>
  );
}

function ChatMessage({
  message: { role, content },
}: {
  message: Pick<Message, 'role' | 'content'>;
}) {
  const isAiMessage = role === 'assistant';
  return (
    <div
      className={cn(
        'mb-3 flex items-center',
        isAiMessage ? 'me-5 justify-start' : 'ms-5 justify-end',
      )}
    >
      {isAiMessage && (
        <img
          src="../chatbot_assistant.png"
          alt="chatbot assistant"
          className="mr-2 size-8 rounded-full object-cover"
        />
      )}
      <p
        className={cn(
          'whitespace-pre-line rounded-md border px-3 py-2',
          isAiMessage ? 'bg-background' : 'bg-primary text-primary-foreground',
        )}
      >
        {content}
      </p>
      {!isAiMessage && <IconUser />}
    </div>
  );
}
