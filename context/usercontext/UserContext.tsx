import { createContext } from 'react';
import { UserContextType } from '../../types';

const UserContext = createContext<UserContextType>({
  user: null,
  logout: () => {},
  setUser: (user) => {},
});

export default UserContext;
