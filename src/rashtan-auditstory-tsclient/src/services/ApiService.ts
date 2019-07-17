import AuthService from "./AuthService";
import { IUserProfile } from "../models/IUserProfile";
import {
  PricingTier,
  PaymentProcessed,
  PaymentToProcess
} from "../models/PricingOption";
import { CompanyInfo } from "../models/CompanyInfo";
import Folder from "../models/Folder";
import { BASE_API } from "./Auth0Config";

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

  getCompanies = () =>
    this.getCommand<CompanyInfo[]>("api/company/getprofiles");
  getCompany = (ticker: string) =>
    this.getCommand<CompanyInfo>(`api/company/profile?ticker=${ticker}`);

  getUserProfile = () => this.getCommand<IUserProfile>("api/userprofile");
  getTickerInfo = (ticker: string) => this.getCommand(`api/ticker${ticker}`);

  getPaymentToken = () => this.getCommand<string>("api/payment");
  postPayment = (b: PaymentToProcess): Promise<PaymentProcessed> =>
    this.postCommand("api/payment", b).then(r => ({
      transactionId: r.transactionId,
      amount: r.amount,
      payedUntil: new Date(Date.parse(r.payedUntil))
    }));

  getPricingTiers = () => this.getCommand<PricingTier[]>("api/pricing");

  createNewStory = (company: CompanyInfo) =>
    this.postCommand("api/company/createProfile", company).then(
      c => c as string
    );

  getFolders = () => this.getCommand<Folder[]>("api/folder/get");
  getFolderCompanies = (folder: string) =>
    this.getCommand<CompanyInfo[]>(`api/folder/companies?name=${folder}`);
}
