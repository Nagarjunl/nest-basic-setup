import { registerAs } from '@nestjs/config';

export const AppConfig = registerAs('app', () => ({
  name: process.env.APP_NAME || 'NestJS Basic Setup',
  version: process.env.APP_VERSION || '1.0.0',
  port: parseInt(process.env.PORT || '3000', 10),
  environment: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
  isTest: process.env.NODE_ENV === 'test',
}));

export const DatabaseConfig = registerAs('database', () => ({
  url: process.env.DATABASE_URL,
}));

export const MailConfig = registerAs('mail', () => ({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_SECURE === 'true',
  user: process.env.ADMIN_EMAIL,
  password: process.env.EMAIL_PASSWORD,
})); 