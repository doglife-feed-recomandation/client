import { HealthProblem } from './PetInfo';

export interface Feed {
  id: number;
  allergy: string[]; // TODO: use enum
  brand: string;
  calcium: number;
  calorie: number;
  chondroitin: number;
  crudeAsh: number;
  crudeFat: number;
  crudeFiber: number;
  crudeProtein: number;
  DHA: number;
  dogAge: string[]; // TODO: use enum
  dogSize: string[]; // TODO: use enum
  EPA: number;
  feature: string[];
  glucosamine: number;
  grainSize1: number;
  grainSize2: number;
  healthcare: HealthProblem[]; // TODO: use enum
  name: string;
  omega3: number;
  omega6: number;
  phosphorus: number;
  price: number;
  productCode: number;
  protein: string[]; // TODO: use enum
  type: string;
  vitaminE: number;
  weight: number;

  // store
  storeName?: string;
  storeLink?: string;
  imgSrc?: string;

  // descriptions
  points?: string[];
  descriptions?: string[];
}

export interface RecommendableFeed extends Feed {
  storeName: string;
  storeLink: string;
  imgSrc: string;
}

export interface FeedRecommendation {
  feed: RecommendableFeed;
  reasons: string[];
  score: number;
}
