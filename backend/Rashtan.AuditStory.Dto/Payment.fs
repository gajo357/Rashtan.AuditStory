namespace Rashtan.AuditStory.Dto

[<CLIMutable>]
type PaymentProcessed = {
    PayerEmail: string

    Amount: decimal
    Currency: string

    ItemName: string
    ItemNumber: int

    TransactionId: string

    PayedAt: System.DateTime
}
