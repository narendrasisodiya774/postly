import { useState, useMemo } from 'react';
import UserContext from './UserContext';
import { PropsWithChildren } from 'react';
import { User } from '../../types';
import { getSessionUser, clearSessionUser } from '../../lib/session';

function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);

  // Load session user on mount
  useState(() => {
    const storedUser = getSessionUser();
    console.log('Stored user inside the context', storedUser);
    if (storedUser) setUser(storedUser);
  });

  const logout = () => {
    clearSessionUser();
    setUser(null);
  };

  const contextValue = useMemo(() => ({ user, logout, setUser }), [user]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
