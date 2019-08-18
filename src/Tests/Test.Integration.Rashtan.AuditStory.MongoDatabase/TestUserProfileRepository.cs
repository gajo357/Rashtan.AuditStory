using NUnit.Framework;
using Rashtan.AuditStory.MongoRepository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using static Rashtan.AuditStory.Dto.Payment;
using static Rashtan.AuditStory.Dto.User;

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
                BasicInfo = new UserProfileCreate
                {
                    Name = Guid.NewGuid().ToString(),
                    City = Guid.NewGuid().ToString(),
                    Country = Guid.NewGuid().ToString(),
                    Email = Guid.NewGuid().ToString()
                },
                PaymentInfo = new PaymentInfo
                {
                    IsTrial = true,
                    PayedUntil = DateTime.UtcNow
                },
                Status = UserStatus.Trial
            };
            await repo.SaveProfileAsync(userId, profile);

            var savedProfile = await repo.GetProfileAsync(userId);

            Assert.AreEqual(profile.BasicInfo, savedProfile.BasicInfo);
            Assert.AreEqual(profile.Status, savedProfile.Status);
            Assert.AreEqual(profile.PaymentInfo.IsTrial, savedProfile.PaymentInfo.IsTrial);
            Assert.That(profile.PaymentInfo.PayedUntil, Is.EqualTo(savedProfile.PaymentInfo.PayedUntil).Within(1).Seconds);
        }

        [Test]
        public async Task Test_GetProfile_NoProfilesForDifferentUser()
        {
            var userId = Guid.NewGuid().ToString();
            var userId2 = Guid.NewGuid().ToString();

            var repo = new UserProfileRepository(Context);
            var profile = new UserProfile
            {
                BasicInfo = new UserProfileCreate
                {
                    Name = Guid.NewGuid().ToString(),
                    City = Guid.NewGuid().ToString(),
                    Country = Guid.NewGuid().ToString(),
                    Email = Guid.NewGuid().ToString()
                },
                PaymentInfo = new PaymentInfo
                {
                    IsTrial = true,
                    PayedUntil = DateTime.UtcNow.AddDays(31)
                },
                Status = UserStatus.Trial
            };
            await repo.SaveProfileAsync(userId, profile);

            var savedProfile = await repo.GetProfileAsync(userId2);

            Assert.IsNull(savedProfile);
        }
    }
}
