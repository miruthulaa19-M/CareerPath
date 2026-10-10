import { Link } from "react-router-dom";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("careerpathUser") || "null");
  const career = localStorage.getItem("careerpathCareer");

  const cards = [
    {
      icon: "🧠",
      title: "Skill Assessment",
      description: "Explore your skills and interests.",
      link: "/assessment",
      action: "Start assessment"
    },
    {
      icon: "🗺️",
      title: "Career Roadmap",
      description: "Find learning steps for your career.",
      link: "/roadmap",
      action: "View roadmap"
    },
    {
      icon: "📚",
      title: "Learning Resources",
      description: "Discover courses and learning platforms.",
      link: "/resources",
      action: "Explore resources"
    }
  ];

  return (
    <section className="page-section">
      <div className="container">
        <span className="eyebrow">STUDENT SPACE</span>
        <h1 className="page-title">
          Welcome{user?.name ? `, ${user.name}` : " to your dashboard"} 👋
        </h1>
        <p className="page-description">
          Every new skill is a step towards the future you want.
        </p>

        {career && (
          <div style={styles.career}>
            <div>
              <span style={styles.label}>YOUR SUGGESTED CAREER</span>
              <h2 style={{ margin: "8px 0 0" }}>{career}</h2>
            </div>
            <Link to="/roadmap" className="btn btn-primary">
              Continue learning →
            </Link>
          </div>
        )}

        <div className="grid-cards">
          {cards.map((card) => (
            <article className="card" key={card.title}>
              <div className="card-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <Link to={card.link} style={styles.link}>
                {card.action} →
              </Link>
            </article>
          ))}
        </div>

        <div className="card" style={{ marginTop: "25px" }}>
          <h2 style={{ marginTop: 0 }}>A little reminder</h2>
          <p>
            You don't need to know everything today. Start with one skill,
            learn consistently, and adjust your career plan as you grow.
          </p>
          <Link to="/assessment" className="btn btn-outline">
            Find my starting point
          </Link>
        </div>
      </div>
    </section>
  );
}

const styles = {
  career: {
    marginTop: "28px",
    padding: "24px",
    background: "#eee7fa",
    border: "1px solid #e0d2f2",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "18px"
  },
  label: {
    color: "#6542a6",
    fontWeight: 700,
    letterSpacing: "1px",
    fontSize: "11px"
  },
  link: { display: "inline-block", fontWeight: 700, marginTop: "10px" }
};

export default Dashboard;