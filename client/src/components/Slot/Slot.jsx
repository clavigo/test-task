import { useState } from "react";
import styles from "./Slot.module.scss";

export const Slot = () => {
  const [isSpinning, setIsSpinning] = useState(false);

  return (
    <div className={styles.slot}>
      <div className={styles.slot__container}>
        <div className={styles.slot__item}>
          <span className={styles.slot__spinner}>x</span>
        </div>

        <div className={styles.slot__item}>
          <span className={styles.slot__spinner}>x</span>
        </div>

        <div className={styles.slot__item}>
          <span className={styles.slot__spinner}>x</span>
        </div>
      </div>

      <button className={styles.slot__button}>Spin!</button>
    </div>
  );
};
