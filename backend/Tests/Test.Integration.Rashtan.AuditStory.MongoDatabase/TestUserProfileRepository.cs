using NUnit.Framework;
using Rashtan.AuditStory.Dto;
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
                State = Guid.NewGuid().ToString()
            };
            await repo.SaveProfileAsync(userId, profile);

            var savedProfile = await repo.GetProfileAsync(userId);

            Assert.AreEqual(profile.Name, savedProfile.Name);
            Assert.AreEqual(profile.City, savedProfile.City);
            Assert.AreEqual(profile.Country, savedProfile.Country);
            Assert.AreEqual(profile.State, savedProfile.State);
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
                State = Guid.NewGuid().ToString()
            };
            await repo.SaveProfileAsync(userId, profile);

            var savedProfile = await repo.GetProfileAsync(userId2);

            Assert.IsNull(savedProfile);
        }
    }
}
