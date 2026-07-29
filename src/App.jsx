import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error("Failed to parse saved todos", err);
      }
    }
    return [];
  });
  const [editId, setEditId] = useState(null);
  const [deadline, setDeadline] = useState("");
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo(e) {
    e.preventDefault();
    if (task.trim() === "") {
      toast.warning("Please enter a task!");
      return;
    }

    if (editId) {
      const updatedTodos = todos.map((todo) =>
        todo.id === editId
          ? {
            ...todo,
            text: task,
            deadline: deadline,
          }
          : todo
      );

      setTodos(updatedTodos);
      toast.info("Todo Updated Successfully!");
      setEditId(null);
    } else {
      const newTodo = {
        id: Date.now(),
        text: task,
        completed: false,
        deadline: deadline,
      };

      setTodos([...todos, newTodo]);
      toast.success("Todo Added Successfully!");
    }

    setTask("");
    setDeadline("");
  }

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
    toast.success("Todo Deleted Successfully!");
    if (editId === id) {
      setEditId(null);
      setTask("");
      setDeadline("");
    }
  }

  function editTodo(todo) {
    setTask(todo.text);
    setDeadline(todo.deadline);
    setEditId(todo.id);
  }

  function toggleComplete(id) {
    const updatedTodos = todos.map((todo) =>
      todo.id === id
        ? {
          ...todo,
          completed: !todo.completed,
        }
        : todo
    );

    setTodos(updatedTodos);
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      if (!todo.completed) {
        toast.success("Task completed! Keep it up!");
      } else {
        toast.info("Task marked as active.");
      }
    }
  }

  function clearCompleted() {
    const completedCount = todos.filter((t) => t.completed).length;
    if (completedCount === 0) {
      toast.warning("No completed tasks to clear!");
      return;
    }
    setTodos(todos.filter((t) => !t.completed));
    toast.success(`Cleared ${completedCount} completed task(s)!`);
  }

  // Filter logic
  const filteredTodos = todos.filter((todo) => {
    if (filter === "ACTIVE") return !todo.completed;
    if (filter === "COMPLETED") return todo.completed;
    return true;
  });

  const completedCount = todos.filter((t) => t.completed).length;
  const totalCount = todos.length;

  return (
    <div className="app-card">
      {/* Decorative Grid Nodes */}
      <div className="card-node node-tl"></div>
      <div className="card-node node-tr"></div>
      <div className="card-node node-bl"></div>
      <div className="card-node node-br"></div>

      {/* Header section mimicking the recycl-e header */}
      <header className="app-header">
        <div className="brand">
          <span className="brand-logo">@</span>
          <span className="brand-name">todo;-e</span>
        </div>

        <nav className="header-nav">
          <button
            className={`nav-link ${filter === "ALL" ? "active" : ""}`}
            onClick={() => setFilter("ALL")}
          >
            ALL
          </button>
          <button
            className={`nav-link ${filter === "ACTIVE" ? "active" : ""}`}
            onClick={() => setFilter("ACTIVE")}
          >
            ACTIVE
          </button>
          <button
            className={`nav-link ${filter === "COMPLETED" ? "active" : ""}`}
            onClick={() => setFilter("COMPLETED")}
          >
            COMPLETED
          </button>
        </nav>

        <div className="header-actions">
          <div className="status-pill">
            <span className="mono-num">{completedCount}</span>/{totalCount} DONE
          </div>
          <button className="btn-donate" onClick={clearCompleted}>
            CLEAR DONE
          </button>
        </div>
      </header>

      {/* Main Grid Content */}
      <div className="main-content">

        {/* Left Column: Mission text & Add task form */}
        <div className="content-col col-left">
          <div className="intro-block">
            <p className="vintage-text">
              "Turn daily inspiration into a clear action plan. Styled for
              simplicity and built for productivity, this registry helps you
              organize your thoughts and tackle your goals effortlessly. Plan
              your day, focus on what's next, and get things done."
            </p>
          </div>

          <form className="add-task-form" onSubmit={addTodo}>
            <div className="form-group">
              <label className="form-label">TYPE 01: TASK NAME</label>
              <input
                type="text"
                placeholder="Enter task description..."
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="task-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">TYPE 02: TARGET DATE</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="deadline-input"
              />
            </div>

            <button type="submit" className="btn-add">
              {editId ? "UPDATE FOCUS" : "COMMENCE TASK"}
            </button>
          </form>
        </div>

        {/* Middle Column: The Orbital Interactive Graphic with Stylized Baseball Cap */}
        <div className="content-col col-center">
          <div className="orbit-container">
            {/* Orbital concentric rings */}
            <div className="orbit-ring ring-1"></div>
            <div className="orbit-ring ring-2"></div>
            <div className="orbit-ring ring-3"></div>

            {/* Connecting lines & starburst badges (mimics vectors on image) */}
            <div className="orbit-line-h"></div>
            <div className="orbit-line-v"></div>

            <div className="star-badge badge-top">
              <svg viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 0 L56 38 L92 30 L66 56 L80 92 L50 72 L20 92 L34 56 L8 30 L44 38 Z" />
              </svg>
            </div>
            <div className="star-badge badge-bottom">
              <svg viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 0 L56 38 L92 30 L66 56 L80 92 L50 72 L20 92 L34 56 L8 30 L44 38 Z" />
              </svg>
            </div>

            <div className="cap-label-pillow">
              <span>FOCUS ENGINE</span>
            </div>

            {/* Dynamic CSS / SVG Cap Container */}
            <div className={`cap-wrapper ${completedCount === totalCount && totalCount > 0 ? "glowing" : ""}`}>
              <svg viewBox="0 0 200 200" className="cap-svg">
                <defs>
                  <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {/* Cap Top Button */}
                <ellipse cx="100" cy="52" rx="10" ry="4" fill="#0d082e" />

                {/* Cap Dome Body */}
                <path
                  d="M45,110 C45,40 155,40 155,110 C155,115 150,118 143,118 C125,118 75,118 57,118 C50,118 45,115 45,110 Z"
                  fill="#1842b5"
                  stroke="#190e38"
                  strokeWidth="3.5"
                />

                {/* Panel seams */}
                <path d="M100,52 C85,75 78,95 80,118" fill="none" stroke="#190e38" strokeWidth="2" opacity="0.3" />
                <path d="M100,52 C115,75 122,95 120,118" fill="none" stroke="#190e38" strokeWidth="2" opacity="0.3" />
                <path d="M100,52 L100,118" fill="none" stroke="#190e38" strokeWidth="2" opacity="0.3" />

                {/* Cap brim/visor */}
                <path
                  d="M32,112 C20,123 12,143 55,145 C95,146 135,146 170,133 C180,126 172,118 158,116 C143,114 55,110 32,112 Z"
                  fill="#123594"
                  stroke="#190e38"
                  strokeWidth="3.5"
                />

                {/* Smiley/Antigravity face on the cap that glows */}
                <g
                  className="cap-face"
                  stroke={completedCount > 0 ? "#5efcb1" : "#ffffff"}
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                  filter={completedCount > 0 ? "url(#neon-glow)" : ""}
                  style={{ transition: "stroke 0.4s ease" }}
                >
                  {/* Left Eye */}
                  <line x1="90" y1="82" x2="90" y2="94" />
                  {/* Right Eye */}
                  <line x1="110" y1="82" x2="110" y2="94" />
                  {/* Mouth/Wiggle smile shape like on the cap */}
                  <path d="M 85,104 C 90,110 95,110 100,104 C 105,110 110,110 115,104" />
                </g>
              </svg>
            </div>

            <div className="status-label">
              {completedCount === totalCount && totalCount > 0 ? "ALL CLEAR" : `${totalCount - completedCount} REMAINING`}
            </div>
          </div>
        </div>

        {/* Right Column: Todo Items list */}
        <div className="content-col col-right">
          <div className="list-header">
            <h2 className="list-title">ACTIVE REGISTRY</h2>
            <span className="list-subtitle">INDEXED BY PRIORITY</span>
          </div>

          <div className="todo-list-wrapper">
            {filteredTodos.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">📂</span>
                <p>No tasks found in this register.</p>
              </div>
            ) : (
              <ul className="todo-list">
                {filteredTodos.map((todo) => (
                  <li
                    key={todo.id}
                    className={`todo-card ${todo.completed ? "completed-card" : ""}`}
                  >
                    <div className="todo-card-main">
                      <button
                        type="button"
                        className="check-checkbox"
                        onClick={() => toggleComplete(todo.id)}
                        aria-label="Toggle Complete"
                      >
                        {todo.completed && (
                          <svg className="check-mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </button>

                      <div className="todo-card-details">
                        <span className="todo-text">{todo.text}</span>
                        <span className="todo-deadline">
                          📅 {todo.deadline ? todo.deadline : "NO DEADLINE"}
                        </span>
                      </div>
                    </div>

                    <div className="todo-card-actions">
                      <button
                        className="card-action-btn edit-btn"
                        onClick={() => editTodo(todo)}
                        title="Edit Task"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                      <button
                        className="card-action-btn delete-btn"
                        onClick={() => deleteTodo(todo.id)}
                        title="Delete Task"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

      </div>

      {/* Layered Curved Waves matching the concept design layout */}
      <div className="waves-container">
        <svg className="waves-svg" viewBox="0 0 1200 240" preserveAspectRatio="none">
          {/* Wave 1 - Backmost (Medium Lavender) */}
          <path
            className="wave-path wave-1"
            d="M0,240 C150,140 320,180 500,120 C700,50 900,160 1200,90 L1200,240 L0,240 Z"
            fill="var(--color-purple-wave-1)"
          />
          {/* Wave 2 - Middle-back (Saturated Purple) */}
          <path
            className="wave-path wave-2"
            d="M0,240 C180,180 380,110 580,170 C780,230 980,105 1200,130 L1200,240 L0,240 Z"
            fill="var(--color-purple-wave-2)"
          />
          {/* Wave 3 - Middle-front (Deep Violet) */}
          <path
            className="wave-path wave-3"
            d="M0,240 C220,190 420,160 620,210 C820,260 1020,150 1200,170 L1200,240 L0,240 Z"
            fill="var(--color-purple-wave-3)"
          />
          {/* Wave 4 - Frontmost (Deepest Blackish Purple) */}
          <path
            className="wave-path wave-4"
            d="M0,240 C250,210 500,200 750,225 C1000,250 1100,210 1200,200 L1200,240 L0,240 Z"
            fill="var(--color-purple-wave-4)"
          />
        </svg>
      </div>

      {/* Toast container customized for our theme */}
      <ToastContainer
        position="bottom-center"
        autoClose={2500}
        theme="dark"
        toastClassName="custom-toast"
      />
    </div>
  );
}

export default App;