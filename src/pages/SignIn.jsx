import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function SignIn() {
  const { signup, signIn } = useAuth();
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const result = isSignUp
      ? signup(name, email, password)
      : signIn(email, password);

    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.message);
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>{isSignUp ? "Create Account" : "Sign In"}</h2>
        <p style={styles.subtitle}>
          {isSignUp ? "Join CareerPath today" : "Welcome back"}
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          {isSignUp && (
            <input
              style={styles.input}
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.button}>
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <p style={styles.toggle}>
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            style={styles.link}
            onClick={() => { setIsSignUp(!isSignUp); setError(""); }}
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f8f1e7",
    padding: "20px",
  },
  card: {
    background: "#fff",
    borderRadius: "16px",
    padding: "40px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 4px 24px rgba(86,54,117,0.1)",
    border: "1px solid #e6d8ed",
  },
  title: { color: "#563675", margin: "0 0 6px", fontSize: "26px" },
  subtitle: { color: "#8c8093", margin: "0 0 24px", fontSize: "14px" },
  form: { display: "flex", flexDirection: "column", gap: "14px" },
  input: {
    padding: "12px 14px",
    border: "1px solid #e6d8ed",
    borderRadius: "8px",
    fontSize: "14px",
    outline: "none",
    color: "#3f304b",
  },
  button: {
    padding: "13px",
    background: "#563675",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "4px",
  },
  error: { color: "#a23e35", fontSize: "13px", margin: "0" },
  toggle: { textAlign: "center", marginTop: "20px", fontSize: "13px", color: "#8c8093" },
  link: {
    background: "none",
    border: "none",
    color: "#563675",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "13px",
  },
};
