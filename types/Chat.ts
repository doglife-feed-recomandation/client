export interface Chat {
  pk: string; // petId
  sk: number; // createdAt
  content: string;
  sender: string; // AI or User
}
