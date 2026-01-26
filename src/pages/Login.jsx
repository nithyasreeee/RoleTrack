import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [role, setRole] = useState("admin");
  const { login } = useAuth();
  const nav = useNavigate();

  const submit = () => {
    login(role, null);
    nav("/" + role);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 dark:from-gray-950 dark:via-indigo-950 dark:to-purple-950 relative overflow-hidden">
      {/* Animated Geometric Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated circles */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-pink-300/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        
        {/* Floating shapes */}
        <div className="absolute top-20 right-20 w-20 h-20 border-2 border-white/20 rounded-2xl rotate-45 animate-float"></div>
        <div className="absolute bottom-32 left-32 w-16 h-16 border-2 border-white/15 rounded-full animate-float animation-delay-2000"></div>
        <div className="absolute top-1/2 left-20 w-24 h-24 border-2 border-white/10 rounded-3xl -rotate-12 animate-float animation-delay-3000"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="relative h-screen flex overflow-hidden">
        {/* Left Side - Enhanced Hero Section */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-violet-700 via-purple-700 to-fuchsia-700 p-8 flex-col justify-between relative overflow-hidden">
          {/* Animated waves */}
          <div className="absolute inset-0 opacity-10">
            <svg className="absolute bottom-0 left-0 w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path fill="currentColor" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,106.7C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" className="animate-wave"></path>
            </svg>
          </div>
          
          {/* Decorative illustrations */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-32 right-10 w-32 h-32">
              <svg viewBox="0 0 100 100" className="animate-spin-slow">
                <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="2" fill="none" />
                <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="2" fill="none" />
                <circle cx="50" cy="50" r="20" stroke="white" strokeWidth="2" fill="none" />
              </svg>
            </div>
          </div>

          <div className="relative z-10">
            {/* Logo with glow effect */}
            <div className="flex items-center space-x-3 mb-6 animate-slide-down">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-2xl shadow-white/50 transform hover:rotate-12 transition-all duration-300 hover:scale-110">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-4xl font-extrabold text-white tracking-tight drop-shadow-lg">RoleTrack</span>
            </div>

            {/* Hero Content with better alignment */}
            <div className="max-w-lg space-y-4">
              <h1 className="text-5xl font-extrabold text-white mb-4 leading-tight tracking-tight drop-shadow-2xl">
                Modern Employee
                <br />
                <span className="bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 bg-clip-text text-transparent">Management System</span>
              </h1>
              <p className="text-lg text-white/90 leading-relaxed font-medium">
                Streamline your workforce operations with powerful tools for activity tracking, team management, and performance monitoring.
              </p>

              {/* Enhanced Features with icons */}
              <div className="space-y-3 pt-4">
                {[
                  { 
                    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
                    title: "Real-time Analytics", 
                    desc: "Track team performance with live dashboards", 
                    gradient: "from-cyan-400 to-blue-500",
                    glow: "group-hover:shadow-cyan-500/50"
                  },
                  { 
                    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                    title: "Activity Management", 
                    desc: "Efficient approval workflows for managers", 
                    gradient: "from-emerald-400 to-green-500",
                    glow: "group-hover:shadow-emerald-500/50"
                  },
                  { 
                    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
                    title: "Employee Directory", 
                    desc: "Centralized team information & status", 
                    gradient: "from-rose-400 to-pink-500",
                    glow: "group-hover:shadow-rose-500/50"
                  }
                ].map((feature, i) => (
                  <div key={i} className="flex items-center space-x-4 group cursor-pointer hover:translate-x-3 transition-all duration-300 animate-slide bg-white/10 backdrop-blur-lg p-4 rounded-2xl hover:bg-white/20 border border-white/10 hover:border-white/30" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-xl ${feature.glow} group-hover:scale-110 transition-all duration-300 flex-shrink-0`}>
                      <div className="text-white">{feature.icon}</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white text-lg mb-1 drop-shadow">{feature.title}</h3>
                      <p className="text-sm text-white/80 font-medium">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Footer */}
          <div className="relative z-10 text-white/70 text-sm flex items-center justify-between border-t border-white/10 pt-4">
            <p className="font-medium">© 2026 RoleTrack. Built with ❤️</p>
            <div className="flex items-center space-x-2 bg-green-500/20 px-3 py-1.5 rounded-full border border-green-400/30">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
              <span className="text-xs font-semibold text-green-200">All systems operational</span>
            </div>
          </div>
        </div>

        {/* Right Side - Enhanced Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative overflow-y-auto backdrop-blur-sm">
          {/* Decorative elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
          
          <div className="w-full max-w-md relative z-10">
            {/* Mobile Logo */}
            <div className="lg:hidden mb-8 text-center animate-fade">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/50 animate-pulse">
                  <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="text-5xl font-extrabold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent drop-shadow-lg">RoleTrack</span>
              </div>
            </div>

            {/* Enhanced Login Card */}
            <div className="bg-gradient-to-br from-white/95 to-white/80 dark:from-gray-900/95 dark:to-gray-800/80 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-purple-500/20 p-8 border border-white/20 dark:border-gray-700/50 animate-slide hover:shadow-purple-500/30 transition-all duration-500">
              <div className="text-center mb-8 animate-fade">
                <h2 className="text-4xl font-extrabold mb-3">
                  <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent drop-shadow-lg">
                    Welcome Back
                  </span>
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-base font-medium">
                  Sign in to access your dashboard
                </p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); submit(); }} className="space-y-5">
                {/* Role Selection */}
                <div className="animate-slide-down space-y-3" style={{ animationDelay: '100ms' }}>
                  <label className="block text-base font-bold mb-4">
                    <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                      Select Your Role
                    </span>
                  </label>

                  {/* Admin Option */}
                  <label className="flex items-center space-x-4 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl cursor-pointer hover:border-violet-500 hover:bg-violet-50/50 dark:hover:bg-violet-900/20 transition-all group shadow-sm hover:shadow-lg hover:shadow-violet-500/20">
                    <input
                      type="radio"
                      name="role"
                      value="admin"
                      checked={role === 'admin'}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-5 h-5 text-violet-600 focus:ring-violet-500"
                    />
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-purple-500/50 transition-transform">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <span className="text-lg font-bold text-gray-900 dark:text-white">Admin</span>
                    </div>
                  </label>

                  {/* Manager Option */}
                  <label className="flex items-center space-x-4 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all group shadow-sm hover:shadow-lg hover:shadow-blue-500/20">
                    <input
                      type="radio"
                      name="role"
                      value="manager"
                      checked={role === 'manager'}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-5 h-5 text-indigo-600 focus:ring-indigo-500"
                    />
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-blue-500/50 transition-transform">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <span className="text-lg font-bold text-gray-900 dark:text-white">Manager</span>
                    </div>
                  </label>

                  {/* Employee Option */}
                  <label className="flex items-center space-x-4 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl cursor-pointer hover:border-green-500 hover:bg-green-50/50 dark:hover:bg-green-900/20 transition-all group shadow-sm hover:shadow-lg hover:shadow-green-500/20">
                    <input
                      type="radio"
                      name="role"
                      value="employee"
                      checked={role === 'employee'}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-5 h-5 text-indigo-600 focus:ring-indigo-500"
                    />
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-green-500/50 transition-transform">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <span className="text-lg font-bold text-gray-900 dark:text-white">Employee</span>
                    </div>
                  </label>
                </div>

                {/* Enhanced Login Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white py-4 rounded-2xl hover:from-violet-700 hover:via-purple-700 hover:to-fuchsia-700 transition-all shadow-xl shadow-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/50 font-bold text-lg transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800 relative overflow-hidden group animate-slide-down"
                  style={{ animationDelay: '200ms' }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  <span className="relative flex items-center justify-center space-x-3">
                    <span>Sign In</span>
                    <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
              </form>
            </div>

            {/* Enhanced Status Badge */}
            <div className="mt-6 text-center animate-fade" style={{ animationDelay: '400ms' }}>
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 px-5 py-2.5 rounded-full border-2 border-green-200/50 dark:border-green-800/50 shadow-lg shadow-green-500/10 backdrop-blur-sm">
                <div className="relative">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                </div>
                <p className="text-sm font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Secure • Reliable • Modern</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
