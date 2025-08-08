import { useState } from "react";
import classnames from "classnames";
import styles from "./Slot.module.scss";
import api from "../../services/api";

export const Slot = () => {
  const [isSpinning, setIsSpinning] = useState(false);

  const postSpin = async () => {
    const response = await api.post("/spin");

    console.log(response.data);

    return response.data;
  };

  const handleSpinClick = () => {
    isSpinning ? setIsSpinning(false) : setIsSpinning(true);

    postSpin();

    // postSpin();
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
