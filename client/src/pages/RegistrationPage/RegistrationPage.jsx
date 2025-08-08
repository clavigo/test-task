import { useState } from "react";
import styles from "./RegistrationPage.module.scss";

export const RegistationPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.regPage}>
      <h1>Register</h1>

      <form className={styles.regPage__form}>
        <label htmlFor="username">User name:</label>
        <input
          className={styles.regPage__input}
          id="username"
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          className={styles.regPage__input}
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className={styles.regPage__button} type="submit">
          Register
        </button>
      </form>
    </div>
  );
};
