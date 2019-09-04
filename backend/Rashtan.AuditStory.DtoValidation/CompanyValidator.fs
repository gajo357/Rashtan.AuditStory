namespace Rashtan.AuditStory.DtoValidation

module CompanyValidator =
    open Rashtan.AuditStory.Common
    open Rashtan.AuditStory.Dto
    open Result

    let validateProfile (dto: CompanyProfile) = result {
        do! Common.validateAlphanumeric "Name" dto.Name
        do! Common.validateAlphanumeric "Ticker" dto.Ticker
        do! Common.validateAlphanumeric "Stock Exchange" dto.StockExchange
        //let! folder = Common.validateNotEmpty "Folder" dto.Folder
        do! Common.validateMinimum "Market Cap" 0. dto.MarketCap
        do! Common.validateMinimum "Number of shares" 0 dto.NumberOfShares

        return dto
    }
