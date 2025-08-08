import { useState } from "react";
import classnames from "classnames";
import styles from "./Slot.module.scss";

export const Slot = () => {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleSpinClick = () => {
    isSpinning ? setIsSpinning(false) : setIsSpinning(true);
  };

  return (
    <div className={styles.slot}>
      <div className={styles.slot__container}>
        <div className={styles.slot__item}>
          <span
            className={classnames(styles.slot__spinner, {
              [styles["slot__spinner-active"]]: isSpinning,
            })}
          >
            x
          </span>
        </div>

        <div className={styles.slot__item}>
          <span
            className={classnames(styles.slot__spinner, {
              [styles["slot__spinner-active"]]: isSpinning,
            })}
          >
            x
          </span>
        </div>

        <div className={styles.slot__item}>
          <span
            className={classnames(styles.slot__spinner, {
              [styles["slot__spinner-active"]]: isSpinning,
            })}
          >
            x
          </span>
        </div>
      </div>

      <button className={styles.slot__button} onClick={handleSpinClick}>
        Spin!
      </button>
    </div>
  );
};
