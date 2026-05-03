export class DomainEntity {
  id!: string;
  name!: string;
  serverId!: string;
  repoId!: string;
  sshUrl!: string;
  price!: number;
  hasSSL!: boolean;
  campaign!: string;

  constructor(partial: Partial<DomainEntity>) {
    Object.assign(this, partial);
  }
}
