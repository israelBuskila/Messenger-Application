import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const UsersContext = React.createContext();

export function useUsers() {
  return useContext(UsersContext);
}

export function UsersProvider({ children }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    //get users
    axios.get("http://localhost:3001/users").then((resp) => {
      setUsers(resp.data)
    });
  }, [users]);

  return (
    // eslint-disable-next-line no-sequences
    <UsersContext.Provider value={[users, setUsers]}>
      {children}
    </UsersContext.Provider>
  );
}
