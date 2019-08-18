namespace Rashtan.AuditStory.MongoRepository.Models
{
    public class UserDocument<TData> : Document
        where TData: class
    {
        public string UserId { get; set; }

        public TData Data { get; set; }
    }
}
