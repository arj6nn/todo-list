# todo;-e | Modern Task Registry & Focus Engine

A sleek, retro-futuristic task management application built with **React 19**, **Vite**, and **Custom CSS**. Organise daily goals, set target deadlines, track progress with interactive visual feedback, and maintain productivity seamlessly.

---

## ✨ Features

- 📝 **Full Task Lifecycle Management**: Effortlessly create, edit, mark complete, and delete tasks.
- 📅 **Target Deadlines**: Set optional target dates for each task to keep track of upcoming deadlines.
- 🔍 **Status Filtering**: Instantly filter tasks by status—**ALL**, **ACTIVE**, or **COMPLETED**.
- 📄 **Pagination**: Keep your workspace clean with automated pagination (4 tasks per page).
- 💾 **Local Storage Persistence**: Automatically saves tasks locally in your browser session.
- 🎯 **Interactive Focus Engine**: An SVG widget that visually reacts to your task completion progress.
- 🧹 **Bulk Cleanup**: One-click "CLEAR DONE" action to purge all completed tasks.
- 🔔 **Toast Feedback**: Real-time notifications powered by `react-toastify`.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool & Dev Server**: [Vite](https://vitejs.dev/)
- **Notifications**: [React Toastify](https://fkhadra.github.io/react-toastify/introduction/)
- **Styling**: Custom CSS3 (CSS Variables, Flexbox/Grid, SVG Waves & Visual Effects)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v18.0.0 or higher recommended).

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/react-todo.git
   cd react-todo
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

---

## 📜 Available Scripts

In the project directory, you can run:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server with Hot Module Replacement (HMR). |
| `npm run build` | Bundles and optimizes the app for production in the `dist` directory. |
| `npm run preview` | Serves the production build locally for testing. |
| `npm run lint` | Runs ESLint to check for code quality and syntax issues. |

---

## 📁 Project Structure

```
react-todo/
├── public/              # Static assets
├── src/
│   ├── assets/          # Project images & icons
│   ├── App.css          # Application styles, animations & theme layout
│   ├── App.jsx          # Main application logic & state management
│   ├── index.css        # Global CSS reset & base styles
│   └── main.jsx         # React application entry point
├── index.html           # HTML template
├── package.json         # Dependencies & npm scripts
├── vite.config.js       # Vite configuration
└── README.md            # Project documentation
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
