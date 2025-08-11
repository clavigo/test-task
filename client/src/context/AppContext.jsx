import { createContext, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
  const [credits, setCredits] = useState(0);
  const [balance, setBalance] = useState(0);
  const [isSpinning, setIsSpinning] = useState([false, false, false]);
  const [slots, setSlots] = useState(["x", "x", "x"]);
  const navigate = useNavigate();

  const initial = async () => {
    try {
      const response = await api.get("/");

      setCredits(response.data.credits);
      setBalance(response.data.balance);
    } catch (error) {
      console.error("Error loading:", error);
    }
  };

  const startSpin = (index) => {
    setIsSpinning((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

  const stopSpin = (index) => {
    setIsSpinning((prev) => {
      const updated = [...prev];
      updated[index] = false;
      return updated;
    });
  };

  const revealSlots = async (result) => {
    for (let i = 0; i < result.length; i++) {
      startSpin(i);

      await new Promise((resolve) => {
        setTimeout(
          () => {
            setSlots((prev) => {
              const updated = [...prev];
              updated[i] = result[i];
              return updated;
            });
            stopSpin(i);
            resolve();
          },
          1000 * (i + 1)
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

  const registerUser = async (username, password) => {
    try {
      const response = await api.post("/register", {
        username,
        password,
      });

      console.log("User registered:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  const loginUser = async (username, password) => {
    try {
      const response = await api.post("/login", {
        username,
        password,
      });

      console.log("User logged in:", response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        credits,
        balance,
        setCredits,
        setBalance,
        isSpinning,
        setIsSpinning,
        initial,
        slots,
        fetchSlots,
        cashOut,
        topUpCredits,
        registerUser,
        loginUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
