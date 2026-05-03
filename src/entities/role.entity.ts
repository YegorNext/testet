import { $Enums } from '../generated/prisma';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export const userRoleMap: Record<$Enums.Role, UserRole> = {
  ADMIN: UserRole.ADMIN,
  USER: UserRole.USER,
};
