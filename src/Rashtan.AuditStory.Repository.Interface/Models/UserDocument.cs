namespace Rashtan.AuditStory.Repository.Interface.Models
{
    public class UserDocument<TData> : Document
        where TData : class
    {
        public string UserId { get; set; }

        public TData Data { get; set; }
    }
}
