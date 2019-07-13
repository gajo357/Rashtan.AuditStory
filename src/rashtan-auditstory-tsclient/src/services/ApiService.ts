import AuthService from "./AuthService";
import { IUserProfile } from "../models/IUserProfile";
import {
  PricingTier,
  PaymentProcessed,
  PaymentToProcess
} from "../models/PricingOption";
import { CompanyInfo } from "../models/CompanyInfo";

export default class ApiService {
  private authService: AuthService;

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
    fetch(path, this.defaultHeaders()).then(
      async r => (await r.json()) as TResult
    );

  private postCommand = <TBody>(path: string, body: TBody) =>
    fetch(path, {
      ...this.defaultHeaders(),
      body: JSON.stringify(body),
      method: "POST"
    }).then(async r => await r.json());

  isAuthenticated = () => this.authService.isAuthenticated();

  getCompanies = () =>
    this.getCommand<CompanyInfo[]>("api/company/getprofiles");
  getCompany = (ticker: string) => this.getCommand(`api/company/${ticker}`);

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
}
