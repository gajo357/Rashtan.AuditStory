namespace Rashtan.AuditStory.Dto

open Payment

module User =
    [<CLIMutable>]
    type UserProfileCreate = {
        Name: string
        Email: string
        
        Country: string
        City: string
    }

    type UserStatus = Paid = 0 | Expired = 1 | Trial = 2 | New = 3

    [<CLIMutable>]
    type UserProfile = {
        BasicInfo: UserProfileCreate

        PaymentInfo: PaymentInfo

        Status: UserStatus
    }

