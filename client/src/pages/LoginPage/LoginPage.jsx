import { useContext, useState } from "react";
import styles from "./LoginPage.module.scss";
import { AppContext } from "../../context/AppContext";

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
        <input
          className={styles.logPage__input}
          id="username"
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          className={styles.logPage__input}
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className={styles.logPage__button} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};
