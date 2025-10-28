import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { User } from "../types/users";
import * as firebase from 'firebase/auth';
import { auth } from "../firebaseConfig";

type AuthContextProps = {
  createAccount: (email: string, password: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  user?: User;
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User>();

  const createAccount = async (email: string, password: string) => {
    await firebase.createUserWithEmailAndPassword(auth, email, password);
  };

  const login = async (email: string, password: string) => {
    await firebase.signInWithEmailAndPassword(auth, email, password);
  };
  const logout = async () => {
    await firebase.signOut(auth);
  };

  useEffect(() => {
    const subscriber = firebase.onAuthStateChanged(auth, (user)=> {
      if(user){
        setUser({email: user.email})
      }
      else{
        setUser(undefined);
      }
    });
    return subscriber;
  }, [])

  return (
    <AuthContext.Provider
      value={{
        createAccount,
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
