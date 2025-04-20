import Link from "next/link";

export const ResultFrame = ({ totalTime }: { totalTime: number }) => {
  return (
    <>
      <section className="nes-container with-title is-centered">
        <h2 className="title">結果</h2>
        <div>タイム：{totalTime.toFixed(2)}秒</div>
      </section>
      <Link className="nes-btn" href="/">
        モード選択へ戻る
      </Link>
    </>
  );
};
