import AuthService from "./AuthService";
import { UserStatus } from "../models/UserStatus";
import {
  PricingTier,
  PaymentProcessed,
  PaymentToProcess
} from "../models/PricingOption";
import { CompanyProfile } from "../models/CompanyProfile";
import { UserInfo } from "../models/UserInfo";
import IApiService from "./IApiService";
import { UserError } from "../models/Errors";

export default class MockedApiService implements IApiService {
  public authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  private resolved = <T>(data: T) => Promise.resolve(data);
  private rejected = <T>() =>
    Promise.reject<T>(new UserError(400, "Some error"));

  private micron = {
    name: "Micron Technologies",
    numberOfShares: 1,
    ticker: "MU",
    stockExchange: "NYSE",
    marketCap: 100,
    folder: "Wonderfull"
  };

  getCompanies = () => this.resolved<CompanyProfile[]>([this.micron]);
  getCompany = (ticker: string) => this.rejected<CompanyProfile>();

  createNewStory = (company: CompanyProfile) =>
    this.resolved<string>(company.ticker);

  getPaymentToken = () => this.resolved<string>("");
  postPayment = (b: PaymentToProcess) =>
    this.resolved<PaymentProcessed>({
      transactionId: "sadfasd",
      amount: b.amount,
      payedUntil: new Date(Date.now())
    });

  getUserStatus = () => this.resolved<UserStatus>(UserStatus.Paying);

  getUserProfile = () =>
    this.resolved<UserInfo>({
      name: "Alan",
      city: "NY",
      state: "Penn",
      country: "US"
    });
  saveUserProfile = (user: UserInfo) => this.resolved<UserInfo>(user);

  startFreeTrial = (user: UserInfo) => this.resolved<UserInfo>(user);

  getPricingTiers = () => this.resolved<PricingTier[]>([]);

  getFolders = () => this.resolved<string[]>(["Wonderfull"]);
  getFolderCompanies = (folder: string) =>
    this.resolved<CompanyProfile[]>([this.micron]);
}
