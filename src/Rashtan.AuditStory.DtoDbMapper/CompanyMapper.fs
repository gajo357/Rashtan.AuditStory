namespace Rashtan.AuditStory.DtoDbMapper

module CompanyMapper =
    let profileToDb (dto: Rashtan.AuditStory.Dto.CompanyProfile): Rashtan.AuditStory.DbModel.CompanyProfile =
        {
            Name = dto.Name
            Ticker = dto.Ticker
            StockExchange = dto.StockExchange
            MarketCap = dto.MarketCap
            NumberOfShares = dto.NumberOfShares
            Folder = dto.Folder
        }
    let profileToDto (db: Rashtan.AuditStory.DbModel.CompanyProfile): Rashtan.AuditStory.Dto.CompanyProfile =
        {
            Name = db.Name
            Ticker = db.Ticker
            StockExchange = db.StockExchange
            MarketCap = db.MarketCap
            NumberOfShares = db.NumberOfShares
            Folder = db.Folder
        }
