import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

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

export { docClient };

