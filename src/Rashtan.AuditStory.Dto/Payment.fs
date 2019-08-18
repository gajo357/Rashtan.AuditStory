namespace Rashtan.AuditStory.Dto

module Payment =
    
    [<CLIMutable>]
    type PaymentToProcess = {
        Nonce: string
        Amount: decimal
        Length: int
    }

    [<CLIMutable>]
    type PaymentProcessed = {
        TransactionId: string
        Amount: decimal
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

    [<CLIMutable>]
    type Payment = {
        PayedUntil: System.DateTime
       
        PaymentNumber: int

        Amount: double
        Currency: string
    }

    [<CLIMutable>]
    type FirstPayment = {
        Payment: Payment

        SuggestedBy: string
    }

    [<CLIMutable>]
    type PaymentInfo = {
        PayedUntil: System.DateTime
    
        IsTrial: bool
    }  

