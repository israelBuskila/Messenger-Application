import "../style/Main.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

function Main() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    //get users
    axios
      .get("http://localhost:3001/users")
      .then((resp) => setUsers(resp.data));
  }, []);

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default Main;
