using NUnit.Framework;
using Rashtan.AuditStory.MongoRepository;
using System;
using System.Linq;
using System.Threading.Tasks;
using static Rashtan.AuditStory.Dto.Company;

namespace Test.Integration.Rashtan.AuditStory.MongoDatabase
{
    [TestFixture]
    public class TestCompanyProfileRepository : IntegrationTestBase
    {
        [Test]
        public async Task Test_ProfileCreated()
        {
            var userId = Guid.NewGuid().ToString();
            var repo = new CompanyProfileRepository(Context);
            var company = new CompanyProfile
            {
                Name = "Micron",
                Ticker = "MU",
                MarketCap = 50 * 1e9,
                Folder = "Watchlist",
                NumberOfShares = 1000000
            };
            await repo.CreateProfileAsync(userId, company);

            var profiles = (await repo.GetProfilesAsync(userId)).ToArray();

            Assert.AreEqual(1, profiles.Length);
            Assert.AreEqual(company, profiles[0]);
        }

        [Test]
        public async Task Test_GetProfilesInFolder()
        {
            var userId = Guid.NewGuid().ToString();
            var repo = new CompanyProfileRepository(Context);
            var company = new CompanyProfile
            {
                Name = "Micron",
                Ticker = "MU",
                MarketCap = 50 * 1e9,
                Folder = "Watchlist",
                NumberOfShares = 1000000
            };
            await repo.CreateProfileAsync(userId, company);

            var profiles = (await repo.GetProfilesInFolderAsync(userId, "Watchlist")).ToArray();

            Assert.AreEqual(1, profiles.Length);
            Assert.AreEqual(company, profiles[0]);
        }

        [Test]
        public async Task Test_GetProfile()
        {
            var userId = Guid.NewGuid().ToString();
            var repo = new CompanyProfileRepository(Context);
            var company = new CompanyProfile
            {
                Name = "Micron",
                Ticker = "MU",
                MarketCap = 50 * 1e9,
                Folder = "Watchlist",
                NumberOfShares = 1000000
            };
            await repo.CreateProfileAsync(userId, company);

            var profiles = await repo.GetProfileAsync(userId, "MU");

            Assert.AreEqual(company, profiles);
        }

        [Test]
        public async Task Test_GetProfile_NoProfilesForDifferentUser()
        {
            var userId = Guid.NewGuid().ToString();
            var userId2 = Guid.NewGuid().ToString();

            var repo = new CompanyProfileRepository(Context);
            var company = new CompanyProfile
            {
                Name = "Micron",
                Ticker = "MU",
                MarketCap = 50 * 1e9,
                Folder = "Watchlist",
                NumberOfShares = 1000000
            };
            await repo.CreateProfileAsync(userId, company);

            var profiles = await repo.GetProfilesAsync(userId2);

            Assert.IsEmpty(profiles);
        }

        [Test]
        public async Task Test_DeleteProfile()
        {
            var userId = Guid.NewGuid().ToString();
            var repo = new CompanyProfileRepository(Context);
            var company = new CompanyProfile
            {
                Name = "Micron",
                Ticker = "MU",
                MarketCap = 50 * 1e9,
                Folder = "Watchlist",
                NumberOfShares = 1000000
            };
            await repo.CreateProfileAsync(userId, company);

            var result = await repo.DeleteProfileAsync(userId, "MU");
            Assert.IsTrue(result);

            var profiles = await repo.GetProfilesAsync(userId);
            Assert.IsEmpty(profiles);
        }
    }
}