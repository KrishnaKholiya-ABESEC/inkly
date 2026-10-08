import { Link, useLocation } from "react-router-dom";
import { PenLine, Moon, Sun } from "lucide-react";

function Navbar({ darkMode, setDarkMode }) {
  const location = useLocation();

  return (
    <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link
          to="/"
          className="text-2xl font-bold tracking-tight"
        >
          Inkly
        </Link>

        <div className="flex items-center gap-2">

          <Link
            to="/"
            className={`px-4 py-2 rounded-lg text-sm transition ${
              location.pathname === "/"
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            Home
          </Link>

          <Link
            to="/create"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition ${
              location.pathname === "/create"
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <PenLine size={16} />
            Create
          </Link>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun size={19} />
            ) : (
              <Moon size={19} />
            )}
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;