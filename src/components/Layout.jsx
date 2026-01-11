import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const [open, setOpen] = useState(true);
  const { logout, user } = useAuth();
  const { dark, setDark } = useTheme();
  const navigate = useNavigate();

  const roleColors = {
    admin: "from-purple-500 to-pink-600",
    manager: "from-indigo-500 to-blue-600",
    employee: "from-green-500 to-emerald-600"
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50 dark:from-gray-950 dark:via-indigo-950 dark:to-purple-950 transition-colors duration-300">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-r border-gray-200 dark:border-gray-800 shadow-2xl transition-all duration-300 z-40 animate-slide ${open ? "w-72" : "w-20"}`}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex justify-between items-center">
              {open && (
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 bg-gradient-to-br ${roleColors[user.role]} rounded-xl flex items-center justify-center shadow-lg`}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    RoleTrack
                  </h1>
                </div>
              )}
              <button 
                onClick={() => setOpen(!open)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all hover:scale-110"
              >
                <svg className={`w-6 h-6 text-gray-700 dark:text-gray-300 transition-transform ${!open && 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </button>
            </div>
          </div>

          {/* User Info */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-800 animate-fade">
            {open ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-14 h-14 bg-gradient-to-br ${roleColors[user.role]} rounded-2xl flex items-center justify-center font-bold text-white text-xl shadow-xl`}>
                    {user.role?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-bold capitalize text-gray-900 dark:text-white">{user.role}</p>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Active Now</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className={`w-12 h-12 bg-gradient-to-br ${roleColors[user.role]} rounded-xl flex items-center justify-center font-bold text-white shadow-lg`}>
                  {user.role?.charAt(0).toUpperCase()}
                </div>
              </div>
            )}
          </div>

          {/* Navigation Menu */}
          <div className="flex-1 p-4 space-y-2 overflow-y-auto">
            <button
              onClick={() => navigate(`/${user.role}`)}
              className="w-full flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl transition-all hover:from-indigo-600 hover:to-purple-600 shadow-lg hover:shadow-xl group"
            >
              <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {open && <span className="font-bold">Dashboard</span>}
            </button>
          </div>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <button
              onClick={logout}
              className="w-full flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl transition-all shadow-lg hover:shadow-xl group"
            >
              <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              {open && <span className="font-bold">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${open ? "ml-72" : "ml-20"}`}>
        <div className="max-w-7xl mx-auto p-8 relative z-10">
          <div className="animate-fade">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
