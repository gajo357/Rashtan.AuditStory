namespace Rashtan.AuditStory.Dto

type PaymentStatus = New=0 | Paying=1 | Expired=2

[<CLIMutable>]
type UserStatus = {
    Message: string
    Status: PaymentStatus
}

[<CLIMutable>]
type UserProfile = {
    Name: string
    Email: string
        
    Country: string
    State: string
    City: string
    
    Agreement: bool;
}

