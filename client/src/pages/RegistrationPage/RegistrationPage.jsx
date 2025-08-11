import { useContext, useState } from "react";
import styles from "./RegistrationPage.module.scss";
import { AppContext } from "../../context/AppContext";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input";

export const RegistationPage = () => {
  const { registerUser } = useContext(AppContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    registerUser(username, password);
  };

  return (
    <div className={styles.regPage}>
      <h1>Register</h1>

      <form className={styles.regPage__form} onSubmit={handleSubmit}>
        <label htmlFor="username">User name:</label>

        <Input
          className={styles.regPage__input}
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password:</label>

        <Input
          className={styles.regPage__input}
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          type="submit"
          className={styles.regPage__button}
          buttonText={"Register"}
        />
      </form>
    </div>
  );
};
