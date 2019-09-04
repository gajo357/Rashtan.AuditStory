namespace Rashtan.AuditStory.Dto

[<CLIMutable>]
type PaymentToProcess = {
    Nonce: string
    Amount: decimal
    Length: int
}

[<CLIMutable>]
type PaymentProcessed = {
    Amount: decimal
    Currency: string

    Method: string
    TransactionId: string

    PayedAt: System.DateTime
    PayedUntil: System.DateTime
}

[<CLIMutable>]
type PricingTier = {
    Title: string
    Subheader: string
    Amount: decimal
    Length: int
    Star: bool
    Description: string[]
    ButtonText: string
}
