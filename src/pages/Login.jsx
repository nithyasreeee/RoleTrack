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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-indigo-950 dark:to-purple-950 relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      
      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative min-h-screen flex">
        {/* Left Side - Hero Section */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-12 flex-col justify-between relative overflow-hidden">
          {/* Animated Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          
          {/* Floating Shapes */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-32 h-32 border-2 border-white/30 rounded-3xl rotate-12 animate-bounce-subtle"></div>
            <div className="absolute bottom-40 right-32 w-24 h-24 border-2 border-white/30 rounded-full animate-pulse"></div>
            <div className="absolute top-1/2 right-20 w-40 h-40 border-2 border-white/20 rounded-2xl -rotate-12"></div>
          </div>

          <div className="relative z-10">
            {/* Logo */}
            <div className="flex items-center space-x-3 mb-12 animate-slide-down">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-2xl transform hover:rotate-12 transition-all duration-300">
                <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-3xl font-bold text-white tracking-tight">RoleTrack</span>
            </div>

            {/* Hero Content */}
            <div className="max-w-lg space-y-6">
              <h1 className="text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                Modern Employee
                <br />
                <span className="text-purple-200">Management System</span>
              </h1>
              <p className="text-lg text-purple-100 leading-relaxed">
                Streamline your workforce operations with powerful tools for activity tracking, team management, and performance monitoring.
              </p>

              {/* Features */}
              <div className="space-y-4 pt-6">
                {[
                  { icon: "📊", title: "Real-time Analytics", desc: "Track team performance with live dashboards", gradient: "from-blue-400 to-cyan-400" },
                  { icon: "✅", title: "Activity Management", desc: "Efficient approval workflows for managers", gradient: "from-green-400 to-emerald-400" },
                  { icon: "👥", title: "Employee Directory", desc: "Centralized team information & status", gradient: "from-pink-400 to-rose-400" }
                ].map((feature, i) => (
                  <div key={i} className="flex items-start space-x-4 group cursor-pointer hover:translate-x-2 transition-all duration-300 animate-slide bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300 flex-shrink-0`}>
                      <span className="text-2xl">{feature.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white text-lg mb-1">{feature.title}</h3>
                      <p className="text-sm text-purple-100">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10 text-purple-200 text-sm flex items-center justify-between">
            <p>© 2026 RoleTrack. Built with modern web technologies.</p>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs">All systems operational</span>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden mb-10 text-center animate-fade">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">RoleTrack</span>
              </div>
            </div>

            {/* Login Card */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-gray-200/50 dark:border-gray-700/50 animate-slide hover:shadow-indigo-200 dark:hover:shadow-purple-900/50 transition-shadow duration-500">
              <div className="text-center mb-10 animate-fade">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                  Welcome Back
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Sign in to access your dashboard
                </p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); submit(); }} className="space-y-6">
                {/* Role Selection */}
                <div className="animate-slide-down" style={{ animationDelay: '100ms' }}>
                  <label className="block text-sm font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
                    Select Your Role
                  </label>
                  <div className="relative group">
                    <select
                      className="w-full px-6 py-4 border-2 border-indigo-200 dark:border-purple-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all appearance-none cursor-pointer text-base font-semibold hover:border-indigo-400 hover:shadow-xl shadow-lg"
                      onChange={e => setRole(e.target.value)}
                      value={role}
                    >
                      <option value="admin" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-3">👑 Admin - Full System Access</option>
                      <option value="manager" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-3">👔 Manager - Team Oversight</option>
                      <option value="employee" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-3">👤 Employee - Activity Tracking</option>
                    </select>
                    <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-5 rounded-2xl hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all shadow-xl hover:shadow-2xl font-bold text-lg transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800 relative overflow-hidden group animate-slide-down"
                  style={{ animationDelay: '200ms' }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  <span className="relative flex items-center justify-center space-x-3">
                    <span>Sign In</span>
                    <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
              </form>

              {/* Demo Notice */}
              <div className="mt-8 animate-slide-down" style={{ animationDelay: '300ms' }}>
                <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 border-2 border-indigo-200 dark:border-indigo-800 rounded-2xl p-5 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 mt-0.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 animate-pulse shadow-lg">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-base font-bold text-indigo-900 dark:text-indigo-300 mb-1">Demo Mode</p>
                      <p className="text-sm text-indigo-700 dark:text-indigo-400">
                        Select any role to explore the system. No credentials required.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Badge */}
            <div className="mt-8 text-center animate-fade" style={{ animationDelay: '400ms' }}>
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 px-6 py-3 rounded-full border-2 border-green-200 dark:border-green-800 shadow-lg">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
                <p className="text-sm font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Secure • Reliable • Modern</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
