import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  isOpen: boolean;
  mode: "register" | "login";
}

const initialState: ModalState = {
  isOpen: false,
  mode: "register",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<"register" | "login">) => {
      state.isOpen = true;
      state.mode = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
    setModalMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { openModal, closeModal, setModalMode } = modalSlice.actions;
export default modalSlice.reducer;