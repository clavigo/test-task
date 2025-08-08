import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

// eslint-disable-next-line react/prop-types
export const AccountSummary = ({ credits, balance }) => {
  const { cashOut } = useContext(AppContext);

  return (
    <div>
      <p>Credits: {credits}</p>
      <p>
        Balance: {balance} <button onClick={cashOut}>+</button>
      </p>
    </div>
  );
};
