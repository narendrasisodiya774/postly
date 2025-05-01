import { User } from "../../types";

export const setSessionUser = (userData: User) => {
    if (typeof window !== 'undefined') {
        sessionStorage.setItem('user', JSON.stringify(userData));
    }
};

export const getSessionUser = (): any | null => {
    if (typeof window !== 'undefined') {
        const data = sessionStorage.getItem('user');
        return data ? JSON.parse(data) : null;
    }
    return null;
};

export const clearSessionUser = () => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('user');
  }
};