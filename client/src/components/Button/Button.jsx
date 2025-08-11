import styles from "./Button.module.scss";

export const Button = ({
  handleClick,
  buttonText,
  className,
  type = "button",
}) => {
  return (
    <button
      className={`${className} ${styles.button}`}
      type={type}
      onClick={handleClick}
    >
      {buttonText}
    </button>
  );
};
