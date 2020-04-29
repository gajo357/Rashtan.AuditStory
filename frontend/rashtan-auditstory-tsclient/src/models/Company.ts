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
  profitability: ProfitabilityDto;
  competition: CompetitionDto;

  management: ManagementDto;
  moat: MoatDto;

  parts: CustomPartDto[];

  checklist: ChecklistItemDto[];

  prosCons: ProsConsDto;

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
  address: string;
  noEmployees: number;
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

  comment: string;
}

export interface CompetitionDto {
  competitors: CompetitorDto[];
  comment: string;
}

export interface CompetitorDto {
  name: string;
  marketCap: number;
  revenue: number;
  margin: number;
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

export interface GrowthDto {
  margin: number;
  growth: number;
}

export interface ProfitabilityDto {
  roe: number;
  roic: number;
  debt: number;

  ebit: GrowthDto;
  fcf: GrowthDto;
  opc: GrowthDto;

  salesGrowth: number;
  bookGrowth: number;

  comment: string;
}

export interface ProsConsDto {
  pro1: string;
  pro2: string;
  pro3: string;

  con1: string;
  con2: string;
  con3: string;

  re1: string;
  re2: string;
  re3: string;

  comment: string;
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
