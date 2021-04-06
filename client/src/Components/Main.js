import TextField from "@material-ui/core/TextField";
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import "../style/styleMain.css";
import axios from "axios";

const Main = () => {
  const [state, setState] = useState({
    message: "",
    sender: "",
    addressee: "",
  });
  const [chat, setChat] = useState([]);
  const [users, setUsers] = useState([]);
  const [addressee, setAddressee] = useState();

  const socketRef = useRef();

  useEffect(() => {
    //get users
    axios
      .get("http://localhost:3001/users")
      .then((resp) => setUsers(resp.data));
  });

  useEffect(() => {
    //connection to io server
    socketRef.current = io.connect("http://localhost:3001");
    socketRef.current.on("message", ({ sender, message, addressee }) => {
      console.log({ sender, message, addressee });
      setChat([...chat, { sender, message, addressee }]);
    });
    return () => socketRef.current.disconnect();
  }, [chat]);

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const options = () => {
    if (users) {
      return users.map((option, index) => {
        return (
          <option value={option._id} key={index}>
            {option.UserName}
          </option>
        );
      });
    }
  };

  const onMessageSubmit = (e) => {
    const { sender, message } = state;
    socketRef.current.emit("message", { sender, message, addressee });
    e.preventDefault();
    setState({ message: "", sender, addressee });
  };

  const renderChat = () => {
    // console.log(chat[0]);
    return chat.map(({ sender, message, addressee }, index) => (
      <div key={index}>
        <h3>
          {sender}: <span>{message}</span>
        </h3>
      </div>
    ));
  };

  return (
    <div className="card">
      <form onSubmit={onMessageSubmit}>
        <h1>Messenger</h1>
        <div className="name-field">
          <TextField
            name="sender"
            onChange={(e) => onTextChange(e)}
            value={state.sender}
            label="Sender"
          />
        </div>
        <div>
          <select onChange={(e) => setAddressee(e.target.value)}>
            <option value="defaultValue" disabled selected>
              Select user
            </option>
            {options()}
          </select>
        </div>
        <div>
          <TextField
            name="message"
            onChange={(e) => onTextChange(e)}
            value={state.message}
            id="outlined-multiline-static"
            variant="outlined"
            label="Message"
          />
        </div>

        <button>Send Message</button>
      </form>
      <div className="render-chat">
        <h1>Chat Log</h1>
        {renderChat()}
      </div>
    </div>
  );
};

export default Main;
