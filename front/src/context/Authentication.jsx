import { createContext, useContext, useState } from 'react';

const AuthenticationContext = createContext(null);

export function AuthenticationProvider({ children }) {
  const [username, setUsername] = useState(null);
  const authentication = { username, setUsername };

  return (
    <AuthenticationContext.Provider value={authentication}>
      {children}
    </AuthenticationContext.Provider>
  )
}

export function useAuthentication() {
  return useContext(AuthenticationContext);
}
