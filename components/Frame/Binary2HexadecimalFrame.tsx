import { numberToBinary, numberToHexadecimal } from "@/libs/convert";
import { GeneratorSettings } from "@/models/Difficulty";
import random from "random";
import React, { useEffect, useState } from "react";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import { DigitInput } from "../Digit/DigitInput";

const Binary2HexadecimalFrame = ({
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
    Array.from({ length: settings.hexadecimalDigits }, () => 0)
  );

  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  const handleIncrement = (index: number) => {
    if (isAnswerCorrect) return;

    setAnswerArray((prev) => {
      const newAnswer = [...prev];
      newAnswer[index] = (newAnswer[index] + 1) % 16;
      return newAnswer;
    });
  };

  const handleDecrement = (index: number) => {
    if (isAnswerCorrect) return;

    setAnswerArray((prev) => {
      const newAnswer = [...prev];
      newAnswer[index] = (newAnswer[index] + 15) % 16;
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

    const answerNumber = parseInt(
      answerArray.map((a) => numberToHexadecimal(a, 1)).join(""),
      16
    );
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
          {numberToBinary(question, settings.binaryDigits)
            .match(/.{4}/g)
            ?.map((part: string, idx: number) => (
              <span key={part} style={{ margin: "0 4px" }}>
                {part}
              </span>
            ))}
        </div>
      </section>

      <section className="nes-container with-title is-centered">
        <h2 className="title">解答</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: "16px",
          }}
        >
          {answerArray.map((digit, idx) => (
            <DigitInput
              key={idx}
              value={digit}
              onIncrement={() => handleIncrement(idx)}
              onDecrement={() => handleDecrement(idx)}
            />
          ))}
        </div>
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

export default Binary2HexadecimalFrame;
