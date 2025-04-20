import { Phase } from "@/models/Phase";
import { useEffect, useState } from "react";

export const CountDownFrame = ({
  setPhase,
}: {
  setPhase: (phase: Phase) => void;
}) => {
  const [remainingTime, setRemainingTime] = useState<number | string>(3);

  useEffect(() => {
    setTimeout(() => {
      setRemainingTime(2);
    }, 1000);
    setTimeout(() => {
      setRemainingTime(1);
    }, 2000);
    setTimeout(() => {
      setRemainingTime("Start!");
    }, 3000);
    setTimeout(() => {
      setPhase(Phase.Game);
    }, 4000);
  }, []);

  return <div style={{ fontSize: 128 }}>{remainingTime}</div>;
};
