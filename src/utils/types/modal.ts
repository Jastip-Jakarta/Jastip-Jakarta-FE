export interface ModalState {
  isOpenEditProfile: boolean;
}

export type ModalAction = { type: "OPEN_EDIT_PROFILE" } | { type: "CLOSE_EDIT_PROFILE" };
