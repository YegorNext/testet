export class MemberEntity {
  id!: string;
  name!: string;

  constructor(partial: Partial<MemberEntity>) {
    Object.assign(this, partial);
  }
}

export class TeamEntity {
  id!: string;
  name!: string;
  alias!: string;
  members?: MemberEntity[];

  constructor(partial: Partial<TeamEntity>) {
    Object.assign(this, partial);
  }
}
