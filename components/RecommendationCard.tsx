import { FeedRecommendation } from '@/types/Feed';

const SAMPLE_IMAGE =
  'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/R0H/image/FI6hVXVorpvSLMYWc6U6iBa1Z2Q';

export default function RecommendationCard({
  recommendation,
}: {
  recommendation: FeedRecommendation;
}) {
  return (
    <div
      className="p-4 hover:scale-110"
      style={{
        cursor: 'pointer',
        border: '1px solid #e2e8f0',
        borderRadius: '0.5rem',
      }}
    >
      <div className="mx-auto">
        <img
          alt={recommendation.feed.name}
          src={SAMPLE_IMAGE}
          loading="lazy"
          className="mx-auto"
          style={{
            width: '100px',
            height: '100px',
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
        <div className="text-sm">{recommendation.feed.name}</div>
        <div className="text-xs">
          {recommendation.reasons.map((reason, i) => (
            <div key={i}>- {reason}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
