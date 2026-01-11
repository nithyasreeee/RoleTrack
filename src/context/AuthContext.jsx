import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("session"));
    if (data && data.expiresAt > Date.now()) setUser(data.user);
    else localStorage.removeItem("session");
  }, []);

  const login = (role) => {
    const session = {
      user: { role },
      expiresAt: Date.now() + 60 * 60 * 1000
    };
    localStorage.setItem("session", JSON.stringify(session));
    setUser(session.user);
  };

  const logout = () => {
    localStorage.removeItem("session");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
