import { GeneratorSettings } from "@/models/Difficulty";
import random from "random";
import React, { useEffect, useState } from "react";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import BinaryDigitCard from "../Digit/BinaryDigitCard";

const Decimal2Binary = ({
  settings,
  timeLimit,
  onTimeout,
  onAnswerCorrect,
  setTotalTime,
}: {
  settings: GeneratorSettings;
  timeLimit: number;
  onTimeout: () => void;
  onAnswerCorrect: () => void;
  setTotalTime: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [startTime] = useState(Date.now());
  const [remainingTime, setRemainingTime] = useState(timeLimit);
  const [question] = useState(random.int(settings.min, settings.max));
  const [answerArray, setAnswerArray] = useState(
    Array.from({ length: settings.binaryDigits }, () => 0)
  );

  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  const handleToggle = (index: number) => {
    if (isAnswerCorrect) return;

    setAnswerArray((prev) => {
      const newAnswer = [...prev];
      newAnswer[index] = (newAnswer[index] + 1) % 2;
      return newAnswer;
    });
  };

  useEffect(() => {
    setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 0.1) {
          onTimeout();
          return 0;
        }
        return prev - 0.1;
      });
    }, 100);
  }, []);

  useEffect(() => {
    if (isAnswerCorrect) return;

    const answerNumber = parseInt(answerArray.join(""), 2);
    if (answerNumber === question) {
      setIsAnswerCorrect(true);
      setTotalTime((prev) => prev + (Date.now() - startTime) / 1000.0);
      setTimeout(() => {
        onAnswerCorrect();
      }, 3000);
    }
  }, [question, answerArray, onAnswerCorrect, setTotalTime]);

  return (
    <>
      <section className="nes-container with-title is-centered">
        <h2 className="title">問題</h2>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {question}
        </div>
      </section>

      <section className="nes-container with-title is-centered">
        <h2 className="title">解答</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {answerArray.map((bit, idx) => {
            const numDots = Math.pow(2, settings.binaryDigits - 1 - idx);
            return (
              <BinaryDigitCard
                key={idx}
                numDots={numDots}
                value={bit}
                isActive={bit === 1}
                onClick={() => {
                  handleToggle(idx);
                }}
              />
            );
          })}
        </div>
        {parseInt(answerArray.join(""), 2)}
      </section>

      {!isAnswerCorrect && (
        <progress
          className={
            "nes-progress" +
            " " +
            (remainingTime / timeLimit >= 0.5
              ? "is-primary"
              : remainingTime / timeLimit >= 0.2
              ? "is-warning"
              : "is-error")
          }
          value={remainingTime}
          max={timeLimit}
        ></progress>
      )}

      {isAnswerCorrect && (
        <>
          <span
            className="nes-text is-success"
            style={{ fontSize: "32px", fontWeight: "bold" }}
          >
            正解！
          </span>
          <Fireworks autorun={{ speed: 3 }} />
        </>
      )}
    </>
  );
};

export default Decimal2Binary;
