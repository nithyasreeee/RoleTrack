import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEmployees } from "../context/EmployeeContext";

export default function Login() {
  const [identifier, setIdentifier] = useState(""); // Email or Employee ID
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  const { login } = useAuth();
  const { employees } = useEmployees();
  const nav = useNavigate();

  // Authentication credentials (in production, handled by backend)
  const credentials = {
    admin: { username: "admin", password: "admin123", email: "admin@roletrack.com" },
    manager: { username: "manager", password: "manager123", email: "manager@roletrack.com" },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validate inputs
    if (!identifier.trim() || !password.trim()) {
      setError("Invalid credentials");
      setIsLoading(false);
      return;
    }

    // Simulate API delay for realistic UX
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      // Check admin credentials
      if ((identifier === credentials.admin.username || identifier === credentials.admin.email) && 
          password === credentials.admin.password) {
        login("admin", null);
        nav("/admin");
        return;
      }

      // Check manager credentials
      if ((identifier === credentials.manager.username || identifier === credentials.manager.email) && 
          password === credentials.manager.password) {
        login("manager", null);
        nav("/manager");
        return;
      }

      // Check employee credentials
      const employee = employees.find(emp => 
        emp.status === "active" && 
        (emp.email === identifier || emp.id === identifier)
      );

      if (employee && password === "emp123") {
        login("employee", employee);
        nav("/employee");
        return;
      }

      // If no match found
      setError("Invalid credentials");
    } catch (err) {
      setError("Server error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 dark:from-gray-950 dark:via-indigo-950 dark:to-purple-950 relative overflow-hidden">
      {/* Enhanced Animated Geometric Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large animated blobs */}
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-purple-400/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-pink-400/25 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/3 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/2 right-1/3 w-[350px] h-[350px] bg-fuchsia-400/15 rounded-full blur-3xl animate-blob animation-delay-3000"></div>
        <div className="absolute top-3/4 left-1/4 w-[300px] h-[300px] bg-indigo-400/20 rounded-full blur-3xl animate-blob animation-delay-1000"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 right-20 w-32 h-32 border-3 border-white/40 rounded-2xl rotate-45 animate-float shadow-lg shadow-white/20"></div>
        <div className="absolute bottom-32 left-32 w-24 h-24 border-3 border-white/35 rounded-full animate-float animation-delay-2000 shadow-lg shadow-white/20"></div>
        <div className="absolute top-1/2 left-20 w-28 h-28 border-3 border-white/30 rounded-3xl -rotate-12 animate-float animation-delay-3000 shadow-lg shadow-white/20"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 border-3 border-white/35 rounded-xl rotate-12 animate-float animation-delay-1000 shadow-lg shadow-white/20"></div>
        <div className="absolute top-40 left-1/2 w-16 h-16 bg-white/15 rounded-lg rotate-45 animate-float animation-delay-3500 shadow-xl"></div>
        
        {/* Moving particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/60 rounded-full animate-float shadow-lg shadow-white/50"></div>
        <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-white/60 rounded-full animate-float animation-delay-1000 shadow-lg shadow-white/50"></div>
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-white/60 rounded-full animate-float animation-delay-2000 shadow-lg shadow-white/50"></div>
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-white/60 rounded-full animate-float animation-delay-3000 shadow-lg shadow-white/50"></div>
        
        {/* Animated rings */}
        <div className="absolute top-1/3 right-1/4 w-40 h-40 border border-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-32 h-32 border border-white/15 rounded-full animate-pulse animation-delay-2000"></div>
        
        {/* Hexagon decorations */}
        <div className="absolute top-1/4 right-1/3 w-24 h-24 animate-float animation-delay-1000">
          <svg viewBox="0 0 100 100">
            <polygon points="50,5 93.3,25 93.3,75 50,95 6.7,75 6.7,25" stroke="white" strokeWidth="2" fill="none" opacity="0.3" />
          </svg>
        </div>
        <div className="absolute bottom-1/4 right-1/4 w-20 h-20 animate-float animation-delay-3000">
          <svg viewBox="0 0 100 100">
            <polygon points="50,5 93.3,25 93.3,75 50,95 6.7,75 6.7,25" stroke="white" strokeWidth="2" fill="none" opacity="0.4" />
          </svg>
        </div>
        
        {/* Star shapes */}
        <div className="absolute top-1/4 right-1/3 w-3 h-3">
          <div className="absolute inset-0 bg-white/40 rotate-0 animate-pulse"></div>
          <div className="absolute inset-0 bg-white/40 rotate-90 animate-pulse animation-delay-1000"></div>
        </div>
        <div className="absolute bottom-1/3 left-2/3 w-2 h-2">
          <div className="absolute inset-0 bg-white/50 rotate-0 animate-pulse animation-delay-2000"></div>
          <div className="absolute inset-0 bg-white/50 rotate-90 animate-pulse animation-delay-3000"></div>
        </div>
        
        {/* Additional decorative circles */}
        <div className="absolute top-1/5 left-1/3 w-1 h-1 bg-white/80 rounded-full animate-pulse shadow-sm shadow-white/60"></div>
        <div className="absolute top-2/3 right-1/5 w-1 h-1 bg-white/80 rounded-full animate-pulse animation-delay-1000 shadow-sm shadow-white/60"></div>
        <div className="absolute bottom-1/5 left-1/5 w-1 h-1 bg-white/80 rounded-full animate-pulse animation-delay-2000 shadow-sm shadow-white/60"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px] animate-pulse-slow"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-between px-3 py-4 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-12 lg:py-12">
        <div className="max-w-7xl w-full mx-auto flex flex-col items-center justify-center space-y-3 sm:space-y-5 md:space-y-6 lg:space-y-8">
        {/* Hero Section - Full Width Centered */}
        <div className="text-center w-full">
          {/* Logo & Heading */}
          <div className="mb-3 sm:mb-5 md:mb-6 lg:mb-8">
            <div className="flex items-center justify-center space-x-1.5 sm:space-x-3 mb-2 sm:mb-4 animate-slide-down">
              <div className="w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-white rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center shadow-2xl shadow-white/50 transform hover:rotate-12 transition-all duration-300">
                <svg className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight drop-shadow-lg">RoleTrack</span>
            </div>

            <div className="space-y-1.5 sm:space-y-3 md:space-y-4">
              <h1 className="text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-white leading-tight tracking-tight drop-shadow-2xl px-3 sm:px-4">
                Transform Your Workplace with
                <br />
                <span className="bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 bg-clip-text text-transparent">Smart Employee Management</span>
              </h1>
              <p className="text-[11px] sm:text-sm md:text-base lg:text-lg text-white/90 leading-relaxed font-medium max-w-4xl mx-auto px-3 sm:px-4">
                Empower your organization with intelligent workforce solutions. From real-time analytics and seamless activity tracking to comprehensive team management—everything you need to boost productivity and drive success.
              </p>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 pt-2 sm:pt-4 md:pt-5 px-2 sm:px-4 max-w-5xl mx-auto">
                {[
                  { 
                    icon: <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
                    title: "Real-time Analytics", 
                    desc: "Monitor team performance with interactive dashboards, detailed reports, and actionable insights at your fingertips.", 
                    gradient: "from-cyan-400 to-blue-500"
                  },
                  { 
                    icon: <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                    title: "Activity Management", 
                    desc: "Streamline approval workflows, track project progress, and manage tasks efficiently with automated notifications.", 
                    gradient: "from-emerald-400 to-green-500"
                  },
                  { 
                    icon: <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
                    title: "Employee Directory", 
                    desc: "Access complete team information, track employee status, manage profiles, and maintain organizational structure.", 
                    gradient: "from-rose-400 to-pink-500"
                  }
                ].map((feature, i) => (
                  <div key={i} className="flex flex-col items-center text-center bg-white/10 backdrop-blur-lg p-2.5 sm:p-4 md:p-5 rounded-lg sm:rounded-xl border border-white/10 hover:bg-white/20 hover:border-white/30 hover:scale-105 transition-all duration-300 animate-slide" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className={`w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br ${feature.gradient} rounded-lg sm:rounded-xl flex items-center justify-center shadow-xl mb-1.5 sm:mb-3`}>
                      <div className="text-white">{feature.icon}</div>
                    </div>
                    <h3 className="font-bold text-white text-xs sm:text-base md:text-lg mb-1 sm:mb-2 drop-shadow">{feature.title}</h3>
                    <p className="text-[10px] sm:text-sm text-white/80 font-medium leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sign In Button - Fixed at Bottom */}
        <div className="w-full flex justify-center pb-1.5 sm:pb-4">
          <button
            onClick={() => setShowLoginModal(true)}
            className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-700 hover:via-purple-700 hover:to-fuchsia-700 text-white font-bold text-xs sm:text-base md:text-lg px-5 sm:px-8 md:px-10 py-2 sm:py-3 md:py-4 rounded-lg sm:rounded-xl transition-all shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 hover:scale-105 inline-flex items-center justify-center space-x-1.5 sm:space-x-2 animate-pulse min-w-[120px] sm:min-w-[150px]"
          >
            <span>Sign In</span>
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade" onClick={() => setShowLoginModal(false)}>
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
          
          {/* Modal Card */}
          <div 
            className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-md w-full p-8 animate-scale border-2 border-purple-500/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all"
            >
              <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-3xl font-extrabold mb-2">
                <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                  Sign In
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-base font-medium">
                Access your account to continue
              </p>
            </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Message */}
            {error && (
              <div className="animate-slide-down bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-700 rounded-xl p-3">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-red-800 dark:text-red-200 font-semibold">{error}</p>
                </div>
              </div>
            )}

            {/* Email or Employee ID Field */}
            <div className="space-y-1.5">
              <label htmlFor="identifier" className="block text-sm font-bold text-gray-700 dark:text-gray-300">
                Email or Employee ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  id="identifier"
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Enter your email or employee ID"
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 font-medium text-base"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-bold text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 font-medium text-base"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <button
                type="button"
                onClick={() => setError("Please contact your system administrator")}
                className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold transition-colors hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-700 hover:via-purple-700 hover:to-fuchsia-700 text-white font-bold text-base py-3 rounded-xl transition-all shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Security Badge */}
          <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="font-medium">Secure Connection</span>
            </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
