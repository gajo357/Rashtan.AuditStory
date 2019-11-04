module Rashtan.AuditStory.DtoDbMapper.CompanyToDbMapper
open System

let idCreator id =
    match id = Guid.Empty with
    | true -> Guid.NewGuid()
    | false -> id

let isNotEmptyOrNull = String.IsNullOrEmpty >> not

let profile dateTimeProvider (dto: Rashtan.AuditStory.Dto.Profile): Rashtan.AuditStory.DbModel.Profile =
    {
        Id = idCreator dto.Id
        LastEdited = dateTimeProvider()

        Industry = dto.Industry
        Name = dto.Name
        Website = dto.Website
        MarketCap = dto.MarketCap
        NumberOfShares = dto.NumberOfShares
        Folder = dto.Folder
    }

let revenueItem (dto: Rashtan.AuditStory.Dto.RevenueItem): Rashtan.AuditStory.DbModel.RevenueItem =
    {
        Stream = dto.Stream
        Percent = dto.Percent
    }

let filterRevenueStream (dtos: Rashtan.AuditStory.Dto.RevenueItem[]) =
    dtos |> Array.filter (fun dto -> dto.Stream |> isNotEmptyOrNull)

let revenue (dto: Rashtan.AuditStory.Dto.Revenue): Rashtan.AuditStory.DbModel.Revenue =
    {
        TotalRevenue = dto.TotalRevenue
        ByLocation = dto.ByLocation |> filterRevenueStream |> Array.map revenueItem
        ByClient = dto.ByClient |> filterRevenueStream |> Array.map revenueItem
        ByProduct = dto.ByProduct |> filterRevenueStream |> Array.map revenueItem
        Comment = dto.Comment
    }
    
let competitor (dto: Rashtan.AuditStory.Dto.Competitor): Rashtan.AuditStory.DbModel.Competitor =
    {
        Name = dto.Name
        MarketCap = dto.MarketCap
        MarketShare = dto.MarketShare
    }

let competition (dto: Rashtan.AuditStory.Dto.Competition): Rashtan.AuditStory.DbModel.Competition =
    {
        IndustryGrowth = dto.IndustryGrowth
        Competitors = dto.Competitors |> Array.filter (fun c -> c.Name |> String.IsNullOrEmpty |> not) |> Array.map competitor
        Comment = dto.Comment
    }

let management (dto: Rashtan.AuditStory.Dto.Management): Rashtan.AuditStory.DbModel.Management =
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

let moatKind (dto: Rashtan.AuditStory.Dto.MoatKind): Rashtan.AuditStory.DbModel.MoatKind = 
     dto |> int |> enum<Rashtan.AuditStory.DbModel.MoatKind>

let moat (dto: Rashtan.AuditStory.Dto.Moat): Rashtan.AuditStory.DbModel.Moat = 
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

let customPart (dto: Rashtan.AuditStory.Dto.CustomPart): Rashtan.AuditStory.DbModel.CustomPart = 
    {
        Title = dto.Title
        Content = dto.Content
    }

let checklistItem (dto: Rashtan.AuditStory.Dto.ChecklistItem): Rashtan.AuditStory.DbModel.ChecklistItem = 
    {
        Question = dto.Question
        Response = dto.Response
    }

let story dateTimeProvider (dto: Rashtan.AuditStory.Dto.Story): Rashtan.AuditStory.DbModel.Story = 
    {
        Profile = profile dateTimeProvider dto.Profile
        Revenue = revenue dto.Revenue
        Competition = competition dto.Competition

        Management = management dto.Management
        Moat = moat dto.Moat

        Parts = dto.Parts |> Array.map customPart

        Checklist = dto.Checklist |> Array.filter (fun c -> c.Question |> isNotEmptyOrNull) |> Array.map checklistItem
    }


let emptyStory = story (fun () -> DateTime.MinValue) CompanyFromDbMapper.emptyStory

let createProfile dateTimeProvider (dto: Rashtan.AuditStory.Dto.CompanyStoryCreate): Rashtan.AuditStory.DbModel.Profile =
    {
        Id = idCreator Guid.Empty
        LastEdited = dateTimeProvider()

        Industry = ""
        Name = dto.Name
        Website = dto.Website
        MarketCap = 0.
        NumberOfShares = 0
        Folder = "Undecided"
    }

let createStory dateTimeProvider (dto: Rashtan.AuditStory.Dto.CompanyStoryCreate): Rashtan.AuditStory.DbModel.Story = 
    { emptyStory with Profile = createProfile dateTimeProvider dto }
