module Rashtan.AuditStory.DtoDbMapper.CompanyFromDbMapper


let emptyStory: Rashtan.AuditStory.Dto.Story = 
    {
        Profile = {
            Id = System.Guid.Empty
            LastEdited = System.DateTime.MinValue
            Name = ""
            Industry = ""
            NumberOfShares = 0
            MarketCap = 0.
            Website = ""
            Folder = ""
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
    }

let profile (db: Rashtan.AuditStory.DbModel.Profile): Rashtan.AuditStory.Dto.Profile =
    {
        Id = db.Id
        LastEdited = db.LastEdited

        Industry = db.Industry
        Name = db.Name
        Website = db.Website
        MarketCap = db.MarketCap
        NumberOfShares = db.NumberOfShares
        Folder = db.Folder
    }

let revenueItem (dto: Rashtan.AuditStory.DbModel.RevenueItem): Rashtan.AuditStory.Dto.RevenueItem =
    {
        Stream = dto.Stream
        Percent = dto.Percent
    }

let revenue (dto: Rashtan.AuditStory.DbModel.Revenue): Rashtan.AuditStory.Dto.Revenue =
    {
        TotalRevenue = dto.TotalRevenue
        ByLocation = dto.ByLocation |> Array.map revenueItem
        ByClient = dto.ByClient |> Array.map revenueItem
        ByProduct = dto.ByProduct |> Array.map revenueItem
        Comment = dto.Comment
    }
    
let competitor (dto: Rashtan.AuditStory.DbModel.Competitor): Rashtan.AuditStory.Dto.Competitor =
    {
        Name = dto.Name
        MarketCap = dto.MarketCap
        MarketShare = dto.MarketShare
    }

let competition (dto: Rashtan.AuditStory.DbModel.Competition): Rashtan.AuditStory.Dto.Competition =
    {
        IndustryGrowth = dto.IndustryGrowth
        Competitors = dto.Competitors |> Array.map competitor
        Comment = dto.Comment
    }

let management (dto: Rashtan.AuditStory.DbModel.Management): Rashtan.AuditStory.Dto.Management =
    {
        CeoTrust = dto.CeoTrust
        CeoFounder = dto.CeoFounder
        CeoMajorShareholder = dto.CeoMajorShareholder
        CeoTenure = dto.CeoTenure

        CeoCandor = dto.CeoCandor
        AbleAndTalented = dto.AbleAndTalented

        Roe = dto.Roe
        Roic = dto.Roic
        Debt = dto.Debt

        Comment = dto.Comment
    }

let moatKind (dto: Rashtan.AuditStory.DbModel.MoatKind): Rashtan.AuditStory.Dto.MoatKind = 
     dto |> int |> enum<Rashtan.AuditStory.Dto.MoatKind>

let moat (dto: Rashtan.AuditStory.DbModel.Moat): Rashtan.AuditStory.Dto.Moat = 
    {
        Kinds = dto.Kinds |> Array.map moatKind
        MainAdvantage = dto.MainAdvantage
        Durable = dto.Durable

        Bvps = dto.Bvps
        Eps = dto.Eps
        Ocps = dto.Ocps
        Sgr = dto.Sgr

        Comment = dto.Comment
    }

let customPart (dto: Rashtan.AuditStory.DbModel.CustomPart): Rashtan.AuditStory.Dto.CustomPart = 
    {
        Title = dto.Title
        Content = dto.Content
    }

let checklistItem (dto: Rashtan.AuditStory.DbModel.ChecklistItem): Rashtan.AuditStory.Dto.ChecklistItem = 
    {
        Question = dto.Question
        Response = dto.Response
    }

let story (dto: Rashtan.AuditStory.DbModel.Story): Rashtan.AuditStory.Dto.Story = 
    {
        Profile = profile dto.Profile
        Revenue = revenue dto.Revenue
        Competition = competition dto.Competition

        Management = management dto.Management
        Moat = moat dto.Moat

        Parts = dto.Parts |> Array.map customPart

        Checklist = dto.Checklist |> Array.map checklistItem
    }
