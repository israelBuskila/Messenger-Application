// .sidebarChat {
//   display: flex;
//   padding: 20px;
//   cursor: pointer;
//   border-bottom: 1px solid #f6f6f6;
// }
// .sidebarChat:hover {
//   background-color: #ebebeb;
// }

// .sidebarChat__info > h2 {
//   font-size: 16px;
//   margin-bottom: 9px;
// }

// .sidebarChat__info {
//   margin-left: 15px;
// }

import style from "styled-components";


// export const Box = style.div`
// display: flex;
// padding:20px;
// cursor: pointer;
// border-bottom: 1px solid #f6f6f6;
// background-color:${groupSelect => groupSelect};
// &:hover{
//     background-color: #ebebeb;
// }
// }
// `;

export const Box = style.div`
display: flex;
padding:20px;
cursor: pointer;
border-bottom: 1px solid #f6f6f6;
background-color:${props => props.groupSelect};
&:hover{
    background-color: #ebebeb;
}
`;

export const Box2 = style.div`
  margin-left: 15px;
  `;

export const H2 = style.h2`
  font-size: 16px;
  margin-bottom: 9px;
  `;
