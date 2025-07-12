import { registerAs } from '@nestjs/config';

export const JwtConfig = registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET || 'super-secret',
  audience: process.env.JWT_TOKEN_AUDIENCE || 'localhost:3000',
  issuer: process.env.JWT_TOKEN_ISSUER || 'auth-service',
  accessTokenTtl: parseInt(process.env.JWT_ACCESS_TOKEN_TTL || '900', 10), // 15 minutes
  refreshTokenTtl: parseInt(process.env.JWT_REFRESH_TOKEN_TTL || '86400', 10), // 24 hours
})); 