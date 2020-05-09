using System;

namespace Rashtan.AuditStory.Functions.API.Utils
{
    public class UserInfo
    {
        public string Sub { get; set; }
        public string Given_name { get; set; }
        public string Family_name { get; set; }
        public string Nickname { get; set; }
        public string Name { get; set; }
        public string Picture { get; set; }
        public string Locale { get;set;}
        public DateTime Updated_at { get; set; }
        public string Email { get; set; }
        public bool Email_verified { get; set; }
}
}
