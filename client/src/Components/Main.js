import "../style/Main.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import React, { useEffect, useState } from "react";
import { useChat } from "../contexts/ChatProvider";
import axios from "axios";

function Main() {
  const [users, setUsers] = useState([]);
  const [select, setSelect] = useChat();

  useEffect(() => {
    //get users
    axios
      .get("http://localhost:3001/users")
      .then((resp) => setUsers(resp.data));
  }, []);

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar users={users} />
        <Chat user={users[select]} />
      </div>
    </div>
  );
}

export default Main;
