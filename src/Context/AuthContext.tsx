import { createContext, PropsWithChildren, useState } from "react";
import { User } from "../types/users";

type AuthContextProps = {
  login: (username: string, password: string) => void;
  logout: () => void;
  user?: User;
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User>();

  const login = async (username: string, password: string) => {
    const response = await fetch("https://dummyjson.com/auth/login", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            username,
            password
        })
    })
    const data = await response.json();
    setUser(data);
  };
  const logout = () => {
    setUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        user,
      }}
    >
        {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
