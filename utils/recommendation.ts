import { getAllFeeds } from '@/actions/db';
import { FeedRecommendation } from '@/types/Feed';
import { PetInfo, Sex } from '@/types/PetInfo';

export const recommendHeuristically = async (
  pet: PetInfo,
  num_recommend = 10,
): Promise<FeedRecommendation[]> => {
  'use server';
  let recommendations: FeedRecommendation[] = (await getAllFeeds()).map(
    (feed) => {
      return {
        feed,
        reasons: [],
        score: 0,
      };
    },
  );

  // Step 2: 알러지 스크리닝
  if (pet.allergy && pet.allergySource && pet.allergySource.length > 0) {
    recommendations = recommendations
      .filter(
        ({ feed }) =>
          feed.allergy === undefined ||
          feed.allergy.every((feedAllergy) =>
            pet.allergySource!.map(
              (record) => Object.values(record).flat().includes(feedAllergy), // 이거 맞나요..?
            ),
          ),
      )
      .map((recommend) => ({
        ...recommend,
        reasons: [...recommend.reasons, '알러지 성분 제외'],
      }));
  }

  // Step 3: 임신 중인 강아지
  if (pet.sex === Sex.암컷 && pet.pregnancy) {
    recommendations = recommendations
      .filter(({ feed }) => feed.calorie >= 400)
      .map((recommend) => ({
        ...recommend,
        reasons: [
          ...recommend.reasons,
          '임신중인 강아지를 위해서 고열량이에용',
        ],
      }));
  }

  // Step 4: 시니어 or 퍼피 사료
  if (pet.birth && pet.birth.length > 0) {
    const ageInMonths = calculateAgeInMonths(pet.birth);
    if (ageInMonths > 9) {
      recommendations = recommendations
        .filter(({ feed }) => feed.dogAge.includes('시니어'))
        .map((recommend) => ({
          ...recommend,
          reasons: [...recommend.reasons, '시니어 사료'],
        }));
    } else if (ageInMonths < 1) {
      recommendations = recommendations
        .filter(({ feed }) => feed.dogAge.includes('퍼피'))
        .map((recommend) => ({
          ...recommend,
          reasons: [...recommend.reasons, '퍼피 사료'],
        }));
    }
  }

  // Step 5: 소형견 키블 크기
  // PetInfo에 Dog_size가 없음

  // Step 6: 건강 문제 해결
  if (pet.healthProblem && pet.healthProblemSource!.length > 0) {
    recommendations = recommendations
      .filter(({ feed }) =>
        feed.healthcare.some((care) => pet.healthProblemSource!.includes(care)),
      )
      .map((recommend) => {
        const possibleCares = recommend.feed.healthcare.filter((care) =>
          pet.healthProblemSource!.includes(care),
        );
        const additionalReasons = possibleCares.map(
          (care) => `${care} 문제에 도움을 줄 수 있음`,
        );

        return {
          feed: recommend.feed,
          reasons: [...recommend.reasons, ...additionalReasons],
          score: possibleCares.length,
        };
      })
      .sort((a, b) => b.score - a.score);
  }

  return recommendations.slice(0, num_recommend);
};

// 보조 함수: 생일을 받아서 현재 나이를 월 단위로 계산
const calculateAgeInMonths = (birth: string): number => {
  const today = new Date();
  const birthDate = new Date(birth);
  const diff = today.getTime() - birthDate.getTime();
  return diff / (1000 * 60 * 60 * 24 * 30); // milliseconds to months
};
