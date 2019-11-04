namespace Rashtan.AuditStory.Dto

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
