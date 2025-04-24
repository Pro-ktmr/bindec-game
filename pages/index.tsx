import { Difficulty } from "@/models/Difficulty";
import { Mode } from "@/models/Mode";
import Link from "next/link";

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
            href={`/game?mode=${Mode.Decimal2Binary}&difficulty=${Difficulty.Easy}`}
          >
            イージー
          </Link>
          <Link
            className="nes-btn is-warning"
            href={`/game?mode=${Mode.Decimal2Binary}&difficulty=${Difficulty.Normal}`}
          >
            ノーマル
          </Link>
          <Link
            className="nes-btn is-error"
            href={`/game?mode=${Mode.Decimal2Binary}&difficulty=${Difficulty.Hard}`}
          >
            ハード
          </Link>
        </div>
      </section>

      <section className="nes-container with-title is-centered">
        <h2 className="title">2進数 → 16進数</h2>
        <div>
          <Link
            className="nes-btn is-warning"
            href={`/game?mode=${Mode.Binary2Hexadecimal}&difficulty=${Difficulty.Normal}`}
          >
            ノーマル
          </Link>
          <Link
            className="nes-btn is-error"
            href={`/game?mode=${Mode.Binary2Hexadecimal}&difficulty=${Difficulty.Extream}`}
          >
            ハード
          </Link>
        </div>
      </section>

      <section className="nes-container with-title is-centered">
        <h2 className="title">16進数 → 2進数</h2>
        <div>
          <Link
            className="nes-btn is-warning"
            href={`/game?mode=${Mode.Hexadecimal2Binary}&difficulty=${Difficulty.Normal}`}
          >
            ノーマル
          </Link>
          <Link
            className="nes-btn is-error"
            href={`/game?mode=${Mode.Hexadecimal2Binary}&difficulty=${Difficulty.Extream}`}
          >
            ハード
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Top;
