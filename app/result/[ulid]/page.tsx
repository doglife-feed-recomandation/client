import { getPetInfo } from '@/actions/form';
import RecommendResult from '@/components/RecommendResult';
import { getInitialMessages } from '@/utils/prompt';
import { recommendHeuristically } from '@/utils/recommendation';

export default async function RecommendationPage({
  params: { ulid },
}: {
  params: { ulid: string };
}) {
  const pet = await getPetInfo(ulid);
  const recommendations = await recommendHeuristically(pet);
  const initialMessages = await getInitialMessages(pet, ulid, recommendations);
  return (
    <RecommendResult
      petId={ulid}
      pet={pet}
      recommendations={recommendations}
      initialMessages={initialMessages}
    />
  );
}
