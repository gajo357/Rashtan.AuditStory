//
export interface CompanyStoryCreate {
  name: string;
  website: string;
}

export interface CompanyStory {
  profile: CompanyProfile;
  revenue: CompanyStoryRevenue;
  competition: CompanyCompetition;

  management: CompanyStoryManagement;
  moat: CompanyStoryMoat;

  parts: CompanyStoryCustomPart[];
}

export interface CompanyProfile {
  id: string;

  name: string;
  industry: string;
  numberOfShares: number;
  marketCap: number;
  website: string;
  folder: string;
}

export interface CompanyStoryManagement {
  ceoTrust: boolean;
  ceoTenure: number;
  ceoCandor: string;
  ceoComment: string;

  roe: number;
  roic: number;
  debt: number;

  comment: string;
}

export enum MoatKind {
  Brand = 0,
  Price = 1,
  Secrets = 2,
  Toll = 3,
  Switching = 4
}

export interface CompanyStoryMoat {
  kinds: MoatKind[];
  mainAdvantage: string;
  durable: string;

  bvps: number;
  eps: number;
  ocps: number;
  sgr: number;

  comment: string;
}

export interface CompanyCompetition {
  competitors: CompanyCompetitor[];
  industryGrowth: string;
  comment: string;
}

export interface CompanyCompetitor {
  name: string;
  marketCap: number;
  marketShare: number;
}

export interface CompanyStoryRevenue {
  totalRevenue: number;
  byLocation: Revenue[];
  byClient: Revenue[];
  byProduct: Revenue[];
  comment: string;
}

export interface Revenue {
  stream: string;
  percent: number;
}

export interface CompanyStoryCustomPart {
  title: string;
  content: string;
  comment: string;
}
