import { Card, CardContent } from '@/components/ui/card';

import { FeedRecommendation } from '@/types/Feed';

export default function RecommendationCard({
  imgSrc,
  recommendation,
}: {
  imgSrc: string;
  recommendation: FeedRecommendation; // feed, reasons, score
}) {
  return (
    <Card className="p-4 hover:bg-gray-200 h-[95%]">
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
