import React, { useContext, useState, useEffect } from "react";
import { useSocket } from "../contexts/SocketProvider";

const ChatsContext = React.createContext();

export function useChats() {
  return useContext(ChatsContext);
}

export function ChatsProvider({ children }) {
  const socket = useSocket();
  const [chats, setChats] = useState([
    {
      UserName: "avi@",
      Chat: [
        {
          Sender: "avi@",
          Message: "hi",
          Addressee: "israelad3@gmail.com",
          TimeStamp: "blabla",
          SendOrReceive: "chat__message",
          Type: "",
        },
      ],
    },
    {
      UserName: "israelad3@gmail.com",
      Chat: [
        {
          Sender: "israelad3@gmail.com",
          Message: "hihihihi",
          Addressee: "avi@",
          TimeStamp: "blabla",
          SendOrReceive: "chat__message",
          Type: "",
        },
      ],
    },
  ]);

  // useEffect(() => {
  //   if (socket == null) {
  //     return;
  //   }

  //   // socket.emit("username", { UserName: sender });

  //   socket.on(
  //     "private",
  //     ({ Sender, Message, Addressee, TimeStamp, SendOrReceive, Type }) => {
  //       chats.map((c, index) => {
  //         if (c.UserName == Sender) {
  //           let temp = [...chats];
  //           temp[index].Chat.push({
  //             Sender,
  //             Message,
  //             Addressee,
  //             TimeStamp,
  //             SendOrReceive,
  //             Type,
  //           });
  //           setChats(temp);
  //         } else {
  //           setChats([
  //             ...chats,
  //             {
  //               UserName: Sender,
  //               Chat: [
  //                 {
  //                   Sender,
  //                   Message,
  //                   Addressee,
  //                   TimeStamp,
  //                   SendOrReceive,
  //                   Type,
  //                 },
  //               ],
  //             },
  //           ]);
  //           console.log(chats)
  //         }
  //       });
  //       //   setChat([
  //       //     ...chat,
  //       //     { Sender, Message, Addressee, TimeStamp, SendOrReceive, Type },
  //       //   ]);
  //     }
  //   );
  // });

  return (
    // eslint-disable-next-line no-sequences
    <ChatsContext.Provider value={[chats, setChats]}>
      {children}
    </ChatsContext.Provider>
  );
}
