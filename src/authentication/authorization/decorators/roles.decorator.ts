import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/authentication/role.enum';
// import { Role } from "@prisma/client";

export const ROLES_KEY = 'roles';
export const Roles = (...roles: String[]) => SetMetadata(ROLES_KEY, roles);
