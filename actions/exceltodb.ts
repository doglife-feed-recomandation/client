import { docClient } from '@/lib/aws';
import { Feed } from '@/types/Feed';
import { PetInfo } from '@/types/PetInfo';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import * as csvParser from 'csv-parser';
import * as fs from 'fs';




function preprocessData(item: any): any {
  const processedItem: Feed = {
    id: 0,
    allergy: [],
    brand: "",
    calcium: 0,
    calorie: 0,
    chondroitin: 0,
    crudeAsh: 0,
    crudeFat: 0,
    crudeFiber: 0,
    crudeProtein: 0,
    DHA: 0,
    dogAge: [],
    dogSize: [],
    EPA: 0,
    feature: [],
    glucosamine: 0,
    grainSize1: 0,
    grainSize2: 0,
    healthcare: [],
    name: "",
    omega3: 0,
    omega6: 0,
    phosphorus: 0,
    price: 0,
    productCode: 0,
    protein: [],
    type: "",
    vitaminE: 0,
    weight: 0,
  };

  const keysOfFeed: (keyof Feed)[] = Object.keys(processedItem) as (keyof Feed)[];
  
  Object.keys(item).forEach(key => {
    const value = item[key];
    if (typeof processedItem[key as keyof Feed] === 'number') {
      // number 타입 필드 처리
      if (!isNaN(parseFloat(value))) {
        (processedItem as any)[key] = parseFloat(value);
      } else {
        (processedItem as any)[key] = 0;
      }
    } else if (Array.isArray(processedItem[key as keyof Feed])) {
      // array 타입 필드 처리
      (processedItem as any)[key] = value.split('|').map((v: string) => v.trim());
    } else {
      // string 타입 필드 처리
      (processedItem as any)[key] = value.toString().trim();
    }
  });

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

