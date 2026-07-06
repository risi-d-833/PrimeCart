import { createContext, useContext, useEffect, useState } from "react";
import {
  loginUser,
  logoutUser,
  getProfile,
} from "../api/auth.api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const login = async (data) => {
    const res = await loginUser(data);

    setUser(res.data.user);

    return res.data;
  };

  const logout = async () => {
    await logoutUser();

    setUser(null);
  };

  const loadUser = async () => {
    try {
      const res = await getProfile();

      setUser(res.data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);