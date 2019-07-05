import AuthService from "./AuthService";
import { IUserProfile } from "../models/IUserProfile";
import {
  PricingTier,
  PaymentProcessed,
  PaymentToProcess
} from "../models/PricingOption";

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

  private getCommand = (path: string) =>
    fetch(path, this.defaultHeaders()).then(async r => await r.json());

  private postCommand = <TBody>(path: string, body: TBody) =>
    fetch(path, {
      ...this.defaultHeaders(),
      body: JSON.stringify(body),
      method: "POST"
    }).then(async r => await r.json());

  isAuthenticated = () => this.authService.isAuthenticated();

  getCompanies = () => this.getCommand("api/companyprofile");
  getCompany = (ticker: string) => this.getCommand(`api/company/${ticker}`);

  getUserProfile = () =>
    this.getCommand("api/userprofile").then((r: IUserProfile) => r);
  getTickerInfo = (ticker: string) => this.getCommand(`api/ticker${ticker}`);

  getPaymentToken = () => this.getCommand("api/payment").then(r => r as string);
  postPayment = (b: PaymentToProcess) =>
    this.postCommand("api/payment", b).then(r => r as PaymentProcessed);

  getPricingTiers = () =>
    this.getCommand("api/pricing").then(r => r as PricingTier[]);
}
