export enum Breed {
  푸들 = '푸들',
  말티즈 = '말티즈',
  시츄 = '시츄',
  요크셔테리어 = '요크셔테리어',
  포메라니안 = '포메라니안',
}

export enum AllergySource {
  곡물 = '곡물',
  닭 = '닭',
  소 = '소',
  오리 = '오리',
  연어 = '연어',
}

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

export interface PetInfo {
  name: string;
  breed: Breed | string;
  birth: string; // YYYY-MM
  sex: Sex;
  menstruation?: boolean;
  pregnancy?: boolean;
  weight: number;
  allergy: boolean;
  allergySource?: Array<AllergySource>; // 알러지 원인이 여러개일 수도
  protein: boolean;
  proteinSource?: Array<ProteinSource>;
  // TODO: add health problems
}
