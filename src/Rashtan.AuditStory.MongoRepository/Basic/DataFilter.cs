namespace Rashtan.AuditStory.MongoRepository.Basic
{
    public class DataFilter<TValue>
    {
        public DataFilter(string field, TValue value)
        {
            Field = field;
            Value = value;
        }

        public string Field { get; }
        public TValue Value { get; }
    }
}
