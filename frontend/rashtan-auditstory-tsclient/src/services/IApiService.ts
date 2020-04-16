import {
  CompanyQuickInfo,
  CompanyStory,
  CompanyStoryCreate,
  ChecklistItem,
} from "../models/Company";
import { UserInfo } from "../models/UserInfo";
import AuthService from "./AuthService";
import Category from "../models/Category";
import Country from "../models/Country";

export default interface IApiService {
  authService: AuthService;

  getCompanies: () => Promise<CompanyQuickInfo[]>;
  createNewStory: (company: CompanyStoryCreate) => Promise<string>;

  getCompanyStory: (id: string) => Promise<CompanyStory>;
  saveCompanyStory: (story: CompanyStory) => Promise<boolean>;
  deleteCompanyStory: (id: string) => Promise<boolean>;

  getUserProfile: () => Promise<UserInfo>;
  saveUserProfile: (user: UserInfo) => Promise<UserInfo>;

  getChecklistItems: () => Promise<ChecklistItem[]>;

  getCategories: () => Promise<Category[]>;
  saveCategory: (category: Category) => Promise<Category>;
  saveCategories: (categories: Category[]) => Promise<void>;

  getCountries: () => Promise<Country[]>;
}
