import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({
  children,
}: any) => {

  const [user, setUser] =
    useState<any>(null);

  useEffect(() => {

    const storedUser =
      sessionStorage.getItem("user");

    if (storedUser) {

      setUser(
        JSON.parse(storedUser)
      );
    }

  }, []);

  // =========================
  // LOGOUT
  // =========================

  const logout = () => {

    sessionStorage.clear();

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