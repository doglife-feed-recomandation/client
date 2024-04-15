import { PetInfo } from "@/types/PetInfo";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import * as csvParser from 'csv-parser';
import * as fs from 'fs';


// DynamoDB 클라이언트 초기화
const docClient = DynamoDBDocumentClient.from(
  new DynamoDBClient({
    region: "ap-northeast-2", // 서울 리전
    credentials: { // 환경 변수에서 인증 정보 읽기
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
  })
);


function preprocessData(item: any): any {
  const processedItem: any = {};
  for (const key in item) {
    let value = item[key];
    // 괄호 안의 내용 무시
    value = value.toString().replace(/\(.*?\)/, "").trim();
    // 숫자 변환
    if (!isNaN(value) && value !== '') {
      value = Number(value);
    } else if (value.includes('|')) { // '|'로 구분된 문자열 처리, 배열로 변환
      value = value.split('|').map((v: string) => v.trim());
    } else {
      value = value.toString();
    }
    processedItem[key] = value;
  }
  return processedItem;
}

function readCSVFile(filePath: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const results: any[] = [];
    fs.createReadStream(filePath, "utf-8")
      .pipe(csvParser.default())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        resolve(results);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}

async function saveDataToDynamoDB(data: any[]) {
  const results = [];
  for (const item of data) {
    const processedItem = preprocessData(item);
    
    const command = new PutCommand({
      TableName: "FEED_INFO",
      Item: {
        ...processedItem,
      },
    });

    try {
      const result = await docClient.send(command);
      results.push(result);
    } catch (error) {
      console.error("Error inserting item:", error);
    }
  }
  return results;
}


export async function createFeedInfo(pet:PetInfo) {
  "use server"

  const filePath = './feed_data_csv.csv'; // CSV 파일 경로
  try {
    const data = await readCSVFile(filePath);
    const response = await saveDataToDynamoDB(data);
    return response;
  } catch (error) {
    console.error("An error occurred:", error);
  }
  
}

