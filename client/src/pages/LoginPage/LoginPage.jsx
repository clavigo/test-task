import { useContext, useState } from "react";
import styles from "./LoginPage.module.scss";
import { AppContext } from "../../context/AppContext";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input";

export const LoginPage = () => {
  const { loginUser } = useContext(AppContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    loginUser(username, password);
  };

  return (
    <div className={styles.logPage}>
      <h1>Login</h1>

      <form className={styles.logPage__form} onSubmit={handleSubmit}>
        <label htmlFor="username">User name:</label>

        <Input
          className={styles.logPage__input}
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password:</label>

        <Input
          className={styles.logPage__input}
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          type="submit"
          className={styles.logPage__button}
          buttonText={"Login"}
        />
      </form>
    </div>
  );
};
