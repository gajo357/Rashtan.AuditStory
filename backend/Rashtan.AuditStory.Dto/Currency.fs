namespace Rashtan.AuditStory.Dto

[<CLIMutable>]
type Currency = {
  Code: string;
  Name: string;
  Symbol: string;
}

[<CLIMutable>]
type Country = {
  Flag: string
  Name: string
  Alpha3Code: string
  Currencies: Currency[]
}

[<CLIMutable>]
type CountriesCurrencies = {
    Countries: Country[]
    Currencies: Currency[]
}