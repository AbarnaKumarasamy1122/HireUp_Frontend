import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const getStoredValue = (key: string) =>
  localStorage.getItem(key) || sessionStorage.getItem(key);

const setStoredValue = (key: string, value: string) => {
  localStorage.setItem(key, value);
  sessionStorage.setItem(key, value);
};

const removeStoredValue = (key: string) => {
  localStorage.removeItem(key);
  sessionStorage.removeItem(key);
};

const AuthContext = createContext<any>(null);

export const AuthProvider = ({
  children,
}: any) => {

  const [user, setUser] =
    useState<any>(null);

  useEffect(() => {

    const storedUser = getStoredValue("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setStoredValue("user", storedUser);
      } catch {
        removeStoredValue("user");
      }
    }

  }, []);

  // =========================
  // LOGOUT
  // =========================

  const logout = () => {

    removeStoredValue("token");
    removeStoredValue("refresh");
    removeStoredValue("user");

    setUser(null);

    window.location.href =
      "/login";
  };

  return (

    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
      }}
    >

      {children}

    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);