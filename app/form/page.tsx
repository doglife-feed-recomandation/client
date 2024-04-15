import { createPetInfo } from '@/actions/form';
import PetInfoForm from '@/components/PetInfoForm';
import { PetInfo } from '@/types/PetInfo';
import { redirect } from 'next/navigation';

export default function Form() {
  const onSubmit = async (pet: PetInfo) => {
    'use server';
    const id = await createPetInfo(pet);
    redirect(`/result/${id}`);
  };

  return (
    <main>
      <PetInfoForm onSubmit={onSubmit} />
    </main>
  );
}
