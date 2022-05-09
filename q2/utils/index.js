const checkPrime = num => {
  for (let i = 2; i < num; i++) {
    if (num % i === 0) return false;
  }
  return true;
};

export const returnNumbers = number => {
  let primes = [];

  for (let i = 0; i < number; i++) {
    if (checkPrime(i)) primes.push(i);
  }
  return primes;
};
