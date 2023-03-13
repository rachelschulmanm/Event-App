import React, { useContext, useState } from "react";

const UserContext = React.createContext();

const UserUpdateContext = React.createContext();

//with this function you can get the user
export function UseUser() {
  return useContext(UserContext);
}
export function UseUserUpdate() {
  return useContext(UserUpdateContext);
}
export function UserProvider({ children }) {

  //the value all components can accsess
  const [user, setUser] = useState({});
  function updateUser(newUser) {
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
