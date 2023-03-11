import React, { useContext, useState } from "react";

const UserContext = React.createContext();
const UserUpdateContext = React.createContext();

export function UseUser() {
  return useContext(UserContext);
}
export function UseUserUpdate() {
  return useContext(UserUpdateContext);
}
export function UserProvider({ children }) {
  const [user, setUser] = useState({});
  function updateUser(newUser) {
    console.log(newUser);
    setUser({...newUser});
  }
  return (
    <UserContext.Provider value={user}>
      <UserUpdateContext.Provider value={updateUser}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  );
}
