import styles from "./BinaryDigitCard.module.css";

const getDotGridLayout = (dotCount: number) => {
  switch (dotCount) {
    case 1:
      return { rows: 1, columns: 1 };
    case 2:
      return { rows: 2, columns: 1 };
    case 4:
      return { rows: 2, columns: 2 };
    case 8:
      return { rows: 4, columns: 2 };
    case 16:
      return { rows: 4, columns: 4 };
    case 32:
      return { rows: 8, columns: 4 };
    case 64:
      return { rows: 8, columns: 8 };
    case 128:
      return { rows: 16, columns: 8 };
    default: {
      return { rows: 1, columns: dotCount };
    }
  }
};

const BinaryDigitCard = ({
  value,
  numDots,
  isActive,
  onClick,
}: {
  value: number;
  numDots: number;
  isActive: boolean;
  onClick: () => void;
}) => {
  const { rows, columns } = getDotGridLayout(numDots);
  return (
    <div
      className={styles.card + " " + (isActive ? styles.active : "")}
      onClick={onClick}
    >
      <div className={styles.value}>{value}</div>
      <div className={styles.dots}>
        {Array.from({ length: rows }).map((_) => {
          return (
            <>
              {Array.from({ length: columns })
                .map((_) => "●")
                .join("")}
              <br />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default BinaryDigitCard;
