import { ModalAction, ModalState } from "../types/modal";

export const modalReducers = (state: ModalState, action: ModalAction): ModalState => {
  switch (action.type) {
    case "OPEN_EDIT_PROFILE":
      return { ...state, isOpenEditProfile: true };
    case "CLOSE_EDIT_PROFILE":
      return { ...state, isOpenEditProfile: false };
    default:
      return state;
  }
};
