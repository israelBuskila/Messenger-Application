import React, { useContext, useState } from "react";


const ChatsContext = React.createContext();

export function useChats() {
  return useContext(ChatsContext);
}

export function ChatsProvider({ children }) {
 
  const [chats, setChats] = useState([])
  

  return (
    // eslint-disable-next-line no-sequences
    <ChatsContext.Provider value={[chats, setChats]}>
      {children}
    </ChatsContext.Provider>
  );
}
