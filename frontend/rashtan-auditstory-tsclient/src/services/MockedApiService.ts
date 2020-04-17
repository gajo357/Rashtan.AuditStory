import AuthService from "./AuthService";
import {
  CompanyProfile,
  CompanyStory,
  MoatKind,
  ChecklistItem,
  CompanyQuickInfo,
  UnitOfSize,
} from "../models/Company";
import { UserInfo } from "../models/UserInfo";
import IApiService from "./IApiService";
import { UserError, ResponseError, ValidationError } from "../models/Errors";
import Category from "../models/Category";
import { Country } from "../models/Country";
import { CountriesAPI } from "./Auth0Config";

export default class MockedApiService implements IApiService {
  public authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  private resolved = <T>(data: T) =>
    new Promise((resolve: (d: T) => void) =>
      setTimeout(() => resolve(data), Math.random() * 2000)
    );
  private rejected = <T>() =>
    Promise.reject<T>(new UserError(400, "Some error"));

  private micronStory: CompanyStory = {
    id: "12345678",
    dateEdited: new Date(Date.now()),
    profile: {
      name: "Micron Technologies",
      unit: { currency: "USD", unit: UnitOfSize.Million },
      industry: "Semiconductor",
      marketCap: 100,
      website: "https://www.micron.com/",
      tags: ["semiconductor"],
    },
    moat: {
      kinds: [MoatKind.Brand],
      mainAdvantage: "",
      durable: "",

      bvps: 0,
      eps: 0,
      ocps: 0,
      sgr: 0,

      comment: "",
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

      comment: "",
    },
    revenue: {
      totalRevenue: 0,
      byLocation: [],
      byClient: [],
      byProduct: [],
      comment: "",
    },
    competition: {
      competitors: [],
      industryGrowth: "",
      comment: "",
    },
    parts: [
      {
        title: "Meaning",
        content: "<p><strong><u>Custom meaning</u></strong></p>",
      },
    ],
    checklist: [
      { question: "Are any gurus invested in it?", response: 0.5 },
      { question: "Does it align with your values?", response: 2.5 },
    ],
    verdict: {
      category: "Wonderfull",
      flags: ["Some event"],
      star: true,
      comment: "Great company with bright future ahead",
    },
  };

  getCompanies = () =>
    this.resolved<CompanyQuickInfo[]>([
      {
        id: "12345678",
        name: "Micron Technologies",
        flags: 0,
        star: true,
        category: "Wonderfull",
        dateEdited: new Date(Date.now()),
        tags: ["semiconductor"],
      },
      {
        id: "12345677",
        name: "GrafTech",
        flags: 3,
        star: false,
        category: "Not understand",
        dateEdited: new Date(Date.now()),
        tags: ["steel", "cheap"],
      },
    ]);
  getCompany = () => this.rejected<CompanyProfile>();

  createNewStory = () => this.resolved(this.micronStory.id);

  getCompanyStory = () => this.resolved(this.micronStory);
  saveCompanyStory = (_: CompanyStory) => this.resolved(true);
  deleteCompanyStory = () => this.resolved(true);

  getUserProfile = () =>
    this.resolved<UserInfo>({
      name: "Alan",
      email: "alan@alan.com",
      city: "NY",
      state: "Penn",
      country: "USA",
    });
  saveUserProfile = (user: UserInfo) => this.resolved(user);

  categories = [
    {
      name: "Wonderfull",
      color: "#009688",
    },
    {
      name: "Not understand",
      color: "#FFC107",
    },
  ];
  getCategories = () => this.resolved<Category[]>(this.categories);
  saveCategory = (category: Category) => {
    this.categories.push(category);
    return this.resolved(category);
  };
  saveCategories = (categories: Category[]) => {
    this.categories = [...categories];
    return this.resolved(undefined);
  };

  getChecklistItems = () =>
    this.resolved<ChecklistItem[]>([
      { question: "Do you understand the company?", response: 1.5 },
      { question: "Are you affected by latest fad?", response: 4.5 },
      { question: "Are rushed by someone to buy?", response: 4.5 },
    ]);

  getCountries = () =>
    fetch(CountriesAPI).then(async (r) => {
      const json = await r.json();
      if (r.ok) {
        return json as Country[];
      } else if (r.status === 400) {
        const re = json as ResponseError;
        if (re.property) {
          throw new ValidationError(re.property, re.message);
        }
        throw new UserError(r.status, re.message);
      }

      throw new Error(json);
    });

  getCurrencies = () =>
    fetch(CountriesAPI).then(async (r) => {
      const json = await r.json();
      if (r.ok) {
        const countries = json as Country[];
        return countries
          .flatMap((c) => c.currencies)
          .filter((v, i, arr) => arr.findIndex((t) => t.code === v.code) === i);
      } else if (r.status === 400) {
        const re = json as ResponseError;
        if (re.property) {
          throw new ValidationError(re.property, re.message);
        }
        throw new UserError(r.status, re.message);
      }

      throw new Error(json);
    });
}
