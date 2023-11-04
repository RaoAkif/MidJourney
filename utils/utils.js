export function uniqueArrayOfObjects(inputArray) {
  const uniqueSet = new Set();

  const uniqueArray = inputArray.filter((obj) => {
    const objectString = JSON.stringify(obj);
    const isUnique = !uniqueSet.has(objectString);
    if (isUnique) {
      uniqueSet.add(objectString);
    }
    return isUnique;
  });

  return uniqueArray;
}
