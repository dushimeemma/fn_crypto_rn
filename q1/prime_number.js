let counter = 0;
for (let i = 1; i <= 10000; i++) {
  let flag = 0;
  for (let j = 2; j < i; j++) {
    if (i % j == 0) {
      flag = 1;
      break;
    }
  }
  if (i > 1 && flag == 0) {
    counter += 1;
    console.log(i);
  }
}
console.log({ counter });
