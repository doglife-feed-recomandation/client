import { User } from '@/types/User';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand
} from '@aws-sdk/lib-dynamodb';

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

export async function createUser(user: User) {
  'use server';

  try {
    const command = new PutCommand({
      TableName: 'USER',
      Item: {
        ...user,
      },
    });

    const response = await docClient.send(command); // command 실행
  } catch (error) {
    console.error(`Error creating user: ${error}`); // 에러 발생 시 로그
    throw error;
  }
}


export const getUser = async (petName: string, hashedEmail: string): Promise<User> => {
  'use server';

  try {
    const command = new GetCommand({
      TableName: 'USER',
      Key: {
        petName: petName,
        hashedEmail: hashedEmail 
      },
    });

    const response = await docClient.send(command);
    return response.Item as User;
  } catch (error) {
    console.error(`Error getting User: ${error}`);
    throw error;
  }
};