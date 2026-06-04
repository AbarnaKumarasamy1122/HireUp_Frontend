import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({
  children,
}: any) => {

  const [user, setUser] = useState<any>(null);

  useEffect(() => {

    const storedUser =
      sessionStorage.getItem("user");

    if (storedUser) {

      setUser(JSON.parse(storedUser));
    }

  }, []);

  const logout = () => {

    sessionStorage.removeItem("token");

    sessionStorage.removeItem("user");

    setUser(null);
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