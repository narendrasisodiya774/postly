import { useState, FormEvent, ChangeEvent, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Login.module.css";
import { StoredUser } from "../../types";
import { User } from "../../types";
import { UserContext } from "../../context/usercontext/index";
import Layout from "../../components/Layout";
import {getSessionUser} from "../../lib/session"; // Adjust the import path as necessary
import { get } from "http";
const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [user, setloginUser] = useState<User | ''>('');

  const { setUser } = useContext(UserContext);
  useEffect(() => {
    const storedUser = getSessionUser();
    console.log("Stored user inside the login page", storedUser);
    if (storedUser) {
      setloginUser(storedUser);
    
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!user) {
      setError("No user found. Please sign up first.");
      return;
    }

    try {
      if (
        user !== undefined &&
        user !== null &&
        email === user.email &&
        password === user.password
      ) {
        setError("");
        setUser(user); // Set the user in context
        await router.push("/");
        console.log("Login successful!");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch {
      setError("Error reading user data.");
    }
  };

  const handleSignupRedirect = () => {
    router.push("/signup");
  };

  return (
    <Layout>
      <div className={styles.loginContainerEnhanced}>
        <h2 className={styles.loginHeading}>Login</h2>
        <form className={styles.loginFormBox} onSubmit={handleSubmit}>
          {error && <div className={styles.loginErrorMessage}>{error}</div>}

          <label htmlFor="email" className={styles.loginLabel}>
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            className={styles.loginInputField}
            placeholder="Enter your email"
          />

          <label htmlFor="password" className={styles.loginLabel}>
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            className={styles.loginInputField}
            placeholder="Enter your password"
          />

          <button type="submit" className={styles.loginSubmitBtn}>
            Login
          </button>

          <div className={styles.signupPromptBox}>
            <span className={styles.signupPromptText}>Don't have an account?</span>
            <button type="button" onClick={handleSignupRedirect} className={styles.signupRedirectBtn}>
              Sign up
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
