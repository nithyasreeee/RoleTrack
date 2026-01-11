import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Layout({ children }) {
  const [open, setOpen] = useState(true);
  const { logout, user } = useAuth();
  const { dark, setDark } = useTheme();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-slate-900">
      {/* Sidebar */}
      <aside className={`bg-gradient-to-b from-slate-800 to-slate-900 text-white shadow-2xl transition-all duration-300 ${open ? "w-64" : "w-20"}`}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-slate-700">
            <div className="flex justify-between items-center">
              <h1 className={`text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent ${!open && "hidden"}`}>
                RoleTrack
              </h1>
              <button 
                onClick={() => setOpen(!open)}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* User Info */}
          <div className="p-6 border-b border-slate-700">
            {open && (
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold">
                    {user.role?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold capitalize">{user.role}</p>
                    <p className="text-xs text-slate-400">Active</p>
                  </div>
                </div>
              </div>
            )}
            {!open && (
              <div className="flex justify-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold">
                  {user.role?.charAt(0).toUpperCase()}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex-1 p-4 space-y-3">
            <button
              onClick={() => setDark(!dark)}
              className="w-full flex items-center space-x-3 px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-all group"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {dark ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                )}
              </svg>
              {open && <span className="text-sm font-medium">{dark ? "Light Mode" : "Dark Mode"}</span>}
            </button>

            <button
              onClick={logout}
              className="w-full flex items-center space-x-3 px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-all group"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              {open && <span className="text-sm font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
