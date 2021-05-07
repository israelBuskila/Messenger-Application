// .createGroup {
//   display: flex;
//   flex-direction: column;
//   flex: 0.35;
// }

// .createGroup__header {
//   display: flex;
//   justify-content: space-between;
//   padding: 20px;
//   border-right: 1px solid lightgray;
//   background-color: #00bfa5;
//   font-size: 100%;
// }

/* .sidebar__headerRight {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 10vw;
}

.sidebar__headerRight > .MuiSvgIcon-root {
  margin-right: 2vw;
  font-size: 24px !important;
} */

// .createGroup__search {
//   display: flex;
//   align-items: center;
//   background-color: #f6f6f6;
//   height: 39px;
//   padding: 10px;
// }

// .createGroup__searchContainer {
//   display: flex;
//   align-items: center;
//   background-color: white;
//   width: 100%;
//   height: 35px;
//   border-radius: 20px;
// }

// .createGroup__searchContainer > .MuiSvgIcon-root {
//   color: gray;
//   padding: 10px;
// }

// .createGroup__searchContainer > input {
//   border: none;
//   outline-width: 0;
//   margin-left: 10px;
// }

// .createGroup__chats {
//   flex: 1;
//   background-color: white;
//   overflow: scroll;
// }

// .btn {
//   background-color: white;
//   border: none;
//   width: 100%;
//   outline: none;
// }

import style from "styled-components";

export const CreateGroupStyle = style.div`
display: flex;
  flex-direction: column;
  flex: 0.35;`

  export const Header = style.div`
display: flex;
  flex-direction: column;
  flex: 0.35;`

  export const Search  = style.div`
    display: flex;
    align-items: center;
    background-color: #f6f6f6;
    height: 39px;
    padding: 10px;
  `

  export const SearchContainer  = style.div`
  display: flex;
  align-items: center;
  background-color: white;
  width: 100%;
  height: 35px;
  border-radius: 20px;
  `
  // export const SearchContainer2 =style.MuiSvgIcon-root`
  //   color: gray;
  //   padding: 10px;
  // `
  
  export const SearchContainer3 = style.input`
    border: none;
    outline-width: 0;
    margin-left: 10px;
  `

  export const ChatsStyle  = style.div`
  flex: 1;
  background-color: white;
  overflow: scroll;
  `

  export const Btn  = style.div`
  background-color: white;
  border: none;
  width: 100%;
  outline: none;
  `