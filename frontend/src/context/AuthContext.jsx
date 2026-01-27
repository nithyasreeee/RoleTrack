import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("auth");
    if (stored) {
      const parsed = JSON.parse(stored);
      const expiry = new Date(parsed.expiry);
      if (expiry > new Date()) {
        setUser(parsed);
      } else {
        localStorage.removeItem("auth");
      }
    }
    setLoading(false);
  }, []);

  const login = (role, employeeData = null) => {
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + 1);

    const userData = {
      role,
      employeeId: employeeData?.id || null,
      employeeName: employeeData?.name || null,
      email: employeeData?.email || null,
      department: employeeData?.department || null,
      roleTitle: employeeData?.role || null,
      expiry: expiry.toISOString(),
    };

    setUser(userData);
    localStorage.setItem("auth", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
