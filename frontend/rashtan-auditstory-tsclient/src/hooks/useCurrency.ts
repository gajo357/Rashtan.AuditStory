export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

const getCurrencySymbol = (code?: string) =>
  currencies.find(c => c.code === code)?.symbol;

const currencies: Currency[] = [
  { code: "ALL", name: "Albanian lek", symbol: "L" },
  { code: "ARS", name: "Argentine peso", symbol: "$" },
  { code: "AUD", name: "Australian dollar", symbol: "$" },
  {
    code: "BAM",
    name: "Bosnia and Herzegovina convertible mark",
    symbol: "BAM"
  },
  { code: "BRL", name: "Brazilian real", symbol: "R$" },
  { code: "GBP", name: "British pound", symbol: "£" },
  { code: "BGN", name: "Bulgarian lev", symbol: "лв" },
  { code: "CAD", name: "Canadian dollar", symbol: "$" },
  { code: "CNY", name: "Chinese yuan", symbol: "¥" },
  { code: "HRK", name: "Croatian kuna", symbol: "kn" },
  { code: "CZK", name: "Czech koruna", symbol: "Kč" },
  { code: "DKK", name: "Danish krone", symbol: "kr" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GEL", name: "Georgian Lari", symbol: "ლ" },
  { code: "HUF", name: "Hungarian forint", symbol: "Ft" },
  { code: "INR", name: "Indian rupee", symbol: "₹" },
  { code: "IDR", name: "Indonesian rupiah", symbol: "Rp" },
  { code: "ILS", name: "Israeli new shekel", symbol: "₪" },
  { code: "JPY", name: "Japanese yen", symbol: "¥" },
  { code: "MKD", name: "Macedonian denar", symbol: "ден" },
  { code: "MXN", name: "Mexican peso", symbol: "$" },
  { code: "NOK", name: "Norwegian krone", symbol: "kr" },
  { code: "PLN", name: "Polish złoty", symbol: "zł" },
  { code: "RON", name: "Romanian leu", symbol: "lei" },
  { code: "RUB", name: "Russian ruble", symbol: "₽" },
  { code: "RSD", name: "Serbian dinar", symbol: "дин" },
  { code: "SEK", name: "Swedish krona", symbol: "kr" },
  { code: "CHF", name: "Swiss franc", symbol: "Fr" },
  { code: "TRY", name: "Turkish lira", symbol: "TRY" },
  { code: "UAH", name: "Ukrainian hryvnia", symbol: "₴" },
  { code: "USD", name: "United State Dollar", symbol: "$" }
];

const formatValue = (value: number) => value.toFixed(2);

const formatWithCurrencySign = (
  currency: string,
  value: number | undefined
) => {
  if (!value) return "";
  if (!currency) return formatValue(value);

  const currencySign = getCurrencySymbol(currency);

  // Symbol to the left of the amount, no space
  if (currency === "USD" || currency === "GBP" || currency === "SGD")
    return `${currencySign}${formatValue(value)}`;

  // Symbol to the left of the amount, non-breaking space
  if (
    currency === "ZAR" ||
    currency === "CHF" ||
    currency === "TWD" ||
    currency === "NZD" ||
    currency === "NOK" ||
    currency === "PHP" ||
    currency === "MXN" ||
    currency === "MYR" ||
    currency === "KRW" ||
    currency === "JPY" ||
    currency === "ILS" ||
    currency === "INR" ||
    currency === "HKD" ||
    currency === "DKK" ||
    currency === "CNY" ||
    currency === "BRL" ||
    currency === "CAD" ||
    currency === "AUD" ||
    currency === "ARS"
  )
    return `${currencySign} ${formatValue(value)}`;

  // Symbol to the right of the amount, non-breaking space
  return `${formatValue(value)} ${currencySign}`;
};

export { formatValue, formatWithCurrencySign };
