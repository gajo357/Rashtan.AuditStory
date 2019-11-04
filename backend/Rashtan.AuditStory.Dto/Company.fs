namespace Rashtan.AuditStory.Dto

[<CLIMutable>]
type ChecklistItem = {
    Question: string
    Response: double
}

[<CLIMutable>]
type CustomPart = {
    Title: string
    Content: string
}

[<CLIMutable>]
type RevenueItem = {
    Stream: string
    Percent: double
}

[<CLIMutable>]
type Revenue = {
    TotalRevenue: double
    ByLocation: RevenueItem[]
    ByClient: RevenueItem[]
    ByProduct: RevenueItem[]
    Comment: string
}

[<CLIMutable>]
type Competitor = {
    Name: string
    MarketCap: double
    MarketShare: double
}

[<CLIMutable>]
type Competition = {
    Competitors: Competitor[]
    IndustryGrowth: string
    Comment: string
}

type MoatKind = Brand=0 | Price=1 | Secrets=2 | Toll=3 | Switching=4 

[<CLIMutable>]
type Moat = {
    Kinds: MoatKind[]
    MainAdvantage: string
    Durable: string

    Bvps: double
    Eps: double
    Ocps: double
    Sgr: double

    Comment: string;
}

[<CLIMutable>]
type Management = {
    CeoTrust: double
    CeoFounder: bool
    CeoMajorShareholder: bool
    CeoTenure: double

    CeoCandor: double
    AbleAndTalented: double

    Roe: double
    Roic: double
    Debt: double

    Comment: string;
}

[<CLIMutable>]
type Profile = {
    Id: System.Guid

    LastEdited: System.DateTime
    
    Name: string
    Industry: string
    NumberOfShares: int
    MarketCap: double
    Website: string
    Folder: string
}

[<CLIMutable>]
type Story = {
    Profile: Profile;
    Revenue: Revenue;
    Competition: Competition;

    Management: Management;
    Moat: Moat;

    Parts: CustomPart[];

    Checklist: ChecklistItem[];
}

[<CLIMutable>]
type CompanyStoryCreate = {
    Name: string
    Website: string
}
