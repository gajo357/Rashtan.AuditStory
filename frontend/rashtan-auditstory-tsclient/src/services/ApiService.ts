import AuthService from "./AuthService";
import { UserStatus } from "../models/IUserProfile";
import {
  PricingTier,
  PaymentProcessed,
  PaymentToProcess
} from "../models/PricingOption";
import { CompanyProfile } from "../models/CompanyProfile";
import Folder from "../models/Folder";
import { BASE_API } from "./Auth0Config";
import { UserInfo } from "../models/UserInfo";

export default class ApiService {
  public authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  private token = () => this.authService.getAccessToken();

  private defaultHeaders = () => ({
    headers: new Headers({
      Accept: "application/json",
      Authorization: `Bearer ${this.token()}`,
      "Content-Type": "application/json"
    })
  });

  private getCommand = <TResult>(path: string) =>
    fetch(BASE_API + path, this.defaultHeaders()).then(
      async r => (await r.json()) as TResult
    );

  private postCommand = <TBody>(path: string, body: TBody) =>
    fetch(BASE_API + path, {
      ...this.defaultHeaders(),
      body: JSON.stringify(body),
      method: "POST"
    }).then(async r => await r.json());

  private company = "api/company/";
  getCompanies = () =>
    this.getCommand<CompanyProfile[]>(`${this.company}getprofiles`);
  getCompany = (ticker: string) =>
    this.getCommand<CompanyProfile>(`${this.company}profile?ticker=${ticker}`);

  createNewStory = (company: CompanyProfile) =>
    this.postCommand(`${this.company}createProfile`, company).then(
      c => c as string
    );

  private payment = "api/payment";
  getPaymentToken = () => this.getCommand<string>(this.payment);
  postPayment = (b: PaymentToProcess): Promise<PaymentProcessed> =>
    this.postCommand(this.payment, b).then(r => ({
      transactionId: r.transactionId,
      amount: r.amount,
      payedUntil: new Date(Date.parse(r.payedUntil))
    }));

  getUserStatus = () => this.getCommand<UserStatus>("api/userstatus");

  private userProfile = "api/userprofile";
  getUserProfile = () => this.getCommand<UserInfo>(this.userProfile);
  saveUserProfile = (user: UserInfo) =>
    this.postCommand<UserInfo>(this.userProfile, user);

  startFreeTrial = (user: UserInfo) =>
    this.postCommand<UserInfo>("api/freeTrial", user);

  getTickerInfo = (ticker: string) => this.getCommand(`api/ticker${ticker}`);

  getPricingTiers = () => this.getCommand<PricingTier[]>("api/pricing");

  private folder = "api/folder/";
  getFolders = () => this.getCommand<Folder[]>(`${this.folder}folders`);
  getFolderCompanies = (folder: string) =>
    this.getCommand<CompanyProfile[]>(`${this.folder}companies?name=${folder}`);
}
