import { DomainEntity } from './domain.entity';

export class ServerEntity {
  id!: string;
  name!: string;
  ip!: string;
  rootPassword!: string;
  forgePassword!: string;
  userId?: string | null;
  domains!: DomainEntity[];
  price!: number;
  status!: boolean;
  createdAt!: Date;
  expiredAt!: Date;

  constructor(partial: Partial<ServerEntity>) {
    Object.assign(this, partial);
  }
}
