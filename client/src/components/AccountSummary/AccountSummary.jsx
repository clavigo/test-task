// eslint-disable-next-line react/prop-types
export const AccountSummary = ({ credits, balance }) => {
  return (
    <div>
      <p>Credits: {credits}</p>
      <p>Balance: {balance}</p>
    </div>
  );
};
