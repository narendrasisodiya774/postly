import { useState, ChangeEvent, FormEvent, useContext } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Signup.module.css";
import { User } from "../../types";
import { setSessionUser } from "../../lib/session";
import { UserContext } from "../../context/usercontext/index";
import Layout from "../../components/Layout";

const Signup = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const { setUser } = useContext(UserContext);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const userData: User = { name, email, password };
    // sessionStorage.setItem("user", JSON.stringify(userData));
    setSessionUser(userData);
    // setUser(userData);

    setName("");
    setEmail("");
    setPassword("");
    setError("");

    router.push("/login");
  };

  return (
    <Layout>
    <div className={styles.signupContainer}>
      <h2 className={styles.heading}>Sign Up</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <div className={styles.error}>{error}</div>}

        <label htmlFor="name" className={styles.label}>
          Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          className={styles.input}
        />

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
          Sign Up
        </button>
      </form>
    </div>
    </Layout>
  );
};

export default Signup;
