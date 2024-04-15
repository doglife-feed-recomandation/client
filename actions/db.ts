import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

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

export async function getAllFeeds() {
  'use server';
  const command = new ScanCommand({
    TableName: 'FEED_INFO',
  });

  try {
    const response = await docClient.send(command);
    const sortedItems = response.Items?.sort((a, b) => {
      return a.ID - b.ID;
    });
    return sortedItems;
  } catch (error) {
    console.error('Error inserting item:', error);
  }
}
