import AuthService from "./AuthService";
import {
  CompanyProfile,
  CompanyStory,
  MoatKind,
  ChecklistItem,
  CompanyQuickInfo
} from "../models/Company";
import { UserInfo } from "../models/UserInfo";
import IApiService from "./IApiService";
import { UserError } from "../models/Errors";
import Category from "../models/Category";

export default class MockedApiService implements IApiService {
  public authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  private resolved = <T>(data: T) => Promise.resolve(data);
  private rejected = <T>() =>
    Promise.reject<T>(new UserError(400, "Some error"));

  private micron = {
    id: "Micron",
    name: "Micron Technologies",
    industry: "Semiconductor",
    numberOfShares: 1,
    marketCap: 100,
    website: "https://www.micron.com/",
    folder: "Wonderfull"
  };
  private micronStory = {
    profile: this.micron,
    moat: {
      kinds: [MoatKind.Brand],
      mainAdvantage: "",
      durable: "",

      bvps: 0,
      eps: 0,
      ocps: 0,
      sgr: 0,

      comment: ""
    },
    management: {
      ceoTrust: 1.5,
      ceoFounder: true,
      ceoMajorShareholder: true,
      ceoTenure: 0,

      ceoCandor: 2.5,
      ableAndTalented: 3.5,

      roe: 0,
      roic: 0,
      debt: 0,

      comment: ""
    },
    revenue: {
      totalRevenue: 0,
      byLocation: [],
      byClient: [],
      byProduct: [],
      comment: ""
    },
    competition: {
      competitors: [],
      industryGrowth: "",
      comment: ""
    },
    parts: [
      {
        title: "Meaning",
        content: "<p><strong><u>Custom meaning</u></strong></p>"
      }
    ],
    checklist: [
      { question: "Are any gurus invested in it?", response: 0.5 },
      { question: "Does it align with your values?", response: 2.5 }
    ]
  };

  getCompanies = () =>
    this.resolved<CompanyQuickInfo[]>([
      {
        id: "12345678",
        name: "Micron Technologies",
        flags: 0,
        star: true,
        category: "Wonderfull",
        dateEdited: new Date(Date.now())
      },
      {
        id: "12345677",
        name: "GrafTech",
        flags: 3,
        star: false,
        category: "Wonderfull",
        dateEdited: new Date(Date.now())
      }
    ]);
  getCompany = () => this.rejected<CompanyProfile>();

  createNewStory = () => this.resolved<string>(this.micron.id);

  getCompanyStory = () => this.resolved<CompanyStory>(this.micronStory);
  saveCompanyStory = (_: CompanyStory) => this.resolved<boolean>(true);
  deleteCompanyStory = () => this.resolved<boolean>(true);

  getUserProfile = () =>
    this.resolved<UserInfo>({
      name: "Alan",
      city: "NY",
      state: "Penn",
      country: "US"
    });
  saveUserProfile = (user: UserInfo) => this.resolved<UserInfo>(user);

  getCategories = () =>
    this.resolved<Category[]>([
      {
        name: "Wonderfull",
        color: "#009688"
      },
      {
        name: "Not understand",
        color: "#FFC107"
      }
    ]);
  saveCategory = (category: Category) => this.resolved<Category>(category);

  getChecklistItems = () =>
    this.resolved<ChecklistItem[]>([
      { question: "Do you understand the company?", response: 1.5 },
      { question: "Are you affected by latest fad?", response: 4.5 },
      { question: "Are rushed by someone to buy?", response: 4.5 }
    ]);
}
