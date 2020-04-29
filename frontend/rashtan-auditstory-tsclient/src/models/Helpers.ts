import { UnitOfSize, CurrencyUnit } from "./Company";
import { CagrDto } from "./Calculation";

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

const calculateCagr = (cagr: CagrDto) =>
  fetch("https://cagr.azurewebsites.net/api/cagr", {
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
    }),
    method: "POST",
    body: JSON.stringify(cagr),
  }).then(async (r) => {
    const json = await r.json();
    return json as number;
  });

export { calculateCagr };
