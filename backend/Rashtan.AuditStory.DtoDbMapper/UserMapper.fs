namespace Rashtan.AuditStory.DtoDbMapper

module UserMapper =
    let toDb (dto: Rashtan.AuditStory.Dto.UserProfile) : Rashtan.AuditStory.DbModel.UserProfile =
        {
            Name = dto.Name
            Email = dto.Email
            Country = dto.Country
            City = dto.City
            CreatedAt = dto.CreatedAt
        }

    let toDto (db: Rashtan.AuditStory.DbModel.UserProfile) : Rashtan.AuditStory.Dto.UserProfile =
        {
            Name = db.Name
            Email = db.Email
            Country = db.Country
            City = db.City
            CreatedAt = db.CreatedAt
        }

