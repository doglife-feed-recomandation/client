import { getPetInfo } from '@/actions/form';
import RecomendResult from '@/components/RecommandResult';
import { recomendHeuristically } from '@/utils/recomendation';
export default async function RecomendationPage({
  params: { ulid },
}: {
  params: { ulid: string };
}) {
  const pet = await getPetInfo(ulid);
  const recomendations = await recomendHeuristically(pet);
  return <RecomendResult pet={pet} recomendations={recomendations} />;
}
