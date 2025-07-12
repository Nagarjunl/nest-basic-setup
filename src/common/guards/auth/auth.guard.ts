import { Inject, UnauthorizedException } from '@nestjs/common';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthType } from '../../enums';
import { AccessTokenGuard } from './access-token.guard';
import { AUTH_TYPE_KEY } from '../../constants';

@Injectable()
export class AuthGuard implements CanActivate {
  private static readonly defaultAuthType = AuthType.Bearer;

  private readonly authTypeGuardMap: Record<
    AuthType,
    CanActivate | CanActivate[]
  > = {
    [AuthType.Bearer]: this.accessTokenGuard,
    [AuthType.None]: { canActivate: () => true },
  };

  constructor(
    @Inject(Reflector) private reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log("🔍 AuthGuard: Starting canActivate");
    
    const authTypes = this.reflector.getAllAndOverride<AuthType[]>(
      AUTH_TYPE_KEY,
      [context.getHandler(), context.getClass()],
    ) ?? [AuthGuard.defaultAuthType];

    console.log("🔍 AuthGuard: Auth types found:", authTypes);

    const guards = authTypes.map((type) => this.authTypeGuardMap[type]).flat();
    console.log("🔍 AuthGuard: Guards to execute:", guards.length);

    let error = new UnauthorizedException();

    for (const instance of guards) {
      console.log("🔍 AuthGuard: Executing guard:", instance.constructor.name);
      const canActivate = await Promise.resolve(
        instance.canActivate(context),
      ).catch((err) => {
        console.log("❌ AuthGuard: Guard failed:", err.message);
        error = err;
      });

      if (canActivate) {
        console.log("✅ AuthGuard: Guard succeeded, returning true");
        return true;
      }
    }
    console.log("❌ AuthGuard: All guards failed, throwing error");
    throw error;
  }
} 