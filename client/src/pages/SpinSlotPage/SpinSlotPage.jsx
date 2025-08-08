import { Slot } from "../../components/Slot";
import styles from "./SpinSlotPage.module.scss";
import { AccountSummary } from "../../components/AccountSummary";
import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";

export const SpinSlotPage = () => {
  const { credits, balance, initial } = useContext(AppContext);

  useEffect(() => {
    initial();
  }, []);

  return (
    <section className={styles.spinSlotPage}>
      <AccountSummary credits={credits} balance={balance} />

      <Slot />
    </section>
  );
};
