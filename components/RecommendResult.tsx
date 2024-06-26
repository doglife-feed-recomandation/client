'use client';
import { FeedRecommendation } from '@/types/Feed';
import { PetInfo } from '@/types/PetInfo';

import AIChatBox from './AIChatBox';
import RecommendationCard from './RecommendationCard';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import { Message } from 'ai';

const SAMPLE_IMAGE: string[] = [
  'https://images.pet-friends.co.kr/storage/pet_friends/product/id/b/3/6/3/5/7/7/b363577c819e69bc130f6d920a6d38b0/10000/c3052822fd73a27225aac340eedad67a.jpeg',
  'https://ecimg.cafe24img.com/pg41b50746730063/jjhy95/web/product/big/20230611/04a7623522ef83bf7c546800edb41fd5.png',
  'https://b2bdoctordog.cafe24.com/web/product/big/202302/28a7a4d5a5bde9923a464015355f1dd1.jpg',
  'http://www.naturesvariety.co.kr/nvk-product/pro_img/ori_rabbit.png',
  'https://godomall.speedycdn.net/e4f9d7bfbb9098980d09533eed438eb6/goods/1000000368/image/magnify/1000000368_magnify_053.jpg',
  'https://img.dogpre.com/mobile/dogpre/product/68/67201_detailView_01764565.png',
];

export default function RecommendResult({
  petId,
  pet,
  recommendations,
  initialMessages,
}: {
  petId: string;
  pet: PetInfo;
  recommendations: FeedRecommendation[];
  initialMessages: Message[];
}) {
  return (
    <div className="w-full flex flex-col rounded border bg-background shadow-xl">
      <div className="w-full">
        <h1 className="text-2xl p-4 font-semibold">
          {pet.name}에게 추천하는 사료는?
        </h1>
      </div>

      <Carousel
        opts={{
          align: 'start',
        }}
        className="px-4 max-h-[25%] w-full"
      >
        <CarouselContent>
          {recommendations.map((recommendation, index) => (
            <CarouselItem
              key={index}
              className="sm:basis-1/2 md:basis-1/2 lg:basis-3/12"
            >
              <RecommendationCard
                key={recommendation.feed.id}
                recommendation={recommendation}
                petId={petId}
                pet={pet}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="w-full">
        <AIChatBox petId={petId} initialMessages={initialMessages} />
      </div>
    </div>
  );
}
