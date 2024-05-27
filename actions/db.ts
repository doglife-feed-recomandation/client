import { docClient } from '@/lib/aws';
import { Feed } from '@/types/Feed';
import { ScanCommand } from '@aws-sdk/lib-dynamodb';

export async function getAllFeeds() {
  'use server';
  const command = new ScanCommand({
    TableName: 'FEED_INFO',
  });

  try {
    const result = await docClient.send(command);
    const feeds = (result.Items as Feed[]) || [];
    const sortedFeeds = feeds.sort((a, b) => a.id - b.id);
    return sortedFeeds;
  } catch (error) {
    throw new Error(`Failed to fetch feeds: ${error}`);
  }
}
