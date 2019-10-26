import {
  CompanyProfile,
  CompanyStory,
  CompanyStoryCreate
} from "../models/Company";
import { UserInfo } from "../models/UserInfo";
import AuthService from "./AuthService";

export default interface IApiService {
  authService: AuthService;

  getCompanies: () => Promise<CompanyProfile[]>;
  createNewStory: (company: CompanyStoryCreate) => Promise<string>;

  getCompanyStory: (id: string) => Promise<CompanyStory>;
  saveCompanyStory: (story: CompanyStory) => Promise<boolean>;
  deleteCompanyStory: (id: string) => Promise<boolean>;

  getUserProfile: () => Promise<UserInfo>;
  saveUserProfile: (user: UserInfo) => Promise<UserInfo>;

  getFolders: () => Promise<string[]>;
  getFolderCompanies: (folder: string) => Promise<CompanyProfile[]>;
}
