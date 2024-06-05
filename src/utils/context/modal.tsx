import { createContext, Dispatch, FC, PropsWithChildren, useContext, useReducer } from "react";
import { modalReducers } from "../reducers/modal";
import { ModalAction, ModalState } from "../types/modal";

interface IInitialModalState {
  state: ModalState;
  dispatch: Dispatch<ModalAction>;
}

const initialModalState: IInitialModalState = {
  state: {
    isOpenEditProfile: false,
  },
  dispatch: () => null,
};

const ModalContext = createContext(initialModalState);

export const ModalProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(modalReducers, initialModalState.state);

  const contextValue = {
    state,
    dispatch,
  };

  return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>;
};

export const useModal = () => {
  const context = useContext(ModalContext);
  return context;
};
