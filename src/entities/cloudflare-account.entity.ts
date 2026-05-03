export class CloudflareAccountEntity {
  id!: string;
  name!: string;
  apiToken!: string;
  email!: string;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(partial: Partial<CloudflareAccountEntity>) {
    Object.assign(this, partial);
  }
}