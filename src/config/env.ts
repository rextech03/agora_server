import dotenv from 'dotenv';
dotenv.config();

export const env = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN!,
  AGORA_APP_ID: process.env.AGORA_APP_ID!,
  AGORA_APP_CERT: process.env.AGORA_APP_CERT!,
  PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY!,
  PAYSTACK_PUBLIC_KEY: process.env.PAYSTACK_PUBLIC_KEY!
};
