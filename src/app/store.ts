import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userNoteReducer from '../reducers/Usernotesreducer';
import userNotesReducer from '../reducers/UserNoteSlice';
import menuReducer from '../pages/Home/MenuSlice';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    userNotes: userNoteReducer,
    userNotes_: userNotesReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
