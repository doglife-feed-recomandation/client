import { getAllFeeds } from '@/actions/db';
import { FeedRecommendation } from '@/types/Feed';
import { PetInfo, Sex } from '@/types/PetInfo';
import { calculateAgeInMonths } from './prompt';

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
            pet.allergySource!.map((record) =>
              Object.values(record).flat().includes(feedAllergy),
            ),
          ),
      )
      .map((recommend) => ({
        ...recommend,
        reasons: [...recommend.reasons, '알러지 성분이 포함되어있지 않아요'],
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
          '임신중인 강아지를 위해서 고열량 사료를 준비했어요',
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
          reasons: [...recommend.reasons, '노견에게 좋은 성분이 들어있어요'],
        }));
    } else if (ageInMonths < 1) {
      recommendations = recommendations
        .filter(({ feed }) => feed.dogAge.includes('퍼피'))
        .map((recommend) => ({
          ...recommend,
          reasons: [
            ...recommend.reasons,
            '어린 강아지에게 좋은 성분이 들어있아요',
          ],
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
          (care) => `${care} 문제에 도움을 줄 수 있는 성분이 포함되어있어요`,
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
