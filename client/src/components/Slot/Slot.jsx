import { useContext } from "react";
import classnames from "classnames";
import styles from "./Slot.module.scss";
import { AppContext } from "../../context/AppContext";
import { Button } from "../Button/Button";

export const Slot = () => {
  const { fetchSlots, isSpinning, slots } = useContext(AppContext);

  const handleSpinClick = () => {
    fetchSlots();
  };

  return (
    <div className={styles.slot}>
      <div className={styles.slot__container}>
        {Array.isArray(slots) &&
          slots.map((symbol, index) => (
            <div key={index} className={styles.slot__item}>
              <span
                className={classnames(styles.slot__spinner, {
                  [styles["slot__spinner-active"]]: isSpinning[index],
                })}
              >
                {symbol}
              </span>
            </div>
          ))}
      </div>

      <Button
        className={styles.slot__button}
        handleClick={handleSpinClick}
        buttonText={"spin"}
      />
    </div>
  );
};
