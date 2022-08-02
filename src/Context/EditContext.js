//depenencies and components
import { createContext, useReducer } from "react";
import EditReducer from "./EditReducer";

const INITIAL_STATE = {
  isClicked: null,
  id: null,
};

export const EditContext = createContext(INITIAL_STATE);

export const EditContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(EditReducer, INITIAL_STATE);
  return (
    <EditContext.Provider
      value={{ isClicked: state.isClicked, id: state.id, dispatch }}
    >
      {children}
    </EditContext.Provider>
  );
};
