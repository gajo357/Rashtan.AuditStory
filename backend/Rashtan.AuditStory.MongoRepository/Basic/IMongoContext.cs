using MongoDB.Driver;
using Rashtan.AuditStory.Repository.Interface.Models;

namespace Rashtan.AuditStory.MongoRepository.Basic
{
    public interface IMongoContext
    {
        IMongoCollection<TEntity> GetCollection<TEntity>();
        IMongoCollection<Document<TEntity>> GetDataCollection<TEntity>() where TEntity : class;
        IMongoCollection<UserDocument<TEntity>> GetUserDataCollection<TEntity>() where TEntity : class;
    }
}
