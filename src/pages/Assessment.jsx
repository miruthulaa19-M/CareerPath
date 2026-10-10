import { useState } from "react";

const questions = [
  {
    question: "Which activity do you enjoy most?",
    options: [
      { text: "Building websites and applications", career: "Web Developer" },
      { text: "Analyzing data and finding patterns", career: "Data Analyst" },
      { text: "Protecting computers and networks", career: "Cybersecurity" },
      { text: "Designing intelligent systems", career: "AI Engineer" }
    ]
  },
  {
    question: "Which subject interests you most?",
    options: [
      { text: "Web technologies and programming", career: "Web Developer" },
      { text: "Mathematics and statistics", career: "Data Analyst" },
      { text: "Computer networks and security", career: "Cybersecurity" },
      { text: "Machine learning and algorithms", career: "AI Engineer" }
    ]
  },
  {
    question: "Which task would you prefer?",
    options: [
      { text: "Creating a website or application", career: "Web Developer" },
      { text: "Finding insights from a large dataset", career: "Data Analyst" },
      { text: "Identifying security vulnerabilities", career: "Cybersecurity" },
      { text: "Building an AI-powered application", career: "AI Engineer" }
    ]
  },
  {
    question: "What would you like to learn next?",
    options: [
      { text: "React, JavaScript and frontend development", career: "Web Developer" },
      { text: "Python, SQL and data visualization", career: "Data Analyst" },
      { text: "Ethical hacking and network security", career: "Cybersecurity" },
      { text: "Python and machine learning", career: "AI Engineer" }
    ]
  },
  {
    question: "Which problem sounds most exciting?",
    options: [
      { text: "Improving a website's user experience", career: "Web Developer" },
      { text: "Predicting trends using data", career: "Data Analyst" },
      { text: "Preventing a cyberattack", career: "Cybersecurity" },
      { text: "Teaching a computer to recognize patterns", career: "AI Engineer" }
    ]
  }
];

const careerDetails = {
  "Web Developer": {
    description: "Build websites and interactive web applications.",
    language: "JavaScript",
    skills: ["HTML", "CSS", "JavaScript", "React"]
  },
  "Data Analyst": {
    description: "Analyze data and turn it into useful insights.",
    language: "Python",
    skills: ["Python", "SQL", "Excel", "Data Visualization"]
  },
  Cybersecurity: {
    description: "Help protect computer systems, networks and information.",
    language: "Python",
    skills: ["Networking", "Linux", "Python", "Security Fundamentals"]
  },
  "AI Engineer": {
    description: "Build intelligent applications using AI techniques.",
    language: "Python",
    skills: ["Python", "Mathematics", "Machine Learning", "Data"]
  }
};

export default function Assessment() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [career, setCareer] = useState("");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / questions.length) * 100;

  function selectAnswer(questionIndex, selectedCareer) {
    setAnswers((previous) => ({
      ...previous,
      [questionIndex]: selectedCareer
    }));
  }

  async function fetchProjects(language) {
    setLoading(true);
    setError("");
    setProjects([]);

    try {
      const url =
        "https://api.github.com/search/repositories" +
        `?q=language:${encodeURIComponent(language)}` +
        "&sort=stars&order=desc&per_page=6";

      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 403 || response.status === 429) {
          throw new Error(
            "GitHub request limit reached. Please try again later."
          );
        }

        throw new Error("Unable to fetch projects. Please try again.");
      }

      const data = await response.json();
      setProjects(data.items || []);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function submitAssessment() {
    if (answeredCount !== questions.length) {
      alert("Please answer all five questions before submitting.");
      return;
    }

    const scores = {};

    Object.values(answers).forEach((answer) => {
      scores[answer] = (scores[answer] || 0) + 1;
    });

    const recommendedCareer = Object.keys(scores).reduce(
      (best, current) =>
        scores[current] > scores[best] ? current : best
    );

    setCareer(recommendedCareer);
    setSubmitted(true);
    try {
      localStorage.setItem("careerpathCareer", recommendedCareer);
    } catch {
      // Ignore localStorage error
    }
    fetchProjects(careerDetails[recommendedCareer].language);
  }

  function resetAssessment() {
    setAnswers({});
    setSubmitted(false);
    setCareer("");
    setProjects([]);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const details = careerDetails[career];

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <span style={styles.eyebrow}>CAREERPATH • SELF DISCOVERY</span>
          <h1 style={styles.title}>Career Assessment</h1>
          <p style={styles.subtitle}>
            Discover a career direction .
          </p>
        </header>

        {!submitted ? (
          <>
            <section style={styles.progressCard}>
              <div style={styles.progressInfo}>
                <span>Your progress</span>
                <strong>{answeredCount}/{questions.length}</strong>
              </div>

              <div style={styles.progressTrack}>
                <div
                  style={{
                    ...styles.progressFill,
                    width: `${progress}%`
                  }}
                />
              </div>

              <p style={styles.progressHint}>
                Answer all questions to discover your suggested career.
              </p>
            </section>

            {questions.map((item, questionIndex) => (
              <section key={item.question} style={styles.questionCard}>
                <div style={styles.questionNumber}>
                  QUESTION {String(questionIndex + 1).padStart(2, "0")}
                </div>

                <h2 style={styles.questionTitle}>{item.question}</h2>

                <div style={styles.optionGrid}>
                  {item.options.map((option) => {
                    const selected =
                      answers[questionIndex] === option.career;

                    return (
                      <button
                        key={option.text}
                        type="button"
                        aria-pressed={selected}
                        onClick={() =>
                          selectAnswer(questionIndex, option.career)
                        }
                        style={{
                          ...styles.option,
                          ...(selected ? styles.optionSelected : {})
                        }}
                      >
                        <span>{option.text}</span>
                        <span style={styles.optionIndicator}>
                          {selected ? "✓" : "○"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}

            <button
              type="button"
              onClick={submitAssessment}
              style={styles.primaryButton}
            >
              Submit Assessment →
            </button>
          </>
        ) : (
          <section style={styles.resultCard}>
            <div style={styles.resultIcon}>✓</div>
            <span style={styles.eyebrow}>YOUR ASSESSMENT RESULT</span>
            <h2 style={styles.resultTitle}>{career}</h2>
            <p style={styles.subtitle}>{details.description}</p>

            <h3 style={styles.sectionTitle}>Recommended skills</h3>
            <div style={styles.skillList}>
              {details.skills.map((skill) => (
                <span key={skill} style={styles.skillChip}>
                  {skill}
                </span>
              ))}
            </div>

            <p style={styles.disclaimer}>
              This is a basic interest-based suggestion, not a professional
              career evaluation.
            </p>

            <div style={styles.sectionDivider} />

            <h2 style={styles.sectionTitle}>Explore coding projects</h2>
            <p style={styles.subtitle}>
              Popular public {details.language} repositories  from
              GitHub.
            </p>

            {loading && (
              <p role="status" style={styles.infoMessage}>
                Fetching live projects from GitHub...
              </p>
            )}

            {error && (
              <div role="alert" style={styles.errorMessage}>
                {error}
                <button
                  type="button"
                  onClick={() => fetchProjects(details.language)}
                  style={styles.retryButton}
                >
                  Try again
                </button>
              </div>
            )}

            {!loading && !error && projects.length === 0 && (
              <p>No projects found. Please refresh and try again.</p>
            )}

            <div style={styles.projectGrid}>
              {projects.map((project) => (
                <article key={project.id} style={styles.projectCard}>
                  <h3 style={styles.projectTitle}>{project.name}</h3>
                  <p style={styles.projectDescription}>
                    {project.description || "No description available."}
                  </p>

                  <div style={styles.projectMeta}>
                    <span>⭐ {project.stargazers_count}</span>
                    <span>{project.language || "Other"}</span>
                  </div>

                  <a
                    href={project.html_url}
                    target="_blank"
                    rel="noreferrer"
                    style={styles.projectLink}
                  >
                    View on GitHub ↗
                  </a>
                </article>
              ))}
            </div>

            <button
              type="button"
              disabled={loading}
              onClick={() => fetchProjects(details.language)}
              style={styles.secondaryButton}
            >
              {loading ? "Loading..." : "Refresh Projects"}
            </button>

            <button
              type="button"
              onClick={resetAssessment}
              style={styles.primaryButton}
            >
              Retake Assessment
            </button>
          </section>
        )}
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#F8F1E7",
    padding: "36px 20px 60px",
    fontFamily: "Arial, Helvetica, sans-serif",
    color: "#3F304B",
    boxSizing: "border-box"
  },

  container: {
    maxWidth: "1050px",
    margin: "0 auto"
  },

  header: {
    textAlign: "center",
    margin: "12px auto 32px",
    maxWidth: "760px"
  },

  eyebrow: {
    display: "inline-block",
    color: "#8054A8",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "1.6px",
    marginBottom: "10px"
  },

  title: {
    color: "#563675",
    fontSize: "clamp(28px, 4vw, 38px)",
    margin: "0 0 12px"
  },

  subtitle: {
    color: "#756A7C",
    fontSize: "15px",
    lineHeight: 1.7,
    marginTop: "8px"
  },

  progressCard: {
    background: "#FFFFFF",
    padding: "22px 24px",
    border: "1px solid #E6D8ED",
    borderRadius: "14px",
    marginBottom: "22px",
    boxShadow: "0 4px 15px rgba(86, 54, 117, 0.05)"
  },

  progressInfo: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
    color: "#563675",
    marginBottom: "12px"
  },

  progressTrack: {
    height: "8px",
    background: "#E9DFEF",
    borderRadius: "20px",
    overflow: "hidden"
  },

  progressFill: {
    height: "100%",
    background: "#8054A8",
    borderRadius: "20px",
    transition: "width 0.25s ease"
  },

  progressHint: {
    fontSize: "12px",
    color: "#8C8093",
    margin: "10px 0 0"
  },

  questionCard: {
    background: "#FFFFFF",
    border: "1px solid #E6D8ED",
    borderRadius: "14px",
    padding: "26px",
    marginBottom: "20px",
    boxShadow: "0 4px 15px rgba(86, 54, 117, 0.04)"
  },

  questionNumber: {
    fontSize: "11px",
    letterSpacing: "1.2px",
    fontWeight: "700",
    color: "#8054A8",
    marginBottom: "12px"
  },

  questionTitle: {
    fontSize: "19px",
    fontWeight: "600",
    color: "#563675",
    margin: "0 0 20px",
    lineHeight: 1.5
  },

  optionGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(min(100%, 270px), 1fr))",
    gap: "12px"
  },

  option: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    width: "100%",
    minHeight: "54px",
    padding: "14px 16px",
    textAlign: "left",
    border: "1px solid #E6D8ED",
    borderRadius: "9px",
    background: "#FFFCF7",
    color: "#51435D",
    fontSize: "14px",
    lineHeight: 1.5,
    cursor: "pointer",
    boxSizing: "border-box"
  },

  optionSelected: {
    background: "#F1E8F7",
    border: "1.5px solid #8054A8",
    color: "#563675",
    fontWeight: "600"
  },

  optionIndicator: {
    flexShrink: 0,
    fontSize: "16px",
    color: "#8054A8"
  },

  primaryButton: {
    display: "block",
    width: "100%",
    padding: "15px 20px",
    marginTop: "22px",
    border: "none",
    borderRadius: "9px",
    background: "#563675",
    color: "#FFFFFF",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer"
  },

  resultCard: {
    background: "#FFFFFF",
    border: "1px solid #E6D8ED",
    borderRadius: "16px",
    padding: "clamp(20px, 4vw, 36px)",
    boxShadow: "0 5px 22px rgba(86, 54, 117, 0.05)"
  },

  resultIcon: {
    display: "grid",
    placeItems: "center",
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    background: "#E9DFEF",
    color: "#563675",
    fontSize: "25px",
    marginBottom: "22px"
  },

  resultTitle: {
    color: "#563675",
    fontSize: "30px",
    margin: "4px 0"
  },

  sectionTitle: {
    fontSize: "20px",
    margin: "28px 0 14px",
    color: "#563675"
  },

  skillList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px"
  },

  skillChip: {
    background: "#F1E8F7",
    color: "#563675",
    border: "1px solid #E6D8ED",
    borderRadius: "24px",
    padding: "9px 14px",
    fontSize: "13px",
    fontWeight: "600"
  },

  disclaimer: {
    color: "#8C8093",
    fontSize: "12px",
    lineHeight: 1.6,
    marginTop: "20px"
  },

  sectionDivider: {
    borderTop: "1px solid #E6D8ED",
    margin: "28px 0"
  },

  infoMessage: {
    background: "#F1E8F7",
    color: "#563675",
    padding: "14px",
    borderRadius: "8px"
  },

  errorMessage: {
    background: "#FFF0ED",
    color: "#A23E35",
    padding: "14px",
    borderRadius: "8px",
    marginTop: "16px"
  },

  retryButton: {
    display: "block",
    padding: "8px 12px",
    marginTop: "10px",
    border: "1px solid #8054A8",
    borderRadius: "6px",
    background: "#FFFFFF",
    color: "#563675",
    cursor: "pointer"
  },

  projectGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
    gap: "16px",
    marginTop: "20px"
  },

  projectCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    border: "1px solid #E6D8ED",
    borderRadius: "12px",
    padding: "20px",
    background: "#FFFCF7",
    minWidth: 0,
    overflowWrap: "anywhere"
  },

  projectTitle: {
    fontSize: "17px",
    color: "#563675",
    margin: "0 0 10px"
  },

  projectDescription: {
    fontSize: "13px",
    color: "#756A7C",
    lineHeight: 1.65,
    flex: 1
  },

  projectMeta: {
    display: "flex",
    flexWrap: "wrap",
    gap: "14px",
    fontSize: "12px",
    color: "#756A7C",
    margin: "8px 0 16px"
  },

  projectLink: {
    color: "#8054A8",
    fontWeight: "700",
    fontSize: "13px",
    textDecoration: "none"
  },

  secondaryButton: {
    display: "block",
    width: "100%",
    padding: "13px",
    marginTop: "22px",
    border: "1px solid #8054A8",
    borderRadius: "9px",
    background: "#FFFFFF",
    color: "#563675",
    fontWeight: "700",
    cursor: "pointer"
  }
};