import React, { useContext, useState } from "react";

const SelectContext = React.createContext();

export function useSelect() {
  return useContext(SelectContext);
}

export function SelectProvider({ children }) {
  const [select, setSelect] = useState();


  return (
    // eslint-disable-next-line no-sequences
    <SelectContext.Provider value={[select, setSelect]}>
      {children}
    </SelectContext.Provider>
  );
}
