import AuthService from "./AuthService";
import {
  CompanyStory,
  StoryCreateDto,
  ChecklistItemDto,
} from "../models/Company";
import { BASE_API } from "./Auth0Config";
import { UserInfoDto, UserStatusDto } from "../models/UserInfo";
import IApiService from "./IApiService";
import { UserError } from "../models/Errors";
import Category from "../models/Category";
import { Country, Currency } from "../models/Country";
import Email from "../models/Email";

export default class ApiService implements IApiService {
  public authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  private createDefaultHeaders = (token: any) => ({
    headers: new Headers({
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }),
  });

  public static unwrapResponse = async <TResult>(r: Response) => {
    if (r.ok) {
      const json = await r.json();
      return json as TResult;
    }

    if (r.status === 500) {
      throw new UserError(
        r.status,
        "An unexpected error has occured, please write to our support with the description and the steps to reproduce it."
      );
    }

    const errorText = await r.text();
    if (r.status === 400) {
      throw new UserError(r.status, errorText);
    }

    throw new Error(errorText);
  };

  private baseCommand = async <TResult>(
    method: string,
    path: string,
    body?: any
  ) => {
    const token = await this.authService.getAccessToken();
    const headers = this.createDefaultHeaders(token);
    const bodyString = body ? JSON.stringify(body) : undefined;

    const result = await fetch(BASE_API + path, {
      ...headers,
      method,
      body: bodyString,
    });

    return await ApiService.unwrapResponse<TResult>(result);
  };

  private getCommand = <TResult>(path: string) =>
    this.baseCommand<TResult>("GET", path);

  private deleteCommand = <TResult>(path: string) =>
    this.baseCommand<TResult>("DELETE", path);

  private postCommand = <TBody, TResult>(path: string, body: TBody) =>
    this.baseCommand<TResult>("POST", path, body);

  private putCommand = <TBody, TResult>(path: string, body: TBody) =>
    this.baseCommand<TResult>("PUT", path, body);

  private companyApi = "api/company";
  getCompanies = () =>
    this.getCommand<any[]>(this.companyApi).then((comps) =>
      comps.map((c) => ({ ...c, dateEdited: new Date(c.dateEdited) }))
    );
  createNewStory = (company: StoryCreateDto) =>
    this.postCommand<StoryCreateDto, string>(this.companyApi, company);

  private storyApi = "api/story";
  getCompanyStory = (id: string) =>
    this.getCommand<CompanyStory>(`${this.storyApi}?id=${id}`);
  saveCompanyStory = (company: CompanyStory) =>
    this.postCommand<CompanyStory, boolean>(this.storyApi, company);
  deleteCompanyStory = (id: string) =>
    this.deleteCommand<boolean>(`${this.storyApi}?id=${id}`);

  private userProfileApi = "api/userprofile";
  getUserProfile = () => this.getCommand<UserInfoDto>(this.userProfileApi);
  saveUserProfile = (user: UserInfoDto) =>
    this.postCommand<UserInfoDto, UserInfoDto>(this.userProfileApi, user);

  private userStatusApi = "api/userstatus";
  getUserStatus = () => this.getCommand<UserStatusDto>(this.userStatusApi);

  private categoryApi = "api/category";
  getCategories = () => this.getCommand<Category[]>(this.categoryApi);
  saveCategory = (category: Category) =>
    this.putCommand<Category, Category>(this.categoryApi, category);
  saveCategories = (categories: Category[]) =>
    this.postCommand<Category[], void>(this.categoryApi, categories);

  getChecklistItems = () =>
    this.getCommand<ChecklistItemDto[]>("api/checklist");

  getCountries = () => this.getCommand<Country[]>("api/country");
  getCurrencies = () => this.getCommand<Currency[]>("api/currency");

  sendFeedback = (email: Email) =>
    this.postCommand<Email, boolean>("api/sendFeedback", email);
  askForHelp = (email: Email) =>
    this.postCommand<Email, boolean>("api/askForHelp", email);
}
