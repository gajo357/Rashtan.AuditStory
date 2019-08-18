using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;

namespace Test.Integration.Rashtan.AuditStory.MongoDatabase
{
    internal class MoqDbConfiguration : MoqConfiguration
    {
        public MoqDbConfiguration(string connection, string databaseName)
            : base(new Dictionary<string, IConfigurationSection>
            {
                { "MongoSettings", new MoqConfigurationSection(new Dictionary<string, IConfigurationSection>
                    {
                        { "Connection", new MoqConfigurationSection(connection) },
                        { "DatabaseName", new MoqConfigurationSection(databaseName) }
                    })
                }
            })
        {
        }
    }

    internal class MoqConfiguration : IConfiguration
    {
        public IReadOnlyDictionary<string, IConfigurationSection> Sections { get; }
        public MoqConfiguration(IReadOnlyDictionary<string, IConfigurationSection> sections)
        {
            Sections = sections;
        }

        public string this[string key] { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

        public IEnumerable<IConfigurationSection> GetChildren()
        {
            throw new NotImplementedException();
        }

        public IChangeToken GetReloadToken()
        {
            throw new NotImplementedException();
        }

        public IConfigurationSection GetSection(string key) => Sections[key];
    }

    internal class MoqConfigurationSection : MoqConfiguration, IConfigurationSection
    {
        public MoqConfigurationSection(string value) : base(new Dictionary<string, IConfigurationSection>())
        {
            Value = value;
        }

        public MoqConfigurationSection(IReadOnlyDictionary<string, IConfigurationSection> sections)
            : base(sections)
        {
        }


        public string Key => throw new NotImplementedException();

        public string Path => throw new NotImplementedException();

        public string Value { get; set; }
    }
}
