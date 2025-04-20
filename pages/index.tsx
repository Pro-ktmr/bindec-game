import React from "react";
import Link from "next/link";
import { Difficulty } from "@/models/Difficulty";
import { Mode } from "@/models/Mode";

const Top = () => {
  return (
    <div className="container">
      <h1>BinDec Game</h1>

      <section className="nes-container with-title is-centered">
        <h2 className="title">2進数 → 10進数</h2>
        <div>
          <Link
            className="nes-btn is-success"
            href={`/game?mode=${Mode.Binary2Decimal}&difficulty=${Difficulty.Easy}`}
          >
            イージー
          </Link>
          <Link
            className="nes-btn is-warning"
            href={`/game?mode=${Mode.Binary2Decimal}&difficulty=${Difficulty.Normal}`}
          >
            ノーマル
          </Link>
          <Link
            className="nes-btn is-error"
            href={`/game?mode=${Mode.Binary2Decimal}&difficulty=${Difficulty.Hard}`}
          >
            ハード
          </Link>
        </div>
      </section>

      <section className="nes-container with-title is-centered">
        <h2 className="title">10進数 → 2進数</h2>
        <div>
          <Link
            className="nes-btn is-success"
            href={`/game?mode=${Mode.DecimalToBinary}&difficulty=${Difficulty.Easy}`}
          >
            イージー
          </Link>
          <Link
            className="nes-btn is-warning"
            href={`/game?mode=${Mode.DecimalToBinary}&difficulty=${Difficulty.Normal}`}
          >
            ノーマル
          </Link>
          <Link
            className="nes-btn is-error"
            href={`/game?mode=${Mode.DecimalToBinary}&difficulty=${Difficulty.Hard}`}
          >
            ハード
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Top;
