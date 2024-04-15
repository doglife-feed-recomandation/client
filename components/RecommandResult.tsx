'use client';
import { FeedRecommendation } from '@/types/Feed';
import { PetInfo } from '@/types/PetInfo';

import { Card, List } from 'antd';
import Link from 'next/link';

const SAMPLE_IMAGE =
  'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/R0H/image/FI6hVXVorpvSLMYWc6U6iBa1Z2Q';

export default function RecomendResult({
  pet,
  recomendations,
}: {
  pet: PetInfo;
  recomendations: FeedRecommendation[];
}) {
  return (
    <>
      <h1>{pet.name}에게 추천하는 사료는?</h1>
      <div>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={recomendations}
          renderItem={(item) => (
            <List.Item>
              <Card
                style={{ width: 300 }}
                cover={
                  <img
                    alt={item.feed.name}
                    src={SAMPLE_IMAGE}
                    style={{ width: 250 }}
                    loading="lazy"
                  />
                }
                extra={<Link href="#">추천 이유</Link>}
              >
                <Card.Meta title={item.feed.name} description={item.reasons} />
              </Card>
            </List.Item>
          )}
        />
      </div>
    </>
  );
}
