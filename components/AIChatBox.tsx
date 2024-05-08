import { Input } from '@/components/Input';
import { Button } from '@/components/ui/buttons';
import { IconOpenAI, IconUser } from '@/components/ui/icons';
import { cn } from '@/lib/utils';
import { Message, useChat } from 'ai/react';
import { useEffect, useRef } from 'react';

interface AiChatBoxProps {
  initialMessages: Message[];
}

export default function AIChatBox({ initialMessages }: AiChatBoxProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({ initialMessages });

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const lastMessageIsUser = messages[messages.length - 1]?.role === 'user';

  return (
    <div className="bottom-0 justify-center z-10 w-full max-w-[500px] p-1 xl:right-36">
      <div className="flex h-[600px] flex-col rounded border bg-background shadow-xl">
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
      </div>
    </div>
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
      {isAiMessage && <IconOpenAI className="mr-2 shrink-0" />}
      <p
        className={cn(
          'whitespace-pre-line rounded-md border px-3 py-2',
          isAiMessage ? 'bg-background' : 'bg-primary text-primary-foreground',
        )}
      >
        {content}
      </p>
      {!isAiMessage && (
        <IconUser
          width={100}
          height={100}
          className="ml-2 h-10 w-10 rounded-full object-cover"
        />
      )}
    </div>
  );
}
