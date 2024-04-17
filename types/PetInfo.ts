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
  기타 = '기타',
}

export const AllergySource: Record<AllergySourceType, Array<string>> = {
  [AllergySourceType.육류]: [
    '닭',
    '오리',
    '칠면조',
    '소',
    '염소',
    '양',
    '돼지',
    '맷돼지',
    '토끼',
    '메추라기',
    '타조',
    '사슴',
    '식용곤충',
  ],
  [AllergySourceType.어패류]: [
    '연어',
    '대구',
    '참치',
    '고등어',
    '농어',
    '정어리',
    '청어',
    '송어',
    '멸치',
    '홍합',
    '초록입홍합',
    '조개',
  ],
  [AllergySourceType.갑각류]: ['새우', '게'],
  [AllergySourceType.채소]: [
    '감자',
    '고구마',
    '옥수수',
    '배추',
    '양상추',
    '치커리',
    '케일',
    '파프리카',
    '파슬리',
    '무',
    '순무',
    '알로에베라',
    '콜리플라워',
    '브로콜리',
    '호박',
    '주키니호박',
    '오이',
    '우엉',
    '치아씨앗',
    '비트',
  ],
  [AllergySourceType.콩]: [
    '완두콩',
    '렌틸콩',
    '깍지콩',
    '이집트콩',
    '검정콩',
    '땅콩',
    '대두',
  ],
  [AllergySourceType.과일]: [
    '귤 혼합물(레몬, 라임, 오렌지)',
    '키위(참다래)',
    '사과',
    '배',
    '파인애플',
    '망고',
    '복숭아',
    '자두',
    '딸기',
    '블루베리',
    '멜론',
    '수박',
  ],
  [AllergySourceType.효모]: ['효모', '빵 효모', '맥주 효모'],
  [AllergySourceType.유제품]: [
    '계란',
    '계란흰자',
    '계란노른자',
    '우유',
    '체다치즈',
    '요거트',
    '버터',
    'β - 락토글로불린',
    '카제인',
    '치즈',
  ],
  [AllergySourceType.곡물]: [
    '쌀',
    '보리',
    '귀리',
    '현미',
    '찹쌀',
    '메밀',
    '밀',
    '조',
    '아마',
  ],
  [AllergySourceType.기타]: [
    '꿀',
    '글루텐',
    '라벤더',
    '번데기',
    '베이킹파우더',
    '생밤',
  ],
};

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
  allergySource?: (typeof AllergySource)[]; // 알러지 원인이 여러개일 수도
  healthProblem: boolean;
  healthProblemSource?: HealthProblem[]; // 건강 문제
}
