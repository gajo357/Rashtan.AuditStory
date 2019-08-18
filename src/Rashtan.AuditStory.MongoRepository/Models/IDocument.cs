using System;

namespace Rashtan.AuditStory.MongoRepository
{
    public interface IDocument
    {
        Guid Id { get; set; }
    }
}
