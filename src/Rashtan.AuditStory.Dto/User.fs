namespace Rashtan.AuditStory.Dto

[<CLIMutable>]
type UserProfile = {
    Name: string
    Email: string
        
    Country: string
    City: string

    CreatedAt: System.DateTime
}

