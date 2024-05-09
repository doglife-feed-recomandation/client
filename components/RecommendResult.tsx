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
    <div
      className="flex flex-col rounded border bg-background shadow-xl"
      style={{
        maxWidth: '80%',
        height: 'calc(100% - 2rem)',
        margin: '1rem auto',
      }}
    >
      <div>
        <h1>{pet.name}에게 추천하는 사료는?</h1>
      </div>

      <div className="flex-auto flex flex-row overflow-x-auto min-h-0 max-h-[25%] px-5 py-10 gap-1">
        {recommendations.map((recommendation) => (
          <RecommendationCard
            recommendation={recommendation}
            key={recommendation.feed.id}
          />
        ))}
      </div>
      <div>
        <AIChatBox initialMessages={getInitialMessages(pet, recommendations)} />
      </div>
    </div>
  );
}
