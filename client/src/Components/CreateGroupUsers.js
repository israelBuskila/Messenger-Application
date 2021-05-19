import React from "react";
import { Avatar } from "@material-ui/core";
import { Box, Box2, H2 } from "../style/CreateGroupUsersStyle";
import { useState } from "react";

function CreateGroupUsers({ username }) {
  const [groupSelect, setGruopSelect] = useState("white");

  return (
    // <button
    //   onClick={() => setGruopSelect("#808080")}
    //   style={{
    //     backgroundColor: groupSelect,
    //     minWidth: "238px",
    //     border: "none",
    //     marginTop: "3px",
    //   }}
    // >
      <Box onClick={() => setGruopSelect("#808080")}
      // style={{
      //   backgroundColor: groupSelect,
      //   minWidth: "238px",
      //   border: "none",
      //   marginTop: "3px",
      // }}
      >
        <Avatar />
        <Box2>
          <H2>{username}</H2>
        </Box2>
      </Box>
    // </button>
  );
}

export default CreateGroupUsers;
