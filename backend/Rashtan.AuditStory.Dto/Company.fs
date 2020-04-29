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
    Name: string
    Description: string
    Revenue: double
    Profit: double
    Growth: double
}

[<CLIMutable>]
type Revenue = {
    Intro: string
    TotalRevenue: double
    Products: RevenueItem[]
    Comment: string
}

[<CLIMutable>]
type Competitor = {
    Name: string
    MarketCap: double
    Revenue: double
    Margin: double
}

[<CLIMutable>]
type Competition = {
    Competitors: Competitor[]
    Comment: string
}

[<CLIMutable>]
type Growth = {
  Margin: double
  Growth: double
}

[<CLIMutable>]
type Profitability = {
  Roe: double
  Roic: double
  Debt: double

  Ebit: Growth
  Fcf: Growth
  Opc: Growth

  SalesGrowth: double
  BookGrowth: double

  Comment: string
}

type MoatKind = Brand=0 | Price=1 | Secrets=2 | Toll=3 | Switching=4 

[<CLIMutable>]
type Moat = {
    Kinds: MoatKind[]
    MainAdvantage: string
    Durable: string

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
    Address: string
    NoEmployees: int
    Tags: string[]
    Comment: string
}

[<CLIMutable>]
type Story = {
    Id: System.Guid

    Profile: Profile
    Revenue: Revenue
    Profitability: Profitability
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
                Address = ""
                NoEmployees = 0
                Tags = [||]
                Comment = ""
              }
            Revenue = {
                Intro = ""
                TotalRevenue = 0.
                Products = [||]
                Comment = ""
              }
            Profitability = {
                Roe = 0.
                Roic = 0.
                Debt = 0.

                SalesGrowth = 0.
                BookGrowth = 0.

                Ebit = { Margin = 0.; Growth = 0. }
                Fcf = { Margin = 0.; Growth = 0. }
                Opc = { Margin = 0.; Growth = 0. }

                Comment = ""
            }
            Competition = {
                Competitors = [||]
                Comment = ""
              }

            Management = {
                CeoTrust = 0.
                CeoFounder = true
                CeoMajorShareholder = true
                CeoTenure = 0.

                CeoCandor = 0.
                AbleAndTalented = 0.

                Comment = ""
              }
            Moat = {
                Kinds = [||]
                MainAdvantage = ""
                Durable = ""

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
