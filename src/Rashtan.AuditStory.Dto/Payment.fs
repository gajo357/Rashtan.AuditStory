namespace Rashtan.AuditStory.Dto

module Payment =

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

