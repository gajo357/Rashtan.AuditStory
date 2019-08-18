using NUnit.Framework;
using Rashtan.AuditStory.MongoRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Rashtan.AuditStory.Dto.Company;

namespace Test.Integration.Rashtan.AuditStory.MongoDatabase
{
    [TestFixture]
    public class TestFolderRepository : IntegrationTestBase
    {
        [Test]
        public async Task Test_CreateFolder()
        {
            var userId = Guid.NewGuid().ToString();
            var repo = new FolderRepository(Context);
            var folder = "Watchlist";

            await repo.CreateFolderAsync(userId, folder);

            var profiles = (await repo.GetFoldersAsync(userId)).ToArray();

            Assert.AreEqual(1, profiles.Length);
            Assert.AreEqual(folder, profiles[0].Name);
        }
        [Test]
        public async Task Test_GetFolders_NoFoldersForDifferentUser()
        {
            var userId = Guid.NewGuid().ToString();
            var userId2 = Guid.NewGuid().ToString();
            var folder = "Watchlist";

            var repo = new FolderRepository(Context);
            await repo.CreateFolderAsync(userId, folder);

            var profiles = await repo.GetFoldersAsync(userId2);

            Assert.IsEmpty(profiles);
        }
    }
}
