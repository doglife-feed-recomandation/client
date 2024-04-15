export enum Breed {
  푸들 = '푸들',
  말티즈 = '말티즈',
  시츄 = '시츄',
  요크셔테리어 = '요크셔테리어',
  포메라니안 = '포메라니안',
}

export enum AllergySourceType {
  육류 = '육류',
  어패류 = '어패류',
  갑각류 = '갑각류',
  채소 = '채소',
  콩 = '콩',
  과일 = '과일',
  효모 = '호모',
  유제품 = '유제품',
  곡물 = '곡물',
}

export enum AllergySource {
  닭,
  오리,
  칠면조,
  소,
  염소,
  양,
  돼지,
  멧돼지,
  토끼,
  메추라기,
  타조,
  사슴,
  식용곤충,
}

export const AllergySource: Record<AllergySourceType, MeatAllergySource[]> = {
  [AllergySourceType.갑각류]: [],

  [AllergySourceType.육류]: [MeatAllergySource.닭, MeatAllergySource.돼지],
};

export enum ProteinSource {
  닭 = '닭',
  소 = '소',
  오리 = '오리',
  연어 = '연어',
}

export enum Sex {
  수컷 = 'male',
  암컷 = 'female',
  중성화 = 'neutered',
}

export enum HealthProblem {
  '피부/피모' = '피부/피모',
  저알러지 = '저알러지',
  항산화 = '항산화',
  다어이트 = '다이어트',
  소화기 = '소화기',
  '뼈/관절' = '뼈/관절',
}

export interface PetInfo {
  name: string;
  breed: Breed | string;
  birth: string; // YYYY-MM
  sex: Sex;
  menstruation?: boolean;
  pregnancy?: boolean;
  weight: number;
  allergy: boolean;
  allergySource?: AllergySource; // 알러지 원인이 여러개일 수도
  protein: boolean;
  proteinSource?: Array<ProteinSource>;
  healthProblems?: HealthProblem[]; // 건강 문제
}
