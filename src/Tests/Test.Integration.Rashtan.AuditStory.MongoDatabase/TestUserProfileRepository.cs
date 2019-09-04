using NUnit.Framework;
using Rashtan.AuditStory.DbModel;
using Rashtan.AuditStory.MongoRepository;
using System;
using System.Threading.Tasks;

namespace Test.Integration.Rashtan.AuditStory.MongoDatabase
{
    [TestFixture]
    public class TestUserProfileRepository : IntegrationTestBase
    {
        [Test]
        public async Task Test_PaymentSaved()
        {
            var userId = Guid.NewGuid().ToString();
            var repo = new UserProfileRepository(Context);
            var profile = new UserProfile
            {
                Name = Guid.NewGuid().ToString(),
                City = Guid.NewGuid().ToString(),
                Country = Guid.NewGuid().ToString(),
                Email = Guid.NewGuid().ToString(),
                CreatedAt = DateTime.UtcNow
            };
            await repo.SaveProfileAsync(userId, profile);

            var savedProfile = await repo.GetProfileAsync(userId);

            Assert.AreEqual(profile.Name, savedProfile.Name);
            Assert.AreEqual(profile.City, savedProfile.City);
            Assert.AreEqual(profile.Country, savedProfile.Country);
            Assert.That(profile.CreatedAt, Is.EqualTo(savedProfile.CreatedAt).Within(1).Seconds);
        }

        [Test]
        public async Task Test_GetProfile_NoProfilesForDifferentUser()
        {
            var userId = Guid.NewGuid().ToString();
            var userId2 = Guid.NewGuid().ToString();

            var repo = new UserProfileRepository(Context);
            var profile = new UserProfile
            {
                Name = Guid.NewGuid().ToString(),
                City = Guid.NewGuid().ToString(),
                Country = Guid.NewGuid().ToString(),
                Email = Guid.NewGuid().ToString(),
                CreatedAt = DateTime.UtcNow
            };
            await repo.SaveProfileAsync(userId, profile);

            var savedProfile = await repo.GetProfileAsync(userId2);

            Assert.IsNull(savedProfile);
        }
    }
}
