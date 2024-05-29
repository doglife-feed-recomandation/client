'use server';

import { docClient } from '@/lib/aws';
import { encrypt } from '@/lib/crypt';
import { User } from '@/types/User';
import { GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';

export async function encryptUserEmail(
  petId: string,
  email: string,
  petName: string,
): Promise<User> {
  const currentTimeStamp: number = Date.now();
  const encryptedEmail: string = encrypt(email);
  console.log(encryptedEmail); // console.log - encryptedEmail

  const encrypteduser: User = {
    petId: petId,
    petName: petName,
    encryptedEmail: encryptedEmail,
    createdAt: currentTimeStamp,
  };
  return encrypteduser;
}

export async function createUser(user: User) {
  try {
    const command = new PutCommand({
      TableName: 'USER',
      Item: {
        // TODO: dogId 필요해서 일단 petId랑 같게 넣었는데 수정 필요
        dogId: user.petId,
        ...user,
      },
    });

    const response = await docClient.send(command); // command 실행
  } catch (error) {
    console.error(`Error creating user: ${error}`); // 에러 발생 시 로그
    throw error;
  }
}

export const getUser = async (
  petName: string,
  email: string,
): Promise<User> => {
  try {
    const encryptedEmail: string = encrypt(email);

    const command = new GetCommand({
      TableName: 'USER',
      Key: {
        petName: petName,
        encryptedEmail: encryptedEmail,
      },
    });

    const response = await docClient.send(command);
    return response.Item as User;
  } catch (error) {
    console.error(`Error getting User: ${error}`);
    throw error;
  }
};

export const getUserByPetId = async (petId: string): Promise<User> => {
  try {
    const command = new GetCommand({
      TableName: 'USER',
      Key: {
        dogId: petId,
      },
    });

    const response = await docClient.send(command);
    return response.Item as User;
  } catch (error) {
    console.error(`Error getting User: ${error}`);
    throw error;
  }
};
