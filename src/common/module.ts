import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from './config/jwt.config';
import { AuthGuard } from './guards/auth/auth.guard';
import { AccessTokenGuard } from './guards/auth/access-token.guard';
import { RolesGuard } from './guards/auth/roles.guard';

@Module({
  imports: [
    ConfigModule.forFeature(JwtConfig),
    JwtModule.registerAsync(JwtConfig.asProvider()),
  ],
  providers: [AuthGuard, AccessTokenGuard, RolesGuard],
  exports: [JwtModule, ConfigModule, AuthGuard, AccessTokenGuard, RolesGuard],
})
export class CommonModule {} 