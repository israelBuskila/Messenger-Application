//rfce
import { Avatar } from "@material-ui/core";
import { Box, Box2, H2 } from "../style/SidebarChatStyle";
import React from "react";



const SidebarChat = ({ username , lastMessage }) =>{

  return (
    <Box>
      <Avatar />
      <Box2>
        <H2>{username}</H2>
        <p>{lastMessage}</p>
      </Box2>
    </Box>
  );
}

export default SidebarChat;

// const Box = style.div`
// display: flex;
// padding:20px;
// cursor: pointer;
// border-bottom: 1px solid #f6f6f6;
// &:hover{
//     background-color: #ebebeb;
// }
// `;

// const Box2 = style.div`
//   margin-left: 15px;
//   `;

// const H2 = style.h2`
//   font-size: 16px;
//   margin-bottom: 9px;
//   `;
