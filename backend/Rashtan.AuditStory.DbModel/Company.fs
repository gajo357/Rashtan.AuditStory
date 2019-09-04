namespace Rashtan.AuditStory.DbModel

[<CLIMutable>]
type CompanyProfile = {
    Name: string
    Ticker: string
    StockExchange: string
    MarketCap: double
    NumberOfShares: int
    Folder: string
}

