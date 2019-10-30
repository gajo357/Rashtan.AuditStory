import AuthService from "./AuthService";
import { CompanyProfile, CompanyStory, MoatKind } from "../models/Company";
import { UserInfo } from "../models/UserInfo";
import IApiService from "./IApiService";
import { UserError } from "../models/Errors";

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
    website: "",
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
      ceoTrust: true,
      ceoTenure: 0,
      ceoCandor: "",
      ceoComment: "",

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
        content: "Custom meaning",
        comment: ""
      }
    ]
  };

  getCompanies = () => this.resolved<CompanyProfile[]>([this.micron]);
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

  getFolders = () => this.resolved<string[]>(["Wonderfull"]);
  getFolderCompanies = () => this.resolved<CompanyProfile[]>([this.micron]);
}
