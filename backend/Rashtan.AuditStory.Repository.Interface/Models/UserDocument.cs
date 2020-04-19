namespace Rashtan.AuditStory.Repository.Interface.Models
{
    public class UserDocument<TData> : Document<TData>
        where TData : class
    {
        public string UserId { get; set; }
    }
}
