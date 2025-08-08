import { useContext, useEffect } from "react";
import classnames from "classnames";
import styles from "./Slot.module.scss";
import { AppContext } from "../../context/AppContext";

export const Slot = () => {
  const { fetchSlots, isSpinning, setIsSpinning, slots } =
    useContext(AppContext);

  const handleSpinClick = () => {
    isSpinning ? setIsSpinning(false) : setIsSpinning(true);

    fetchSlots();
  };

  useEffect(() => {
    console.log(slots);
  });

  return (
    <div className={styles.slot}>
      <div className={styles.slot__container}>
        {Array.isArray(slots) &&
          slots.map((symbol, index) => (
            <div key={index} className={styles.slot__item}>
              <span
                className={classnames(styles.slot__spinner, {
                  [styles["slot__spinner-active"]]: isSpinning,
                })}
              >
                {symbol}
              </span>
            </div>
          ))}
      </div>

      <button className={styles.slot__button} onClick={handleSpinClick}>
        Spin!
      </button>
    </div>
  );
};
