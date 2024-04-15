import { Feed } from '@/types/Feed';
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

const parseFeed = (feed: any): Feed => {
  return {
    ...feed,
    Calcium: feed.Calcium || 0,
    Calorie: feed.Calorie || 0,
    Chondroitin: feed.Chondroitin || 0,
    Crude_Ash: feed.Crude_Ash || 0,
    Crude_Fat: feed.Crude_Fat || 0,
    Crude_Fiber: feed.Crude_Fiber || 0,
    Crude_Protein: feed.Crude_Protein || 0,
    DHA: feed.DHA || 0,
    EPA: feed.EPA || 0,
    Glucosamine: feed.Glucosamine || 0,
    Grain_size_1: feed.Grain_size_1 || 0,
    Grain_size_2: feed.Grain_size_2 || 0,
    Omega3: feed.Omega3 || 0,
    Omega6: feed.Omega6 || 0,
    Phosphorus: feed.Phosphorus || 0,
    protein: Array.isArray(feed.protein)
      ? feed.protein
      : feed.protein
        ? [feed.protein]
        : [],
    VitaminE: feed.VitaminE || 0,
    Weight: feed.Weight || 0,
  };
};

export async function getAllFeeds() {
  'use server';
  const command = new ScanCommand({
    TableName: 'FEED_INFO',
  });

  try {
    const result = await docClient.send(command);
    const feeds = result.Items?.map(parseFeed) || [];
    const sortedFeeds = feeds.sort((a, b) => a.ID - b.ID);
    return sortedFeeds;
  } catch (error) {
    throw new Error(`Failed to fetch feeds: ${error}`);
  }
}
