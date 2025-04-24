import styles from "./DecimalDigitInput.module.css";

export const DecimalDigitInput = ({
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
      <div className={styles.value}>{value}</div>
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
