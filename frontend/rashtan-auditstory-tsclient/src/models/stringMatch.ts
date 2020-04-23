export default (searchString: string) => (input: string) => {
  return (
    !searchString ||
    !input ||
    input.toLowerCase().includes(searchString.toLowerCase())
  );
};
