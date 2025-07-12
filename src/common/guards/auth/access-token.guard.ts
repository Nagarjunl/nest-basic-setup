import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { REQUEST_USER_KEY } from '../../constants';
import { JwtConfig } from '../../config/jwt.config';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(JwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof JwtConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log("🔍 AccessTokenGuard: Starting canActivate");
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    console.log("🔍 AccessTokenGuard: Authorization header:", request.headers.authorization);
    console.log("🔍 AccessTokenGuard: Token extracted:", token ? "Token exists" : "No token");

    if (!token) {
      console.log("❌ AccessTokenGuard: No token found, throwing UnauthorizedException");
      throw new UnauthorizedException();
    }

    try {
      console.log("🔍 AccessTokenGuard: Attempting to verify token...");
      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration,
      );

      console.log("✅ AccessTokenGuard: Token verified successfully!");
      console.log("📦 AccessTokenGuard: Payload:", payload);

      request[REQUEST_USER_KEY] = payload;
    } catch (error) {
      console.log("❌ AccessTokenGuard: Token verification failed:", error.message);
      throw new UnauthorizedException();
    }
    console.log("✅ AccessTokenGuard: Returning true");
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [_, token] = request.headers.authorization?.split(' ') ?? [];
    return token;
  }
} 