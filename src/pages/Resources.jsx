const resources = [
  {
    icon: "💻",
    category: "Web Development",
    title: "MDN Web Docs",
    description: "Learn HTML, CSS, JavaScript, and web technologies.",
    url: "https://developer.mozilla.org/"
  },
  {
    icon: "🚀",
    category: "Programming",
    title: "freeCodeCamp",
    description: "Practice coding through lessons and projects.",
    url: "https://www.freecodecamp.org/"
  },
  {
    icon: "🔧",
    category: "Developer Tools",
    title: "GitHub Skills",
    description: "Learn GitHub and version control interactively.",
    url: "https://skills.github.com/"
  },
  {
    icon: "📊",
    category: "Data and Analytics",
    title: "Kaggle Learn",
    description: "Explore Python, data visualization, and machine learning.",
    url: "https://www.kaggle.com/learn"
  },
  {
    icon: "🎨",
    category: "Design",
    title: "Figma Learn",
    description: "Explore interface design, prototyping, and collaboration.",
    url: "https://help.figma.com/"
  },
  {
    icon: "🎓",
    category: "Online Learning",
    title: "Coursera",
    description: "Discover courses and professional learning programs.",
    url: "https://www.coursera.org/"
  }
];

function Resources() {
  return (
    <section className="page-section">
      <div className="container">
        <span className="eyebrow">LEARN SOMETHING NEW</span>
        <h1 className="page-title">Resources for your next step.</h1>
        <p className="page-description">
          Explore these learning platforms and choose the ones that
          support your career goals.
        </p>

        <div className="grid-cards">
          {resources.map((resource) => (
            <article className="card" key={resource.title}>
              <div className="card-icon">{resource.icon}</div>

              <p style={styles.category}>{resource.category}</p>

              <h3 style={{ margin: "8px 0" }}>{resource.title}</h3>

              <p style={{ minHeight: "76px" }}>{resource.description}</p>

              <a
                className="btn btn-outline"
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore resource ↗
              </a>
            </article>
          ))}
        </div>

        <p className="muted" style={{ marginTop: "25px", fontSize: "13px" }}>
          Some courses or certificates may require payment. Check each
          platform for its current terms.
        </p>
      </div>
    </section>
  );
}

const styles = {
  category: {
    color: "#6542a6",
    fontSize: "12px",
    fontWeight: 700,
    marginBottom: "6px"
  }
};

export default Resources;