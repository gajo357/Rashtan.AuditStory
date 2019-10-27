const replaceElement = <T>(array: T[], original: T, replacement: T) => {
  return array.map(r => {
    if (r === original) {
      return replacement;
    }
    return r;
  });
};

const removeElement = <T>(array: T[], elem: T) => array.filter(r => r !== elem);

const addElement = <T>(array: T[], elem: T) => {
  const c = Array.from(array);
  c.push(elem);

  return c;
};

export { replaceElement, removeElement, addElement };
