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
                Address = "Prvi Put 1, Trebinje",
                NoEmployees = 20000,
                Tags = new[] { "Semiconductor" },
                Unit = new CurrencyUnit
                {
                    Currency = "USD",
                    Unit = UnitOfSize.Thousand
                },
                Comment = "I found it somewhere over the reinbow"
            },
            Moat = new Moat
            {
                Kinds = new[] { MoatKind.Brand },
                MainAdvantage = "",
                Durable = "",

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

                Comment = ""
            },

            Revenue = new Revenue
            {
                TotalRevenue = 0,
                Products = new[] { new RevenueItem("DRAM", "some", 45, 30, 5) },
                Comment = ""
            },
            Profitability = new Profitability
            {
                Roe = 0,
                Roic = 0,
                Debt = 0,

                SalesGrowth = 15,
                BookGrowth = 15,

                Ebit = new Growth(15, 5),
                Fcf = new Growth(16, 6),
                Opc = new Growth(17, 7),

                Comment = ""
            },
            Competition = new Competition
            {
                Competitors = new[] { new Competitor("Intel", 250, 25, 30) },
                Comment = ""
            },
            Parts = new CustomPart[] { 
                new CustomPart
                {
                    Title = "Meaning",
                    Content = "<p><strong><u>Custom meaning</u></strong></p>"
                 }
            },
            ProsCons = new ProsCons
            {
                Pro1 = "Great",
                Pro2 = "Superb",
                Pro3 = "Excellent",

                Con1 = "Debt",
                Con2 = "Awful",
                Con3 = "Terrible",

                Re1 = "Not so much",
                Re2 = "Naaah",
                Re3 = "Really?",

                Comment = "And some"
            },
            Checklist = new ChecklistItem[] {
              new ChecklistItem { Question = "Are any gurus invested in it?", Response = 0.5 },
              new ChecklistItem { Question = "Does it align with your values?", Response = 2.5 }
            },
            Verdict = new Verdict
            {
                Star = true,
                Category = "Wonderful",
                Flags = new [] { "Simply horrible", "Too much debt" },
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