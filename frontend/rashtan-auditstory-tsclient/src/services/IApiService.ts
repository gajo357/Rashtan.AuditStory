import {
  QuickInfoDto,
  CompanyStory,
  StoryCreateDto,
  ChecklistItemDto,
} from "../models/Company";
import { UserInfoDto, UserStatusDto } from "../models/UserInfo";
import AuthService from "./AuthService";
import Category from "../models/Category";
import { Country, Currency } from "../models/Country";

export default interface IApiService {
  authService: AuthService;

  getCompanies: () => Promise<QuickInfoDto[]>;
  createNewStory: (company: StoryCreateDto) => Promise<string>;

  getCompanyStory: (id: string) => Promise<CompanyStory>;
  saveCompanyStory: (story: CompanyStory) => Promise<boolean>;
  deleteCompanyStory: (id: string) => Promise<boolean>;

  getUserStatus: () => Promise<UserStatusDto>;
  getUserProfile: () => Promise<UserInfoDto>;
  saveUserProfile: (user: UserInfoDto) => Promise<UserInfoDto>;

  getChecklistItems: () => Promise<ChecklistItemDto[]>;

  getCategories: () => Promise<Category[]>;
  saveCategory: (category: Category) => Promise<Category>;
  saveCategories: (categories: Category[]) => Promise<void>;

  getCountries: () => Promise<Country[]>;
  getCurrencies: () => Promise<Currency[]>;
}
