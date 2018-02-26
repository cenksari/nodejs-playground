const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const result = array.every((number) => {
  if (number < 3) {
    return true;
  }

  return false;
});

console.log(result);
