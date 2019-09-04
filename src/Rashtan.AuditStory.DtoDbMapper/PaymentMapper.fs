namespace Rashtan.AuditStory.DtoDbMapper

module PaymentMapper =
    let toDb (dto: Rashtan.AuditStory.Dto.PaymentProcessed) : Rashtan.AuditStory.DbModel.ProcessedPayment = 
        {
            Amount = dto.Amount
            PayedAt = dto.PayedAt
            PayedUntil = dto.PayedUntil
            TransactionId = dto.TransactionId
            Method = dto.Method
        }

    let toDto (db: Rashtan.AuditStory.DbModel.ProcessedPayment) : Rashtan.AuditStory.Dto.PaymentProcessed = 
        {
            Amount = db.Amount
            Currency = "USD"
            PayedAt = db.PayedAt
            PayedUntil = db.PayedUntil
            TransactionId = db.TransactionId
            Method = db.Method
        }