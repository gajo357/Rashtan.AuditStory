using MongoDB.Bson.Serialization.Attributes;
using System;

namespace Rashtan.AuditStory.Repository.Interface.Models
{
    public class Document : IDocument
    {
        public Document()
        {
            Id = Guid.NewGuid();
            AddedAtUtc = DateTime.UtcNow;
        }

        /// <summary>
        /// The Id of the document
        /// </summary>
        [BsonId]
        public Guid Id { get; set; }

        /// <summary>
        /// The datetime in UTC at which the document was added.
        /// </summary>
        public DateTime AddedAtUtc { get; set; }
    }
}
