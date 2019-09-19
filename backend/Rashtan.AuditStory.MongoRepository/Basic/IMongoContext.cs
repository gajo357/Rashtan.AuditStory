using MongoDB.Driver;
using Rashtan.AuditStory.Repository.Interface.Models;

namespace Rashtan.AuditStory.MongoRepository.Basic
{
    public interface IMongoContext
    {
        IMongoCollection<TEntity> GetCollection<TEntity>();
        IMongoCollection<UserDocument<TEntity>> GetUserDataCollection<TEntity>() where TEntity : class;
    }
}
