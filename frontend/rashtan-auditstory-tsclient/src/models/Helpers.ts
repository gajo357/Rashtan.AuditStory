import { UnitOfSize, CurrencyUnit } from "./Company";
import { CagrDto } from "./Calculation";
import { apiFetch } from "../hooks/useApi";

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
  apiFetch<number>("POST", "api/calculations/cagr", undefined, cagr);

export { calculateCagr };
