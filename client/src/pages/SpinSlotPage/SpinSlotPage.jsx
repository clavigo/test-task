import { Slot } from "../../components/Slot";
import styles from "./SpinSlotPage.module.scss";

export const SpinSlotPage = () => {
  return (
    <section className={styles.spinSlotPage}>
      <Slot />
    </section>
  );
};
