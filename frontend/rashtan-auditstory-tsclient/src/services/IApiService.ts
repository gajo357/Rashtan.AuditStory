import { CompanyProfile } from "../models/CompanyProfile";
import {
  PaymentToProcess,
  PaymentProcessed,
  PricingTier
} from "../models/PricingOption";
import { UserStatus } from "../models/UserStatus";
import { UserInfo } from "../models/UserInfo";
import AuthService from "./AuthService";

export default interface IApiService {
  authService: AuthService;

  getCompanies: () => Promise<CompanyProfile[]>;
  getCompany: (ticker: string) => Promise<CompanyProfile>;

  createNewStory: (company: CompanyProfile) => Promise<string>;

  getPaymentToken: () => Promise<string>;
  postPayment: (b: PaymentToProcess) => Promise<PaymentProcessed>;
  getUserStatus: () => Promise<UserStatus>;

  getUserProfile: () => Promise<UserInfo>;
  saveUserProfile: (user: UserInfo) => Promise<UserInfo>;

  startFreeTrial: (user: UserInfo) => Promise<UserInfo>;

  getPricingTiers: () => Promise<PricingTier[]>;

  getFolders: () => Promise<string[]>;
  getFolderCompanies: (folder: string) => Promise<CompanyProfile[]>;
}
