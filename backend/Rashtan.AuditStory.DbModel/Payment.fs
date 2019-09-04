namespace Rashtan.AuditStory.DbModel

[<CLIMutable>]
type ProcessedPayment = {
    PayedAt: System.DateTime
    PayedUntil: System.DateTime
        
    Method: string
    TransactionId: string

    Amount: decimal
}

module Payment = 
    let createFreeTrial(currentTime) = {
        PayedAt = currentTime
        PayedUntil = currentTime.AddDays 31.
        Method = ""
        TransactionId = ""
        Amount = 0m
    }

