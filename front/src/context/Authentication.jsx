import { createContext, useContext, useState } from 'react';

const AuthenticationContext = createContext(null);

export function AuthenticationProvider({ children }) {
  const [username, setUsername] = useState(null);
  return (
    <AuthenticationContext.Provider value={{ username, setUsername }}>
      {children}
    </AuthenticationContext.Provider>
  )
}

export function useAuthentication() {
  const { username, setUsername } = useContext(AuthenticationContext);
  return [username, setUsername];
}
