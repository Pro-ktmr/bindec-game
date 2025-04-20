export const Phase = {
  CountDown: 0,
  Game: 1,
  Result: 2,
} as const;
export type Phase = (typeof Phase)[keyof typeof Phase];
