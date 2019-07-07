namespace Rashtan.AuditStory.Dto

module Payment =
    
    [<CLIMutable>]
    type PaymentToProcess = {
        Nonce: string
        Amount: decimal
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

    let demoTiers = [|
      {
        Title = "Free trial"
        Subheader = "Usually start here"
        Amount = 0M
        Star = false
        Description = [|"All features included"; "One month trial"; "Support"|]
        ButtonText = "Start free trial"
      }
      {
        Title = "Monthly"
        Subheader = "30% discount"
        Amount = 3.99M
        Star = false
        Description = [|"All features included"; "Support"|]
        ButtonText = "Get monthly"
      }
      {
        Title = "Yearly"
        Subheader = "50% discount"
        Amount = 29.99M
        Star = true
        Description = [|"All features included"; "Support"|]
        ButtonText = "Get yearly"
      }
    |]

