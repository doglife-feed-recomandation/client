import { createPetInfo } from "@/actions/form";
import PetInfoForm from "@/components/PetInfoForm";

export default function Home() {
  return (
    <main>
      <PetInfoForm onSubmit={createPetInfo} />
    </main>
  );
}
