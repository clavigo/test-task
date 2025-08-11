export const Input = ({
  id,
  className,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}) => {
  return (
    <input
      id={id}
      className={className}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};
