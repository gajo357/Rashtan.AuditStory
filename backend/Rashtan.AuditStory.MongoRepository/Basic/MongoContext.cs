using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace Rashtan.AuditStory.MongoRepository.Basic
{
    public class MongoContext : IMongoContext
    {
        private MongoClient MongoClient { get; }
        private string DatabaseName { get; }

        private IMongoDatabase Database { get; }

        public MongoContext(IConfiguration configuration)
        {
            // Configure mongo
            var mongoSection = configuration.GetSection("MongoSettings");
            MongoClient = new MongoClient(mongoSection.GetSection("Connection").Value);
            DatabaseName = mongoSection.GetSection("DatabaseName").Value;
            Database = MongoClient.GetDatabase(DatabaseName);
        }

        public IMongoCollection<TEntity> GetCollection<TEntity>() => Database.GetCollection<TEntity>(typeof(TEntity).Name);

        public void DropDatabase() => MongoClient.DropDatabase(DatabaseName);
    }
}
