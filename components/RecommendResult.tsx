'use client';
import { FeedRecommendation } from '@/types/Feed';
import { PetInfo } from '@/types/PetInfo';

import { getInitialMessages } from '@/utils/prompt';
import AIChatBox from './AIChatBox';
import RecommendationCard from './RecommendationCard';

export default function RecommendResult({
  pet,
  recommendations,
}: {
  pet: PetInfo;
  recommendations: FeedRecommendation[];
}) {
  return (
    <div className="w-full flex flex-col rounded border bg-background shadow-xl">
      <div className="w-full">
        <h1 className="text-2xl">{pet.name}에게 추천하는 사료는?</h1>
      </div>

      <div className="flex-wrap overflow-x-scroll max-h-[25%] w-full">
        <div className="flex flex-row px-5 py-10 gap-1">
          {recommendations.map((recommendation) => (
            <RecommendationCard
              recommendation={recommendation}
              key={recommendation.feed.id}
            />
          ))}
        </div>
      </div>
      <div className="w-full">
        <AIChatBox initialMessages={getInitialMessages(pet, recommendations)} />
      </div>
    </div>
  );
}
