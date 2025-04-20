export const Mode = {
  Binary2Decimal: "binary2decimal",
  DecimalToBinary: "decinal2binary",
} as const;
export type Mode = (typeof Mode)[keyof typeof Mode];
export const isMode = (value: any): value is Mode => {
  return Object.values(Mode).includes(value);
};
