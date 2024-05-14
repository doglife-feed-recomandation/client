import { PetInfo } from '@/types/PetInfo';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from '@aws-sdk/lib-dynamodb';
import { Chat } from 'openai/resources/index.mjs';
import { ulid } from 'ulid';

// DynamoDB 클라이언트 초기화
const docClient = DynamoDBDocumentClient.from(
  new DynamoDBClient({
    region: 'ap-northeast-2', // 서울 리전
    credentials: {
      // 환경 변수에서 인증 정보 읽기
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  }),
);

export async function createPetInfo(pet: PetInfo): Promise<string> {
  'use server';

  try {
    const uniqueId = ulid(); // ULID 생성
    const currentTimeStamp = Date.now();

    const command = new PutCommand({
      TableName: 'DOG_INFO',
      Item: {
        ID: uniqueId, // ID에 생성한 ULID 저장
        createdAt: currentTimeStamp, // 현재 시간 타임스탬프로 저장
        ...pet,
      },
    });

    const response = await docClient.send(command); // command 실행
    console.log(
      `Pet info created successfully with ID: ${uniqueId}, response: ${response}`,
    ); // 작업 성공 시 로그
    return uniqueId;
  } catch (error) {
    console.error(`Error creating pet info: ${error}`); // 에러 발생 시 로그
    throw error; // 에러를 다시 throw하여 호출자가 에러를 처리할 수 있도록 함
  }
}


export async function createChatLog(chat: Chat) {
  'use server';

  try {
    const command = new PutCommand({
      TableName: 'CHAT_LOG',
      Item: {
        ...chat,
      },
    });

    const response = await docClient.send(command); // command 실행
    console.log(
      `chat log created successfully`
    ); // 작업 성공 시 로그
  } catch (error) {
    console.error(`Error creating chat log: ${error}`); // 에러 발생 시 로그
    throw error; // 에러를 다시 throw하여 호출자가 에러를 처리할 수 있도록 함
  }
}


export const getPetInfo = async (id: string): Promise<PetInfo> => {
  'use server';

  try {
    const command = new GetCommand({
      TableName: 'DOG_INFO',
      Key: {
        ID: id,
      },
    });

    const response = await docClient.send(command);
    return response.Item as PetInfo;
  } catch (error) {
    console.error(`Error getting pet info: ${error}`);
    throw error;
  }
};
