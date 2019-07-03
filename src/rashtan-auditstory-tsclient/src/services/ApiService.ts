import AuthService from "./AuthService";

export default class ApiService {
  authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  private token = () => this.authService.getAccessToken();

  private defaultHeaders = () => ({
    headers: new Headers({
      Accept: "application/json",
      Authorization: `Bearer ${this.token()}`
    })
  });

  private getCommand = (path: string) => fetch(path, this.defaultHeaders());

  getCompanies = () => this.getCommand("api/companyprofile");
  getCompany = (ticker: string) => this.getCommand(`api/company/${ticker}`);

  getUserProfile = () => this.getCommand("api/userprofile");
  getTickerInfo = (ticker: string) => this.getCommand(`api/ticker${ticker}`);
}
