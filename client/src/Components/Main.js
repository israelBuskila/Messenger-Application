import "../style/Main.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import React from "react";

function Main() {
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
