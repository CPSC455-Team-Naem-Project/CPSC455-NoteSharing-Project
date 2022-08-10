import { getAuth, User } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Login } from '../pages/Login/Login';

const Authed = (props: { children: any }) => {
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        setUser(user);
      }
    });
  }, [auth]);

  return <>{user ? <>{props.children}</> : <Login />}</>;
};

export default Authed;
