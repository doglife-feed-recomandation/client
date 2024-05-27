import { docClient } from '@/lib/aws';
import { User } from '@/types/User';
import {
  GetCommand,
  PutCommand
} from '@aws-sdk/lib-dynamodb';


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