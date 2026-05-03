export class ArchiveEntity {
  id!: string;
  name!: string;
  path!: string;
  userId!: string;
  createdAt!: Date;

  constructor(partial: Partial<ArchiveEntity>) {
    Object.assign(this, partial);
  }
}

export class DownloadArchiveEntity {
  id!: string;
  name!: string;
  link!: string;

  constructor(partial: Partial<DownloadArchiveEntity>) {
    Object.assign(this, partial);
  }
}
