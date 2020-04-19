using NUnit.Framework;
using Rashtan.AuditStory.Dto;
using Rashtan.AuditStory.MongoRepository;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Test.Integration.Rashtan.AuditStory.MongoDatabase
{
    [TestFixture]
    public class TestCompanyStoryRepository : IntegrationTestBase
    {
        private readonly Story Micron = new Story
        {
            Id = Guid.NewGuid(),

            Profile = new Profile
            {
                Name = "Micron Technologies",
                Industry = "Semiconductor",
                MarketCap = 100,
                Website = "https://www.micron.com/",
                Tags = new string[0],
                Unit = new CurrencyUnit
                {
                    Currency = "USD",
                    Unit = UnitOfSize.Thousand
                }
            },
            Moat = new Moat
            {
                Kinds = new[] { MoatKind.Brand },
                MainAdvantage = "",
                Durable = "",

                Bvps = 0,
                Eps = 0,
                Ocps = 0,
                Sgr = 0,

                Comment = ""
            },
            Management = new Management
            {
                CeoTrust = 1.5,
                CeoFounder = true,
                CeoMajorShareholder = true,
                CeoTenure = 0,

                CeoCandor = 2.5,
                AbleAndTalented = 3.5,

                Roe = 0,
                Roic = 0,
                Debt = 0,

                Comment = ""
            },
            Revenue = new Revenue
            {
                TotalRevenue = 0,
                ByLocation = new RevenueItem[0],
                ByClient = new RevenueItem[0],
                ByProduct = new RevenueItem[0],
                Comment = ""
            },
            Competition = new Competition
            {
                Competitors = new Competitor[0],
                IndustryGrowth = "",
                Comment = ""
            },
            Parts = new CustomPart[] { 
                new CustomPart
                {
                    Title = "Meaning",
                    Content = "<p><strong><u>Custom meaning</u></strong></p>"
                 }
            },
            Checklist = new ChecklistItem[] {
              new ChecklistItem { Question = "Are any gurus invested in it?", Response = 0.5 },
              new ChecklistItem { Question = "Does it align with your values?", Response = 2.5 }
            },
            Verdict = new Verdict
            {
                Star = true,
                Category = "Wonderful",
                Flags = new string[0],
                Comment = ""
            }
        };

        [Test]
        public async Task Test_SaveStoryAsync()
        {
            var userId = Guid.NewGuid().ToString();
            var repo = new CompanyStoryRepository(Context);
            await repo.SaveStoryAsync(userId, Micron);

            var savedStory = await repo.GetStoryAsync(userId, Micron.Id);

            Assert.AreEqual(Micron, savedStory);
        }
        [Test]
        public async Task Test_SaveStoryAsync_TwiceResultsInOneResult()
        {
            var userId = Guid.NewGuid().ToString();
            var repo = new CompanyStoryRepository(Context);
            await repo.SaveStoryAsync(userId, Micron);
            await repo.SaveStoryAsync(userId, Micron);

            var quickInfos = (await repo.GetQuickInfosAsync(userId)).ToArray();

            Assert.AreEqual(1, quickInfos.Length);
        }

        [Test]
        public async Task Test_GetStoryAsync_ReturnsSaved()
        {
            var userId = Guid.NewGuid().ToString();
            var repo = new CompanyStoryRepository(Context);
            await repo.SaveStoryAsync(userId, Micron);

            var story = await repo.GetStoryAsync(userId, Micron.Id);

            Assert.AreEqual(Micron, story);
        }

        [Test]
        public async Task Test_GetQuickInfosAsync_NoStoriesForDifferentUser()
        {
            var userId = Guid.NewGuid().ToString();
            var userId2 = Guid.NewGuid().ToString();

            var repo = new CompanyStoryRepository(Context);
            await repo.SaveStoryAsync(userId, Micron);

            var quickInfos = await repo.GetQuickInfosAsync(userId2);

            Assert.IsEmpty(quickInfos);
        }

        [Test]
        public async Task Test_DeleteStoryAsync()
        {
            var userId = Guid.NewGuid().ToString();
            var repo = new CompanyStoryRepository(Context);
            await repo.SaveStoryAsync(userId, Micron);

            var result = await repo.DeleteStoryAsync(userId, Micron.Id);
            Assert.IsTrue(result);

            var quickInfos = await repo.GetQuickInfosAsync(userId);
            Assert.IsEmpty(quickInfos);
        }
    }
}