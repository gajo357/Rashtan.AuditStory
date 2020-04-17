import AuthService from "./AuthService";
import {
  CompanyStory,
  CompanyStoryCreate,
  ChecklistItem,
} from "../models/Company";
import { BASE_API } from "./Auth0Config";
import { UserInfo } from "../models/UserInfo";
import IApiService from "./IApiService";
import { ResponseError, ValidationError, UserError } from "../models/Errors";
import Category from "../models/Category";
import { Country, Currency } from "../models/Country";

export default class ApiService implements IApiService {
  public authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  private token = () => this.authService.getAccessToken();

  private defaultHeaders = () => ({
    headers: new Headers({
      Accept: "application/json",
      Authorization: `Bearer ${this.token()}`,
      "Content-Type": "application/json",
    }),
  });

  private unwrapResponse = async <TResult>(r: Response) => {
    const json = await r.json();
    if (r.ok) {
      return json as TResult;
    } else if (r.status === 400) {
      const re = json as ResponseError;
      if (re.property) {
        throw new ValidationError(re.property, re.message);
      }
      throw new UserError(r.status, re.message);
    }

    throw new Error(json);
  };

  private getCommand = <TResult>(path: string) =>
    fetch(BASE_API + path, this.defaultHeaders()).then((r) =>
      this.unwrapResponse<TResult>(r)
    );
  private deleteCommand = <TResult>(path: string) =>
    fetch(BASE_API + path, {
      ...this.defaultHeaders(),
      method: "DELETE",
    }).then((r) => this.unwrapResponse<TResult>(r));

  private postCommand = <TBody, TResult>(path: string, body: TBody) =>
    fetch(BASE_API + path, {
      ...this.defaultHeaders(),
      body: JSON.stringify(body),
      method: "POST",
    }).then((r) => this.unwrapResponse<TResult>(r));

  private putCommand = <TBody, TResult>(path: string, body: TBody) =>
    fetch(BASE_API + path, {
      ...this.defaultHeaders(),
      body: JSON.stringify(body),
      method: "PUT",
    }).then((r) => this.unwrapResponse<TResult>(r));

  private companyApi = "api/company";
  getCompanies = () =>
    this.getCommand<any[]>(this.companyApi).then((comps) =>
      comps.map((c) => ({ ...c, dateEdited: new Date(c.dateEdited) }))
    );
  createNewStory = (company: CompanyStoryCreate) =>
    this.putCommand<CompanyStoryCreate, string>(this.companyApi, company);

  private storyApi = "api/story";
  getCompanyStory = (id: string) =>
    this.getCommand<CompanyStory>(`${this.storyApi}?id=${id}`);
  saveCompanyStory = (company: CompanyStory) =>
    this.postCommand<CompanyStory, boolean>(this.storyApi, company);
  deleteCompanyStory = (id: string) =>
    this.deleteCommand<boolean>(`${this.storyApi}?id=${id}`);

  private userProfileApi = "api/userprofile";
  getUserProfile = () => this.getCommand<UserInfo>(this.userProfileApi);
  saveUserProfile = (user: UserInfo) =>
    this.postCommand<UserInfo, UserInfo>(this.userProfileApi, user);

  private categoryApi = "api/category";
  getCategories = () => this.getCommand<Category[]>(this.categoryApi);
  saveCategory = (category: Category) =>
    this.putCommand<Category, Category>(this.categoryApi, category);
  saveCategories = (categories: Category[]) =>
    this.postCommand<Category[], void>(this.categoryApi, categories);

  getChecklistItems = () => this.getCommand<ChecklistItem[]>("api/checklist");

  private countryApi = "api/country";
  getCountries = () =>
    this.getCommand<Country[]>(this.countryApi + "/countries");
  getCurrencies = () =>
    this.getCommand<Currency[]>(this.countryApi + "/currencies");
}
