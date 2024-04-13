import { createPetInfo } from '@/actions/form';
import PetInfoForm from '@/components/PetInfoForm';
import RecommendResult from '@/components/RecommendResult';

export default function Home() {
  return (
    <main>
      <PetInfoForm onSubmit={createPetInfo} />
      <RecommendResult />
    </main>
  );
}
