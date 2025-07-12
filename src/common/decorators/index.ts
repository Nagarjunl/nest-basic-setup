import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { ActiveUserData } from '../interfaces';
import { REQUEST_USER_KEY } from '../constants';

// Re-export decorators from auth.decorators.ts
export { Public, Auth, Roles, AdminOnly, EmployeeOnly, UserOnly } from './auth.decorators';

// Active user decorator to extract user from request
export const ActiveUser = createParamDecorator(
  (field: keyof ActiveUserData | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: ActiveUserData | undefined = request[REQUEST_USER_KEY];
    return field ? user?.[field] : user;
  },
);

// Current user decorator (alias for ActiveUser)
export const CurrentUser = ActiveUser; 