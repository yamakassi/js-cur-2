const str = "ереван";
const str1 = "венера";

const count = {};

for (const element of str) {
  if (count[element]) {
    count[element] += 1;
  } else {
    count[element] = 1;
  }
} console.log(count);


//annagramm\
const str = "ереваан";
const str1 = "авенера";
const setStr = new Set(str);
const setStr1 = new Set(str1);
console.log(setStr);
console.log(setStr1);