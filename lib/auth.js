import React, { useState, useEffect, useContext, createContext } from 'react';
import { GithubAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';

const provider = new GithubAuthProvider();
const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser);
      setUser(user);
      return user;
    } else {
      setUser(false);
      return false;
    }
  }

  const signinWithGithub = () => signInWithPopup(auth, provider)
    .then((result) => handleUser(result.user));

  const signout = () => {
    return signOut(auth)
      .then(() => {
        handleUser(false);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleUser);

    return () => unsubscribe();
  }, []);

  return {
    user,
    signinWithGithub,
    signout
  };
}

const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId
  }
}