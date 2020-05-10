import { BASE_API } from "../services/Auth0Config";
import { UnitOfSize, CurrencyUnit } from "./Company";
import { CagrDto } from "./Calculation";
import ApiService from "../services/ApiService";

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
  fetch(`${BASE_API}/api/calculations/cagr`, {
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
    }),
    method: "POST",
    body: JSON.stringify(cagr),
  }).then(async (r) => await ApiService.unwrapResponse<number>(r));

export { calculateCagr };
