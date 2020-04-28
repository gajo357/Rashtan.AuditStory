//
export interface StoryCreateDto {
  name: string;
}

export enum UnitOfSize {
  Thousand = 0,
  Million = 1,
  Billion = 2,
}

export interface CompanyStory {
  id: string;

  profile: ProfileDto;
  revenue: RevenueDto;
  competition: CompetitionDto;

  management: ManagementDto;
  moat: MoatDto;

  parts: CustomPartDto[];

  checklist: ChecklistItemDto[];

  verdict: VerdictDto;
}

export interface QuickInfoDto {
  id: string;

  name: string;
  star: boolean;
  flags: number;
  dateEdited: Date;
  category: string;
  tags: string[];
}

export interface ProfileDto {
  name: string;
  industry: string;
  unit: CurrencyUnit;
  marketCap: number;
  website: string;
  tags: string[];
  comment: string;
}

export interface CurrencyUnit {
  currency: string;
  unit: UnitOfSize;
}

export interface ManagementDto {
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

export interface MoatDto {
  kinds: MoatKind[];
  mainAdvantage: string;
  durable: string;

  bvps: number;
  eps: number;
  ocps: number;
  sgr: number;

  comment: string;
}

export interface CompetitionDto {
  competitors: CompetitorDto[];
  comment: string;
}

export interface CompetitorDto {
  name: string;
  marketCap: number;
  marketShare: number;
}

export interface RevenueDto {
  intro: string;
  totalRevenue: number;
  products: RevenueStreamDto[];
  comment: string;
}

export interface RevenueStreamDto {
  name: string;
  description: string;
  revenue: number;
  profit: number;
  growth: number;
}

export interface VerdictDto {
  star: boolean;
  flags: string[];
  category: string;
  comment: string;
}

export interface CustomPartDto {
  title: string;
  content: string;
}

export interface ChecklistItemDto {
  question: string;
  response: number;
}
