import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../styles/Login.module.css";

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    try {
      await axios.post("http://localhost:3000/api/login", {
        username,
        password,
      });
      router.push("/admin");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Admin Dashboard</h1>
        <input
          placeholder="username"
          className={styles.input}
          data-cy="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          className={styles.input}
          data-cy="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleClick}
          className={styles.button}
          data-cy="sign-in-button"
        >
          Sign In
        </button>
        {error && <span className={styles.error} data-cy="sign-in-error">Wrong Credentials!</span>}
      </div>
    </div>
  );
};

export default Login;
