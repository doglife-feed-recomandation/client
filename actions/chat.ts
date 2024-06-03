'use server';

import { docClient } from '@/lib/aws';
import { Chat } from '@/types/Chat';
import { MessageResponse } from '@/types/MessageResponse';
import { PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';

const currentTimeStamp = Date.now();
const chatLog: Chat = {
  pk: '',
  sk: 0,
  content: '',
  sender: '',
};

export async function createChatLog(message: MessageResponse) {
  chatLog['pk'] = message.id;
  if (isNaN(Number(message.createdAt)) == false) {
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
    throw error;
  }
}

export const getChatLog = async (petId: string): Promise<Chat[]> => {
  'use server';

  try {
    const command = new QueryCommand({
      TableName: 'CHAT_LOG',
      KeyConditionExpression: 'pk = :petId',
      ExpressionAttributeValues: {
        ':petId': petId,
      },
    });

    const response = await docClient.send(command);
    if (response.Items) {
      return response.Items as Chat[];
    }
    return [];
  } catch (error) {
    console.error(`Error getting chat log: ${error}`);
    throw error;
  }
};
