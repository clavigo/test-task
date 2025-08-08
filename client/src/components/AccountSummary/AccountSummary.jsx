import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";

// eslint-disable-next-line react/prop-types
export const AccountSummary = ({ credits, balance }) => {
  const { cashOut, topUpCredits } = useContext(AppContext);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    topUpCredits(amount);
  };

  return (
    <div>
      <span>Credits: {credits}</span>
      <button onClick={() => setIsInputVisible(!isInputVisible)}>+</button>
      {isInputVisible && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />

          <button type="submit">Submit</button>
        </form>
      )}

      <p>
        Balance: {balance} <button onClick={cashOut}>+</button>
      </p>
    </div>
  );
};
