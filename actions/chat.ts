'use server';

import { docClient } from '@/lib/aws';
import { Chat } from '@/types/Chat';
import { MessageResponse } from '@/types/MessageResponse';
import { GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';

const currentTimeStamp = Date.now();
const chatLog: Chat = {
  pk: '',
  sk: 0,
  content: '',
  sender: '',
};



export async function createChatLog(message: MessageResponse) {
  chatLog['pk'] = message.id;
  if (isNaN(Number(message.createdAt)) == false){
    chatLog['sk'] = Number(message.createdAt);
  }
  chatLog['content'] = message.content;
  chatLog['sender'] = message.role;

  try {
    const command = new PutCommand({
      TableName: 'CHAT_LOG',
      Item: {
        ...chatLog,
      },
    });

    const response = await docClient.send(command); // command 실행
    console.log(`chat log created successfully`); // 작업 성공 시 로그
  } catch (error) {
    console.error(`Error creating chat log: ${error}`); // 에러 발생 시 로그
    throw error; // 에러를 다시 throw하여 호출자가 에러를 처리할 수 있도록 함
  }
}

export const getChatLog = async (petId: string): Promise<Chat> => {
  'use server';

  try {
    const command = new GetCommand({
      TableName: 'USER',
      Key: {
        pk: petId
      },
    });

    const response = await docClient.send(command);
    return response.Item as Chat;
  } catch (error) {
    console.error(`Error getting User: ${error}`);
    throw error;
  }
};