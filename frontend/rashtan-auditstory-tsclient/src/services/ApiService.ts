import AuthService from "./AuthService";
import {
  CompanyProfile,
  CompanyStory,
  CompanyStoryCreate,
  ChecklistItem
} from "../models/Company";
import { BASE_API } from "./Auth0Config";
import { UserInfo } from "../models/UserInfo";
import IApiService from "./IApiService";
import { ResponseError, ValidationError, UserError } from "../models/Errors";

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
      "Content-Type": "application/json"
    })
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
    fetch(BASE_API + path, this.defaultHeaders()).then(r =>
      this.unwrapResponse<TResult>(r)
    );
  private deleteCommand = <TResult>(path: string) =>
    fetch(BASE_API + path, {
      ...this.defaultHeaders(),
      method: "DELETE"
    }).then(r => this.unwrapResponse<TResult>(r));

  private postCommand = <TBody, TResult>(path: string, body: TBody) =>
    fetch(BASE_API + path, {
      ...this.defaultHeaders(),
      body: JSON.stringify(body),
      method: "POST"
    }).then(r => this.unwrapResponse<TResult>(r));

  private putCommand = <TBody, TResult>(path: string, body: TBody) =>
    fetch(BASE_API + path, {
      ...this.defaultHeaders(),
      body: JSON.stringify(body),
      method: "PUT"
    }).then(r => this.unwrapResponse<TResult>(r));

  private company = "api/company/";
  getCompanies = () =>
    this.getCommand<CompanyProfile[]>(`${this.company}getprofiles`);
  createNewStory = (company: CompanyStoryCreate) =>
    this.putCommand<CompanyStoryCreate, string>(
      `${this.company}createProfile`,
      company
    );

  private story = "api/story/";
  getCompanyStory = (id: string) =>
    this.getCommand<CompanyStory>(`${this.story}${id}`);
  saveCompanyStory = (company: CompanyStory) =>
    this.postCommand<CompanyStory, boolean>(this.story, company);
  deleteCompanyStory = (id: string) =>
    this.deleteCommand<boolean>(`${this.story}${id}`);

  private userProfile = "api/userprofile";
  getUserProfile = () => this.getCommand<UserInfo>(this.userProfile);
  saveUserProfile = (user: UserInfo) =>
    this.postCommand<UserInfo, UserInfo>(this.userProfile, user);

  private folder = "api/folder/";
  getFolders = () => this.getCommand<string[]>(`${this.folder}folders`);
  getFolderCompanies = (folder: string) =>
    this.getCommand<CompanyProfile[]>(`${this.folder}companies?name=${folder}`);

  getChecklistItems = () =>
    this.getCommand<ChecklistItem[]>("api/checklistItems");
}
