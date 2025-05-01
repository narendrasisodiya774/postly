import { useState, FormEvent, ChangeEvent, useContext } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Login.module.css";
import { StoredUser } from "../../types"; 
import { UserContext } from "../../context/usercontext/index"; // Adjust the import path as necessary

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { user, logout } = useContext(UserContext);
  console.log("User context: inside the login,", user); // Debugging line
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const storedUser = sessionStorage.getItem("user");
    if (!storedUser) {
      setError("No user found. Please sign up first.");
      return;
    }

    try {
      // const user: StoredUser = JSON.parse(storedUser);

      if (user!==undefined && user!==null && email === user.email && password === user.password) {
        setError("");
        await router.push("/");
        console.log("Login successful!");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch {
      setError("Error reading user data.");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.heading}>Login</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <div className={styles.error}>{error}</div>}

        <label htmlFor="email" className={styles.label}>
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          className={styles.input}
        />

        <label htmlFor="password" className={styles.label}>
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          className={styles.input}
        />

        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
