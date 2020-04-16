export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export interface Country {
  flag: string;
  name: string;
  alpha3Code: string;
  currencies: Currency[];
}
