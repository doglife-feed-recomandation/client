import { docClient } from '@/lib/aws';
import { Feed } from '@/types/Feed';
import { ScanCommand } from '@aws-sdk/lib-dynamodb';

export async function getAllFeeds() {
  'use server';
  const command = new ScanCommand({
    TableName: 'FEED_INFO',
  });

  try {
    let feeds: Feed[] = [];

    const result = await docClient.send(command);
    feeds = feeds.concat(result.Items as Feed[]);
    while (result.LastEvaluatedKey) {
      const nextCommand = new ScanCommand({
        TableName: 'FEED_INFO',
        ExclusiveStartKey: result.LastEvaluatedKey,
      });
      const nextResult = await docClient.send(nextCommand);
      feeds = feeds.concat(nextResult.Items as Feed[]);
    }

    const sortedFeeds = feeds.sort((a, b) => a.id - b.id);
    return sortedFeeds;
  } catch (error) {
    throw new Error(`Failed to fetch feeds: ${error}`);
  }
}
