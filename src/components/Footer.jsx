import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.inner}>
        <Link to="/" style={styles.brand}>
          CareerPath
        </Link>

        <p style={styles.text}>
          Discover your strengths. Build your future.
        </p>

        <p style={styles.copyright}>
          © {new Date().getFullYear()} CareerPath. Made for students.
        </p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    borderTop: "1px solid #e9e1ee",
    background: "#fffdf9",
    marginTop: "auto"
  },
  inner: {
    width: "min(1120px, 90%)",
    margin: "auto",
    padding: "25px 0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap"
  },
  brand: {
    fontWeight: 800,
    fontFamily: "Manrope, sans-serif",
    color: "#6542a6",
    fontSize: "18px"
  },
  text: {
    color: "#81778c",
    fontSize: "13px",
    margin: 0
  },
  copyright: {
    color: "#81778c",
    fontSize: "12px",
    margin: 0
  }
};

export default Footer;