import {
  CompanyStory,
  StoryCreateDto,
  ChecklistItemDto
} from "../models/Company";
import { UserInfoDto, UserStatusDto } from "../models/UserInfo";
import IApiService from "./IApiService";
import Category from "../models/Category";
import { Country, Currency } from "../models/Country";
import Email from "../models/Email";

export default class ApiService implements IApiService {
  private getCommand: <TResult>(path: string) => Promise<TResult>;
  private postCommand: <TResult>(path: string, body: any) => Promise<TResult>;
  private putCommand: <TResult>(path: string, body: any) => Promise<TResult>;
  private deleteCommand: <TResult>(path: string) => Promise<TResult>;

  constructor(
    apiGet: <TResult>(path: string) => Promise<TResult>,
    apiPost: <TResult>(path: string, body: any) => Promise<TResult>,
    apiPut: <TResult>(path: string, body: any) => Promise<TResult>,
    apiDelete: <TResult>(path: string) => Promise<TResult>
  ) {
    this.getCommand = apiGet;
    this.postCommand = apiPost;
    this.putCommand = apiPut;
    this.deleteCommand = apiDelete;
  }

  private companyApi = "api/company";
  getCompanies = () =>
    this.getCommand<any[]>(this.companyApi).then(comps =>
      comps.map(c => ({ ...c, dateEdited: new Date(c.dateEdited) }))
    );
  createNewStory = (company: StoryCreateDto) =>
    this.postCommand<string>(this.companyApi, company);

  private storyApi = "api/story";
  getCompanyStory = (id: string) =>
    this.getCommand<CompanyStory>(`${this.storyApi}?id=${id}`);
  saveCompanyStory = (company: CompanyStory) =>
    this.postCommand<boolean>(this.storyApi, company);
  deleteCompanyStory = (id: string) =>
    this.deleteCommand<boolean>(`${this.storyApi}?id=${id}`);

  private userProfileApi = "api/userprofile";
  getUserProfile = () => this.getCommand<UserInfoDto>(this.userProfileApi);
  saveUserProfile = (user: UserInfoDto) =>
    this.postCommand<UserInfoDto>(this.userProfileApi, user);

  private userStatusApi = "api/userstatus";
  getUserStatus = () => this.getCommand<UserStatusDto>(this.userStatusApi);

  private categoryApi = "api/category";
  getCategories = () => this.getCommand<Category[]>(this.categoryApi);
  saveCategory = (category: Category) =>
    this.putCommand<Category>(this.categoryApi, category);
  saveCategories = (categories: Category[]) =>
    this.postCommand<void>(this.categoryApi, categories);

  getChecklistItems = () =>
    this.getCommand<ChecklistItemDto[]>("api/checklist");

  getCountries = () => this.getCommand<Country[]>("api/country");
  getCurrencies = () => this.getCommand<Currency[]>("api/currency");

  sendFeedback = (email: Email) =>
    this.postCommand<boolean>("api/sendFeedback", email);
  askForHelp = (email: Email) =>
    this.postCommand<boolean>("api/askForHelp", email);
}
