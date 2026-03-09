import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// типы модалок (пока три)
type ModalType = "login" | "filters" | "address" | null;

// типизация состояния модалки
type ModalState = {
  activeModal: ModalType;
};

// начальное состояние - нет открытых модалок
const initialState: ModalState = {
  activeModal: null,
};

// слайс для управления состоянием
const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<ModalType>) => {
            state.activeModal = action.payload;
        },
        closeModal: (state) => {
            state.activeModal = null;
        }
    }
})

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
