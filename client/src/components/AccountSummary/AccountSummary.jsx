import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Button } from "../Button/Button";
import { Input } from "../Input";

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

      <Button
        handleClick={() => setIsInputVisible(!isInputVisible)}
        buttonText={"+"}
      />

      {isInputVisible && (
        <form onSubmit={handleSubmit}>
          <Input
            id={"topUp"}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={"Enter amount"}
          />

          <Button type="submit" buttonText={"Submit"} />
        </form>
      )}

      <p>
        Balance: {balance}
        <Button handleClick={cashOut} buttonText={"+"} />
      </p>
    </div>
  );
};
