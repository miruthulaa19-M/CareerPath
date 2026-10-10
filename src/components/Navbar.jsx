import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.logo}>
        CareerPath
      </Link>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        <Link to="/assessment" style={styles.link}>Assessment</Link>
        <Link to="/roadmap" style={styles.link}>Roadmap</Link>
        <Link to="/resources" style={styles.link}>Resources</Link>

        {user ? (
          <>
            <Link to="/dashboard" style={styles.profile}>
              {user.name || "Profile"}
            </Link>
            <button type="button" onClick={handleLogout} style={styles.logout}>
              Sign Out
            </button>
          </>
        ) : (
          <Link to="/login" style={styles.logout}>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "16px",
    padding: "16px 5%",
    background: "#FFFCF7",
    borderBottom: "1px solid #E6D8ED",
  },
  logo: {
    color: "#563675",
    fontSize: "23px",
    fontWeight: "bold",
    textDecoration: "none",
  },
  links: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "16px",
  },
  link: {
    color: "#563675",
    textDecoration: "none",
    fontSize: "14px",
  },
  profile: {
    color: "#563675",
    textDecoration: "none",
    border: "1px solid #E6D8ED",
    borderRadius: "8px",
    padding: "9px 12px",
  },
  logout: {
    background: "#563675",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "8px",
    padding: "10px 15px",
    cursor: "pointer",
  },
};