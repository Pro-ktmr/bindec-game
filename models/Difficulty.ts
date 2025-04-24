export const Difficulty = {
  Easy: 0,
  Normal: 1,
  Hard: 2,
} as const;
export type Difficulty = (typeof Difficulty)[keyof typeof Difficulty];
export const isDifficulty = (value: any): value is Difficulty => {
  return Object.values(Difficulty).includes(value);
};

export type GeneratorSettings = {
  binaryDigits: number;
  decimalDigits: number;
  min: number;
  max: number;
};
