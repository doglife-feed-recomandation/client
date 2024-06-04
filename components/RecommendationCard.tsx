import { Card, CardContent } from '@/components/ui/card';
import { sendGAEvent } from '@/lib/ga';

import { FeedRecommendation } from '@/types/Feed';
import { PetInfo } from '@/types/PetInfo';

export default function RecommendationCard({
  recommendation,
  petId,
  pet,
}: {
  recommendation: FeedRecommendation;
  petId: string;
  pet: PetInfo;
}) {
  return (
    <Card
      className="p-4 hover:bg-zinc-100 h-[95%]"
      onClick={() => {
        sendGAEvent('click_recommended_feed', {
          feed_id: recommendation.feed.id,
          feed_name: recommendation.feed.name,
          pet_id: petId,
          pet_name: pet.name,
        });

        window.open(recommendation.feed.storeLink, '_blank');
      }}
    >
      <CardContent>
        <div className="space-y-6">
          <div className="mx-auto">
            <img
              alt={recommendation.feed.storeName}
              src={recommendation.feed.imgSrc}
              loading="lazy"
              className="mx-auto"
              style={{
                width: '90%',
                height: '90%',
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
              {recommendation.feed.storeName}
            </div>

            <div className="text-xs">
              {[
                ...recommendation.reasons,
                ...(recommendation.feed.points || []),
              ].map((reason, i) => (
                <div key={i}>✓ {reason}</div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
