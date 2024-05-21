'use server';

import { Chat } from '@/types/Chat';
import { MessageResponse } from '@/types/MessageResponse';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

const currentTimeStamp = Date.now();
const chatLog: Chat = {
  pk: '',
  sk: 0,
  content: '',
  sender: '',
};

// DynamoDB 클라이언트 초기화
const docClient = DynamoDBDocumentClient.from(
  new DynamoDBClient({
    region: 'ap-northeast-2', // 서울 리전
    credentials: {
      // 환경 변수에서 인증 정보 읽기
      accessKeyId: process.env.DB_ACCESS_KEY_ID,
      secretAccessKey: process.env.DB_SECRET_ACCESS_KEY,
    },
  }),
);

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
