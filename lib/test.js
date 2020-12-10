const insertThird = (arr, element) => {
  const num = Math.floor(arr.length / 3);
  if (arr.length / 3 === num) {
    for (let i = 0; i < num - 1; i++) {
      arr.splice((i + 1) * 3 + i, 0, element);
    }
  } else {
    for (let i = 0; i < num; i++) {
      arr.splice((i + 1) * 3 + i, 0, element);
    }
  }
  return arr;
};

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const el = "a";

insertThird(array, el);
console.log(array);
