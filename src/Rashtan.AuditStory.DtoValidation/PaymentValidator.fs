namespace Rashtan.AuditStory.DtoValidation

module PaymentValidator = 
    open Rashtan.AuditStory.Common
    open Rashtan.AuditStory.Dto
    open Result

    let validatedToProcess (dto: PaymentToProcess) = result {
        do! Common.validateMinimum "Amount" 0m dto.Amount
        do! Common.validateAlphanumeric "Nonce" dto.Nonce
        do! Common.validateMinimum "Length" 0 dto.Length
    }
