using MongoDB.Driver;

namespace Rashtan.AuditStory.MongoRepository.Basic
{
    public interface IMongoContext
    {
        IMongoCollection<TEntity> GetCollection<TEntity>();

    }
}
