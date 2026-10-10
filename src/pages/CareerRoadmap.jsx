import { useMemo, useState } from "react";
import "./CareerRoadmap.css";

const roadmapData = {
  HTML: {
    category: "Web Development",
    description: "Learn to build accessible web pages from scratch.",
    stages: [
      { level: "Beginner", topics: ["HTML structure", "Headings and paragraphs", "Links and images", "Lists", "Tables", "Forms", "Semantic HTML"], projects: ["Personal profile page", "Student registration form"] },
      { level: "Intermediate", topics: ["Audio and video", "Form validation", "Accessibility", "SEO basics", "Metadata", "Embedding content"], projects: ["Portfolio website", "Event registration page"] },
      { level: "Advanced", topics: ["Accessibility audits", "Structured data", "Performance-friendly markup", "Advanced forms", "HTML best practices"], projects: ["Accessible portfolio", "Documentation website"] }
    ],
    resources: [["MDN HTML Guide", "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content"], ["W3Schools HTML", "https://www.w3schools.com/html/"]],
    next: ["CSS", "JavaScript"]
  },
  CSS: {
    category: "Web Development",
    description: "Style responsive, attractive websites.",
    stages: [
      { level: "Beginner", topics: ["Selectors", "Colors", "Typography", "Box model", "Margins and padding", "Borders", "Backgrounds"], projects: ["Profile card", "Styled landing page"] },
      { level: "Intermediate", topics: ["Flexbox", "CSS Grid", "Responsive design", "Media queries", "Positioning", "Transitions", "CSS variables"], projects: ["Responsive portfolio", "Product card grid"] },
      { level: "Advanced", topics: ["Animations", "Container queries", "CSS architecture", "Cascade layers", "Accessibility", "Performance"], projects: ["Responsive dashboard", "Reusable design system"] }
    ],
    resources: [["MDN CSS", "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics"], ["W3Schools CSS", "https://www.w3schools.com/css/"]],
    next: ["HTML", "JavaScript", "React"]
  },
  JavaScript: {
    category: "Programming",
    description: "Learn programming and create interactive applications.",
    stages: [
      { level: "Beginner", topics: ["Variables", "Data types", "Operators", "Conditions", "Loops", "Functions", "Arrays", "Objects", "DOM basics"], projects: ["Calculator", "Number guessing game"] },
      { level: "Intermediate", topics: ["Array methods", "Destructuring", "Modules", "Events", "Promises", "async and await", "Fetch API", "Error handling"], projects: ["Pokédex using PokéAPI", "Quiz application"] },
      { level: "Advanced", topics: ["Closures", "Event loop", "Testing", "Performance", "Security", "Design patterns", "Advanced asynchronous programming"], projects: ["API dashboard", "Task management app"] }
    ],
    resources: [["MDN JavaScript", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"], ["JavaScript.info", "https://javascript.info/"]],
    next: ["HTML", "CSS", "React", "Node.js"]
  },
  React: {
    category: "Frontend Development",
    description: "Create component-based websites using React.",
    stages: [
      { level: "Beginner", topics: ["JavaScript basics", "Vite setup", "JSX", "Components", "Props", "useState", "Events", "Rendering lists"], projects: ["Counter app", "Profile cards"] },
      { level: "Intermediate", topics: ["Forms", "useEffect", "Fetching APIs", "Loading states", "React Router", "Context API", "Reusable components"], projects: ["Pokédex", "Multi-page learning portal"] },
      { level: "Advanced", topics: ["Custom hooks", "Performance", "Testing", "Accessibility", "Authentication", "Deployment"], projects: ["Admin dashboard", "Full-stack application"] }
    ],
    resources: [["React Learn", "https://react.dev/learn"], ["Vite Guide", "https://vite.dev/guide/"]],
    next: ["JavaScript", "CSS", "Node.js", "TypeScript"]
  },
  Python: {
    category: "Programming",
    description: "Learn Python for automation, data analysis, AI, and backend development.",
    stages: [
      { level: "Beginner", topics: ["Installing Python", "Variables", "Data types", "Input and output", "Conditions", "Loops", "Functions", "Lists and dictionaries"], projects: ["Calculator", "Guessing game"] },
      { level: "Intermediate", topics: ["Modules", "File handling", "Exceptions", "Comprehensions", "OOP", "Virtual environments", "Using APIs"], projects: ["Expense tracker", "API data viewer"] },
      { level: "Advanced", topics: ["Testing", "Decorators", "Generators", "Type hints", "Async basics", "Databases", "Web APIs", "Deployment"], projects: ["FastAPI service", "Automated report generator"] }
    ],
    resources: [["Official Python Tutorial", "https://docs.python.org/3/tutorial/"], ["Programiz Python", "https://www.programiz.com/python-programming"]],
    next: ["SQL", "Data Analysis", "Machine Learning"]
  },
  Java: {
    category: "Programming",
    description: "Learn object-oriented programming and build Java applications.",
    stages: [
      { level: "Beginner", topics: ["JDK setup", "Variables", "Data types", "Operators", "Conditions", "Loops", "Methods", "Arrays", "Classes and objects"], projects: ["Grade calculator", "Bank account simulation"] },
      { level: "Intermediate", topics: ["Inheritance", "Polymorphism", "Interfaces", "Exceptions", "Collections", "Generics", "File handling"], projects: ["Library management system", "Quiz app"] },
      { level: "Advanced", topics: ["Streams", "Lambdas", "Multithreading", "Unit testing", "JDBC", "Design patterns", "Spring Boot"], projects: ["Database-backed student system", "REST API"] }
    ],
    resources: [["Dev.java Learn", "https://dev.java/learn/"], ["W3Schools Java", "https://www.w3schools.com/java/"]],
    next: ["SQL", "Data Structures", "Spring Boot"]
  },
  C: {
    category: "Programming",
    description: "Build programming fundamentals and understand memory.",
    stages: [
      { level: "Beginner", topics: ["Compiler setup", "Variables", "Input and output", "Operators", "Conditions", "Loops", "Functions", "Arrays", "Strings"], projects: ["Calculator", "Marks management program"] },
      { level: "Intermediate", topics: ["Pointers", "Pointer arithmetic", "Structures", "Dynamic memory", "Header files", "File handling", "Recursion"], projects: ["Contact book", "Student records program"] },
      { level: "Advanced", topics: ["Linked lists", "Stacks", "Queues", "Trees", "Bitwise operations", "Memory debugging", "Complexity analysis"], projects: ["Data structure implementation", "Command-line utility"] }
    ],
    resources: [["Learn-C.org", "https://www.learn-c.org/"], ["Programiz C", "https://www.programiz.com/c-programming"]],
    next: ["C++", "Data Structures", "Algorithms"]
  },
  "C++": {
    category: "Programming",
    description: "Progress from C++ basics to object-oriented programming and algorithms.",
    stages: [
      { level: "Beginner", topics: ["Compiler setup", "Variables", "Input and output", "Conditions", "Loops", "Functions", "Arrays", "Strings"], projects: ["Calculator", "Student marks program"] },
      { level: "Intermediate", topics: ["Classes", "Constructors", "Inheritance", "Polymorphism", "Templates", "Vectors", "Maps", "File handling"], projects: ["Library manager", "Inventory system"] },
      { level: "Advanced", topics: ["STL algorithms", "Smart pointers", "Exception safety", "Graphs", "Trees", "Algorithm complexity", "Unit testing"], projects: ["Pathfinding visualizer", "Algorithm practice collection"] }
    ],
    resources: [["LearnCpp", "https://www.learncpp.com/"], ["cppreference", "https://en.cppreference.com/"]],
    next: ["Data Structures", "Algorithms", "C"]
  },
  SQL: {
    category: "Databases",
    description: "Query and manage data in relational databases.",
    stages: [
      { level: "Beginner", topics: ["Tables", "SELECT", "WHERE", "Sorting", "INSERT", "UPDATE", "DELETE", "Aggregate functions", "Keys"], projects: ["Student database", "Store database"] },
      { level: "Intermediate", topics: ["JOINs", "Subqueries", "GROUP BY", "CASE", "Constraints", "Normalization", "Views", "Indexes", "Transactions"], projects: ["College event database", "Sales analysis"] },
      { level: "Advanced", topics: ["Window functions", "Query plans", "Index design", "Isolation levels", "Schema design", "Permissions", "Query optimization"], projects: ["Analytics database", "Optimized reporting queries"] }
    ],
    resources: [["SQLBolt", "https://sqlbolt.com/"], ["PostgreSQL Tutorial", "https://www.postgresql.org/docs/current/tutorial.html"]],
    next: ["Python", "Database Design", "Backend Development"]
  },
  Git: {
    category: "Developer Tools",
    description: "Track changes and collaborate on coding projects.",
    stages: [
      { level: "Beginner", topics: ["Version control", "git init", "git status", "git add", "git commit", "Git history", "GitHub repositories"], projects: ["Portfolio repository", "Track a coding project"] },
      { level: "Intermediate", topics: ["Branches", "Merging", "Push and pull", "Pull requests", "Merge conflicts", ".gitignore", "README files"], projects: ["Collaborative website", "Feature branch workflow"] },
      { level: "Advanced", topics: ["Rebase", "Cherry-pick", "Tags and releases", "Code review", "GitHub Issues", "CI basics", "Recovery tools"], projects: ["Open-source contribution", "Automated test workflow"] }
    ],
    resources: [["Pro Git Book", "https://git-scm.com/book/en/v2"], ["GitHub Skills", "https://skills.github.com/"]],
    next: ["GitHub", "JavaScript", "Deployment"]
  },
  "Node.js": {
    category: "Backend Development",
    description: "Use JavaScript to create server-side applications and APIs.",
    stages: [
      { level: "Beginner", topics: ["Node.js setup", "Running JavaScript files", "Modules", "npm", "package.json", "Environment variables", "HTTP basics"], projects: ["Notes command-line app", "Simple HTTP server"] },
      { level: "Intermediate", topics: ["Express", "Routes", "Middleware", "REST APIs", "Validation", "Error handling", "CORS", "Database connection"], projects: ["Tasks API", "Student information API"] },
      { level: "Advanced", topics: ["Authentication", "Password hashing", "API testing", "Logging", "Rate limiting", "Security", "Deployment"], projects: ["Authenticated API", "Full-stack application"] }
    ],
    resources: [["Node.js Learn", "https://nodejs.org/en/learn"], ["Express Guide", "https://expressjs.com/en/guide/routing.html"]],
    next: ["JavaScript", "SQL", "React"]
  },
  TypeScript: {
    category: "Programming",
    description: "Add types to JavaScript applications.",
    stages: [
      { level: "Beginner", topics: ["JavaScript prerequisites", "Type annotations", "Primitive types", "Arrays", "Object types", "Functions", "Type inference"], projects: ["Typed calculator", "Contact list"] },
      { level: "Intermediate", topics: ["Interfaces", "Type aliases", "Union types", "Narrowing", "Generics", "Modules", "tsconfig"], projects: ["Typed API client", "Reusable components"] },
      { level: "Advanced", topics: ["Utility types", "Mapped types", "Conditional types", "Async data types", "React with TypeScript", "Strict mode", "Declaration files"], projects: ["Typed React dashboard", "Reusable library"] }
    ],
    resources: [["TypeScript Handbook", "https://www.typescriptlang.org/docs/handbook/intro.html"]],
    next: ["JavaScript", "React", "Node.js"]
  },
  "Data Structures": {
    category: "Computer Science",
    description: "Learn to store data efficiently and solve programming problems.",
    stages: [
      { level: "Beginner", topics: ["Complexity basics", "Arrays", "Strings", "Linked lists", "Stacks", "Queues", "Hash tables", "Searching"], projects: ["Stack and queue implementation", "Search visualizer"] },
      { level: "Intermediate", topics: ["Recursion", "Sorting", "Trees", "Binary search trees", "Heaps", "Graphs", "BFS", "DFS"], projects: ["Sorting visualizer", "Tree traversal visualizer"] },
      { level: "Advanced", topics: ["Tries", "Union-find", "Shortest paths", "Minimum spanning trees", "Dynamic programming", "Greedy algorithms", "Complexity analysis"], projects: ["Route finder", "Algorithm practice collection"] }
    ],
    resources: [["VisuAlgo", "https://visualgo.net/en"], ["GeeksforGeeks DSA", "https://www.geeksforgeeks.org/data-structures/"]],
    next: ["C++", "Java", "Python"]
  },
  "Machine Learning": {
    category: "AI and Data",
    description: "Learn how to prepare data, train models, and evaluate predictions.",
    stages: [
      { level: "Beginner", topics: ["Python basics", "Statistics foundations", "NumPy", "Pandas", "Data visualization", "Training and test data", "Supervised learning"], projects: ["Explore a dataset", "Simple regression model"] },
      { level: "Intermediate", topics: ["Data cleaning", "Feature engineering", "Regression", "Classification", "Decision trees", "Model evaluation", "Cross-validation"], projects: ["House price prediction", "Spam classifier"] },
      { level: "Advanced", topics: ["Ensemble models", "Clustering", "Hyperparameter tuning", "Data leakage", "Model interpretation", "Deployment", "Responsible AI"], projects: ["End-to-end ML project", "Prediction API"] }
    ],
    resources: [["Google ML Crash Course", "https://developers.google.com/machine-learning/crash-course"], ["Kaggle Learn", "https://www.kaggle.com/learn"]],
    next: ["Python", "SQL", "Data Analysis"]
  },
  "Data Analysis": {
    category: "AI and Data",
    description: "Turn raw data into insights using SQL, Python, and visualization.",
    stages: [
      { level: "Beginner", topics: ["Data types", "Spreadsheet basics", "Cleaning data", "Descriptive statistics", "Charts", "SQL SELECT", "Data storytelling"], projects: ["Expense analysis", "Student marks report"] },
      { level: "Intermediate", topics: ["Spreadsheet functions", "SQL JOINs", "Pandas", "Exploratory analysis", "Missing data", "Dashboards", "Communicating findings"], projects: ["Sales dashboard", "Public dataset analysis"] },
      { level: "Advanced", topics: ["Statistical testing", "Time series basics", "Automation", "Analysis pipelines", "Data quality", "Visualization design", "Ethical data handling"], projects: ["Automated monthly report", "Analytics dashboard"] }
    ],
    resources: [["Kaggle Learn", "https://www.kaggle.com/learn"], ["Pandas Guide", "https://pandas.pydata.org/docs/getting_started/index.html"]],
    next: ["Python", "SQL", "Machine Learning"]
  },
  Cybersecurity: {
    category: "Security",
    description: "Learn security fundamentals and practice only in authorized environments.",
    stages: [
      { level: "Beginner", topics: ["Networking basics", "Operating systems", "HTTP and DNS", "Authentication", "Passwords and MFA", "Common threats", "Security ethics"], projects: ["Personal security checklist", "Network diagram"] },
      { level: "Intermediate", topics: ["Linux command line", "Networking tools", "Web security", "Logs and monitoring", "Cryptography concepts", "Threat modeling", "Safe lab exercises"], projects: ["Log analysis report", "Security headers checker for your own site"] },
      { level: "Advanced", topics: ["Secure development", "Incident response", "Vulnerability management", "Cloud security", "Risk assessment", "Authorized security testing"], projects: ["Demo app threat model", "Incident response playbook"] }
    ],
    resources: [["OWASP Top 10", "https://owasp.org/www-project-top-ten/"], ["PortSwigger Academy", "https://portswigger.net/web-security"]],
    next: ["Networking", "Linux", "Python"]
  }
};

const makeId = (technology, stageIndex, topicIndex) =>
  `${technology}-${stageIndex}-${topicIndex}`;
function CareerRoadmap() {
  const [selected, setSelected] = useState("HTML");
  const [search, setSearch] = useState("");
  const [activeStage, setActiveStage] = useState(0);

  const [completed, setCompleted] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("careerpathRoadmapProgress") || "{}"
      );
    } catch {
      return {};
    }
  });

  const filteredTechnologies = useMemo(() => {
    return Object.keys(roadmapData).filter((technology) =>
      technology.toLowerCase().includes(search.trim().toLowerCase())
    );
  }, [search]);

  const roadmap = roadmapData[selected];

  const allTopics = useMemo(() => {
    return roadmap.stages.flatMap((stage, stageIndex) =>
      stage.topics.map((topic, topicIndex) => ({
        id: makeId(selected, stageIndex, topicIndex),
        topic,
        stageIndex,
      }))
    );
  }, [roadmap, selected]);

  const doneCount = allTopics.filter(
    (item) => completed[item.id]
  ).length;

  const progress = allTopics.length
    ? Math.round((doneCount / allTopics.length) * 100)
    : 0;

  function saveProgress(updated) {
    setCompleted(updated);

    try {
      localStorage.setItem(
        "careerpathRoadmapProgress",
        JSON.stringify(updated)
      );
    } catch (error) {
      console.error("Could not save roadmap progress:", error);
    }
  }

  function toggleTopic(id) {
    saveProgress({
      ...completed,
      [id]: !completed[id],
    });
  }

  function changeTechnology(technology) {
    if (!roadmapData[technology]) return;

    setSelected(technology);
    setActiveStage(0);
  }

  function resetProgress() {
    const updated = { ...completed };

    allTopics.forEach((item) => {
      delete updated[item.id];
    });

    saveProgress(updated);
  }

  return (
    <main className="roadmap-page">
      <section className="roadmap-hero">
        <span className="roadmap-eyebrow">
          YOUR LEARNING JOURNEY
        </span>

        <h1>Technology Roadmaps</h1>

        <p>
          Choose a language or technology and follow a learning
          path from beginner to advanced.
        </p>

        <input
          className="roadmap-search"
          type="search"
          placeholder="Search HTML, Python, Java..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search technologies"
        />
      </section>

      <div className="roadmap-layout">
        <aside className="roadmap-sidebar">
          <h2>Choose Technology</h2>

          {filteredTechnologies.length === 0 && (
            <p>No matching technology found.</p>
          )}

          {filteredTechnologies.map((technology) => (
            <button
              key={technology}
              type="button"
              className={`technology-button ${
                selected === technology ? "active" : ""
              }`}
              onClick={() => changeTechnology(technology)}
            >
              <span>{technology}</span>
              <span>›</span>
            </button>
          ))}
        </aside>

        <section className="roadmap-content">
          <div className="roadmap-intro">
            <span className="roadmap-category">
              {roadmap.category}
            </span>

            <h2>{selected} Roadmap</h2>
            <p>{roadmap.description}</p>

            <div className="progress-heading">
              <span>Overall progress</span>
              <strong>{progress}%</strong>
            </div>

            <div
              className="progress-track"
              role="progressbar"
              aria-label="Learning progress"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="progress-caption">
              {doneCount} of {allTopics.length} topics completed
            </p>
          </div>

          <div className="stage-tabs">
            {roadmap.stages.map((stage, index) => (
              <button
                key={stage.level}
                type="button"
                className={`stage-tab ${
                  activeStage === index ? "active" : ""
                }`}
                onClick={() => setActiveStage(index)}
              >
                <span>0{index + 1}</span>
                {stage.level}
              </button>
            ))}
          </div>

          <div className="stage-panel">
            <h3>{roadmap.stages[activeStage].level} Level</h3>

            <p className="stage-description">
              Learn these topics in order, then practise with projects.
            </p>

            <div className="topic-list">
              {roadmap.stages[activeStage].topics.map(
                (topic, topicIndex) => {
                  const id = makeId(
                    selected,
                    activeStage,
                    topicIndex
                  );

                  return (
                    <label
                      className={`topic-row ${
                        completed[id] ? "completed" : ""
                      }`}
                      key={id}
                    >
                      <input
                        type="checkbox"
                        checked={Boolean(completed[id])}
                        onChange={() => toggleTopic(id)}
                      />

                      <span className="topic-number">
                        {String(topicIndex + 1).padStart(2, "0")}
                      </span>

                      <span className="topic-name">{topic}</span>

                      {completed[id] && (
                        <span className="topic-check">✓</span>
                      )}
                    </label>
                  );
                }
              )}
            </div>

            <div className="project-box">
              <h4>Build Projects</h4>

              <p>
                Practise what you have learned by building:
              </p>

              <ul>
                {roadmap.stages[activeStage].projects.map(
                  (project) => (
                    <li key={project}>{project}</li>
                  )
                )}
              </ul>
            </div>

            <div className="stage-navigation">
              <button
                type="button"
                className="roadmap-secondary"
                disabled={activeStage === 0}
                onClick={() =>
                  setActiveStage((stage) => stage - 1)
                }
              >
                ← Previous
              </button>

              <button
                type="button"
                className="roadmap-primary"
                disabled={
                  activeStage === roadmap.stages.length - 1
                }
                onClick={() =>
                  setActiveStage((stage) => stage + 1)
                }
              >
                Next Level →
              </button>
            </div>
          </div>

          <section className="resource-section">
            <h3>Learning Resources</h3>

            <p>Use these resources to study each technology.</p>

            <div className="resource-list">
              {roadmap.resources.map(([title, url]) => (
                <a
                  key={title}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="resource-link"
                >
                  <span>{title}</span>
                  <span>↗</span>
                </a>
              ))}
            </div>
          </section>

          <section className="next-section">
            <h3>What to Learn Next</h3>

            <p>
              Explore related technologies after learning {selected}.
            </p>

            <div className="next-chips">
              {roadmap.next.map((technology) => (
                <button
                  key={technology}
                  type="button"
                  className="next-chip"
                  onClick={() => {
                    if (roadmapData[technology]) {
                      changeTechnology(technology);
                      setSearch("");
                    } else {
                      setSearch(technology);
                    }
                  }}
                >
                  {technology} →
                </button>
              ))}
            </div>
          </section>

          <button
            type="button"
            className="reset-progress"
            onClick={resetProgress}
          >
            Reset {selected} Progress
          </button>
        </section>
      </div>
    </main>
  );
}

export default CareerRoadmap;