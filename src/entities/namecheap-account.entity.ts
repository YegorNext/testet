export class NamecheapAccountEntity {
  id!: string;
  name!: string;
  apiUser!: string;
  apiKey!: string;
  userName!: string;
  clientIp!: string;
  apiUrl!: string;
  billing?: any; // <- вместо JsonValue
  createdAt!: Date;
  updatedAt!: Date;

  constructor(partial: Partial<NamecheapAccountEntity>) {
    Object.assign(this, partial);
  }
}