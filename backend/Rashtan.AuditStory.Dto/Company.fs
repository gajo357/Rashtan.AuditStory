namespace Rashtan.AuditStory.Dto

[<CLIMutable>]
type CompanyProfile = {
    Name: string
    Ticker: string
    StockExchange: string
    MarketCap: double
    NumberOfShares: int
    Folder: string
}

[<CLIMutable>]
type Meaning = {
    FoundBy: string
    ReasonsToOwn: string array
    Comment: string
}

[<CLIMutable>]
type Moat = {
    Description: string
    WhyIsDurable: string
    NumbersConfirm: bool

    BookValuePerShare: double
    EarningsPerShare: double
    OperatingCashPerShare: double
    SalesGrowthRate: double

    ProblemsInRecentYears: string
    Comment: string
}

[<CLIMutable>]
type Management = {
    CeoName: string
    CeoDescription: string
    Tenure: bool
    IsCeoHonest: bool

    ROIC: double
    ROE: double
    Debt: double

    Comment: string
}

[<CLIMutable>]
type MarginOfSafety = {
    EpsTtm: double
    Growth: double
    EstimatedPE: double
    Marr: double
}

[<CLIMutable>]
type TenCap = {
    PreTaxProfit: double
    DepritiationAndAmortization: double
    AccountsReceivable: double
    AccountsPayable: double
    MaintenanceCapex: double
}

[<CLIMutable>]
type PaybackTime = {
    FreeCashFlow: double
    Growth: double
}

[<CLIMutable>]
type Valuations = {
    Mos: MarginOfSafety
    TenCap: TenCap
    PaybackTime: PaybackTime
}

[<CLIMutable>]
type GuruFollow = {
    Guru: string
    PercentOfPortfolio: double
    AvgPricePaid: double
}
    
[<CLIMutable>]
type Industry = {
    Name: string
    Growth: string

    Understanding: Understanding
    Competition: CompanyProfile array
}

[<CLIMutable>]
type Inversion = {
    Inversion: string
    Rebuttal: string
}

[<CLIMutable>]
type Company = {
    Profile: CompanyProfile

    Industry: Industry

    Gurus: GuruFollow array
        
    Meaning: Meaning
    Moat: Moat
    Management: Management
    Valuations: Valuations

    Inversions: Inversion array

    Event: string

    Decision: string

    FinalComment: string
}
