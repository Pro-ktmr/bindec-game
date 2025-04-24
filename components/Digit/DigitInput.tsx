import styles from "./DigitInput.module.css";

export const DigitInput = ({
  value,
  onIncrement,
  onDecrement,
}: {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}) => {
  return (
    <div className={styles.digit}>
      <div
        className={styles.arrow}
        style={{
          color: "#0070f3",
        }}
        onClick={onIncrement}
      >
        ▲
      </div>
      <div className={styles.value}>{value.toString(16)}</div>
      <div
        className={styles.arrow}
        style={{
          color: "#ff4081",
        }}
        onClick={onDecrement}
      >
        ▼
      </div>
    </div>
  );
};
