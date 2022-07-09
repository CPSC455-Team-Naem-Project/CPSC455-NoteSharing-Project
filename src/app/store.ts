import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import globalSearchReducer from '../reducers/GlobalsearchReducer';
import userNoteReducer from '../reducers/Usernotesreducer';
import menuReducer from '../pages/Home/MenuSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    menu: menuReducer,
    userNotes: userNoteReducer,
    globalSearchFilter: globalSearchReducer
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
