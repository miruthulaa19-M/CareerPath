import { Link } from "react-router-dom";

function Home() {
  const features = [
    {
      icon: "◈",
      title: "Understand Yourself",
      text: "Explore your current skills, strengths, and interests."
    },
    {
      icon: "◎",
      title: "Discover Your Direction",
      text: "Explore career options and understand what they require."
    },
    {
      icon: "↗",
      title: "Grow With a Plan",
      text: "Follow learning milestones and find useful resources."
    }
  ];

  return (
    <>
      <section style={styles.hero}>
        <div className="container" style={styles.heroInner}>
          <div style={styles.heroContent}>
            <span className="eyebrow">A clearer path to your future</span>

            <h1 style={styles.title}>
              Your potential.
              <br />
              Your path.
              <br />
              <span style={{ color: "#7655b0" }}>Your future.</span>
            </h1>

            <p style={styles.description}>
              Not sure what comes after your studies? Discover your strengths,
              explore career opportunities, and build a roadmap that helps you
              take the next step with confidence.
            </p>

            <div style={styles.actions}>
              <Link to="/login" className="btn btn-primary">
                Start Your Journey →
              </Link>
              <Link to="/assessment" className="btn btn-outline">
                Explore Assessment
              </Link>
            </div>

            <p style={styles.note}>
              Made for students who are figuring out what's next.
            </p>
          </div>

          <div style={styles.visual}>
            <div style={styles.orbit}>
              <div style={styles.centerCircle}>
                <span style={{ fontSize: 38 }}>✳</span>
                <strong>YOUR<br />FUTURE</strong>
              </div>
              <div style={{ ...styles.floating, top: "6%", right: "0%" }}>
                <span>🧠</span> Skills
              </div>
              <div style={{ ...styles.floating, bottom: "10%", right: "-4%" }}>
                <span>🗺️</span> Roadmap
              </div>
              <div style={{ ...styles.floating, bottom: "13%", left: "-3%" }}>
                <span>🎯</span> Goals
              </div>
            </div>
            <div style={styles.visualCaption}>
              <strong>Small steps. Meaningful progress.</strong>
              <span>Learn at your own pace.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <div style={styles.sectionHeading}>
            <span className="eyebrow">How CareerPath helps</span>
            <h2 className="page-title">Turn uncertainty into a plan</h2>
            <p className="page-description">
              A simple starting point for exploring your future career.
            </p>
          </div>

          <div className="grid-cards">
            {features.map((feature) => (
              <article className="card" key={feature.title}>
                <div className="card-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>

          <div style={styles.bottomBanner}>
            <div>
              <h2 style={{ color: "white", marginTop: 0 }}>
                Your next chapter starts with one step.
              </h2>
              <p style={{ color: "#e9dff8", marginBottom: 0 }}>
                Start exploring what you can become.
              </p>
            </div>
            <Link
              to="/login"
              className="btn"
              style={{ background: "#fffefa", color: "#4b3078" }}
            >
              Get Started →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

const styles = {
  hero: {
    background: "linear-gradient(120deg, #fbf7ef 50%, #eee6f7 100%)",
    padding: "65px 0 75px",
    overflow: "hidden"
  },
  heroInner: {
    display: "grid",
    gridTemplateColumns: "1.1fr 0.9fr",
    alignItems: "center",
    gap: "40px"
  },
  heroContent: { padding: "15px 0" },
  title: {
    fontSize: "clamp(42px, 5.5vw, 70px)",
    lineHeight: 1.12,
    letterSpacing: "-2px",
    margin: "23px 0"
  },
  description: {
    maxWidth: "550px",
    fontSize: "16px",
    color: "#756b80",
    lineHeight: 1.9
  },
  actions: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    marginTop: "28px"
  },
  note: {
    color: "#94899e",
    fontSize: "12px",
    marginTop: "23px"
  },
  visual: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px"
  },
  orbit: {
    width: "min(340px, 80vw)",
    aspectRatio: "1",
    borderRadius: "50%",
    border: "1px dashed #b8a2d7",
    background: "radial-gradient(circle, #fffefa 0%, #e8ddf5 70%, #d8c9ec 100%)",
    position: "relative",
    display: "grid",
    placeItems: "center"
  },
  centerCircle: {
    width: "155px",
    height: "155px",
    borderRadius: "50%",
    background: "#6542a6",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    gap: "8px",
    boxShadow: "0 15px 40px #6542a640"
  },
  floating: {
    position: "absolute",
    background: "#fffefa",
    padding: "12px 15px",
    borderRadius: "13px",
    boxShadow: "0 8px 25px #432a6317",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontWeight: 700,
    fontSize: "13px",
    color: "#4b3078"
  },
  visualCaption: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    textAlign: "center",
    marginTop: "25px",
    fontSize: "14px"
  },
  sectionHeading: { textAlign: "center", marginBottom: "35px" },
  bottomBanner: {
    background: "linear-gradient(110deg, #4b3078, #7655a8)",
    borderRadius: "20px",
    padding: "30px",
    marginTop: "50px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap"
  }
};

export default Home;