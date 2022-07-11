import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export enum MENU {
  UPLOAD,
  PROFILE,
  FEED,
  NOTES,
  SEARCH,
  VIEW_NOTE
}

export interface MenuState {
  currentMenu: MENU;
}

const initialState: MenuState = {
  currentMenu: MENU.UPLOAD
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setCurrentMenu: (state, action: PayloadAction<MENU>) => {
      state.currentMenu = action.payload;
    },
  },
});

export const { setCurrentMenu } = menuSlice.actions;

export const selectCurrentMenu = (state: RootState) => state.menu.currentMenu;

export default menuSlice.reducer;
