import { createChatLog } from '@/actions/form';
import { Chat } from '@/types/Chat';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type Message = {
  role: string;
  content: string;
};

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const { messages } = await req.json();

  // chat log start
  const messageLog: Message[] = messages;
  let lastUserMessageContent: string | undefined = undefined;
  const currentTimeStamp = Date.now();
  const chatLog: Chat = {
    pk: "",
    sk: 0,
    content: "",
    sender: "",
  };

  messageLog.forEach((m) => {
    if (m.role === 'user') {
        lastUserMessageContent = m.content;
    }
  });

  if (lastUserMessageContent !== undefined) {
      chatLog['pk'] = 'pkpkpk';
      chatLog['sk'] = currentTimeStamp;
      chatLog['content'] = lastUserMessageContent;
      chatLog['sender'] = 'user'; 
      createChatLog(chatLog);
  }
  // chat log end

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo',
    stream: true,
    messages,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
