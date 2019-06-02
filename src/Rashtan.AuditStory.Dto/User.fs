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

    [<CLIMutable>]
    type UserProfile = {
        BasicInfo: UserProfileCreate

        PaymentInfo: PaymentInfo
    }

