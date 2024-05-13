import { Feed, FeedRecommendation } from '@/types/Feed';
import { PetInfo } from '@/types/PetInfo';
import { Message } from 'ai';

export const getInitialMessages = (
  pet: PetInfo,
  recommendations: FeedRecommendation[],
): Message[] => {
  console.log(getInitialPrompt(pet, recommendations));
  return [
    {
      id: 'init',
      role: 'system',
      content: getInitialPrompt(pet, recommendations),
    },
  ];
};

const getInitialPrompt = (
  pet: PetInfo,
  recommendations: FeedRecommendation[],
) => {
  return `# 상황 #
    당신은 사료 추천 어플리케이션에 탑제된 AI 어시스턴트 입니다. 
    사용자는 당신에게 강아지의 건강 정보를 입력하였으며 가장 좋은 사료를 추천받고 싶어합니다.
    당신에게는 강아지의 건강정보와, 건강 정보를 바탕으로 1차적으로 추천된 사료들과 추천 이유가 주어집니다.
    
    # 강아지 건강 정보 #
    ${getPetInfoPrompt(pet)}
    
    # 추천된 사료와 그 이유 #
    ${getRecommendationsPrompt(recommendations)}
    
    # 역할 #
    강아지의 건강정보와 추천된 사료의 정보 중 사료 성분을 근거로 추천 이유를 밝히시오. 이를 바탕으로 사용자에게 가장 알맞은 사료를 추천하고, 사용자의 질문에 답변해서 사용자가 사료를 구매하도록 설득하시오.
    
    # 톤 #
    사용자에게 친절하고 공감하는 어투를 구사하시오.
    또한 사용자에게 신뢰감을 주기 위해서 근거를 제시하시오.
    해요체를 사용하시오.
    `;
};

const getPetInfoPrompt = (pet: PetInfo) => {
  return JSON.stringify({
    이름: pet.name,
    견종: pet.breed,
    출생년월: pet.birth,
    '나이(개월)': calculateAgeInMonths(pet.birth),
    성별: pet.sex,
    '생리중 여부': pet.menstruation,
    '임신중 여부': pet.pregnancy,
    '체중(Kg)': pet.weight,
    '알러지 여부': pet.allergy,
    '알러지 성분': pet.allergySource,
    '건강 문제 있는지': pet.healthProblem,
    '건강 문제': pet.healthProblemSource,
  });
};

const getRecommendationsPrompt = (recommendations: FeedRecommendation[]) => {
  return JSON.stringify(
    recommendations.map((recommendation) => ({
      사료명: recommendation.feed.name,
      '추천 이유': recommendation.reasons,
      점수: recommendation.score,
      '사료 성분': getFeedPrompt(recommendation.feed),
    })),
  );
};

const getFeedPrompt = (feed: Feed) => {
  const feedDescribed = {
    브랜드: feed.brand,
    칼슘: feed.calcium,
    칼로리: feed.calorie,
    콘드로이틴: feed.chondroitin,
    순조: feed.crudeAsh,
    지방: feed.crudeFat,
    섬유: feed.crudeFiber,
    단백질: feed.crudeProtein,
    DHA: feed.DHA,
    견종: feed.dogAge,
    견종크기: feed.dogSize,
    EPA: feed.EPA,
    특징: feed.feature,
    글루코사민: feed.glucosamine,
    '곡물 크기1': feed.grainSize1,
    '곡물 크기2': feed.grainSize2,
    '건강 문제': feed.healthcare,
    오메가3: feed.omega3,
    오메가6: feed.omega6,
    인: feed.phosphorus,
    가격: feed.price,
    '제품 코드': feed.productCode,
    '단백질 종류': feed.protein,
    타입: feed.type,
    비타민E: feed.vitaminE,
    무게: feed.weight,
  };

  // remove undefined values
  return Object.fromEntries(
    Object.entries(feedDescribed).filter(([_, value]) => value),
  );
};

// 보조 함수: 생일을 받아서 현재 나이를 월 단위로 계산
export const calculateAgeInMonths = (birth: string): number => {
  const today = new Date();
  const birthDate = new Date(birth);
  const diff = today.getTime() - birthDate.getTime();
  return diff / (1000 * 60 * 60 * 24 * 30); // milliseconds to months
};
