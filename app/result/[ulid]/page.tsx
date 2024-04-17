import { getPetInfo } from '@/actions/form';
import RecommendResult from '@/components/RecommendResult';
import { recommendHeuristically } from '@/utils/recommendation';
export default async function RecommendationPage({
  params: { ulid },
}: {
  params: { ulid: string };
}) {
  const pet = await getPetInfo(ulid);
  const recommendations = await recommendHeuristically(pet);
  return <RecommendResult pet={pet} recommendations={recommendations} />;
}
