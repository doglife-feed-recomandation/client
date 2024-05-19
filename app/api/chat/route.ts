import { createChatLog } from '@/actions/chat';
import { MessageResponse } from '@/types/MessageResponse';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';
import { ulid } from 'ulid';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type reqMessage = {
  role: string;
  content: string;
};

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const { messages } = await req.json();
  // 로깅해보니 role이랑 content만 넘어오네...흠
  console.log(`POST: ${JSON.stringify(messages[messages.length - 1])}`);

  // messages에는 이전 대화 내용 전체가 있으므로 마지막으로 유저가 보낸 메시지만 db에 추가로 저장
  const userMessage = messages[messages.length - 1];
  const currentTimeStamp = Date.now();

  const lastUserMessage: MessageResponse = {
    role: userMessage.role,
    content: userMessage.content,
    // id값은 나중에 바꿔야 할 수도
    id: ulid(),
    createdAt: currentTimeStamp.toString(),
  };

  createChatLog(lastUserMessage);

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    stream: true,
    messages,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
