import { getPetInfo } from '@/actions/form';
import { recomendHeuristically } from '@/utils/recomendation';

export default async function RecomendationPage({
  params: { ulid },
}: {
  params: { ulid: string };
}) {
  const pet = await getPetInfo(ulid);
  const recomendations = await recomendHeuristically(pet);
  return (
    <>
      <h1>{pet.name}에게 추천하는 사료는?</h1>
      <div>
        {recomendations.map((rec) => (
          <div key={rec.feed.ID}>
            <h2>{rec.feed.name}</h2>
            <ul>
              {rec.reasons.map((reason, i) => (
                <li key={i}>{reason}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
