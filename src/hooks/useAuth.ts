import { useState } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const login = () => setAuthenticated(true);
  const logout = () => setAuthenticated(false);

  return { isAuthenticated, login, logout };
};
