import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEmployees } from "../context/EmployeeContext";

export default function Login() {
  const [role, setRole] = useState("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { login } = useAuth();
  const { employees } = useEmployees();
  const nav = useNavigate();

  // Get active employees for employee role
  const activeEmployees = employees.filter(emp => emp.status === "active");

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setUsername("");
    setPassword("");
    setSelectedEmployeeId("");
    setError("");
    setShowAuthModal(true);
  };

  const closeModal = () => {
    setShowAuthModal(false);
    setError("");
  };

  // Authentication credentials (in production, this would be handled by backend)
  const credentials = {
    admin: { username: "admin", password: "admin123", email: "admin@roletrack.com" },
    manager: { username: "manager", password: "manager123", email: "manager@roletrack.com" },
  };

  const submit = () => {
    setError("");

    // Validate inputs based on role
    if (role === "employee") {
      // For employees, only validate password and selection
      if (!password.trim()) {
        setError("Please enter password");
        return;
      }
      if (!selectedEmployeeId) {
        setError("Please select an employee account");
        return;
      }
      
      const employee = employees.find(emp => emp.id === selectedEmployeeId);
      if (!employee) {
        setError("Selected employee not found");
        return;
      }

      const employeePassword = "emp123"; // Default password for all employees

      if (password !== employeePassword) {
        setError(`Invalid password for ${employee.name}.`);
        return;
      }

      login(role, employee);
      nav("/" + role);
    } else {
      // For admin and manager, validate username and password
      if (!username.trim() || !password.trim()) {
        setError("Please enter both username/email and password");
        return;
      }

      // Check credentials for admin/manager - allow both username and email
      const roleCredentials = credentials[role];
      const isValidUsername = username === roleCredentials.username || username === roleCredentials.email;
      const isValidPassword = password === roleCredentials.password;
      
      if (!isValidUsername || !isValidPassword) {
        setError(`Invalid credentials for ${role.charAt(0).toUpperCase() + role.slice(1)}. Please check your username/email and password.`);
        return;
      }
      login(role, null);
      nav("/" + role);
    }
  };

  return (
    <>
    <div className="h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 dark:from-gray-950 dark:via-indigo-950 dark:to-purple-950 relative overflow-hidden">
      {/* Animated Geometric Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large animated circles with higher opacity */}
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-purple-400/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-pink-400/25 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/3 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/2 right-1/3 w-[350px] h-[350px] bg-fuchsia-400/15 rounded-full blur-3xl animate-blob animation-delay-3000"></div>
        
        {/* Larger floating shapes with more visibility */}
        <div className="absolute top-20 right-20 w-32 h-32 border-3 border-white/40 rounded-2xl rotate-45 animate-float shadow-lg shadow-white/20"></div>
        <div className="absolute bottom-32 left-32 w-24 h-24 border-3 border-white/35 rounded-full animate-float animation-delay-2000 shadow-lg shadow-white/20"></div>
        <div className="absolute top-1/2 left-20 w-28 h-28 border-3 border-white/30 rounded-3xl -rotate-12 animate-float animation-delay-3000 shadow-lg shadow-white/20"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 border-3 border-white/35 rounded-xl rotate-12 animate-float animation-delay-1000 shadow-lg shadow-white/20"></div>
        <div className="absolute top-40 left-1/2 w-16 h-16 bg-white/15 rounded-lg rotate-45 animate-float animation-delay-3500 shadow-xl"></div>
        
        {/* Animated gradient mesh overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-pink-500/10 animate-pulse-slow"></div>
        
        {/* Moving particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/60 rounded-full animate-float shadow-lg shadow-white/50"></div>
        <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-white/60 rounded-full animate-float animation-delay-1000 shadow-lg shadow-white/50"></div>
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-white/60 rounded-full animate-float animation-delay-2000 shadow-lg shadow-white/50"></div>
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-white/60 rounded-full animate-float animation-delay-3000 shadow-lg shadow-white/50"></div>
        <div className="absolute top-1/3 left-1/2 w-1.5 h-1.5 bg-white/70 rounded-full animate-float animation-delay-1500 shadow-md shadow-white/40"></div>
        <div className="absolute bottom-1/4 right-1/2 w-1.5 h-1.5 bg-white/70 rounded-full animate-float animation-delay-2500 shadow-md shadow-white/40"></div>
        
        {/* Animated diagonal lines */}
        <div className="absolute top-0 left-1/4 w-0.5 h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-0.5 h-24 bg-gradient-to-b from-transparent via-white/15 to-transparent animate-float animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-0.5 h-28 bg-gradient-to-b from-transparent via-white/20 to-transparent animate-float animation-delay-3000"></div>
        
        {/* Pulsing rings */}
        <div className="absolute top-1/3 right-1/4 w-40 h-40 border border-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-32 h-32 border border-white/15 rounded-full animate-pulse animation-delay-2000"></div>
        
        {/* Star shapes */}
        <div className="absolute top-1/4 right-1/3 w-3 h-3">
          <div className="absolute inset-0 bg-white/40 rotate-0 animate-pulse"></div>
          <div className="absolute inset-0 bg-white/40 rotate-90 animate-pulse animation-delay-1000"></div>
        </div>
        <div className="absolute bottom-1/3 left-2/3 w-2 h-2">
          <div className="absolute inset-0 bg-white/50 rotate-0 animate-pulse animation-delay-2000"></div>
          <div className="absolute inset-0 bg-white/50 rotate-90 animate-pulse animation-delay-3000"></div>
        </div>
        
        {/* Additional sparkle particles */}
        <div className="absolute top-1/5 left-1/3 w-1 h-1 bg-white/80 rounded-full animate-pulse shadow-sm shadow-white/60"></div>
        <div className="absolute top-2/3 right-1/5 w-1 h-1 bg-white/80 rounded-full animate-pulse animation-delay-1000 shadow-sm shadow-white/60"></div>
        <div className="absolute bottom-1/5 left-1/5 w-1 h-1 bg-white/80 rounded-full animate-pulse animation-delay-2000 shadow-sm shadow-white/60"></div>
        <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-white/80 rounded-full animate-pulse animation-delay-3000 shadow-sm shadow-white/60"></div>
        
        {/* Grid pattern with subtle pulse */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px] animate-pulse-slow"></div>
      </div>

      <div className="relative h-screen flex overflow-hidden">
        {/* Left Side - Enhanced Hero Section */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-violet-700 via-purple-700 to-fuchsia-700 p-8 flex-col justify-between relative overflow-hidden">
          {/* Animated waves - more visible */}
          <div className="absolute inset-0 opacity-30">
            <svg className="absolute bottom-0 left-0 w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path fill="currentColor" fillOpacity="0.8" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,106.7C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" className="animate-wave"></path>
            </svg>
            <svg className="absolute bottom-0 left-0 w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path fill="currentColor" fillOpacity="0.5" d="M0,160L48,144C96,128,192,96,288,101.3C384,107,480,149,576,165.3C672,181,768,171,864,154.7C960,139,1056,117,1152,122.7C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" className="animate-wave" style={{ animationDelay: '1s', animationDuration: '4s' }}></path>
            </svg>
          </div>
          
          {/* Decorative illustrations - more visible and animated */}
          <div className="absolute inset-0 opacity-40 pointer-events-none">
            <div className="absolute top-32 right-10 w-40 h-40">
              <svg viewBox="0 0 100 100" className="animate-spin-slow">
                <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="1.5" fill="none" opacity="0.3" />
                <circle cx="50" cy="50" r="35" stroke="white" strokeWidth="2" fill="none" opacity="0.5" />
                <circle cx="50" cy="50" r="25" stroke="white" strokeWidth="2.5" fill="none" opacity="0.7" />
                <circle cx="50" cy="50" r="15" stroke="white" strokeWidth="3" fill="none" opacity="0.9" />
              </svg>
            </div>
            <div className="absolute bottom-40 left-16 w-32 h-32">
              <svg viewBox="0 0 100 100" className="animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '25s' }}>
                <rect x="20" y="20" width="60" height="60" stroke="white" strokeWidth="2" fill="none" opacity="0.4" transform="rotate(45 50 50)" />
                <rect x="30" y="30" width="40" height="40" stroke="white" strokeWidth="2" fill="none" opacity="0.6" transform="rotate(45 50 50)" />
              </svg>
            </div>
            {/* Floating triangle */}
            <div className="absolute top-1/2 left-1/4 w-24 h-24 animate-float animation-delay-1000">
              <svg viewBox="0 0 100 100">
                <polygon points="50,10 90,80 10,80" stroke="white" strokeWidth="2" fill="none" opacity="0.5" />
              </svg>
            </div>
            {/* Hexagon shape */}
            <div className="absolute bottom-1/4 right-1/4 w-28 h-28 animate-float animation-delay-3000">
              <svg viewBox="0 0 100 100">
                <polygon points="50,5 93.3,25 93.3,75 50,95 6.7,75 6.7,25" stroke="white" strokeWidth="2" fill="none" opacity="0.4" />
              </svg>
            </div>
            {/* Plus sign */}
            <div className="absolute top-2/3 right-1/3 w-16 h-16 animate-float animation-delay-2000">
              <svg viewBox="0 0 100 100">
                <line x1="50" y1="20" x2="50" y2="80" stroke="white" strokeWidth="3" opacity="0.5" />
                <line x1="20" y1="50" x2="80" y2="50" stroke="white" strokeWidth="3" opacity="0.5" />
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
                {/* Error Message */}
                {error && (
                  <div className="animate-slide-down p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-700 rounded-xl">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-sm text-red-800 dark:text-red-200 font-medium">{error}</p>
                    </div>
                  </div>
                )}

                {/* Role Selection */}
                <div className="animate-slide-down space-y-3" style={{ animationDelay: '100ms' }}>
                  <label className="block text-base font-bold mb-4">
                    <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                      Select Your Role
                    </span>
                  </label>

                  {/* Admin Option */}
                  <button
                    type="button"
                    onClick={() => handleRoleSelect('admin')}
                    className="w-full flex items-center space-x-4 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl cursor-pointer hover:border-violet-500 hover:bg-violet-50/50 dark:hover:bg-violet-900/20 transition-all group shadow-sm hover:shadow-lg hover:shadow-violet-500/20"
                  >
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-purple-500/50 transition-transform">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <span className="text-lg font-bold text-gray-900 dark:text-white">Admin</span>
                    </div>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Manager Option */}
                  <button
                    type="button"
                    onClick={() => handleRoleSelect('manager')}
                    className="w-full flex items-center space-x-4 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all group shadow-sm hover:shadow-lg hover:shadow-blue-500/20"
                  >
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-blue-500/50 transition-transform">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <span className="text-lg font-bold text-gray-900 dark:text-white">Manager</span>
                    </div>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Employee Option */}
                  <button
                    type="button"
                    onClick={() => handleRoleSelect('employee')}
                    className="w-full flex items-center space-x-4 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl cursor-pointer hover:border-green-500 hover:bg-green-50/50 dark:hover:bg-green-900/20 transition-all group shadow-sm hover:shadow-lg hover:shadow-green-500/20"
                  >
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-green-500/50 transition-transform">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <span className="text-lg font-bold text-gray-900 dark:text-white">Employee</span>
                    </div>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
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

          {/* Authentication Modal */}
          {showAuthModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade" onClick={closeModal}>
                  {/* Backdrop */}
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
                  
                  {/* Modal Card */}
                  <div 
                    className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-md w-full p-8 animate-scale border-2 border-gray-200 dark:border-gray-700"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Close Button */}
                    <button
                      onClick={closeModal}
                      className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all"
                    >
                      <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>

                    {/* Modal Header */}
                    <div className="text-center mb-6">
                      <div className="flex justify-center mb-4">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl ${
                          role === 'admin' ? 'bg-gradient-to-br from-purple-500 to-pink-600' :
                          role === 'manager' ? 'bg-gradient-to-br from-indigo-500 to-blue-600' :
                          'bg-gradient-to-br from-green-500 to-emerald-600'
                        }`}>
                          <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {role === 'admin' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />}
                            {role === 'manager' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />}
                            {role === 'employee' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />}
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">{role} Login</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Enter your credentials to continue</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-700 rounded-xl">
                        <div className="flex items-center space-x-2">
                          <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="text-sm text-red-800 dark:text-red-200 font-medium">{error}</p>
                        </div>
                      </div>
                    )}

                    <form onSubmit={(e) => { e.preventDefault(); submit(); }} className="space-y-4">
                      {/* Employee Selection */}
                      {role === 'employee' && (
                        <div>
                          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                            Select Employee
                          </label>
                          {activeEmployees.length > 0 ? (
                            <select
                              value={selectedEmployeeId}
                              onChange={(e) => setSelectedEmployeeId(e.target.value)}
                              className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium"
                              required
                            >
                              <option value="">Choose your account...</option>
                              {activeEmployees.map(emp => (
                                <option key={emp.id} value={emp.id}>
                                  {emp.name} - {emp.role}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl">
                              <p className="text-sm text-yellow-800 dark:text-yellow-200">No employees available</p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Username/Email Field - Only for Admin and Manager */}
                      {role !== 'employee' && (
                        <div>
                          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                            Username or Email
                          </label>
                          <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username or email"
                            className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium"
                            required
                          />
                        </div>
                      )}

                      {/* Password Field */}
                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                          Password
                        </label>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter password"
                          className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium"
                          required
                        />
                      </div>

                      {/* Credentials Info */}
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl">
                        <div className="flex items-start space-x-2">
                          <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div className="text-xs text-blue-700 dark:text-blue-300">
                            {role === 'admin' && (
                              <>
                                <p className="font-semibold mb-1">Demo Credentials:</p>
                                <p>Username: <code className="bg-blue-100 dark:bg-blue-900/40 px-1 rounded">admin</code></p>
                                <p>Password: <code className="bg-blue-100 dark:bg-blue-900/40 px-1 rounded">admin123</code></p>
                              </>
                            )}
                            {role === 'manager' && (
                              <>
                                <p className="font-semibold mb-1">Demo Credentials:</p>
                                <p>Username: <code className="bg-blue-100 dark:bg-blue-900/40 px-1 rounded">manager</code></p>
                                <p>Password: <code className="bg-blue-100 dark:bg-blue-900/40 px-1 rounded">manager123</code></p>
                              </>
                            )}
                            {role === 'employee' && (
                              <>
                                <p className="font-semibold mb-1">Employee Password:</p>
                                <p>Password: <code className="bg-blue-100 dark:bg-blue-900/40 px-1 rounded">emp123</code></p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Submit Buttons */}
                      <div className="flex space-x-3 pt-2">
                        <button
                          type="button"
                          onClick={closeModal}
                          className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex-1 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white py-3 rounded-xl hover:from-violet-700 hover:via-purple-700 hover:to-fuchsia-700 transition-all shadow-lg font-bold"
                        >
                          Sign In
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
        </div>
      </div>
    </div>
    </>
  );
}
