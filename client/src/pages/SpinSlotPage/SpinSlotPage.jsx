import { useEffect, useState } from "react";
import { Slot } from "../../components/Slot";
import api from "../../services/api";
import styles from "./SpinSlotPage.module.scss";
import { AccountSummary } from "../../components/AccountSummary";

export const SpinSlotPage = () => {
  const [credits, setCredits] = useState(0);
  const [balance, setBalance] = useState(0);

  const initial = async () => {
    try {
      const response = await api.get("/");
      console.log("fetching");

      setCredits(response.data.credits);
      setBalance(response.data.balance);
    } catch (error) {
      console.error("Error loading:", error);
    }
  };

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
