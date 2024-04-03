export enum Breed {
  푸들 = "푸들",
  말티즈 = "말티즈",
  시츄 = "시츄",
  요크셔테리어 = "요크셔테리어",
  포메라니안 = "포메라니안",
}

export enum AllergySource {
  소스1 = "소스1",
  소스2 = "소스2",
  소스3 = "소스3",
  소스4 = "소스4",
  소스5 = "소스5",
}

export enum ProteinSource {
  소스1 = "소스1",
  소스2 = "소스2",
  소스3 = "소스3",
  소스4 = "소스4",
  소스5 = "소스5",
}

export enum Sex {
  수 = "male",
  암 = "female",
  중성화 = "neutered",
}

export interface PetInfo {
  name: string;
  breed: Breed | string;
  birth: string; // YYYY-MM
  sex: "male" | "female" | "neutered";
  menstruation?: boolean;
  pregnancy?: boolean;
  weight: number;
  allergy: boolean;
  allergySource?: AllergySource;
  protein: boolean;
  proteinSource?: ProteinSource;
  // TODO: add health problems
}
