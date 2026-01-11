import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [role, setRole] = useState("admin");
  const { login } = useAuth();
  const nav = useNavigate();

  const submit = () => {
    login(role);
    nav("/" + role);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative min-h-screen flex">
        {/* Left Side - Hero Section */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-12 flex-col justify-between relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-72 h-72 border-4 border-white rounded-full"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 border-4 border-white rounded-full"></div>
          </div>

          <div className="relative z-10">
            {/* Logo */}
            <div className="flex items-center space-x-3 mb-8 animate-slide-down">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-2xl transform hover:rotate-12 transition-transform duration-300">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-3xl font-bold text-white">RoleTrack</span>
            </div>

            {/* Hero Content */}
            <div className="max-w-lg">
              <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                Modern Employee Management System
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Streamline your workforce operations with powerful tools for activity tracking, team management, and performance monitoring.
              </p>

              {/* Features */}
              <div className="space-y-4">
                {[
                  { icon: "📊", title: "Real-time Analytics", desc: "Track team performance with live dashboards", color: "from-cyan-400 to-blue-500" },
                  { icon: "✅", title: "Activity Management", desc: "Efficient approval workflows for managers", color: "from-green-400 to-emerald-500" },
                  { icon: "👥", title: "Employee Directory", desc: "Centralized team information & status", color: "from-purple-400 to-pink-500" }
                ].map((feature, i) => (
                  <div key={i} className="flex items-start space-x-3 group cursor-pointer hover:translate-x-2 transition-all duration-300 animate-slide" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className={`w-10 h-10 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300`}>
                      <span className="text-xl">{feature.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white group-hover:text-blue-100 transition-colors">{feature.title}</h3>
                      <p className="text-sm text-blue-100 group-hover:text-white transition-colors">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10 text-blue-100 text-sm">
            <p>© 2026 RoleTrack. Built with modern web technologies.</p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden mb-8 text-center animate-fade">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-11 h-11 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-xl animate-pulse">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">RoleTrack</span>
              </div>
            </div>

            {/* Login Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 backdrop-blur-sm border border-gray-100 dark:border-gray-700 animate-slide hover:shadow-blue-200 transition-shadow duration-500">
              <div className="text-center mb-8 animate-fade">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Welcome Back
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Sign in to access your dashboard
                </p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); submit(); }} className="space-y-6">
                {/* Role Selection */}
                <div className="animate-slide-down" style={{ animationDelay: '100ms' }}>
                  <label className="block text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
                    Select Your Role
                  </label>
                  <div className="relative group">
                    <select
                      className="w-full px-5 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 bg-gradient-to-r from-white to-blue-50 dark:from-gray-700 dark:to-gray-700 text-gray-900 dark:text-gray-100 transition-all appearance-none cursor-pointer text-base font-medium hover:border-blue-400 hover:shadow-lg"
                      onChange={e => setRole(e.target.value)}
                      value={role}
                    >
                      <option value="admin">👑 Admin - Full System Access</option>
                      <option value="manager">👔 Manager - Team Oversight</option>
                      <option value="employee">👤 Employee - Activity Tracking</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-4 rounded-xl hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-2xl font-semibold text-base transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800 relative overflow-hidden group animate-slide-down"
                  style={{ animationDelay: '200ms' }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  <span className="relative flex items-center justify-center space-x-2">
                    <span>Sign In</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
              </form>

              {/* Demo Notice */}
              <div className="mt-6 animate-slide-down" style={{ animationDelay: '300ms' }}>
                <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg p-4 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 mt-0.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center animate-pulse">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-blue-900 dark:text-blue-300">Demo Mode</p>
                      <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
                        Select any role to explore the system. No credentials required.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Badge */}
            <div className="mt-8 text-center animate-fade" style={{ animationDelay: '400ms' }}>
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 px-4 py-2 rounded-full border border-green-200 dark:border-green-800">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-sm font-medium bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Secure • Reliable • Modern</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
