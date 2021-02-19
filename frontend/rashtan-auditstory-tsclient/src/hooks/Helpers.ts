const searchMatch = (searchingFor: string, searchingIn: string) =>
  !searchingFor ||
  searchingIn.toLowerCase().includes(searchingFor.toLowerCase());

const makeLength = (str: string, length: number) => {
  var padding = Array(length).join(" "); // make a string of white spaces
  return (str + padding).substring(0, length);
};

const isNumber = (x: any): x is number => typeof x === "number";

const isString = (x: any): x is string => typeof x === "string";

const getEnumValues = <TEnum>(enumObj: TEnum) =>
  (Object.keys(enumObj) as Array<keyof TEnum>)
    .filter(p => typeof enumObj[p] === "number")
    .map(p => enumObj[p]);

export { searchMatch, makeLength, isNumber, isString, getEnumValues };
