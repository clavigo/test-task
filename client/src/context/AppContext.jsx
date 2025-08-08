import { createContext, useEffect, useState } from "react";
import api from "../services/api";

export const AppContext = createContext(undefined);

// eslint-disable-next-line react/prop-types
export const AppProvider = ({ children }) => {
  const [credits, setCredits] = useState(0);
  const [balance, setBalance] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [slots, setSlots] = useState(["x", "x", "x"]);

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

  // const postSpin = async () => {
  //   const response = await api.post("/spin");

  //   console.log(response.data);

  //   setCredits(response.data.credits);
  //   setSlots(response.data.result);

  //   // console.log(response.data.result);
  // };

  const revealSlots = async (result) => {
    for (let i = 0; i < result.length; i++) {
      await new Promise((resolve) => {
        setTimeout(
          () => {
            setSlots((prev) => {
              const updated = [...prev];
              updated[i] = result[i];
              return updated;
            });
            resolve();
          },
          500 * (i + 1)
        );
      });
    }
  };

  const fetchSlots = async () => {
    setSlots(["x", "x", "x"]);

    try {
      const response = await api.post("/spin");
      const result = response.data.result;

      if (Array.isArray(result)) {
        await revealSlots(result);
        setCredits(response.data.credits);
      }
    } catch (error) {
      console.error("Error loading slots:", error);
    }
  };

  const cashOut = async () => {
    const response = await api.get("/cashOut");

    console.log(response);

    setCredits(response.data.credits);
    setBalance(response.data.balance);
  };

  const topUpCredits = async (amount) => {
    try {
      const response = await api.post("/topUpCredits", {
        creditsAmount: Number(amount),
      });

      console.log(response.data);

      setCredits(response.data.credits);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    initial();
  }, []);

  return (
    <AppContext.Provider
      value={{
        credits,
        balance,
        setCredits,
        setBalance,
        isSpinning,
        setIsSpinning,
        // postSpin,
        slots,
        fetchSlots,
        cashOut,
        topUpCredits,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
