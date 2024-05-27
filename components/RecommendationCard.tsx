import { Card, CardContent } from '@/components/ui/card';

import { FeedRecommendation } from '@/types/Feed';
import { PetInfo } from '@/types/PetInfo';
import { sendGAEvent } from '@next/third-parties/google';

export default function RecommendationCard({
  imgSrc,
  recommendation,
  petId,
  pet,
}: {
  imgSrc: string;
  recommendation: FeedRecommendation;
  petId: string;
  pet: PetInfo;
}) {
  return (
    <Card
      className="p-4 hover:bg-zinc-100 h-[95%]"
      onClick={() => {
        sendGAEvent('event', 'click_recommended_feed', {
          feed_id: recommendation.feed.id,
          feed_name: recommendation.feed.name,
          pet_id: petId,
          pet_name: pet.name,
        });
      }}
    >
      <CardContent>
        <div className="space-y-6">
          <div className="mx-auto">
            <img
              alt={recommendation.feed.name}
              src={imgSrc}
              loading="lazy"
              className="mx-auto"
              style={{
                width: '120px',
                height: '120px',
                objectFit: 'cover',
              }}
            />
          </div>
          <div
            style={{
              wordBreak: 'keep-all',
              minWidth: '150px',
            }}
          >
            <div className="text-base font-semibold">
              {recommendation.feed.name}
            </div>

            <div className="text-xs">
              {recommendation.reasons.map((reason, i) => (
                <div key={i}>✓ {reason}</div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
