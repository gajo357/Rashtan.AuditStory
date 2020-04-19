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
type Verdict = {
  Star: bool
  Flags: string[]
  Category: string
  Comment: string
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

type UnitOfSize = Thousand=0 | Million=1 | Billion=2

[<CLIMutable>]
type CurrencyUnit = {
  Currency: string
  Unit: UnitOfSize
}

[<CLIMutable>]
type Profile = {
    Name: string
    Industry: string
    Unit: CurrencyUnit
    MarketCap: double
    Website: string
    Tags: string[]
}

[<CLIMutable>]
type Story = {
    Id: System.Guid

    Profile: Profile
    Revenue: Revenue
    Competition: Competition

    Management: Management
    Moat: Moat

    Parts: CustomPart[]

    Checklist: ChecklistItem[]

    Verdict: Verdict
}

[<CLIMutable>]
type CompanyStoryCreate = {
    Name: string
}

[<CLIMutable>]
type StoryQuickInfo = {
    Id: System.Guid
    DateEdited: System.DateTime
 
    Name: string
    Tags: string[]
    Star: bool
    Flags: int
    Category: string
}

module Empty =
    let emptyStory: Story = 
        {
            Id = System.Guid.Empty
    
            Profile = {
                Name = ""
                Industry = ""
                Unit = {
                    Currency = ""
                    Unit = UnitOfSize.Thousand
                }
                MarketCap = 0.
                Website = ""
                Tags = [||]
              }
            Revenue = {
                TotalRevenue = 0.
                ByLocation = [||]
                ByClient = [||]
                ByProduct = [||]
                Comment = ""
              }
            Competition = {
                Competitors = [||]
                IndustryGrowth = ""
                Comment = ""
              }

            Management = {
                CeoTrust = 0.
                CeoFounder = true
                CeoMajorShareholder = true
                CeoTenure = 0.

                CeoCandor = 0.
                AbleAndTalented = 0.

                Roe = 0.
                Roic = 0.
                Debt = 0.

                Comment = ""
              }
            Moat = {
                Kinds = [||]
                MainAdvantage = ""
                Durable = ""

                Bvps = 0.
                Eps = 0.
                Ocps = 0.
                Sgr = 0.

                Comment = ""
              }

            Parts = [||]

            Checklist = [||]

            Verdict = {
                Star = false
                Flags = [||]
                Category = ""
                Comment = ""
            }
        }
