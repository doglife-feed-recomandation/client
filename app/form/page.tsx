import { createPetInfo } from '@/actions/form';
import { createUser, encryptUserEmail } from '@/actions/user';
import PetInfoForm from '@/components/PetInfoForm';
import { PetInfo } from '@/types/PetInfo';
import { redirect } from 'next/navigation';

export default function Form() {
  const onSubmit = async (pet: PetInfo) => {
    'use server';
    const petId = await createPetInfo(pet);
    // petid, email로 user 생성
    if (pet.email !== undefined && pet.email !== '') {
      const user = await encryptUserEmail(petId, pet.email, pet.name);
      await createUser(user);
    }

    redirect(`/result/${petId}`);
  };

  return <PetInfoForm onSubmit={onSubmit} />;
}
