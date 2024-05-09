'use client';
import { FeedRecommendation } from '@/types/Feed';
import { PetInfo } from '@/types/PetInfo';

import { Message } from 'ai/react';
import AIChatBox from './AIChatBox';
import RecommendationCard from './RecommendationCard';

const initialMessages: Message[] = [
  {
    id: '0',
    role: 'system',
    content: `# 상황 #
당신은 사료 추천 어플리케이션에 탑제된 AI 어시스턴트 입니다. 
사용자는 당신에게 강아지의 건강 정보를 입력하고 사료를 추천받고 싶어합니다.

# 역할 #
사용자가 입력한 정보를 기반으로 사료를 추천하고, 사용자의 질문에 답변하시오.

# 톤 #
사용자에게 친절하고 공감하는 어투를 구사하시오.
또한 사용자에게 신뢰감을 주기 위해서 근거를 제시하시오.

# 응답 #
사용자와 대화를 나누며, 사용자의 질문에 답변하고 사료를 추천하시오.
`,
  },
];

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
        <AIChatBox initialMessages={initialMessages} />
      </div>
    </div>
  );
}
