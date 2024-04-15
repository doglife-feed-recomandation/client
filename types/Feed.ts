import { HealthProblem } from './PetInfo';

export interface Feed {
  ID: number;
  allergies: string[]; // TODO: use enum
  brand: string;
  Calcium: number;
  Calorie: number;
  Chondroitin: number;
  Crude_Ash: number;
  Crude_Fat: number;
  Crude_Fiber: number;
  Crude_Protein: number;
  DHA: number;
  Dog_age: string[]; // TODO: use enum
  Dog_size: string[]; // TODO: use enum
  EPA: number;
  feature: string[];
  Glucosamine: number;
  Grain_size_1: number;
  Grain_size_2: number;
  healthcares: HealthProblem[]; // TODO: use enum
  name: string;
  Omega3: number;
  Omega6: number;
  Phosphorus: number;
  Price: number;
  protein: string[]; // TODO: use enum
  type: string;
  VitaminE: number;
  Weight: number;
}

export interface FeedRecommendation {
  feed: Feed;
  reasons: string[];
  score: number;
}
