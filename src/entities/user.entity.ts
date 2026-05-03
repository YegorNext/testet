import { UserRole } from './role.entity';

export class UserTeamEntity {
  name!: string;
  alias!: string;
  constructor(partial: Partial<UserTeamEntity>) {
    Object.assign(this, partial);
  }
}

export class UserEntity {
  id!: string;
  name!: string;
  password!: string;
  role!: UserRole;
  teamId?: string | null;
  team?: UserTeamEntity | null;
  servers?: string[];
  archives?: string[];
  campaigns?: string[];
  token?: string | null;
  tokenExpiry?: Date | null;
  tokenVersion!: number;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
