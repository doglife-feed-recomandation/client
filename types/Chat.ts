

export interface Chat {
    pk: string; // session id
    sk: number; // createdAt
    content: string;
    sender: string; // AI or User
}