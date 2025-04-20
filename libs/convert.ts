export const numberToBinary = (num: number, digits: number): string => {
  return num.toString(2).padStart(digits, "0");
};

export const numberToDecimal = (num: number, digits: number): string => {
  return num.toString(10).padStart(digits, "0");
};
