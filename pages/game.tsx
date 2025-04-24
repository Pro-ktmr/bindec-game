import Binary2HexadecimalFrame from "@/components/Frame/Binary2HexadecimalFrame";
import { CountDownFrame } from "@/components/Frame/CountDownFrame";
import Decimal2BinaryFrame from "@/components/Frame/Decimal2BinaryFrame";
import Hexadecimal2Binary from "@/components/Frame/Hexadecimal2BinaryFrame";
import { ResultFrame } from "@/components/Frame/ResultFrame";
import {
  Difficulty,
  GeneratorSettings,
  isDifficulty,
} from "@/models/Difficulty";
import { Mode } from "@/models/Mode";
import { Phase } from "@/models/Phase";
import { useRouter } from "next/router";
import { useState } from "react";
import Binary2DecimalFrame from "../components/Frame/Binary2DecimalFrame";

const QUESTION_COUNT = 3;

const parseDifficulty = (
  difficulty: string | string[] | undefined
): Difficulty => {
  if (Array.isArray(difficulty)) {
    const paresed = parseInt(difficulty[0]);
    if (isDifficulty(paresed)) {
      return paresed;
    }
  } else if (typeof difficulty === "string") {
    const paresed = parseInt(difficulty);
    if (isDifficulty(paresed)) {
      return paresed;
    }
  }
  return Difficulty.Normal;
};

const getBinary2DecimalSettings = (
  difficulty: Difficulty
): GeneratorSettings => {
  switch (difficulty) {
    case Difficulty.Easy:
      return {
        binaryDigits: 3,
        decimalDigits: 1,
        hexadecimalDigits: 1,
        min: 1,
        max: 7,
      };
    case Difficulty.Normal:
      return {
        binaryDigits: 4,
        decimalDigits: 2,
        hexadecimalDigits: 1,
        min: 8,
        max: 15,
      };
    case Difficulty.Hard:
      return {
        binaryDigits: 6,
        decimalDigits: 2,
        hexadecimalDigits: 2,
        min: 16,
        max: 63,
      };
    default:
      return {
        binaryDigits: 8,
        decimalDigits: 3,
        hexadecimalDigits: 2,
        min: 16,
        max: 255,
      };
  }
};

const Binary2DecimalPage = () => {
  const router = useRouter();
  const mode = router.query.mode;
  const difficulty = parseDifficulty(router.query.difficulty);
  const settings = getBinary2DecimalSettings(difficulty);

  const [phase, setPhase] = useState<Phase>(Phase.CountDown);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timeLimit, setTimeLimit] = useState<number>(32);

  const [totalTime, setTotalTime] = useState<number>(0.0);

  const handleTimeout = () => {
    setTimeLimit(Math.ceil(timeLimit * 1.3));
  };

  const handleAnswerCorrect = () => {
    setQuestionIndex(questionIndex + 1);
    setTimeLimit(Math.ceil(timeLimit / 2));
    if (questionIndex + 1 >= QUESTION_COUNT) {
      setPhase(Phase.Result);
    }
  };

  return (
    <div className="container">
      <h1>
        {mode === Mode.Binary2Decimal && "2進数 → 10進数"}
        {mode === Mode.Decimal2Binary && "10進数 → 2進数"}
      </h1>
      {phase === Phase.CountDown && <CountDownFrame setPhase={setPhase} />}
      {phase === Phase.Game && mode === Mode.Binary2Decimal && (
        <Binary2DecimalFrame
          key={questionIndex + " " + timeLimit}
          settings={settings}
          timeLimit={timeLimit}
          onTimeout={handleTimeout}
          onAnswerCorrect={handleAnswerCorrect}
          setTotalTime={setTotalTime}
        />
      )}
      {phase === Phase.Game && mode === Mode.Decimal2Binary && (
        <Decimal2BinaryFrame
          key={questionIndex + " " + timeLimit}
          settings={settings}
          timeLimit={timeLimit}
          onTimeout={handleTimeout}
          onAnswerCorrect={handleAnswerCorrect}
          setTotalTime={setTotalTime}
        />
      )}
      {phase === Phase.Game && mode === Mode.Binary2Hexadecimal && (
        <Binary2HexadecimalFrame
          key={questionIndex + " " + timeLimit}
          settings={settings}
          timeLimit={timeLimit}
          onTimeout={handleTimeout}
          onAnswerCorrect={handleAnswerCorrect}
          setTotalTime={setTotalTime}
        />
      )}
      {phase === Phase.Game && mode === Mode.Hexadecimal2Binary && (
        <Hexadecimal2Binary
          key={questionIndex + " " + timeLimit}
          settings={settings}
          timeLimit={timeLimit}
          onTimeout={handleTimeout}
          onAnswerCorrect={handleAnswerCorrect}
          setTotalTime={setTotalTime}
        />
      )}
      {phase === Phase.Result && <ResultFrame totalTime={totalTime} />}
    </div>
  );
};

export default Binary2DecimalPage;
