'use client';

import { Card, List } from 'antd';
import Link from 'next/link';

const { Meta } = Card;

const data = [
  {
    title: '사료1',
    description: '사료1 설명',
    image:
      'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/R0H/image/FI6hVXVorpvSLMYWc6U6iBa1Z2Q',
  },
  {
    title: '사료2',
    description: '사료2 설명',
    image:
      'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/R0H/image/FI6hVXVorpvSLMYWc6U6iBa1Z2Q',
  },
  {
    title: '사료3',
    description: '사료3 설명',
    image:
      'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/R0H/image/FI6hVXVorpvSLMYWc6U6iBa1Z2Q',
  },
];
export default function RecommendResult({}: {}) {
  return (
    <List
      grid={{ gutter: 16, column: 4 }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Card
            style={{ width: 300 }}
            cover={
              <img
                alt={item.title}
                src={item.image}
                style={{ width: 250 }}
                loading="lazy"
              />
            }
            extra={<Link href="#">추천 이유</Link>}
          >
            <Meta title={item.title} description={item.description} />
          </Card>
        </List.Item>
      )}
    />
  );
}
