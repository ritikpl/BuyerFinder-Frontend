import {
  LogOut,
  User,
  Moon,
  Sun,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <header className="fixed left-64 right-0 top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 dark:border-slate-800 dark:bg-slate-900">

      {/* Page Description */}
      <div className="text-sm text-slate-500 dark:text-slate-400">
        Find and connect with potential buyers
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">

        {/* Dark Mode Toggle */}
        <button
          type="button"
          onClick={() => setDarkMode((prev) => !prev)}
          title={darkMode ? "Light Mode" : "Dark Mode"}
          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
        >
          {darkMode ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>

        {/* User Avatar */}
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950">
          <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>

        {/* User Info */}
        <div className="hidden text-left sm:block">
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            {user?.name || "User"}
          </p>

          <p className="text-xs text-slate-400 dark:text-slate-500">
            {user?.email || ""}
          </p>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          title="Logout"
          className="ml-2 rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 dark:hover:text-red-400"
        >
          <LogOut className="h-4 w-4" />
        </button>

      </div>
    </header>
  );
};

export default Navbar;



