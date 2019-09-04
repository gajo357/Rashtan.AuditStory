using Microsoft.Extensions.Configuration;
using NUnit.Framework;
using Rashtan.AuditStory.MongoRepository.Basic;
using System;

namespace Test.Integration.Rashtan.AuditStory.MongoDatabase
{
    public class IntegrationTestBase
    {
        protected MongoContext Context { get; private set; }

        [SetUp]
        public void Setup()
        {
            var databaseName = Guid.NewGuid().ToString();
            var config = InitConfiguration();
            config.GetSection("MongoSettings")["DatabaseName"] = databaseName;

            Context = new MongoContext(config);
        }

        [TearDown]
        public void Teardown()
        {
            Context?.DropDatabase();
        }

        public static IConfiguration InitConfiguration() 
            => new ConfigurationBuilder()
                .AddJsonFile("appsettings.test.json")
                .Build();
    }
}
