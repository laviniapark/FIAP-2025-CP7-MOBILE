import { createContext, PropsWithChildren, useState } from "react";
import { User } from "../types/users";
import { ref, set, get } from "firebase/database";
import { database } from "../firebaseConfig";

type UserContextProps = {
  isLoading: boolean;
  users?: User;
  fetch: (uid: string) => Promise<void>;
  save: (user: User) => void;
};

const UserContext = createContext<UserContextProps>(
  {} as UserContextProps
);

const UserProvider = ({ children }: PropsWithChildren) => {
  const [users, setUsers] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);

const fetch = async (uid: string) => {
  setIsLoading(true);
  try {
    const userRef = ref(database, 'users/' + uid);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      setUsers({uid, ...snapshot.val()}); 
    } else {
      setUsers(undefined);
    }
  } finally {
    setIsLoading(false);
  }
};

  const save = async (user : User) => {
    await set(ref(database, 'users/' + user.uid), {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      address: user.address,
    });

    fetch(user.uid);
  };

  return (
    <UserContext.Provider value={{ isLoading, users, fetch, save }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
