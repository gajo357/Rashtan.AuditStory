const replaceElement = <T>(array: T[], original: T, replacement: T) => {
  const index = array.findIndex(r => r === original);
  return array.splice(index, 1, replacement);
};

const removeElement = <T>(array: T[], elem: T) => array.filter(r => r !== elem);

const addElement = <T>(array: T[], elem: T) => {
  const c = Array.from(array);
  c.push(elem);

  return c;
};

export { replaceElement, removeElement, addElement };
