import React, { useContext, useEffect, useState } from "react";

const ChatContext = React.createContext();

export function useChat() {
	return useContext(ChatContext);
}

export function ChatProvider({ children }) {
    const [select, setSelect] = useState(0);
  
    // useEffect(() => {
    //   const newSocket = io("http://localhost:3001");
    //   setSocket(newSocket);
    //   return () => newSocket.close(); 
      
    // }, [id]);
  
    return (
      <ChatContext.Provider value={[select, setSelect]}>{children}</ChatContext.Provider>
    );
  }