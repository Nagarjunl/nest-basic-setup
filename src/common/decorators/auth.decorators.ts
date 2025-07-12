import { SetMetadata } from '@nestjs/common';
import { AuthType, Role } from '../enums';
import { AUTH_TYPE_KEY, ROLES_KEY } from '../constants';

// Auth type decorator
export const Auth = (...authTypes: AuthType[]) =>
  SetMetadata(AUTH_TYPE_KEY, authTypes);

// Roles decorator
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

// Public route decorator
export const Public = () => Auth(AuthType.None);

// Admin only decorator
export const AdminOnly = () => Roles(Role.Admin);

// Employee only decorator
export const EmployeeOnly = () => Roles(Role.Employee);

// User only decorator
export const UserOnly = () => Roles(Role.User); 