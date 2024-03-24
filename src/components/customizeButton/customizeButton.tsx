import React from "react";
import styles from "./customizeButton.module.css";

interface P {
  count: number;
  handleUpdateQuantity: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: number
  ) => void;
}

const CustomizeButton: React.FC<P> = ({ count, handleUpdateQuantity }) => {
  return (
    <div className={styles.countContainer}>
      <button
        className={styles.updateCount}
        onClick={(e) => handleUpdateQuantity(e, -1)}
      >
        −
      </button>
      <p className={styles.foodCount}>{count}</p>
      <button
        className={styles.updateCount}
        onClick={(e) => handleUpdateQuantity(e, 1)}
      >
        +
      </button>
    </div>
  );
};

export default CustomizeButton;
