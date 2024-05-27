declare namespace NodeJS {
  interface ProcessEnv {
    DB_ACCESS_KEY_ID: string;
    DB_SECRET_ACCESS_KEY: string;
    OPENAI_API_KEY: string;
    CRYPTO_KEY: string;
    CRYPTO_IV: string;
  }
}
