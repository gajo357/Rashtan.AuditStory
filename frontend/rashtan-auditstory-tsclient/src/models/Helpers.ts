import { UnitOfSize, CurrencyUnit } from "./Company";

const stringMatch = (searchString: string) => (input: string) => {
  return (
    !searchString ||
    !input ||
    input.toLowerCase().includes(searchString.toLowerCase())
  );
};

const currencyString = (currency: CurrencyUnit | undefined) =>
  currency ? ` (${UnitOfSize[currency.unit]} ${currency.currency})` : "";

export { stringMatch, currencyString };
