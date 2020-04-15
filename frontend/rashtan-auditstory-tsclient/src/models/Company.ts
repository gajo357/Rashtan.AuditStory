//
export interface CompanyStoryCreate {
  name: string;
  website: string;
}

export interface CompanyStory {
  id: string;

  dateEdited: Date;

  profile: CompanyProfile;
  revenue: CompanyStoryRevenue;
  competition: CompanyCompetition;

  management: CompanyStoryManagement;
  moat: CompanyStoryMoat;

  parts: CompanyStoryCustomPart[];

  checklist: ChecklistItem[];

  verdict: CompanyVerdict;
}

export interface CompanyQuickInfo {
  id: string;

  name: string;
  star: boolean;
  flags: number;
  dateEdited: Date;
  category: string;
  tags: string[];
}

export interface CompanyProfile {
  name: string;
  industry: string;
  marketCap: number;
  website: string;
  tags: string[];
}

export interface CompanyStoryManagement {
  ceoTrust: number;
  ceoFounder: boolean;
  ceoMajorShareholder: boolean;
  ceoTenure: number;

  ceoCandor: number;
  ableAndTalented: number;

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
  Switching = 4,
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

export interface CompanyVerdict {
  star: boolean;
  flags: string[];
  category: string;
  comment: string;
}

export interface CompanyStoryCustomPart {
  title: string;
  content: string;
}

export interface ChecklistItem {
  question: string;
  response: number;
}
